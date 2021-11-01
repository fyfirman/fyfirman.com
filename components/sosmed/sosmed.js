import React from 'react'
import styles from "./sosmed.module.scss"

const Sosmed = ({ href, name, middle, position }) => {
  const imageURI = require(`../../images/sosmed/${name.toLowerCase().split(' ').join('-')}.svg`)

  return (
    <a
      href={href}
      className={[styles.sosmed, styles[position], middle && styles.middle]}
    >
      <object type="image/svg+xml" data={imageURI} className="svg">
        {name}
      </object>
    </a >
  )
}

export default Sosmed;
