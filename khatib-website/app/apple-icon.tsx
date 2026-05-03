// 180×180 Apple touch icon. Full mark — MK serif inside isometric cube outline,
// gold rule above, ENG · LB mono micro-text below.

import { ImageResponse } from 'next/og';
import { cormorantBold, plexMonoRegular } from '@/lib/og/fonts';

export const runtime = 'nodejs';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0E17',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 18,
          gap: 4,
        }}
      >
        <div style={{ width: 110, height: 1, background: '#C8A44E', marginBottom: 4 }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke="#C8A44E" strokeWidth="2">
            <polygon points="60,8 110,38 110,98 60,128 10,98 10,38" fill="none" />
            <line x1="60" y1="8" x2="60" y2="68" />
            <line x1="60" y1="68" x2="10" y2="38" />
            <line x1="60" y1="68" x2="110" y2="38" />
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontFamily: 'Cormorant Garamond',
              fontWeight: 700,
              fontSize: 56,
              letterSpacing: -1,
              lineHeight: 1,
              transform: 'translateY(2px)',
            }}
          >
            MK
          </div>
        </div>
        <div
          style={{
            color: '#C8A44E',
            fontFamily: 'IBM Plex Mono',
            fontSize: 9,
            letterSpacing: 4,
            marginTop: 4,
          }}
        >
          ENG · LB
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Cormorant Garamond', data: cormorantBold, weight: 700, style: 'normal' },
        { name: 'IBM Plex Mono', data: plexMonoRegular, weight: 400, style: 'normal' },
      ],
    },
  );
}
