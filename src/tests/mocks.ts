import { APIGatewayProxyEvent } from 'aws-lambda';

export const wgtGuruApiEvent: APIGatewayProxyEvent = {
    body: '',
    headers: {},
    multiValueHeaders: {},
    httpMethod: 'GET',
    isBase64Encoded: false,
    path: '',
    pathParameters: {},
    queryStringParameters: {},
    multiValueQueryStringParameters: {},
    stageVariables: {},
    requestContext: {
        accountId: '',
        apiId: '',
        httpMethod: 'GET',
        identity: {
            accessKey: null,
            accountId: null,
            apiKey: null,
            apiKeyId: null,
            caller: null,
            cognitoAuthenticationProvider: null,
            cognitoAuthenticationType: null,
            cognitoIdentityId: null,
            cognitoIdentityPoolId: null,
            sourceIp: '',
            user: null,
            userAgent: null,
            userArn: null,
            clientCert: null,
            principalOrgId: null,
        },
        path: '',
        stage: '',
        requestId: '',
        requestTimeEpoch: 0,
        resourceId: '',
        resourcePath: '',
        authorizer: {}, // or your authorizer context
        protocol: 'HTTP/1.1' // or your protocol
    },

    resource: '',
};

// Add any additional reusable mocks here
