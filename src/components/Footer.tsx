import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", href: "/#home" },
  { label: "Menu", href: "/#menu" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const Footer = () => {
  return (
    <footer className="bg-navy py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Logo */}
          <div>
            <Link to="/" className="font-heading text-2xl font-bold text-navy-foreground">
              Bite Affair
            </Link>
            <p className="font-body text-sm text-navy-foreground/60 mt-2">
              Premium catering across Gurugram & Delhi NCR.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-body font-medium text-navy-foreground/80 text-sm mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-navy-foreground/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-medium text-navy-foreground/80 text-sm mb-3 uppercase tracking-wider">
              Contact
            </h4>
            <p className="font-body text-sm text-navy-foreground/60">
              +91 92115 70030
            </p>
            <p className="font-body text-sm text-navy-foreground/60 mt-2">
              Sector 52, Gurugram, Haryana
            </p>
            <p className="font-body text-xs text-navy-foreground/40 mt-1">
              Serving Gurugram, Delhi, Noida, Faridabad & Ghaziabad
            </p>
          </div>
        </div>

        <div className="border-t border-navy-foreground/10 mt-10 pt-6 text-center">
          <p className="font-body text-xs text-navy-foreground/40">
            © {new Date().getFullYear()} Bite Affair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
