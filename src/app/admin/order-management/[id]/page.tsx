import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'
import OrderManagementClient from './OrderManagementClient'

export const revalidate = 0 // Disable caching

export default async function AdminOrderManagementPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const orderId = resolvedParams.id

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  const supabase = createClient(supabaseUrl, supabaseServiceKey)

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, products(*)')
    .eq('id', orderId)
    .single()

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0D13] text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error Loading Order</h1>
          <p className="text-gray-400">{error?.message || 'Order not found'}</p>
        </div>
      </div>
    )
  }

  // Also fetch customer info from profiles based on user_id
  let customerInfo = null
  if (order.user_id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', order.user_id)
      .single()
    
    if (profile) customerInfo = profile
  }

  return (
    <>
      <Header />
      <OrderManagementClient order={order} customerInfo={customerInfo} />
      <Footer />
    </>
  )
}
