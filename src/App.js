// @flow

import React, { Component } from 'react';
import './App.css';
import PlateMath from './PlateMath'
import Plate from './Components/Plate'
import Stepper from './Components/Stepper'

import styled from 'styled-components'

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`

const CurrentWeight = styled.h2`
  font-size: 32px;
  margin: 10px auto;
`

const Plates = styled.div`
  margin-top: 10px;
`

const Steppers = styled.div`
  padding: 10px 0;
`

class App extends Component<any> {
  plateMath: PlateMath
  state: {
    currentWeight: number
  }

  constructor (props: any) {
    super(props)

    this.plateMath = new PlateMath(45, [
      45,
      35,
      25,
      10,
      5,
      2.5,
      1,
      0.75,
      0.5,
      0.25
    ])
    this.state = {
      currentWeight: 225
    }
  }

  getPlateWidthPercentage (weight: number) : number {
    return 100 - (this.plateMath.listOfAvailablePlates.indexOf(weight) * 5)
  }

  onStepperClicked = (weight: number) => {
    this.setState({
      currentWeight: Math.max(this.state.currentWeight + weight,
                              this.plateMath.barbellWeight)
    })
  }

  renderStepper (amount: number) {
    const isDisabled = amount < 0 && this.state.currentWeight === this.plateMath.barbellWeight
    return (
      <Stepper
        amount={amount}
        onClick={this.onStepperClicked}
        disabled={isDisabled}
      />
    )
  }

  renderPlates () {
    const plates = this.plateMath.calculate(this.state.currentWeight)

    if (plates.length === 0) {
      return <p>Just the barbell</p>
    }

    return plates.map((weight, index) => (
             <Plate
               key={index}
               weight={weight}
               width={this.getPlateWidthPercentage(weight)}
             />
           ))
  }

  render() {
    return (
      <AppContainer>
        <CurrentWeight>
          { this.state.currentWeight }
        </CurrentWeight>
        <Steppers>
          { this.renderStepper(-this.plateMath.maximumPlateWeight * 2)}
          { this.renderStepper(-this.plateMath.middlePlateWeight * 2)}
          { this.renderStepper(-this.plateMath.minimumPlateWeight * 2)}
          &nbsp;&nbsp;
          { this.renderStepper(this.plateMath.minimumPlateWeight * 2)}
          { this.renderStepper(this.plateMath.middlePlateWeight * 2)}
          { this.renderStepper(this.plateMath.maximumPlateWeight * 2)}
        </Steppers>
        <Plates>
          { this.renderPlates() }
        </Plates>
      </AppContainer>
    );
  }
}

export default App;
