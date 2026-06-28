import Link from 'next/link';
export default function CookiesPolicy() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Cookies Policy</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Cookies Policy</li>
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
                            <h2 className="title" style={{ fontWeight: 700, color: 'var(--color-heading)', marginBottom: '20px' }}>Cookies Policy</h2>
                            <p className="lead" style={{ fontSize: '18px', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                This Cookies Policy explains what cookies are and how we use them on our website.
                            </p>
                            
                            <hr style={{ margin: '40px 0', borderColor: '#e7e7ff' }} />
                            
                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>1. What Are Cookies?</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    Cookies are small text files that are stored on your computer or mobile device when you visit a website. 
                                    They are widely used to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>2. How We Use Cookies</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    ZoroBoost uses cookies for several reasons, including:
                                </p>
                                <ul style={{ paddingLeft: '20px', listStyleType: 'disc', color: 'var(--color-paragraph)', lineHeight: '1.8' }}>
                                    <li><strong>Essential Cookies:</strong> These cookies are necessary for the core functionality of the website, such as managing your shopping cart, user sessions, and processing payments securely.</li>
                                    <li><strong>Preference Cookies:</strong> We use these cookies to remember your preferences and settings, such as your chosen theme or language options.</li>
                                    <li><strong>Analytics Cookies:</strong> These cookies help us analyze visitor traffic and behavior, allowing us to optimize website performance and improve user experience.</li>
                                </ul>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>3. Third-Party Cookies</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    In some special cases, we also use cookies provided by trusted third parties. 
                                    For example, our website integrates payment gateways and support features (like Live Chat widgets) that may set their own cookies to ensure stable functionality and secure processing.
                                </p>
                            </div>

                            <div className="mt-30">
                                <h3 style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-heading)', marginBottom: '15px' }}>4. Managing Cookies</h3>
                                <p style={{ lineHeight: '1.8', color: 'var(--color-paragraph)' }}>
                                    You can control and/or delete cookies as you wish by adjusting your browser settings. 
                                    You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed. 
                                    However, if you do this, you may have to manually adjust some preferences every time you visit a site and some services and functionalities of ZoroBoost may not work properly.
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
                                            <li>
                                                <Link href="/refund-policy">Refund Policy</Link>
                                            </li>
                                            <li className="current-menu-item">
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
