import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      description
      debit
      credit
      amount
      createdAt
    }
  }
`

export const CREATE_TRANSACTION = gql`
  mutation AddTransaction(
    $amount: Float!
    $credit: Boolean!
    $debit: Boolean!
    $description: String!
) {
    addTransaction(
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
    ) {
      _id
      description
      debit
      credit
      amount
    }
  }
`

export const GET_TRANSACTION = gql`
  query getTransaction($id: String) {
    transaction(id: $id) {
      amount,
      credit,
      debit,
      _id,
      description
    }
  }
`

export const EDIT_TRANSACTION = gql`
 mutation EditTransaction(
  $id: String!,
  $amount: Float!
  $credit: Boolean!
  $debit: Boolean!
  $description: String!
) {
    editTransaction(
      id: $id
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
    ) {
      _id
      description
      debit
      credit
      amount
    }
  }
`

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction(
    $id: String!,
) {
    deleteTransaction(
      id: $id
    ) {
      _id
    }
  }
`
