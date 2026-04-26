import { FileText } from "lucide-react";
import PolicyLayout, { PSection, PSub, PP, PUL, PLI, PBox } from "@/components/PolicyLayout";

export default function TermsAndConditions() {
  return (
    <PolicyLayout icon={FileText} badge="Legal" title="Terms and Conditions" effectiveDate="30/12/2024">

      <PBox>PLEASE READ THESE TERMS OF USE CAREFULLY BEFORE USING ANY SERVICES PROVIDED BY KRYPTO KNIGHT LTD. BY ACCESSING OR USING OUR WEBSITE OR MOBILE APPLICATION, YOU AGREE TO BE BOUND BY THESE TERMS.</PBox>

      <PSection>1. Definitions</PSection>
      <PUL>
        <PLI><strong className="text-white/80">Account:</strong> A personal account created by you on the Website to access and utilize Services.</PLI>
        <PLI><strong className="text-white/80">AML Policy:</strong> Anti-Money Laundering policy developed by the Company in accordance with Applicable Law.</PLI>
        <PLI><strong className="text-white/80">Applicable Law:</strong> Laws of Cyprus governing the relationship between you and the Company.</PLI>
        <PLI><strong className="text-white/80">Company:</strong> KRYPTO KNIGHT LTD, a Cyprus-incorporated entity (Company Registration Number HE 434989), located at Palias Ilektrikis 5, Nicosia, 1016 Cyprus.</PLI>
        <PLI><strong className="text-white/80">Platform:</strong> The online services provided by the Company, including the Website and Mobile Application.</PLI>
        <PLI><strong className="text-white/80">Deposit:</strong> Transferring units of Virtual Currency from external wallets to your Account.</PLI>
        <PLI><strong className="text-white/80">Exchange:</strong> Converting Virtual Currency to fiat currency or another Virtual Currency through your Account.</PLI>
        <PLI><strong className="text-white/80">Exchange Rate:</strong> The value correlation between assets in trading pairs, influenced by demand, supply, value, utility, and other economic factors.</PLI>
        <PLI><strong className="text-white/80">Fee:</strong> Charges or commissions levied by the Company for using Services.</PLI>
        <PLI><strong className="text-white/80">Services:</strong> All services provided by the Company on the Platform.</PLI>
        <PLI><strong className="text-white/80">User:</strong> Any individual or legal entity that has created an Account and uses the Services.</PLI>
        <PLI><strong className="text-white/80">Virtual Currency:</strong> Decentralized digital assets that are not legal tender, securities, e-money, or classified as money under Applicable Laws.</PLI>
        <PLI><strong className="text-white/80">Website:</strong> The Company's online platform accessible at www.krypto-knight.com.</PLI>
        <PLI><strong className="text-white/80">Withdrawal:</strong> Transferring units of Virtual Currency from your Account to external wallets.</PLI>
      </PUL>

      <PSection>2. Acceptance of Terms</PSection>
      <PUL>
        <PLI><strong className="text-white/80">2.1 Binding Agreement:</strong> These Terms form a legally binding agreement between you and the Company.</PLI>
        <PLI><strong className="text-white/80">2.2 Scope:</strong> These Terms apply to all Services, information, texts, and products offered on the Website.</PLI>
        <PLI><strong className="text-white/80">2.3 Consent:</strong> By accessing the Website, creating an Account, or selecting "I agree to the Terms of Use and Privacy Policy", you agree to abide by these Terms.</PLI>
        <PLI><strong className="text-white/80">2.5 Modifications:</strong> The Company reserves the right to modify these Terms at any time. Changes take effect immediately upon posting on the Website.</PLI>
        <PLI><strong className="text-white/80">2.7 Entire Agreement:</strong> These Terms, along with the Privacy Policy and AML Policy, constitute the entire agreement between you and the Company.</PLI>
      </PUL>

      <PSection>3. Services</PSection>
      <PSub>3.1 Provided Services</PSub>
      <PP>The Company offers the following Services:</PP>
      <PUL>
        <PLI>Exchange of Virtual Currency for other Virtual Currencies or fiat money.</PLI>
        <PLI>Virtual Currency wallet services.</PLI>
        <PLI>Depositing and withdrawing Virtual Currency units on the Platform.</PLI>
      </PUL>
      <PSub>3.2 Exchange Services</PSub>
      <PP>Exchanges are based on prevailing spot market rates, which may differ from rates available on other platforms.</PP>
      <PSub>3.3 Wallet Services</PSub>
      <PP>The Company provides a secure digital wallet for storing, exchanging, and withdrawing Virtual Currencies. Private keys are securely stored by the Company.</PP>
      <PSub>3.6 Service Availability</PSub>
      <PP>The Company may suspend access to the Website, Account, or specific Services at its discretion, restoring funds where possible.</PP>
      <PSub>3.9 Service Delays</PSub>
      <PP>Provision of Services may be delayed due to technical issues, AML/KYC checks, or other circumstances.</PP>

      <PSection>4. User Eligibility</PSection>
      <PUL>
        <PLI><strong className="text-white/80">4.1:</strong> Access to Services requires creating an Account through the registration process on the Website.</PLI>
        <PLI><strong className="text-white/80">4.2:</strong> Services are available to individuals and legal entities with the legal capacity to enter into contracts who reside or are incorporated in supported jurisdictions, currently the Republic of Cyprus.</PLI>
        <PLI><strong className="text-white/80">4.3:</strong> Only one Account per user is permitted unless expressly authorized by the Company.</PLI>
        <PLI><strong className="text-white/80">4.4:</strong> Users previously suspended by the Company are prohibited from creating new Accounts.</PLI>
      </PUL>

      <PSection>5. Personal Account</PSection>
      <PUL>
        <PLI><strong className="text-white/80">5.1:</strong> Users must provide accurate, valid, up-to-date, and complete information during Account creation.</PLI>
        <PLI><strong className="text-white/80">5.2:</strong> Accounts must not be used for illegal activities, including money laundering, terrorism financing, trafficking, or tax evasion.</PLI>
        <PLI><strong className="text-white/80">5.3:</strong> Accounts must not be created on behalf of others unless legally authorized.</PLI>
        <PLI><strong className="text-white/80">5.4:</strong> Users are responsible for maintaining Account security and must not share login credentials.</PLI>
        <PLI><strong className="text-white/80">5.5:</strong> Users must notify the Company immediately of any security breaches or unauthorized Account usage via info@krypto-knight.com.</PLI>
        <PLI><strong className="text-white/80">5.6:</strong> The Company may suspend Accounts without notice if Terms are violated.</PLI>
      </PUL>

      <PSection>6. Registration Requirements</PSection>
      <PUL>
        <PLI><strong className="text-white/80">6.1:</strong> Accessing Services requires providing necessary information and documents for verification as outlined in the AML Policy.</PLI>
        <PLI><strong className="text-white/80">6.2:</strong> The Company may request additional or updated documents at any time. Failure to comply may result in suspension or termination of Services.</PLI>
        <PLI><strong className="text-white/80">6.3:</strong> Users are responsible for the accuracy and timeliness of submitted information and must notify the Company of any changes.</PLI>
      </PUL>

      <PSection>7. User Conduct</PSection>
      <PP>Users agree to:</PP>
      <PUL>
        <PLI>Adhere to these Terms and Applicable Laws.</PLI>
        <PLI>Provide truthful and accurate information.</PLI>
        <PLI>Respect the Company's intellectual property rights.</PLI>
        <PLI>Avoid actions that could damage, disable, or overload the Website.</PLI>
        <PLI>Refrain from unauthorized access attempts.</PLI>
        <PLI>Protect Account credentials and not impersonate others.</PLI>
        <PLI>Use Virtual Currency in compliance with jurisdictional laws.</PLI>
      </PUL>

      <PSection>8. Account Closure &amp; Suspension</PSection>
      <PSub>8.1 Voluntary Closure</PSub>
      <PP>Users may close their Accounts at any time, provided all assets are withdrawn beforehand. Prior to closure, all assets must be transferred to external wallets.</PP>
      <PSub>8.3 Suspension Grounds</PSub>
      <PP>The Company may suspend Accounts if compromise or unauthorized use is suspected, Terms are violated, false information is provided, regulatory risks are posed, fraud or legal violations are suspected, or other violations of Terms or Applicable Laws occur.</PP>
      <PSub>8.6 No Liability for Suspension</PSub>
      <PP>The Company is not liable for any losses resulting from Account closure or suspension.</PP>

      <PSection>9. Deposits and Withdrawals</PSection>
      <PUL>
        <PLI><strong className="text-white/80">9.1:</strong> Users must deposit Virtual Currency as per instructions on their Account page.</PLI>
        <PLI><strong className="text-white/80">9.2:</strong> Withdrawals can be made at any time, subject to transaction limits and restrictions.</PLI>
        <PLI><strong className="text-white/80">9.4:</strong> Withdrawals may incur mining fees determined by blockchain networks.</PLI>
        <PLI><strong className="text-white/80">9.5:</strong> The Company is not liable for transfers to incorrect wallets. Users are responsible for ensuring withdrawal information accuracy.</PLI>
        <PLI><strong className="text-white/80">9.6:</strong> Blockchain transactions are irreversible once processed. The Company cannot reverse transactions post-submission.</PLI>
      </PUL>

      <PSection>10. Fees</PSection>
      <PUL>
        <PLI><strong className="text-white/80">10.1:</strong> Services are fee-based, with Fees displayed prior to transaction execution. The Company does not issue invoices.</PLI>
        <PLI><strong className="text-white/80">10.2:</strong> The Company may alter the Fee structure at any time, notifying users via Website or email.</PLI>
        <PLI><strong className="text-white/80">10.3:</strong> Fees are payable in the corresponding Virtual or fiat Currency at the time of each transaction.</PLI>
      </PUL>

      <PSection>11. Settlements, Cancellations, and Refunds</PSection>
      <PUL>
        <PLI><strong className="text-white/80">11.1:</strong> Deposits, withdrawals, and exchanges result in corresponding asset debits and credits to user Accounts.</PLI>
        <PLI><strong className="text-white/80">11.2:</strong> Completed exchanges cannot be canceled or reversed. No refunds are provided for exchanges.</PLI>
        <PLI><strong className="text-white/80">11.3:</strong> The Company may cancel exchange orders in case of technical faults on the Platform.</PLI>
      </PUL>

      <PSection>12. Content</PSection>
      <PP>The Company may create and display Content on the Website, including text, images, videos, and audio files. Content does not constitute investment, financial, trading, or legal advice unless explicitly stated. The Company is not liable for actions taken based on Content.</PP>

      <PSection>13. Intellectual Property</PSection>
      <PP>All components and Content of the Website are owned by the Company and protected by copyright, trademarks, and other intellectual property laws. Users must not reproduce, modify, distribute, display, or exploit any Content or technology from the Website without prior written consent from the Company.</PP>

      <PSection>14. Links to Third-Party Websites</PSection>
      <PP>The Website may contain links to third-party websites or services not controlled by the Company. The Company is not responsible for the content, privacy policies, or practices of third-party websites or services. Users should review the public policies of third-party websites linked on the Platform.</PP>

      <PSection>15. Confidentiality and Privacy</PSection>
      <PP>Personal information provided by users is governed by the Privacy Policy, accessible on the Website. The Company may disclose personal information to authorized entities as outlined in the Privacy Policy, including law enforcement and regulatory authorities. If the Company suspects a violation of the AML Policy, it will report such behavior and disclose relevant personal information to appropriate authorities.</PP>

      <PSection>16. Disclaimers and Limitation of Liability</PSection>
      <PSub>16.2 No Warranties</PSub>
      <PP>The Website, Content, and Services are provided "as-is" without any guarantees regarding accuracy, reliability, or suitability for a particular purpose.</PP>
      <PSub>16.6 Comprehensive Limitation</PSub>
      <PP>The Company, its officers, directors, employees, agents, and third-party service providers are not liable for any direct, indirect, incidental, special, punitive, or consequential damages arising from the accuracy or content of the Website, personal injury or property damage, third-party conduct, unauthorized access to Company servers or data, service interruptions, loss or damage from using the Website or Services, market fluctuations of Virtual Currencies, or any other risks associated with Virtual Currencies.</PP>
      <PSub>16.9 Indemnification</PSub>
      <PP>Users agree to indemnify and hold the Company harmless from any claims, damages, losses, liabilities, costs, or expenses arising from use of the Website and Services, violation of these Terms, or violation of Applicable Law or third-party rights.</PP>
      <PSub>16.10 Force Majeure</PSub>
      <PP>Neither party is liable for failure to fulfill obligations due to events beyond their control, such as natural disasters, wars, regulatory changes, or technological failures.</PP>

      <PSection>17. Announcements</PSection>
      <PP>The Company may post announcements, news, and notices on the Website. Users are responsible for staying informed by reviewing these Announcements. The Company is not liable for any losses incurred from users ignoring or neglecting Announcements.</PP>

      <PSection>18. Governing Law and Dispute Resolution</PSection>
      <PUL>
        <PLI><strong className="text-white/80">18.1 Jurisdiction:</strong> These Terms are governed by the laws of Cyprus.</PLI>
        <PLI><strong className="text-white/80">18.2 Negotiation:</strong> Users and the Company agree to attempt resolving disputes through negotiation.</PLI>
        <PLI><strong className="text-white/80">18.3 Arbitration and Courts:</strong> If unresolved within 60 calendar days, disputes will be submitted to the competent courts in Cyprus or resolved through mediation or as mutually agreed upon by the Parties.</PLI>
      </PUL>

      <PSection>19. Final Provisions</PSection>
      <PUL>
        <PLI><strong className="text-white/80">19.1:</strong> These Terms remain in effect until terminated by either party. The Company may terminate these Terms at its discretion without providing reasons.</PLI>
        <PLI><strong className="text-white/80">19.3:</strong> These Terms, along with their integral parts, constitute the entire agreement between users and the Company.</PLI>
        <PLI><strong className="text-white/80">19.4:</strong> In the event of multiple language versions, the English version prevails.</PLI>
        <PLI><strong className="text-white/80">19.6 Contact:</strong> For questions, comments, or complaints, please contact us at info@krypto-knight.com.</PLI>
      </PUL>

    </PolicyLayout>
  );
}
