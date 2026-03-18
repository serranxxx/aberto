import React from 'react'
import styles from './hero.module.css'

export const Hero = () => {
    return (
        <div className={styles.content}>
            <span className={styles.key_title}>Alberto Serrano</span>

            <span className={styles.key_sub_title}>Product designer & Developer</span>

            <span className={styles.single_text}>
                I create digital products where <b>technology, design, and user experience work in harmony.</b> My approach combines the structured thinking of engineering with the creativity of design to build software with intention and purpose.
            </span>
        </div>
    )
}
