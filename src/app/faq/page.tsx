import Link from 'next/link';
export default function Faq() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Important FAQs</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Faq</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/*  End Breadcrumb  */}

    <div id="smooth-content">
        {/*  Start Faq  */}
        <div className="faq-style-one-area accordion-secondary blurry-shape-right-bottom default-padding bg-gray" style={{backgroundImage: "url(/assets/img/shape/7.png)"}}>
            <div className="container">
                <div className="row">
                    <div className="col-xl-5 col-lg-6">
                        <div className="faq-style-one-info">
                            <h4 className="sub-title">Questions & Answers</h4>
                            <h2 className="title split-text-right split-text-in-right">Have queries about our Discord Services?</h2>
                            <Link href="/contact-us" className="btn btn-style-one btn-dark mt-10 wow fadeInUp" data-wow-delay="100ms">Ask A Question <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="col-xl-6 offset-xl-1 col-lg-6">
                        <div className="accordion-style-one-items fade-up-anim">
                            <div className="accordion" id="faqAccordion">
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            How long does a Server Boost take to deliver?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                Our delivery is completely automated. Most Server Boosts and Nitro orders are delivered instantly upon successful payment. In rare cases, it might take up to 10 minutes during high volume periods.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            Are the aged accounts secure and verified?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                Yes! All our aged accounts are fully Phone & Email verified. They come with original email access and have clean standing, ensuring you get the highest quality accounts without the risk of instant bans.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Do you offer refunds if a service drops?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                Absolutely. We offer a solid warranty period on our boosts and members. If you experience any drops within the warranty timeframe, simply reach out to our support team and we will refill or refund based on our policy.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            How do Discord Server Members work and are they safe?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                Our Server Members service adds high-quality, realistic members to your community. We use secure and natural delivery patterns that fully comply with Discord's guidelines, ensuring your server remains safe and clean.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            What is the difference between Nitro Boost, Nitro Basic, and Nitro Accounts?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                Nitro Boost provides premium Discord features including 2 monthly server boosts. Nitro Basic offers custom emojis and basic Nitro perks without boosts. Nitro Accounts are ready-made, pre-configured accounts containing an active Nitro subscription.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingSix">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                            How do profile Decorations and Promo codes work?
                                        </button>
                                    </h2>
                                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="headingSix" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                Decorations and Promo codes are delivered as gift links or codes. You can redeem them instantly on your personal account to style your profile or enjoy promotional Discord benefits.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingSeven">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
                                            What payment methods do you accept?
                                        </button>
                                    </h2>
                                    <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="headingSeven" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                We accept multiple secure payment options, including major Credit/Debit cards, PayPal, and cryptocurrencies like Bitcoin, Ethereum, and USDT to ensure a safe checkout process.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-style-one-item">
                                    <h2 className="accordion-header" id="headingEight">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
                                            Is my account safe from getting banned?
                                        </button>
                                    </h2>
                                    <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="headingEight" data-bs-parent="#faqAccordion">
                                        <div className="accordion-body">
                                            <p>
                                                Yes, absolutely. All ZoroBoost services are developed and delivered with security as a priority. We do not require your account password for boosts, decorations, or member services, keeping your login credentials 100% private.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  End Faq  */}
    </div>
    </>
  );
}
