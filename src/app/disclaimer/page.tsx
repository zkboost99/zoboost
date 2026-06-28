import Link from 'next/link';
export default function Disclaimer() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Disclaimer</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Disclaimer</li>
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
                            <h2 className="title" style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: '20px' }}>Disclaimer</h2>
                            <p className="lead" style={{ fontSize: '18px', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                Please read this disclaimer carefully before using the ZoroBoost website or purchasing any of our products and services.
                            </p>
                            
                            <hr style={{ margin: '40px 0', borderColor: '#e7e7ff' }} />
                            
                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>1. Affiliation Disclaimer</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    ZoroBoost is an independent service provider of digital marketing, server growth, and optimization assets. 
                                    We are <strong>NOT</strong> affiliated, associated, authorized, endorsed by, or in any way officially connected with Discord Inc., or any of its subsidiaries or its affiliates. 
                                    The official Discord website can be found at <a href="https://discord.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-primary)', fontWeight: 500 }}>discord.com</a>.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>2. Terms of Service Risks</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    By purchasing our services (including but not limited to Server Boosts, Members, Aged Accounts, and Nitro), you understand and agree that utilizing third-party services for automated optimization or account assets may not fully align with Discord&apos;s Terms of Service. 
                                    You assume all responsibility and risks associated with using our services. ZoroBoost will not be held liable for any damages, suspensions, server deletions, or bans resulting from the use of our website or services.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>3. Information &amp; Content</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    The information contained on this website is for general information purposes only. 
                                    While we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, products, services, or related graphics contained on the website.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginTop: '30px', marginBottom: '15px' }}>4. &quot;As Is&quot; Basis</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    All products and services delivered by ZoroBoost are provided on an &quot;as is&quot; and &quot;as available&quot; basis without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
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
                                            <li className="current-menu-item">
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
