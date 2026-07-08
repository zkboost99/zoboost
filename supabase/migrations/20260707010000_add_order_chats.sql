-- Create order_chats table
CREATE TABLE IF NOT EXISTS public.order_chats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    sender TEXT NOT NULL CHECK (sender IN ('admin', 'customer')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable realtime for order_chats
-- In Supabase, realtime is enabled per table by adding the table to the publication 'supabase_realtime'
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_publication_tables
        WHERE pubname = 'supabase_realtime'
        AND tablename = 'order_chats'
    ) THEN
        -- Check if publication exists, if not create it (rarely needed but safe)
        IF NOT EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
            CREATE PUBLICATION supabase_realtime FOR TABLE public.order_chats;
        ELSE
            ALTER PUBLICATION supabase_realtime ADD TABLE public.order_chats;
        END IF;
    END IF;
END
$$;
