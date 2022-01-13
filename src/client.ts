import * as dgram from 'dgram';

const client = dgram.createSocket('udp4');

client.send('Hello World', 11000, () => {
  console.log('Message Sent');
  client.close();
});
