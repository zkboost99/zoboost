import Link from 'next/link';
export default function TermsAndConditions() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Terms &amp; Conditions</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Terms</li>
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
                            <h2 className="title" style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: '20px' }}>Terms &amp; Conditions</h2>
                            <p className="lead" style={{ fontSize: '18px', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                Welcome to ZoroBoost. Please review these Terms &amp; Conditions carefully. By accessing or using our services, you agree to comply with and be bound by the terms outlined below.
                            </p>
                            
                            <hr style={{ margin: '40px 0', borderColor: '#e7e7ff' }} />
                            
                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>1. Acceptance of Terms</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    By accessing our website or purchasing any Discord services (including Server Boosts, Aged Accounts, Members, and Nitro) from ZoroBoost, you agree to be bound by these Terms &amp; Conditions, all applicable laws, and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>2. Services &amp; Delivery</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    ZoroBoost provides digital services related to Discord server optimization and growth. 
                                    Delivery is automated and typically starts instantly after successful payment processing. 
                                    However, depending on stock levels, order queue, and Discord server limitations, delivery may take up to 24 hours.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>3. Customer Obligations</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    You are responsible for ensuring that the Discord server links and account information you provide during checkout are correct and active. 
                                    ZoroBoost is not responsible for undelivered services due to incorrect links, deleted servers, or user-side bans/kick policies.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>4. Disclaimer &amp; Risks</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    You acknowledge that using third-party services to boost servers or obtain accounts may carry inherent risks on third-party platforms like Discord. 
                                    ZoroBoost is not responsible for any account suspensions, server deletions, or other disciplinary actions taken by Discord Inc. on your server or account.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>5. Modifications to Service &amp; Prices</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    Prices for our services are subject to change without notice. 
                                    We reserve the right at any time to modify or discontinue any service (or any part or content thereof) without notice at any time.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>6. Contact Information</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    Questions about the Terms &amp; Conditions should be sent to us via our support ticket server or emailed directly to <strong>info@zoroboost.com</strong>.
                                </p>
                            </div>
                        </div>

                        <div className="col-xl-4 col-lg-5 mt-md-50 mt-xs-50 services-sidebar">
                            <div className="service-sidebar-items">
                                {/*  Single Widget  */}
                                <div className="single-widget services-list-widget">
                                    <div className="content">
                                        <ul>
                                            <li className="current-menu-item">
                                                <Link href="/terms-and-conditions">Terms &amp; Conditions</Link>
                                            </li>
                                            <li>
                                                <Link href="/disclaimer">Disclaimer</Link>
                                            </li>
                                            <li>
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
