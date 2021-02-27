import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { shape, func } from 'prop-types'
import { GET_TRANSACTIONS } from '../../gql/queries'
import { TxTable } from '../../components/TxTable'

const Transactions = ({ history }) => {
  const { loading, error, data = {} } = useQuery(GET_TRANSACTIONS)

  if (loading) {
    return (
      <Fragment>
        Loading...
      </Fragment>
    )
  }

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  return (
    <Fragment>
      <TxTable data={data.transactions} history={history} />
    </Fragment>
  )
}

Transactions.propTypes = {
  history: shape({
    push: func
  })
}

export default Transactions
