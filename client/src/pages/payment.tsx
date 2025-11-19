import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect } from "react";

const PaymentPage = () => {
  useEffect(() => {
    const resizePayPal = () => {
      const paypalIframe = document.querySelector("#paypal-container-XAE73J99S657A iframe") as HTMLIFrameElement;
      if (paypalIframe) {
        paypalIframe.style.width = "100%";
        paypalIframe.style.maxWidth = "100%";
        paypalIframe.style.height = "auto";
      }
    };

    if (!document.getElementById("paypal-sdk")) {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAq7-TFe3eCyt6BsT9U2D_o1HjD7tNBGVoV4n1EutNAQiPKTW5qZQpyEv7f4QM_uC74BupDZcAiwwaoE8&components=hosted-buttons&enable-funding=venmo&currency=USD";
      script.crossOrigin = "anonymous";
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        if (window.paypal && window.paypal.HostedButtons) {
          window.paypal
            .HostedButtons({
              hostedButtonId: "XAE73J99S657A",
            })
            .render("#paypal-container-XAE73J99S657A")
            .then(resizePayPal); // Resize after rendering
        }
      };
    } else {
      if (window.paypal && window.paypal.HostedButtons) {
        window.paypal
          .HostedButtons({
            hostedButtonId: "XAE73J99S657A",
          })
          .render("#paypal-container-XAE73J99S657A")
          .then(resizePayPal); // Resize after rendering
      }
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row md:justify-center items-center mt-16 p-6 md:p-12 bg-blue-500 min-h-screen">
        {/* Company Info Section */}
        <div className="md:w-1/3 border border-gray-300 rounded-lg shadow-md bg-white p-8 md:mr-10 mb-8 md:mb-0">
          <div className="flex items-center mb-6">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={80}
              height={80}
              className="mr-4 rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">Finance World</h2>
          <p>2809 Emerywood Pkwy, Ste 330 </p>              
          <p className="text-gray-500">Henrico, VA 23294</p>
              <a
                href="mailto:haile@fwl-cpa.com"
                className="block text-blue-600 hover:text-blue-800 mt-2 underline"
              >
                haile@fwl-cpa.com
              </a>
              <p>
                <a href="tel:+17028159685" className="text-blue-600 hover:text-blue-800">
                  (702) 815-9685
                </a>
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            For questions about your payment or invoice, feel free to reach out. Our team is here to assist you.
          </p>
        </div>

        {/* Payment Form Section */}
        <div className="md:w-2/3 border border-gray-300 rounded-lg shadow-md bg-white p-8">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6">Invoice Payment</h3>
          <form className="space-y-6">
            <div>
              <label className="block font-medium text-gray-700">Reference</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mt-1"
                placeholder="Invoice Number or Reference"
              />
            </div>

            <div className="mt-8">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Payment Method</h4>
              <p className="text-gray-500 mb-4 text-sm">
                We currently accept online payments via PayPal only.
              </p>
              <div className="paypal-wrapper overflow-hidden w-full max-w-full">
                <div id="paypal-container-XAE73J99S657A" className="mt-4 w-full max-w-full"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
