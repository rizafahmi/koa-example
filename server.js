const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const { ObjectId } = require('mongodb');
const jwt = require('./jwt.js');

const app = new Koa();
const router = new Router();
const securedRouter = new Router();

app.use(bodyParser());
app.use(logger());
require('./db.js')(app);

app.use(router.routes()).use(router.allowedMethods());
securedRouter.use(jwt.errorHandler()).use(jwt.jwt());
app.use(securedRouter.routes()).use(securedRouter.allowedMethods());

router.get('/', async (context) => {
  const { name = 'Koa!' } = context.request.query;
  context.body = { message: `Hello, ${name}` };
});

router.post('/', async (context) => {
  const { name = 'Koa!' } = context.request.body;
  context.body = { message: `Hello, ${name}` };
});

router.post('/auth', async (context) => {
  const { username, password } = context.request.body;

  if (username === 'user' && password === 'pwd') {
    context.body = {
      token: jwt.issue({
        user: 'user',
        role: 'admin',
      }),
    };
  } else {
    context.status = 401;
    context.body = { error: 'Invalid login' };
  }
});

securedRouter.get('/people', async (context) => {
  // console.log(context.people.find);
  context.body = await context.people.find().toArray();
  // console.log(context.app.people);
});
securedRouter.post('/people', async (context) => {
  context.body = await context.people.insert(context.request.body);
});
securedRouter.get('/people/:id', async (context) => {
  context.body = await context.people.findOne({
    _id: ObjectId(context.params.id),
  });
});
securedRouter.put('/people/:id', async (context) => {
  context.body = await context.people.replaceOne(
    { _id: ObjectId(context.params.id) },
    context.request.body,
  );
});
securedRouter.delete('/people/:id', async (context) => {
  context.body = await context.people.deleteOne({
    _id: ObjectId(context.params.id),
  });
});

app.listen(3000);
