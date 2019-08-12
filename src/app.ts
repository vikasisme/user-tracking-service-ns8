import express from 'express';
const server = express();
server.listen( 8008, (): void => console.log('Server running on port 8008' ));