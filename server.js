const express = require('express');
var cors = require('cors');
const { db } = require('./db/index');

const app = express()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/contacts', require('./routes/contacts'));
app.use('/messages', require('./routes/messages'));

db.sync()
  .then(() => {
  console.log("Database synced");
  app.listen(4040, () => {
    console.log("Server start on port 4040");
  });
}).catch(console.error);
