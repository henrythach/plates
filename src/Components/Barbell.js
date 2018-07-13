// @flow

import React from 'react'
import styled from 'styled-components'

const Barbell = styled.p`
  color: ${props => props.theme.barbellTextColor}
`

export default () => (
  <Barbell>Just the barbell</Barbell>
)
