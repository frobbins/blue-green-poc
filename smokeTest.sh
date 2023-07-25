#!/bin/bash

# Replace 'STACK_NAME' with the name of your CloudFormation stack
STACK_NAME="wgt-guru-pink"

# Get the endpoint URL of the API Gateway deployed in the new stack
endpoint=$(aws cloudformation describe-stacks --stack-name wgt-guru-pink --query 'Stacks[0].Outputs[?OutputKey==`ServiceEndpoint`].OutputValue' --output text)

# Add the '/healthcheck' path to the endpoint URL for the health check Lambda
HEALTH_CHECK_ENDPOINT="$endpoint/healthcheck"

# Run the smoke test by making an HTTP GET request to the health check Lambda
response=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_CHECK_ENDPOINT)

# Check the response status code to determine if the smoke test passed or failed
if [ "$response" -eq 200 ]; then
  echo "Smoke test passed successfully!"
  exit 0
else
  echo "Smoke test failed!"
  exit 1
fi
