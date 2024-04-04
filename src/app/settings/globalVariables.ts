import 'dotenv/config.js';
import 'convict';
import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

convict.addFormats(convictFormatWithValidator);

const config = convict({
  ip: {
    doc: 'The IP address to bind.',
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_VALID_ADDRESS'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 3000,
    env: 'PORT'
  },
  salt: {
    doc: 'Salt string for hash.',
    format: String,
    default: '',
    env: 'SALT'
  }
});

export const env = {
  PORT: config.get('port'),
  IP_VALID_ADDRESS: config.get('ip'),
  SALT: config.get('salt')
};
