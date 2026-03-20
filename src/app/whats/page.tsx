'use client'
import styles from '../iattend/iattend.module.css'
import { Button } from 'antd'
import { CornerDownLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page() {

    return (
        <div className={styles.container}>

            <div className={styles.blog_cont}>



                <div className={styles.image_cont} style={{ maxHeight: '550px' }}>
                    <img src="/whats/whats_d.png" alt='' />
                </div>

                <h1>WhatsApp Customer Platform: Custom-built platform for customer support teams</h1>

                <div className={styles.stack_cont}>
                    <div className={styles.stack_label}>
                        Product Design
                    </div>
                    <div className={styles.stack_label}>
                        UI/UX
                    </div>
                    <div className={styles.stack_label}>
                        Frontend Development
                    </div>
                </div>

                <h4>Overview</h4>
                <span>This project is a custom-built platform designed to enable customer support teams to communicate with clients directly from within the company’s internal console.</span>
                <span>It replicates the WhatsApp Web interface while extending its functionality to support internal workflows, team collaboration, and real-time communication.</span>
                <span>I was responsible for designing the entire experience from scratch and developing the frontend, including the UI structure, components, and real-time data integration.</span>

                <h4>Context</h4>
                <span>The platform was built for the customer service team, who needed a centralized environment to manage all client conversations efficiently.</span>
                <span>Instead of relying on external tools, the goal was to integrate communication directly into the company’s ecosystem, adapting it to internal workflows and operational needs.</span>

                <h4>Problem</h4>
                <span>The team faced several challenges:</span>
                <ul>
                    <li>Conversations were not centralized</li>
                    <li>No clear ownership of chats</li>
                    <li>Lack of collaboration within conversations</li>
                    <li>External tools were disconnected from internal workflows</li>
                    <li>Communication lacked structure and visibility</li>
                </ul>
                <span>There was a need for a platform that could combine <b>external communication with internal coordination.</b></span>

                <h4>Goal</h4>
                <span>The goal was to build a platform that:</span>
                <ul>
                    <li>Centralizes all customer conversations</li>
                    <li>Integrates seamlessly into the internal system</li>
                    <li>Allows chat assignment and ownership</li>
                    <li>Enables internal collaboration within conversations</li>
                    <li>Feels identical to WhatsApp to avoid user friction</li>
                </ul>
                <span>A key requirement was that the platform had to <b>look and behave exactly like WhatsApp.</b></span>

                <h4>Approach</h4>
                <span>The solution was built by combining WhatsApp’s API with a custom real-time system.</span>
                <ul>
                    <li>Messages are sent and received via the WhatsApp API</li>
                    <li>Webhooks capture incoming messages</li>
                    <li>Data is stored in a real-time database</li>
                    <li>The frontend consumes and renders conversations dynamically</li>
                </ul>
                <span>This allowed the platform to behave like a live messaging system while maintaining full control over the data.</span>

                <h4>Key Decision</h4>
                <span>The most critical decision in this project was to create a pixel-perfect replication of WhatsApp Web.</span>
                <span>Instead of introducing a new interface, the goal was to eliminate learning curves, reduce friction, and leverage a familiar user experience.</span>
                <span>At the same time, new internal features were carefully integrated without breaking the visual consistency.</span>
                <span>This required temporarily stepping away from the company’s design system in order to fully match WhatsApp’s UI.</span>


                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/whats/whatsapp.jpg" alt='' />
                </div>
                <small>Real Whatsapp Web</small>

                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/whats/cpm_whats.jpg" alt='' />
                </div>
                <small>Canplast Whatsapp</small>

                <h4>Design</h4>
                <span>The design process focused on accurately replicating every aspect of WhatsApp Web:</span>
                <ul>
                    <li>Contact list</li>
                    <li>Conversation layout</li>
                    <li>Message styles (sent / received)</li>
                    <li>Media such as images, audio, and documents</li>
                    <li>Reactions and interactions</li>
                </ul>
                <span>Every detail was carefully recreated to ensure the experience felt native and familiar.</span>
                <span>Once the base interface was complete, new features were layered on top.</span>

                <h4>Extended Features</h4>
                <span>The platform introduces additional capabilities beyond WhatsApp:</span>
                <ul>
                    <li>Chat assignment to team members</li>
                    <li>Conversation subscriptions for users who need visibility without ownership</li>
                    <li>Internal discussions within conversations</li>
                    <li>The ability to tag team members and collaborate in context</li>
                </ul>

                {/* <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/whats/header_whats.jpg" alt='' />
                </div> */}

                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/whats/subs_whats.jpg" alt='' />
                </div>

                <small>Conversation subscriptions</small>

                
                <span>These features were designed to feel like a natural extension of the original interface.</span>


                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/whats/intern_whats.jpg" alt='' />
                </div>

                <small>Intern conversation</small>

                <h4>Development</h4>
                <span>The frontend was fully developed using Next.js.</span>
                <span>I was responsible for building the UI structure, implementing components, handling real-time data rendering, and managing communication with the database.</span>
                <span>The system relies on real-time updates, ensuring that messages and changes are reflected instantly.</span>

                <h4>Performance Challenges</h4>
                <span>One of the main challenges was handling large volumes of messages over time.</span>
                <span>As conversations grew, performance issues appeared in message loading, searching, and contact filtering.</span>
                <span>To solve this, I implemented RPC functions for direct database queries, significantly improving performance and reducing response times.</span>

                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/whats/conversation_whats.jpg" alt='' />
                </div>

                <small>Chat UI</small>

                <h4>Result</h4>
                <span>The platform is currently in use and has significantly improved the workflow of the customer support team.</span>
                <ul>
                    <li>Centralized communication</li>
                    <li>Faster response times</li>
                    <li>Improved collaboration</li>
                    <li>Seamless integration with internal systems</li>
                </ul>
                <span>It transformed communication into a structured and efficient process.</span>

                <h4>Learnings</h4>
                <span>This project provided valuable experience in both design and development.</span>
                <span>It allowed me to work with the WhatsApp API and real-time systems, design a pixel-perfect interface, balance replication with innovation, and solve performance issues at scale.</span>
                <span>It also reinforced the importance of attention to detail, especially when recreating a familiar product experience.</span>


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