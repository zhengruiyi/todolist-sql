const express = require("express");
const app = express();
const mustache = require("mustache-express");
const bodyParser = require('body-parser');
const models = require("./models")
var faker = require('faker');

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(3000, function(){
  console.log("We are listening (3000)")
})

app.get('/', function(req, res){
  const todo = models.mytodolist.findAll(
    {where: {status: false}})
    .then( function(incomplete){
      let task_incomplete = incomplete;
      models.mytodolist.findAll(
        {where: {status: true}})
        .then( function(complete){
          let task_complete= complete;
          res.render('index', {
            incomplete: task_incomplete,
            mark_Completed: task_complete
          })
        })
      })
    });

app.post('/add', function(req, res){
  var task = models.mytodolist.build({
    title: req.body.todo,
    status: false
  })
  task.save().then(function(){
    res.redirect('/')
  })
})

app.post('/complete', function(req, res){
  var mark_task = req.body.name;
  var task2 = models.mytodolist.update(
    {status: true}, {where: {title: mark_task}});
  res.redirect('/')

})
