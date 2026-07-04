import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleRenderer from '@/components/ArticleRenderer';
import { Metadata, ResolvingMetadata } from 'next';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const supabase = await createClient();
  const { id } = await params;
  const { data: post } = await supabase.from('posts').select('*').eq('id', id).single();
  
  if (!post) return { title: 'Post Not Found' };
  
  return {
    title: `${post.title} | ZoroBoost Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetails({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  // Fetch current post
  const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  // Fetch all posts to determine related, prev, next
  const { data: allPosts } = await supabase
    .from('posts')
    .select('id, title, category, media_url, publish_date, created_at')
    .order('created_at', { ascending: false });

  let relatedPosts: any[] = [];
  let previousPost = null;
  let nextPost = null;

  if (allPosts && allPosts.length > 0) {
    const currentIndex = allPosts.findIndex(p => p.id === id);
    if (currentIndex > -1) {
      if (currentIndex > 0) nextPost = allPosts[currentIndex - 1]; // Next is newer
      if (currentIndex < allPosts.length - 1) previousPost = allPosts[currentIndex + 1]; // Prev is older
    }
    
    // Get related posts (same category, excluding current)
    relatedPosts = allPosts
      .filter(p => p.id !== id && p.category === post.category)
      .slice(0, 3);
      
    // If not enough related posts, just take recent ones
    if (relatedPosts.length < 3) {
      const remaining = 3 - relatedPosts.length;
      const extras = allPosts
        .filter(p => p.id !== id && p.category !== post.category)
        .slice(0, remaining);
      relatedPosts = [...relatedPosts, ...extras];
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground antialiased font-sans flex flex-col">
      <Header />
      <ArticleRenderer 
        post={post} 
        relatedPosts={relatedPosts} 
        previousPost={previousPost} 
        nextPost={nextPost} 
      />
      <Footer />
    </div>
  );
}
