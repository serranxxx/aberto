import styles from './header.module.css'

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

                <div className={styles.row}>
                    <span>Contact</span>
                    <span>Resume</span>
                </div>

            </div>
        </div>
    )
}