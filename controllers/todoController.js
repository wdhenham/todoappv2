const {Datastore} = require('@google-cloud/datastore');
const projectId = 'arboreal-vector-277505';
const keyFilename = 'arboreal-vector-277505-2bf64cbefde9.json'
const datastore = new Datastore({projectId: projectId,keyFilename: keyFilename}); //allows us to access datastore

module.exports = async function(app, bodyParser){
  var data = [{item : 'get milk'}, {item: 'walk the dog'}, {item: 'do some work'}];
  const kind = 'task';


  for (var i = 0; i < data.length; i++) {
    var name = 'task'+(i);
    var taskKey = datastore.key([kind, name]);

    var task = {
      key: taskKey,
      data: {
        description: data[i].item
      }
    }
    console.log(task);
    await datastore.save(task);
    console.log(`Saved ${task.key.name}: ${task.data.description}`);

  }


  var urlencodedParser = bodyParser.urlencoded({extended: true});

  //todo page
  app.get('/todo', function(req, res){
    res.render('todo', {todos: data});
    console.log(data);
  });

  app.post('/todo', urlencodedParser, async function(req, res){
    data.push(req.body);

    var name = 'task'+(data.length-1);
    var taskKey = datastore.key([kind, name]);
    var task = {
      key: taskKey,
      data: {
        description: data[(data.length-1)].item
      }
    }

    await datastore.save(task);
    console.log(`Saved ${task.key.name}: ${task.data.description}`);

    res.json(data);
    console.log('POST')
  });

  app.delete('/todo/:item', function(req, res){
    data = data.filter(function(todo){
      return todo.item.replace(/ /g, '-') !== req.params.item;
    });
    res.json(data);
  });

};
