import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

process.env.KNOWN_EXTS = 'js,ts,json';

register('ts-node/esm', pathToFileURL('./'));
register('specifier-resolution-node', pathToFileURL('./'));
