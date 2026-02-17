import play_store from "../assets/play_store.png";
import app_store from "../assets/app_store.png";
import qr_code from "../assets/qr_code.jpg";
import { APP_STORE_URL, PLAY_STORE_URL } from "../common/constants";

const containerStyle = {
  maxWidth: "48rem",
  margin: "1rem auto",
  width: "100%",
};

const wrapperStyle = {
  position: "relative",
  paddingBottom: "56.25%", // 16:9 Aspect Ratio
  height: 0,
  overflow: "hidden",
};

const iframeStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  borderRadius: "0.375rem",
  border: "none",
};

const DownloadApp = () => {
  return (
    <div className="container mx-auto">
      <div className=" bg-brand-light-orange p-6 md:p-10 rounded-lg px-4">
        <div className=" container flex flex-col md:flex-col md:items-center md:justify-center gap-8 md:gap-4">
          {/* Left section with text and store buttons */}
          <div className="text-center md:text-left">
            <div className="text-4xl md:text-4xl sm:text-xl font-bold text-brand-brown mb-2">
              Download this App Today!
            </div>
            <p className="text-xl text-brand-brown mb-4 font-rethink">
              Buy and sell your items Easily, Safely, and Quickly.
            </p>
            {/* Store buttons container */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-center gap-4 sm:gap-4">
              <a
                href={PLAY_STORE_URL}
                className="transform hover:scale-105 transition-transform"
                target="_blank"
              >
                <img
                  src={play_store}
                  alt="Get it on Google Play"
                  className="h-10 w-auto object-contain"
                />
              </a>
              <a
                href={APP_STORE_URL}
                className="transform hover:scale-105 transition-transform"
                target="_blank"
              >
                <img
                  src={app_store}
                  alt="Download on the App Store"
                  className="h-10 w-auto object-contain"
                />
              </a>
            </div>
          </div>
          <div style={containerStyle}>
            <div style={wrapperStyle}>
              <iframe
                title="garage and yard sales"
                src="https://player.vimeo.com/video/1042070258?dnt=1&title=0&byline=0&portrait=0&sidedock=0&color=ffffff"
                style={iframeStyle}
                allow="autoplay"
              />
            </div>
          </div>
          {/* Right section with QR code */}
          <div className="flex flex-col items-center justify-center">
            <p className="text-xl text-center text-brand-brown mb-2 font-rethink">
              Scan Here to{" "}
            </p>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-45 md:h-45">
              <img
                src={qr_code}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-xl text-brand-brown mt-1 font-rethink">
                Find or post your garage and yard sale.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadApp;
