import LegalPageLayout, { LegalSection, LegalDivider } from '@/components/LegalPageLayout';

const sections = [
  { id: 'affiliation', title: '1. Affiliation Disclaimer' },
  { id: 'tos-risks', title: '2. Terms of Service Risks' },
  { id: 'information', title: '3. Information & Content' },
  { id: 'as-is', title: '4. "As Is" Basis' },
];

export default function Disclaimer() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      subtitle="Please read this disclaimer carefully before using the ZoroBoost website or purchasing any of our products and services."
      icon="⚠️"
      currentPage="/disclaimer"
      sections={sections}
    >
      <LegalSection id="affiliation" number={1} title="Affiliation Disclaimer">
        <p>
          ZoroBoost is an independent service provider of digital marketing, server growth, and optimization assets. 
          We are <strong>NOT</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with Discord Inc., or any of its subsidiaries or its affiliates. 
          The official Discord website can be found at <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-yellow-400 hover:text-yellow-300 underline underline-offset-2">discord.com</a>.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="tos-risks" number={2} title="Terms of Service Risks">
        <p>
          By purchasing our services (including but not limited to Server Boosts, Members, Aged Accounts, and Nitro), you understand and agree that utilizing third-party services for automated optimization or account assets may not fully align with Discord&apos;s Terms of Service. 
          You assume all responsibility and risks associated with using our services. ZoroBoost will not be held liable for any damages, suspensions, server deletions, or bans resulting from the use of our website or services.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="information" number={3} title="Information & Content">
        <p>
          The information contained on this website is for general information purposes only. 
          While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="as-is" number={4} title='"As Is" Basis'>
        <p>
          All products and services delivered by ZoroBoost are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
