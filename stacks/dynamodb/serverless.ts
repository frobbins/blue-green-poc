import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'wgt-golf-swings-db',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
  },
  resources: {
    Resources: {
      SwingsDynamoDbTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
          AttributeDefinitions: [{
            AttributeName: 'swingId',
            AttributeType: 'S',
          }],
          KeySchema: [{
            AttributeName: 'swingId',
            KeyType: 'HASH',
          }],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          TableName: '${self:service}-${opt:stage, self:provider.stage}',
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
