import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_TRANSACTIONS } from '../../gql/queries'
import { TxTable } from '../../components/TxTable'
import { BreadCrumbs } from '../../components/shared'
import { sortByDate } from '../../utils/date'

const Transactions = () => {
  const { loading, error, data = {} } = useQuery(GET_TRANSACTIONS)

  if (error) {
    return (
      <>
        ¯\_(ツ)_/¯
      </>
    )
  }

  const renderTable = () => {
    if (loading) {
      return (
        <>
        Loading...
        </>
      )
    } else {
      const transactionsSlice = data.transactions.slice() // copy transactions slice to not mutate cache.
      return <TxTable transactionsData={sortByDate(transactionsSlice)} />
    }
  }

  return (
    <>
      <BreadCrumbs />
      {renderTable()}
    </>
  )
}

export default Transactions
