import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  try {
    const endpoint = process.env.GET_SWINGS_ENDPOINT || '';

    const apiResponse = await axios.get(endpoint);

    if (apiResponse.status === 200 && Array.isArray(apiResponse.data)) {
      console.log('Test passed. Swings retrieved successfully.');
    } else {
      console.error('Test failed. Unexpected response:', apiResponse.status, apiResponse.data);
    }

    response = {
      statusCode: 200,
      body: JSON.stringify(apiResponse.data),
    };
} catch (error) {
    console.error('Test failed. Unable to retrieve swings:', error.message);

    response = {
      statusCode: 500,
      body: JSON.stringify({ message: 'Test failed' }),
    };
  }

  return response;
};