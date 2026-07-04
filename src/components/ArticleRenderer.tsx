'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

// Inline Icons
const SvgArrowLeft = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>;
const SvgClock = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
const SvgCalendar = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>;
const SvgFacebook = ({ className = "w-4 h-4" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>;
const SvgTwitter = ({ className = "w-4 h-4" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const SvgWhatsApp = ({ className = "w-4 h-4" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M11.996 2.001c-5.513 0-9.996 4.482-9.996 9.995 0 1.758.461 3.468 1.327 4.975l-1.327 4.887 5.068-1.313a10.024 10.024 0 004.928 1.294c5.513 0 9.996-4.482 9.996-9.995s-4.483-9.996-9.996-9.996zm-5.062 14.364l-.337-.532c-.896-1.423-1.368-3.08-1.368-4.79 0-4.912 3.996-8.908 8.907-8.908 4.91 0 8.906 3.996 8.906 8.908 0 4.911-3.996 8.907-8.906 8.907-1.682 0-3.32-.444-4.743-1.286l-.524-.31-3.415.897.893-3.325zm4.847-9.529c-2.029 0-3.844 1.155-4.664 2.969-.214.475-.102 1.05.281 1.433.094.094.205.176.326.239.362.19.789.284 1.22.284h.044c.483-.01.956-.134 1.385-.36l.244-.128c1.391-.73 3.036-.576 4.275.405.02.016.04.033.059.05.748.649.957 1.637.525 2.502-.276.55-.747.973-1.332 1.189-.522.193-1.077.218-1.603.072-.887-.247-1.745-.632-2.545-1.144-.067-.042-.128-.093-.186-.148a.488.488 0 01-.064-.694c.15-.2.434-.234.629-.074.792.651 1.764 1.01 2.766 1.02.501.004.989-.138 1.411-.409.524-.336.852-.897.876-1.503.023-.585-.262-1.137-.76-1.465a3.868 3.868 0 00-2.036-.582H14.1c-.815 0-1.607.25-2.274.717-.225.157-.492.203-.755.127-.291-.083-.54-.27-.698-.523-.197-.315-.226-.708-.078-1.047.535-1.229 1.748-2.008 3.097-2.008 1.145 0 2.222.569 2.879 1.516.14.202.418.257.625.122.21-.136.27-.417.135-.623-1.014-1.458-2.671-2.33-4.43-2.33z"/></svg>;
const SvgLinkedIn = ({ className = "w-4 h-4" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const SvgTelegram = ({ className = "w-4 h-4" }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.562 8.161c-.18.717-.962 4.084-1.362 5.411-.168.56-.505 1.24-.858 1.393-.326.143-.805-.098-1.16-.367l-3.23-2.457c-.504-.383-.357-1.077.065-1.46l2.91-2.613c.241-.219-.101-.397-.33-.243l-4.469 2.871c-.482.316-1.199.406-1.637.284l-2.012-.556c-.662-.181-.724-.658.12-.993l9.011-3.61c.884-.338 1.488-.119 1.745.344.113.203.224.629.207.996z"/></svg>;
const SvgLink = ({ className = "w-4 h-4" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>;
const SvgChevronRight = ({ className = "w-3 h-3" }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>;

export default function ArticleRenderer({ post, relatedPosts, previousPost, nextPost }: { post: any, relatedPosts: any[], previousPost: any, nextPost: any }) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [headings, setHeadings] = useState<{ id: string, text: string, level: string }[]>([]);
  const [copied, setCopied] = useState(false);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://zoroboost.com/blog/${post.id}`;

  // Calculate reading time (roughly 200 words per minute)
  const plainTextContent = post.content ? post.content.replace(/<[^>]*>?/gm, ' ') : '';
  const wordCount = plainTextContent.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Clean HTML
  const cleanHtml = post.content ? post.content.replace(/\\n/g, '<br/>') : '';

  useEffect(() => {
    // Generate TOC
    if (typeof window !== 'undefined') {
      const articleEl = document.getElementById('article-content');
      if (articleEl) {
        const headingEls = Array.from(articleEl.querySelectorAll('h2, h3'));
        const toc = headingEls.map((el, index) => {
          if (!el.id) el.id = `heading-${index}`;
          return {
            id: el.id,
            text: el.textContent || '',
            level: el.tagName.toLowerCase()
          };
        });
        setHeadings(toc);
      }
    }

    // Scroll Progress
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setReadingProgress(Number(scroll) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [cleanHtml]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTitle = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <div className="flex flex-col relative w-full">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-primary z-[999] transition-all duration-150 ease-out" style={{ width: `${readingProgress}%` }} />
      
      {/* Breadcrumbs */}
      <div className="bg-bg-secondary border-b border-border py-4">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex items-center text-xs font-medium text-muted-foreground whitespace-nowrap overflow-x-auto">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <SvgChevronRight className="mx-2 flex-shrink-0" />
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <SvgChevronRight className="mx-2 flex-shrink-0" />
          <span className="text-foreground truncate">{post.title}</span>
        </div>
      </div>

      <main className="flex-1 mx-auto max-w-[1200px] px-4 py-12 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12 items-start relative">
        
        {/* Left Column (Article) */}
        <div className="w-full lg:w-[800px] flex-shrink-0">
          
          {/* Article Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-muted-foreground mb-6">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider text-xs">{post.category || 'Guide'}</span>
              <span className="flex items-center gap-1.5"><SvgCalendar className="opacity-70" /> {new Date(post.publish_date || post.created_at).toLocaleDateString()}</span>
              <span className="flex items-center gap-1.5"><SvgClock className="opacity-70" /> {readingTime} min read</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-[1.1] mb-6">
              {post.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between gap-4 pt-8 mt-8 border-t border-border">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center p-2">
                  <img src="/site icon.png" alt="Author" className="w-full h-full object-contain drop-shadow-sm" />
                </div>
                <div>
                  <div className="font-bold text-foreground text-sm">{post.author || 'ZoroBoost Team'}</div>
                  <div className="text-xs text-muted-foreground">Admin & Staff</div>
                </div>
              </div>
              
              <div className="hidden sm:flex gap-2">
                <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors text-muted-foreground"><SvgTwitter /></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors text-muted-foreground"><SvgFacebook /></a>
                <button onClick={copyToClipboard} className="w-9 h-9 rounded-full bg-secondary hover:bg-primary/20 hover:text-primary flex items-center justify-center transition-colors text-muted-foreground" title="Copy Link">
                  {copied ? <span className="text-xs font-bold text-emerald-500">Copied</span> : <SvgLink />}
                </button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-2xl mb-12">
            <img src={post.media_url || '/assets/img/blog/1.jpg'} alt={post.title} className="w-full h-auto min-h-[300px] max-h-[500px] object-cover" />
          </div>

          {/* Mobile TOC (Visible only on small screens) */}
          {headings.length > 0 && (
            <div className="lg:hidden bg-card border border-border p-6 rounded-xl mb-10">
              <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm flex items-center gap-2"><SvgLink /> Table of Contents</h4>
              <ul className="flex flex-col gap-3 text-sm">
                {headings.map(h => (
                  <li key={h.id} className={h.level === 'h3' ? 'ml-4' : ''}>
                    <a href={`#${h.id}`} className="text-muted-foreground hover:text-primary transition-colors">{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Article Body */}
          <article 
            id="article-content"
            className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:text-foreground prose-h2:font-extrabold prose-h3:font-bold prose-h2:border-b prose-h2:border-border prose-h2:pb-2 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-p:text-muted-foreground prose-li:text-muted-foreground prose-blockquote:border-l-primary prose-blockquote:bg-primary/5 prose-blockquote:py-1 prose-blockquote:px-5 prose-blockquote:rounded-r-lg prose-blockquote:not-italic prose-blockquote:font-medium prose-code:text-primary prose-code:bg-primary/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-bg-secondary prose-pre:border prose-pre:border-border"
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
          
          {/* Footer Share & Tags */}
          <div className="mt-16 pt-8 border-t border-border">
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex gap-2">
                  <span className="bg-secondary text-muted-foreground px-3 py-1 rounded-md text-xs font-bold uppercase">#Discord</span>
                  <span className="bg-secondary text-muted-foreground px-3 py-1 rounded-md text-xs font-bold uppercase">#{post.category || 'Guide'}</span>
                </div>
               
               <div className="flex items-center gap-3">
                 <span className="font-bold text-sm text-foreground uppercase tracking-wider">Share</span>
                 <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#1DA1F2] hover:text-white flex items-center justify-center transition-colors text-muted-foreground"><SvgTwitter /></a>
                 <a href={`https://api.whatsapp.com/send?text=${shareTitle} ${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-colors text-muted-foreground"><SvgWhatsApp /></a>
                 <a href={`https://t.me/share/url?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#0088cc] hover:text-white flex items-center justify-center transition-colors text-muted-foreground"><SvgTelegram /></a>
                 <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-secondary hover:bg-[#0A66C2] hover:text-white flex items-center justify-center transition-colors text-muted-foreground"><SvgLinkedIn /></a>
                 <button onClick={copyToClipboard} className="w-10 h-10 rounded-full bg-secondary hover:bg-primary hover:text-white flex items-center justify-center transition-colors text-muted-foreground" title="Copy Link">
                   <SvgLink />
                 </button>
               </div>
             </div>
          </div>

          {/* Previous / Next Nav */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12 mb-16">
            {previousPost ? (
              <Link href={`/blog/${previousPost.id}`} className="flex flex-col gap-2 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1 group-hover:text-primary transition-colors"><SvgArrowLeft /> Previous Post</span>
                <span className="font-bold text-foreground text-sm line-clamp-2">{previousPost.title}</span>
              </Link>
            ) : <div />}
            
            {nextPost ? (
              <Link href={`/blog/${nextPost.id}`} className="flex flex-col gap-2 p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors group text-right">
                <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center justify-end gap-1 group-hover:text-primary transition-colors">Next Post <SvgArrowLeft className="rotate-180" /></span>
                <span className="font-bold text-foreground text-sm line-clamp-2">{nextPost.title}</span>
              </Link>
            ) : <div />}
          </div>
        </div>

        {/* Right Sidebar (Sticky) */}
        <aside className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-10 lg:sticky top-24">
          {/* TOC Widget */}
          {headings.length > 0 && (
            <div className="hidden lg:block bg-card border border-border p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Table of Contents</h4>
              <ul className="flex flex-col gap-3 text-sm">
                {headings.map(h => (
                  <li key={h.id} className={h.level === 'h3' ? 'ml-4' : ''}>
                    <a href={`#${h.id}`} className="text-muted-foreground hover:text-primary transition-colors block line-clamp-2 leading-relaxed">{h.text}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Related Posts */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="bg-card border border-border p-6 rounded-xl shadow-lg">
              <h4 className="font-bold text-foreground mb-6 uppercase tracking-wider text-sm border-b border-border pb-3">Related Posts</h4>
              <div className="flex flex-col gap-6">
                {relatedPosts.map(rp => (
                  <Link href={`/blog/${rp.id}`} key={rp.id} className="group flex flex-col gap-3">
                    <div className="w-full h-32 rounded-lg bg-bg-secondary overflow-hidden">
                      <img src={rp.media_url || '/assets/img/blog/1.jpg'} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-primary mb-1 block">{rp.category || 'Guide'}</span>
                      <h5 className="font-bold text-foreground text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{rp.title}</h5>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Banner */}
          <div className="bg-primary/10 border border-primary/20 p-6 rounded-xl shadow-lg text-center">
            <h4 className="font-black text-foreground text-xl mb-3">Boost Your Server Today!</h4>
            <p className="text-sm text-muted-foreground mb-6">Get premium Discord members, boosts, and aged accounts at the best market prices.</p>
            <Link href="/" className="inline-block w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
              Explore Services
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
