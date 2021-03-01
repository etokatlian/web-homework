import React, { Fragment } from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../../gql/queries'
import { TxTable } from '../../components/TxTable'
import { BreadCrumbs } from '../../components/shared'
import { sortByDate } from '../../utils/date'

const Transactions = () => {
  const { loading, error, data = {} } = useQuery(GET_TRANSACTIONS)

  if (error) {
    return (
      <Fragment>
        ¯\_(ツ)_/¯
      </Fragment>
    )
  }

  const renderTable = () => {
    if (loading) {
      return (
        <Fragment>
        Loading...
        </Fragment>
      )
    } else {
      const transactionsSlice = data.transactions.slice()
      return <TxTable transactionsData={sortByDate(transactionsSlice)} />
    }
  }

  return (
    <Fragment>
      <BreadCrumbs />
      {renderTable()}
    </Fragment>
  )
}

export default Transactions
