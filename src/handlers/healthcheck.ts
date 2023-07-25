import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

export const main: APIGatewayProxyHandler = async () => {
    // Database healthcheck
    try {
        const params = {
            TableName: process.env.DYNAMODB_TABLE || '',
        };

        await db.scan(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Server and database are healthy for staging!',
            }),
        };
    } catch (error) {
        console.error('Database healthcheck failed for staging!:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Server is healthy, but database connection failed for staging!',
            }),
        };
    }
};
