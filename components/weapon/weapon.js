import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './weapon.module.scss'

const Weapon = ({ name, color }) => {
  const imageURI = require(`../../images/stack/${name.toLowerCase().split(' ').join('-')}.svg`)

  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(localStorage.getItem('theme'))
  }, [])

  return (
    <div className={styles.weapon}>
      <Image
        className={styles.weaponImage}
        src={imageURI}
        alt={name}
        style={theme === 'dark' ? { outline: `1px solid ${color}` } : {}} />
      <span className={styles.tooltip} data-hover={name}>{name}</span>
    </div>
  )
}

export default Weapon;
