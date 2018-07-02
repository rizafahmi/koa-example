const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', async (context) => {
  const { name = 'Koa!' } = context.request.query;
  context.body = { message: `Hello, ${name}` };
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
