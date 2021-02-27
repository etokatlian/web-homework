import React from 'react'
import * as Yup from 'yup'
import { string, bool, number, shape, func } from 'prop-types'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import styled from '@emotion/styled'
import { useMutation } from '@apollo/client'
import { Form, Formik } from 'formik'
import { GET_TRANSACTIONS, CREATE_TRANSACTION, EDIT_TRANSACTION } from '../../gql/queries'
import { TextField, Select } from '../shared'

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

const validationSchema = Yup.object({
  description: Yup.string()
    .max(75, 'Must be 75 characters or less')
    .required('Required'),
  amount: Yup.number()
    .required('Required'),
  paymentType: Yup.string()
    .required('Required')
})

const TransactionForm = ({ edit, data, history }) => {
  const mutation = edit ? EDIT_TRANSACTION : CREATE_TRANSACTION
  const [CreateTransaction, { client }] = useMutation(mutation)

  const handleSubmit = async (values, { actions }) => {
    const { description, amount, paymentType } = values
    const res = await CreateTransaction({
      variables: {
        ...(edit && { id: data && data?._id }),
        description,
        amount: parseInt(amount),
        credit: paymentType === 'credit',
        debit: paymentType === 'debit'
      }
    })

    const cache = client.readQuery({ query: GET_TRANSACTIONS })
    client.writeQuery({
      query: GET_TRANSACTIONS,
      data: {
        transactions: [ ...cache.transactions, (edit ? res.data.editTransaction : res.data.addTransaction) ]
      }
    })

    if (edit) {
      history.push('/transactions')
    }

    actions.resetForm()
  }

  return (
    <StyledMuiPaper elevation={2} >
      <Formik
        initialValues={{
          description: data?.description || '',
          amount: data?.amount || '',
          paymentType: data?.credit ? 'credit' : data?.debit ? 'debit' : ''
        }}
        onSubmit={(values, { ...actions }) => handleSubmit(values, { actions })}
        validationSchema={validationSchema}
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
  history: shape({
    push: func
  }),
  data: shape({
    amount: number,
    credit: bool,
    debit: bool,
    description: string,
    _id: string
  })
}

export default TransactionForm
