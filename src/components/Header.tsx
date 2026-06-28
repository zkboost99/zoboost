'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <>
      {/*  Header 
    =============================================  */}
    <header className={isHome ? '' : 'include-breadcrumb'}>
        {/*  Start Navigation  */}
        <nav className={`navbar mobile-sidenav navbar-sticky navbar-default validnavs no-background ${isHome ? 'navbar-box' : 'navbar-common navbar-fixed'}`}>

            {/*  Start Top Search  */}
            <div className="top-search">
                <div className="container-xl">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-search"></i></span>
                        <input type="text" className="form-control" placeholder="Search" />
                        <span className="input-group-addon close-search"><i className="fa fa-times"></i></span>
                    </div>
                </div>
            </div>
            {/*  End Top Search  */}


            <div className={`container d-flex justify-content-between align-items-center ${isHome ? 'nav-box' : ''}`}>

                {/*  Start Header Navigation  */}
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                        <i className="fa fa-bars"></i>
                    </button>
                    <Link className="navbar-brand" href="/">
                        {isHome ? (
                            <>
                                <img src="/assets/img/logo.png" className="logo logo-display" alt="Logo" />
                                <img src="/assets/img/logo.png" className="logo logo-scrolled" alt="Logo" />
                            </>
                        ) : (
                            <img src="/assets/img/logo.png" className="logo" alt="Logo" />
                        )}
                    </Link>
                </div>
                {/*  End Header Navigation  */}

                {/*  Collect the nav links, forms, and other content for toggling  */}
                <div className="collapse navbar-collapse" id="navbar-menu">

                    <img src="/assets/img/logo.png" alt="Logo" />
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                        <i className="fa fa-times"></i>
                    </button>
                    
                    <ul className="nav navbar-nav navbar-center" data-in="fadeInDown" data-out="fadeOutUp">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Discord</a>
                            <ul className="dropdown-menu">
                                <li><a href="/aged-accounts">Aged Accounts</a></li>
                                <li><a href="/server-boosts">Server Boosts</a></li>
                                <li><a href="/decoration">Decoration</a></li>
                                <li><a href="/nitro-boost">Nitro Boost</a></li>
                                <li><a href="/server-members">Server Members</a></li>
                                <li><a href="/promo">Promo</a></li>
                                <li><a href="/nitro-accounts">Nitro Accounts</a></li>
                                <li><a href="/nitro-basic">Nitro Basic</a></li>
                            </ul>
                        </li>
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">Legal Pages</a>
                            <ul className="dropdown-menu">
                                <li><a href="/terms-and-conditions">Terms &amp; Conditions</a></li>
                                <li><a href="/disclaimer">Disclaimer</a></li>
                                <li><a href="/privacy-policy">Privacy Policy</a></li>
                                <li><a href="/refund-policy">Refund Policy</a></li>
                                <li><a href="/cookies-policy">Cookies Policy</a></li>
                            </ul>
                        </li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/contact-us">Contact Us</a></li>
                    </ul>
                </div>{/*  /.navbar-collapse  */}

                <div className="attr-right">
                    {/*  Start Atribute Navigation  */}
                    <div className={`attr-nav ${isHome ? 'attr-box' : ''}`}>
                        <ul>
                            <li className="button" style={{ margin: '0' }}>
                                <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'suggestion', rect: e.currentTarget.getBoundingClientRect() } })); }} title="Share a Suggestion" style={{ padding: '0 2px', color: 'inherit', background: 'transparent', fontSize: '18px' }}>
                                    <i className="fas fa-lightbulb"></i>
                                </a>
                            </li>
                            <li className="button" style={{ margin: '0 10px 0 0' }}>
                                <a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation(); document.dispatchEvent(new CustomEvent('openFeedback', { detail: { type: 'report', rect: e.currentTarget.getBoundingClientRect() } })); }} title="Report an Issue" style={{ padding: '0 2px', color: 'inherit', background: 'transparent', fontSize: '18px' }}>
                                    <i className="fas fa-bug"></i>
                                </a>
                            </li>
                            {isHome && (
                                <li className="side-menu">
                                    <a href="#">
                                        <span className="bar-1"></span>
                                        <span className="bar-2"></span>
                                        <span className="bar-3"></span>
                                    </a>
                                </li>
                            )}
                            <li className="button">
                                <Link className="btn btn-style-one" href="/login">Get Started <i className="fas fa-arrow-right"></i></Link>
                            </li>
                        </ul>
                    </div>
                    {/*  End Atribute Navigation  */}
                </div>

                {isHome && (
                    <div className="side">
                        <a href="#" className="close-side"><i className="fas fa-times"></i></a>
                        <div className="widget">
                            <div className="logo">
                                <img src="/assets/img/logo-light-solid.png" alt="Logo" />
                            </div>
                            <p>
                                Arrived compass prepare an on as. Reasonable particular on my it in sympathize. Size now easy eat hand how. Unwilling he departure elsewhere dejection at. Heart large seems may purse means.
                            </p>
                        </div>
                        <div className="widget address">
                            <div>
                                <ul>
                                    <li>
                                        <div className="content">
                                            <p>Address</p> 
                                            <strong>Post Office Sandral Tehseel o District Khushab Punjab, 41000</strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="content">
                                            <p>Email</p> 
                                            <strong>info@zoroboost.com</strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="content">
                                            <p>Contact</p> 
                                            <strong>+923438495390</strong>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="widget newsletter">
                            <h4>Get Subscribed!</h4>
                            <form action="#">
                                <div className="input-group stylish-input-group">
                                    <input type="email" placeholder="Enter your e-mail" className="form-control" name="email" />
                                    <span className="input-group-addon">
                                        <button type="submit">
                                            <i className="fas fa-long-arrow-right"></i>
                                        </button>  
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div className="widget social">
                            <ul className="link">
                                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                                <li><a href="#"><i className="fab fa-behance"></i></a></li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>   
            {/*  Overlay screen for menu  */}
            <div className="overlay-screen"></div>
            {/*  End Overlay screen for menu  */}

        </nav>
        {/*  End Navigation  */}
    </header>
    </>
  );
}