import GitHubIcon from '@mui/icons-material/GitHub'
import { IconButton, Tooltip } from '@mui/material'
import useLocale from '../hooks/useLocale'
import Link from 'next/link'

const styles = {}

const Footer = () => {
  const { getString } = useLocale()
  return (
    <footer>
      <Tooltip title={getString('viewSourceCode')}>
        <IconButton>
          <Link href="https://github.com/chengmark/mc-cuhk-server/tree/web-deploy">
            <GitHubIcon />
          </Link>
        </IconButton>
      </Tooltip>
    </footer>
  )
}

export default Footer
