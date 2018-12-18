const { Router } = require('express');
const { Contact, Message } = require('../db/index');
const route = Router()

route.get('/', async(req, res) => {
  try{
    const contacts = await Contact.findAll();
    res.status(200).json({ contacts: contacts });
  } catch(e) {
    res.status(500).json({ message: 'Error in processing request'});
  }
});

route.get('/:id', async(req, res) => {
  try {
    const contact = await Contact.findOne({
      where: {
        id: id
      }
    });
    res.status(200).json({contact: contact});
  } catch(e) {
    res.status(500).json({ message: "Error in processing request"});
  }
});

route.post('/', async(req, res) => {
  try {

    const newContact = await Contact.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      number: req.body.number
    });
    res.status(201).json({contact: newContact});
  } catch(e) {
    res.status(400).json({ message: e.errors[0].message });
  }
});

route.delete('/:id', async(req, res) => {
  try {
    const contact = await Contact.findOne({
      where: {
        id: req.params.id
      }
    });

    if(!contact) {
      return res.status(404).json({message: "Contact not found" });
    }

    const deleted = await Contact.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({message: "Contact Deleted"});
  } catch(e) {
    res.status(500).json(e.errors[0].message);
  }
});

module.exports = route;
