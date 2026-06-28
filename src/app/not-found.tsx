import Link from 'next/link';

export default function NotFound() {
  return (
    <>
    {/*  Start Breadcrumb  */}
    <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{backgroundImage: "url(/assets/img/shape/banner-14.jpg)"}}>
        <div className="container">
            <div className="row">
                <div className="col-lg-8 offset-lg-2">
                    <h1>Error Page</h1>
                    <ul className="breadcrumb">
                        <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                        <li>404</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    {/*  End Breadcrumb  */}

    <div id="smooth-content">
        {/*  Start 404  */}
        <div className="error-page-area default-padding text-center bg-cover">
            {/*  Shape  */}
            <div className="shape-left" style={{background: "url(/assets/img/shape/44-left.png)"}}></div>
            <div className="shape-right" style={{background: "url(/assets/img/shape/44-right.png)"}}></div>
            {/*  End Shape  */}
            <div className="container">
                <div className="error-box">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2">
                            <h1>404</h1>
                            <h2>Sorry, This Channel Was Not Found!</h2>
                            <p>
                                It looks like the Discord service, account, or page you were looking for doesn&apos;t exist anymore. Let&apos;s get you back to boosting!
                            </p>
                            <Link className="btn mt-20 btn btn-style-one" href="/">Back to home <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/*  End 404  */}
    </div>
    </>
  );
}
