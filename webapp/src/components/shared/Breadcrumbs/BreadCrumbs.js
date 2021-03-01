import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Typography from '@material-ui/core/Typography'
import styled from '@emotion/styled'
import { Link, useHistory } from 'react-router-dom'

const StyledLink = styled(({ ...rest }) => (
  <Link {...rest} />
))`
  text-decoration: none
`

const BreadCrumbs = () => {
  const { location: { pathname } } = useHistory()

  const renderBreadCrumb = (path, display) => {
    if (pathname.includes(path)) {
      return (
        <StyledLink color='inherit' to={path} >
          <Typography color='textSecondary'>{display}</Typography>
        </StyledLink>
      )
    }
  }

  const renderDummyCrumb = (display) => {
    if (pathname.includes('/edit')) {
      return <Typography color='textSecondary'>{display}</Typography>
    }
  }

  return (
    <Breadcrumbs aria-label='breadcrumb'>
      <StyledLink color='inherit' to='/' >
        <Typography color='textSecondary'>Home</Typography>
      </StyledLink>
      {renderBreadCrumb('/transactions', 'Transactions')}
      {renderBreadCrumb('/transactions/create', 'Create Transaction')}
      {renderDummyCrumb('Edit Transaction')}
      {renderBreadCrumb('/transactions/metrics', 'Metrics')}
    </Breadcrumbs>
  )
}

export default BreadCrumbs
