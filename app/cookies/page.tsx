import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground">Last Updated: June 1, 2023</p>
          
          <p className="lead text-xl mb-8">
            This Cookie Policy explains how TutorMatch ("we", "us", or "our") uses cookies and similar technologies 
            to recognize you when you visit our website and use our services (collectively, the "Services").
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">What are cookies?</h2>
          <p>
            Cookies are small data files that are placed on your computer or mobile device when you visit a website. 
            Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well 
            as to provide reporting information.
          </p>
          <p>
            Cookies set by the website owner (in this case, TutorMatch) are called "first-party cookies". Cookies set 
            by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party 
            features or functionality to be provided on or through the website (e.g., advertising, interactive content, 
            and analytics). The parties that set these third-party cookies can recognize your computer both when it visits 
            the website in question and also when it visits certain other websites.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Why do we use cookies?</h2>
          <p>
            We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons 
            in order for our Services to operate, and we refer to these as "essential" or "strictly necessary" cookies. 
            Other cookies also enable us to track and target the interests of our users to enhance the experience on our 
            Services. Third parties serve cookies through our Services for advertising, analytics, and other purposes.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Types of cookies we use</h2>
          <p>
            The specific types of first and third-party cookies served through our Services and the purposes they perform 
            are described below:
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Essential Cookies</h3>
          <p>
            These cookies are strictly necessary to provide you with services available through our Services and to use 
            some of its features, such as access to secure areas. Because these cookies are strictly necessary to deliver 
            the Services, you cannot refuse them without impacting how our Services function.
          </p>
          <ul>
            <li><strong>Session Cookies:</strong> These cookies are temporary and expire once you close your browser.</li>
            <li><strong>Authentication Cookies:</strong> These cookies help us identify you when you're logged in to our Services.</li>
            <li><strong>Security Cookies:</strong> These cookies help us detect and prevent security risks.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Performance and Functionality Cookies</h3>
          <p>
            These cookies are used to enhance the performance and functionality of our Services but are non-essential to 
            their use. However, without these cookies, certain functionality may become unavailable.
          </p>
          <ul>
            <li><strong>Preference Cookies:</strong> These cookies remember your preferences and settings.</li>
            <li><strong>Language Cookies:</strong> These cookies remember your language preference.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Analytics and Customization Cookies</h3>
          <p>
            These cookies collect information that is used either in aggregate form to help us understand how our Services 
            are being used or how effective our marketing campaigns are, or to help us customize our Services for you.
          </p>
          <ul>
            <li><strong>Google Analytics:</strong> We use Google Analytics to understand how users interact with our Services.</li>
            <li><strong>Hotjar:</strong> We use Hotjar to analyze user behavior and improve our user experience.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Advertising Cookies</h3>
          <p>
            These cookies are used to make advertising messages more relevant to you. They perform functions like preventing 
            the same ad from continuously reappearing, ensuring that ads are properly displayed, and in some cases selecting 
            advertisements that are based on your interests.
          </p>
          <ul>
            <li><strong>Google Ads:</strong> We use Google Ads to deliver targeted advertisements.</li>
            <li><strong>Facebook Pixel:</strong> We use Facebook Pixel to measure the effectiveness of our advertising campaigns.</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Social Media Cookies</h3>
          <p>
            These cookies are used to enable you to share pages and content that you find interesting on our Services through 
            third-party social networking and other websites. These cookies may also be used for advertising purposes.
          </p>
          <ul>
            <li><strong>Facebook:</strong> We use Facebook cookies to enable social sharing functionality.</li>
            <li><strong>Twitter:</strong> We use Twitter cookies to enable social sharing functionality.</li>
            <li><strong>LinkedIn:</strong> We use LinkedIn cookies to enable social sharing functionality.</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How can you control cookies?</h2>
          <p>
            You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by 
            clicking on the appropriate opt-out links provided below.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Browser Controls</h3>
          <p>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or 
            to alert you when cookies are being sent. The help function within your browser should tell you how to do this. 
            Alternatively, you may wish to visit <a href="http://www.aboutcookies.org" className="text-primary hover:underline">www.aboutcookies.org</a>, 
            which contains comprehensive information on how to manage cookies on a wide variety of browsers.
          </p>
          <p>
            Please note that if you choose to disable cookies, you may not be able to access certain parts of our Services. 
            For example, you may not be able to log in to your account or use certain features.
          </p>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Third-Party Opt-Out</h3>
          <p>
            For cookies served by third parties, you can opt out by visiting their websites:
          </p>
          <ul>
            <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline">https://tools.google.com/dlpage/gaoptout</a></li>
            <li>Google Ads: <a href="https://adssettings.google.com" className="text-primary hover:underline">https://adssettings.google.com</a></li>
            <li>Facebook: <a href="https://www.facebook.com/settings/?tab=ads" className="text-primary hover:underline">https://www.facebook.com/settings/?tab=ads</a></li>
            <li>Hotjar: <a href="https://www.hotjar.com/legal/compliance/opt-out" className="text-primary hover:underline">https://www.hotjar.com/legal/compliance/opt-out</a></li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3">Do Not Track</h3>
          <p>
            Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online 
            activities tracked. Currently, there is no standard for how online services should respond to "Do Not Track" signals, 
            so we do not currently respond to such signals.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">How often will we update this Cookie Policy?</h2>
          <p>
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use 
            or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to 
            stay informed about our use of cookies and related technologies.
          </p>
          <p>
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Where can you get further information?</h2>
          <p>
            If you have any questions about our use of cookies or other technologies, please contact us at:
          </p>
          <p>
            TutorMatch, Inc.<br />
            123 Education Lane<br />
            Suite 400<br />
            Boston, MA 02110<br />
            privacy@tutormatch.com
          </p>
          
          <div className="mt-12 flex justify-center">
            <Button asChild>
              <Link href="/">Return to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
