import styles from './about.module.css'
import Image from 'next/image'

export const About = () => {
    return (
        <div className={styles.about}>
            <div className={styles.about_cont}>
                <span className={styles.about_text}>About me</span>
                <span className={styles.key_sub}>
                    Electronic engineer, designer, and product developer
                </span>

                <div className={styles.image_cont}>
                    <Image fill src="/ssbb.jpg" alt='' style={{ objectFit: 'cover' }} />
                </div>

                <div className={styles.text_cont}>
                    <span className={styles.key_sub}>My approach</span>
                    <span className={styles.text_c}>
                        My journey began in engineering, where I learned to think in <b>systems, logic, and structure.</b> Over time, I discovered design and user experience, which allowed me to explore another dimension of digital products: <b>how they feel, how they are understood, and how they are experienced.</b></span>

                    <span className={styles.text_c} style={{ marginTop: '0' }}>
                        Today, I work at the intersection of <b>technology and creativity.</b> I don’t separate design from development; both are part of the same building process.            </span>

                    <span className={styles.text_c} style={{ marginTop: '0' }}>
                        I believe the best digital products are created when <b>functionality and aesthetics are developed together.</b> To me, good software doesn’t just solve problems, <b>it should also look good and feel good to use.</b></span>
                </div>
            </div>

        </div>
    )
}
