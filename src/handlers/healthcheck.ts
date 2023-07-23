import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

export const main: APIGatewayProxyHandler = async () => {
    // Database healthcheck
    try {
        await db.get({ TableName: process.env.TABLE_NAME!, Key: { id: 'healthcheck' } }).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Server and database are healthy',
            }),
        };
    } catch (error) {
        console.error('Database healthcheck failed:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Server is healthy, but database connection failed',
            }),
        };
    }
};
