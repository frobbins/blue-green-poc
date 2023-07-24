import { APIGatewayProxyResult, Context } from 'aws-lambda';
import AWS from 'aws-sdk'; // Import AWS as a default import
import { getSwings } from '@functions/getSwings';
import AWSMock from 'aws-sdk-mock';
import { wgtGuruApiEvent } from './mocks';
import { reorderKeys } from '@utils/reorderKeys';
import { sampleSwing } from './fixtures';

// Create a mock context
const context = {} as Context;

describe('getSwings handler', () => {
    let originalDynamoDbTable: string;

    beforeAll(() => {
        // Save the original DYNAMODB_TABLE environment variable and set a new value for testing
        if (process.env.DYNAMODB_TABLE) {
            originalDynamoDbTable = process.env.DYNAMODB_TABLE;
        }
        process.env.DYNAMODB_TABLE = 'GolfSwingMetrics';

        // Mock the DynamoDB scan function to return sampleSwing
        AWSMock.setSDKInstance(AWS);
        AWSMock.mock('DynamoDB.DocumentClient', 'scan', (callback: Function) => {
            callback(null, sampleSwing);
        });
    });

    afterAll(() => {
        // Restore the original DYNAMODB_TABLE environment variable
        process.env.DYNAMODB_TABLE = originalDynamoDbTable;

        // Restore the original DynamoDB scan function
        AWSMock.restore('DynamoDB.DocumentClient', 'scan');
    });

    it('returns successful response if scan is successful', async () => {
        const result = await getSwings(wgtGuruApiEvent, context, () => {});
        const response: APIGatewayProxyResult = result as APIGatewayProxyResult;

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(JSON.stringify(sampleSwing.Items.map(item => reorderKeys(item))));
    });

});
