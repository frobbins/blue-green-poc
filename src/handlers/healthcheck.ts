import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as AWS from 'aws-sdk';

const db = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
const version = process.env.AWS_LAMBDA_FUNCTION_VERSION;

export const main: APIGatewayProxyHandler = async (event) => {
    console.info(`Entry: Healthcheck version: ${version}`);
    if (event.queryStringParameters && event.queryStringParameters['error-flag'] === 'true') {
        console.info(`Healthcheck version: ${version} : Error flag detected!`);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Healthcheck version: ${version} : Error flag detected!`,
            }),
        };
    }
    console.info(`Healthcheck version: ${version} : No error flag.`);

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
                message: 'Server is healthy, but database connection failed!! :(',
            }),
        };
    }
};
