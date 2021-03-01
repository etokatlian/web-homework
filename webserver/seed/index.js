const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const { TransactionModel } = require('../data-models/Transaction')

mongoose.connect('mongodb://localhost:27017/graphql', {
  useNewUrlParser: true
})

const connection = mongoose.connection

const save = async (transactions) => {
  try {
    await TransactionModel.deleteMany({})
    await TransactionModel.collection.insertMany(transactions)
    await connection.close()
    console.log('~~ Database Successfully Seeded ~~')
  } catch (err) {
    throw err
  }
}

const parseData = (data) => {
  const splitByLine = data.split('\n')

  const transactions = splitByLine.map((transaction) => {
    const [description, amount, paymentType] = transaction.split(',')
    return { description, amount, credit: paymentType === 'credit', debit: paymentType === 'debit' }
  })

  save(transactions)
}

const readData = () => {
  const directory = path.join(__dirname, '../data', '/transactions.csv')
  fs.readFile(directory, 'utf8', (err, data) => {
    if (err) {
      throw err
    }
    parseData(data)
  })
}

readData()
