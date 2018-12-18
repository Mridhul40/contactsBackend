const Sequelize = require('sequelize');
const { contact, message } = require('./models');

const db = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/store.db'
});

const Contact = db.define('contact', contact);
const Message = db.define('message', message);

Message.belongsTo(Contact);
Contact.hasMany(Message);

module.exports = {
  db,
  Contact,
  Message
}
