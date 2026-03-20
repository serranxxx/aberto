'use client'
import styles from '../iattend/iattend.module.css'
import { Button } from 'antd'
import { CornerDownLeft } from 'lucide-react'
import Link from 'next/link'

export default function Page() {

    return (
        <div className={styles.container}>

            <div className={styles.blog_cont}>



                <div className={styles.image_cont} >
                    <img src="/cpm/cpm_d.jpg" alt=''  />
                </div>


                <h1>Employee Console Redesign: Internal platform redesign for employee management</h1>

                <div className={styles.stack_cont}>
                    <div className={styles.stack_label}>
                        Product Design
                    </div>
                    <div className={styles.stack_label}>
                        UI/UX
                    </div>
                    <div className={styles.stack_label}>
                        Design System
                    </div>

                </div>


                <h4>Overview</h4>
                <span>The company had an internal platform used daily by employees to manage operations such as orders, invoicing, inventory, and tracking processes.</span>
                <span>The system had been originally developed using Vue 2, which over time became difficult to maintain due to obsolescence and lack of modern tooling. As part of a major technical upgrade, the platform was rebuilt using Next.js with TypeScript.</span>
                <span>As part of this transition, I was responsible for redesigning the entire product from scratch and creating a new design system tailored specifically for this platform.</span>

                <h4>Context</h4>
                <span>This is a core internal tool used daily by employees across different areas of the company. Its performance, clarity, and usability directly impact operational efficiency.</span>
                <span>The redesign was not only a visual update, but a complete rethinking of how the system should function as a modern, scalable product.</span>

                <h4>Problem</h4>
                <span>The previous system presented several challenges:</span>
                <ul>
                    <li>Outdated technology (Vue 2)</li>
                    <li>Lack of scalability and maintainability</li>
                    <li>Inconsistent UI patterns</li>
                    <li>Limited design system or visual structure</li>
                    <li>Complex and sometimes inefficient user flows</li>
                </ul>

                <span>The experience did not match the importance of the tool within the company.</span>


                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/cpm/after.jpg" alt='' />
                </div>

                <small>Old Console</small>

                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px',}}>
                    <img src="/cpm/before.jpg" alt='' />
                </div>

                <small>New Console</small>

                <h4>Goal</h4>
                <span>The goal was to design a platform that is:                </span>
                <ul>
                    <li>Clean and modern</li>
                    <li>Scalable and consistent</li>
                    <li>Efficient for daily use</li>
                    <li>Visually balanced and easy to navigate</li>
                </ul>

                <span>A key focus was creating a system that could grow over time without losing clarity or usability.</span>

                <h4>Approach</h4>
                <span>The project required building the design from the ground up.</span>
                <span>This included:</span>

                <ul>
                    <li>Defining layout structure</li>
                    <li>Establishing color systems</li>
                    <li>Selecting typography</li>
                    <li>Creating reusable components</li>
                    <li>Understanding user needs and workflows</li>
                </ul>

                <span>The challenge was to balance complex functionality with simplicity, ensuring the platform remained powerful but easy to use.</span>

                {/* <div className={styles.image_cont} >
                    <img src="/iattend/it_u_1.jpg" alt='' />
                </div> */}


                <h4>Design Direction</h4>
                <span>The main inspiration came from products like Notion, where minimal design supports complex interactions without overwhelming the user.</span>
                <span>The goal was to achieve a clean and modern interface that could handle a large amount of information while maintaining clarity and focus.</span>


                <h4>Layout & Navigation</h4>
                <span>One of the key decisions was designing a dynamic sidebar.</span>
                <span>The sidebar became the central hub of the experience, allowing users to navigate quickly, access tools, search information, check notifications, and manage their session from a single place.</span>
                <span>It was designed to be powerful but unobtrusive, giving users fast access to everything they need while keeping the interface clean and focused.</span>
                <span>Special attention was given to motion, spacing, color balance, and interaction details to make the experience feel smooth, elegant, and intuitive.</span>

                <div className={styles.image_cont} style={{maxHeight:'900px', padding:'24px 0px'}}>
                    <img src="/cpm/sidebar.jpg" alt='' style={{width:'70%'}}/>
                </div>

                <small>Sidebar integration</small>

                <h4>Design System</h4>
                <span>A complete design system was created to ensure consistency, scalability, and clarity across the platform.</span>
                <span>This system defined the visual language of the product, including colors, typography, reusable components, and interaction patterns.</span>
                <span>The intention was to create a modern interface that could scale over time without losing coherence.</span>

                <h4>Color System</h4>
                <ul>
                    <li><b>Brand:</b> #DA303A — used for primary actions and key UI accents</li>
                    <li><b>Contrast:</b> #454545 — used to support hierarchy and readability</li>
                    <li><b>Base:</b> #FFFFFF — the foundation of the interface</li>
                    <li><b>Secondary:</b> #F5F3F2 — used for subtle contrast and layout separation</li>
                </ul>

                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px', }}>
                    <img src="/cpm/palette.jpg" alt=''/>
                </div>

                <small>Color palette</small>

                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px', }}>
                    <img src="/cpm/weights.jpg" alt='' />
                </div>

                <small>Color weights</small>


                <h4>Typography</h4>
                <span>Work Sans was selected as the main typeface due to its readability, versatility, and availability across multiple weights.</span>
                <span>It helped establish a clean and functional visual rhythm throughout the platform.</span>

                <div className={styles.image_cont} style={{border:'1px solid #ebebeb', maxHeight:'900px', }}>
                    <img src="/cpm/fonts.jpg" alt='' />
                </div>

                <small>Typography</small>

                <h4>Components</h4>
                <span>Once the design direction was defined, I designed a collection of reusable components for the platform.</span>
                <span>This included modals, drawers, popups, and other interactive UI elements that needed to feel visually balanced, consistent, and aligned with the Canplast brand.</span>
                <span>The idea was to build a component library that was flexible, scalable, and easy to implement across the product.</span>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/cpm/component_1.jpg" alt='' style={{maxHeight:'100%'}}/>
                </div>

                <small>Drawer component</small>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/cpm/component_2.jpg" alt='' />
                </div>

                <small>Modal component</small>

                <h4>Development</h4>
                <span>The platform was developed using Next.js with TypeScript.</span>
                <span>I also contributed to the implementation of several UI components, such as modals, drawers, and other interface elements, while helping ensure the design was translated correctly into development.</span>

                <h4>Result</h4>
                <span>The final result was a complete transformation of the platform, both technically and visually.</span>
                <span>The migration to Next.js significantly improved performance and scalability, while the new design created a much cleaner, faster, and more intuitive experience for employees.</span>
                <span>The redesign helped turn an outdated internal tool into a modern and efficient product built for long-term growth.</span>


                <h4>Learnings</h4>
                <span>This project became one of the most valuable learning experiences in my career.</span>
                <span>Being involved from the very beginning gave me the opportunity to think deeply about structure, scalability, design systems, and how to build a product foundation that can grow over time.</span>
                <span>It reinforced how important it is to make strong design decisions early, especially when creating a product that needs to remain consistent and maintainable in the future.</span>
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