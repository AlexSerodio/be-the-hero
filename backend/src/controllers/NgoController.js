const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ngos').select('*');

    return response.json(ongs);
  },

  async create(request, response) {
    const { name, email, phone, city, uf } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await connection('ngos').insert({
      id,
      name,
      email,
      phone,
      city,
      uf
    });

    return response.json({ id });
  }
};