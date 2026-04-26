import { Shield } from "lucide-react";
import PolicyLayout, { PSection, PSub, PP, PUL, PLI, PBox } from "@/components/PolicyLayout";

export default function AmlPolicy() {
  return (
    <PolicyLayout icon={Shield} badge="Compliance" title="AML Policy" effectiveDate="30/12/2024">

      <PP>KRYPTO KNIGHT LTD ("KRYPTO KNIGHT" or "Company") is a registered Crypto Asset Service Provider ("CASP") in Cyprus under registration number 015/24. The Company is committed to the highest standards of Anti-Money Laundering ("AML") and Countering the Financing of Terrorism ("CFT") compliance. All employees, directors, officers, contractors, and consultants of the Company are required to adhere to these standards to prevent the misuse of its services for illicit activities.</PP>

      <PSection>Purpose</PSection>
      <PP>This document provides an overview of the Company's AML/CFT compliance policies, procedures, and controls. It serves as a guide for partners, clients, vendors, contractors, employees, regulators, law enforcement, and other stakeholders. This policy is not exhaustive and should be read in conjunction with the Company's detailed internal procedures.</PP>
      <PP>This policy aligns with the provisions, requirements, and recommendations of:</PP>
      <PUL>
        <PLI>The Prevention and Suppression of Money Laundering and Terrorist Financing Law of 2007 (Law 188(I)/2007), as amended ("Law")</PLI>
        <PLI>The Implementation of the Provisions of United Nations Security Council Resolutions (Sanctions) and of Decisions and Regulations of the Council of the European Union (Restrictive Measures) Law of 2016</PLI>
        <PLI>Guidance issued by the Financial Action Task Force ("FATF") for a Risk-Based Approach to Virtual Assets and Virtual Asset Service Providers</PLI>
        <PLI>Directives and Circulars issued by the Cyprus Securities and Exchange Commission ("CySEC") relating to AML/CFT and CASPs</PLI>
      </PUL>

      <PSection>Regulatory Framework</PSection>
      <PP>KRYPTO KNIGHT operates under the laws of the Republic of Cyprus, a member of the European Union. Cyprus has implemented comprehensive AML/CFT legislation in line with EU Directives and international standards. As a registered CASP, KRYPTO KNIGHT is supervised by CySEC and is required to comply with all relevant laws and regulations.</PP>
      <PP>The Company's registration and authorization can be validated on the official website of CySEC.</PP>

      <PSection>Definitions</PSection>
      <PSub>Money Laundering involves:</PSub>
      <PUL>
        <PLI><strong className="text-white/80">Conversion or Transfer:</strong> Converting or transferring property known to be derived from criminal activity, to conceal or disguise its illicit origin or to assist others in evading legal consequences.</PLI>
        <PLI><strong className="text-white/80">Concealment or Disguise:</strong> Hiding the true nature, source, location, disposition, movement, or ownership of property derived from criminal activity.</PLI>
        <PLI><strong className="text-white/80">Acquisition, Possession, or Use:</strong> Acquiring, possessing, or using property known to be derived from criminal activity.</PLI>
        <PLI><strong className="text-white/80">Participation and Assistance:</strong> Participating in or assisting the commission of any of the above actions.</PLI>
      </PUL>
      <PP><strong className="text-white/80">Terrorist Financing</strong> is the provision or collection of funds with the intention or knowledge that they will be used to carry out terrorist activities as defined in national and international laws.</PP>

      <PSection>Risk-Based Approach and Risk Assessment</PSection>
      <PP>KRYPTO KNIGHT adopts a risk-based approach to AML/CFT compliance, which involves:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Customer Risk Assessment:</strong> Evaluating the customer's background, occupation, and transaction patterns.</PLI>
        <PLI><strong className="text-white/80">Geographical Risk Assessment:</strong> Considering the customer's country of residence or operation, especially if it is a high-risk jurisdiction.</PLI>
        <PLI><strong className="text-white/80">Product/Service Risk Assessment:</strong> Assessing the risks associated with the Company's products and services.</PLI>
        <PLI><strong className="text-white/80">Delivery Channel Risk Assessment:</strong> Evaluating the methods through which services are delivered.</PLI>
        <PLI><strong className="text-white/80">Transaction Risk Assessment:</strong> Monitoring the size, frequency, and nature of transactions for unusual activity.</PLI>
      </PUL>
      <PP>Risk assessments are periodically reviewed and updated based on ongoing monitoring and any new information obtained.</PP>

      <PSection>Compliance Officer</PSection>
      <PP>The Board of Directors appoints a dedicated Compliance Officer, responsible for:</PP>
      <PUL>
        <PLI>Implementing and overseeing AML/CFT policies and procedures.</PLI>
        <PLI>Acting as the liaison with CySEC and the Unit for Combating Money Laundering ("MOKAS").</PLI>
        <PLI>Reporting directly to senior management and the Board of Directors.</PLI>
        <PLI>Having the authority, resources, and access to all necessary information to perform their duties effectively.</PLI>
      </PUL>
      <PP>The Compliance Officer's key duties include:</PP>
      <PUL>
        <PLI>Collecting and analyzing information related to unusual or suspicious transactions.</PLI>
        <PLI>Reporting any suspicions of money laundering or terrorist financing to MOKAS.</PLI>
        <PLI>Providing regular reports on compliance effectiveness to the Board.</PLI>
        <PLI>Ensuring all staff receive adequate AML/CFT training.</PLI>
      </PUL>

      <PSection>Policies, Procedures, and Controls</PSection>
      <PP>KRYPTO KNIGHT has established robust policies, procedures, and controls to mitigate AML/CFT risks, including:</PP>
      <PUL>
        <PLI><strong className="text-white/80">Customer Due Diligence ("CDD"):</strong> Procedures for identifying and verifying customers and beneficial owners.</PLI>
        <PLI><strong className="text-white/80">Enhanced Due Diligence ("EDD"):</strong> Additional measures for high-risk customers or transactions.</PLI>
        <PLI><strong className="text-white/80">Simplified Due Diligence ("SDD"):</strong> Reduced measures for low-risk scenarios, as permitted by law.</PLI>
        <PLI><strong className="text-white/80">Ongoing Monitoring:</strong> Continuous assessment of customer transactions and activities.</PLI>
        <PLI><strong className="text-white/80">Record-Keeping:</strong> Maintaining detailed records in compliance with legal requirements.</PLI>
        <PLI><strong className="text-white/80">Reporting Procedures:</strong> Clear processes for reporting suspicious activities to MOKAS.</PLI>
        <PLI><strong className="text-white/80">Employee Training:</strong> Regular training programs to ensure staff are aware of AML/CFT obligations.</PLI>
        <PLI><strong className="text-white/80">Internal Audit:</strong> Periodic reviews to assess the effectiveness of AML/CFT measures.</PLI>
      </PUL>

      <PSection>Customer Due Diligence (CDD)</PSection>
      <PSub>Identification and Verification</PSub>
      <PP>The Company collects and verifies the following information before establishing a business relationship:</PP>
      <PSub>Individuals:</PSub>
      <PUL>
        <PLI>Full name</PLI>
        <PLI>Date and place of birth</PLI>
        <PLI>Nationality</PLI>
        <PLI>Residential address</PLI>
        <PLI>Identification document (e.g., passport, national ID)</PLI>
      </PUL>
      <PSub>Legal Entities:</PSub>
      <PUL>
        <PLI>Legal name</PLI>
        <PLI>Registered address</PLI>
        <PLI>Registration number</PLI>
        <PLI>Directors and shareholders</PLI>
        <PLI>Beneficial owners</PLI>
      </PUL>
      <PP>Verification is conducted using reliable, independent sources, including government-issued documents and reputable databases.</PP>
      <PSub>Beneficial Ownership</PSub>
      <PP>KRYPTO KNIGHT identifies and verifies the beneficial owners of corporate clients to understand the ownership and control structure.</PP>
      <PSub>Ongoing Monitoring</PSub>
      <PP>Transactions are monitored to ensure they are consistent with the customer's profile and to detect any unusual or suspicious activity.</PP>

      <PSection>Simplified Due Diligence (SDD)</PSection>
      <PP>SDD measures may be applied when the risk of money laundering or terrorist financing is low, and is permitted by law. SDD may involve reduced frequency of customer updates, simplified verification procedures, and less intensive ongoing monitoring. SDD is not permitted when there is a suspicion of money laundering or terrorist financing.</PP>

      <PSection>Enhanced Due Diligence (EDD)</PSection>
      <PP>EDD measures are applied in high-risk situations, including customers from high-risk third countries identified by the EU, Politically Exposed Persons (PEPs) and their associates, and complex or unusually large transactions. EDD measures include obtaining additional customer information, enhanced scrutiny of transactions, and senior management approval for establishing or continuing the business relationship.</PP>

      <PSection>Politically Exposed Persons (PEPs)</PSection>
      <PP>A PEP is an individual entrusted with prominent public functions, including heads of state or government, senior politicians, senior government/judicial/military officials, senior executives of state-owned corporations, and important political party officials.</PP>
      <PP>The Company takes reasonable measures to determine if a customer or beneficial owner is a PEP, a family member, or a close associate. EDD measures are applied, including senior management approval before establishing a relationship, establishing the source of wealth and funds, and enhanced ongoing monitoring.</PP>

      <PSection>Sanctions Screening</PSection>
      <PP>KRYPTO KNIGHT screens customers and transactions against relevant sanctions lists, including:</PP>
      <PUL>
        <PLI>United Nations Security Council Sanctions List</PLI>
        <PLI>European Union Consolidated Sanctions List</PLI>
        <PLI>Office of Foreign Assets Control (OFAC) Sanctions List</PLI>
        <PLI>UK HM Treasury Sanctions List</PLI>
      </PUL>
      <PBox>Business relationships with sanctioned individuals or entities are strictly prohibited.</PBox>

      <PSection>Suspicious Activity Reporting</PSection>
      <PSub>Internal Reporting</PSub>
      <PP>Employees must report any knowledge or suspicion of money laundering or terrorist financing to the Compliance Officer immediately.</PP>
      <PSub>External Reporting</PSub>
      <PP>The Compliance Officer evaluates internal reports and, if necessary, submits a Suspicious Transaction Report (STR) to MOKAS without delay.</PP>
      <PSub>Confidentiality and Tipping Off</PSub>
      <PP>It is illegal to inform ("tip off") any person that a suspicion has been reported internally or to MOKAS, or that an investigation is being or may be conducted.</PP>

      <PSection>Record-Keeping</PSection>
      <PP>The Company maintains records for at least five years from the end of the business relationship or the date of the occasional transaction, including customer identification documents, transaction records, and correspondence and communication records. Records are kept securely and are accessible only to authorized personnel.</PP>

      <PSection>Data Protection</PSection>
      <PP>KRYPTO KNIGHT processes personal data in compliance with the General Data Protection Regulation (GDPR) and national data protection laws. Personal data collected for AML/CFT purposes is used solely for that purpose and is not further processed in a way incompatible with those purposes.</PP>

      <PSection>Employee Training</PSection>
      <PP>The Company provides regular training to ensure employees understand their legal obligations under AML/CFT laws, recognize signs of money laundering and terrorist financing, and know the internal reporting procedures. Training is updated to reflect changes in legislation, regulations, and industry best practices.</PP>

      <PSection>Internal Audit and Compliance Monitoring</PSection>
      <PP>An independent audit function assesses the effectiveness of the Company's AML/CFT policies and procedures. Findings are reported to senior management, and corrective actions are implemented as necessary.</PP>

      <PSection>Cooperation with Authorities</PSection>
      <PP>KRYPTO KNIGHT cooperates fully with CySEC, MOKAS, and other relevant authorities. This includes responding promptly to requests for information, allowing inspections and audits, and notifying authorities of any significant compliance issues.</PP>

      <PSection>Policy Review</PSection>
      <PP>This policy is reviewed at least annually or when significant changes occur in relevant laws, regulations, or business operations. Updates are approved by the Board of Directors of the Company.</PP>

    </PolicyLayout>
  );
}
