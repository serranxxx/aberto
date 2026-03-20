'use client'
import Image from 'next/image'
import styles from './iattend.module.css'
import { Button } from 'antd'
import { CornerDownLeft, Globe, Instagram, Linkedin } from 'lucide-react'
import Link from 'next/link'

export default function Page() {

    return (
        <div className={styles.container}>

            <div className={styles.blog_cont}>



                <div className={styles.image_cont}  >
                    <img src="/iattend/iattend_d.png" alt='' />
                </div>


                <h1>I attend: Guest management platform for digital invitations</h1>

                <div className={styles.stack_cont}>
                    <div className={styles.stack_label}>
                        Founder
                    </div>
                    <div className={styles.stack_label}>
                        Product Design
                    </div>
                    <div className={styles.stack_label}>
                        Fullstack Development
                    </div>

                </div>


                <h4>Overview</h4>
                <span>I attend is a platform that allows users to create digital invitations, build guest lists, share events, receive responses, and manage attendees in one place.</span>
                <span>I founded and built I attend from scratch. Every aspect of the product — from design and user experience to development and architecture — has been created and continuously improved by me.</span>


                <h4>Origin</h4>
                <span>I attend started from a simple request.</span>
                <span>A friend asked me to help design a wedding invitation. While exploring existing services, I realized that I could not only create a better invitation, but also build a scalable platform where anyone could design their own.</span>
                <span>That moment became the starting point.</span>
                <span>What began as a single invitation quickly evolved into a full product.</span>

                <h4>Problem</h4>
                <span>The digital invitation space is heavily dominated by graphic design-focused solutions.</span>
                <span>Most platforms offer visually appealing designs, but:</span>
                <ul>
                    <li>Lack real functionality as web products</li>
                    <li>Rely on rigid templates</li>
                    <li>Require manual processes for sending and managing guests</li>
                    <li>Provide limited and often frustrating user experiences</li>
                </ul>

                <span>There was a clear gap between <b>design quality and product experience.</b></span>


                <div className={styles.image_cont} style={{ maxHeight: '800px', border: 'none', }}>
                    <img src="/iattend/side_u_2.jpg" alt='' style={{ width: '80%' }} />
                </div>

                <h4>Opportunity</h4>
                <span>I saw a market full of small design studios, but lacking:</span>
                <ul>
                    <li>Technology-driven solutions</li>
                    <li>Scalable platforms</li>
                    <li>Automation</li>
                    <li>Advanced features</li>
                    <li>Strong UX thinking</li>
                </ul>

                <span>Invitations were beautiful, but not functional. Or functional, but not beautiful.</span>
                <span>That gap was the opportunity.</span>

                <h4>Goal</h4>
                <span>The goal was to design and build a platform that prioritizes user experience, is built with modern technology, and maintains a strong visual identity.</span>
                <span>I wanted to create a system that allows users to design invitations freely, without relying on rigid templates, while keeping the experience simple and intuitive.</span>
                <span>Every I attend invitation should be <b>visually elegant and functionally powerful.</b></span>

                <div className={styles.image_cont} >
                    <img src="/iattend/it_u_1.jpg" alt='' />
                </div>


                <h4>Approach</h4>
                <span>To solve the problem, the product was divided into three main systems:</span>
                <ul>
                    <li>Invitation</li>
                    <li>Design module</li>
                    <li>Guest management</li>
                </ul>



                <h4>Invitation Design</h4>
                <span>The first step was defining the structure of a digital invitation.</span>
                <span>This involved identifying the essential modules and designing a responsive layout that works across devices.</span>
                <span>A key principle was simplicity: users should not need more than two taps to perform any action.</span>

                <h4>Design Module</h4>
                <span>The design module became one of the most challenging parts of the product.</span>
                <span>The goal was to create a real-time editing experience where users could visually build their invitation and see changes instantly.</span>
                <span>This required designing a canvas-like system that balances flexibility, control, and simplicity.</span>
                <span>The main challenge was UX: making a powerful tool feel simple enough for anyone to use, even without technical knowledge.</span>

                <div className={styles.image_cont} style={{ maxHeight: '550px', border: '1px solid #ebebeb' }}>
                    <img src="/iattend/design_m.jpg" alt='' style={{ maxHeight: '100%' }} />
                </div>

                <small>Design module</small>


                <h4>Guest Management</h4>
                <span>This is where the product becomes a complete platform.</span>
                <span>Users can create and organize guest lists, categorize attendees, and control access to their invitations.</span>
                <span>Through the WhatsApp API, invitations can be sent automatically, allowing guests to confirm attendance directly.</span>
                <span>All responses are updated in real time, giving users full control and visibility.</span>

                <div className={styles.image_cont} style={{ maxHeight: '500px' }}>
                    <img src="/iattend/guests_m.jpg" alt='' />
                </div>

                <small>Guests managment</small>

                <div className={styles.stack_cont} style={{flexWrap:'nowrap', gap:'12px'}}>
                    <div className={styles.image_cont} style={{ maxHeight: '650px' }}>
                        <img src="/iattend/download_m.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>

                    <div className={styles.image_cont} style={{ maxHeight: '850px' }}>
                        <img src="/iattend/tickets_m.jpg" alt='' style={{ maxWidth: '450px' }} />
                    </div>
                </div>



                <small>Control settings</small>



                <h4>Table Planning</h4>
                <span>The final step was building a table planning system.</span>
                <span>This feature allows users to create tables, assign guests, and rearrange layouts dynamically.</span>
                <span>The experience was designed to feel intuitive and flexible, replicating real-world planning in a digital interface.</span>

                <div className={styles.image_cont} style={{ maxHeight: '500px' }}>
                    <img src="/iattend/table_m.jpg" alt='' />
                </div>
                <small>Table Planning</small>

                <h4>System Architecture</h4>
                <span>I attend is built as a multi-platform system composed of four main projects:</span>
                <ul>
                    <li><b>Backend:</b> Node.js + Express for APIs and integrations (WhatsApp, OpenAI, Stripe, translations)</li>
                    <li><b>iattend.site:</b> React.js application for design and guest management</li>
                    <li><b>iattend.mx:</b> Next.js (TypeScript) marketing website and future content platform</li>
                    <li><b>iattend.events:</b> Next.js (TypeScript) dedicated environment for hosting invitations at scale</li>
                </ul>
                <span>The system was separated to ensure performance, scalability, and maintainability.</span>


                <h4>Tech Stack</h4>
                <ul>
                    <li>React · Next.js · Node.js · Supabase</li>
                    <li>Ant Design · Lucide Icons</li>
                    <li>WhatsApp API (Meta)</li>
                </ul>


                <h4>Key Features</h4>
                <ul>
                    <li>Fully customizable invitation design (11 independent modules)</li>
                    <li>Guest list management and categorization</li>
                    <li>Privacy control (open or restricted invitations)</li>
                    <li>Automated sending via WhatsApp</li>
                    <li>Real-time RSVP tracking</li>
                    <li>Table planning system</li>
                    <li>Data export</li>
                    <li>Side events creation</li>
                    <li>Multi-language support</li>
                    <li>Access control (passes)</li>
                </ul>

                <div className={styles.image_cont} style={{ maxHeight: '500px' }}>
                    <img src="/iattend/side_m.jpg" alt='' />
                </div>
                <small>Side Events</small>


                <h4>Result</h4>
                <span>I attend has evolved into a complete guest management platform.</span>
                <span>It has successfully supported the planning of more than 30 weddings and over 7,500 guests confirmed, providing a stable system, a strong user experience, and a high level of customization.</span>
                <span>The product continues to grow and improve over time.</span>


                <h4>Learnings</h4>
                <span>I attend has been one of my most important learning experiences.</span>
                <span>It constantly pushed me to improve both as a designer and as a developer, forcing me to think beyond execution and into product, scalability, and user experience.</span>
                <span>Today, the challenges are not only technical, but also product and business-related.</span>


                <h4>Vision</h4>
                <span>My goal is for I attend to become the default platform for event organization.</span>
                <span>I continue working on improving the product, expanding its capabilities, and building a modern, efficient, and intuitive experience.</span>

                <span>To learn more about I attend, please visit our pages</span>
                <div className={styles.stack_cont}>
                    <Link href="https://www.iattend.mx/about" target='_blank'>
                        <div className={styles.stack_label_button} ><Globe size={16} />iattend.mx</div>
                    </Link>
                    <Link href="https://www.instagram.com/iattend.mx?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank'>
                        <div className={styles.stack_label_button} ><Instagram size={16} />Instagram</div>
                    </Link>
                    <Link href="https://www.linkedin.com/company/i-attend/" target='_blank'>
                        <div className={styles.stack_label_button} ><Linkedin size={16} style={{ marginTop: '-4px' }} /> Linkedin</div>
                    </Link>

                </div>

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