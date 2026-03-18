
import { Button } from 'antd'
import styles from './projects.module.css'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

export const Projects = () => {
  return (
    <div className={styles.projects}>

        <div className={styles.projects_cont}>
          <span className={styles.key_sub}  >Featured projects.</span>
        </div>

        <div className={styles.projects_cards_cont}>
          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/meta.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>

              <span className={styles.stack_desc}><b >I attend: </b>Guest management platform that allows users to <b>create digital invitations, build guest lists, share events, receive responses, and manage attendees</b> in one place. Founded and developed from scratch as my own startup, I have led the product end-to-end, continuously designing, building, and improving the platform.</span>

              <div className={styles.col}>
                <span className={styles.label}>Stack</span>

                <div className={styles.stack_cont}>
                  <span className={styles.stack_label}>Figma</span>
                  <span className={styles.stack_label}>Illustrator</span>
                  <span className={styles.stack_label}>React.js</span>
                  <span className={styles.stack_label}>Next.js</span>
                  <span className={styles.stack_label}>Node.js</span>
                  <span className={styles.stack_label}>Supabase</span>
                </div>
              </div>


              <Button style={{
                backgroundColor:'#1D1D1B'
              }} icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>

          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/cpm_d.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>
              <span className={styles.stack_desc}><b>Employee Console Redesign: </b>Complete redesign of an internal employee platform, transforming a legacy Vue-based system into a modern, scalable experience built with Next.js. <b>Led the design from the ground up</b>, redefining the interface, structure, and visual system to improve clarity, usability, and consistency across the platform.</span>

              <div className={styles.col}>
                <span className={styles.label}>Stack</span>

                <div className={styles.stack_cont}>
                  <span className={styles.stack_label}>Figma</span>
                  <span className={styles.stack_label}>Illustrator</span>
                  <span className={styles.stack_label}>Next.js</span>
                </div>
              </div>


              <Button style={{
                backgroundColor:'#1D1D1B'
              }} icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>

          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/whats_d.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>
              <span className={styles.stack_desc}><b>WhatsApp Customer Platform: </b>Custom-built platform for customer support teams, <b>replicating the WhatsApp Web experience while introducing internal collaboration tools for managing client conversations.</b> Designed and developed a system that allows teams to send and receive messages through the official WhatsApp API, while <b>enabling internal discussions alongside customer chats.</b></span>


              <div className={styles.col}>
                <span className={styles.label}>Stack</span>

                <div className={styles.stack_cont}>
                  <span className={styles.stack_label}>Figma</span>
                  <span className={styles.stack_label}>Illustrator</span>
                  <span className={styles.stack_label}>Next.js</span>
                  <span className={styles.stack_label}>WhatsApp API (Meta)</span>
                </div>
              </div>


              <Button style={{
                backgroundColor:'#1D1D1B'
              }} icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>

          <div className={styles.card_col}>
            <div className={styles.project_card}>
              <Image fill src="/frama_d.png" alt='' style={{ objectFit: 'cover' }} />
            </div>

            <div className={styles.info_stack}>
              <span className={styles.stack_desc}><b>FramaTech Website Redesign: </b>Redesign of FramaTech’s website, transforming it into a more modern, functional, and brand-aligned digital experience. Led the design process from scratch, redefining the visual identity, layout, and user experience while introducing new features tailored to the company’s needs.</span>

              <div className={styles.col}>
                <span className={styles.label}>Stack</span>

                <div className={styles.stack_cont}>
                  <span className={styles.stack_label}>Figma</span>
                  <span className={styles.stack_label}>Illustrator</span>
                  <span className={styles.stack_label}>Liquid</span>
                  <span className={styles.stack_label}>Vue.js</span>
                </div>
              </div>

              <Button style={{
                backgroundColor:'#1D1D1B'
              }} icon={<ArrowUpRight size={16} />} type='primary'>Explore case</Button>

            </div>
          </div>






        </div>
      </div>
  )
}
