import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import ProductDescriptionSection from './ProductDescriptionSection';

export default async function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !product) {
    notFound();
  }


  // Dynamic 3 mini badge items helper based on product category
  const getMiniFeatures = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('boost')) {
      return [
        { icon: 'fas fa-gem', title: '14x', subtitle: 'Boosts' },
        { icon: 'fas fa-shield-alt', title: 'Level 3', subtitle: 'Features' },
        { icon: 'fas fa-bolt', title: 'Instant', subtitle: 'Delivery' }
      ];
    } else if (cat.includes('decoration')) {
      return [
        { icon: 'fas fa-paint-brush', title: 'Custom', subtitle: 'Decoration' },
        { icon: 'fas fa-user-circle', title: 'Profile', subtitle: 'Effects' },
        { icon: 'fas fa-bolt', title: 'Instant', subtitle: 'Delivery' }
      ];
    } else if (cat.includes('account')) {
      return [
        { icon: 'fas fa-history', title: 'Aged', subtitle: 'Accounts' },
        { icon: 'fas fa-unlock-alt', title: 'Full', subtitle: 'Access' },
        { icon: 'fas fa-bolt', title: 'Instant', subtitle: 'Delivery' }
      ];
    } else if (cat.includes('member')) {
      return [
        { icon: 'fas fa-users', title: 'High Quality', subtitle: 'Members' },
        { icon: 'fas fa-check-circle', title: 'No Drop', subtitle: 'Guarantee' },
        { icon: 'fas fa-bolt', title: 'Instant', subtitle: 'Delivery' }
      ];
    }
    return [
      { icon: 'fas fa-star', title: 'Premium', subtitle: 'Quality' },
      { icon: 'fas fa-shield-alt', title: '100% Safe', subtitle: 'Guarantee' },
      { icon: 'fas fa-bolt', title: 'Instant', subtitle: 'Delivery' }
    ];
  };

  const miniFeatures = getMiniFeatures(product.category);

  return (
    <>
      {/* Start Breadcrumb */}
      <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{ backgroundImage: "url(/assets/img/shape/banner-14.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>{product.title}</h1>
              <ul className="breadcrumb">
                <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                <li><Link href="/">Products</Link></li>
                <li>{product.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb */}

      {/* Start Product Details */}
      <div className="product-details-area default-padding bg-gray">
        <div className="container">
          <div className="row">
            {/* Left Card: Pedestal + Mini Grid */}
            <div className="col-lg-6 mb-md-50">
              <div className="premium-details-left-card">
                {product.badge_text && (
                  <span className="premium-details-left-badge">
                    <i className="fas fa-star"></i> {product.badge_text}
                  </span>
                )}
                
                <div className="premium-details-pedestal-wrapper">
                  <img src={product.media_url || '/assets/img/blog/1.jpg'} alt={product.title} />
                </div>

                <div className="premium-details-mini-grid">
                  {miniFeatures.map((feat, i) => (
                    <div key={i} className="premium-details-mini-item">
                      <div className="premium-details-mini-icon">
                        <i className={feat.icon}></i>
                      </div>
                      <div className="premium-details-mini-text">
                        <h5>{feat.title}</h5>
                        <span>{feat.subtitle}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Info: Product Specifications */}
            <div className="col-lg-6">
              <div className="product-info" style={{ padding: '10px 0 0 20px' }}>
                <span className="premium-details-category">
                  <i className="fab fa-discord"></i> {product.category}
                </span>
                
                <h2 className="premium-details-title">{product.title}</h2>
                
                <div className="premium-details-price">
                  <span className="currency">$</span>{product.price}
                </div>
                
                <div className="premium-details-divider">
                  <i className="fas fa-star"></i>
                </div>
                
                <ProductDescriptionSection product={product} />

                <ul className="premium-details-features" style={{ margin: '20px 0 30px' }}>
                  <li className="premium-details-feature-item">
                    <div className="premium-details-feature-left">
                      <div className="premium-details-feature-icon-wrapper">
                        <i className="fas fa-gift"></i>
                      </div>
                      <span className="premium-details-feature-text"><strong>Delivery Method:</strong> {product.delivery_method}</span>
                    </div>
                    <i className="fas fa-gift premium-card-feature-watermark"></i>
                  </li>
                  <li className="premium-details-feature-item">
                    <div className="premium-details-feature-left">
                      <div className="premium-details-feature-icon-wrapper">
                        <i className="fas fa-bolt"></i>
                      </div>
                      <span className="premium-details-feature-text"><strong>Delivery Time:</strong> {product.delivery_time}</span>
                    </div>
                    <i className="fas fa-bolt premium-card-feature-watermark"></i>
                  </li>
                  <li className="premium-details-feature-item">
                    <div className="premium-details-feature-left">
                      <div className="premium-details-feature-icon-wrapper">
                        <i className="fas fa-check-circle"></i>
                      </div>
                      <span className="premium-details-feature-text"><strong>Status:</strong> {product.status || 'Active'}</span>
                    </div>
                    <i className="fas fa-check-circle premium-card-feature-watermark"></i>
                  </li>
                </ul>

                <Link className="premium-details-buy-btn" href="/contact-us">
                  <i className="fas fa-shopping-cart"></i> Buy Now
                </Link>

                <div className="premium-details-trust">
                  <i className="fas fa-shield-alt" style={{ color: '#10b981' }}></i> <span>Secure Checkout & Instant Fulfillment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Row Cards */}
          <div className="premium-details-bottom-trust-card">
            <div className="premium-details-bottom-trust-grid">
              <div className="premium-details-bottom-trust-item">
                <i className="fas fa-shield-alt premium-details-bottom-trust-icon"></i>
                <div className="premium-details-bottom-trust-text">
                  <h5>Safe & Secure</h5>
                  <p>100% Safe Purchase</p>
                </div>
              </div>
              <div className="premium-details-bottom-trust-item">
                <i className="far fa-clock premium-details-bottom-trust-icon"></i>
                <div className="premium-details-bottom-trust-text">
                  <h5>Instant Delivery</h5>
                  <p>Delivered in Seconds</p>
                </div>
              </div>
              <div className="premium-details-bottom-trust-item">
                <i className="fas fa-award premium-details-bottom-trust-icon"></i>
                <div className="premium-details-bottom-trust-text">
                  <h5>Premium Quality</h5>
                  <p>High Quality Boosts</p>
                </div>
              </div>
              <div className="premium-details-bottom-trust-item">
                <i className="fas fa-headset premium-details-bottom-trust-icon"></i>
                <div className="premium-details-bottom-trust-text">
                  <h5>24/7 Support</h5>
                  <p>We're Here to Help</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Product Details */}
    </>
  );
}
