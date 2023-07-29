import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'wgt-guru',
  frameworkVersion: '*',
  plugins: ['serverless-webpack'],
  provider: {
    stage: 'pink',
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'us-east-1',
    environment: {
      DYNAMODB_TABLE: 'GolfSwingMetrics'
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
      handler: 'src/handlers/createSwing.createSwing',
      events: [{
        http: {
          path: 'swing',
          method: 'post',
          cors: true,          
        },
      }],
    },
    getAllSwings: {
      handler: 'src/handlers/getSwings.getSwings',
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
      tags: {
        TestType: 'Smoke'
      },  
      events: [{
        http: {
          method: 'get',
          path: 'healthcheck',          
        }
      }]
    }
  },
  outputs: {
    ApiEndpoint: {
      Description: "API Gateway endpoint URL for your service",
      Value: {
        "Fn::Sub": "https://${ApiGatewayRestApi}.execute-api.${AWS::Region}.amazonaws.com/${opt:stage, self:provider.stage}/"
      }
    }
  },    
};

module.exports = serverlessConfiguration;
