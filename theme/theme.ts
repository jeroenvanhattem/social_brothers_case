import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fonts: {
    heading: 'Proxima Nova Rg',
    body: 'Proxima Nova Rg',
  },
  colors: {
    brand: {
      underline: '#E95E30',
      title: '#2B2B2B',
      text: '#404040',
      header: '#262626',
      footer: '#262626',
      button: '#F27623',
      buttonDark: '#7D7D7D',
      navigation: {
        orange: '#F27623',
        text: '#383838',
        background: '#F2F2F2',
      },
      postText: '#868686',
      background: '#F4F4F4',
      inputBackground: '#FAFAFA',
      white: '#FFFFFF',
    }
  }
})

export default theme