import { Box, Tooltip, IconButton, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { makeStyles } from '@mui/styles'
import useLocale from '../hooks/useLocale'

const useStyles = makeStyles((theme) => ({
  '@keyframes blink': {
    '50%': {
      opacity: 0
    }
  },
  blink: {
    width: 10,
    height: 10,
    background: '#43a047',
    borderRadius: '15px',
    marginLeft: '15px',
    animation: `$blink 1000ms ${theme.transitions.easing.easeInOut} 200ms infinite`
  }
}))

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  grey: {
    width: 10,
    height: 10,
    background: '#adb0bb',
    borderRadius: '15px',
    marginLeft: '15px'
  },
  red: {
    width: 10,
    height: 10,
    background: 'red',
    borderRadius: '15px',
    marginLeft: '15px'
  }
}

const StatusIndicator = ({ onlinePlayers, error }) => {
  const { getString } = useLocale()
  const classes = useStyles()

  if (error) {
    return (
      <Box style={styles.wrapper}>
        {error}
        <div style={styles.red} />
      </Box>
    )
  }

  return (
    <>
      {onlinePlayers != null ? (
        <Box style={styles.wrapper}>
          Online Players: {onlinePlayers} / 20
          <div className={classes.blink} />
        </Box>
      ) : (
        <Box style={styles.wrapper}>
          Server Status: Offline
          <div style={styles.grey}></div>
        </Box>
      )}
      <Typography variant="h6" color="#adb0bb">
        {getString('autoStopInstance')}
      </Typography>
      <Typography variant="h6" color="#adb0bb">
        {getString('info')}
      </Typography>
    </>
  )
}

export default StatusIndicator
