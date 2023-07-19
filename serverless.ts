import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'wgt-guru',
  frameworkVersion: '*',
  custom: {
    'serverless-plugin-canary-deployments': {
      stages: ['pink'],
      preTrafficHook: 'preTrafficHook',
      postTrafficHook: 'postTrafficHook',
      automaticRollback: true,
      type: 'Linear10PercentEvery2Minute',
      alias: 'Live',
    },
  },
  plugins: ['serverless-webpack', 'serverless-plugin-canary-deployments'],
  provider: {
    stage: 'pink',
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'us-east-1',
    environment: {
      DYNAMODB_TABLE: 'wgt-golf-swings-db-green'
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
