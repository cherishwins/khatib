import { describe, expect, it } from 'vitest';
import { altPath, localizedPath } from '@/lib/i18n';

describe('lib/i18n.altPath', () => {
  it('switches root from EN to AR', () => {
    expect(altPath('/', 'en')).toBe('/ar');
  });
  it('switches root from AR to EN', () => {
    expect(altPath('/ar', 'ar')).toBe('/');
  });
  it('preserves nested path EN → AR', () => {
    expect(altPath('/about', 'en')).toBe('/ar/about');
    expect(altPath('/services/forensic', 'en')).toBe('/ar/services/forensic');
  });
  it('preserves nested path AR → EN', () => {
    expect(altPath('/ar/about', 'ar')).toBe('/about');
    expect(altPath('/ar/services/forensic', 'ar')).toBe('/services/forensic');
  });
  it('handles dynamic segments', () => {
    expect(altPath('/patents/economic-vessel-2023', 'en')).toBe('/ar/patents/economic-vessel-2023');
    expect(altPath('/ar/patents/economic-vessel-2023', 'ar')).toBe('/patents/economic-vessel-2023');
  });
});

describe('lib/i18n.localizedPath', () => {
  it('en locale: returns EN path regardless of input prefix', () => {
    expect(localizedPath('/about', 'en')).toBe('/about');
    expect(localizedPath('/ar/about', 'en')).toBe('/about');
    expect(localizedPath('/', 'en')).toBe('/');
    expect(localizedPath('/ar', 'en')).toBe('/');
  });
  it('ar locale: returns AR path regardless of input prefix', () => {
    expect(localizedPath('/about', 'ar')).toBe('/ar/about');
    expect(localizedPath('/ar/about', 'ar')).toBe('/ar/about');
    expect(localizedPath('/', 'ar')).toBe('/ar');
    expect(localizedPath('/ar', 'ar')).toBe('/ar');
  });
});
