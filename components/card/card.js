import React from 'react'
import Image from 'next/image'
import styles from './card.module.scss'

const Card = ({ href, imageURI, title, desc, stack, notAvailable }) => {
  return (
    <div className={styles.cardContainer}>
      <Image
        className={styles.cardImage}
        src={imageURI}
        alt={title}
      />
      <h4 className={styles.cardTitle}>
        {title}
      </h4>
      <p className={styles.body}>{desc}</p>
      <p className={styles.body}>Build with : {stack.join(', ')}</p>
      <a className={!notAvailable ? "card-button" : "card-button not-available"} href={href}>
        {!notAvailable ? 'See Project ›' : 'Not available yet'}
      </a >
    </div>
  )
}

export default Card;
