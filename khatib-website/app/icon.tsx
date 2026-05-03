// 32×32 favicon. Per SKILL.md: at small sizes the cube outline drops away;
// the mark collapses to "MK" between gold rules.

import { ImageResponse } from 'next/og';
import { cormorantBold } from '@/lib/og/fonts';

export const runtime = 'nodejs';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0A0E17',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '3px 0',
        }}
      >
        <div style={{ height: 1.5, background: '#C8A44E' }} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            fontFamily: 'Cormorant Garamond',
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: -0.5,
            lineHeight: 1,
          }}
        >
          MK
        </div>
        <div style={{ height: 1.5, background: '#C8A44E' }} />
      </div>
    ),
    {
      ...size,
      fonts: [{ name: 'Cormorant Garamond', data: cormorantBold, weight: 700, style: 'normal' }],
    },
  );
}
