import { Button } from 'antd'
import styles from './header.module.css'
import { ArrowUpRight} from 'lucide-react'

interface HeaderProps {
    showHeader: boolean
}

export const Header = ({ showHeader }: HeaderProps) => {
    return (
        <div
            className={`${styles.header_main_cont} ${showHeader ? styles.show : styles.hide
                }`}
        >
            <div className={styles.header_cont}>
                <img src="/ai.svg" alt="" className={styles.header_image} />

                <Button 
                icon={<ArrowUpRight size={16} />}
                type='primary'
                style={{
                    backgroundColor:'#1D1D1B'
                }}>Contact</Button>

                {/* <div className={styles.row}>
                    <span>Contact</span>
                    <span>Resume</span>
                </div> */}

            </div>
        </div>
    )
}