-- Migration: Init Schema

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    category TEXT,
    price NUMERIC(10, 2) NOT NULL DEFAULT 0,
    discount_type TEXT DEFAULT 'None',
    discount_value NUMERIC(10, 2) DEFAULT 0,
    stock INTEGER DEFAULT -1,
    status TEXT DEFAULT 'Active',
    delivery_method TEXT DEFAULT 'Login Method',
    delivery_time TEXT DEFAULT 'Instant',
    media_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    category TEXT,
    author TEXT DEFAULT 'Admin',
    status TEXT DEFAULT 'Published',
    publish_date DATE,
    excerpt TEXT,
    content TEXT,
    media_url TEXT,
    views INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name TEXT,
    email TEXT,
    product_id UUID REFERENCES public.products(id),
    amount NUMERIC(10, 2),
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT,
    email TEXT,
    message TEXT,
    status TEXT DEFAULT 'Unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed Initial Data for Products
INSERT INTO public.products (title, description, price, delivery_method, delivery_time, category, discount_type, discount_value, media_url, status)
VALUES 
    ('Server Boosts (14x / 1 Month)', '14 Server boosts applied instantly via custom bot. Includes Level 3 Server features.', 10.99, 'Auto Delivery', 'Instant', 'Server Boosts', 'Percentage (%)', 20, 'https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/category-icons/server-boost.png', 'Active'),
    ('Discord Nitro (1 Year)', 'Full Discord Nitro subscription. Delivered as a claimable gift link.', 45.00, 'Gifting Method', '20 min', 'Nitro Boost', 'Fixed Amount ($)', 5.00, 'https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/category-icons/nitro-boost.png', 'Active'),
    ('Custom Decoration Bundle', 'Unique avatar decorations and profile effects. Non-transferable.', 8.50, 'Gifting Method', 'Instant', 'Discord Decoration', 'None', 0, 'https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/category-icons/discord-decoration.png', 'Active')
ON CONFLICT DO NOTHING;

-- Seed Initial Data for Posts
INSERT INTO public.posts (title, category, author, status, publish_date, excerpt, content, media_url, views, comments)
VALUES
    ('How to Protect Your Discord Server from Raids', 'Security', 'ZoroBoost Team', 'Published', '2026-06-28', 'When I first started managing a public Discord server, everything seemed to be running smoothly...', 'Full content here...', 'https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/blog/protect-discord-raids.png', 567, 2),
    ('Discord Server Boosts Explained: Is It Worth It?', 'Guides', 'Admin Team', 'Published', '2026-06-27', 'The first Discord server I managed started with just a handful of friends...', 'Full content here...', 'https://pub-bc67e2c069bd4bbeac1a9624c01f79db.r2.dev/blog/discord-server-boost.png', 892, 5)
ON CONFLICT DO NOTHING;
