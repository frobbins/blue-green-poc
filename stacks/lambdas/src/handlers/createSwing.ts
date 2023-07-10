import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient();

interface Swing {
  stick: number;
  greenSpeed: number;
  elevation: number;
  distanceToPin: number;
  slopeSpeed: number;
  verticalStop: number;
  horizontalStop: number;
}

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  try {
    const data = JSON.parse(event.body || '{}') as Swing;
    
    // Validation could be added here to ensure that the data object contains all required properties
    
    const params = {
      TableName: process.env.DYNAMODB_TABLE || '',
      Item: {
        swingId: new Date().getTime().toString(),
        ...data,
      },
    };
    
    await dynamoDb.put(params).promise();

    response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (error) {
    console.error(error);
    
    response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Unable to create swing' }),
    };
  }

  return response;
};
