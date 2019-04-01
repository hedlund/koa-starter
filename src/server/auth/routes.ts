import { ParameterizedContext } from 'koa';
import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import { register } from './service';

const router = new Router();

const authenticateUser = (ctx: ParameterizedContext<any, {}>) =>
  passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      ctx.login(user);
      ctx.body = { success: true };
    } else {
      ctx.throw(400, err);
    }
  })(ctx, null);

router.post('/auth/register', async ctx => {
  const { username, password } = ctx.request.body;
  await register(username, password);
  return authenticateUser(ctx);
});

router.post('/auth/login', async ctx => authenticateUser(ctx));

router.post('/auth/logout', async ctx => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.body = { success: true };
  } else {
    ctx.throw(401, 'Not authenticated');
  }
});

export default router;
