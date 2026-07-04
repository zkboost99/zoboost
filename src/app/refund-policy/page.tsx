import LegalPageLayout, { LegalSection, LegalDivider, LegalList } from '@/components/LegalPageLayout';

const sections = [
  { id: 'eligibility', title: '1. Refund Eligibility' },
  { id: 'warranty', title: '2. Boost Drop & Refill Warranty' },
  { id: 'non-refundable', title: '3. Non-Refundable Scenarios' },
  { id: 'how-to-request', title: '4. How to Request a Refund' },
];

export default function RefundPolicy() {
  return (
    <LegalPageLayout
      title="Refund Policy"
      subtitle="Thank you for shopping at ZoroBoost. Please review our refund and refill policy carefully."
      icon="💰"
      currentPage="/refund-policy"
      sections={sections}
    >
      <LegalSection id="eligibility" number={1} title="Refund Eligibility">
        <p>
          Because we offer digital services that are immediately consumed upon delivery (such as Server Boosts and Discord Nitro codes), we generally do not offer refunds once the service has been successfully initiated or delivered.
        </p>
        <p>
          However, you may be eligible for a full or partial refund under the following specific circumstances:
        </p>
        <LegalList items={[
          "The ordered service was not delivered at all within 48 hours of purchase.",
          "The service was out of stock and we were unable to fulfill it.",
          "A double payment occurred due to a system glitch."
        ]} />
      </LegalSection>

      <LegalDivider />

      <LegalSection id="warranty" number={2} title="Boost Drop & Refill Warranty">
        <p>
          Discord Server Boosts are bound to accounts. In rare instances, an account may be flagged by Discord, causing the boosts to drop. 
          We offer a solid warranty period on our boosts (typically 1 month or 3 months depending on the package purchased).
        </p>
        <p>
          If any boosts drop within the warranty timeframe:
        </p>
        <LegalList items={[
          "Contact our support server or email us with your Order ID.",
          "We will provide a free refill of the dropped boosts as quickly as possible.",
          "If we are unable to refill the boosts within 72 hours, we will issue a pro-rata refund for the remaining duration of the boosts."
        ]} />
      </LegalSection>

      <LegalDivider />

      <LegalSection id="non-refundable" number={3} title="Non-Refundable Scenarios">
        <p>
          We cannot issue refunds or refills in the following cases:
        </p>
        <LegalList items={[
          "The customer input the wrong Discord server invite link.",
          "The Discord server was deleted or banned by Discord Inc.",
          "The customer kicked or banned the booster accounts from their server.",
          "Nitro gift codes that have already been claimed or redeemed."
        ]} />
      </LegalSection>

      <LegalDivider />

      <LegalSection id="how-to-request" number={4} title="How to Request a Refund">
        <p>
          To request a refund or refill, please join our Discord support server and open a support ticket, or write to us at <strong>info@zoroboost.com</strong> with your Order ID, email used during purchase, and a brief description of the issue.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
