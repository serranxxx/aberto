"use client";

import { useState } from "react";
import styles from "./FlipCard.module.css";
import Image from "next/image";
import { Button } from "antd";
import { ArrowDownToLine } from "lucide-react";

type FlipCardProps = {
    width?: number | string;
    height?: number | string;
    frontColor?: string;
    backColor?: string;
    className?: string;
    onCard: boolean
};

export default function FlipCard({
    width = 280,
    height = 420,
    frontColor = "#f5f5f5",
    backColor = "#e9e9e9",
    className = "",
    onCard
}: FlipCardProps) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            style={{ top: onCard ? '90px' : '-480px' }}
            className={`${styles.wrapper} ${className}`}>
            <div
                className={`${styles.flipCard} ${flipped ? styles.flipped : ""}`}
                onClick={() => setFlipped((prev) => !prev)}
                style={{ width, height }}
            >
                <div className={styles.flipInner}>
                    <div
                        className={styles.front}
                        style={{ backgroundColor: frontColor }}
                    >

                        <div className={styles.image}>
                            <Image src="/cartoon.jpg" height={248} width={150} alt="" style={{objectFit:'contain',}}/>
                        </div>

                        <div className={styles.col}>
                            <span><b>Alberto Serrano</b></span>
                            <span>Product Designer & Developer</span>
                        </div>

                        <div className={styles.col}>
                            <a href="tel:+526145394836"><b>Contact me:</b> 614 539 4836</a>
                            <a href="mailto:albserrano8@gmail.com"><b>Email me:</b> albserrano8@gmail.com</a>
                        </div>

                        <Button
                            icon={<ArrowDownToLine size={16} />}
                            style={{
                                backgroundColor: '#1D1D1B',
                                // width:'100%'
                            }} type="primary">
                            Resume
                        </Button>


                    </div>
                    <div
                        className={styles.back}
                        style={{ backgroundColor: backColor }}
                    >
                        <Image fill src="/presentation.jpg" alt="" style={{ objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}