const axios = require('axios').default;

class JainLogicApiClient {
    constructor(baseUri, apiKey) {
        this.#axios = axios.create({
            baseURL: baseUri,
            timeout: 5000,
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': apiKey
            }
          });
    }

    #axios;

    async getCustomers() {
        const response = await this.#axios.get('customers');
        
        console.log(response.request.path);

        return response.data;
    }

    async getMeasuredLocations(customerId) {
        const response = await this.#axios.get(
            'measuredLocations', { 
                params: {
                    customerId: customerId
                }
             });

        console.log(response.request.path);

        return response.data;
    }

    async getObservationsForDevice(customerId, deviceId, windowStart, windowEnd, interval) {
        const response = await this.#axios.get(
            `devices/${deviceId}/observationdatasets`, {
                params: {
                    customerId: customerId,
                    start: windowStart.toISOString(), // NOTE FORMATTING AS ISO
                    end: windowEnd.toISOString(), // NOTE FORMATTING AS ISO
                    interval: interval
                }
            }
        )

        console.log(response.request.path);

        return response.data;
    }
}

module.exports = JainLogicApiClient;