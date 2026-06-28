import Link from 'next/link';
export default function AboutUs() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>About Us</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>About</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/*  End Breadcrumb  */}

    <div id="smooth-content">
        {/*  Start About  */}
        <div className="about-style-one-area default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-xl-8 col-lg-7">
                        <div className="about-style-one-info bg-gray fade-up-anim" style={{backgroundImage: "url(/assets/img/shape/3.png)"}}>
                            <h2 className="fixed-text">ZoroBoost</h2>
                            <h4 className="sub-title">About ZoroBoost</h4>
                            <h2 className="title">Unlock limitless server growth with our premium Discord services</h2>
                            <p>
                                ZoroBoost is dedicated to helping Discord communities and server owners achieve unprecedented growth. We provide high-quality Server Boosts, Aged Accounts, Nitro, and Real Server Members at the most competitive prices in the market. Whether you&apos;re looking to unlock level 3 perks or build a massive community, ZoroBoost guarantees fast, secure, and reliable delivery to meet all your Discord needs.
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-5">
                        <div className="card-style-one-item fade-up-anim bg-gradient text-light">
                            <img src="/assets/img/illustration/4.png" alt="Image Not Found" />
                            <div className="info">
                                <h3>Instant Delivery to your Server</h3>
                                <p>
                                    Our automated systems ensure that your server boosts and Nitro orders are processed and delivered in record time.
                                </p>
                                <div className="text-end mt-80">
                                    <Link href="/server-boosts" className="btn btn-style-one border-light">Explore Boosts <i className="fas fa-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="card-style-one-two fade-up-anim mt-30">
                            <h4>Seamless Integration</h4>
                            <div className="bottom">
                                <img src="/assets/img/illustration/5.png" alt="Image Not Found" />
                                <div className="fun-fact">
                                    <div className="js-counter">28K</div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  End About  */}

        {/*  Start Process  */}
        <div className="process-style-one-area default-padding-top bg-theme text-light bg-cover" style={{backgroundImage: "url(/assets/img/shape/banner-6.jpg)"}}>
            <div className="shape">
                <img src="/assets/img/illustration/6.png" alt="Process" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 offset-xl-3 col-lg-8">
                        <div className="site-heading">
                            <h4 className="sub-title">How it works</h4>
                            <h2 className="title split-text-right split-text-in-right">Growing your server is as easy as 1-2-3</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="process-style-one-items">
                            {/*  Single Item  */}
                            <div className="process-style-one-item fade-up-anim">
                                <h2>01</h2>
                                <h4>Select Your Service</h4>
                                <p>
                                    Browse our extensive catalog of Discord services, including Server Boosts, Nitro, and Aged Accounts. Choose the package that fits your community&apos;s needs.
                                </p>
                            </div>
                            {/*  End Single Item  */}
                            {/*  Single Item  */}
                            <div className="process-style-one-item fade-up-anim">
                                <h2>02</h2>
                                <h4>Secure Checkout</h4>
                                <p>
                                    Complete your purchase using our secure payment gateways. We offer multiple payment methods to ensure a smooth and safe transaction process.
                                </p>
                            </div>
                            {/*  End Single Item  */}
                            {/*  Single Item  */}
                            <div className="process-style-one-item fade-up-anim">
                                <h2>03</h2>
                                <h4>Instant Delivery</h4>
                                <p>
                                    Sit back and relax as our automated systems deliver your order instantly. Watch your server level up and your community grow in real-time.
                                </p>
                            </div>
                            {/*  End Single Item  */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  End Process  */}

    </div>
    </>
  );
}
