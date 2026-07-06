// admin_skeletons.js
// Premium Skeleton Loading System for ZoroBoost Admin Panel

const SKELETON_CSS = `
/* Skeleton Container Rules */
.skeleton-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  opacity: 1;
  transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  pointer-events: none;
}
.skeleton-overlay.hidden {
  opacity: 0;
}

/* Skeleton Base UI Elements */
.skel-box {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  position: relative;
  overflow: hidden;
}
.skel-circle {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}
.skel-text {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  height: 14px;
  margin-bottom: 8px;
}

/* Premium Shimmer Animation */
.skel-box::after, .skel-circle::after, .skel-text::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(255, 255, 255, 0.04) 20%, 
    rgba(255, 255, 255, 0.08) 50%, 
    rgba(255, 255, 255, 0.04) 80%, 
    transparent 100%);
  animation: premiumShimmer 1.8s infinite linear;
}

@keyframes premiumShimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Specific Layout Helpers */
.skel-frow { display: flex; gap: 16px; margin-bottom: 24px; align-items: center; }
.skel-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
.skel-grid-5 { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.skel-flex-col { display: flex; flex-direction: column; gap: 12px; }
.skel-table { width: 100%; border-collapse: separate; border-spacing: 0 8px; }
.skel-table td { background: rgba(255,255,255,0.02); padding: 16px; height: 60px; }
.skel-table td:first-child { border-radius: 12px 0 0 12px; }
.skel-table td:last-child { border-radius: 0 12px 12px 0; }
`;

const SKELETON_TEMPLATES = {
  // DASHBOARD SKELETON
  'dashboard': \`
    <div style="padding-top: 32px;">
      <div class="skel-text" style="width: 200px; height: 28px; margin-bottom: 8px;"></div>
      <div class="skel-text" style="width: 300px; height: 14px; margin-bottom: 32px; opacity: 0.5;"></div>
      
      <div class="skel-grid-4">
        <div class="skel-box" style="height: 120px;"></div>
        <div class="skel-box" style="height: 120px;"></div>
        <div class="skel-box" style="height: 120px;"></div>
        <div class="skel-box" style="height: 120px;"></div>
      </div>
      
      <div class="skel-box" style="height: 400px; margin-bottom: 24px;"></div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
        <div class="skel-box" style="height: 300px;"></div>
        <div class="skel-box" style="height: 300px;"></div>
      </div>
    </div>
  \`,

  // ORDERS SKELETON (Applies to all order tabs)
  'orders': \`
    <div style="padding-top: 32px;">
      <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <div class="skel-box" style="width: 100px; height: 36px; border-radius: 8px;"></div>
      </div>
      
      <div class="skel-frow">
        <div class="skel-box" style="height: 44px; flex: 1; border-radius: 12px;"></div>
        <div class="skel-box" style="height: 44px; width: 140px; border-radius: 12px;"></div>
      </div>

      <div style="margin-top: 24px;">
        <div style="display: flex; gap: 20px; padding: 0 16px 12px; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 12px;">
          <div class="skel-text" style="width: 80px; height: 12px; margin: 0;"></div>
          <div class="skel-text" style="width: 150px; height: 12px; margin: 0;"></div>
          <div class="skel-text" style="width: 120px; height: 12px; margin: 0;"></div>
          <div class="skel-text" style="width: 80px; height: 12px; margin: 0;"></div>
          <div class="skel-text" style="width: 100px; height: 12px; margin: 0;"></div>
        </div>
        
        <div class="skel-flex-col">
          \${Array(6).fill(\`
            <div class="skel-box" style="height: 72px; width: 100%; border-radius: 12px; display: flex; align-items: center; padding: 0 16px; gap: 20px;">
              <div class="skel-text" style="width: 60px; margin:0;"></div>
              <div style="display: flex; align-items: center; gap: 12px; width: 200px;">
                <div class="skel-circle" style="width: 32px; height: 32px;"></div>
                <div class="skel-text" style="width: 100px; margin:0;"></div>
              </div>
              <div class="skel-text" style="width: 120px; margin:0;"></div>
              <div class="skel-text" style="width: 60px; margin:0;"></div>
              <div class="skel-text" style="width: 80px; margin:0;"></div>
              <div class="skel-box" style="width: 80px; height: 26px; border-radius: 20px;"></div>
              <div style="flex:1;"></div>
              <div style="display:flex; gap:8px;">
                 <div class="skel-box" style="width: 32px; height: 32px; border-radius: 8px;"></div>
                 <div class="skel-box" style="width: 32px; height: 32px; border-radius: 8px;"></div>
              </div>
            </div>
          \`).join('')}
        </div>
      </div>
    </div>
  \`,

  // NOTIFICATIONS SKELETON
  'notifications': \`
    <div style="padding-top: 32px;">
      <div style="display: flex; justify-content: flex-end; margin-bottom: 20px;">
        <div class="skel-box" style="width: 140px; height: 36px; border-radius: 8px;"></div>
      </div>
      <div class="skel-grid-5">
        \${Array(12).fill(\`
          <div class="skel-box" style="height: 180px; padding: 20px; display: flex; flex-direction: column;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <div class="skel-circle" style="width: 40px; height: 40px;"></div>
              <div class="skel-circle" style="width: 12px; height: 12px;"></div>
            </div>
            <div class="skel-text" style="width: 80%;"></div>
            <div class="skel-text" style="width: 100%; height: 10px; opacity: 0.6; margin-top: 8px;"></div>
            <div class="skel-text" style="width: 60%; height: 10px; opacity: 0.6;"></div>
            <div style="flex:1;"></div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px;">
              <div class="skel-box" style="width: 60px; height: 20px; border-radius: 12px;"></div>
              <div class="skel-text" style="width: 40px; height: 10px; margin: 0;"></div>
            </div>
          </div>
        \`).join('')}
      </div>
    </div>
  \`,

  // CONTACT & TICKETS SKELETON
  'contact': \`
    <div style="padding-top: 32px; display: flex; height: calc(100vh - 100px); gap: 24px;">
      <div class="skel-box" style="width: 340px; height: 100%; display: flex; flex-direction: column;">
        <div style="padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.05);">
           <div class="skel-text" style="width: 100px; height: 18px;"></div>
           <div class="skel-box" style="width: 100%; height: 40px; border-radius: 8px; margin-top: 16px;"></div>
        </div>
        <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; gap: 16px;">
          \${Array(6).fill(\`
            <div style="display: flex; gap: 16px; align-items: center;">
              <div class="skel-circle" style="width: 48px; height: 48px; flex-shrink: 0;"></div>
              <div style="flex: 1;">
                <div class="skel-text" style="width: 60%; margin-bottom: 6px;"></div>
                <div class="skel-text" style="width: 90%; height: 10px; opacity: 0.6;"></div>
              </div>
            </div>
          \`).join('')}
        </div>
      </div>
      
      <div class="skel-box" style="flex: 1; height: 100%; display: flex; flex-direction: column;">
        <div style="padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; align-items: center; gap: 16px;">
          <div class="skel-circle" style="width: 40px; height: 40px;"></div>
          <div class="skel-text" style="width: 120px; margin: 0;"></div>
        </div>
        <div style="flex: 1; padding: 24px; display: flex; flex-direction: column; gap: 24px;">
           <div style="align-self: flex-start; display: flex; gap: 12px;">
             <div class="skel-circle" style="width: 32px; height: 32px;"></div>
             <div class="skel-box" style="width: 250px; height: 80px; border-radius: 0 16px 16px 16px;"></div>
           </div>
           <div style="align-self: flex-end; display: flex; gap: 12px; flex-direction: row-reverse;">
             <div class="skel-circle" style="width: 32px; height: 32px;"></div>
             <div class="skel-box" style="width: 200px; height: 60px; border-radius: 16px 0 16px 16px;"></div>
           </div>
           <div style="align-self: flex-start; display: flex; gap: 12px;">
             <div class="skel-circle" style="width: 32px; height: 32px;"></div>
             <div class="skel-box" style="width: 300px; height: 100px; border-radius: 0 16px 16px 16px;"></div>
           </div>
        </div>
        <div style="padding: 24px; border-top: 1px solid rgba(255,255,255,0.05);">
           <div class="skel-box" style="width: 100%; height: 50px; border-radius: 25px;"></div>
        </div>
      </div>
    </div>
  \`,

  // GENERIC SKELETON (For Settings, Analytics, etc.)
  'generic': \`
    <div style="padding-top: 32px;">
      <div class="skel-text" style="width: 250px; height: 24px; margin-bottom: 32px;"></div>
      <div class="skel-grid-4">
        <div class="skel-box" style="height: 100px;"></div>
        <div class="skel-box" style="height: 100px;"></div>
        <div class="skel-box" style="height: 100px;"></div>
        <div class="skel-box" style="height: 100px;"></div>
      </div>
      <div class="skel-box" style="width: 100%; height: 500px;"></div>
    </div>
  \`
};

const PAGE_SKELETON_MAP = {
  'dashboard': 'dashboard',
  'all-orders': 'orders',
  'completed-orders': 'orders',
  'pending-orders': 'orders',
  'failed-orders': 'orders',
  'purchased-orders': 'orders',
  'discord-items': 'orders',
  'money-exchange': 'orders',
  'netflix-accounts': 'orders',
  'posts': 'orders',
  'homepage-cards': 'orders',
  'notifications': 'notifications',
  'contact': 'contact',
  'analytics': 'generic',
  'suggestions': 'generic',
  'bug-reports': 'generic',
  'settings': 'generic'
};

class SkeletonManager {
  constructor() {
    this.injectStyles();
  }

  injectStyles() {
    if (document.getElementById('skeleton-system-css')) return;
    const style = document.createElement('style');
    style.id = 'skeleton-system-css';
    style.textContent = SKELETON_CSS;
    document.head.appendChild(style);
  }

  getTemplate(sectionId) {
    const key = PAGE_SKELETON_MAP[sectionId] || 'generic';
    return SKELETON_TEMPLATES[key];
  }

  show(sectionEl, sectionId) {
    // 1. Wrap existing content if not wrapped
    if (!sectionEl.dataset.wrapped) {
      const wrapper = document.createElement('div');
      wrapper.className = 'actual-page-content';
      wrapper.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      wrapper.style.opacity = '0';
      wrapper.style.pointerEvents = 'none';
      
      // Move all children except the pg-head (we want pg-head to show, or actually hide everything and skeleton shows pg-head replacement? The prompt says "Skeleton exactly us page ke final layout ko represent kare" so maybe hide everything)
      // Actually, my skeletons include the padding and title area, so wrap everything!
      while (sectionEl.firstChild) {
        wrapper.appendChild(sectionEl.firstChild);
      }
      sectionEl.appendChild(wrapper);
      sectionEl.dataset.wrapped = "true";
    }
    
    const realContent = sectionEl.querySelector('.actual-page-content');
    if (realContent) {
      realContent.style.opacity = '0';
      realContent.style.pointerEvents = 'none';
    }

    // 2. Show or create skeleton overlay
    let overlay = sectionEl.querySelector('.skeleton-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'skeleton-overlay';
      overlay.innerHTML = this.getTemplate(sectionId);
      sectionEl.appendChild(overlay);
      
      if (getComputedStyle(sectionEl).position === 'static') {
        sectionEl.style.position = 'relative';
      }
    }
    
    overlay.classList.remove('hidden');
  }

  hide(sectionEl) {
    const overlay = sectionEl.querySelector('.skeleton-overlay');
    const realContent = sectionEl.querySelector('.actual-page-content');
    
    if (overlay) {
      overlay.classList.add('hidden');
    }
    
    if (realContent) {
      setTimeout(() => {
        realContent.style.opacity = '1';
        realContent.style.pointerEvents = 'auto';
      }, 100); // Small delay to allow crossfade
    }
  }
}

window.AdminSkeletons = new SkeletonManager();
