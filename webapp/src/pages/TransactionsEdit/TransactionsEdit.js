import React from 'react'
import { useQuery } from '@apollo/client'
import { string, shape, func } from 'prop-types'
import { GET_TRANSACTION, GET_TRANSACTIONS } from '../../gql/queries'
import { TransactionForm } from '../../components/TransactionForm'

const TransactionsEdit = ({ match, history }) => {
  useQuery(GET_TRANSACTIONS)
  const { loading, error, data = {} } = useQuery(GET_TRANSACTION, { variables: { id: match.params.id } })

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  if (error) {
    return (
      <div>ERROR!</div>
    )
  }

  return (
    <TransactionForm data={data.transaction} edit history={history} />
  )
}

TransactionsEdit.propTypes = {
  history: shape({
    push: func
  }),
  match: shape({
    params: shape({
      id: string
    })
  })
}

export default TransactionsEdit
