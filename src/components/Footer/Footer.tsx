import styles from './footer.module.css'
import { Linkedin, Mail, Phone } from 'lucide-react'

export const Footer = () => {
    return (
        <div className={styles.footer_cont}>
            <a 
                className={styles.row}
                href="mailto:albserrano8@gmail.com"
            >
                <Mail size={14} />
                <span>albserrano8@gmail.com</span>
            </a>

            <span>|</span>

            <a 
                className={styles.row}
                href="https://www.linkedin.com/in/albserranog"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Linkedin size={14} />
                <span>albserranog</span>
            </a>

            <span>|</span>

            <a 
                className={styles.row}
                href="tel:+526145394836"
            >
                <Phone size={14}/>
                <span>614 539 4836</span>
            </a>

        </div>
    )
}