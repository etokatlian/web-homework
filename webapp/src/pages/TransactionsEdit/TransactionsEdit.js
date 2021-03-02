import React from 'react'
import { useQuery } from '@apollo/client'
import { string, shape, func } from 'prop-types'
import { GET_TRANSACTION, GET_TRANSACTIONS } from '../../gql/queries'
import { TransactionForm } from '../../components/TransactionForm'
import { BreadCrumbs } from '../../components/shared'

const TransactionsEdit = ({ match, history }) => {
  useQuery(GET_TRANSACTIONS)
  const { loading, error, data = {} } = useQuery(GET_TRANSACTION, { variables: { id: match.params.id } })

  if (error) {
    return (
      <div>ERROR!</div>
    )
  }

  const RenderForm = () => {
    if (loading) {
      return (
        <>
        Loading...
        </>
      )
    } else {
      return <TransactionForm edit history={history} transactionData={data.transaction} />
    }
  }

  return (
    <>
      <BreadCrumbs />
      {RenderForm()}
    </>
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
