import React from 'react'
import styled from 'styled-components'

const Stepper = styled.button`
  background-color: #eee;
  border-radius: 3px;
  border: 0;
  color: #222;
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
  touch-action: manipulation;
  white-space: nowrap;
`

export default (props) => (
  <Stepper
    onClick={() => props.onClick(props.amount)}
    disabled={props.disabled}
  >
    { props.amount < 0 ? '-' : '+' }
    { Math.abs(props.amount) }
  </Stepper>
)

