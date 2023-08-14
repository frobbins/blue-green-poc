import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const dynamoDb = new DynamoDB.DocumentClient({
  region: 'us-east-1',

})

interface SwingInput {
  stick: number;
  greenSpeed: number;
  elevation: number;
  distanceToPin: number;
  slopeSpeed: number;
  verticalStop: number;
  horizontalStop: number;
}

export const createSwing = async (event: APIGatewayProxyEvent | string): Promise<APIGatewayProxyResult> => {

  let swingInput: SwingInput;
  let response: APIGatewayProxyResult;

  if (typeof event === 'string') {
    swingInput = JSON.parse(event);
  } else {
    swingInput = JSON.parse(event.body);
  }

  try {
    // Validation could be added here to ensure that the data object contains all required properties
    const params = {
      TableName: process.env.DYNAMODB_TABLE || '',
      Item: {
        swingId: new Date().getTime().toString(),
        ...swingInput,
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
      body: JSON.stringify({ message: 'Unable to create swing!' }),
    };
  }

  return response;
};
