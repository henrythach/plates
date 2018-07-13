import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const PlateComponent = styled.div`
  top: 0;
  background: ${props => props.theme.plateBackgroundColor};
  border-radius: 3px;
  border: 0;
  box-shadow: 1px 2px 0 ${props => props.theme.plateBoxShadowColor};
  color: ${props => props.theme.plateTextColor};
  font-family: sans-serif;
  margin: auto auto 7px;
  padding: 10px 0;
  font-size: 18px;

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
