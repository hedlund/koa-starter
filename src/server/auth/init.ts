import * as Koa from 'koa';
import * as passport from 'koa-passport';
import { Strategy } from 'passport-local';
import { getUser, authenticate } from './service';

const options = {};

const initAuthentication = (app: Koa) => {

  passport.serializeUser((user: any, done) => { done(null, user.id); });

  passport.deserializeUser(async (id: number, done) => {
    try {
      const user = await getUser(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(new Strategy(options, async (username, password, done) => {
    try {
      const user = await authenticate(username, password);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());
};

export default initAuthentication;
