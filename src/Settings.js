// @flow

import React from 'react';
import styled from 'styled-components'
import { AVAILABLE_PLATES, DEFAULT_PLATES, type AvailablePlate } from './PlateMath'

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  background: ${props => props.theme.background};
  height: 100%;
  display: ${props => props.show ? 'block' : 'none'};
  width: ${props => props.show ? '100' : '0'}%;
`

const Title = styled.h2`
  font-size: 32px;
  margin: 30px auto 10px;
`

const Label = styled.label`
  display: block;
  font-size: 18px;
  width: 200px;
  text-align: left;
  line-height: 1.5em;
`

const Input = styled.input`
  width: 25px;
`

type PlateProps = {
  weight: AvailablePlate,
  enabled: boolean,
  onChange: (weight: AvailablePlate, checked: boolean) => void
}
const PlateSetting = (props: PlateProps) => (
  <Label>
    <Input
      name="whatever"
      type="checkbox"
      checked={props.enabled}
      onChange={(event) => props.onChange(props.weight, event.target.checked)}
    />
    { props.weight }lbs
  </Label>
)

type Props = {
  show: boolean
}

type State = {
  availablePlates: AvailablePlate[]
}

class Settings extends React.Component<Props, State> {
  constructor (props: Props) {
    super(props)

    this.state = {
      availablePlates: DEFAULT_PLATES
    }
  }

  isPlateAvailable = (plate: AvailablePlate) => {
    return this.state.availablePlates.indexOf(plate) > -1
  }

  onPlateSelection = (plate: AvailablePlate, checked: boolean) => {
    this.setState({
      availablePlates: (checked ? [...this.state.availablePlates, plate]
                                : this.state.availablePlates.filter(e => e !== plate)).sort()
    })
  }

  render() {
    return (
      <Modal show={this.props.show}>
        <Title>Settings</Title>
        {
          AVAILABLE_PLATES.map((plate, index) => (
            <PlateSetting
              key={index}
              enabled={this.isPlateAvailable(plate)}
              weight={plate}
              onChange={this.onPlateSelection}
            />
          ))
        }
      </Modal>
    );
  }
}

export default Settings;
