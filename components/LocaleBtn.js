import { Typography } from '@mui/material'

const LocaleBtn = ({ handleChangeLocale, isEng }) => (
  <div
    style={{
      margin: '5px 5px 0 0',
      marginLeft: 'auto',
      color: '#8a85ff',
      cursor: 'pointer'
    }}
  >
    <Typography onClick={handleChangeLocale}>{isEng ? 'Eng' : '繁'}</Typography>
  </div>
)

export default LocaleBtn
