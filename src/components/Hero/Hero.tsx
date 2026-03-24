import { useEffect, useState } from 'react'
import styles from './hero.module.css'
import { useScreenWidth } from "@/hooks/useScreenWidth";

export const Hero = () => {
    const [scrollY, setScrollY] = useState(0)

    const width = useScreenWidth();
    const isLargeScreen = width >= 768;

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // control de opacidad (ajusta el 300 a tu gusto)
    const opacity = Math.max(1 - scrollY / 300, 0)
    const progress = Math.min(scrollY / 400, 1) // 0 → 1
    const background = `
            radial-gradient(circle,
            rgba(90, 200, 250, ${0.12 + progress * 0.4}),
            rgba(79, 172, 254, ${0.12 + progress * 0.4}),
            #ffffff ${50 + progress * 40}%)`

    return (
        <div className={styles.content} style={{ background }}>
            <span className={styles.key_title}>
                Alberto Serrano
            </span>

            <span
                className={styles.key_sub_title}
                style={{ opacity, transform: isLargeScreen ? `translateY(${scrollY * 0.2}px)` : undefined}}
            >
                Product designer & Developer
            </span>

            <span
                className={styles.single_text}
                style={{ opacity, transform: isLargeScreen ? `translateY(${scrollY * 0.3}px)` : undefined }}
            >
                I create digital products where <b>technology, design, and user experience work in harmony.</b> My approach combines the structured thinking of engineering with the creativity of design to build software with intention and purpose.
            </span>
        </div>
    )
}