import { CircularProgress, Box, Typography } from '@mui/material'
import useLocale from '../hooks/useLocale'

const styles = {
  wrapper: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 100,
    width: '100%',
    height: '100%',
    background: '#1c2025',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  box: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
}

const LoadingScreen = () => {
  const { getString } = useLocale()
  return (
    <div style={styles.wrapper}>
      <Box style={styles.box}>
        <CircularProgress style={{ marginBottom: '15px' }} />
        <Typography>{getString('addingToProject')}</Typography>
      </Box>
    </div>
  )
}

export default LoadingScreen
