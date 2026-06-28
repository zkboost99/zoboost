function genieEaseOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function genieEaseInCubic(t: number): number {
  return t * t * t;
}

export function injectGenieKeyframes(
  btnRect: DOMRect,
  modalWidth: number,
  modalHeight: number,
  styleId: string = 'dynamic-genie-styles'
) {
  if (typeof window === 'undefined') return;
  
  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;
  const modalCenterX = window.innerWidth / 2;
  const modalCenterY = window.innerHeight / 2;
  
  const tx = btnCenterX - modalCenterX;
  const ty = btnCenterY - modalCenterY;
  
  const sx = btnRect.width / modalWidth;
  const sy = btnRect.height / modalHeight;
  
  let openKeyframes = '';
  let closeKeyframes = '';
  
  const steps = 30;
  
  for (let s = 0; s <= steps; s++) {
    const pct = (s / steps) * 100;
    const t = s / steps;
    
    // Open keyframes
    const p = t;
    const easeTrans = genieEaseOutCubic(p);
    
    const currTx = tx * (1 - easeTrans);
    const currTy = ty * (1 - easeTrans);
    const currSx = sx + (1 - sx) * easeTrans;
    const currSy = sy + (1 - sy) * Math.pow(easeTrans, 0.8);
    const opacity = Math.min(1, p * 2.5);
    
    const N = 12;
    const leftPoints = [];
    const rightPoints = [];
    
    for (let i = 0; i <= N; i++) {
      const yVal = i / N;
      const yPct = yVal * 100;
      
      const delay = 0.45;
      const threshold = delay * (1 - yVal);
      const sliceOpenProgress = Math.max(0, Math.min(1, (p - threshold) / (1 - delay)));
      
      const squeeze = 1 - sliceOpenProgress;
      
      const bendOffset = Math.sin(yVal * Math.PI) * Math.sin(p * Math.PI) * (tx * 0.12);
      const bendPct = (bendOffset / modalWidth) * 100;
      
      const targetCenterX = 50 + bendPct;
      const halfWidth = 50 * (1 - Math.pow(squeeze, 1.5));
      
      const leftX = targetCenterX - halfWidth;
      const rightX = targetCenterX + halfWidth;
      
      leftPoints.push(`${leftX.toFixed(2)}% ${yPct.toFixed(2)}%`);
      rightPoints.unshift(`${rightX.toFixed(2)}% ${yPct.toFixed(2)}%`);
    }
    
    const polygonStr = `polygon(${[...leftPoints, ...rightPoints].join(', ')})`;
    
    openKeyframes += `
      ${pct.toFixed(2)}% {
        transform: translate(${currTx.toFixed(1)}px, ${currTy.toFixed(1)}px) scale(${currSx.toFixed(3)}, ${currSy.toFixed(3)});
        clip-path: ${polygonStr};
        opacity: ${opacity.toFixed(2)};
      }
    `;
  }
  
  for (let s = 0; s <= steps; s++) {
    const pct = (s / steps) * 100;
    const t = s / steps; 
    
    const easeTrans = genieEaseInCubic(t);
    const p = 1 - t;
    
    const currTx = tx * easeTrans;
    const currTy = ty * easeTrans;
    const currSx = sx + (1 - sx) * (1 - easeTrans);
    const currSy = sy + (1 - sy) * Math.pow(1 - easeTrans, 1.2);
    const opacity = Math.max(0, p * 1.5);
    
    const N = 12;
    const leftPoints = [];
    const rightPoints = [];
    
    for (let i = 0; i <= N; i++) {
      const yVal = i / N;
      const yPct = yVal * 100;
      
      const delay = 0.45;
      const threshold = delay * (1 - yVal);
      const sliceOpenProgress = Math.max(0, Math.min(1, (p - threshold) / (1 - delay)));
      
      const squeeze = 1 - sliceOpenProgress;
      
      const bendOffset = Math.sin(yVal * Math.PI) * Math.sin(p * Math.PI) * (tx * 0.12);
      const bendPct = (bendOffset / modalWidth) * 100;
      
      const targetCenterX = 50 + bendPct;
      const halfWidth = 50 * (1 - Math.pow(squeeze, 1.5));
      
      const leftX = targetCenterX - halfWidth;
      const rightX = targetCenterX + halfWidth;
      
      leftPoints.push(`${leftX.toFixed(2)}% ${yPct.toFixed(2)}%`);
      rightPoints.unshift(`${rightX.toFixed(2)}% ${yPct.toFixed(2)}%`);
    }
    
    const polygonStr = `polygon(${[...leftPoints, ...rightPoints].join(', ')})`;
    
    closeKeyframes += `
      ${pct.toFixed(2)}% {
        transform: translate(${currTx.toFixed(1)}px, ${currTy.toFixed(1)}px) scale(${currSx.toFixed(3)}, ${currSy.toFixed(3)});
        clip-path: ${polygonStr};
        opacity: ${opacity.toFixed(2)};
      }
    `;
  }
  
  let styleEl = document.getElementById(styleId);
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }
  
  styleEl.innerHTML = `
    @keyframes genie-open-${styleId} {
      ${openKeyframes}
    }
    @keyframes genie-close-${styleId} {
      ${closeKeyframes}
    }
    .genie-open-anim {
      animation: genie-open-${styleId} 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards !important;
    }
    .genie-close-anim {
      animation: genie-close-${styleId} 0.4s cubic-bezier(0.8, 0, 0.2, 1) forwards !important;
    }
  `;
}
