import React from 'react'
import { useQuery } from '@apollo/client'
import { TransactionForm } from '../../components/TransactionForm'
import { BreadCrumbs } from '../../components/shared'
import { GET_TRANSACTIONS } from '../../gql/queries'

const TransactionsEntry = () => {
  useQuery(GET_TRANSACTIONS)
  return (
    <>
      <BreadCrumbs />
      <TransactionForm />
    </>

  )
}

export default TransactionsEntry
