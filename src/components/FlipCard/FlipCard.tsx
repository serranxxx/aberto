"use client";

import { useState } from "react";
import styles from "./FlipCard.module.css";
import Image from "next/image";
import { Button } from "antd";
import { ArrowDownToLine, ArrowRightLeft } from "lucide-react";
import PdfViewer from "../PdfViewer/PdfViewer";

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
                    >

                        <div className={styles.image}>
                            <Image src="/cartoon.png" height={238} width={190} alt="" style={{ objectFit: 'cover', }} />
                        </div>

                        <div className={styles.label}>
                            <ArrowRightLeft size={14} />
                            <span>Tap to flip</span>
                        </div>

                        <div className={styles.col}>
                            <span><b>Alberto Serrano</b></span>
                            <span>Product Designer & Developer</span>
                        </div>

                        <div className={styles.col}>
                            <a
                                href="tel:+526145394836"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <b>Contact me:</b> 614 539 4836
                            </a>

                            <a
                                href="mailto:albserrano8@gmail.com"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <b>Email me:</b> albserrano8@gmail.com
                            </a>
                        </div>

                        <div onClick={(e) => e.stopPropagation()}>
                            <PdfViewer
                                pdfUrl="https://jblcqcxckefmydvtrxbi.supabase.co/storage/v1/object/public/personal/ResumeAS.pdf"
                                title="Mi PDF"
                            />
                        </div>

                    </div>
                    <div
                        className={styles.back}
                    >
                        <Image fill src="/presentation.jpg" alt="" style={{ objectFit: 'cover' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}