
'use client'

import { Button } from 'antd'
import styles from './visual.module.css'
import Image from 'next/image'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'
import Link from 'next/link'

export const Visual = () => {

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -350,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 350,
        behavior: "smooth"
      });
    }
  };


  return (
    <div className={styles.projects}>

      <div className={styles.projects_cont}>
        <span className={styles.key_sub}  >Visual & Brand Work.</span>

        <div className={styles.buttons_cont}>
          <Button onClick={scrollLeft} icon={<ChevronLeft size={16} />} />
          <Button onClick={scrollRight} icon={<ChevronRight size={16} />} />
        </div>
      </div>

      <div ref={scrollRef} className={styles.projects_cards_cont}>
        <div className={styles.card_col}>
          <div className={styles.project_card}>
            <Image fill src="/iattend/blanco-bg.jpg" alt='' style={{ objectFit: 'cover' }} />
          </div>

          <div className={styles.info_stack}>

            <span className={styles.stack_desc}><b >I attend: Brand Identity </b>Complete visual identity design for my own product, including logo, icon system, and visual language. <b>Designed a dynamic and recognizable brand focused on simplicity, movement, and strong visual presence.</b></span>

            <div className={styles.col}>
              <span className={styles.label}>Scope</span>

              <div className={styles.stack_cont}>
                <span className={styles.stack_label}>Brand Identity</span>
                <span className={styles.stack_label}>Logo Design</span>
                <span className={styles.stack_label}>Visual System</span>
              </div>
            </div>


            <Link href="/visual-iattend">
              <Button
                style={{ backgroundColor: '#1D1D1B' }}
                icon={<ArrowUpRight size={16} />}
                type="primary"
              >
                Explore
              </Button>
            </Link>

          </div>
        </div>

        <div className={styles.card_col}>
          <div className={styles.project_card}>
            <Image fill src="/cpm/cpm_logo.jpg" alt='' style={{ objectFit: 'cover' }} />
          </div>

          <div className={styles.info_stack}>
            <span className={styles.stack_desc}><b>Canplast: Logo Redesign</b> Modern redesign of a legacy brand, improving usability and visual consistency while preserving its core identity. Focused on creating a cleaner, more versatile logo system adaptable across digital and physical applications.</span>

            <div className={styles.col}>
              <span className={styles.label}>Scope</span>

              <div className={styles.stack_cont}>
                <span className={styles.stack_label}>Brand Identity</span>
                <span className={styles.stack_label}>Logo Redesign</span>
              </div>
            </div>

            <Link href="/visual-cpm">
              <Button style={{
                backgroundColor: '#1D1D1B'
              }} icon={<ArrowUpRight size={16} />} type='primary'>Explore</Button  >
            </Link>


          </div>
        </div>

        <div className={styles.card_col}>
          <div className={styles.project_card}>
            <Image fill src="/frama/ft_logo.jpg" alt='' style={{ objectFit: 'cover' }} />
          </div>

          <div className={styles.info_stack}>
            <span className={styles.stack_desc}><b> FramaTech: Visual & Merch Design</b>Ongoing visual design work including banners, event materials, and branded merchandise. Created a consistent visual language across multiple formats, from digital assets to physical products.</span>


            <div className={styles.col}>
              <span className={styles.label}>Scope</span>

              <div className={styles.stack_cont}>
                <span className={styles.stack_label}>Visual Design</span>
                <span className={styles.stack_label}>Merch</span>
                <span className={styles.stack_label}>Marketing Assets</span>
              </div>
            </div>


            <Link href="/visual-ft">
              <Button style={{
                backgroundColor: '#1D1D1B'
              }} icon={<ArrowUpRight size={16} />} type='primary'>Explore</Button>
            </Link>

          </div>
        </div>




      </div>


    </div>
  )
}
