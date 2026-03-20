'use client'
import Image from 'next/image'
import styles from '../iattend/iattend.module.css'
import { Button } from 'antd'
import { CornerDownLeft, Globe, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Page() {

    return (
        <div className={styles.container}>

            <div className={styles.blog_cont}>



                {/* <div className={styles.image_cont} >
                    <img src="/cpm/color-fondo.jpg" alt='' />
                </div> */}


                <h1>Canplast — Logo Redesign</h1>
                <h2>Modernizing a legacy brand while preserving its essence</h2>

                <h4>Overview</h4>
                <span>The original Canplast logo presented several challenges due to its outdated design and limited usability.</span>
                <span>I was tasked with redesigning the logo to make it more modern, versatile, and easier to apply across different platforms.</span>

                {/* <div className={styles.stack_cont} style={{ flexWrap: 'nowrap', gap: '12px' }}> */}



                    <div className={styles.image_cont} >
                        <img src="/cpm/old.jpg" alt='' />
                    </div>

                    <div className={styles.image_cont}style={{marginTop:'-12px'}} >
                        <img src="/cpm/color-fondo.jpg" alt='' />
                    </div>


                {/* </div> */}

                <small>Old vs New</small>

                <h4>Problem</h4>
                <span>The previous logo was difficult to use in digital environments, lacked flexibility, and did not align with modern design standards.</span>
                <span>At the same time, the brand carried a long history, making it essential to preserve its identity.</span>

                <h4>Approach</h4>
                <span>The redesign focused on simplifying the visual structure while maintaining the core essence of the brand.</span>
                <span>Every change was carefully considered to avoid losing recognition or meaning.</span>

                <h4>Design Direction</h4>
                <span>The new logo introduces a cleaner, more balanced form that works effectively across digital and physical applications.</span>
                <span>The goal was to create a timeless and adaptable identity.</span>

                <div className={styles.stack_cont} style={{ flexWrap: 'nowrap', gap: '12px' }}>
                    <div className={styles.image_cont} style={{ maxHeight: '650px' }}>
                        <img src="/cpm/blanco-fondo-oscuro.jpg" alt='' />
                    </div>

                    <div className={styles.image_cont} style={{ maxHeight: '850px' }}>
                        <img src="/cpm/blanco-fondo-rojo.jpg" alt='' />
                    </div>

                </div>

                <h4>Result</h4>
                <span>The updated logo improved usability, consistency, and visual clarity, allowing the brand to evolve without losing its identity.</span>

            </div>

            <Link href="/home">
                <Button
                    icon={<CornerDownLeft size={16} />}
                    style={{ fontSize: '16px' }}
                    className={styles.return_button}>Return</Button>
            </Link>
        </div>
    )
}