import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';

export default async function BlogDetails({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  return (
    <>
      <div className="breadcrumb-area text-center bg-cover text-light bg-theme" style={{ backgroundImage: "url(/assets/img/shape/banner-14.jpg)" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>{post.title}</h1>
              <ul className="breadcrumb">
                <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                <li><Link href="/">Blog</Link></li>
                <li>{post.title}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="blog-area single full-blog default-padding">
        <div className="container">
          <div className="row">
            <div className="blog-content col-xl-10 offset-xl-1 col-md-12">
              <div className="blog-item-box">
                <div className="item">
                  <div className="thumb">
                    <img src={post.media_url || '/assets/img/blog/1.jpg'} alt="Blog Image" style={{ width: '100%', borderRadius: '12px' }} />
                  </div>
                  <div className="info">
                    <div className="meta">
                      <ul>
                        <li>
                          <a href="#"><i className="fas fa-user-circle"></i> {post.author}</a>
                        </li>
                        <li>
                          <a href="#"><i className="fas fa-comments"></i> {post.comments || 0} Comments</a>
                        </li>
                        <li>
                          <a href="#"><i className="fas fa-calendar-alt"></i> {new Date(post.publish_date || post.created_at).toLocaleDateString()}</a>
                        </li>
                        <li>
                          <span className="badge" style={{ background: '#8B5CF6', padding: '4px 8px', color: 'white', borderRadius: '4px' }}>{post.category}</span>
                        </li>
                      </ul>
                    </div>

                    <p style={{ fontSize: '18px', fontWeight: '500', color: '#555', marginBottom: '30px' }}>
                      {post.excerpt}
                    </p>

                    <div style={{ fontSize: '16px', lineHeight: '1.8' }} dangerouslySetInnerHTML={{ __html: post.content.replace(/\\n/g, '<br/>') }}>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
