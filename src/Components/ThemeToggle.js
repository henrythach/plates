// @flow

import React from 'react'
import styled from 'styled-components'
import { AvaiableTheme } from '../Themes'

const Button = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;

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
  theme: AvaiableTheme
}

export default (props: Props) => (
  <Button
    onClick={props.onClick}
  >
    { props.theme === 'light' ? '🌚' : '🌝' }
  </Button>
)
