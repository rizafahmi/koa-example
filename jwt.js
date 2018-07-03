const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');

const SECRET = 'S3cRET~!';
const jwtInstance = jwt({ secret: SECRET });
const jwtErrorHandler = (ctx, next) =>
  next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: 'No authorized',
      };
    } else {
      throw err;
    }
  });

module.exports = {
  jwt: () => jwtInstance,
  errorHandler: () => jwtErrorHandler,
  issue: payload => jsonwebtoken.sign(payload, SECRET),
};
