import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

const categorySlugMap: Record<string, { title: string; dbCategories: string[] }> = {
  'aged-accounts': {
    title: 'Aged Accounts',
    dbCategories: ['Aged Accounts', 'Aged Account']
  },
  'server-boosts': {
    title: 'Server Boosts',
    dbCategories: ['Server Boost', 'Server Boosts', 'Server Booster']
  },
  'decoration': {
    title: 'Decorations',
    dbCategories: ['Discord Decoration', 'Decoration', 'Decorations']
  },
  'nitro-boost': {
    title: 'Nitro Boost',
    dbCategories: ['Nitro Boost', 'Nitro Booster']
  },
  'server-members': {
    title: 'Server Members',
    dbCategories: ['Server Members', 'Server Member']
  },
  'promo': {
    title: 'Promotions',
    dbCategories: ['Discord Promo', 'Promo', 'Promos']
  },
  'nitro-accounts': {
    title: 'Nitro Accounts',
    dbCategories: ['Nitro Account', 'Nitro Accounts']
  },
  'nitro-basic': {
    title: 'Nitro Basic',
    dbCategories: ['Nitro Basic']
  }
};

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const mappedCategory = categorySlugMap[category];

  if (!mappedCategory) {
    notFound();
  }

  const supabase = await createClient();
  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .in('category', mappedCategory.dbCategories)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products by category:', error);
  }

  return (
    <>
      {/* Start Breadcrumb */}
      <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{ backgroundImage: "url(/assets/img/shape/banner-14.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>{mappedCategory.title}</h1>
              <ul className="breadcrumb">
                <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                <li>{mappedCategory.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb */}

      {/* Start Product List */}
      <div className="pricing-style-two-area default-padding bottom-less">
        <div className="container">
          <div className="pricing-style-four-items">
            <div className="row">
              <div className="col-xl-12">
                {products && products.length > 0 ? (
                  <div className="row">
                    {products.map((product) => (
                      <div key={product.id} className="col-xl-3 col-lg-4 col-md-6 mb-30">
                        <div className="premium-card">
                          <div className="premium-card-header">
                            {product.badge_text && (
                              <span className="premium-card-badge-popular">
                                <i className="fas fa-star"></i> {product.badge_text}
                              </span>
                            )}
                            <div className="premium-card-heart">
                              <i className="far fa-heart"></i>
                            </div>
                          </div>
                          
                          {product.media_url && (
                            <div className="premium-card-thumb-wrapper">
                              <img src={product.media_url} alt={product.title} />
                            </div>
                          )}

                          <h3 className="premium-card-title">{product.title}</h3>
                          
                          <div className="premium-card-divider">
                            <i className="fas fa-star"></i>
                          </div>

                          <div className="premium-card-price">
                            <span className="currency">$</span>{product.price}
                          </div>

                          <span className="premium-card-category">
                            <i className="fab fa-discord"></i> {product.category}
                          </span>

                          <p className="premium-card-desc">
                            {product.description}
                          </p>

                          <ul className="premium-card-features">
                            <li className="premium-card-feature-item">
                              <div className="premium-card-feature-left">
                                <div className="premium-card-feature-icon-wrapper">
                                  <i className="fas fa-gift"></i>
                                </div>
                                <span className="premium-card-feature-text">{product.delivery_method}</span>
                              </div>
                              <i className="fas fa-gift premium-card-feature-watermark"></i>
                            </li>
                            <li className="premium-card-feature-item">
                              <div className="premium-card-feature-left">
                                <div className="premium-card-feature-icon-wrapper">
                                  <i className="fas fa-bolt"></i>
                                </div>
                                <span className="premium-card-feature-text">{product.delivery_time}</span>
                              </div>
                              <i className="fas fa-bolt premium-card-feature-watermark"></i>
                            </li>
                            <li className="premium-card-feature-item">
                              <div className="premium-card-feature-left">
                                <div className="premium-card-feature-icon-wrapper">
                                  <i className="fas fa-check-circle"></i>
                                </div>
                                <span className="premium-card-feature-text">{product.status || 'Active'}</span>
                              </div>
                              <i className="fas fa-check-circle premium-card-feature-watermark"></i>
                            </li>
                          </ul>

                          <Link className="premium-card-btn" href={`/product/${product.id}`}>
                            Get Started <i className="fas fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-box-open mb-3" style={{ fontSize: '48px', color: 'var(--t-muted)' }}></i>
                    <h3>No Products Found</h3>
                    <p className="text-muted">We currently don't have any products listed in this category. Check back soon!</p>
                    <Link href="/" className="btn btn-style-one mt-3">Back to Home</Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Product List */}
    </>
  );
}
