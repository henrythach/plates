// @flow

type ThemeType = {
  background: string,
  barbellTextColor: string,
  currentWeightColor: string,
  plateBackgroundColor: string,
  plateBoxShadowColor: string,
  plateTextColor: string,
  stepperBackgroundColor: string,
  stepperBoxShadowColor: string,
  stepperTextColor: string
}

const DEFAULT_THEME = 'light'
const DARK_THEME = 'dark'

export type AvailableTheme = 'light' | 'dark'

const AVAILABLE_THEMES = [
  'light',
  'dark'
]

const THEME_MAP: { [string]: ThemeType } = {
  [DEFAULT_THEME]: {
    background: '#fefefe',
    barbellTextColor: '#222',
    currentWeightColor: '#222',
    plateBackgroundColor: '#333',
    plateBoxShadowColor: '#cbcbcb',
    plateTextColor: '#eee',
    stepperBackgroundColor: '#eee',
    stepperBoxShadowColor: '#999999',
    stepperTextColor: '#222'
  },
  [DARK_THEME]: {
    background: '#1b201b',
    barbellTextColor: '#ddd',
    currentWeightColor: '#fdff8c',
    plateBackgroundColor: '#ffea94',
    plateBoxShadowColor: '#ddad86',
    plateTextColor: '#1b201b',
    stepperBackgroundColor: '#feffc6',
    stepperBoxShadowColor: '#fbd15b',
    stepperTextColor: '#1b201b'
  }
}

class Themes {
  themeName: AvailableTheme

  constructor () {
    this.themeName = this.findTheme(localStorage.getItem('theme'))
  }

  findTheme (themeName: ?string): AvailableTheme {
    const index = AVAILABLE_THEMES.indexOf(themeName)
    return index > -1 ? AVAILABLE_THEMES[index] : 'light'
  }

  setTheme (themeName: AvailableTheme = 'light') : void {
    this.themeName = themeName
    localStorage.setItem('theme', themeName)
  }

  toggleTheme () : void {
    this.setTheme(this.themeName === 'light' ? 'dark' : 'light')
  }

  getTheme () : ThemeType {
    return THEME_MAP[this.themeName]
  }

  getThemeName () : AvailableTheme {
    return this.themeName
  }
}

export default new Themes()

