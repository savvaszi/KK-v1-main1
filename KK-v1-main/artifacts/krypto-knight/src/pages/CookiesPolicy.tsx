import { Cookie } from "lucide-react";
import PolicyLayout, { PSection, PSub, PP, PUL, PLI, PBox } from "@/components/PolicyLayout";

export default function CookiesPolicy() {
  return (
    <PolicyLayout icon={Cookie} badge="Legal" title="Cookie Policy">

      <PSection>1. Introduction</PSection>
      <PP>KRYPTO KNIGHT LTD ("we," "our," or "us"). This Cookie Policy explains how we use cookies and similar technologies to recognise you when you visit our website www.krypto-knight.com, including any mobile applications we operate. It details what these technologies are, the information they collect, how we use that information, and your choices regarding their use.</PP>

      <PSection>2. What Are Cookies?</PSection>
      <PP>Cookies are small text files stored on your device (computer, smartphone, tablet) when you visit a website. They enable the website to recognize your device, remember your preferences, and enhance your browsing experience. Cookies can store information such as:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Unique Device Identifier:</strong> A distinct identifier assigned to your device.</PLI>
        <PLI><strong className="text-white/80">IP Address:</strong> The numerical label assigned to your device's network interface.</PLI>
        <PLI><strong className="text-white/80">Device Information:</strong> Details about your device's operating system and mobile carrier.</PLI>
        <PLI><strong className="text-white/80">Location Data:</strong> Geographic information, to the extent permitted by applicable law.</PLI>
      </PUL>

      <PSection>3. Types of Cookies We Use</PSection>
      <PSub>3.1 Essential Cookies</PSub>
      <PP>These cookies are crucial for the basic functioning of our website and mobile app. They enable core features such as authentication (logging into secure areas), user preferences (remembering your language or region settings), and form processing (managing form submissions).</PP>
      <PBox>Essential cookies cannot be disabled on our systems. Blocking these may affect the functionality of our website or app.</PBox>

      <PSub>3.2 Performance Cookies</PSub>
      <PP>Performance cookies help us understand how visitors interact with our website and app by collecting and reporting information anonymously. This data assists us in tracking page visits and user behavior, identifying and resolving issues or bugs, and enhancing overall user experience based on aggregated data. These cookies may be set by us (first-party) or by third-party service providers.</PP>

      <PSub>3.3 Functionality Cookies</PSub>
      <PP>Functionality cookies enable our website and app to remember choices you make (such as your language or region) to provide a more personalized experience. They may also be used to customize content based on your preferences and optimize service delivery based on your settings. These cookies can be set by us (first-party) or by third-party services.</PP>

      <PSub>3.4 Third-Party Cookies</PSub>
      <PP>We collaborate with third-party companies and individuals (e.g., analytics providers, content partners) who may set their own cookies on our website and app. These third-party cookies can track your activity across different websites, serve targeted ads based on your interests, and supply insights into website performance and user behavior.</PP>

      <PSection>4. How We Use Cookie Information</PSection>
      <PP>We utilize the data collected from cookies to:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Enhance User Experience:</strong> Personalize content and remember your preferences.</PLI>
        <PLI><strong className="text-white/80">Analyze Usage Patterns:</strong> Understand how users interact with our website and app to improve functionality.</PLI>
        <PLI><strong className="text-white/80">Target Advertisements:</strong> Deliver relevant ads based on your interests and behavior.</PLI>
        <PLI><strong className="text-white/80">Identify User Behavior:</strong> Track and analyze user interactions to inform business decisions.</PLI>
      </PUL>
      <PP>In certain jurisdictions, we may associate cookie data with identifiable individuals, especially when combined with other personal information.</PP>

      <PSection>5. Third-Party Privacy Commitment</PSection>
      <PP>We are committed to protecting your privacy. Before partnering with any third-party service provider, we thoroughly review their privacy policies to ensure they align with our standards. We do not knowingly engage with third-party services that compromise or violate our users' privacy.</PP>

      <PSection>6. Managing Your Cookie Preferences</PSection>
      <PP>You have control over how cookies are managed on your device.</PP>
      <PSub>6.1 Accepting or Rejecting Cookies</PSub>
      <PP>Upon your first visit to our website or app, you will be prompted to accept or reject cookies. You also have the option to customize your cookie settings according to your preferences.</PP>
      <PSub>6.2 Removing Existing Cookies</PSub>
      <PP>You can delete existing cookies from your device through your browser settings:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data → See all cookies and site data → Remove all.</PLI>
        <PLI><strong className="text-white/80">Mozilla Firefox:</strong> Options → Privacy &amp; Security → Cookies and Site Data → Clear Data.</PLI>
        <PLI><strong className="text-white/80">Safari:</strong> Preferences → Privacy → Manage Website Data → Remove All.</PLI>
        <PLI><strong className="text-white/80">Microsoft Edge:</strong> Settings → Privacy, search, and services → Clear browsing data.</PLI>
      </PUL>
      <PSub>6.3 Blocking Future Cookies</PSub>
      <PP>To block future cookies, adjust your browser settings to refuse all cookies or to notify you when a website attempts to set a cookie. Be aware that blocking cookies may limit functionality, preventing access to certain features and content. If you use multiple devices, you will need to update settings on each one individually.</PP>

      <PSection>7. Browser-Specific Instructions</PSection>
      <PP>For detailed instructions on managing cookies, please refer to the help section of your browser (Google Chrome, Mozilla Firefox, Apple Safari, or Microsoft Edge).</PP>

      <PSection>8. Changes to This Cookie Policy</PSection>
      <PP>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this policy periodically to stay informed about how we use cookies and related technologies.</PP>

    </PolicyLayout>
  );
}
