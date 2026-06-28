import Link from 'next/link';
export default function Blog() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Discord Growth Blog</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>Blog</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/*  End Breadcrumb  */}

    {/*  Start Blog  */}
    <div className="blog-area blog-grid default-padding">
        <div className="container">
            <div className="blog-item-box">
                <div className="row">
                    {/*  Single Item  */}
                    <div className="col-xl-4 col-lg-6 col-md-6 mb-50">
                        <div className="blog-style-two fade-up-anim">
                            <div className="thumb">
                                <Link href="/blog/zooro-boost-discord-aged-account-service"><img src="/assets/img/blog/zoroboost-guide.png" alt="Thumb" /></Link>
                            </div>
                            <div className="info">
                                <div className="blog-one-meta">
                                    <ul>
                                        <li>
                                            <a href="#">Discord</a>
                                        </li>
                                        <li>
                                            26 June, 2026
                                        </li>
                                    </ul>
                                </div>
                                <h4 className="blog-title">
                                    <Link href="/blog/zooro-boost-discord-aged-account-service">Zooro Boost – What Is a Discord Aged Account Service, Server Boosts for Discord, and Discord Decorations?</Link>
                                </h4>
                                <Link href="/blog/zooro-boost-discord-aged-account-service" className="btn-simple">
                                    Read More <i className="fas fa-long-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/*  End Single Item  */}
                    {/*  Single Item  */}
                    <div className="col-xl-4 col-lg-6 col-md-6 mb-50">
                        <div className="blog-style-two fade-up-anim">
                            <div className="thumb">
                                <Link href="/blog/discord-server-boosts-explained"><img src="/assets/img/blog/discord-server-boost.png" alt="Thumb" /></Link>
                            </div>
                            <div className="info">
                                <div className="blog-one-meta">
                                    <ul>
                                        <li>
                                            <a href="#">Server Boosts</a>
                                        </li>
                                        <li>
                                            27 June, 2026
                                        </li>
                                    </ul>
                                </div>
                                <h4 className="blog-title">
                                    <Link href="/blog/discord-server-boosts-explained">Discord Server Boosts Explained: Are They Worth It for Growing Communities?</Link>
                                </h4>
                                <Link href="/blog/discord-server-boosts-explained" className="btn-simple">
                                    Read More <i className="fas fa-long-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/*  End Single Item  */}
                    {/*  Single Item  */}
                    <div className="col-xl-4 col-lg-6 col-md-6 mb-50">
                        <div className="blog-style-two fade-up-anim">
                            <div className="thumb">
                                <Link href="/blog/how-to-protect-your-discord-server-from-raids"><img src="/assets/img/blog/protect-discord-raids.png" alt="Thumb" /></Link>
                            </div>
                            <div className="info">
                                <div className="blog-one-meta">
                                    <ul>
                                        <li>
                                            <a href="#">Security</a>
                                        </li>
                                        <li>
                                            28 June, 2026
                                        </li>
                                    </ul>
                                </div>
                                <h4 className="blog-title">
                                    <Link href="/blog/how-to-protect-your-discord-server-from-raids">How to Protect Your Discord Server from Raids</Link>
                                </h4>
                                <Link href="/blog/how-to-protect-your-discord-server-from-raids" className="btn-simple">
                                    Read More <i className="fas fa-long-arrow-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/*  End Single Item  */}
                </div>
            </div>
            
            {/*  Pagination  */}
            <div className="row">
                <div className="col-md-12 pagi-area text-center">
                    <nav aria-label="navigation">
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#"><i className="fas fa-angle-double-left"></i></a></li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#"><i className="fas fa-angle-double-right"></i></a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
    {/*  End Blog  */}
    </>
  );
}
