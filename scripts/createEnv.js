import fs from 'fs';

fs.writeFileSync('./.env', `VITE_SOCKET_URL=${process.env.VITE_SOCKET_URL}\n`);