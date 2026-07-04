import LegalPageLayout, { LegalSection, LegalDivider } from '@/components/LegalPageLayout';
import React from 'react';

const sections = [
  { id: 'what-are-cookies', title: '1. What Are Cookies?' },
  { id: 'how-we-use', title: '2. How We Use Cookies' },
  { id: 'third-party', title: '3. Third-Party Cookies' },
  { id: 'managing', title: '4. Managing Cookies' },
];

export default function CookiesPolicy() {
  return (
    <LegalPageLayout
      title="Cookies Policy"
      subtitle="This Cookies Policy explains what cookies are and how we use them on our website."
      icon="🍪"
      currentPage="/cookies-policy"
      sections={sections}
    >
      <LegalSection id="what-are-cookies" number={1} title="What Are Cookies?">
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
          They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="how-we-use" number={2} title="How We Use Cookies">
        <p>
          ZoroBoost uses cookies for several reasons, including:
        </p>
        <ul className="space-y-2.5">
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 flex-shrink-0 mt-2"></span>
              <span><strong>Essential Cookies:</strong> These cookies are necessary for the core functionality of the website, such as managing your shopping cart, user sessions, and processing payments securely.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 flex-shrink-0 mt-2"></span>
              <span><strong>Preference Cookies:</strong> We use these cookies to remember your preferences and settings, such as your chosen theme or language options.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 flex-shrink-0 mt-2"></span>
              <span><strong>Analytics Cookies:</strong> These cookies help us analyze visitor traffic and behavior, allowing us to optimize website performance and improve user experience.</span>
            </li>
        </ul>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="third-party" number={3} title="Third-Party Cookies">
        <p>
          In some special cases, we also use cookies provided by trusted third parties. 
          For example, our website integrates payment gateways and support features (like Live Chat widgets) that may set their own cookies to ensure stable functionality and secure processing.
        </p>
      </LegalSection>

      <LegalDivider />

      <LegalSection id="managing" number={4} title="Managing Cookies">
        <p>
          You can control and/or delete cookies as you wish by adjusting your browser settings. 
          You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. 
          However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities of ZoroBoost may not work properly.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
