#!/usr/bin/env node

const config = require('./config');

if (!config.dashbutton) {
    console.log('Add your dash button MAC address to ./config.js');
    process.exit();
}

const network = require('./dash/network');
const btrack = require('./dash/btrack-dash');

network.listenForDashPress(config.dashbutton, btrack.nap);
// network.listenForDashPress(config.dashbutton, btrack.feeding);
