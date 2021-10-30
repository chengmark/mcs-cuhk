import Head from 'next/head'
import { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Box, Typography, Tooltip } from '@mui/material'
import mc from 'minecraft-server-util'
import TelegramIcon from '@mui/icons-material/Telegram'
import { FiCpu } from 'react-icons/fi'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useSnackbar } from 'notistack'
import CButton from '../components/CButton'
import LocaleBtn from '../components/LocaleBtn'
import LoadingScreen from '../components/LoadingScreen'
import StatusIndicator from '../components/StatusIndicator'
import GoogleBtn from '../components/GoogleBtn'
import useLocale from '../hooks/useLocale'
import Footer from '../components/Footer'

const useStyles = makeStyles((theme) => ({}))

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    background: '#1c2025',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 0
  }
}

const Home = ({ serverStatus, serverIp, clientId }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const { isEng, getString, setIsEng } = useLocale()
  const [onlinePlayers, setOnlinePlayers] = useState(0)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    // console.log({ serverStatus })
    if (serverStatus.onlinePlayers) setOnlinePlayers(serverStatus.onlinePlayers)
  }, [])

  const startInstance = (ref) => {
    ref.current.click()
  }

  const changeLocale = () => {
    setIsEng(!isEng)
  }

  const copyIp = () => {
    navigator.clipboard.writeText(serverIp)
    enqueueSnackbar(getString('copiedIpToClipboard'), {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center'
      }
    })
  }

  const joinTG = (ref) => {
    ref.current.click()
  }

  return (
    <div
      className={classes.container}
      style={{ width: '100%', height: '100%', background: '#1c2025' }}
    >
      <Head>
        <title>MCS CUHK</title>
        <meta name="description" content="CUHK Minecraft Survival Server " />
      </Head>
      <main style={styles.wrapper}>
        <LocaleBtn isEng={isEng} handleChangeLocale={changeLocale} />
        {loading && <LoadingScreen />}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px'
          }}
        >
          <Typography variant="h2">CUHK Minecraft Survival Server</Typography>
          <StatusIndicator onlinePlayers={onlinePlayers} />
          {onlinePlayers ? (
            <CButton
              startIcon={<ContentCopyIcon />}
              onClick={copyIp}
              labelText={getString('getIp')}
            />
          ) : (
            <CButton
              startIcon={<FiCpu />}
              onClick={startInstance}
              labelText={getString('startInstance')}
              linkUrl={`https://asia-east2-mc-cuhk-server.cloudfunctions.net/startInstance`}
            />
          )}

          <Tooltip title={getString('googleBtnInfo')}>
            <Box
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <GoogleBtn clientId={clientId} setLoading={setLoading} />
            </Box>
          </Tooltip>
          {/* <CButton
            startIcon={<TelegramIcon />}
            onClick={joinTG}
            labelText={getString('joinTG')}
            linkUrl={`https://t.me/joinchat/xkQ3bjk8Aq8yZTc1`}
          /> */}
        </div>
        <Footer />
      </main>
    </div>
  )
}

export default Home

export async function getServerSideProps(context) {
  const serverStatus = await mc.status(process.env.MC_SERVER_IP, { timeout: 7500 })
  // console.log(serverStatus)

  return {
    props: {
      serverStatus,
      serverIp: process.env.MC_SERVER_IP,
      clientId: process.env.GOOGLE_CLIENT_ID
    }
  }
}
