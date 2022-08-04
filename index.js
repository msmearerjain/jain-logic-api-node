const JainLogicApiClient = require('./JainLogicApiClient');
const JainLogicApi = require('./JainLogicApi');

// Create a client with the base URI and Jain Logic API key
const client = new JainLogicApiClient(
    'https://<YOUR_API_URI>', '<YOUR_API_KEY>'
);

async function readApiData() {
    // Read all customers
    const customers = await client.getCustomers();

    // Read all measured locations for the first customer
    const measuredLocations = await client.getMeasuredLocations(customers[0].id);

    // Build a window representing 3 hours
    const window = JainLogicApi.BuildWindow(new Date(), 3);

    // Read observation data for the first device on the first measured location    
    const observationData = await client.getObservationsForDevice(
        customers[0].id, measuredLocations[0].devices[0].id, 
        window.start, window.end, JainLogicApi.ObservationIntervals.Raw);

    observationData.forEach(sensorObservations => {
        console.log(`observations for ${sensorObservations.measurementId} (${sensorObservations.measurementType}) in ${sensorObservations.unitOfMeasureLabel}:`);

        sensorObservations.observations.forEach(observation => {
            console.log(`${observation.stamp}: ${observation.value}`);
        });
    });
}

readApiData()
    .then(() => {
        console.log('complete');
    })
    .catch((error) => {
        console.error(error);
    });
