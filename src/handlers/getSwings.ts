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
    const reorderedItems = data.Items.map(item => reorderKeys(item));
    console.log(reorderedItems);

    response = {
      statusCode: 200,
      body: JSON.stringify(reorderedItems),
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

function reorderKeys(item: DynamoDB.DocumentClient.AttributeMap) {
  const keys: Array<string> = ['playerId', 'timestamp']; // replace with your actual key attribute names
  let newItem: DynamoDB.DocumentClient.AttributeMap = {};
  keys.forEach(key => {
    newItem[key] = item[key];
  });
  Object.keys(item).forEach(key => {
    if (!newItem.hasOwnProperty(key)) {
      newItem[key] = item[key];
    }
  });
  return newItem;
}
