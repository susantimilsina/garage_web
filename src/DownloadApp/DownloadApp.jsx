import play_store from "../assets/play_store.png";
import app_store from "../assets/app_store.png";
import qr_code from "../assets/qr_code.jpg";
import { APP_STORE_URL, PLAY_STORE_URL } from "../common/constants";

const DownloadApp = () => {
  return (
    <section
      id="get_the_app"
      className="bg-brand-blue py-16 md:py-20"
      aria-labelledby="download-heading"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
          {/* Video – larger column */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/20 order-1">
            <iframe
              title="Find Garage and Yard Sale app demo video"
              src="https://player.vimeo.com/video/1042070258?dnt=1&title=0&byline=0&portrait=0&sidedock=0&color=ffffff"
              className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
              allow="autoplay"
            />
          </div>

          {/* Combined: Text, Buttons & QR Code */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left order-2">
            <h2
              id="download-heading"
              className="text-2xl md:text-3xl font-bold text-white font-merriweather mb-4"
            >
              Download this App Today!
            </h2>
            <p className="text-lg text-white/90 font-rethink mb-6 max-w-md mx-auto lg:mx-0">
              Buy and sell your items easily, safely, and quickly. Find garage
              sales near you or post your own.
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mb-8">
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <img
                  src={play_store}
                  alt="Get Find Garage and Yard Sale on Google Play"
                  className="h-12 w-auto object-contain"
                />
              </a>
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-90 transition-opacity"
              >
                <img
                  src={app_store}
                  alt="Download Find Garage and Yard Sale on the App Store"
                  className="h-12 w-auto object-contain"
                />
              </a>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <p className="text-white font-rethink font-medium mb-3">
                Scan to download
              </p>
              <div className="bg-white p-3 rounded-xl">
                <img
                  src={qr_code}
                  alt="QR code to download Find Garage and Yard Sale app"
                  className="w-36 h-36 object-contain"
                />
              </div>
              <p className="text-white/90 text-sm font-rethink mt-3 text-center lg:text-left">
                Find or post your garage and yard sale
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
