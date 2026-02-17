import play_store from "../assets/play_store.png";
import app_store from "../assets/app_store.png";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import twitter from "../assets/icons/twitter.png";
import linkedin from "../assets/icons/linkedin.png";
import { Link } from "react-router-dom";
import { APP_STORE_URL, PLAY_STORE_URL } from "../common/constants";

const Footer = () => {
  return (
    <div className="container mx-auto">
      <footer className=" bg-brand-blue text-white py-6 md:py-10 rounded-md">
        <div className="mx-5 px-5">
          <div>
            <h2 className="text-base md:text-xl font-semibold mb-3 md:mb-4 font-merriweather">
              Find Garage and Yard Sale
            </h2>
            <p className="text-base md:text-base mb-6 leading-relaxed font-rethink">
              Find Garage and Yard Sale is your user-friendly platform designed
              to effortlessly establish local garage and yard sales connections
              right in your community.
              <br />
              The quick sign-up, intuitive navigation, and secure transactions
              were designed to help you effortlessly find amazing deals or post
              your own sale listing to reach nearby buyers. Keep your
              neighborhood decluttered as our organized sales ensure the
              transition of your unwanted items to treasures for others.
              <br />
              Make an eco-friendly impact by giving your items a second life,
              while you earn cash. Sell fast, buy easily, and connect with your
              neighbors—all in one place!
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row mb-6 space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href={PLAY_STORE_URL}
                className="inline-block w-36 sm:w-auto"
                target="_blank"
              >
                <img
                  src={play_store}
                  alt="Google Play"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a
                href={APP_STORE_URL}
                className="inline-block w-36 sm:w-auto"
                target="_blank"
              >
                <img
                  src={app_store}
                  alt="App Store"
                  className="h-10 w-auto object-contain"
                />
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex flex-wrap gap-4 mb-6 font-rethink">
              {[
                {
                  icon: facebook,
                  name: "Facebook",
                  href: "https://www.facebook.com/profile.php?id=61570867119849",
                },
                {
                  icon: instagram,
                  name: "Instagram",
                  href: " https://www.instagram.com/garageyardsale/",
                },
                {
                  icon: twitter,
                  name: "Twitter",
                  href: "https://x.com/findgarageyard",
                },
                {
                  icon: linkedin,
                  name: "Linkedin",
                  href: "https://www.linkedin.com/in/find-garage-and-yard-sale-179635343/",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="hover:opacity-75 transition-opacity"
                  aria-label={social.name}
                  target="_blank"
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-6 h-6 object-contain"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-500 mt-6 md:mt-8 pt-6 text-xs md:text-sm">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-base text-center md:text-left font-rethink">
                Copyright © {new Date()?.getFullYear()} Garage&Yard. All rights
                reserved
              </p>
              <div className=" text-base flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 md:space-x-8 font-rethink">
                <Link to="/privacy-policy" className="hover:underline ">
                  Privacy Policy
                </Link>
                <Link to="/terms-and-conditions" className="hover:underline">
                  Terms and Conditions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
