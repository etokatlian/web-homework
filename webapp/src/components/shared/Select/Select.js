import React from 'react'
import { string, shape, arrayOf } from 'prop-types'
import { Select as MuiSelect } from '@material-ui/core'
import styled from '@emotion/styled'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import { useField, ErrorMessage } from 'formik'

const StyledError = styled.div`
  color: red;
  height: 0px;
`

const StyledFormControl = styled(({ ...rest }) => (
  <FormControl {...rest} />
))`
  margin: 25px;
  width: 75%;
`

const Select = ({ label, options, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <StyledFormControl variant='outlined'>
      <InputLabel >{label}</InputLabel>
      <MuiSelect {...field}
        label={label} >
        {options.map((option) => {
          return <MenuItem key={option.label} value={option.value}>{option.label}</MenuItem>
        })}
      </MuiSelect>
      <StyledError>{meta.touched && meta.error ? (
        <ErrorMessage name={props.name} />
      ) : null}</StyledError>
    </StyledFormControl>
  )
}

Select.propTypes = {
  label: string,
  options: arrayOf(shape({
    label: string,
    value: string
  })),
  name: string
}

export default Select
