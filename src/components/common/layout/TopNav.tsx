import { useRef } from 'react'
import { AppBar, Avatar, Button, Toolbar } from '@mui/material'
import { ArrowDropDown } from '@mui/icons-material'

import styles from './TopNav.module.scss'

export function TopNav(): React.ReactElement {
  const headerRef = useRef(null)

  function stringToColor(string: string) {
    let hash = 0
    let i

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash)
    }

    let color = '#'

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff

      color += `00${value.toString(16)}`.slice(-2)
    }
    /* eslint-enable no-bitwise */

    return color
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name)
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
    }
  }

  return (
    <AppBar color="transparent" elevation={0} ref={headerRef} className={styles.topNav}>
      <Toolbar>
        <Button>
          <Avatar {...stringAvatar('Viral Tagdiwala')} />

          <ArrowDropDown />
        </Button>
      </Toolbar>
    </AppBar>
  )
}
