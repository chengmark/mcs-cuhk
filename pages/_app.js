import { ThemeProvider } from '@mui/material'
import '../styles/globals.css'
import { createMyTheme } from '../theme'
import { SnackbarProvider } from 'notistack'
import { LocaleProvider } from '../contexts/LocaleContext'

function MyApp({ Component, pageProps }) {
  const theme = createMyTheme()

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <LocaleProvider>
          <Component {...pageProps} />
        </LocaleProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}

export default MyApp
