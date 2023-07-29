import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB, config as AWSConfig } from 'aws-sdk';
import { reorderKeys } from '@utils/reorderKeys';
AWSConfig.update({ region: 'us-east-1' });


const dynamoDb = new DynamoDB.DocumentClient();

export const getSwings: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => {

  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE || '',
    };

    const data = await dynamoDb.scan(params).promise();
    const reorderedItems = data.Items.map(item => reorderKeys(item));
    console.log(reorderedItems);

    return {
      statusCode: 200,
      body: JSON.stringify(reorderedItems),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Unable to get swings!!' }),
    };
  }
};
