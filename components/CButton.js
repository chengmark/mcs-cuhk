import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import Link from 'next/link'
import { useRef } from 'react'

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

const CButton = ({ startIcon, onClick, labelText, linkUrl }) => {
  const linkRef = useRef()
  return (
    <>
      <Box style={styles.wrapper}>
        <Button
          style={styles.btn}
          variant="outlined"
          startIcon={startIcon}
          onClick={() => {
            try {
              onClick(linkRef)
            } catch (e) {
              onClick()
            }
          }}
        >
          {labelText}
        </Button>
      </Box>
      <Link href={linkUrl ?? ''}>
        <a ref={linkRef} style={styles.hidden} />
      </Link>
    </>
  )
}

export default CButton
