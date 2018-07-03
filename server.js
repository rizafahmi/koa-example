const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const { ObjectId } = require('mongodb');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(logger());
require('./db.js')(app);

router.get('/', async (context) => {
  const { name = 'Koa!' } = context.request.query;
  context.body = { message: `Hello, ${name}` };
});

router.post('/', async (context) => {
  const { name = 'Koa!' } = context.request.body;
  context.body = { message: `Hello, ${name}` };
});

router.get('/people', async (context) => {
  // console.log(context.people.find);
  context.body = await context.people.find().toArray();
  // console.log(context.app.people);
});
router.post('/people', async (context) => {
  context.body = await context.people.insert(context.request.body);
});
router.get('/people/:id', async (context) => {
  context.body = await context.people.findOne({
    _id: ObjectId(context.params.id),
  });
});
router.put('/people/:id', async (context) => {
  context.body = await context.people.replaceOne(
    { _id: ObjectId(context.params.id) },
    context.request.body,
  );
});
router.delete('/people/:id', async (context) => {
  context.body = await context.people.deleteOne({
    _id: ObjectId(context.params.id),
  });
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
