#!/usr/bin/env node

"use strict";

const { log } = require("console");
const fs = require("fs");
const { exit } = require("process");

const params = process.argv;
const BASE_PATH = params[1];
const PARAMS_1 = params[2];
const PARAMS_2 = params[3];


// manual
const INIT_HELP = `${__dirname}/core-v2/manual/help.stub`;
const MANUAL_HELP = `${__dirname}/core-v2/manual/help.stub`;
const GENERATE_SERVICE_HELP = `${__dirname}/core-v2/manual/generate_service_help.stub`;


const COMMAND = {
    LIST: [
        "--help",
        "init",
        "generate:service",
        "generate:plugin"
    ],
    HELP: "--help",
    INIT: "init",
    GENERATE_SERVICE: "generate:service",
    GENERATE_PLUGIN: "generate:plugin"
};

function showHelp(target) {
    const data = fs.readFileSync(target, "utf8");
    console.log(data);
    exit();
}


const SERVICE_OPTIONS = {
    LIST: ["--help", "-s"],
    HELP: "--help",
    SERVICE: "-s"
};

function getServieOptions() {

    let SERVIE_NAME = "";
    // show help
    params.forEach((o) => {
        const option = SERVICE_OPTIONS.LIST.includes(o) ? o : "";
        switch (option) {
            case SERVICE_OPTIONS.HELP:
                showHelp(GENERATE_SERVICE_HELP);
                break;
            default:
                break;
        }
    });


    params.forEach((o, index) => {
        const option = SERVICE_OPTIONS.LIST.includes(o) ? o : "";

        switch (option) {
            case SERVICE_OPTIONS.SERVICE:
                SERVIE_NAME = params[index + 1].toString();
                break;
        }
    })

    if(SERVIE_NAME === ""){
        console.log("ERROR: Service name is required, sma generate:service -s <service_name>");
        exit();
    }

    //console.log(`Generating Service boilerplates:`+SERVIE_NAME);

    generateServiceBoilerplates(SERVIE_NAME);

    exit();
}

function getPluginOptions() {
    exit();
}


function generateServiceBoilerplates(serviceName) {
    console.log("Generating Service boilerplates: "+serviceName);
}

function main(c) {
    const command = COMMAND.LIST.includes(c) ? c : "";



    switch (command) {
        case COMMAND.HELP:
            showHelp(MANUAL_HELP);
            break;
        case COMMAND.GENERATE_SERVICE:
            getServieOptions();
            break;
        case COMMAND.GENERATE_PLUGIN:
            getPluginOptions();
            break;
        default:
            console.log("ERROR: Unkown Command pls refer to --help");
            showHelp(MANUAL_HELP);
            exit();
    }
}

/**
 *  Start of main
 *
 */
main(PARAMS_1);
