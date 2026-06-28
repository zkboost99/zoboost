const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// The file currently has a broken syntax `href={\`/product/\${product.id}\`}` inside the hardcoded items.
// We just want to replace the ENTIRE pricing section and blog section.
// Let's find the start and end of Pricing exactly.

const pricingStart = content.indexOf('{/*  Start Pricing');
const pricingEnd = content.indexOf('{/*  End Pricing', pricingStart);

if (pricingStart !== -1 && pricingEnd !== -1) {
  const newPricing = `{/*  Start Pricing 
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
                                            <span className="badge"><i className="fas fa-fire"></i> {product.discount_type === 'Percentage (%)' ? \`\${product.discount_value}% Off\` : \`$\${product.discount_value} Off\`}</span>
                                          )}
                                          <h3>{product.title}</h3>
                                          <div className="pricing">
                                              <h1>$\${product.price}</h1> <span>{product.category}</span>
                                          </div>
                                          <a className="btn btn-style-one btn-border mt-30" href={\`/product/\${product.id}\`}>Get Started <i className="fas fa-arrow-right"></i></a>
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
        `;
  content = content.substring(0, pricingStart) + newPricing + content.substring(pricingEnd);
}

// Same for Blog
const blogStart = content.indexOf('{/* Start Blog Area');
const blogEnd = content.indexOf('{/* End Blog Area', blogStart);

if (blogStart !== -1 && blogEnd !== -1) {
  const newBlog = `{/* Start Blog Area
        ============================================= */}
        <div className="blog-area home-blog default-padding bottom-less">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-heading text-center">
                            <h4 className="sub-title">Latest News</h4>
                            <h2 className="title split-text-right split-text-in-right">Check out our latest news & articles.</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    {posts?.map((post) => (
                      <div key={post.id} className="col-xl-4 col-md-6 mb-30">
                          <div className="blog-style-two">
                              <div className="thumb">
                                  <a href={\`/blog/\${post.id}\`}><img src={post.media_url || 'assets/img/blog/1.jpg'} alt="Image Not Found"/></a>
                              </div>
                              <div className="info">
                                  <div className="meta">
                                      <ul>
                                          <li><i className="fas fa-calendar-alt"></i> {new Date(post.publish_date || post.created_at).toLocaleDateString()}</li>
                                          <li><i className="fas fa-user-circle"></i> By <a href="#">{post.author}</a></li>
                                      </ul>
                                  </div>
                                  <h3 className="title">
                                      <a href={\`/blog/\${post.id}\`}>{post.title}</a>
                                  </h3>
                                  <p>{post.excerpt}</p>
                                  <a href={\`/blog/\${post.id}\`} className="button-regular">Continue Reading <i className="fas fa-arrow-right"></i></a>
                              </div>
                          </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
        `;
  content = content.substring(0, blogStart) + newBlog + content.substring(blogEnd);
}

fs.writeFileSync(pagePath, content);
console.log('Successfully completely fixed page.tsx');
