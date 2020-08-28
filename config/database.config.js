const Redshift = require('node-redshift');

const clientConfiguration = {
    user: "jewelcloudrs",
    database: "jewelcloud",
    password: "7pUHm2Qa9YsnFUV",
    port: 5439,
    host: "jewelcloud-rs.cvjykrynhxhb.us-east-1.redshift.amazonaws.com",

};

const rsClient = new Redshift(clientConfiguration);

module.exports = {
    url: 'mongodb://gemfind:Express#321@34.205.171.23:27017/gemfind',
    //url: 'mongodb://gemfind:tempP#555@10.1.1.13:27017/gemfind_local',
    //url:'mongodb://gemfind:*****@10.1.1.13:27017/?authSource=gemfind_local&readPreference=primary',
    redshiftClient : rsClient,
}


