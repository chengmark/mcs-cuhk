import { createContext, useState } from 'react'
import strings from '../strings'
const LocaleContext = createContext({})

export const LocaleProvider = ({ children }) => {
  const [isEng, setIsEng] = useState(false)

  const getString = (key) => strings[isEng ? 'en' : 'cn'][key]

  return (
    <LocaleContext.Provider
      value={{
        isEng,
        setIsEng,
        getString
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export default LocaleContext
