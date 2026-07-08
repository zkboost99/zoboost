const fs = require('fs');

let html = fs.readFileSync('public/admin.html', 'utf8');

const orderChatHtml = `
        <section class="section" id="s-order-chat">
          <div class="pg-head">
            <h1 class="pg-title">Order Chat <span id="oc-order-id" style="color: #3b82f6;"></span></h1>
            <div class="pg-head-r">
              <button class="btn bs bsm" onclick="nav('all-orders')"><i class="fas fa-arrow-left"></i> Back to Orders</button>
            </div>
          </div>
          <div style="display: flex; gap: 24px; height: calc(100vh - 180px);">
            
            <!-- Left: Chat System -->
            <div style="flex: 1; display: flex; flex-direction: column; background: #0b0e14; border: 1px solid #1d2736; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);">
              <div style="background: #131924; padding: 16px; border-bottom: 1px solid #1d2736; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 12px;">
                  <div style="width: 40px; height: 40px; background: #0b0e14; border: 1px solid #1d2736; border-radius: 8px; display: flex; align-items: center; justify-content: center; padding: 4px;">
                    <img id="oc-product-img" src="" style="max-width: 100%; max-height: 100%; object-fit: contain;">
                  </div>
                  <div>
                    <h2 id="oc-product-name" style="font-size: 14px; font-weight: 700; color: #fff; margin: 0;"></h2>
                    <p style="font-size: 11px; color: #8a9bb4; margin: 2px 0 0 0;"><i class="fas fa-shield-check" style="color: #00c853;"></i> ZoroBoost protects this order</p>
                  </div>
                </div>
                <div id="oc-status-badge"></div>
              </div>

              <div id="oc-messages-container" style="flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; background: #080b10;">
                <!-- Messages go here -->
              </div>

              <div style="padding: 16px; background: #131924; border-top: 1px solid #1d2736;">
                <form id="oc-chat-form" style="position: relative; display: flex; align-items: center;" onsubmit="sendOrderChatMessage(event)">
                  <input type="text" id="oc-chat-input" placeholder="Type your message..." style="width: 100%; background: #0b0e14; border: 1px solid #1d2736; color: #fff; padding: 12px 50px 12px 16px; border-radius: 8px; outline: none; font-size: 13px;">
                  <button type="submit" id="oc-chat-send-btn" style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; background: #3b82f6; color: #fff; border: none; cursor: pointer; transition: 0.2s;">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>

            <!-- Right: Order Details -->
            <div style="width: 320px; display: flex; flex-direction: column; gap: 16px;">
              <div style="background: #0b0e14; border: 1px solid #1d2736; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);">
                <div style="background: #131924; padding: 16px; border-bottom: 1px solid #1d2736;">
                  <h3 style="font-size: 13px; font-weight: 700; color: #fff; text-transform: uppercase; margin: 0; letter-spacing: 0.5px;">Order Details</h3>
                </div>
                <div style="padding: 20px; display: flex; flex-direction: column; gap: 20px;">
                  
                  <div style="display: flex; flex-direction: column; gap: 4px;">
                    <span style="font-size: 10px; font-weight: 700; color: #5c6b81; text-transform: uppercase;">Amount</span>
                    <span id="oc-detail-amount" style="font-size: 20px; font-weight: 900; color: #ffd13b;"></span>
                  </div>

                  <div style="height: 1px; background: #1d2736; width: 100%;"></div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      <span style="font-size: 10px; font-weight: 700; color: #5c6b81; text-transform: uppercase;">Customer</span>
                      <span id="oc-detail-customer" style="font-size: 12px; font-weight: 600; color: #fff; word-break: break-all;"></span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      <span style="font-size: 10px; font-weight: 700; color: #5c6b81; text-transform: uppercase;">Discord</span>
                      <span id="oc-detail-discord" style="font-size: 12px; font-weight: 600; color: #fff; word-break: break-all;"></span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      <span style="font-size: 10px; font-weight: 700; color: #5c6b81; text-transform: uppercase;">Email</span>
                      <span id="oc-detail-email" style="font-size: 12px; font-weight: 600; color: #fff; word-break: break-all;"></span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      <span style="font-size: 10px; font-weight: 700; color: #5c6b81; text-transform: uppercase;">Payment</span>
                      <span id="oc-detail-payment" style="font-size: 12px; font-weight: 600; color: #fff; word-break: break-all;"></span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 4px;">
                      <span style="font-size: 10px; font-weight: 700; color: #5c6b81; text-transform: uppercase;">Date</span>
                      <span id="oc-detail-date" style="font-size: 12px; font-weight: 600; color: #fff;"></span>
                    </div>
                  </div>

                  <div style="height: 1px; background: #1d2736; width: 100%;"></div>

                  <div style="display: flex; flex-direction: column; gap: 8px;">
                    <span style="font-size: 10px; font-weight: 700; color: #5c6b81; text-transform: uppercase;">Update Status</span>
                    <select id="oc-detail-status-select" style="width: 100%; background: #131924; border: 1px solid #1d2736; color: #fff; padding: 10px; border-radius: 6px; outline: none; font-size: 13px; font-weight: 600; cursor: pointer;" onchange="updateOrderChatStatus(this.value)">
                      <option value="Completed">Completed</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </div>
                  
                </div>
              </div>
            </div>

          </div>
        </section>
`;

html = html.replace('</main>', () => orderChatHtml + '\n      </main>');

const orderChatJs = `
    // --- ORDER CHAT LOGIC ---
    let currentOrderChatId = null;
    let orderChatSubscription = null;
    let currentOrderChatData = null;

    function openOrderChat(id) {
      const order = ALL_ORDERS_DATA.find(o => String(o.id) === String(id));
      if (!order) return;
      currentOrderChatId = id;
      currentOrderChatData = order;

      nav('order-chat');
      
      // Populate Details
      document.getElementById('oc-order-id').innerText = order.displayId;
      document.getElementById('oc-product-img').src = order.product_url || '/assets/img/blog/1.jpg';
      document.getElementById('oc-product-name').innerText = order.product_name || order.product;
      document.getElementById('oc-detail-amount').innerText = '$' + order.amount;
      document.getElementById('oc-detail-customer').innerText = order.name || 'Guest';
      document.getElementById('oc-detail-discord').innerText = order.discord_username || 'N/A';
      document.getElementById('oc-detail-email').innerText = order.email || 'N/A';
      document.getElementById('oc-detail-payment').innerText = order.payment_method || 'N/A';
      document.getElementById('oc-detail-date').innerText = order.date;
      document.getElementById('oc-detail-status-select').value = order.status;

      updateOrderChatBadge(order.status);
      
      // Fetch Messages
      fetchOrderChatMessages();

      // Subscribe to Realtime
      if (orderChatSubscription) {
        window.supabase.removeChannel(orderChatSubscription);
      }
      
      try {
        orderChatSubscription = window.supabase.createClient('https://zepfgxyuzblxebqutbvi.supabase.co', SUPABASE_ANON_KEY)
          .channel('admin_order_chats')
          .on('postgres_changes', { 
            event: 'INSERT', 
            schema: 'public', 
            table: 'order_chats',
            filter: \`order_id=eq.\${id}\`
          }, payload => {
            appendOrderChatMessage(payload.new);
          })
          .subscribe();
      } catch (e) {
        console.error("Order chat realtime error:", e);
      }
    }

    function updateOrderChatBadge(status) {
      const badge = document.getElementById('oc-status-badge');
      if (status === 'Completed') {
        badge.innerHTML = '<span style="background: rgba(0, 200, 83, 0.2); color: #00c853; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Completed</span>';
      } else if (status === 'Processing') {
        badge.innerHTML = '<span style="background: rgba(59, 130, 246, 0.2); color: #3b82f6; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Processing</span>';
      } else if (status === 'Failed') {
        badge.innerHTML = '<span style="background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Failed</span>';
      } else {
        badge.innerHTML = '<span style="background: rgba(255, 209, 59, 0.2); color: #ffd13b; padding: 4px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase;">Pending</span>';
      }
    }

    async function updateOrderChatStatus(newStatus) {
      if (!currentOrderChatId) return;
      try {
        const res = await fetch(\`/api/admin/orders\`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: currentOrderChatId, status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
          updateOrderChatBadge(newStatus);
          // Update in main lists
          const o = ALL_ORDERS_DATA.find(x => String(x.id) === String(currentOrderChatId));
          if (o) o.status = newStatus;
          // Re-render main tables silently
          const aoRow = document.getElementById('row-' + currentOrderChatId);
          if (aoRow) {
             const sel = aoRow.querySelector('.status-sel');
             if (sel) {
               sel.value = newStatus;
               sel.className = 'status-sel ' + statClass(newStatus);
             }
          }
          updateSidebarBadges();
        } else {
          alert("Failed to update status: " + data.error);
        }
      } catch (e) {
        alert("Error: " + e.message);
      }
    }

    async function fetchOrderChatMessages() {
      const container = document.getElementById('oc-messages-container');
      container.innerHTML = '<div style="text-align:center; padding: 20px; color:#8a9bb4; font-size: 12px;"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
      
      try {
        const client = window.supabase.createClient('https://zepfgxyuzblxebqutbvi.supabase.co', SUPABASE_ANON_KEY);
        const { data, error } = await client
          .from('order_chats')
          .select('*')
          .eq('order_id', currentOrderChatId)
          .order('created_at', { ascending: true });
          
        if (error) throw error;
        
        container.innerHTML = \`<div style="display: flex; justify-content: center; margin: 8px 0;">
                  <div style="background: #131924; border: 1px solid #1d2736; padding: 8px 16px; border-radius: 8px; font-size: 11px; color: #8a9bb4; text-align: center;">
                    Order chat started. Send a message to assist the customer.
                  </div>
                </div>\`;
        if (data) {
          data.forEach(msg => appendOrderChatMessage(msg, false));
        }
        container.scrollTop = container.scrollHeight;
      } catch (e) {
        container.innerHTML = '<div style="color:#ef4444; font-size: 12px; text-align: center;">Failed to load messages</div>';
      }
    }

    function appendOrderChatMessage(msg, scroll = true) {
      const container = document.getElementById('oc-messages-container');
      const isAdmin = msg.sender === 'admin';
      
      const timeStr = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(new Date(msg.created_at));
      
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.alignItems = isAdmin ? 'flex-end' : 'flex-start';
      
      div.innerHTML = \`
        <div style="font-size: 10px; color: #5c6b81; margin-bottom: 4px; font-weight: 600; padding: 0 4px;">\${isAdmin ? 'You' : 'Customer'} • \${timeStr}</div>
        <div style="padding: 10px 16px; border-radius: 12px; font-size: 13px; line-height: 1.5; max-width: 80%; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); background: \${isAdmin ? '#3b82f6' : '#131924'}; color: #fff; border: \${isAdmin ? 'none' : '1px solid #1d2736'}; border-top-\${isAdmin ? 'right' : 'left'}-radius: 4px;">\${msg.message}</div>
      \`;
      
      container.appendChild(div);
      if (scroll) container.scrollTop = container.scrollHeight;
    }

    async function sendOrderChatMessage(e) {
      e.preventDefault();
      if (!currentOrderChatId) return;
      const input = document.getElementById('oc-chat-input');
      const btn = document.getElementById('oc-chat-send-btn');
      const text = input.value.trim();
      if (!text) return;
      
      input.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: currentOrderChatId,
            sender: 'admin',
            message: text
          })
        });
        if (!res.ok) throw new Error('Failed to send');
        input.value = '';
      } catch (e) {
        alert("Could not send message: " + e.message);
      } finally {
        input.disabled = false;
        input.focus();
        btn.innerHTML = '<i class="fas fa-paper-plane"></i>';
      }
    }
`;

html = html.replace('// --- CLOUDFLARE R2 UPLOAD INTEGRATION ---', () => orderChatJs + '\n\n    // --- CLOUDFLARE R2 UPLOAD INTEGRATION ---');

html = html.replace(/<tr id="\${rowId}" class="clickable-row" onclick="viewOrder\('\${o\.id}', null\)">/g, 
  () => `<tr id="\${rowId}" class="clickable-row" onclick="openOrderChat('\${o.id}')">`);

html = html.replace(/<tr id="row-\${o\.id}" class="clickable-row" onclick="viewOrder\('\${o\.id}', null\)">/g, 
  () => `<tr id="row-\${o.id}" class="clickable-row" onclick="openOrderChat('\${o.id}')">`);

fs.writeFileSync('public/admin.html', html);
console.log("Updated admin.html");
