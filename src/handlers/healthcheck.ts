import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

export const main: APIGatewayProxyHandler = async (event) => {

    console.info('Received headers:', JSON.stringify(event.headers));

    console.info('Received query params:', JSON.stringify(event.queryStringParameters));

    if (event.queryStringParameters && event.queryStringParameters['error-flag'] === 'true') {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error flag detected in query parameters. Health check failed :(',
            }),
        };
    }
    console.info('No error flag found in the request, proceeding with the healthcheck.');

    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE || '',
        };

        await db.scan(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Server and database are healthy :)',
            }),
        };
    } catch (error) {
        console.error('Database healthcheck failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Server is healthy, but database connection failed :(',
            }),
        };
    }
};
