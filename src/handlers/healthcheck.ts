import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

export const main: APIGatewayProxyHandler = async (event) => {
    // Database healthcheck
    // Check for error flag in header
    console.info('Checking headers for the error-flag....');

    console.info('Received headers:', JSON.stringify(event.headers));

    if (event.headers && event.headers['error-flag']) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Error flag detected in header. Health check failed :(',
            }),
        };
    } else {
        console.error('No error flag found in the request, proceeding with the healthcheck.');
    }
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
