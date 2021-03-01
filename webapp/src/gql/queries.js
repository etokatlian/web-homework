import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      _id
      # user_id
      description
      # merchant_id
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
    # $merchantId: ID!
    # $userId: ID!
) {
    addTransaction(
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
      # merchantId: $merchantId
      # userId: $userId
    ) {
      _id
      # user {
      #   id
      #   firstName
      #   lastName
      # }
      # merchant {
      #   id
      #   name
      #   description
      # }
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
  # $merchantId: ID!
  # $userId: ID!
) {
    editTransaction(
      id: $id
      amount: $amount
      credit: $credit
      debit: $debit
      description: $description
      # merchantId: $merchantId
      # userId: $userId
    ) {
      _id
      # user {
      #   id
      #   firstName
      #   lastName
      # }
      # merchant {
      #   id
      #   name
      #   description
      # }
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
