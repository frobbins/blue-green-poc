#!/bin/bash

# Disable the pager
export AWS_PAGER=""

# Check for the required number of command-line arguments
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <stack-name> <version-number>"
  exit 1
fi

# Variables
STACK_NAME="$1"
VERSION_NUMBER="$2"
ALIAS_NAME="live" # Change this to the alias name you want to update

# Get all the Lambda function ARNs in the given stack
LAMBDA_FUNCTIONS=$(aws cloudformation describe-stack-resources --stack-name $STACK_NAME \
                   | jq -r '.StackResources[] | select(.ResourceType=="AWS::Lambda::Function") | .PhysicalResourceId')

# Update the alias for each Lambda function to the new version number
for FUNCTION_ARN in $LAMBDA_FUNCTIONS; do
  echo "Updating alias $ALIAS_NAME for function $FUNCTION_ARN to version $VERSION_NUMBER"

  aws lambda update-alias --function-name $FUNCTION_ARN --name $ALIAS_NAME --function-version $VERSION_NUMBER

done

echo "All aliases in stack $STACK_NAME have been updated to version $VERSION_NUMBER."
