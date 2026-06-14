import Link from 'next/link';
import { footerData } from '@/constants/websiteData';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo" id="footer">
      <div className="footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <p className="footer__logo">
              India For <span>Manipur</span>
            </p>
            <p className="footer__tagline">{footerData.tagline}</p>
          </div>

          {/* Links */}
          <nav aria-label="Footer navigation">
            <ul className="footer__links" role="list">
              {footerData.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="footer__link">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">{footerData.copyright}</p>
          <p className="footer__disclaimer">{footerData.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
