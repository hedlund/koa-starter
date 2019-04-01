import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as redisStore from 'koa-redis';
import { errorHandler } from './helpers/error';
import initAuthentication from './auth/init';
import authRouter from './auth/routes';

// Create Koa app
const app = new Koa();

// Sessions
const store = redisStore({
  host: process.env.REDIS_HOST,
  port: +process.env.REDIS_PORT
});
app.keys = [process.env.SESSION_SECRET];
app.use(session({ store }, app));

// Parse bodies
app.use(bodyParser());

// Error handling
app.use(errorHandler);
app.on('error', (err, ctx) => {
  //TODO: Needs more cowbell!
  console.error(err);
});

// Authentication
initAuthentication(app);

// Routes
app.use(authRouter.routes())

// Start server
const PORT = +process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});

export default server;
