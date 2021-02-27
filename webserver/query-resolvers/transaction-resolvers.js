const mongoose = require('mongoose')
const { TransactionModel } = require('../data-models/Transaction')
const { packageModel } = require('./utils.js')

async function find (criteria) {
  const query = Object.keys(criteria).length
    ? TransactionModel.find(criteria)
    : TransactionModel.find()

  const transactions = await query.exec()

  return packageModel(transactions)
}

async function findOne (id) {
  const query = TransactionModel.findById(id)
  const transaction = await query.exec()

  return packageModel(transaction)[0] || null
}

async function findOneAndUpdate (id, updates) {
  const query = TransactionModel.findOneAndUpdate({ _id: id }, { $set: updates }, { new: true })
  const transaction = await query.exec()
  return packageModel(transaction)[0] || null
}

async function deleteOne (id) {
  let objectId = new mongoose.Types.ObjectId(id)
  const query = TransactionModel.findOneAndDelete({ _id: objectId })
  const transaction = await query.exec()
  return packageModel(transaction)[0] || null
}

module.exports = {
  find,
  findOne,
  findOneAndUpdate,
  deleteOne
}
