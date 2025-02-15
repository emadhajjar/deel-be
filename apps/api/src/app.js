const bodyParser = require('body-parser');
const express = require('express');

const { getProfile } = require('./middleware/getProfile');
const { sequelize } = require('./model');
const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get('/contracts/:id', getProfile, async (request, res) => {
  const { Contract } = request.app.get('models');
  const { id } = request.params;
  const contract = await Contract.findOne({ where: { id } });
  if (!contract) return res.status(404).end();
  res.json(contract);
});
module.exports = app;
