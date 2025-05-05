const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
require('dotenv').config()

let id = 1;
const users = [];
const exercises = [];

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/api/users', (req, res) => {
  res.json(users);
}) 

app.post('/api/users', (req, res) => {
  const { username } = req.body;
  users.push({username: username, _id: String(id)})
  res.json({username: username, _id: String(id)});
  id++
})

app.post('/api/users/:_id/exercises', (req, res) => {
  const { description, duration, date } = req.body;
  const idParam = req.params._id;

  const user = users.find((user) => user._id === String(idParam))
  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  const exercise = {
    username: user.username,
    description,
    duration: parseInt(duration),
    date: date? new Date(date).toDateString() : new Date().toDateString(),
    _id: idParam
  }
  exercises.push(exercise)
  res.json(exercise)
})

app.get('/api/users/:_id/logs?', (req, res) => {
  const { from, to, limit } = req.query;
  const idParam = req.params._id;

  const user = users.find((user) => user._id === String(idParam))
  if (!user) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }

  const exercisesFilterd = exercises.filter((exercise) => {
    const exerciseDate = new Date(exercise.date).getTime();
    const fromDate = from ? new Date(from).getTime() : null;
    const toDate = to ? new Date(to).getTime() : null;

    if (exercise._id === String(idParam) &&
      (!from || (fromDate && fromDate <= exerciseDate)) &&
      (!to || (toDate && exerciseDate <= toDate))) {
      return true;
    }
    return false;
  })
  .map(({ description, duration, date }) => ({ description, duration, date })) 
  .slice(0, limit ?? Infinity)

  res.json({
    username: user.username,
    count: exercisesFilterd.length,
    _id: user._id,
    log: exercisesFilterd
  })
})

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
