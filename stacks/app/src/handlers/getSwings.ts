import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  try {
    const params = {
      TableName: process.env.DYNAMODB_TABLE || '',
    };

    const data = await dynamoDb.scan(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    console.error(error);

    response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Unable to get swings' }),
    };
  }

  return response;
};
