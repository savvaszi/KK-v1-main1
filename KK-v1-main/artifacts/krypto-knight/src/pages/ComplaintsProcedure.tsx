import { MessageSquare } from "lucide-react";
import PolicyLayout, { PSection, PSub, PP, PUL, PLI, PBox, PContact } from "@/components/PolicyLayout";

export default function ComplaintsProcedure() {
  return (
    <PolicyLayout icon={MessageSquare} badge="Client Services" title="Complaints Procedure" effectiveDate="30/12/2024">

      <PSection>1. Introduction</PSection>
      <PP>KRYPTO KNIGHT LTD ("Company", "KRYPTO KNIGHT", "we", or "us") is a private company limited by shares, incorporated in the Republic of Cyprus under registration number HE434989. KRYPTO KNIGHT LTD operates as a registered Crypto Asset Service Provider ("CASP") in Cyprus, under the Cyprus Securities and Exchange Commission ("CySEC") under license number 015/24.</PP>
      <PP>We are committed to providing high-quality services to our clients. However, we recognize that from time to time, clients may feel dissatisfied with the service they have received. This Complaints Handling Procedure outlines how clients can submit complaints and how the Company will handle them promptly and fairly.</PP>

      <PSection>2. Principles of Complaint Handling</PSection>
      <PSub>2.1 Commitment to Excellence</PSub>
      <PP>At KRYPTO KNIGHT, we strive to offer the highest level of services at all times. Client feedback is invaluable in helping us improve our services. If you are dissatisfied with any aspect of our services, we encourage you to let us know so we can address the issue promptly and prevent it from recurring in the future.</PP>
      <PSub>2.2 Fair and Transparent Process</PSub>
      <PP>We have established formal procedures for handling complaints in a fair, transparent, and timely manner. Our aim is to resolve any complaints objectively and efficiently, in accordance with this procedure, our internal policies, and applicable laws and regulations of the Republic of Cyprus.</PP>

      <PSection>3. How to Submit a Complaint</PSection>
      <PSub>3.1 Initial Contact</PSub>
      <PP>If you have any inquiries, questions, or concerns, we recommend that you first contact our Customer Support team. Many issues can be resolved quickly and informally through direct communication with our support staff or the Customer Support Manager.</PP>
      <PContact label="Email" value="info@krypto-knight.com" href="mailto:info@krypto-knight.com" />
      <PContact label="Telephone" value="+357 22 252 382" href="tel:+35722252382" />
      <PSub>3.2 Escalation to Formal Complaint</PSub>
      <PP>If your issue is not resolved to your satisfaction by our Customer Support team, you may escalate the matter by submitting a formal complaint to our Compliance Department.</PP>

      <PSection>4. Submitting a Formal Complaint</PSection>
      <PSub>4.1 Requirements for Complaints</PSub>
      <PP>Formal complaints must be submitted in writing and include all relevant details to allow us to investigate effectively.</PP>
      <PSub>4.2 Information to Include</PSub>
      <PP>Please provide the following information:</PP>
      <PUL>
        <PLI>Full Name</PLI>
        <PLI>Address</PLI>
        <PLI>Contact Details (telephone number and email)</PLI>
        <PLI>Account Number (if applicable)</PLI>
        <PLI>Detailed Description of the Complaint (including dates, affected transactions, and desired outcome)</PLI>
        <PLI>Supporting Evidence (e.g., screenshots, correspondence)</PLI>
      </PUL>
      <PSub>4.3 How to Submit</PSub>
      <PP>Complaints can be submitted via email. Send the completed Complaint Form and supporting documents to:</PP>
      <PContact label="Email" value="info@krypto-knight.com" href="mailto:info@krypto-knight.com" />
      <PSub>4.4 Language</PSub>
      <PP>Complaints should be submitted in English or Greek, and must be clear and comprehensible.</PP>
      <PSub>4.5 Accuracy of Information</PSub>
      <PP>Please ensure all information provided is accurate, complete, and up-to-date. We may request additional information or clarification during our investigation. Failure to provide necessary information may delay the investigation.</PP>
      <PSub>4.6 Rejection of Complaints</PSub>
      <PP>We reserve the right to reject complaints that are:</PP>
      <PUL>
        <PLI>Based on false or misleading information</PLI>
        <PLI>Unsubstantiated by supporting evidence</PLI>
        <PLI>Frivolous or vexatious</PLI>
        <PLI>Submitted with deliberate withholding of relevant information</PLI>
      </PUL>
      <PBox>Submitting false or misleading information is a serious offense and may result in legal action.</PBox>

      <PSection>5. Complaint Handling Process</PSection>
      <PSub>5.1 Acknowledgment</PSub>
      <PP>Upon receipt of your formal complaint, we will send you a written acknowledgment within three (3) business days, confirming receipt and that we have initiated an investigation.</PP>
      <PSub>5.2 Investigation</PSub>
      <PP>Our Compliance Department will thoroughly investigate your complaint, collaborating with relevant departments as necessary. During this process, we may contact you for further information or clarification.</PP>
      <PSub>5.3 Updates</PSub>
      <PP>We will keep you informed about the progress of your complaint. If we cannot resolve your complaint within the initial estimated timeframe, we will provide you with regular updates.</PP>
      <PSub>5.4 Resolution</PSub>
      <PP>Our goal is to resolve complaints promptly. We aim to provide a final response within fifteen (15) business days from the date of receipt of your complaint. If additional time is required due to the complexity of the issue, we will inform you accordingly.</PP>
      <PSub>5.5 Final Response</PSub>
      <PP>Our final response will include:</PP>
      <PUL>
        <PLI>A summary of the complaint</PLI>
        <PLI>The outcome of our investigation</PLI>
        <PLI>Any proposed remedial actions or resolutions</PLI>
        <PLI>Information on your right to refer the complaint to external bodies if you are unsatisfied</PLI>
      </PUL>

      <PSection>6. External Dispute Resolution</PSection>
      <PSub>6.1 Financial Ombudsman of the Republic of Cyprus</PSub>
      <PP>If you are not satisfied with our final response, or if we have not provided a final response within thirty-five (35) business days, you may refer your complaint to the Financial Ombudsman within four (4) months from the date you received our final response.</PP>
      <PContact label="Website" value="www.financialombudsman.gov.cy" href="https://www.financialombudsman.gov.cy" />
      <PContact label="Address" value="13 Lord Byron Avenue, 1096 Nicosia, Cyprus" />
      <PContact label="Telephone" value="+357 22 84 89 00" href="tel:+35722848900" />
      <PSub>6.2 Cyprus Securities and Exchange Commission (CySEC)</PSub>
      <PP>You may also contact CySEC for further assistance regarding regulatory matters.</PP>
      <PContact label="Website" value="www.cysec.gov.cy" href="https://www.cysec.gov.cy" />
      <PContact label="Address" value="19 Diagorou Street, 1097 Nicosia, Cyprus" />
      <PContact label="Telephone" value="+357 22 506 600" href="tel:+35722506600" />
      <PSub>6.3 Legal Action</PSub>
      <PP>Your right to take legal action remains unaffected by the use of any of the complaint procedures outlined above.</PP>

      <PSection>7. Confidentiality and Data Protection</PSection>
      <PP>All complaints are handled in strict confidence in accordance with our Privacy Policy and applicable data protection laws, including the General Data Protection Regulation (GDPR). Personal data collected during the complaint handling process will be used solely for the purpose of resolving the complaint.</PP>

      <PSection>8. Record Keeping</PSection>
      <PP>We will maintain records of your complaint and all related communications for at least five (5) years from the date of resolution.</PP>

      <PSection>9. Monitoring and Review</PSection>
      <PP>We regularly monitor and review our complaints handling procedures to ensure they remain effective and in compliance with regulatory requirements. Client feedback is essential in helping us improve our services.</PP>

      <PSection>10. Contact Information</PSection>
      <PP>For any questions or assistance regarding this Complaints Handling Procedure, please contact us:</PP>
      <PContact label="Email" value="info@krypto-knight.com" href="mailto:info@krypto-knight.com" />
      <PContact label="Telephone" value="+357 22 252 382" href="tel:+35722252382" />

    </PolicyLayout>
  );
}
