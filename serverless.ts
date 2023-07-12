import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'wgt-guru',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    environment: {
      DYNAMODB_TABLE: 'wgt-golf-swings-db-${opt:stage, self:provider.stage}',
    },
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: [
        'dynamodb:PutItem',
        'dynamodb:Scan',
      ],
      Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${self:provider.environment.DYNAMODB_TABLE}',
    }],
  },
  functions: {
    createSwing: {
      handler: 'src/handlers/createSwing.main',
      events: [{
        http: {
          path: 'swing',
          method: 'post',
          cors: true,
        },
      }],
    },
    getAllSwings: {
      handler: 'src/handlers/getSwings.main',
      events: [{
        http: {
          path: 'swings',
          method: 'get',
          cors: true,
        },
      }],
    },
    healthcheck: {
      handler: 'src/handlers/healthcheck.main',
      events: [{
        http: {
          method: 'get',
          path: 'healthcheck',
        }
      }]
    },
    getActiveStage: {
      handler: 'src/utils/activeStage.getActiveStage',
      events: [
        {
          http: {
            method: 'get',
            path: 'active-stage',
          },
        },
      ],
    }
  },
};

module.exports = serverlessConfiguration;
