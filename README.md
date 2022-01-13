# Forza Open Telemetry Server

A node.js based telemetry collector for Forza Horizon 5.

The primary goal is to listen for the telemetry data over udp, parse into the structure defined by `src/schema/telemetry-schema.json`, then forward on to another listener.

## Running the Server

To run the server in development mode, which auto restarts when changes are detected:

`npm run dev`

To build the server:

`npm run build`

To start the server from dist (the build version):

`npm start`
