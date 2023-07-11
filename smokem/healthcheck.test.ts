import axios from 'axios';

async function getActiveStage(): Promise<string> {
    const response = await axios.get('https://example.com/active-stage');
    return response.data.stage;
}

async function runSmokeTest() {
    try {
        const activeStage = await getActiveStage();

        // Determine the appropriate health check URL based on the active stage
        const healthCheckUrl = activeStage === 'blue'
            ? 'https://blue.example.com/health'
            : 'https://green.example.com/health';

        // Call the health check URL
        const response = await axios.get(healthCheckUrl);

        // Validate the response as per your smoke test requirements
        if (response.status === 200) {
            console.log('Smoke test passed');
        } else {
            console.log('Smoke test failed');
        }
    } catch (error) {
        console.error('Error occurred during smoke test:', error);
    }
}

// Run the smoke test
runSmokeTest();
