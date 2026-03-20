'use client'
import styles from '../iattend/iattend.module.css'
import { Button } from 'antd'
import { CornerDownLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page() {

    return (
        <div className={styles.container}>

            <div className={styles.blog_cont}>


{/* 
                <div className={styles.image_cont} style={{border:'none'}}>
                    <img src="/iattend/loop.png" alt='' style={{
                        transform:'rotate(0deg) ', width:'120%'
                    }}/>
                </div> */}


                <h1>I attend — Brand Identity</h1>
                <h2>Designing a dynamic and recognizable visual identity</h2>

                <h4>Overview</h4>
                <span>As the creator of I attend, I was responsible for designing the entire visual identity of the product, including the logo, iconography, and overall visual language.</span>
                <span>The goal was to create a brand that feels alive, dynamic, and instantly recognizable.</span>

                <h4>Concept</h4>
                <span>The identity is built around the idea of movement and flow.</span>
                <span>I chose a spiral as the core element, representing continuity, interaction, and the evolving nature of events and experiences.</span>
                <span>This shape became a fundamental part of both the logo and the visual system.</span>

                <div className={styles.stack_cont} style={{ flexWrap: 'nowrap', gap: '12px' }}>
                    <div className={styles.image_cont} style={{ maxHeight: '650px' }}>
                        <img src="/iattend/blanco-bg.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>

                    <div className={styles.image_cont} style={{ maxHeight: '850px' }}>
                        <img src="/iattend/negro-morado.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>

                    <div className={styles.image_cont} style={{ maxHeight: '850px' }}>
                        <img src="/iattend/blanco-morado.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>
                </div>

                <h4>Design Direction</h4>
                <span>The design focuses on simplicity and clarity.</span>
                <span>The goal was to create something minimal, yet highly recognizable and flexible across different contexts.</span>
                <span>Every visual decision was made to ensure consistency and strong brand presence.</span>

                <div className={styles.stack_cont} style={{ flexWrap: 'nowrap', gap: '12px' }}>
                    <div className={styles.image_cont} style={{ maxHeight: '650px' }}>
                        <img src="/iattend/icon_bm.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>

                    <div className={styles.image_cont} style={{ maxHeight: '850px' }}>
                        <img src="/iattend/icon_mb.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>

                    <div className={styles.image_cont} style={{ maxHeight: '850px' }}>
                        <img src="/iattend/icon_nb.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>

                    <div className={styles.image_cont} style={{ maxHeight: '850px' }}>
                        <img src="/iattend/icon_nm.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>
                </div>

                <h4>Application</h4>
                <span>The identity extends across the entire product, including icons, interface elements, and branding assets.</span>
                <span>Special attention was given to maintaining coherence between the product experience and the brand identity.</span>

                <h4>Reflection</h4>
                <span>I attend’s identity is something I have carefully refined over time.</span>
                <span>I strongly believe that visual identity plays a critical role in how users perceive and connect with a product.</span>

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