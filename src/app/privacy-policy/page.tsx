import Link from 'next/link';
export default function PrivacyPolicy() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Privacy Policy</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/*  End Breadcrumb  */}

    <div id="smooth-content">
        {/*  Start Services Details Area  */}
        <div className="services-details-area default-padding">
            <div className="container">
                <div className="services-details-items">
                    <div className="row">
                        
                        <div className="col-xl-8 col-lg-7 pl-35 pl-md-15 pl-xs-15">
                            <h2 className="title" style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: '20px' }}>Privacy Policy</h2>
                            <p className="lead" style={{ fontSize: '18px', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                At ZoroBoost, accessible from zoroboost.com, one of our main priorities is the privacy of our visitors.
                            </p>
                            
                            <hr style={{ margin: '40px 0', borderColor: '#e7e7ff' }} />
                            
                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>1. Information We Collect</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
                                    When you make a purchase, we may collect your email address, Discord Username/ID (for delivery), and details about the products purchased.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>2. How We Use Your Information</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    We use the information we collect in various ways, including to:
                                </p>
                                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                    <li>Provide, operate, and maintain our website</li>
                                    <li>Improve, personalize, and expand our website</li>
                                    <li>Understand and analyze how you use our website</li>
                                    <li>Develop new products, services, features, and functionality</li>
                                    <li>Process transactions and deliver Discord boosts, accounts, or Nitro</li>
                                    <li>Send invoices, emails, and transaction confirmations</li>
                                    <li>Communicate with you for customer service, support, and updates</li>
                                    <li>Find and prevent fraud</li>
                                </ul>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>3. Log Files</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    ZoroBoost follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>4. Security of Data</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    The security of your data is important to us. We secure your transactions using industry-standard SSL encryption. 
                                    We do not collect or store credit card details on our servers; all payments are processed securely via third-party processors.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>5. Third Party Privacy Policies</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    ZoroBoost&apos;s Privacy Policy does not apply to other advertisers, websites, or third-party gateways. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
                                </p>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-5 mt-md-50 mt-xs-50 services-sidebar">
                            <div className="service-sidebar-items">
                                {/*  Single Widget  */}
                                <div className="single-widget services-list-widget">
                                    <div className="content">
                                        <ul>
                                            <li>
                                                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
                                            </li>
                                            <li>
                                                <Link href="/disclaimer">Disclaimer</Link>
                                            </li>
                                            <li className="current-menu-item">
                                                <Link href="/privacy-policy">Privacy Policy</Link>
                                            </li>
                                            <li>
                                                <Link href="/refund-policy">Refund Policy</Link>
                                            </li>
                                            <li>
                                                <Link href="/cookies-policy">Cookies Policy</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/*  End Single Widget  */}
                                
                                {/*  Single Widget  */}
                                <div className="single-widget bg-dark quick-contact-widget text-light" style={{backgroundImage: "url(/assets/img/shape/banner-3.jpg)"}}>
                                    <div className="content">
                                        <h3>Need Help?</h3>
                                        <p>
                                            If you have questions regarding our legal agreements, feel free to open a ticket on Discord or email us.
                                        </p>
                                        <h4><a href="mailto:info@zoroboost.com">info@zoroboost.com</a></h4>
                                        <Link className="btn mt-10 btn-style-one" href="/contact-us">Contact Us <i className="fas fa-arrow-right"></i></Link>
                                    </div>
                                </div>
                                {/*  End Single Widget  */}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        {/*  End Services Details Area  */}
    </div>
    </>
  );
}
