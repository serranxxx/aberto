import React from 'react'
import styles from './hero.module.css'
import { Button } from 'antd'
import { PhoneOutgoing } from 'lucide-react'

export const Hero = () => {
    return (
        <div className={styles.content}>
            <span className={styles.key_title}>Alberto Serrano</span>

            <span className={styles.key_sub_title}>Product designer & Developer</span>

            <span className={styles.single_text}>
                I create digital products where <b>technology, design, and user experience work in harmony.</b> My approach combines the structured thinking of engineering with the creativity of design to build software with intention and purpose.
            </span>
{/* 
            <Button 
            icon={<PhoneOutgoing size={16}/>}
            style={{
                backgroundColor:'#1D1D1B'
            }} type='primary'>Contact me</Button> */}
        </div>
    )
}
