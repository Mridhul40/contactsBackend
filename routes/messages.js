const { Router } = require('express');
const { Contact, Message } = require('../db/index');
const accountSid = "AC4ac9b7f5485998872bc15eeb4992063e";
const authToken = "c4434d63f121f26ce08dfacb01a8c614";
const twc = require('twilio')(accountSid, authToken);

const route = Router()

route.get('/', async(req, res) => {
  try{
    const messages = await Message.findAll({
      include: [Contact]
    });

    messages.sort((a,b) => {
      var dA = new Date(a.datetime).getTime();
      var dB = new Date(b.datetime).getTime();
      return dA > dB ? 1 : -1;
    });
    res.status(200).json({ messages: messages });
  } catch(e) {
    res.status(500).json({message: 'Error in processing request'});
  }
});

route.get('/:number', async(req, res) => {
  try{
    const contact = await Contact.findOne({
      where: {
        number: req.params.number
      }
    });

    const messages = await Message.findAll({
      where: {
        contactId: contact.id
      }
    });

    messages.sort((a,b) => {
      var dA = new Date(a.datetime).getTime();
      var dB = new Date(b.datetime).getTime();
      return dA > dB ? 1 : -1;
    });
    res.status(200).json({ messages: messages });
  } catch(e) {
    res.status(500).json({message: "Error in processing request"});
  }
});

route.post('/', async(req, res) => {
  try{
    const contact = await Contact.findOne({
      where: {
        number: req.body.number
      }
    });

  twc.messages.create({
      body: req.body.content,
      from: '+19713514383',
      to: req.body.number
    }).then(message => console.log(message.sid));

    const newMessage = await Message.create({
      content: req.body.content,
      datetime: req.body.datetime,
      contactId: contact.id
    });
    res.status(200).json({ message: newMessage });
  } catch(e) {
    res.status(500).json({message: e});
  }
});

module.exports = route;
