import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  resolve: {
    fallback: {
      fs: false,
      tls: false,
      net: false,
      https: false,
      url: false,
      path: false,
      util: false,
      stream: false,
      crypto: false,
      string_decoder: false,
      http: false,
      os: false,
      zlib: false,
      querystring: false,
      buffer: false,
    },
  },
  entry: `./backend/server.js`,
  output: {
    path: `${__dirname}/build`,
    filename: 'server.js',
  },
};
