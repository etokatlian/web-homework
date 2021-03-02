import React, { useState } from 'react'
import InputAdornment from '@material-ui/core/InputAdornment'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import styled from '@emotion/styled'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { Form, Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import { string, bool, number, shape } from 'prop-types'

import useTransactionsCache from '../../hooks/useTransactionsCache'
import { GET_TRANSACTIONS, CREATE_TRANSACTION, EDIT_TRANSACTION } from '../../gql/queries'
import { TextField, Select } from '../shared'
import { transactionValidationSchema } from '../../validation'
import { CREDIT_PAYMENT_TYPE, DEBIT_PAYMENT_TYPE } from '../../constants'

const StyledMuiPaper = styled(({ color, ...rest }) => (
  <Paper {...rest} />
))`
  padding: 20px;
`

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const options = [
  { label: 'Credit', value: CREDIT_PAYMENT_TYPE },
  { label: 'Debit', value: DEBIT_PAYMENT_TYPE }
]

const TransactionForm = ({ edit, transactionData }) => {
  const history = useHistory()
  const [notification, setNotification] = useState(false)
  const mutation = edit ? EDIT_TRANSACTION : CREATE_TRANSACTION
  const { doMutation } = useTransactionsCache(mutation, edit, transactionData, GET_TRANSACTIONS)

  const handleSubmit = async (values, { actions }) => {
    doMutation(values)

    if (edit) {
      history.push('/transactions')
    }

    setNotification(true)

    actions.resetForm()
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setNotification(false)
  }

  return (
    <StyledMuiPaper elevation={2} >
      <Formik
        initialValues={{
          description: transactionData?.description || '',
          amount: transactionData ? (transactionData?.amount / 100).toFixed(2) : '',
          paymentType: transactionData?.credit ? CREDIT_PAYMENT_TYPE : transactionData?.debit ? DEBIT_PAYMENT_TYPE : ''
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
      <Snackbar autoHideDuration={2000} onClose={handleClose} open={notification}>
        <Alert onClose={handleClose} severity='success'>
          Successfully added transaction!
        </Alert>
      </Snackbar>
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
