const sinon = require('sinon')
const Service = require('./service')
const { deepStrictEqual } = require('assert')
const BASE_URL_1 = "https://swapi.dev/api/planets/1/"
const BASE_URL_2 = "https://swapi.dev/api/planets/2/"

const mocks = {
    tatooine: require('./mocks/tatooine.json'),
    alderaan: require('./mocks/alderaan.json')
}

;(async () => {

    // {
        //vai para internet
        // const service = new Service();
        // const withouStub = await service.makeRequest(BASE_URL_2)
        // console.log(JSON.stringify(withouStub))
    // }

    const service = new Service()
    const stub = sinon.stub(service, service.makeRequest.name)

    stub
        .withArgs(BASE_URL_1)
        .resolves(mocks.tatooine)
    stub
        .withArgs(BASE_URL_2)
        .resolves(mocks.alderaan)

    // {
    //     const response = await service.makeRequest(BASE_URL_1)
    //     console.log('response', response)
    // }

    {
        const expected = {
            "name": "Tatooine",
            "surfaceWater": "1",
            "appeareadIn": 5
        }
        const results = await service.getPlanets(BASE_URL_1)
        deepStrictEqual(results, expected)
    }
    {
        const expected = {
            "name": "Alderaan",
            "surfaceWater": "40",
            "appeareadIn": 2
        }
        const results = await service.getPlanets(BASE_URL_2)
        deepStrictEqual(results, expected)
    }

})();