var pcap        = require('pcap');
var utils       = require('./utils');
var pcapSession = pcap.createSession('en0');

module.exports = {
  listenForDashPress: function(dashbutton, handler) {
    console.log("listening...");
    pcapSession.on('packet', function(rawPacket) {
      var packet = pcap.decode.packet(rawPacket);
      var dadd   = packet.payload.shost.addr;
      var mac    = utils.dadd2hadd(dadd);
      if (mac === dashbutton && utils.throttled()) {
        console.log("got a request from dash button!");
        handler();
      }
    });
  }
};
