import { Instagram } from 'lucide-react';

const FooterDots = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#1A6BFF' }} />
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E', marginLeft: -4 }} />
    <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF3B3B', marginLeft: -4 }} />
  </div>
);

const Footer = () => (
  <footer style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
    <div className="mx-auto max-w-[900px] px-6 pt-10 pb-6 md:px-12 md:pt-12">
      {/* Logo */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
        <FooterDots />
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
          BLUEPRINT PROJECT
        </span>
      </div>
      <p style={{ textAlign: 'center', marginTop: 4, fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>
        This isn't a gym. It's a system.
      </p>

      {/* Separator */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />

      {/* 3 Columns */}
      <div className="grid grid-cols-1 gap-6 text-center md:flex md:justify-between md:text-left">
        {/* Contact */}
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', fontWeight: 600, marginBottom: 8 }}>CONTACT</p>
          <a href="mailto:info@blueprintpr.com" style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>info@blueprintpr.com</a>
          <a href="tel:7870000000" style={{ display: 'block', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>(787) 000-0000</a>
        </div>

        {/* Location */}
        <a href="https://maps.google.com/?q=18.4488,-66.0614" target="_blank" rel="noopener noreferrer" className="block">
          <p style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', fontWeight: 600, marginBottom: 8 }}>LOCATION</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>1951 Calle Loíza</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>Santurce, PR 00911</p>
        </a>

        {/* Social */}
        <div>
          <p style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.2)', fontWeight: 600, marginBottom: 8 }}>SOCIAL</p>
          <a
            href="https://instagram.com/blueprintproject"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors"
            style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
          >
            <Instagram size={16} />
            @blueprintpr
          </a>
        </div>
      </div>

      {/* Bottom separator */}
      <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '24px 0' }} />

      {/* Copyright */}
      <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.05em' }}>
        © 2025 Blueprint Project. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
