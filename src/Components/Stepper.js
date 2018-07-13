// @flow

import React from 'react'
import styled from 'styled-components'

const Stepper = styled.button`
  background-color: ${props => props.theme.stepperBackgroundColor};
  border-radius: 3px;
  border: 0;
  box-shadow: 1px 2px 0px ${props => props.theme.stepperBoxShadowColor};
  color: ${props => props.theme.stepperTextColor};
  cursor: pointer;
  display: inline-block;
  font-size: 12px;
  font-weight: bold;
  height: 38px;
  margin: auto 3px;
  padding: 0 10px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  width: 46px;
  white-space: nowrap;
`

type Props = {
  onClick: Function,
  amount: number,
  disabled: bool
}

export default (props: Props) => (
  <Stepper
    onClick={() => props.onClick(props.amount)}
    disabled={props.disabled}
  >
    { props.amount < 0 ? '-' : '+' }
    { Math.abs(props.amount) }
  </Stepper>
)

