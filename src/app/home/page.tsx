'use client'

import { useEffect, useRef, useState } from 'react'
import { Header } from '@/components/Header/Header'
import styles from './home.module.css'
import Image from 'next/image'
import { Button } from 'antd'
import { ArrowUpRight } from 'lucide-react'

export default function Page() {
  const [showHeader, setShowHeader] = useState(false)
  const lastScrollY = useRef(0)

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
      <Header showHeader={showHeader} />

      <div className={styles.content}>
        <span className={styles.key_title}>Luis Alberto Serrano</span>

        <span className={styles.key_sub_title}>Product designer & Developer</span>

        <span className={styles.single_text}>
          I create digital products where <b>technology, design, and user experience work in harmony.</b> My approach combines the structured thinking of engineering with the creativity of design to build software with intention and purpose.
        </span>
      </div>

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



      <div className={styles.projects}>

        <div className={styles.projects_cont}>
          <span className={styles.key_sub}  >Featured projects.</span>
        </div>

        <div className={styles.projects_cards_cont}>
          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/iattend_d.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>
              <span className={styles.stack_title}>I attend</span>
              <span className={styles.stack_desc}>Guest management platform that allows users to create digital invitations, build guest lists, share events, receive responses, and manage attendees in one place. Founded and developed from scratch as my own startup, I have led the product end-to-end, continuously designing, building, and improving the platform.</span>

              <div className={styles.col}>
                <span className={styles.label}>Role</span>
                <span>Founder · Product Design · UI/UX · Frontend & Backend Development</span>
              </div>

              <div className={styles.col}>
                <span className={styles.label}>Tools</span>
                <span>Figma · Illustrator · Photoshop</span>
              </div>

              <div className={styles.col}>
                <span className={styles.label}>Stack</span>
                <span>React · Next.js · Node.js · Supabase</span>
              </div>

              <Button icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>

          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/cpm_d.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>
              <span className={styles.stack_title}>Employee Console Redesign</span>
              <span className={styles.stack_desc}>Complete redesign of an internal employee platform, transforming a legacy Vue-based system into a modern, scalable experience built with Next.js. Led the design from the ground up, redefining the interface, structure, and visual system to improve clarity, usability, and consistency across the platform.</span>

              <div className={styles.col}>
                <span className={styles.label}>Role</span>
                <span>Product Design · UI/UX · Design System</span>
              </div>

              <div className={styles.col}>
                <span className={styles.label}>Tools</span>
                <span>Figma · Illustrator</span>
              </div>

              <Button icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>

          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/whats_d.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>
              <span className={styles.stack_title}>WhatsApp Customer Platform</span>
              <span className={styles.stack_desc}>Custom-built platform for customer support teams, replicating the WhatsApp Web experience while introducing internal collaboration tools for managing client conversations. Designed and developed a system that allows teams to send and receive messages through the official WhatsApp API, while enabling internal discussions alongside customer chats.</span>

              <div className={styles.col}>
                <span className={styles.label}>Role</span>
                <span>Product Design · UI/UX · Frontend Development</span>
              </div>

              <div className={styles.col}>
                <span className={styles.label}>Tools</span>
                <span>Figma · Illustrator</span>
              </div>

              <div className={styles.col}>
                <span className={styles.label}>Stack</span>
                <span>Next.js · WhatsApp API (Meta)</span>
              </div>

              <Button icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>

          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/frama_d.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>
              <span className={styles.stack_title}>FramaTech Website Redesign</span>
              <span className={styles.stack_desc}>Redesign of FramaTech’s website, transforming it into a more modern, functional, and brand-aligned digital experience. Led the design process from scratch, redefining the visual identity, layout, and user experience while introducing new features tailored to the company’s needs.</span>

              <div className={styles.col}>
                <span className={styles.label}>Role</span>
                <span>Product Design · UI/UX · Frontend Development</span>
              </div>

              <div className={styles.col}>
                <span className={styles.label}>Tools</span>
                <span>Figma · Illustrator</span>
              </div>

              <div className={styles.col}>
                <span className={styles.label}>Stack</span>
                <span>Liquid · Vue.js</span>
              </div>

              <Button icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>






        </div>
      </div>
    </div>
  )
}