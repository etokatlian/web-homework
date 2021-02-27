import React from 'react'
import styled from '@emotion/styled'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import { string } from 'prop-types'
import { useField, ErrorMessage } from 'formik'

const StyledInputWrapper = styled.div`
  margin: 25px;
  width: 75%;
`

const StyledOutlinedInput = styled(({ ...rest }) => (
  <OutlinedInput {...rest} />
))`
  width: 100%;
`

const StyledError = styled.div`
  color: red;
  height: 0px;
`

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <StyledInputWrapper>
      <StyledOutlinedInput {...field} {...props} />
      <StyledError>{meta.touched && meta.error ? (
        <ErrorMessage name={props.name} />
      ) : null}</StyledError>
    </StyledInputWrapper>
  )
}

TextField.propTypes = {
  label: string,
  name: string
}

export default TextField
