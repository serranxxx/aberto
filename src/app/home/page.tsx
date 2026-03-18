'use client'

import { useEffect, useRef, useState } from 'react'
import { Header } from '@/components/Header/Header'
import styles from './home.module.css'
import Image from 'next/image'
import { Button } from 'antd'
import { ArrowUpRight } from 'lucide-react'
import { Footer } from '@/components/Footer/Footer'
import { Hero } from '@/components/Hero/Hero'
import { About } from '@/components/About/About'
import { Projects } from '@/components/Projects/Projects'
import FlipCard from '@/components/FlipCard/FlipCard'

export default function Page() {
  const [showHeader, setShowHeader] = useState(false)
  const lastScrollY = useRef(0)
  const [onCard, setOnCard] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY === 0) {
        setShowHeader(false)
      } else if (currentScrollY > lastScrollY.current) {
        setShowHeader(true)
      } else if (currentScrollY < lastScrollY.current) {
        setShowHeader(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.main_cont}>
      <Header showHeader={showHeader} setOnCard={setOnCard} />
      <Hero />
      <About />
      <Projects />
      <Footer />

      <div
        onClick={() => setOnCard(false)}
        className={styles.shadow} style={{
          opacity: onCard ? 1 : 0,
          pointerEvents: !onCard ? 'none' : undefined
        }}/>

      <FlipCard onCard={onCard}/>

    </div>
  )
}