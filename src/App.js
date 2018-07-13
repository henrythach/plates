// @flow

import React, { Component } from 'react';
import './App.css';
import { ThemeProvider } from 'styled-components'

import PlateMath from './PlateMath'
import Themes from './Themes'

import Settings from './Settings'

import AppContainer from './Components/AppContainer'
import Barbell from './Components/Barbell'
import CurrentWeight from './Components/CurrentWeight'
import Plate from './Components/Plate'
import PlatesContainer from './Components/PlatesContainer'
import SettingsToggle from './Components/SettingsToggle'
import Stepper from './Components/Stepper'
import Steppers from './Components/Steppers'
import ThemeToggle from './Components/ThemeToggle'

type Props = {}

type State = {
  currentWeight: number,
  showSettings: boolean
}

class App extends Component<Props, State> {
  plateMath: PlateMath

  constructor (props: any) {
    super(props)

    this.plateMath = new PlateMath()

    const currentWeight = parseInt(localStorage.getItem('currentWeight'), 10) || this.plateMath.barbellWeight
    this.state = {
      currentWeight,
      showSettings: true
    }
  }

  getPlateWidthPercentage (weight: number) : number {
    return 100 - (this.plateMath.listOfAvailablePlates.indexOf(weight) * 5)
  }

  toggleTheme = () => {
    Themes.toggleTheme()
    this.setState({})
  }

  onStepperClicked = (weight: number) => {
    const currentWeight = Math.max(this.state.currentWeight + weight,
                                   this.plateMath.barbellWeight)
    this.setState({ currentWeight })
    localStorage.setItem('currentWeight', '' + currentWeight)
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
      return <Barbell />
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
      <ThemeProvider theme={Themes.getTheme()}>
        <AppContainer>
          <ThemeToggle
            onClick={this.toggleTheme}
            theme={Themes.getThemeName()}
          />
          {/* <Settings
            show={this.state.showSettings}
          />
          <SettingsToggle
            onClick={() => this.setState({ showSettings: !this.state.showSettings })}
            show={this.state.showSettings}
          /> */}
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
          <PlatesContainer>
            { this.renderPlates() }
          </PlatesContainer>
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export default App;
