import play_store from "../assets/play_store.png";
import app_store from "../assets/app_store.png";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import twitter from "../assets/icons/twitter.png";
import linkedin from "../assets/icons/linkedin.png";
import { Link } from "react-router-dom";
import { APP_STORE_URL, PLAY_STORE_URL } from "../common/constants";

const socialLinks = [
  { icon: facebook, name: "Facebook", href: "https://www.facebook.com/profile.php?id=61570867119849" },
  { icon: instagram, name: "Instagram", href: "https://www.instagram.com/garageyardsale/" },
  { icon: twitter, name: "Twitter", href: "https://x.com/findgarageyard" },
  { icon: linkedin, name: "LinkedIn", href: "https://www.linkedin.com/in/find-garage-and-yard-sale-179635343/" },
];

const Footer = () => {
  return (
    <footer id="about_us" className="bg-brand-blue text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold font-merriweather mb-4">
              Find Garage and Yard Sale
            </h2>
            <p className="text-white/90 font-rethink text-sm leading-relaxed mb-4">
              Find Garage and Yard Sale is your user-friendly platform designed
              to effortlessly establish local garage and yard sales connections
              right in your community.
            </p>
            <p className="text-white/90 font-rethink text-sm leading-relaxed">
              Sell fast, buy easily, and connect with your neighbors—all in one
              place. Give your items a second life and make an eco-friendly
              impact.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold font-rethink mb-4">Quick Links</h3>
            <ul className="space-y-3 font-rethink text-sm">
              <li>
                <Link to="/sales" className="hover:underline text-white/90">
                  Find Sales
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline text-white/90">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:underline text-white/90">
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold font-rethink mb-4">Get the App</h3>
            <div className="flex flex-col gap-3">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={play_store}
                  alt="Get Find Garage and Yard Sale on Google Play"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img
                  src={app_store}
                  alt="Download Find Garage and Yard Sale on the App Store"
                  className="h-10 w-auto object-contain"
                />
              </a>
            </div>
            <div className="mt-4">
              <h3 className="text-base font-bold font-rethink mb-3">Follow Us</h3>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.name}
                    href={s.href.trim()}
                    className="hover:opacity-80 transition-opacity"
                    aria-label={s.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={s.icon} alt="" className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-rethink text-white/80">
            Copyright © {new Date().getFullYear()} Garage&Yard. All rights
            reserved.
          </p>
          <div className="flex gap-6 font-rethink text-sm">
            <Link to="/sales" className="hover:underline text-white/90">
              Find Sales
            </Link>
            <Link to="/privacy-policy" className="hover:underline text-white/90">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="hover:underline text-white/90">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
