import { createSwing } from '../src/handlers/createSwing';

beforeAll(() => {
    process.env.DYNAMODB_TABLE = 'wgt-golf-swings-db-green';
    process.env.AWS_REGION = 'us-east-1';
});

describe('createSwing', () => {
    process.env.AWS_REGION = 'us-east-1';
    it('should create a swing', async () => {
        const swingInput = {
            distance: 100,
            wind: 1,
            elevation: 0,
            pin: 0,
            power: 95,
            gs: 1,
        };

        const event = JSON.stringify(swingInput);
        const result = await createSwing(event);

        expect(result.statusCode).toEqual(200);

        const body = JSON.parse(result.body);

        expect(body).toHaveProperty('distance');
        expect(body.distance).toEqual(100);
        expect(body).toHaveProperty('gs');
        expect(body.gs).toEqual(1);
        expect(body).toHaveProperty('elevation');
        expect(body.elevation).toEqual(0);
        // expect(body).toHaveProperty('wind');
        // expect(body.wind).toEqual(0);
        expect(body).toHaveProperty('power');
        expect(body.power).toEqual(95);
        // expect(body).toHaveProperty('swingId');
        // expect(body.swingId).toBe(String)
    });
});
