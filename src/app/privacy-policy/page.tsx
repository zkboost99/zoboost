import LegalPageLayout, { LegalSection, LegalDivider, LegalList } from '@/components/LegalPageLayout';

const sections = [
  { id: 'information', title: '1. Information We Collect' },
  { id: 'how-we-use', title: '2. How We Use Your Information' },
  { id: 'log-files', title: '3. Log Files' },
  { id: 'security', title: '4. Security of Data' },
  { id: 'third-party', title: '5. Third Party Privacy Policies' },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="At ZoroBoost, accessible from zoroboost.com, one of our main priorities is the privacy of our visitors."
      icon="🔒"
      currentPage="/privacy-policy"
      sections={sections}
    >
      <LegalSection id="information" number={1} title="Information We Collect">
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          When you make a purchase, we may collect your email address, Discord Username/ID (for delivery), and details about the products purchased.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="how-we-use" number={2} title="How We Use Your Information">
        <p>
          We use the information we collect in various ways, including to:
        </p>
        <LegalList items={[
          "Provide, operate, and maintain our website",
          "Improve, personalize, and expand our website",
          "Understand and analyze how you use our website",
          "Develop new products, services, features, and functionality",
          "Process transactions and deliver Discord boosts, accounts, or Nitro",
          "Send invoices, emails, and transaction confirmations",
          "Communicate with you for customer service, support, and updates",
          "Find and prevent fraud"
        ]} />
      </LegalSection>

      <LegalDivider />

      <LegalSection id="log-files" number={3} title="Log Files">
        <p>
          ZoroBoost follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="security" number={4} title="Security of Data">
        <p>
          The security of your data is important to us. We secure your transactions using industry-standard SSL encryption. 
          We do not collect or store credit card details on our servers; all payments are processed securely via third-party processors.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="third-party" number={5} title="Third Party Privacy Policies">
        <p>
          ZoroBoost&apos;s Privacy Policy does not apply to other advertisers, websites, or third-party gateways. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
