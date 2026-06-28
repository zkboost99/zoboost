import Link from 'next/link';

export default function Footer() {
  return (
    <>
      {/*  Start Footer 
    =============================================  */}
    <footer className="footer-style-one box-layout bg-dark text-light">
        
        <div className="footer-shape">
            <img src="/assets/img/shape/globe.png" alt="Image Not Found" />
        </div>
        <div className="container">
            <div className="f-items default-padding">
                <div className="row">
                    <div className="col-xl-5 col-lg-5">
                        <div className="f-item contact">
                            <h4 className="widget-title"> Contact</h4>
                            <p>
                                Join our official Discord server or send us an email for any queries regarding our services.
                            </p>
                            <ul className="contact">
                                <li>
                                    <p>Phone Support</p>
                                    <h4><a href="tel:+923438495390">+923438495390</a></h4>
                                </li>
                                <li>
                                    <p>Email</p>
                                    <h4><a href="mailto:info@zoroboost.com">info@zoroboost.com</a></h4>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-6 offset-xl-1 col-lg-7">
                        <div className="footer-style-one-items">
                            {/*  Single Item  */}
                            <div className="f-item link">
                                <h4 className="widget-title">Company</h4>
                                <ul>
                                    <li>
                                        <a href="/about-us">About Us</a>
                                    </li>
                                    <li>
                                         <Link href="/blog">Blog</Link>
                                    </li>
                                    <li>
                                        <a href="/contact-us">Contact Us</a>
                                    </li>
                                    <li>
                                        <a href="/faq">FAQ</a>
                                    </li>
                                    <li>
                                         <Link href="/">Home</Link>
                                    </li>
                                </ul>
                            </div>
                            {/*  End Single Item  */}
                            {/*  Single Item  */}
                            <div className="f-item link">
                                <h4 className="widget-title">Services</h4>
                                <ul>
                                    <li>
                                        <a href="/aged-accounts">Aged Accounts</a>
                                    </li>
                                    <li>
                                        <a href="/decoration">Decoration</a>
                                    </li>
                                    <li>
                                        <a href="/nitro-accounts">Nitro Accounts</a>
                                    </li>
                                    <li>
                                        <a href="/nitro-basic">Nitro Basic</a>
                                    </li>
                                    <li>
                                        <a href="/nitro-boost">Nitro Boost</a>
                                    </li>
                                    <li>
                                        <a href="/promo">Promo</a>
                                    </li>
                                    <li>
                                        <a href="/server-boosts">Server Boosts</a>
                                    </li>
                                    <li>
                                        <a href="/server-members">Server Members</a>
                                    </li>
                                </ul>
                            </div>
                            {/*  End Single Item  */}
                            {/*  Single Item  */}
                            <div className="f-item link">
                                <h4 className="widget-title">Legal Pages</h4>
                                <ul>
                                    <li>
                                        <a href="/cookies-policy">Cookies Policy</a>
                                    </li>
                                    <li>
                                        <a href="/disclaimer">Disclaimer</a>
                                    </li>
                                    <li>
                                        <a href="/privacy-policy">Privacy Policy</a>
                                    </li>
                                    <li>
                                        <a href="/refund-policy">Refund Policy</a>
                                    </li>
                                    <li>
                                        <a href="/terms-and-conditions">Terms &amp; Conditions</a>
                                    </li>
                                </ul>
                            </div>
                            {/*  End Single Item  */}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/*  Start Footer Bottom  */}
        <div className="footer-bottom-one">
            <div className="container">
                <div className="content">
                    <div className="row align-center">
                        <div className="col-lg-6 col-md-6">
                            <div className="logo">
                                <a href="#"><img src="/assets/img/logo-light.png" alt="Logo" /></a>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <ul className="footer-item-social text-end">
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><img src="/assets/img/icon/twitter-x.png" alt="Image Not Found" /></a></li>
                                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  End Footer Bottom  */}

        {/*  Start Footer Bottom  */}
        <div className="footer-bottom">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <p>© <a href="#">ZoroBoost</a> 2026. All Rights Reserved</p>
                    </div>
                    <div className="col-lg-6 text-end">
                        <p>developed by <a href="https://udesigner.net" target="_blank" rel="noopener noreferrer">UDESIGNER</a></p>
                    </div>
                </div>
            </div>
        </div>
        {/*  End Footer Bottom  */}

    </footer>
    </>
  );
}