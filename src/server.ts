import RainwayRuntime from 'rainway-sdk-native';

const API_KEY = 'ADD THE API HERE';

if (process.platform === 'win32') {
  var rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('SIGINT', function () {
    // @ts-ignore
    process.emit('SIGINT');
  });
}

process.on('SIGINT', function () {
  console.log('Gracefully shuttin down');
  //graceful shutdown
  process.exit();
});

export async function initServer() {
  console.log('starting server');

  try {
    const runtime = await RainwayRuntime.initialize({
      apiKey: API_KEY,
      onRuntimeConnectionLost: (error) => {
        console.log(error);
      },
      onConnectionRequest: (request) => {
        console.log('Peer connection request');
        request.accept();
        console.log('In theory, we accepted the request');
      },
      onPeerConnect: (peer) => {
        console.log('peer connected', peer);
      },
      onPeerMessage: (peer, data) => {},
      onPeerError: (peer, error) => {
        console.log('peer had an error', error);
      },
      onPeerDisconnect: (peer) => {},
      externalId: '',
      hostPort: 3379,
      onStreamAnnouncement: () => {},
      onStreamStop: (stream) => {},
      onStreamRequest: (request) => {
        request.accept({
          canUseGamepad: true,
          canUseKeyboard: true,
          canUseMouse: true,
        });
      },
    });

    console.log(runtime.hostname);
  } catch (e) {
    console.log('error occured', e);
  }

  console.log('Runtime ready');
}
