const fs = require('fs');
const path = require('path');

const pagePath = path.join(__dirname, 'src', 'app', 'page.tsx');
let content = fs.readFileSync(pagePath, 'utf8');

// 1. Add imports and make Home async
if (!content.includes('import { createClient }')) {
  content = `import { createClient } from '@/utils/supabase/server';\n` + content;
}
content = content.replace('export default function Home() {', 'export default async function Home() {');

// 2. Add fetching logic inside Home
if (!content.includes('const supabase = await createClient();')) {
  content = content.replace(
    'export default async function Home() {\n  return (',
    `export default async function Home() {\n  const supabase = await createClient();\n  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });\n  const { data: posts } = await supabase.from('posts').select('*').order('created_at', { ascending: false });\n\n  return (`
  );
}

// 3. Replace the pricing items
const pricingStart = content.indexOf('<div className="pricing-style-four-items">');
const pricingEnd = content.indexOf('</div>\n            </div>\n        </div>\n        {/*  End Pricing', pricingStart);

if (pricingStart !== -1 && pricingEnd !== -1) {
  const newPricing = `<div className="pricing-style-four-items">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="tab-content pricing-tab-content text" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="nav-id-1">
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
                    </div>`;
  content = content.substring(0, pricingStart) + newPricing + content.substring(pricingEnd);
}

// 4. Replace the Blog items
const blogStart = content.indexOf('<div className="row">\n                    {/* Single Item */}');
const blogEndStr = '</div>\n            </div>\n        </div>\n        {/* End Blog Area';
const blogEnd = content.indexOf(blogEndStr, blogStart);

if (blogStart !== -1 && blogEnd !== -1) {
  const newBlog = `<div className="row">
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
`;
  content = content.substring(0, blogStart) + newBlog + content.substring(blogEnd);
}

fs.writeFileSync(pagePath, content);
console.log('Successfully updated page.tsx');
