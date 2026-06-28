import Link from 'next/link';
export default function RefundPolicy() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Refund Policy</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Refund Policy</li>
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
                            <h2 className="title" style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: '20px' }}>Refund Policy</h2>
                            <p className="lead" style={{ fontSize: '18px', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                Thank you for shopping at ZoroBoost. Please review our refund and refill policy carefully.
                            </p>
                            
                            <hr style={{ margin: '40px 0', borderColor: '#e7e7ff' }} />
                            
                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>1. Refund Eligibility</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    Because we offer digital services that are immediately consumed upon delivery (such as Server Boosts and Discord Nitro codes), we generally do not offer refunds once the service has been successfully initiated or delivered.
                                </p>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    However, you may be eligible for a full or partial refund under the following specific circumstances:
                                </p>
                                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                    <li>The ordered service was not delivered at all within 48 hours of purchase.</li>
                                    <li>The service was out of stock and we were unable to fulfill it.</li>
                                    <li>A double payment occurred due to a system glitch.</li>
                                </ul>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>2. Boost Drop &amp; Refill Warranty</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    Discord Server Boosts are bound to accounts. In rare instances, an account may be flagged by Discord, causing the boosts to drop. 
                                    We offer a solid warranty period on our boosts (typically 1 month or 3 months depending on the package purchased).
                                </p>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    If any boosts drop within the warranty timeframe:
                                </p>
                                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                    <li>Contact our support server or email us with your Order ID.</li>
                                    <li>We will provide a free refill of the dropped boosts as quickly as possible.</li>
                                    <li>If we are unable to refill the boosts within 72 hours, we will issue a pro-rata refund for the remaining duration of the boosts.</li>
                                </ul>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>3. Non-Refundable Scenarios</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    We cannot issue refunds or refills in the following cases:
                                </p>
                                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                    <li>The customer input the wrong Discord server invite link.</li>
                                    <li>The Discord server was deleted or banned by Discord Inc.</li>
                                    <li>The customer kicked or banned the booster accounts from their server.</li>
                                    <li>Nitro gift codes that have already been claimed or redeemed.</li>
                                </ul>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>4. How to Request a Refund</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    To request a refund or refill, please join our Discord support server and open a support ticket, or write to us at <strong>info@zoroboost.com</strong> with your Order ID, email used during purchase, and a brief description of the issue.
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
                                            <li>
                                                <Link href="/privacy-policy">Privacy Policy</Link>
                                            </li>
                                            <li className="current-menu-item">
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
