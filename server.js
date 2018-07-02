const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.get('/', async (context) => {
  const { name = 'Koa!' } = context.request.query;
  context.body = { message: `Hello, ${name}` };
});

router.post('/', async (context) => {
  const { name = 'Koa!' } = context.request.body;
  context.body = { message: `Hello, ${name}` };
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
