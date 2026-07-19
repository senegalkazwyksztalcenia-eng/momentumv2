var MomentumLightbulb=(function(e){Object.defineProperty(e,Symbol.toStringTag,{value:`Module`});var t=`M60 9 C41 9 27 27 25 49 C23 67 27 83 33 95 C35 99 37 103 38 107 L38 111 C38 113 40 115 43 115 L77 115 C80 115 82 113 82 111 L82 107 C83 103 85 99 87 95 C93 83 97 67 95 49 C93 27 79 9 60 9 Z`,n=[0,1,2,3,4,5,6].map(e=>`<line class="lightbulb__thread" x1="41" y1="${127+e*4.6}" x2="79" y2="${127+e*4.6}" stroke="rgba(50,55,62,0.4)" stroke-width="1"/>`).join(``);function r(){let e=document.createElement(`div`);return e.className=`lightbulb lightbulb--off`,e.setAttribute(`aria-hidden`,`true`),e.innerHTML=`
    <span class="lightbulb__bloom"></span>
    <span class="lightbulb__bloom lightbulb__bloom--tight"></span>
    <span class="lightbulb__pool"></span>
    <svg class="lightbulb__svg" viewBox="0 0 120 176" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <radialGradient id="bulb-inner-glow" cx="50%" cy="48%" r="50%">
          <stop offset="0%" stop-color="#fffef9" stop-opacity="0.98"/>
          <stop offset="14%" stop-color="#fff4dc" stop-opacity="0.94"/>
          <stop offset="32%" stop-color="#ffe6a8" stop-opacity="0.78"/>
          <stop offset="52%" stop-color="#ffc860" stop-opacity="0.48"/>
          <stop offset="72%" stop-color="#ff9e30" stop-opacity="0.18"/>
          <stop offset="100%" stop-color="#ff7800" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bulb-thunder-glow" cx="50%" cy="48%" r="46%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
          <stop offset="22%" stop-color="#eef4fc" stop-opacity="0.78"/>
          <stop offset="48%" stop-color="#d8e6f8" stop-opacity="0.42"/>
          <stop offset="100%" stop-color="#c0d4f0" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="bulb-thunder-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="1"/>
          <stop offset="38%" stop-color="#f4f8ff" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#dce8f8" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bulb-glass-thunder" x1="28%" y1="2%" x2="72%" y2="98%">
          <stop offset="0%" stop-color="rgba(250, 253, 255, 0.42)"/>
          <stop offset="50%" stop-color="rgba(220, 235, 252, 0.22)"/>
          <stop offset="100%" stop-color="rgba(200, 220, 245, 0.08)"/>
        </linearGradient>
        <radialGradient id="bulb-filament-hot" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="45%" stop-color="#ffe8b0"/>
          <stop offset="100%" stop-color="#ffaa44"/>
        </radialGradient>
        <linearGradient id="bulb-glass-off" x1="12%" y1="4%" x2="88%" y2="96%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.07)"/>
          <stop offset="45%" stop-color="rgba(255,255,255,0.02)"/>
          <stop offset="100%" stop-color="rgba(200,210,225,0.04)"/>
        </linearGradient>
        <linearGradient id="bulb-glass-lit" x1="32%" y1="2%" x2="68%" y2="98%">
          <stop offset="0%" stop-color="rgba(255, 250, 238, 0.32)"/>
          <stop offset="50%" stop-color="rgba(255, 218, 130, 0.18)"/>
          <stop offset="100%" stop-color="rgba(255, 175, 70, 0.06)"/>
        </linearGradient>
        <linearGradient id="bulb-rim" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0.55)"/>
          <stop offset="18%" stop-color="rgba(255,255,255,0.08)"/>
          <stop offset="82%" stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="100%" stop-color="rgba(255,255,255,0.42)"/>
        </linearGradient>
        <linearGradient id="bulb-chrome" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#eceff2"/>
          <stop offset="14%" stop-color="#c8ced6"/>
          <stop offset="38%" stop-color="#9aa3ad"/>
          <stop offset="58%" stop-color="#b8bfc8"/>
          <stop offset="78%" stop-color="#8e969f"/>
          <stop offset="100%" stop-color="#6e757d"/>
        </linearGradient>
        <linearGradient id="bulb-chrome-lit" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f5e8c8"/>
          <stop offset="30%" stop-color="#d4b878"/>
          <stop offset="70%" stop-color="#a88848"/>
          <stop offset="100%" stop-color="#7a6538"/>
        </linearGradient>
        <linearGradient id="bulb-chrome-shine" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
          <stop offset="40%" stop-color="rgba(255,255,255,0.55)"/>
          <stop offset="60%" stop-color="rgba(255,255,255,0)"/>
        </linearGradient>
        <clipPath id="bulb-glass-clip">
          <path d="${t}"/>
        </clipPath>
        <filter id="bulb-inner-scatter" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur"/>
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.65 0" result="soft"/>
          <feMerge>
            <feMergeNode in="soft"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="bulb-filament-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge>
            <feMergeNode in="blur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="bulb-flare" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6"/>
        </filter>
      </defs>
      <path class="lightbulb__glass" d="${t}" fill="url(#bulb-glass-off)"/>
      <path class="lightbulb__rim" d="${t}" fill="none" stroke="url(#bulb-rim)" stroke-width="1.1"/>
      <path class="lightbulb__inner" d="${t}" fill="url(#bulb-inner-glow)" clip-path="url(#bulb-glass-clip)"/>
      <path class="lightbulb__thunder-fill" d="${t}" fill="url(#bulb-thunder-glow)" clip-path="url(#bulb-glass-clip)"/>
      <circle class="lightbulb__thunder-core" cx="60" cy="64" r="12" fill="url(#bulb-thunder-core)" clip-path="url(#bulb-glass-clip)"/>
      <path class="lightbulb__glass-tint" d="${t}" fill="url(#bulb-glass-lit)"/>
      <path class="lightbulb__glass-thunder-tint" d="${t}" fill="url(#bulb-glass-thunder)" clip-path="url(#bulb-glass-clip)"/>
      <path class="lightbulb__specular" d="M38 28 C36 42 35 58 38 72 C39 78 40 84 41 88" stroke="rgba(255,255,255,0.65)" stroke-width="2.8" stroke-linecap="round" opacity="0.7"/>
      <ellipse class="lightbulb__specular-dot" cx="76" cy="52" rx="3.5" ry="8" fill="rgba(255,255,255,0.18)" transform="rotate(14 76 52)"/>
      <g class="lightbulb__internals" clip-path="url(#bulb-glass-clip)">
        <path class="lightbulb__stem" d="M60 115 L60 94" stroke="rgba(180,188,200,0.5)" stroke-width="2.4" stroke-linecap="round"/>
        <path class="lightbulb__wire" d="M60 94 L43 72" stroke="rgba(110,108,102,0.75)" stroke-width="0.85" stroke-linecap="round"/>
        <path class="lightbulb__wire" d="M60 94 L77 72" stroke="rgba(110,108,102,0.75)" stroke-width="0.85" stroke-linecap="round"/>
        <path class="lightbulb__filament" d="M43 72 C45.5 68 47.5 72 50 72 C52.5 72 54.5 68 57 72 C59.5 76 61.5 72 64 72 C66.5 72 68.5 68 71 72 C73.5 72 75 70 77 72" stroke-width="1.05" stroke-linecap="round" stroke-linejoin="round"/>
        <path class="lightbulb__filament-core" d="M46 72 C48 70 52 70 54 72 C56 74 58 72 60 72 C62 72 64 74 66 72 C68 70 72 70 74 72" stroke-width="0.55" stroke-linecap="round"/>
      </g>
      <g class="lightbulb__flare" filter="url(#bulb-flare)">
        <line x1="60" y1="64" x2="60" y2="50" stroke="rgba(248, 252, 255, 0.45)" stroke-width="0.6"/>
        <line x1="60" y1="64" x2="48" y2="56" stroke="rgba(240, 248, 255, 0.3)" stroke-width="0.45"/>
        <line x1="60" y1="64" x2="72" y2="56" stroke="rgba(240, 248, 255, 0.3)" stroke-width="0.45"/>
        <line x1="60" y1="64" x2="52" y2="70" stroke="rgba(235, 244, 252, 0.22)" stroke-width="0.4"/>
        <line x1="60" y1="64" x2="68" y2="70" stroke="rgba(235, 244, 252, 0.22)" stroke-width="0.4"/>
      </g>
      <path class="lightbulb__neck" d="M43 115 L43 119 C43 121 45 123 47 123 L73 123 C75 123 77 121 77 119 L77 115" fill="rgba(210,215,225,0.15)" stroke="rgba(255,255,255,0.14)" stroke-width="0.55"/>
      <g class="lightbulb__base">
        <rect class="lightbulb__base-body" x="39" y="123" width="42" height="36" rx="2" fill="url(#bulb-chrome)"/>
        <rect class="lightbulb__base-glow" x="39" y="123" width="42" height="36" rx="2" fill="url(#bulb-chrome-lit)" opacity="0"/>
        <rect x="39" y="123" width="42" height="36" rx="2" fill="url(#bulb-chrome-shine)"/>
        ${n}
        <rect x="45" y="156" width="30" height="5" rx="1" class="lightbulb__contact"/>
      </g>
    </svg>`,e}function i(e,t,n=!1){e.className=[`lightbulb`,`lightbulb--${t}`,n?`lightbulb--revealed`:``].filter(Boolean).join(` `)}function a(e){let t=e>>>0||1;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function o(e,t){return Math.max(2,Math.min(t-2,e))}function s(e){return e.map((e,t)=>`${t===0?`M`:`L`} ${e.x.toFixed(1)} ${e.y.toFixed(1)}`).join(` `)}function c(e,t,n,r,i){if(r===0)return[e,t];let a=1.85+i()*.55,o=(i()*2-1)*n*(.15+i()*.35),s={x:(e.x+t.x)/2+(i()*2-1)*n+o,y:(e.y+t.y)/2+(i()*2-1)*n*(.04+i()*.14)},l=c(e,s,n/a,r-1,i),u=c(s,t,n/a,r-1,i);return[...l.slice(0,-1),...u]}function l(e,t,n,r){return e.map((i,a)=>a===0||a===e.length-1||n()>.58?{...i}:{x:o(i.x+(n()*2-1)*r,t),y:i.y+(n()*2-1)*r*.18})}function u(e,t,n,r){let i=n*r,a=e.map(e=>{if(e.y<=i)return{...e};let r=Math.min(1,(e.y-i)/(n-i)),a=r*r*(3-2*r),o=a*a;return{x:e.x*(1-o)+t*o,y:e.y}});return a.length>0&&(a[a.length-1]={x:t,y:n}),a}function d(e,t,n,r){return{d:s(e),kind:t,intensity:n,delay:r}}function f(e,t,n,r={}){let i=a(n),s=r.endX??e/2,f=r.endY??t,p=r.startX??s+(i()*2-1)*e*(.12+i()*.14),m=r.roughness??e*(.34+i()*.14),h=6+Math.floor(i()*3),g=c({x:p,y:0},{x:s+(i()*2-1)*4,y:f},m*(.9+i()*.25),h,i).map(t=>({x:o(t.x,e),y:t.y}));g=l(g,e,i,m*.09),g=u(g,s,f,.5),g[0]={x:p,y:0},g[g.length-1]={x:s,y:f};let _=[],v=r.branchMaxY??f*.58,y=f*.55,b=r.branchCount??8+Math.floor(i()*8),x=new Set;for(let t=0;t<b;t+=1){let t=g.map((e,t)=>({p:e,idx:t})).filter(({p:e,idx:t})=>{if(t<2||t>g.length-8||e.y<f*.03||e.y>y)return!1;for(let e of x)if(Math.abs(e-t)<3)return!1;return!0});if(t.length===0)break;let n=t[Math.floor(i()*t.length)];x.add(n.idx);let r=n.p,a=i()>.48?1:-1,s=f*(.035+i()*.13),u=s*(.45+i()*.95),p=s*(.25+i()*.55),h=i()<.1?-p*(.08+i()*.2):0,b={x:o(r.x+a*u*(.55+i()*.7),e),y:Math.min(v,r.y+p+h)},S=m*(.28+i()*.28),C=c(r,b,S,2+Math.floor(i()*4),i).map(t=>({x:o(t.x,e),y:t.y}));C=l(C,e,i,S*.14),_.push(d(C,`branch`,.45+i()*.55,i()*.12));let w=i()<.35?0:i()<.7?1:2;for(let t=0;t<w&&!(C.length<3);t+=1){let t=1+Math.floor(i()*(C.length-2)),n=C[t];if(n.y>v*.92)continue;let r=i()>.5?1:-1,a=f*(.018+i()*.05),s=l(c(n,{x:o(n.x+r*a*(.5+i()*.8),e),y:Math.min(v,n.y+a*(.2+i()*.45))},S*.35,2,i),e,i,S*.08);_.push(d(s,`twig`,.25+i()*.45,i()*.16))}}if(i()>.2){let t=g.filter(e=>e.y>f*.06&&e.y<y*.85);if(t.length>0){let n=t[Math.floor(i()*t.length)],r=i()>.5?1:-1,a=f*(.02+i()*.05),s=c(n,{x:o(n.x+r*a*(.8+i()),e),y:n.y+a*(.15+i()*.35)},m*.2,2,i);_.push(d(s,`twig`,.3+i()*.35,i()*.08))}}let S=10+Math.floor(i()*10),C=g.filter(e=>e.y<f*.48&&e.y>f*.02);for(let t=0;t<S&&C.length>0;t+=1){let t=C[Math.floor(i()*C.length)],n=i()>.5?1:-1,r=f*(.006+i()*.024),a={x:o(t.x+n*r*(.65+i()*.9),e),y:Math.min(v,t.y+r*(.25+i()*.55))};_.push(d([t,a],`twig`,.12+i()*.22,i()*.14))}return{main:d(g,`main`,1,0),forks:_}}var p=120*2.5,m=176*3.55,h=60/120*p,g=64/176*m,_=g+6;function v(e,t,n){let r=`bulb-strike__${e}`;return n?`${r} ${r}--main`:`${r} ${r}--fork ${r}--${t.kind}`}function y(e,t,n){return e.map(e=>`<path d="${e.d}" class="${v(t,e,n)}" pathLength="100" style="--fork-intensity:${e.intensity};--fork-delay:${e.delay}"/>`).join(``)}function b(e){let t=f(p,m,1337+e*7919,{endX:h,endY:g,branchMaxY:m*.58,roughness:p*.36}),n=[t.main],r=t.forks,i=document.createElement(`div`);return i.className=`bulb-strike`,i.setAttribute(`aria-hidden`,`true`),i.innerHTML=`
    <svg class="bulb-strike__svg" viewBox="0 0 ${p} ${_}" preserveAspectRatio="xMidYMax meet">
      <defs>
        <linearGradient id="bolt-core-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#c8d8f0" stop-opacity="0.7"/>
          <stop offset="30%" stop-color="#eef4ff"/>
          <stop offset="65%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#ffffff"/>
        </linearGradient>
        <linearGradient id="bolt-blue-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(80, 140, 255, 0.5)"/>
          <stop offset="50%" stop-color="rgba(120, 180, 255, 0.85)"/>
          <stop offset="100%" stop-color="rgba(160, 210, 255, 0.7)"/>
        </linearGradient>
        <linearGradient id="bolt-violet-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(90, 60, 180, 0.35)"/>
          <stop offset="45%" stop-color="rgba(120, 90, 220, 0.55)"/>
          <stop offset="100%" stop-color="rgba(140, 110, 230, 0.3)"/>
        </linearGradient>
        <filter id="bolt-violet-filter" x="-120%" y="-5%" width="340%" height="110%">
          <feGaussianBlur stdDeviation="7"/>
        </filter>
        <filter id="bolt-blue-filter" x="-80%" y="-4%" width="260%" height="108%">
          <feGaussianBlur stdDeviation="3.5"/>
        </filter>
        <filter id="bolt-core-filter" x="-50%" y="-3%" width="200%" height="106%">
          <feGaussianBlur stdDeviation="0.6" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        <filter id="bolt-fork-filter" x="-40%" y="-4%" width="180%" height="108%">
          <feGaussianBlur stdDeviation="1.2"/>
        </filter>
      </defs>
      ${y(r,`violet`,!1)}
      ${y(n,`violet`,!0)}
      ${y(r,`blue`,!1)}
      ${y(n,`blue`,!0)}
      ${y(n,`core`,!0)}
      <circle class="bulb-strike__terminus" cx="${h}" cy="${g}" r="2.2"/>
      <circle class="bulb-strike__terminus-burst" cx="${h}" cy="${g}" r="7"/>
    </svg>`,i}var x=2e3,S=3200,C=6200,w=7400;function T(e){let t=[],n=`off`,r=0,i=!1,a=()=>e({phase:n,strikeKey:r,contentVisible:i}),o=(e,n)=>{t.push(window.setTimeout(e,n))},s=()=>{n=`strike`,r+=1,a()},c=()=>{n=`lit`,i=!0,a()};return a(),o(s,x),o(c,S),o(s,C),o(c,w),()=>t.forEach(window.clearTimeout)}var E=1300,D=class e{constructor(e,t={}){this.container=e,this.options={ctaText:`ODKRYJ TERAZ`,ctaHref:`#`,showCta:!0,autoplay:!0,...t},this.phase=`off`,this.contentVisible=!1,this.strikeEl=null,this.bulbEl=null,this.root=null,this.cleanup=null,this.render(),this.options.autoplay&&this.play()}render(){this.container.innerHTML=``,this.root=document.createElement(`div`),this.root.className=`ms-bulb-widget ms-bulb-widget--off`,this.root.setAttribute(`role`,`img`),this.root.setAttribute(`aria-label`,`Animowana żarówka z błyskawicą`);let e=document.createElement(`div`);if(e.className=`ms-bulb-widget__zone`,this.bulbEl=r(),e.appendChild(this.bulbEl),this.root.appendChild(e),this.options.showCta){let e=document.createElement(`a`);e.className=`ms-bulb-widget__cta`,e.href=this.options.ctaHref,e.innerHTML=`
        <span class="ms-bulb-widget__pill">
          <span class="ms-bulb-widget__text">${this.options.ctaText}</span>
          <span class="ms-bulb-widget__arrow">›</span>
        </span>`,this.root.appendChild(e)}this.container.appendChild(this.root)}setPhase(e,t=this.contentVisible){this.phase=e,this.contentVisible=t,this.root.className=[`ms-bulb-widget`,`ms-bulb-widget--${e}`,t||e===`lit`?`ms-bulb-widget--lit`:``].filter(Boolean).join(` `),i(this.bulbEl,e,t)}showStrike(e){this.strikeEl&&=(this.strikeEl.remove(),null);let t=this.root.querySelector(`.ms-bulb-widget__zone`);this.strikeEl=b(e),t.insertBefore(this.strikeEl,this.bulbEl),window.setTimeout(()=>{this.strikeEl&&=(this.strikeEl.remove(),null)},E)}play(){this.stop(),this.setPhase(`off`,!1),this.cleanup=T(({phase:e,strikeKey:t,contentVisible:n})=>{e===`strike`&&this.showStrike(t),this.setPhase(e,n)})}stop(){this.cleanup&&=(this.cleanup(),null)}destroy(){this.stop(),this.container.innerHTML=``}static mount(t,n){let r=typeof t==`string`?document.querySelector(t):t;if(!r)throw Error(`MomentumLightbulb: target element not found`);return new e(r,n)}};return typeof window<`u`&&(window.MomentumLightbulb=D,document.querySelectorAll(`[data-momentum-lightbulb]`).forEach(e=>{D.mount(e,{ctaText:e.dataset.ctaText||`ODKRYJ TERAZ`,ctaHref:e.dataset.ctaHref||`#`,showCta:e.dataset.showCta!==`false`,autoplay:e.dataset.autoplay!==`false`})})),e.MomentumLightbulb=D,e})({});