import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const PlateComponent = styled.div`
  background-color: #444444;
  background: #222;
  border-radius: 3px;
  border: 0;
  color: #ffffff;
  font-family: sans-serif;
  margin: auto auto 3px;
  padding: 10px 0;

  ${props => props.width && css`
    width: ${props.width}%
  `}
`

const Plate = (props) => (
  <PlateComponent
    weight={props.weight}
    width={props.width}
  >
    {props.weight}
  </PlateComponent>
)

Plate.propTypes = {
  weight: PropTypes.number,
  width: PropTypes.number
}

Plate.defaultProps = {
  width: 100
}

export default Plate
