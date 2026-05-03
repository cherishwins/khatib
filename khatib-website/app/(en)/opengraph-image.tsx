// 1200×630 OG image for English routes. English-led: wordmark + Arabic secondary + tagline pair.

import { ImageResponse } from 'next/og';
import { cormorantBold, plexMonoRegular, plexArabicBold } from '@/lib/og/fonts';

export const runtime = 'nodejs';
export const alt = 'Dr. Milad Khatib — Civil Engineering Consultancy. Engineering by proof.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0E17',
          display: 'flex',
          flexDirection: 'column',
          padding: 80,
          color: '#F5F1E8',
          backgroundImage:
            'linear-gradient(60deg, rgba(200,164,78,0.045) 0.5px, transparent 0.5px), linear-gradient(-60deg, rgba(200,164,78,0.045) 0.5px, transparent 0.5px), linear-gradient(0deg, rgba(200,164,78,0.045) 0.5px, transparent 0.5px)',
          backgroundSize: '48px 48px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: '#C8A44E', fontFamily: 'IBM Plex Mono', fontSize: 18, letterSpacing: 6 }}>
          <div style={{ width: 36, height: 1, background: '#C8A44E' }} />
          <span>CIVIL ENGINEERING · BEIRUT · OEA SINCE 1999</span>
        </div>
        <div style={{ marginTop: 56, display: 'flex' }}>
          <div style={{ fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: 132, lineHeight: 0.95, color: '#FFFFFF', letterSpacing: -2 }}>
            Dr. Milad Khatib
          </div>
        </div>
        <div style={{ marginTop: 24, fontFamily: 'IBM Plex Mono', fontSize: 22, letterSpacing: 8, color: '#C8A44E', textTransform: 'uppercase' }}>
          Civil Engineering Consultancy
        </div>
        <div style={{ marginTop: 24, fontFamily: 'IBM Plex Sans Arabic', fontSize: 44, color: '#9A9589' }}>
          د. ميلاد الخطيب · الاستشارات الهندسية المدنية
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: 'Cormorant Garamond', fontStyle: 'italic', fontSize: 56, color: '#C8A44E', lineHeight: 1 }}>
            Engineering by proof.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, fontFamily: 'IBM Plex Mono', fontSize: 16, color: '#9A9589', letterSpacing: 3 }}>
            <div>52 PUBLICATIONS · 21 EDITORIAL ROLES</div>
            <div>2 PATENTS · LB</div>
            <div style={{ color: '#C8A44E' }}>MILADKHATIB.COM</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant Garamond', data: cormorantBold, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: plexMonoRegular, weight: 400, style: 'normal' },
        { name: 'IBM Plex Sans Arabic', data: plexArabicBold, weight: 700, style: 'normal' },
      ],
    },
  );
}
