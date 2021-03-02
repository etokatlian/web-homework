import React from 'react'
import styled from '@emotion/styled'
import AccountBalanceTwoToneIcon from '@material-ui/icons/AccountBalanceTwoTone'
import AddIcon from '@material-ui/icons/Add'
import TimelineIcon from '@material-ui/icons/Timeline'
import { string, element } from 'prop-types'

import { BreadCrumbs, LinkButton } from '../../components/shared'
import { TRANSACTIONS_CREATE_FULL_PATH, TRANSACTIONS_FULL_PATH, TRANSACTIONS_METRICS_FULL_PATH } from '../../constants'

const StyledHomeWrapper = styled.div`
  display: flex;
`

const Home = () => {
  return (
    <>
      <BreadCrumbs />
      <StyledHomeWrapper>
        <LinkButton label='Transactions List' path={TRANSACTIONS_FULL_PATH}>
          <AccountBalanceTwoToneIcon fontSize='large' />
        </LinkButton>
        <LinkButton label='Create Transaction' path={TRANSACTIONS_CREATE_FULL_PATH}>
          <AddIcon fontSize='large' />
        </LinkButton>
        <LinkButton label='Metrics' path={TRANSACTIONS_METRICS_FULL_PATH}>
          <TimelineIcon fontSize='large' />
        </LinkButton>
      </StyledHomeWrapper>
    </>
  )
}

LinkButton.propTypes = {
  path: string,
  children: element,
  label: string
}

export default Home
