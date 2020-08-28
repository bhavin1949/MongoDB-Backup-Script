const environment = {
    local: 'C:\\Bhavin\\GemFind 2.0\\Latest\\Backend\\Gemfind_Backend',
    prod: 'C:\\inetpub\\JewelCloudAPI - Mongo',
    testing: 'C:\\inetpub\\JewelCloudAPI - Mongo',
};

const port = {
    local: 4000,
    prod: 4000,
    testing: 5000,
};

const pentahoPort = {
    gemfindServer: "http://localhost:8090",
    localServer: "http://10.1.1.13:8090"
};

module.exports = {
    location: environment.local,
    backendPort: port.local,
    pentahoPort: pentahoPort.gemfindServer
}