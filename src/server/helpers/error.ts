import { Context } from 'koa';

export const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = {
      success: false,
      message: err.message,
    };
    //TODO: remove this cast when the typings have been fixed:
    //      https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32389
    (ctx.app as any).emit('error', err, ctx);
  }
};
