import { useMutation } from '@apollo/client'

import { CREDIT_PAYMENT_TYPE, DEBIT_PAYMENT_TYPE } from '../constants'

const useTransactionsCache = (mutation, mutationTypeIsEdit, transactionData, readQuery) => {
  const [transactionMutation, { client }] = useMutation(mutation)

  const doMutation = async (values) => {
    const { description, amount, paymentType } = values
    const { data } = await transactionMutation({
      variables: {
        ...(mutationTypeIsEdit && { id: transactionData && transactionData?._id }),
        description,
        amount: parseFloat(amount) * 100,
        credit: paymentType === CREDIT_PAYMENT_TYPE,
        debit: paymentType === DEBIT_PAYMENT_TYPE
      }
    })
    const { transactions } = client.readQuery({ query: readQuery })

    const updatedTransactions = () => {
      if (mutationTypeIsEdit) {
        const idx = transactions.findIndex((transaction) => transaction._id === data.editTransaction._id)
        return [...transactions.slice(0, idx), data.editTransaction, ...transactions.slice(idx + 1)]
      } else {
        return [...transactions, data.addTransaction]
      }
    }

    client.writeQuery({
      query: readQuery,
      data: {
        transactions: updatedTransactions()
      }
    })
  }

  return { doMutation }
}

export default useTransactionsCache
