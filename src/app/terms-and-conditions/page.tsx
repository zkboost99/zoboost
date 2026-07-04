import LegalPageLayout, { LegalSection, LegalDivider } from '@/components/LegalPageLayout';

const sections = [
  { id: 'acceptance', title: '1. Acceptance of Terms' },
  { id: 'services', title: '2. Services & Delivery' },
  { id: 'obligations', title: '3. Customer Obligations' },
  { id: 'disclaimer', title: '4. Disclaimer & Risks' },
  { id: 'modifications', title: '5. Modifications to Service & Prices' },
  { id: 'contact', title: '6. Contact Information' },
];

export default function TermsAndConditions() {
  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="Welcome to ZoroBoost. Please review these Terms & Conditions carefully. By accessing or using our services, you agree to comply with and be bound by the terms outlined below."
      icon="📋"
      currentPage="/terms-and-conditions"
      sections={sections}
    >
      <LegalSection id="acceptance" number={1} title="Acceptance of Terms">
        <p>
          By accessing our website or purchasing any Discord services (including Server Boosts, Aged Accounts, Members, and Nitro) from ZoroBoost, you agree to be bound by these Terms &amp; Conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="services" number={2} title="Services & Delivery">
        <p>
          ZoroBoost provides digital services related to Discord server optimization and growth. 
          Delivery is automated and typically starts instantly after successful payment processing. 
          However, depending on stock levels, order queue, and Discord server limitations, delivery may take up to 24 hours.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="obligations" number={3} title="Customer Obligations">
        <p>
          You are responsible for ensuring that the Discord server links and account information you provide during checkout are correct and active. 
          ZoroBoost is not responsible for undelivered services due to incorrect links, deleted servers, or user-side bans/kick policies.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="disclaimer" number={4} title="Disclaimer & Risks">
        <p>
          You acknowledge that using third-party services to boost servers or obtain accounts may carry inherent risks on third-party platforms like Discord. 
          ZoroBoost is not responsible for any account suspensions, server deletions, or other disciplinary actions taken by Discord Inc. on your server or account.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="modifications" number={5} title="Modifications to Service & Prices">
        <p>
          Prices for our services are subject to change without notice. 
          We reserve the right at any time to modify or discontinue any service (or any part or content thereof) without notice at any time.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="contact" number={6} title="Contact Information">
        <p>
          Questions about the Terms &amp; Conditions should be sent to us via our support ticket server or emailed directly to <strong>info@zoroboost.com</strong>.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
