import { Lock } from "lucide-react";
import PolicyLayout, { PSection, PSub, PP, PUL, PLI, PBox, PContact } from "@/components/PolicyLayout";

export default function PrivacyPolicy() {
  return (
    <PolicyLayout icon={Lock} badge="Legal" title="Privacy Policy" effectiveDate="30/12/2024">

      <PP>KRYPTO KNIGHT LTD ("KRYPTO KNIGHT," "we," "us," or "our") is dedicated to protecting your privacy. This Privacy Policy ("Policy") outlines how we collect, use, share, and safeguard your personal information ("Personal Data") when you interact with our website, krypto-knight.com (the "Website"), or use our products and services. It also explains your rights regarding your Personal Data under applicable data protection laws.</PP>
      <PP>This Policy complies with the General Data Protection Regulation (EU) 2016/679 ("GDPR") and any relevant data protection regulations.</PP>

      <PSection>1. Who We Are</PSection>
      <PP>KRYPTO KNIGHT LTD, a company incorporated in the Republic of Cyprus (Registration No. HE 434989), is the Data Controller responsible for deciding how and why your Personal Data is processed.</PP>
      <PContact label="Address" value="Palias Ilektrikis 5, Nicosia, 1016, Cyprus" />
      <PContact label="Email" value="info@krypto-knight.com" href="mailto:info@krypto-knight.com" />

      <PSection>2. Personal Data We Collect</PSection>
      <PP>We may collect the following types of Personal Data:</PP>
      <PUL>
        <PLI>Contact Information: Email, telephone number</PLI>
        <PLI>Identity Verification Details: Information from identity documents</PLI>
        <PLI>Residential Address</PLI>
        <PLI>Financial Information</PLI>
        <PLI>Employment Information</PLI>
        <PLI>Geolocation Data</PLI>
        <PLI>Website Usage Data: Logs of activity, IP address, browser and operating system details, device fingerprint</PLI>
      </PUL>
      <PSub>How We Collect Data</PSub>
      <PUL>
        <PLI><strong className="text-white/80">Directly from You:</strong> When you provide it during registration, onboarding, or communication.</PLI>
        <PLI><strong className="text-white/80">Publicly Available Sources:</strong> E.g., sanctions lists or other accessible data.</PLI>
        <PLI><strong className="text-white/80">Third Parties:</strong> Contractors, data vendors, and providers of identity verification, fraud detection, and transaction monitoring services.</PLI>
      </PUL>
      <PBox>Providing Personal Data may be mandatory for compliance with Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations. Refusal to provide such data may prevent us from offering certain services.</PBox>

      <PSection>3. Why We Process Your Personal Data</PSection>
      <PP>We process your Personal Data for the following purposes:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Service Provision:</strong> To provide and manage our services for you or the corporate entity you represent.</PLI>
        <PLI><strong className="text-white/80">Communication:</strong> To contact you or respond to your inquiries.</PLI>
        <PLI><strong className="text-white/80">Legal Compliance:</strong> To fulfill KYC/AML obligations or cooperate with investigations.</PLI>
        <PLI><strong className="text-white/80">Security:</strong> To protect your assets from fraud or unauthorized access.</PLI>
        <PLI><strong className="text-white/80">Fraud Prevention:</strong> To detect, prevent, and mitigate fraudulent or illicit activity.</PLI>
        <PLI><strong className="text-white/80">Marketing:</strong> To provide information about our services, updates, or offers (with your consent).</PLI>
        <PLI><strong className="text-white/80">Dispute Resolution:</strong> To address disputes or enforce agreements.</PLI>
      </PUL>
      <PSub>Lawful Basis for Processing</PSub>
      <PUL>
        <PLI><strong className="text-white/80">Consent:</strong> You can withdraw consent at any time by contacting us at info@krypto-knight.com.</PLI>
        <PLI><strong className="text-white/80">Contractual Obligations:</strong> To provide the services you have requested.</PLI>
        <PLI><strong className="text-white/80">Legal Obligations:</strong> Compliance with laws and regulations (e.g., AML/CTF requirements).</PLI>
        <PLI><strong className="text-white/80">Legitimate Interests:</strong> To ensure service security, fraud prevention, and business operations.</PLI>
      </PUL>

      <PSection>4. Sharing Your Personal Data</PSection>
      <PP>We may share your Personal Data with:</PP>
      <PUL>
        <PLI>Affiliates, agents, and representatives</PLI>
        <PLI>Contractors for identity verification and fraud detection</PLI>
        <PLI>Financial service providers for fiat currency transactions</PLI>
        <PLI>Law enforcement or regulatory agencies, as required by law</PLI>
      </PUL>

      <PSection>5. International Data Transfers</PSection>
      <PP>Your Personal Data may be transferred outside the European Economic Area (EEA) under the following conditions:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Adequacy Decision:</strong> Transfer to countries with adequate data protection as determined by the European Commission.</PLI>
        <PLI><strong className="text-white/80">Safeguards:</strong> Standard contractual clauses or similar mechanisms ensure data protection.</PLI>
        <PLI><strong className="text-white/80">Derogations:</strong> When necessary for legal claims, public interest, or other exceptions permitted under the GDPR.</PLI>
      </PUL>

      <PSection>6. Data Retention</PSection>
      <PP>We retain Personal Data only as long as necessary to fulfill the purposes outlined in this Policy or comply with legal obligations:</PP>
      <PUL>
        <PLI>General retention period: Up to five (5) years after termination of your relationship with us.</PLI>
        <PLI>Legal records (e.g., KYC/AML data): Retention periods as required by applicable laws.</PLI>
      </PUL>
      <PP>You may request data deletion. However, in some cases, we may be legally required to retain certain data.</PP>

      <PSection>7. Your Rights</PSection>
      <PP>You have the following rights under data protection law:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Access:</strong> Request copies of your Personal Data.</PLI>
        <PLI><strong className="text-white/80">Rectification:</strong> Correct inaccurate or incomplete data.</PLI>
        <PLI><strong className="text-white/80">Erasure:</strong> Request the deletion of your data.</PLI>
        <PLI><strong className="text-white/80">Restriction:</strong> Limit the processing of your data.</PLI>
        <PLI><strong className="text-white/80">Objection:</strong> Object to specific processing activities.</PLI>
        <PLI><strong className="text-white/80">Data Portability:</strong> Request the transfer of your data to another organization or yourself.</PLI>
      </PUL>
      <PP>To exercise your rights, contact us at info@krypto-knight.com. We will respond within one month.</PP>

      <PSection>8. Security Measures</PSection>
      <PP>We employ advanced security measures to safeguard your Personal Data, including SSL/TLS encryption for secure communication and data transmission.</PP>

      <PSection>9. Data Protection Officer (DPO)</PSection>
      <PP>Our Data Protection Officer oversees compliance with this Policy and data protection laws.</PP>
      <PContact label="Email" value="info@krypto-knight.com" href="mailto:info@krypto-knight.com" />

      <PSection>10. Supervisory Authority</PSection>
      <PP>If you believe your data protection rights have been violated, you can lodge a complaint with the Office of the Commissioner for Personal Data Protection of Cyprus.</PP>

      <PSection>11. Changes to This Policy</PSection>
      <PP>We may update this Policy periodically. Any changes will be communicated through the Website or email notifications.</PP>

      <PSection>Annex 1: Purposes, Legal Basis, and Retention Periods</PSection>

      <PSub>Conclusion and Performance of Contracts</PSub>
      <PP>Legal Basis: Article 6(1)(b) and (f) GDPR — Contractual necessity and legitimate interests. Retention: For the duration of the contract and up to six (6) years after its termination to manage claims and liabilities.</PP>

      <PSub>Dealing with Complaints</PSub>
      <PP>Legal Basis: Article 6(1)(b) and (c) GDPR — Contractual necessity and legal obligation. Retention: Up to three (3) years after the settlement of a complaint.</PP>

      <PSub>Debt Recovery or Defense Against Legal Claims</PSub>
      <PP>Legal Basis: Article 6(1)(b) and (f) GDPR — Contractual necessity and legitimate interests. Retention: Until legal claims are resolved or enforced, and until satisfaction of claims in case of enforcement proceedings.</PP>

      <PSub>Document Archiving</PSub>
      <PP>Legal Basis: Article 6(1)(c) GDPR — Compliance with legal obligations. Retention: For legally mandated periods or until storage is no longer necessary for legitimate interests.</PP>

      <PSub>Marketing Activities (Non-Electronic)</PSub>
      <PP>Legal Basis: Article 6(1)(f) GDPR — Legitimate interests. Retention: Until you object to receiving communications.</PP>

      <PSub>Marketing Activities (Electronic Communication)</PSub>
      <PP>Legal Basis: Article 6(1)(a) and (f) GDPR — Consent and legitimate interests. Retention: Until withdrawal of consent or up to six (6) years after withdrawal to demonstrate compliance with legal requirements.</PP>

      <PSub>Recruitment Processes</PSub>
      <PP>Legal Basis: Article 6(1)(a), (b), (c), and (f) GDPR — Consent, contractual necessity, legal obligations, and legitimate interests. Retention: Up to six (6) months after recruitment completion or one (1) year with consent for future opportunities.</PP>

      <PSub>Prevention of Money Laundering and Terrorism Financing</PSub>
      <PP>Legal Basis: Article 6(1)(c) GDPR — Compliance with legal obligations. Retention: As per applicable AML/CTF regulations.</PP>

    </PolicyLayout>
  );
}
