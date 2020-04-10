import './env';
import express  from 'express';
import { GraphQLServer } from 'graphql-yoga';
import logger from 'morgan';
import schema from './schema';
import { authenticateJwt } from './passport';
import './passport';

const PORT = process.env.PORT || 4000;
const DOMAIN = process.env.DOMAIN;

const server = new GraphQLServer({
  schema,
  context: ({request}) => ({ request })
});

const options = {
  port: PORT
};

server.express.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.express.use(logger('dev'));
server.express.use(authenticateJwt);
server.express.use('/static', express.static(process.cwd() + '/uploads'));

server.start(options, () => console.log(`✅ Server running on port http://localhost:${PORT}`));
