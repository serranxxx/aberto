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
                    <img src="/frama/frama_d.jpg" alt='' />
                </div> */}

                <h1>FramaTech — Visual & Merch Design</h1>
                <h2>Building a consistent visual presence across digital and physical media</h2>

                <h4>Overview</h4>
                <span>At FramaTech, I have been responsible for a wide range of visual design work, including event materials, banners, and branded merchandise.</span>
                <span>My role has been to ensure visual consistency and strong brand presence across all touchpoints.</span>

                <div className={styles.image_cont} >
                    <img src="/frama/ft_logo.jpg" alt='' />
                </div>

                <h4>Scope</h4>
                <span>The work includes:</span>
                <ul>
                    <li>Event banners and exhibition materials</li>
                    <li>Marketing assets and promotional visuals</li>
                    <li>Branded merchandise such as apparel and caps</li>
                </ul>

                {/* <div className={styles.stack_cont} style={{ flexWrap: 'nowrap', gap: '12px' }}> */}



                <div className={styles.image_cont} style={{ maxHeight: '450px' }}>
                    <img src="/frama/digitalprint.jpg" alt='' />
                </div>

                <div className={styles.image_cont} >
                    <img src="/frama/digitalprint_banner.jpg" alt='' />
                </div>

                <small>Banner design</small>


                {/* </div> */}

                <h4>Approach</h4>
                <span>Each piece is designed with attention to clarity, brand alignment, and visual impact.</span>
                <span>The goal is to create materials that are both functional and visually engaging.</span>

                <div className={styles.stack_cont} style={{ flexWrap: 'nowrap', gap: '24px' }}>



                    <div className={styles.image_cont} style={{ minHeight: '400px', maxHeight:'400px', backgroundColor: '#F6F6F6'  }}>
                        <img src="/frama/shirt.jpg" alt='' style={{ width: '110%' }} />
                    </div>

                    <div className={styles.image_cont} style={{ minHeight: '400px',maxHeight: '400px', backgroundColor: '#F6F6F6' }}  >
                        <img src="/frama/caps.jpg" alt='' style={{ width: '80%' }} />
                    </div>


                </div>

                <div className={styles.image_cont} style={{ maxHeight: '400px', marginTop: '-24px' }}  >
                    <img src="/frama/merch.jpg" alt='' style={{ width: '100%' }} />
                </div>

                <small>Merch design</small>


                <h4>Design Direction</h4>
                <span>The visual language balances boldness and clarity, ensuring the brand remains recognizable in different formats and environments.</span>


                <div className={styles.image_cont} style={{ maxHeight: '400px',  }}  >
                    <img src="/frama/altern_logo.jpg" alt='' style={{ width: '100%' }} />
                </div>

                <small>Alternative logos</small>

                <h4>Result</h4>
                <span>The work has contributed to a stronger and more cohesive brand presence across events, marketing, and physical products.</span>

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