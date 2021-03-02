import React, { useContext } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { useQuery } from '@apollo/client'
import { AreaChart, YAxis, XAxis, CartesianGrid, Tooltip, Area, Legend, ResponsiveContainer } from 'recharts'

import { BreadCrumbs } from '../../components/shared'
import { GET_TRANSACTIONS } from '../../gql/queries'
import { RomanNumeralsContext } from '../../context/romanNumeralsContext'
import { integerToRoman } from '../../utils/numbers'
import { CREDIT_PAYMENT_TYPE, DEBIT_PAYMENT_TYPE } from '../../constants'

const Metrics = () => {
  const { loading, data = {} } = useQuery(GET_TRANSACTIONS)
  const { isRoman } = useContext(RomanNumeralsContext)

  // TODO: clean this up :(
  const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD')
  const today = moment().format('YYYY-MM-DD')
  const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD')
  const todayMinusTwo = moment().subtract(2, 'days').format('YYYY-MM-DD')
  const todayMinusThree = moment().subtract(3, 'days').format('YYYY-MM-DD')
  const todayMinusFour = moment().subtract(4, 'days').format('YYYY-MM-DD')
  const todayMinusFive = moment().subtract(5, 'days').format('YYYY-MM-DD')
  const todayMinusSix = moment().subtract(6, 'days').format('YYYY-MM-DD')

  const defaultAreaData = [
    {
      name: todayMinusSix,
      debit: 0,
      credit: 0
    },
    {
      name: todayMinusFive,
      debit: 0,
      credit: 0
    },
    {
      name: todayMinusFour,
      debit: 0,
      credit: 0
    },
    {
      name: todayMinusThree,
      debit: 0,
      credit: 0
    },
    {
      name: todayMinusTwo,
      debit: 0,
      credit: 0
    },
    {
      name: yesterday,
      debit: 0,
      credit: 0
    },
    {
      name: today,
      debit: 0,
      credit: 0
    },
    {
      name: tomorrow,
      debit: 0,
      credit: 0
    }
  ]

  const grouped = _.groupBy(data.transactions, (tx) => tx.createdAt)

  Object.entries(grouped).forEach(([key, value]) => {
    const match = defaultAreaData.find((areaDate) => areaDate.name === key)
    value.forEach((dataPoint) => {
      dataPoint.debit ? match.debit += dataPoint.amount : match.credit += dataPoint.amount
    })
  })

  let dataPointsWithFixedAmounts = defaultAreaData.map((dataPoint) => {
    dataPoint.debit /= 100
    dataPoint.credit /= 100
    return dataPoint
  })

  if (isRoman) {
    dataPointsWithFixedAmounts = dataPointsWithFixedAmounts.map((dp) => {
      dp.debitRoman = integerToRoman(Math.floor(dp.debit))
      dp.creditRoman = integerToRoman(Math.floor(dp.credit))
      return dp
    })
  }

  const renderChart = () => {
    if (loading) {
      return <div>Loading....</div>
    } else {
      return (
        <ResponsiveContainer height={700} width='95%'>
          <AreaChart data={dataPointsWithFixedAmounts} margin={{ top: 50, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorUv' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorPv' x1='0' x2='0' y1='0' y2='1'>
                <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='name' tickSize={15} />
            <YAxis tickFormatter={(num) => isRoman ? integerToRoman(num) : num} tickSize={15} unit='$' width={80} />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip formatter={(num) => isRoman ? integerToRoman(num) : num} />
            <Legend height={36} verticalAlign='top' />
            <Area dataKey={DEBIT_PAYMENT_TYPE} fill='url(#colorUv)' fillOpacity={1} stroke='#8884d8' type='monotone' />
            <Area dataKey={CREDIT_PAYMENT_TYPE} fill='url(#colorPv)' fillOpacity={1} stroke='#82ca9d' type='monotone' />
          </AreaChart>
        </ResponsiveContainer>
      )
    }
  }

  return (
    <>
      <BreadCrumbs />
      {renderChart()}
    </>
  )
}

export default Metrics
