import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import SearchBox from '@/components/SearchBox';


export default async function Home() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });

  return (
    <>
      {/* [if lte IE 9]>
          <p className="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
      <![endif] */}

      <div id="smooth-content">

          {/*  Start Banner Area 
          =============================================  */}
          <div className="banner-style-five-area text-center bg-theme text-light bg-cover" style={{"backgroundImage":"url(assets/img/shape/banner-17.jpg)"}}>
              <div className="container">
                  <div className="row align-center">
                      <div className="col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                          <div className="banner-style-five-items">
                              <h2>Power Up Your Discord Community</h2>
                              <p>
                                  Premium Discord services designed to help your server grow faster with reliable delivery and trusted support.
                              </p>
                              <SearchBox />
                              <div className="search-tags mt-40">
                                  <h5>Popular Search:</h5>
                                  <ul>
                                      <li><Link href="/aged-accounts">aged accounts</Link></li>
                                      <li><Link href="/server-boosts">server boost</Link></li>
                                      <li><Link href="/server-members">server members</Link></li>
                                      <li><Link href="/nitro-boost">nitro</Link></li>
                                      <li><Link href="/promo">promo</Link></li>
                                      <li><Link href="/decoration">decoration</Link></li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*  End Main  */}

          {/*  Start Promotion Brand
          =============================================  */}
          <div className="promotion-brand-area relative overflow-hidden default-padding">
              <div className="promotional-brand-one bg-gradient text-light">
                  <div className="brand-items">
                      <div className="brand-content">
                          <div className="item">
                              <h2>aged&nbsp;account</h2>
                          </div>
                          <div className="item">
                              <h2>server&nbsp;boosts</h2>
                          </div>
                          <div className="item">
                              <h2>server&nbsp;members</h2>
                          </div>
                          <div className="item">
                              <h2>nitro&nbsp;accounts</h2>
                          </div>
                      </div>
                      <div className="brand-content">
                          <div className="item">
                              <h2>aged&nbsp;account</h2>
                          </div>
                          <div className="item">
                              <h2>server&nbsp;boosts</h2>
                          </div>
                          <div className="item">
                              <h2>server&nbsp;members</h2>
                          </div>
                          <div className="item">
                              <h2>nitro&nbsp;accounts</h2>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="promotional-brand-one bg-dark text-light">
                  <div className="brand-items">
                      <div className="brand-content">
                          <div className="item">
                              <h2>nitro&nbsp;basic</h2>
                          </div>
                          <div className="item">
                              <h2>Promo</h2>
                          </div>
                          <div className="item">
                              <h2>decoration</h2>
                          </div>
                          <div className="item">
                              <h2>nitro&nbsp;boost</h2>
                          </div>
                      </div>
                      <div className="brand-content">
                          <div className="item">
                              <h2>nitro&nbsp;basic</h2>
                          </div>
                          <div className="item">
                              <h2>Promo</h2>
                          </div>
                          <div className="item">
                              <h2>decoration</h2>
                          </div>
                          <div className="item">
                              <h2>nitro&nbsp;boost</h2>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*  End Promotion Brand  */}

          {/*  Start About 
          =============================================  */}
          <div className="about-style-four-area default-padding-bottom">
              <div className="container">
                  <div className="row">
                      <div className="col-xl-7">
                          <div className="about-style-four-info">
                              <h4 className="sub-title">About ZoroBoost</h4>
                              <h2 className="title">Power up your Discord community with ZoroBoost</h2>
                              <p>
                                  ZoroBoost provides premium Discord services designed to help communities grow faster and perform better. From Server Boosts and Members to Nitro products, Aged Accounts, and Decorations, we deliver reliable solutions trusted by Discord users worldwide.
                              </p>
                              <div className="faq-card mt-50">
                                  <div className="thumb">
                                      <img src="/ZoroBoost/564X475.png" alt="ZoroBoost Services" />
                                  </div>
                                  <div className="faq-style-two-items">
                                      <div className="accordion" id="faqAccordion">
                                          <div className="accordion-item faq-style-two">
                                              <h2 className="accordion-header" id="headingOne">
                                                  <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                      Premium Services
                                                  </button>
                                              </h2>
                                              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                                                  <div className="accordion-body">
                                                      <p>
                                                          Access a complete range of Discord growth solutions with fast delivery, secure payments, and professional support for every order.
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="accordion-item faq-style-two">
                                              <h2 className="accordion-header" id="headingTwo">
                                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                      Trusted Support
                                                  </button>
                                              </h2>
                                              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                                                  <div className="accordion-body">
                                                      <p>
                                                          Our dedicated team is available to assist customers and ensure a smooth experience from purchase to delivery.
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="accordion-item faq-style-two">
                                              <h2 className="accordion-header" id="headingThree">
                                                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                      Secure Experience
                                                  </button>
                                              </h2>
                                              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                                                  <div className="accordion-body">
                                                      <p>
                                                          We prioritize customer satisfaction, account security, and reliable service quality across all our offerings.
                                                      </p>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div className="col-xl-4 offset-xl-1">
                          <div className="about-four-right-info">
                              <div className="thumb">
                                  <img src="/ZoroBoost/700X700.png" alt="ZoroBoost Features" />
                              </div>

                              <ul className="social-list">
                                  <li>
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color="#6366f1" width="24px" height="24px"><path fill="currentColor" d="M 21 10 L 21 19 C 21 20.105 20.105 21 19 21 L 5 21 C 3.895 21 3 20.105 3 19 L 3 10 L 21 10 Z" opacity=".3"/><path fill="currentColor" d="M 20 3 C 21.105 3 22 3.895 22 5 L 22 8 L 2 8 L 2 5 C 2 3.895 2.895 3 4 3 L 20 3 Z"/><path fill="currentColor" d="M 14 13 L 10 13 C 9.23 13 8.749 13.833 9.134 14.5 C 9.313 14.809 9.643 15 10 15 L 14 15 C 14.77 15 15.251 14.167 14.866 13.5 C 14.687 13.191 14.357 13 14 13 Z"/></svg> Fast Delivery
                                  </li>
                                  <li>
                                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color="#6366f1" width="24px" height="24px"><path fill="currentColor" d="M 22 10 L 22 17 C 22 18.657 20.657 20 19 20 L 5 20 C 3.343 20 2 18.657 2 17 L 2 10 L 22 10 Z" opacity=".3"/><path fill="currentColor" d="M 19 4 C 20.657 4 22 5.343 22 7 L 22 8 L 2 8 L 2 7 C 2 5.343 3.343 4 5 4 L 19 4 Z"/><path fill="currentColor" d="M 18 14 L 15 14 C 14.23 14 13.749 14.833 14.134 15.5 C 14.313 15.809 14.643 16 15 16 L 18 16 C 18.77 16 19.251 15.167 18.866 14.5 C 18.687 14.191 18.357 14 18 14 Z"/></svg> Secure Payments
                                  </li>
                                  <li>
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" color="#6366f1" width="24px" height="24px"><path fill="currentColor" d="M 2 6 C 2 4.343 3.343 3 5 3 L 19 3 C 20.657 3 22 4.343 22 6 L 22 16 C 22 17.657 20.657 19 19 19 L 7.333 19 L 4 21.5 C 3.176 22.118 2 21.53 2 20.5 L 2 6 Z" opacity=".3" fillRule="evenodd"/><path fill="currentColor" d="M 8 12 C 7.23 12 6.749 12.833 7.134 13.5 C 7.313 13.809 7.643 14 8 14 L 11 14 C 11.77 14 12.251 13.167 11.866 12.5 C 11.687 12.191 11.357 12 11 12 L 8 12 Z" fillRule="evenodd"/><path fill="currentColor" d="M 7 9 C 7 8.448 7.448 8 8 8 L 16 8 C 16.77 8 17.251 8.833 16.866 9.5 C 16.687 9.809 16.357 10 16 10 L 8 10 C 7.448 10 7 9.552 7 9 Z" fillRule="evenodd"/></svg> 24/7 Support
                                  </li>
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*  End About  */}

          {/*  Start What We Do
          =============================================  */}
          <div className="services-style-two-area default-padding bg-gray blurry-shape-right-bottom">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-8 offset-lg-2">
                          <div className="site-heading text-center">
                              <h4 className="sub-title">What we do</h4>
                              <h2 className="title split-text-right split-text-in-right">Discord-optimized services for growing communities</h2>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="container">
                  <div className="row">
                      <div className="col-xl-5">
                          <div className="services-style-two-colum-large text-light fade-up-anim" style={{backgroundImage: "url(/assets/img/shape/banner-8.jpg)"}}>
                              <h3 className="text-end"><a href="#">Grow your server <br /> faster with boosts</a></h3>
                              <ul className="service-list mt-70 mt-xs-30">
                                  <li>
                                      <div className="icon">
                                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color="#6366f1" width="40px" height="40px"><path fill="currentColor" d="M 18.165 2.765 L 18.42 2.7969999999999997 C 19.094 2.89 19.986 3.015 20.491 3.521 C 20.905 3.934 21.064 4.606 21.159 5.206 L 21.215 5.592 C 21.341 6.502 21.374 7.694 21.159 9.018 C 20.735 11.631 19.344 14.749 15.851 17.163 C 15.832 17.351 15.831 17.541 15.835 17.731 L 15.845 18.015 C 15.861 18.452 15.877 18.888 15.755 19.313 C 15.565 19.973 14.888 20.408 14.255 20.72 L 13.945 20.867 L 13.545 21.043 C 12.797 21.361 11.786999999999999 21.687 11.154 21.053 C 10.774000000000001 20.674 10.618 20.118 10.491 19.565 L 10.444 19.358 C 10.391 19.097 10.324 18.838 10.244 18.584 C 10.194 18.438 10.14 18.289 10.082 18.139 C 10.018 18.217 9.95 18.292 9.879 18.364 C 9.534 18.709 9.019 18.95 8.595 19.119 C 8.132 19.302 7.608 19.462 7.123 19.594 L 6.8740000000000006 19.66 L 6.397 19.779 L 5.965 19.879 L 5.448 19.989 L 5.125 20.052 C 4.428 20.181 3.819 19.572 3.948 18.875 L 4.034 18.444 L 4.188 17.746 L 4.312 17.236 L 4.406 16.876 C 4.538 16.392 4.698 15.868 4.882 15.406 C 5.05 14.981 5.291 14.466 5.636 14.121 L 5.716 14.044 L 5.652 14.018 C 5.481 13.953 5.308 13.894 5.133 13.841 L 4.856 13.756 C 4.162 13.546 3.42 13.32 2.959 12.858 C 2.399 12.299 2.588 11.448 2.858 10.74 L 2.968 10.466 L 3.145 10.066 L 3.292 9.756 C 3.604 9.124 4.039 8.447 4.699 8.257 C 5.049 8.157 5.413 8.151 5.779 8.161 L 5.999 8.168 C 6.285 8.178 6.57 8.189 6.849 8.162 C 9.263 4.668 12.381 3.277 14.994 2.853 C 16.042 2.681 17.109 2.651 18.165 2.765 Z" fillRule="evenodd" opacity=".3"/><path fill="currentColor" d="M 15.536 8.466 C 14.448 7.377 12.588 7.875 12.19 9.362 C 12.005 10.052 12.202 10.789 12.707 11.294 C 13.795 12.383 15.655 11.885 16.053 10.398 C 16.238 9.708 16.041 8.971 15.536 8.466 Z" fillRule="evenodd"/><path fill="currentColor" d="M 8.353 15.44 C 8.031 15.202 7.599 15.178 7.253 15.38 L 7.143 15.454 L 7.05 15.537 L 6.925 15.695 C 6.665 16.071 6.517 16.591 6.402 17.077 L 6.2940000000000005 17.545 L 6.243 17.758 L 6.434 17.712 L 6.852 17.616 C 7.43 17.481 8.071 17.306 8.465 16.951 C 8.819 16.597 8.857 16.035 8.553 15.637 L 8.471 15.543 L 8.447 15.52 L 8.353 15.44 Z" fillRule="evenodd"/></svg>
                                      </div>
                                      <div className="info">
                                          <h4><a href="#">Server Boosts</a></h4>
                                          <p>
                                              Instantly boost your Discord server to unlock perks, better audio, and custom features.
                                          </p>
                                      </div>
                                  </li>
                                  <li>
                                      <div className="icon">
                                          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" color="#6366f1" width="40px" height="40px"><path fill="currentColor" d="M 12 13 C 14.396 13 16.575 13.693999999999999 18.178 14.671 C 18.978 15.161 19.662 15.736 20.156 16.361 C 20.642 16.977 21 17.713 21 18.5 C 21 19.345 20.589 20.011 19.997 20.486 C 19.437 20.936 18.698 21.234 17.913 21.442 C 16.335 21.859 14.229 22 12 22 C 9.771 22 7.665 21.86 6.087 21.442 C 5.302 21.234 4.563 20.936 4.003 20.486 C 3.41 20.01 3 19.345 3 18.5 C 3 17.713 3.358 16.977 3.8440000000000003 16.361 C 4.338 15.736 5.021 15.161 5.822 14.671 C 7.425 13.693999999999999 9.605 13 12 13 Z"/><path fill="currentColor" d="M 12 2 C 15.849 2 18.255 6.167 16.33 9.5 C 15.437 11.047 13.786 12 12 12 C 8.151 12 5.745 7.833 7.67 4.5 C 8.563 2.9530000000000003 10.214 2 12 2 Z" opacity=".3"/></svg>
                                      </div>
                                      <div className="info">
                                          <h4><a href="#">Server Members</a></h4>
                                          <p>
                                              Grow your community with active server members delivered quickly and reliably.
                                          </p>
                                      </div>
                                  </li>
                              </ul>
                          </div>
                      </div>
                      <div className="col-xl-7">
                          <div className="services-style-two-items fade-up-anim">
                              {/*  Single Item  */}
                              <div className="services-style-two-item">
                                  <div className="top-info">
                                      <img src="/assets/img/icon/discord-3d-ball.png" alt="Discord" style={{width:"105px", height:"105px", objectFit:"contain", display:"block"}} />
                                      <h4><a href="#">Nitro &amp; Account <br /> Services</a></h4>
                                      <ul className="list-style-one">
                                          <li>Nitro Boost &amp; Nitro Basic</li>
                                          <li>Nitro Accounts</li>
                                          <li>Aged Accounts</li>
                                      </ul>
                                  </div>
                                  <a href="#" className="btn-simple">Explore More <i className="fas fa-long-arrow-right"></i></a>
                              </div>
                              {/*  End Single Item  */}
                              {/*  Single Item  */}
                              <div className="services-style-two-item fade-up-anim">
                                  <div className="top-info">
                                      <img src="/assets/img/icon/6.png" alt="Icon" />
                                      <h4><a href="#">Decoration &amp; <br /> Promo Services</a></h4>
                                      <ul className="list-style-one">
                                          <li>Custom Decorations</li>
                                          <li>Promo Services</li>
                                          <li>Profile Enhancements</li>
                                      </ul>
                                  </div>
                                  <div className="bottom">
                                      <div className="fun-fact">
                                          <div className="js-counter">50K+</div>
                                          <h5>Happy Customers</h5>
                                      </div>
                                  </div>
                              </div>
                              {/*  End Single Item  */}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*  End What We Do  */}

          {/*  Start Pricing 
          =============================================  */}
          <div className="pricing-style-two-area default-padding bottom-less">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-8 offset-lg-2">
                          <div className="site-heading text-center">
                              <h4 className="sub-title">Pricing Plan</h4>
                              <h2 className="title split-text-right split-text-in-right">Affordable excellence deals at best prices & savings!</h2>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="container">
                  <div className="pricing-style-four-items">
                      <div className="row">
                          <div className="col-xl-12">
                              <div className="row">
                                  {products?.map((product) => (
                                    <div key={product.id} className="col-xl-4 col-lg-6 col-md-6 mb-30">
                                        <div className="pricing-style-two">
                                            {product.discount_value > 0 && (
                                              <span className="badge"><i className="fas fa-fire"></i> {product.discount_type === 'Percentage (%)' ? `${product.discount_value}% Off` : `$${product.discount_value} Off`}</span>
                                            )}
                                            <h3>{product.title}</h3>
                                            <div className="pricing">
                                                <h1>${product.price}</h1> <span>{product.category}</span>
                                            </div>
                                            <a className="btn btn-style-one btn-border mt-30" href={`/product/${product.id}`}>Get Started <i className="fas fa-arrow-right"></i></a>
                                            <ul className="list-style-two">
                                                <li><i className="fas fa-check"></i> {product.delivery_method}</li>
                                                <li><i className="fas fa-check"></i> {product.delivery_time}</li>
                                                <li><i className="fas fa-check"></i> {product.status}</li>
                                            </ul>
                                        </div>
                                    </div>
                                  ))}
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*  End Pricing  */}

          {/*  Start Testimonials 
          =============================================  */}
          <div className="testimonial-style-two-area default-padding bg-gray bg-cover" style={{"background":"url(assets/img/shape/banner-16.jpg)"}}>
              <div className="container">
                  <div className="row">
                      <div className="col-lg-8 offset-lg-2">
                          <div className="site-heading text-center">
                              <h4 className="sub-title">Testimonials</h4>
                              <h2 className="title split-text-right split-text-in-right">Real success stories from our AI clients worldwide</h2>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="container">
                  <div className="row">
                      <div className="col-lg-8 offset-lg-2">
                          <div className="testimonial-style-two-items text-center fade-up-anim">
                              <div className="testimonial-style-two-carousel swiper">
                                  {/*  Additional required wrapper  */}
                                  <div className="swiper-wrapper">
                                      {/*  Single item  */}
                                      <div className="swiper-slide">
                                          <div className="testimonial-style-two">
                                              <div className="item">
                                                  <div className="content">
                                                      <div className="rating">
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                      </div>
                                                      <p>
                                                          “Targetingconsultation discover apartments. ndulgence off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now always remembering”
                                                      </p>
                                                  </div>
                                                  <div className="provider">
                                                      <div className="icon">
                                                          <img src="/assets/img/icon/quote.png" alt="Image Not Found" />
                                                      </div>
                                                      <div className="info">
                                                          <h4>Matthew J. Wyman</h4>
                                                          <span>AI Developer</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      {/*  End Single item  */}
                                      {/*  Single item  */}
                                      <div className="swiper-slide">
                                          <div className="testimonial-style-two">
                                              <div className="item">
                                                  <div className="content">
                                                      <div className="rating">
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                          <i className="fas fa-star"></i>
                                                      </div>
                                                      <p>
                                                          “Consultation discover apartments. ndulgence off under folly death wrote cause her way spite. Plan upon yet way get cold spot its week. Almost do am or limits hearts. Resolve parties but why she shewing. She sang know now always remembering to the point”
                                                      </p>
                                                  </div>
                                                  <div className="provider">
                                                      <div className="icon">
                                                          <img src="/assets/img/icon/quote.png" alt="Image Not Found" />
                                                      </div>
                                                      <div className="info">
                                                          <h4>Anthom Bu Spar</h4>
                                                          <span>Tech Engineer</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                      {/*  End Single item  */}
                                  </div>

                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="row">
                      <div className="col-lg-10 offset-lg-1">
                          <div className="testimonial-provider-thumbs transform-up-animation">
                              <div className="testimonial-provider-item transform-animation-item">
                                  <img src="/users/5.jpg" alt="Image Not Found" />
                              </div>
                              <div className="testimonial-provider-item transform-animation-item">
                                  <img src="/users/6.jpg" alt="Image Not Found" />
                              </div>
                              <div className="testimonial-provider-item transform-animation-item">
                                  <img src="/users/9.jpg" alt="Image Not Found" />
                                  <img src="/users/2.jpg" alt="Image Not Found" />
                              </div>
                              <div className="testimonial-provider-item transform-animation-item">
                                  <img src="/users/3.jpg" alt="Image Not Found" />
                                  <img src="/users/10.jpg" alt="Image Not Found" />
                              </div>
                              <div className="testimonial-provider-item transform-animation-item">
                                  <img src="/users/7.jpg" alt="Image Not Found" />
                              </div>
                              <div className="testimonial-provider-item transform-animation-item">
                                  <img src="/users/8.jpg" alt="Image Not Found" />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {/*  End Testimonials  */}


          {/*  Start Blog 
          =============================================  */}
          <div className="home-blog-area default-padding">
              <div className="container">
                  <div className="row">
                      <div className="col-lg-8 offset-lg-2">
                          <div className="site-heading text-center">
                              <h4 className="sub-title">Latest Blog</h4>
                              <h2 className="title split-text-right split-text-in-right">News & Update</h2>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="container">
                  <div className="row">
                      <div className="col-lg-10 offset-lg-1">
                          {/*  Single Item  */}
                          <div className="blog-style-one fade-up-anim">
                              <div className="thumb zoom-thumb">
                                  <Link href="/blog/zooro-boost-discord-aged-account-service"><img className="img-reveal" src="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/blog/zoroboost-guide.png" alt="Thumb" /></Link>
                              </div>
                              <div className="info">
                                  <div className="blog-one-meta">
                                      <ul>
                                          <li>
                                              <Link href="/blog">Discord</Link>
                                          </li>
                                          <li>
                                              26 June, 2026
                                          </li>
                                      </ul>
                                  </div>
                                  <h2 className="blog-title">
                                      <Link href="/blog/zooro-boost-discord-aged-account-service">Zooro Boost – What Is a Discord Aged Account Service, Server Boosts for Discord, and Discord Decorations?</Link>
                                  </h2>
                                  <Link href="/blog/zooro-boost-discord-aged-account-service" className="btn-simple">Explore More <i className="fas fa-long-arrow-right"></i></Link>
                              </div>
                          </div>
                          {/*  End Single Item  */}
                          {/*  Single Item  */}
                          <div className="blog-style-one fade-up-anim">
                              <div className="thumb zoom-thumb">
                                  <Link href="/blog/discord-server-boosts-explained"><img className="img-reveal" src="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/blog/discord-server-boost.png" alt="Thumb" /></Link>
                              </div>
                              <div className="info">
                                  <div className="blog-one-meta">
                                      <ul>
                                          <li>
                                              <Link href="/blog">Server Boosts</Link>
                                          </li>
                                          <li>
                                              27 June, 2026
                                          </li>
                                      </ul>
                                  </div>
                                  <h2 className="blog-title">
                                      <Link href="/blog/discord-server-boosts-explained">Discord Server Boosts Explained: Are They Worth It for Growing Communities?</Link>
                                  </h2>
                                  <Link href="/blog/discord-server-boosts-explained" className="btn-simple">Explore More <i className="fas fa-long-arrow-right"></i></Link>
                              </div>
                          </div>
                          {/*  End Single Item  */}
                          {/*  Single Item  */}
                          <div className="blog-style-one fade-up-anim">
                              <div className="thumb zoom-thumb">
                                  <Link href="/blog/how-to-protect-discord-server-from-raids"><img className="img-reveal" src="https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/blog/protect-discord-raids.png" alt="Thumb" /></Link>
                              </div>
                              <div className="info">
                                  <div className="blog-one-meta">
                                      <ul>
                                          <li>
                                              <Link href="/blog">Security</Link>
                                          </li>
                                          <li>
                                              28 June, 2026
                                          </li>
                                      </ul>
                                  </div>
                                  <h2 className="blog-title">
                                      <Link href="/blog/how-to-protect-your-discord-server-from-raids">How to Protect Your Discord Server from Raids</Link>
                                  </h2>
                                  <Link href="/blog/how-to-protect-your-discord-server-from-raids" className="btn-simple">Explore More <i className="fas fa-long-arrow-right"></i></Link>
                              </div>
                          </div>
                          {/*  End Single Item  */}
                      </div>
                  </div>
              </div>
          </div>
          {/*  End Blog   */}

      </div>

    </>
  );
}
