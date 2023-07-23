import { DynamoDB } from 'aws-sdk';

export const sampleSwing: { Items: DynamoDB.DocumentClient.AttributeMap[] } = {
    Items: [
        {
            "playerId": "player1",
            "timestamp": 1620000000000,
            "targetSurface": 0,
            "yaw": 1.2,
            "powerMeter": 85,
            "stickBrand": "titlest",
            "stick": 10,
            "windSpeed": 10,
            "greenSpeed": 9,
            "teed": 0,
            "ballBrand": "nike",
            "elevation": 2,
            "ballSpin": -3,
            "rollDistance": 20,
            "windDirection": 1
        }
    ]
};
