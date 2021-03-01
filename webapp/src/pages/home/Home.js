import React, { Fragment } from 'react'
import { string, element } from 'prop-types'
import { BreadCrumbs, LinkButton } from '../../components/shared'
import styled from '@emotion/styled'
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone'
import AddIcon from '@material-ui/icons/Add'
import TimelineIcon from '@material-ui/icons/Timeline'

const StyledHomeWrapper = styled.div`
  display: flex;
`

const Home = () => {
  return (
    <Fragment>
      <BreadCrumbs />
      <StyledHomeWrapper>
        <LinkButton label='Transactions List' path='/transactions'>
          <AccountBalanceTwoToneIcon fontSize='large' />
        </LinkButton>
        <LinkButton label='Create Transaction' path='/transactions/create'>
          <AddIcon fontSize='large' />
        </LinkButton>
        <LinkButton label='Metrics' path='/transactions/metrics'>
          <TimelineIcon fontSize='large' />
        </LinkButton>
      </StyledHomeWrapper>
    </Fragment>
  )
}

LinkButton.propTypes = {
  path: string,
  children: element,
  label: string
}

export default Home
