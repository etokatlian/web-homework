import React from 'react'
import { Link } from 'react-router-dom'
import { string, element } from 'prop-types'
import styled from '@emotion/styled'
import Typography from '@material-ui/core/Typography'

const StyledLink = styled(({ ...rest }) => (
  <Link {...rest} />
))`
  display: flex;
  justify-content: center;
  padding: 75px 50px;
  margin-right: 20px;
  width: 150px;
  border: 1px solid darkgray;
  border-radius: 5px;
  text-decoration: none;
  color: #7f8182;

   &:hover {
    background-color: #ebeced;
    box-shadow: 10px 5px 5px lightgray;
  }
`

const StyledLinkContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const LinkButton = ({ path, children, label }) => {
  return (
    <StyledLink to={path}>
      <StyledLinkContent>
        {children}
        <Typography>
          {label}
        </Typography>
      </StyledLinkContent>
    </StyledLink>
  )
}

LinkButton.propTypes = {
  path: string,
  children: element,
  label: string
}

export default LinkButton
