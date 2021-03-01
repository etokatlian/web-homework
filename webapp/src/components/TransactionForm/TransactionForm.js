import React from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import styled from '@emotion/styled'
import { string, bool, number, shape } from 'prop-types'
import { Form, Formik } from 'formik'
import { GET_TRANSACTIONS, CREATE_TRANSACTION, EDIT_TRANSACTION } from '../../gql/queries'
import { TextField, Select } from '../shared'
import useTransactionsCache from '../../hooks/useTransactionsCache'
import { transactionValidationSchema } from '../../validation'
import { useHistory } from 'react-router-dom'

const StyledMuiPaper = styled(({ color, ...rest }) => (
  <Paper {...rest} />
))`
  padding: 20px;
`

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const options = [
  { label: 'Credit', value: 'credit' },
  { label: 'Debit', value: 'debit' }
]

const TransactionForm = ({ edit, transactionData }) => {
  const history = useHistory()
  const mutation = edit ? EDIT_TRANSACTION : CREATE_TRANSACTION
  const { doMutation } = useTransactionsCache(mutation, edit, transactionData, GET_TRANSACTIONS)

  const handleSubmit = async (values, { actions }) => {
    doMutation(values)

    if (edit) {
      history.push('/transactions')
    }

    actions.resetForm()
  }

  return (
    <StyledMuiPaper elevation={2} >
      <Formik
        initialValues={{
          description: transactionData?.description || '',
          amount: transactionData ? (transactionData?.amount / 100).toFixed(2) : '',
          paymentType: transactionData?.credit ? 'credit' : transactionData?.debit ? 'debit' : ''
        }}
        onSubmit={(values, { ...actions }) => handleSubmit(values, { actions })}
        validationSchema={transactionValidationSchema}
      >
        <StyledForm>
          <TextField
            label='Description'
            name='description'
            placeholder='Description'
            type='text'
          />

          <TextField
            label='Amount'
            name='amount'
            placeholder='Amount'
            startAdornment={<InputAdornment position='start'>$</InputAdornment>}
            type='text'
          />

          <Select label='Payment Type' name='paymentType' options={options} />

          <Button color='primary' size='large' type='submit' variant='contained'>Submit</Button>
        </StyledForm>
      </Formik>
    </StyledMuiPaper>
  )
}

TransactionForm.propTypes = {
  edit: bool,
  transactionData: shape({
    amount: number,
    credit: bool,
    debit: bool,
    description: string,
    _id: string
  })
}

export default TransactionForm
