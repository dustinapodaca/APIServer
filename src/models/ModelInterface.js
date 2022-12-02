'use strict';

class ModelInterface {
  constructor(model) {
    this.model = model;
  }

  async read(id = null) {
    try {
      let record;
      if (id) {
        record = await this.model.findOne({ where: { id } });
      } else {
        record = await this.model.findAll();
      }
      return record;
    } catch (err) {
      console.error('We have a ModelInterface read error', err);
      return err;
    }
  }

  async create(json) {
    try {
      let record = await this.model.create(json);
      return record;
    } catch (err) {
      console.error('We have a ModelInterface create error', err);
    }
  }

  async update(json, id) {
    try {
      await this.model.update(json, { where: { id } });
      let record = await this.model.findOne({ where: { id } });
      return record;
    } catch (err) {
      console.error('We have a ModelInterface update error', err);
      return err;
    }
  }

  async delete(id) {
    try {
      let record = await this.model.destroy({ where: { id } });
      return record;
    } catch(err) {
      console.error('We have a ModelInterface delete error', err);
    }
  }
}

module.exports = ModelInterface;

//   async readManyToOne(id, model) {
//   try {
//     let record = await this.model.findOne({
//       where: { id },
//       include: model,
//     });
//     return record;
//   } catch (err) {
//     console.error('We have a ModelInterface readManyToOne error', err);
//   }
// }
