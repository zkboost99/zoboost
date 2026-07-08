<main className="w-full max-w-[1200px] grid grid-cols-12 gap-6" data-purpose="dashboard-container">
<!-- LEFT COLUMN: Chat Section -->
<div className="col-span-12 lg:col-span-8 flex flex-col gap-4">
<!-- BEGIN: Header Status Banner -->
<header className="bg-[#1e212d] rounded-xl p-6 border border-[#2d3142]" data-purpose="chat-header">
<div className="flex items-center justify-between">
<div className="flex items-center gap-4">
<!-- Seller Avatar Placeholder -->
<div className="relative">
<div className="w-16 h-16 rounded-full bg-[#12141d] flex items-center justify-center border-2 border-[#f6c23e] overflow-hidden">
<img alt="Seller Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCq4CKZHCiCNPkLESwgNOysYlSZf3tWKYp9QVptgq3eNSplqcC-AECXfwhQoOOBaxamnc5E7L_JVehMnKxeNaKeg7G-tBSGO-dAtCHfLsrQhjIZ9B-C3SmD--MuDIKlTsnTehXAAdiDDlqgGJ7u5Qte81m-EAP6oQhwbZp59NAN-MOEtTreLCR5syIM-U0EjNJwHuazxCHBiWFI8ORVOIoSeiDXKNpP--ln_8iElbc5q71Dn7kfHFwxsPId81GCUpl0TJNpLsoESzwI"/>
</div>
<span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e212d]"></span>
</div>
<div>
<h1 className="text-xl font-bold flex items-center gap-2">
                Chat with seller
                <span className="text-lg">💬</span>
</h1>
<p className="text-[#a0a0a0] text-sm">Reply below if the seller asks for details to continue delivery.</p>
</div>
</div>
<div className="text-right">
<p className="text-[#a0a0a0] text-xs uppercase tracking-wider mb-1">
<span className="inline-block mr-1">🕒</span> Delivery in
            </p>
<p className="text-2xl font-bold">15 min 6 s</p>
</div>
</div>
<!-- TradeShield Banner -->
<div className="mt-4 flex items-center gap-2 bg-[#12141d]/50 border border-[#2d3142] p-3 rounded-lg text-[#4e73df] text-sm">
<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></path></svg>
<span className="font-semibold">TradeShield</span>
<span className="text-[#a0a0a0]">protects your order</span>
</div>
</header>
<!-- END: Header Status Banner -->
<!-- BEGIN: Chat Window -->
<section className="bg-[#1e212d] rounded-xl border border-[#2d3142] flex flex-col h-[600px] overflow-hidden" data-purpose="chat-window">
<!-- Chat Area Header -->
<div className="p-4 border-b border-[#2d3142] flex items-center justify-between bg-[#12141d]/30">
<div className="flex items-center gap-3">
<img alt="Shop Avatar" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg2XHTnS17Jw2iHLPGAZuHPL0rktxPMe4vuQiS0SC9--PtP1TElI7Fg5PjKwR3zzBP9y-SB7uJ4vPRmZ72FUXzB30BtIGrhvYoQUlag42C7xWwH8k3Emi4dns92s2V4xg-ijnuZuDUvbzcNuFiBzgKCwaHp-Iq4SrqzOpoaEeJl58EbpuM3qdbEsXIS6ztVZGQc6HkE0atI9flIhH9t_iN0wbcusZk5A_YXyhWfNJtTaG203M055C81LPim4fIuF7tUomehzQ0i0B4"/>
<div>
<h3 className="font-bold text-sm">EaseShop</h3>
<p className="text-xs text-[#a0a0a0]">Order for items</p>
</div>
</div>
<div className="text-[#a0a0a0] hover:text-white cursor-pointer">
<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></path></svg>
</div>
</div>
<!-- Chat History -->
<div className="flex-1 overflow-y-auto p-6 space-y-6 chat-container" data-purpose="message-list">
<!-- System Message: Order Created -->
<div className="flex gap-4">
<div className="w-1 h-auto bg-[#f6c23e] rounded-full"></div>
<div className="flex-1 bg-[#12141d]/40 p-4 rounded-lg border border-[#2d3142]">
<p className="text-sm mb-2">Order Created: <a className="text-[#4e73df] underline" href="#">https://www.eldorado.gg/order/7973d127...</a></p>
<div className="bg-black p-3 rounded flex items-center justify-between border border-gray-800">
<div className="flex items-center gap-2">
<svg className="w-4 h-4 text-[#a0a0a0]" fill="currentColor" viewBox="0 0 20 20"><path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5z" /></path></svg>
<span className="text-xs font-mono">7973d127-999f-4921-bb82-56e5905d34a6</span>
</div>
</div>
<div className="flex justify-between mt-2">
<span className="text-[10px] text-[#a0a0a0]">www.eldorado.gg</span>
<span className="text-[10px] text-[#a0a0a0]">4m</span>
</div>
</div>
</div>
<!-- Seller Message -->
<div className="flex gap-4">
<img alt="EaseShop" className="w-10 h-10 rounded-full flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUXfZzm-PpK3aIOnUl8NBUrKShYPnXseBNj8_D_zuTtd1H0U4QPfeM6BGiM5kru9DWctJXgXgYynwhXLOi1o2IbGKqe8szw0jevxUsEcJtZofCAaQKvPaqs2DrTi7BY5KAsID7AxIgnmvi6WB4SzJljiXL_LXq52vOkYygLocaIx61C6xMTBu-i4d4naMBEsZSyhWYcdXpUoycbpXX29VProi6huCBrL73BZarRwDxM8SCY6mF-syqR4Cn7pCB3hK6TCpxQ1mGDzcC"/>
<div className="flex flex-col">
<div className="bg-[#2a2e3f] p-3 rounded-2xl rounded-tl-none">
<p className="text-sm">Did you read the description, Can I send the link?</p>
</div>
<span className="text-[10px] text-[#a0a0a0] mt-1 ml-1">2m</span>
</div>
</div>
<!-- User Reply -->
<div className="flex justify-end gap-4">
<div className="flex flex-col items-end">
<div className="bg-[#3d68ff] p-3 rounded-2xl rounded-tr-none text-white shadow-lg">
<p className="text-sm font-medium">yes read</p>
</div>
<div className="flex items-center gap-1 mt-1 mr-1">
<span className="text-[10px] text-[#4e73df] italic font-semibold">just now</span>
<svg className="w-3 h-3 text-[#4e73df]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></path></svg>
</div>
</div>
<img alt="Me" className="w-10 h-10 rounded-full flex-shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC334EBnIw6yYO8yg6jkxXyB-Cau-TVnC8_WZhL7JjNvd9hbfqMk8dpItiUrYpbadScQyundPuujQ25qrlPwXiv7OayZriqVy8mBAVKFYFfta1pGAX2Ix0LJHWZcmlozdmZ4iKTsNV7MUz7wQxF2HUYirVvbX3jt7_l8CaOOGhwUIfaDJztYuw2XKYe5_Kw83lwV0Y80rCiI60Z4TbNMQb3HUCRb-7pVvGvHPw4WptHoV3nBi6PTzZWofc6A-rLjyKDThncpWgZyZh3"/>
</div>
</div>
<!-- Chat Input Area -->
<div className="p-4 bg-[#12141d]/20 border-t border-[#2d3142]" data-purpose="chat-input-container">
<div className="bg-[#12141d] border border-[#2d3142] rounded-lg flex items-center px-4 py-2 gap-3 focus-within:ring-1 ring-[#4e73df] transition">
<input className="bg-transparent border-none focus:ring-0 flex-1 text-sm placeholder:text-[#a0a0a0] py-2" placeholder="Say something..." type="text"/>
<div className="flex items-center gap-4 text-[#a0a0a0]">
<button className="hover:text-white transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></path></svg></button>
<button className="hover:text-white transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></path></svg></button>
<button className="text-[#4e73df] hover:text-white transition"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></path></svg></button>
</div>
</div>
</div>
</section>
<!-- END: Chat Window -->
</div>
<!-- RIGHT COLUMN: Order Details Sidebar -->
<aside className="col-span-12 lg:col-span-4 flex flex-col gap-4" data-purpose="sidebar">
<!-- Safe Money Info -->
<div className="bg-[#1e212d]/40 border border-[#2d3142] rounded-xl p-4 flex items-center justify-between text-sm">
<div className="flex items-center gap-2">
<svg className="w-5 h-5 text-[#4e73df]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></path></svg>
<span className="font-medium">Your money is safe</span>
</div>
<span className="text-[#a0a0a0] text-xs">Until order is completed</span>
</div>
<!-- Main Order Card -->
<div className="bg-[#1e212d] rounded-xl border border-[#2d3142] p-6 shadow-2xl" data-purpose="order-details-card">
<div className="flex justify-between items-center mb-6">
<h2 className="text-lg font-bold">Order details</h2>
<span className="bg-[#f6c23e]/20 text-[#f6c23e] text-[10px] uppercase font-bold px-2 py-1 rounded">Pending delivery</span>
</div>
<!-- Product Preview -->
<div className="flex gap-4 mb-8">
<div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#12141d] border border-[#2d3142]">
<!-- Representing the Nitro Trial Image -->
<img alt="Nitro Product" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkhrXveZdXRSRHXDdtQ7NsUOShvYfP1FI86cNmZ2qeAuM_pPYcMbJi9wXmgisXY8Cgv2NGAOLqOomCt-6ldH-VavUNZ34F-sQwWt1EImPaVf1jFjCQLa3mmRgQiKE6WN40rPUsd2blsY-_Mh9f5fZVesAj1-l9nGG94J8--Hs2vN-hQGiAUXZEVogIWzAjnhyNHUa0D5I5g8nzsH6fZL-hNkFECAvQN_deyb734sy0zarIh7VLAbVfW9HB_t8HdfWSoJWNlnnMsNOo"/>
</div>
<div>
<h3 className="text-sm font-bold leading-tight hover:text-[#4e73df] cursor-pointer transition">1 Month Nitro Trial Code (Read Description!)</h3>
</div>
</div>
<!-- Details Grid -->
<div className="space-y-4 text-sm">
<div className="flex justify-between">
<span className="text-[#a0a0a0]">Game</span>
<span className="flex items-center gap-1 font-semibold"><span className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center text-[8px] text-white">DC</span> Discord</span>
</div>
<div className="flex justify-between">
<span className="text-[#a0a0a0]">Delivery type</span>
<span className="font-semibold">Gifting Method</span>
</div>
<div className="flex justify-between">
<span className="text-[#a0a0a0]">Item Type</span>
<span className="font-semibold">Nitro Premium Trial</span>
</div>
<div className="flex justify-between">
<span className="text-[#a0a0a0]">Seller</span>
<span className="font-semibold text-[#4e73df] flex items-center gap-2">EaseShop | <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span> Online</span>
</div>
<div className="flex justify-between">
<span className="text-[#a0a0a0]">Total price</span>
<span className="font-bold text-lg">$0.50</span>
</div>
<div className="flex flex-col pt-2">
<span className="text-[#a0a0a0] mb-1">Receipt sent</span>
<span className="text-xs break-all font-mono">muntazir.mahdi047@gmail.com</span>
</div>
<div className="flex flex-col">
<span className="text-[#a0a0a0] mb-1">Order ID</span>
<span className="text-xs break-all font-mono text-[#a0a0a0]">7973d127-999f-4921-bb82-56e5905d34a6</span>
</div>
</div>
<!-- Actions -->
<button className="w-full mt-8 py-3 bg-[#12141d] border border-[#2d3142] rounded-lg text-sm font-bold hover:bg-[#2d3142] transition">
          View full description
        </button>
</div>
</aside>
<!-- END: Sidebar -->
</main>