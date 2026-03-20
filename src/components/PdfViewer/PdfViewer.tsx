'use client';

import { Button } from 'antd';
import { File } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';

type PdfViewerProps = {
    pdfUrl: string;
    title?: string;
    className?: string;
};

export default function PdfViewer({
    pdfUrl,
    title = 'Documento PDF',
    className = '',
}: PdfViewerProps) {
    const safeUrl = useMemo(() => {
        if (!pdfUrl) return '';
        return pdfUrl;
    }, [pdfUrl]);

    if (!safeUrl) {
        return (
            <div className="flex h-[600px] items-center justify-center rounded-xl border border-dashed">
                <p>No hay PDF para mostrar.</p>
            </div>
        );
    }

    return (
        <div style={{
            alignSelf: 'stretch', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
            <div style={{
                width:'100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-start',
                maxWidth: '850px'
            }}>
                <Link href={safeUrl}>
                    <Button
                    icon={<File size={14} />}
                    type='primary' style={{
                        background: '#1D1D1C'
                    }}>Resume</Button>
                </Link>
            </div>
        </div>
    );
}