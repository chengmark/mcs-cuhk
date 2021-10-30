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
  },
  grey: {
    width: 10,
    height: 10,
    background: '#adb0bb',
    borderRadius: '15px',
    marginLeft: '15px'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}))

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}

const StatusIndicator = ({ onlinePlayers }) => {
  const { getString } = useLocale()
  const classes = useStyles()

  return (
    <>
      {onlinePlayers ? (
        <Box style={styles.wrapper}>
          Online Players: {onlinePlayers} / 20
          <div className={classes.blink} />
        </Box>
      ) : (
        <Box className={classes.wrapper}>
          Server Status: Offline
          <div className={classes.grey}></div>
        </Box>
      )}
      <Typography variant="h6" color="#adb0bb">
        {getString('autoStopInstance')}
      </Typography>
    </>
  )
}

export default StatusIndicator
