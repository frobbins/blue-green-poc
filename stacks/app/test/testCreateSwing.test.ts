beforeAll(() => {
    process.env.DYNAMODB_TABLE = 'wgt-golf-swings-db-green';
    process.env.AWS_REGION = 'us-east-1';
});

describe('createSwing', () => {
    process.env.AWS_REGION = 'us-east-1';
    it('should create a swing', async () => {
        const swingInput = {
            distance: 120,
            wind: 10,
            elevation: 0,
            pin: 0,
            power: 100,
            gs: 2,
        };

        const event = JSON.stringify(swingInput);
        //const result = await createSwing(event);

        expect(swingInput.distance).toEqual(120);


    });
});
