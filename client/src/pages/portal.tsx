import Navbar from "@/components/Navbar";
import Link from "next/link";

const DrakePortal = () => (
  <div>
    {/* Navbar at the top */}
    <Navbar />

    {/* Portal Content */}
    <div className="p-8 max-w-4xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      {/* Information Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Client Portal</h2>
        <p className="mb-4">
          As a valued client, you get a secure, password-protected portal to store and access your important financial documents from anywhere at any time. Whether you’re at work, at home, or on vacation, you have access to your tax returns, financial work papers, or accounting database.
        </p>
        <p className="mb-4">
          This portal allows us to work together efficiently by securely exchanging working documents, scanned receipts, and very large QuickBooks files.
        </p>

        {/* Portal Links */}
        <div className="space-y-4 mt-6">
          <Link 
            href="https://fwl-cpa.SecureFilePro.Com"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 block text-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Go to Drake Portal
          </Link>
        </div>
      </div>

      {/* Video Section */}
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold mb-2 text-center">Using the Secure File Exchange System</h3>
        <p className="mb-4 text-center">
          Watch this video to see the portal in action and learn how to use the SecureSend feature for quick and secure file transfers.
        </p>
        <video
          src="/Portal.mp4"
          controls
          width="100%"
          height="auto"
          className="w-full rounded-lg shadow-md"
          onError={() => alert("Video could not be loaded. Please check the file path.")}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
);

export default DrakePortal;
