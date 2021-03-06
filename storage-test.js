// Imports the Google Cloud client library
const {Datastore} = require('@google-cloud/datastore');

async function quickStart() {
  // Your Google Cloud Platform project ID
  const projectId = 'arboreal-vector-277505';
  const keyFileName = 'C:\Users\whenham\OneDrive - Deloitte (O365D)\Documents\appdev\todoappv2\arboreal-vector-277505-2bf64cbefde9.json'

  // Creates a client
  const datastore = new Datastore({
    projectId: projectId,
    keyFileName: keyFileName
  });

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
