// @flow

import React from 'react'
import styled from 'styled-components'
import { FaCog, FaClose } from 'react-icons/lib/fa'

const Button = styled.button`
  position: absolute;
  top: 10px;
  left: 5px;

  background-color: transparent;
  border-radius: 3px;
  border: 0;
  color: #222;
  cursor: pointer;
  display: inline-block;
  font-size: 22px;
  font-weight: bold;
  margin: auto 3px;
  padding: 0 10px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  touch-action: manipulation;
  width: 46px;
  white-space: nowrap;
`

type Props = {
  onClick: Function,
  show: boolean
}

export default (props: Props) => (
  <Button
    onClick={props.onClick}
  >
    { props.show ? <FaClose /> : <FaCog /> }
  </Button>
)
