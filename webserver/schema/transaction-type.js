const graphql = require('graphql')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat
} = graphql
const graphqlIsoDate = require('graphql-iso-date')

const TransactionType = new GraphQLObjectType({
  name: 'Transaction',
  fields: () => ({
    _id: { type: GraphQLString },
    description: { type: GraphQLString },
    debit: { type: GraphQLBoolean },
    credit: { type: GraphQLBoolean },
    amount: { type: GraphQLFloat },
    createdAt: { type: graphqlIsoDate.GraphQLDate }
  })
})

module.exports = TransactionType
