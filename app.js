
var express = require('express');
var todoController = require('./controllers/todoController')
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

//set template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
todoController(app, bodyParser);

//listen to port
app.listen(3000);
console.log('You are listening to port 3000');

/*
//TEsting the storage
// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

async function quickStart() {
  // Your Google Cloud Platform project ID
  const projectId = 'arboreal-vector-277505';
  const keyFilename = 'arboreal-vector-277505-2bf64cbefde9.json'

  // Creates a client
  const datastore = new Datastore({projectId: projectId,keyFilename: keyFilename});

  // The kind for the new entity
  const kind = 'Task';
  // The name/ID for the new entity
  const name = 'sampletask1';
  // The Cloud Datastore key for the new entity
  const taskKey = datastore.key([kind, name]);

  // Prepares the new entity
  const task = {
    key: taskKey,
    data: {
      description: 'Buy milk',
    },
  };

  // Saves the entity
  await datastore.save(task);
  console.log(`Saved ${task.key.name}: ${task.data.description}`);
}
quickStart().catch(console.error);
*/
