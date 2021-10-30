import GoogleIcon from '@mui/icons-material/Google'
import GoogleLogin from 'react-google-login'
import { Box, Button } from '@mui/material'
import Link from 'next/link'
import { useState, useRef } from 'react'
import useLocale from '../hooks/useLocale'

const styles = {
  hidden: {
    display: 'none'
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  btn: {
    width: '100%'
  }
}

const GoogleBtn = ({ clientId, setLoading }) => {
  const linkRef = useRef()
  const [email, setEmail] = useState('')
  const { getString } = useLocale()

  const handleFailure = (res) => {
    console.log({ res })
  }

  const handleSuccess = async (res) => {
    const email = res.profileObj.email
    setLoading(true)
    setEmail(email)
    if (email) linkRef.current.click()
  }

  return (
    <GoogleLogin
      clientId={clientId}
      render={(renderProps) => (
        <>
          <Box style={styles.wrapper}>
            <Button
              style={styles.btn}
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              {getString('googleBtn')}
            </Button>
          </Box>
          <Link
            href={`https://asia-east2-mc-cuhk-server.cloudfunctions.net/addProjectViewer?email=${email}`}
          >
            <a ref={linkRef} style={styles.hidden} />
          </Link>
        </>
      )}
      onSuccess={handleSuccess}
      onFailure={handleFailure}
      // cookiePolicy={'single_host_origin'}
      isSignedIn={false}
    />
  )
}

export default GoogleBtn
