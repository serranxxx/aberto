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



                <div className={styles.image_cont} >
                    <img src="/frama/frama_d.jpg" alt='' />
                </div>


                <h1>FramaTech Website Redesign: Website redesign focused on improving usability and aligning with business needs</h1>


                <div className={styles.stack_cont}>
                    <div className={styles.stack_label}>
                        UI/UX
                    </div>
                    <div className={styles.stack_label}>
                        Frontend Development
                    </div>
                </div>

                <h4>Overview</h4>
                <span>FramaTech is a U.S.-based company specializing in the production and distribution of edgebanding materials, recognized as one of the leaders in North America.</span>
                <span>I was responsible for redesigning the company’s Shopify website, creating a new experience from scratch that included navigation, menus, banners, collections, and overall layout.</span>
                <span>After designing each section, I implemented the solution using Liquid and Vue, building a fully customized experience tailored to the company’s needs.</span>

                <h4>Context</h4>
                <span>The website serves as a key touchpoint for customers, providing access to product information, collections, and purchasing flows.</span>
                <span>The redesign required balancing usability, brand presence, and functional requirements within the constraints of Shopify.</span>


                <h4>Problem</h4>
                <span>The previous website was built using a standard Shopify template, which presented several limitations:</span>
                <ul>
                    <li>Lack of flexibility to adapt to business needs</li>
                    <li>Limited customization in layout and interactions</li>
                    <li>Poor alignment with the company’s brand identity</li>
                    <li>Suboptimal user experience for the target audience</li>
                </ul>
                <span>The platform did not reflect the scale or professionalism of the company.</span>

                <h4>Goal</h4>
                <span>The goal was to create a website that:</span>
                <ul>
                    <li>Improves usability and clarity</li>
                    <li>Aligns with the company’s brand</li>
                    <li>Adapts to specific business requirements</li>
                    <li>Provides a clear and accessible experience for users</li>
                </ul>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/frama/ft_land.jpg" alt='' />
                </div>

                <small>Frama-Tech land page</small>

                <h4>Approach</h4>
                <span>The redesign was approached as a fully custom solution.</span>
                <span>Instead of relying on pre-built templates, I designed each section individually and then implemented it directly in code using Liquid, integrating Vue where necessary to handle custom logic and interactions.</span>

                

                <h4>Design Direction</h4>
                <span>The design was driven by the company’s customer profile.</span>
                <span>The primary users are often not highly familiar with digital tools, so the interface needed to be clear, direct, and easy to navigate.</span>
                <span>Instead of pursuing a minimal or experimental design, the focus was on creating a layout that feels intuitive, structured, and accessible.</span>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/frama/ft_help.jpg" alt='' />
                </div>

                <small>Help modal</small>

                <h4>Layout & UX</h4>
                <span>The layout was designed to prioritize clarity and ease of navigation.</span>
                <span>Elements were intentionally larger, well-defined, and easy to locate, reducing friction for users and making interactions more straightforward.</span>
                <span>Special attention was given to menus, navigation flows, and product organization to ensure users could quickly find what they needed.</span>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/frama/ft_venneer.jpg" alt='' />
                </div>

                <small>Veneer menu</small>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/frama/ft_pvc.jpg" alt='' />
                </div>

                <small>PVC menu</small>

                <h4>Visual System</h4>
                <span>The design incorporated the company’s brand identity in a subtle but consistent way.</span>
                <span>Colors, spacing, and visual accents were carefully applied to reinforce brand recognition without overwhelming the interface.</span>
                <span>The result is a balanced visual system that supports both usability and brand presence.</span>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/frama/ft_ships.jpg" alt='' />
                </div>

                {/* <small>PVC menu</small> */}

                <h4>Components</h4>
                <span>All components were designed and developed from scratch.</span>
                <span>Due to the use of Liquid and the constraints of the Shopify environment, no UI libraries were used, requiring full custom implementation of each element.</span>
                <span>This included navigation elements, product displays, banners, and interactive sections.</span>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/frama/ft_chips.jpg" alt='' />
                </div>

                {/* <small>PVC menu</small> */}

                <h4>Development</h4>
                <span>The website was developed using Liquid, with Vue integrated for custom logic and dynamic behavior.</span>
                <span>I was responsible for implementing the design and ensuring that each component functioned correctly within Shopify’s architecture.</span>

                <div className={styles.image_cont} style={{ maxHeight:'550px', border:'1px solid #ebebeb'}}>
                    <img src="/frama/ft_banner.jpg" alt='' />
                </div>

                <small>Frama-Tech land page</small>

                <h4>Result</h4>
                <span>The redesign resulted in a significantly improved user experience, with a cleaner, more structured interface tailored to the company’s needs.</span>
                <span>The new platform better represents the brand while providing a more intuitive and efficient experience for users.</span>

                <h4>Learnings</h4>
                <span>This project was one of my first experiences working within the company and played a key role in strengthening my foundation as both a designer and developer.</span>
                <span>It also introduced me to Shopify, Liquid, and the importance of adapting design decisions to real business and technical constraints.</span>
                <span>The experience helped me better understand how to align branding, usability, and implementation in a real-world product.</span>

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