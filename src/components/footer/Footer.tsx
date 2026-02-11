import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-[var(--red)] bg-background">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Policy Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm">
            <Link to="/user-agreement" className="text-muted-foreground hover:text-white transition">
              User Agreement
            </Link>
            <Link to="/privacy-policy" className="text-muted-foreground hover:text-white transition">
              Privacy Policy
            </Link>
            <Link to="/support" className="text-muted-foreground hover:text-white transition">
              Technical Support
            </Link>
            <Link to="/digital-services-act" className="text-muted-foreground hover:text-white transition">
              Digital Services Act
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/24/facebook-new.png"
                alt="Facebook"
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/24/linkedin-2.png"
                alt="LinkedIn"
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/24/instagram-new.png"
                alt="Instagram"
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
            <a href="https://messenger.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/24/facebook-messenger--v2.png"
                alt="Messenger"
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img
                src="https://img.icons8.com/fluent/24/twitter.png"
                alt="Twitter"
                className="opacity-80 hover:opacity-100 transition"
              />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="mt-3 text-center text-[11px] sm:text-xs text-muted-foreground">
          © 2026 Company Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
