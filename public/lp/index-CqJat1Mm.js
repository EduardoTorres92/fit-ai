(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`1.3.26`;function t(e,t,n){return Math.max(e,Math.min(t,n))}function n(e,t,n){return(1-n)*e+n*t}function r(e,t,r,i){return n(e,t,1-Math.exp(-r*i))}function i(e,t){return(e%t+t)%t}var a=class{isRunning=!1;value=0;from=0;to=0;currentTime=0;lerp;duration;easing;onUpdate;advance(e){if(!this.isRunning)return;let n=!1;if(this.duration&&this.easing){this.currentTime+=e;let r=t(0,this.currentTime/this.duration,1);n=r>=1;let i=n?1:this.easing(r);this.value=this.from+(this.to-this.from)*i}else this.lerp?(this.value=r(this.value,this.to,this.lerp*60,e),Math.round(this.value)===Math.round(this.to)&&(this.value=this.to,n=!0)):(this.value=this.to,n=!0);n&&this.stop(),this.onUpdate?.(this.value,n)}stop(){this.isRunning=!1}fromTo(e,t,{lerp:n,duration:r,easing:i,onStart:a,onUpdate:o}){this.from=this.value=e,this.to=t,this.lerp=n,this.duration=r,this.easing=i,this.currentTime=0,this.isRunning=!0,a?.(),this.onUpdate=o}};function o(e,t){let n;return function(...r){clearTimeout(n),n=setTimeout(()=>{n=void 0,e.apply(this,r)},t)}}var s=class{width=0;height=0;scrollHeight=0;scrollWidth=0;debouncedResize;wrapperResizeObserver;contentResizeObserver;constructor(e,t,{autoResize:n=!0,debounce:r=250}={}){this.wrapper=e,this.content=t,n&&(this.debouncedResize=o(this.resize,r),this.wrapper instanceof Window?window.addEventListener(`resize`,this.debouncedResize):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener(`resize`,this.debouncedResize)}resize=()=>{this.onWrapperResize(),this.onContentResize()};onWrapperResize=()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)};onContentResize=()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)};get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},c=class{events={};emit(e,...t){let n=this.events[e]||[];for(let e=0,r=n.length;e<r;e++)n[e]?.(...t)}on(e,t){return this.events[e]?this.events[e].push(t):this.events[e]=[t],()=>{this.events[e]=this.events[e]?.filter(e=>t!==e)}}off(e,t){this.events[e]=this.events[e]?.filter(e=>t!==e)}destroy(){this.events={}}},l=100/6,u={passive:!1};function d(e,t){return e===1?l:e===2?t:1}var f=class{touchStart={x:0,y:0};lastDelta={x:0,y:0};window={width:0,height:0};emitter=new c;constructor(e,t={wheelMultiplier:1,touchMultiplier:1}){this.element=e,this.options=t,window.addEventListener(`resize`,this.onWindowResize),this.onWindowResize(),this.element.addEventListener(`wheel`,this.onWheel,u),this.element.addEventListener(`touchstart`,this.onTouchStart,u),this.element.addEventListener(`touchmove`,this.onTouchMove,u),this.element.addEventListener(`touchend`,this.onTouchEnd,u)}on(e,t){return this.emitter.on(e,t)}destroy(){this.emitter.destroy(),window.removeEventListener(`resize`,this.onWindowResize),this.element.removeEventListener(`wheel`,this.onWheel,u),this.element.removeEventListener(`touchstart`,this.onTouchStart,u),this.element.removeEventListener(`touchmove`,this.onTouchMove,u),this.element.removeEventListener(`touchend`,this.onTouchEnd,u)}onTouchStart=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:0,y:0},this.emitter.emit(`scroll`,{deltaX:0,deltaY:0,event:e})};onTouchMove=e=>{let{clientX:t,clientY:n}=e.targetTouches?e.targetTouches[0]:e,r=-(t-this.touchStart.x)*this.options.touchMultiplier,i=-(n-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=t,this.touchStart.y=n,this.lastDelta={x:r,y:i},this.emitter.emit(`scroll`,{deltaX:r,deltaY:i,event:e})};onTouchEnd=e=>{this.emitter.emit(`scroll`,{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:e})};onWheel=e=>{let{deltaX:t,deltaY:n,deltaMode:r}=e,i=d(r,this.window.width),a=d(r,this.window.height);t*=i,n*=a,t*=this.options.wheelMultiplier,n*=this.options.wheelMultiplier,this.emitter.emit(`scroll`,{deltaX:t,deltaY:n,event:e})};onWindowResize=()=>{this.window={width:window.innerWidth,height:window.innerHeight}}},p=e=>Math.min(1,1.001-2**(-10*e)),m=class{_isScrolling=!1;_isStopped=!1;_isLocked=!1;_preventNextNativeScrollEvent=!1;_resetVelocityTimeout=null;_rafId=null;_isDraggingSelection=!1;reducedMotionMediaQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);isTouching;isIos;time=0;userData={};lastVelocity=0;velocity=0;direction=0;options;targetScroll;animatedScroll;animate=new a;emitter=new c;dimensions;virtualScroll;constructor({wrapper:t=window,content:n=document.documentElement,eventsTarget:r=t,smoothWheel:i=!0,syncTouch:a=!1,syncTouchLerp:o=.075,touchInertiaExponent:c=1.7,duration:l,easing:u,lerp:d=.1,infinite:m=!1,orientation:h=`vertical`,gestureOrientation:g=h===`horizontal`?`both`:`vertical`,touchMultiplier:_=1,wheelMultiplier:v=1,autoResize:y=!0,prevent:b,virtualScroll:x,overscroll:S=!0,autoRaf:C=!1,anchors:w=!1,autoToggle:T=!1,allowNestedScroll:E=!1,__experimental__naiveDimensions:D=!1,naiveDimensions:O=D,stopInertiaOnNavigate:k=!1,respectReducedMotion:A=!0}={}){window.lenisVersion=e,window.lenis||(window.lenis={}),window.lenis.version=e,h===`horizontal`&&(window.lenis.horizontal=!0),a===!0&&(window.lenis.touch=!0),this.isIos=/(iPad|iPhone|iPod)/g.test(navigator.userAgent),t&&t!==document.documentElement||(t=window),typeof l==`number`&&typeof u!=`function`?u=p:typeof u==`function`&&typeof l!=`number`&&(l=1),this.options={wrapper:t,content:n,eventsTarget:r,smoothWheel:i,syncTouch:a,syncTouchLerp:o,touchInertiaExponent:c,duration:l,easing:u,lerp:d,infinite:m,gestureOrientation:g,orientation:h,touchMultiplier:_,wheelMultiplier:v,autoResize:y,prevent:b,virtualScroll:x,overscroll:S,autoRaf:C,anchors:w,autoToggle:T,allowNestedScroll:E,naiveDimensions:O,stopInertiaOnNavigate:k,respectReducedMotion:A},this.dimensions=new s(t,n,{autoResize:y}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.addEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.addEventListener(`click`,this.onClick),this.options.wrapper.addEventListener(`pointerdown`,this.onPointerDown),this.virtualScroll=new f(r,{touchMultiplier:_,wheelMultiplier:v}),this.virtualScroll.on(`scroll`,this.onVirtualScroll),this.options.autoToggle&&(this.checkOverflow(),this.rootElement.addEventListener(`transitionend`,this.onTransitionEnd)),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener(`scroll`,this.onNativeScroll),this.options.wrapper.removeEventListener(`scrollend`,this.onScrollEnd,{capture:!0}),this.options.wrapper.removeEventListener(`pointerdown`,this.onPointerDown),(this.options.anchors||this.options.stopInertiaOnNavigate)&&this.options.wrapper.removeEventListener(`click`,this.onClick),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this._rafId&&cancelAnimationFrame(this._rafId)}on(e,t){return this.emitter.on(e,t)}off(e,t){return this.emitter.off(e,t)}onScrollEnd=e=>{e instanceof CustomEvent||(this.isScrolling===`smooth`||this.isScrolling===!1)&&e.stopPropagation()};dispatchScrollendEvent=()=>{this.options.wrapper.dispatchEvent(new CustomEvent(`scrollend`,{bubbles:this.options.wrapper===window,detail:{lenisScrollEnd:!0}}))};get overflow(){let e=this.isHorizontal?`overflow-x`:`overflow-y`;return getComputedStyle(this.rootElement)[e]}checkOverflow(){[`hidden`,`clip`].includes(this.overflow)?this.internalStop():this.internalStart()}onTransitionEnd=e=>{e.propertyName?.includes(`overflow`)&&e.target===this.rootElement&&this.checkOverflow()};setScroll(e){this.isHorizontal?this.options.wrapper.scrollTo({left:e,behavior:`instant`}):this.options.wrapper.scrollTo({top:e,behavior:`instant`})}onClick=e=>{let t=e.composedPath().filter(e=>e instanceof HTMLAnchorElement&&e.href).map(e=>new URL(e.href)),n=new URL(window.location.href);if(this.options.anchors){let e=t.find(e=>n.host===e.host&&n.pathname===e.pathname&&e.hash);if(e){let t=typeof this.options.anchors==`object`&&this.options.anchors?this.options.anchors:void 0,n=decodeURIComponent(e.hash);this.scrollTo(n,t);return}}this.options.stopInertiaOnNavigate&&t.some(e=>n.host===e.host&&n.pathname!==e.pathname)&&this.reset()};onPointerDown=e=>{e.button===1&&this.reset()};isTouchOnSelectionHandle(e){let t=window.getSelection();if(!t||t.isCollapsed||t.rangeCount===0)return!1;let n=e.targetTouches[0]??e.changedTouches[0];if(!n)return!1;let r=t.getRangeAt(0).getClientRects();if(r.length===0)return!1;let i=r[0],a=r[r.length-1],o=Math.hypot(n.clientX-i.left,n.clientY-i.top)<=40,s=Math.hypot(n.clientX-a.right,n.clientY-a.bottom)<=40;return o||s}onVirtualScroll=e=>{if(typeof this.options.virtualScroll==`function`&&this.options.virtualScroll(e)===!1)return;let{deltaX:t,deltaY:n,event:r}=e;if(this.emitter.emit(`virtual-scroll`,{deltaX:t,deltaY:n,event:r}),r.ctrlKey||r.lenisStopPropagation)return;let i=r.type.includes(`touch`),a=r.type.includes(`wheel`);if(i&&this.isIos&&(r.type===`touchstart`&&(this._isDraggingSelection=this.isTouchOnSelectionHandle(r)),this._isDraggingSelection)){r.type===`touchend`&&(this._isDraggingSelection=!1);return}this.isTouching=r.type===`touchstart`||r.type===`touchmove`;let o=t===0&&n===0;if(this.options.syncTouch&&i&&r.type===`touchstart`&&o&&!this.isStopped&&!this.isLocked){this.reset();return}let s=this.options.gestureOrientation===`vertical`&&n===0||this.options.gestureOrientation===`horizontal`&&t===0;if(o||s)return;let c=r.composedPath();c=c.slice(0,c.indexOf(this.rootElement));let l=this.options.prevent,u=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`;if(c.find(e=>e instanceof HTMLElement&&(typeof l==`function`&&l?.(e)||e.hasAttribute?.(`data-lenis-prevent`)||u===`vertical`&&e.hasAttribute?.(`data-lenis-prevent-vertical`)||u===`horizontal`&&e.hasAttribute?.(`data-lenis-prevent-horizontal`)||i&&e.hasAttribute?.(`data-lenis-prevent-touch`)||a&&e.hasAttribute?.(`data-lenis-prevent-wheel`)||this.options.allowNestedScroll&&this.hasNestedScroll(e,{deltaX:t,deltaY:n}))))return;if(this.isStopped||this.isLocked){r.cancelable&&r.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&a)){this.isScrolling=`native`,this.animate.stop(),r.lenisStopPropagation=!0;return}let d=n;this.options.gestureOrientation===`both`?d=Math.abs(n)>Math.abs(t)?n:t:this.options.gestureOrientation===`horizontal`&&(d=t),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&this.limit>0&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&n>0||this.animatedScroll===this.limit&&n<0))&&(r.lenisStopPropagation=!0),r.cancelable&&r.preventDefault();let f=i&&this.options.syncTouch,p=i&&r.type===`touchend`;p&&(d=Math.sign(d)*Math.abs(this.velocity)**this.options.touchInertiaExponent),this.scrollTo(this.targetScroll+d,{programmatic:!1,...f?{lerp:p?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})};resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit(`scroll`,this)}onNativeScroll=()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent)this._preventNextNativeScrollEvent=!1;else if(this.isScrolling===!1||this.isScrolling===`native`){let e=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-e,this.direction=Math.sign(this.animatedScroll-e),this.isStopped||(this.isScrolling=`native`),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}};reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.options.autoToggle?this.rootElement.style.removeProperty(`overflow`):this.internalStart())}internalStart(){this.isStopped&&(this.reset(),this.isStopped=!1,this.emit())}stop(){this.isStopped||(this.options.autoToggle?this.rootElement.style.setProperty(`overflow`,`clip`):this.internalStop())}internalStop(){this.isStopped||(this.reset(),this.isStopped=!0,this.emit())}raf=e=>{let t=e-(this.time||e);this.time=e,this.animate.advance(t*.001),this.options.autoRaf&&(this._rafId=requestAnimationFrame(this.raf))};scrollTo(e,{offset:n=0,immediate:r=!1,lock:i=!1,programmatic:a=!0,lerp:o=a?this.options.lerp:void 0,duration:s=a?this.options.duration:void 0,easing:c=a?this.options.easing:void 0,onStart:l,onComplete:u,force:d=!1,userData:f}={}){if(this.prefersReducedMotion&&(a?r=!0:(o=1,s=void 0,c=void 0)),(this.isStopped||this.isLocked)&&!d)return;let m=e,h=n;if(typeof m==`string`&&[`top`,`left`,`start`,`#`].includes(m))m=0;else if(typeof m==`string`&&[`bottom`,`right`,`end`].includes(m))m=this.limit;else{let e=null;if(typeof m==`string`?(e=m.startsWith(`#`)?document.getElementById(m.slice(1)):document.querySelector(m),e||(m===`#top`?m=0:console.warn(`Lenis: Target not found`,m))):m instanceof HTMLElement&&m?.nodeType&&(e=m),e){if(this.options.wrapper!==window){let e=this.rootElement.getBoundingClientRect();h-=this.isHorizontal?e.left:e.top}let t=e.getBoundingClientRect(),n=getComputedStyle(e),r=this.isHorizontal?Number.parseFloat(n.scrollMarginLeft):Number.parseFloat(n.scrollMarginTop),i=getComputedStyle(this.rootElement),a=this.isHorizontal?Number.parseFloat(i.scrollPaddingLeft):Number.parseFloat(i.scrollPaddingTop);m=(this.isHorizontal?t.left:t.top)+this.animatedScroll-(Number.isNaN(r)?0:r)-(Number.isNaN(a)?0:a)}}if(typeof m==`number`){if(m+=h,this.options.infinite){if(a){this.targetScroll=this.animatedScroll=this.scroll;let e=m-this.animatedScroll;e>this.limit/2?m-=this.limit:e<-this.limit/2&&(m+=this.limit)}}else m=t(0,m,this.limit);m===this.targetScroll?(l?.(this),u?.(this)):(this.userData=f??{},r?(this.animatedScroll=this.targetScroll=m,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()})):(a||(this.targetScroll=m),typeof s==`number`&&typeof c!=`function`?c=p:typeof c==`function`&&typeof s!=`number`&&(s=1),this.animate.fromTo(this.animatedScroll,m,{duration:s,easing:c,lerp:o,onStart:()=>{i&&(this.isLocked=!0),this.isScrolling=`smooth`,l?.(this)},onUpdate:(e,t)=>{this.isScrolling=`smooth`,this.lastVelocity=this.velocity,this.velocity=e-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=e,this.setScroll(this.scroll),a&&(this.targetScroll=e),t||this.emit(),t&&(this.reset(),this.emit(),u?.(this),this.userData={},requestAnimationFrame(()=>{this.dispatchScrollendEvent()}),this.preventNextNativeScrollEvent())}})))}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}hasNestedScroll(e,{deltaX:t,deltaY:n}){let r=Date.now();e._lenis||={};let i=e._lenis,a,o,s,c,l,u,d,f,p,m;if(r-(i.time??0)>2e3){i.time=Date.now();let t=window.getComputedStyle(e);if(i.computedStyle=t,a=[`auto`,`overlay`,`scroll`].includes(t.overflowX),o=[`auto`,`overlay`,`scroll`].includes(t.overflowY),l=[`auto`].includes(t.overscrollBehaviorX),u=[`auto`].includes(t.overscrollBehaviorY),i.hasOverflowX=a,i.hasOverflowY=o,!(a||o))return!1;d=e.scrollWidth,f=e.scrollHeight,p=e.clientWidth,m=e.clientHeight,s=d>p,c=f>m,i.isScrollableX=s,i.isScrollableY=c,i.scrollWidth=d,i.scrollHeight=f,i.clientWidth=p,i.clientHeight=m,i.hasOverscrollBehaviorX=l,i.hasOverscrollBehaviorY=u}else s=i.isScrollableX,c=i.isScrollableY,a=i.hasOverflowX,o=i.hasOverflowY,d=i.scrollWidth,f=i.scrollHeight,p=i.clientWidth,m=i.clientHeight,l=i.hasOverscrollBehaviorX,u=i.hasOverscrollBehaviorY;if(!(a&&s||o&&c))return!1;let h=Math.abs(t)>=Math.abs(n)?`horizontal`:`vertical`,g,_,v,y,b,x;if(h===`horizontal`)g=Math.round(e.scrollLeft),_=d-p,v=t,y=a,b=s,x=l;else if(h===`vertical`)g=Math.round(e.scrollTop),_=f-m,v=n,y=o,b=c,x=u;else return!1;return!x&&(g>=_||g<=0)||(v>0?g<_:g>0)&&y&&b}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?`x`:`y`]}get isHorizontal(){return this.options.orientation===`horizontal`}get actualScroll(){let e=this.options.wrapper;return this.isHorizontal?e.scrollX??e.scrollLeft:e.scrollY??e.scrollTop}get scroll(){return this.options.infinite?i(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(e){this._isScrolling!==e&&(this._isScrolling=e,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(e){this._isStopped!==e&&(this._isStopped=e,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(e){this._isLocked!==e&&(this._isLocked=e,this.updateClassName())}get isSmooth(){return this.isScrolling===`smooth`}get prefersReducedMotion(){return this.options.respectReducedMotion&&this.reducedMotionMediaQuery.matches}get className(){let e=`lenis`;return this.options.autoToggle&&(e+=` lenis-autoToggle`),this.isStopped&&(e+=` lenis-stopped`),this.isLocked&&(e+=` lenis-locked`),this.isScrolling&&(e+=` lenis-scrolling`),this.isScrolling===`smooth`&&(e+=` lenis-smooth`),e}updateClassName(){this.cleanUpClassName(),this.className.split(` `).forEach(e=>{this.rootElement.classList.add(e)})}cleanUpClassName(){for(let e of Array.from(this.rootElement.classList))(e===`lenis`||e.startsWith(`lenis-`))&&this.rootElement.classList.remove(e)}},h=matchMedia(`(prefers-reduced-motion: reduce)`).matches,g=matchMedia(`(hover: none)`).matches;function _(){return h?null:new m({lerp:.11,wheelMultiplier:1,smoothWheel:!0,syncTouch:!1,autoRaf:!1})}var v=.34;function y({lenis:e}){e&&(e.options.virtualScroll=t=>{if(t.event.type.includes(`touch`))return!0;let{deltaY:n,event:r}=t;if(r.ctrlKey||!n)return!0;let i=e.targetScroll,a=Math.sign(n),o=e.animatedScroll+a*v*innerHeight;return t.deltaY=(a>0?Math.max(i,Math.min(i+n,o)):Math.min(i,Math.max(i+n,o)))-i,Math.abs(t.deltaY)<.5?(r.cancelable&&r.preventDefault(),!1):!0})}var b=document.documentElement,x=new Set,S=!1,C=!0,w=0,T=NaN,E=NaN;function D(e){e!==S&&(S=e,b.classList.toggle(`is-scrolling`,e),x.forEach(t=>t(e)))}addEventListener(`scroll`,()=>{D(!0),C=!1,clearTimeout(w),w=setTimeout(()=>{C=!0},160)},{passive:!0}),addEventListener(`pointermove`,e=>{if(e.pointerType!==`mouse`)return;let t=e.clientX!==T||e.clientY!==E;T=e.clientX,E=e.clientY,S&&C&&t&&D(!1)},{passive:!0});function O({lenis:e}){let t=document.documentElement,n=document.createElement(`div`);n.className=`sbar`,n.setAttribute(`aria-hidden`,`true`),n.innerHTML=`<div class="sbar__thumb"></div>`,document.body.append(n);let r=n.firstChild,i,a=0,o=()=>Math.max(0,t.scrollHeight-innerHeight),s=()=>e?e.scroll:scrollY;function c(){let e=o();if(n.classList.toggle(`is-none`,e<2),e<2)return;let t=n.clientHeight;a=Math.max(36,t*(innerHeight/(e+innerHeight))),r.style.height=`${a}px`,r.style.transform=`translateY(${(t-a)*Math.min(1,Math.max(0,s()/e))}px)`}function l(){c(),n.classList.add(`is-on`),clearTimeout(i),i=setTimeout(()=>{n.classList.contains(`is-drag`)||n.classList.remove(`is-on`)},900)}e?e.on(`scroll`,l):addEventListener(`scroll`,l,{passive:!0}),addEventListener(`resize`,c),new ResizeObserver(c).observe(document.body),c();let u=0,d=0;r.addEventListener(`pointerdown`,e=>{e.button===0&&(e.preventDefault(),r.setPointerCapture(e.pointerId),u=e.clientY,d=s(),n.classList.add(`is-drag`,`is-on`))}),r.addEventListener(`pointermove`,t=>{if(!n.classList.contains(`is-drag`))return;let r=d+(t.clientY-u)/(n.clientHeight-a)*o();e?e.scrollTo(r,{immediate:!0,force:!0}):scrollTo(0,r)});let f=()=>{n.classList.remove(`is-drag`),l()};r.addEventListener(`pointerup`,f),r.addEventListener(`pointercancel`,f)}function k(){let e=document.querySelector(`.barra`),t=[...document.querySelectorAll(`.barra__links a[data-secao]`)],n=t.map(e=>document.getElementById(e.dataset.secao)),r=document.querySelector(`.hero`),i=null;function a(){e.classList.toggle(`is-solta`,scrollY>r.offsetHeight-90);let a=scrollY+innerHeight*.42,o=null;n.forEach((e,n)=>{e&&e.getBoundingClientRect().top+scrollY<=a&&(o=t[n])}),o!==i&&(i?.classList.remove(`is-atual`),i?.removeAttribute(`aria-current`),o?.classList.add(`is-atual`),o?.setAttribute(`aria-current`,`true`),i=o)}addEventListener(`scroll`,a,{passive:!0}),addEventListener(`resize`,a),a()}function A(e,t,n=1.3){e&&!g?e.scrollTo(t,{duration:n,easing:e=>1-(1-e)**4}):scrollTo({top:t,behavior:h?`auto`:`smooth`})}function j({lenis:e}){document.addEventListener(`click`,t=>{let n=t.target.closest(`a[href^="#"]`);if(!n)return;let r=n.getAttribute(`href`),i=r===`#topo`?document.body:document.querySelector(r);if(!i)return;t.preventDefault();let a=i.hasAttribute(`data-cena`)?0:parseFloat(getComputedStyle(i).paddingTop)-104;A(e,r===`#topo`?0:Math.max(0,i.getBoundingClientRect().top+scrollY+Math.max(0,a))),r!==`#topo`&&(i.setAttribute(`tabindex`,`-1`),i.focus({preventScroll:!0}))})}function M(){let e=[...document.querySelectorAll(`.marco, :is(h1, h2):has(.sobe)`)],t=new IntersectionObserver(e=>{for(let n of e)!n.isIntersecting&&n.boundingClientRect.top>=0||(n.target.classList.add(`is-visto`),t.unobserve(n.target))},{rootMargin:`0px 0px -8% 0px`,threshold:.1});return{ligar(){for(let n of e)n.getBoundingClientRect().top<innerHeight?n.classList.add(`is-visto`):t.observe(n)}}}function N(){let e=document.querySelector(`[data-acende]`);if(!e)return{medir(){},rolar(){}};let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);for(;n.nextNode();)t.push(n.currentNode);for(let e of t){if(!e.textContent.trim())continue;let t=document.createDocumentFragment();for(let n of e.textContent.split(/(\s+)/)){if(!n)continue;if(/^\s+$/.test(n)){t.append(` `);continue}let e=document.createElement(`span`);e.className=`palavra`,e.textContent=n,t.append(e)}e.replaceWith(t)}let r=[...e.querySelectorAll(`.palavra`)],i=0,a=1,o=-1;return{medir(){let t=e.getBoundingClientRect();i=t.top+scrollY,a=t.height},rolar(e){let t=(e+innerHeight*.82-i)/(a+innerHeight*.27),n=Math.round(Math.min(1,Math.max(0,t))*r.length);if(n===o)return;let[s,c]=n>o?[Math.max(0,o),n]:[n,o];for(let e=s;e<c;e++)r[e].classList.toggle(`is-acesa`,e<n);o=n}}}function P({lenis:e}){let t=document.querySelector(`.mod`);if(!t)return{medir(){},rolar(){}};let n=t.querySelector(`.mod__palco`),r=t.querySelector(`.mod__quadro`),i=[`.mod__nums .mod__giga`,`.mod__nomes .mod__giga`,`.mod__passo`,`.mod__lista`].map(e=>[...t.querySelectorAll(e)]),a=i[0].length,[o,s]=t.querySelectorAll(`.mod__ir`),c=0,l=1,u=0;function d(e){if(e!==u){for(let t of i)t.forEach((t,n)=>{t.style.transition=n===e||n===u?``:`none`,t.classList.toggle(`is-ativo`,n===e),t.classList.toggle(`is-depois`,n<e)});i[2].forEach((t,n)=>{t.inert=n!==e}),u=e,r.dataset.passoAtual=e,o.disabled=e===0,s.disabled=e===a-1}}return i[2].forEach((e,t)=>{e.inert=t!==0}),t.addEventListener(`click`,t=>{let n=t.target.closest(`.mod__ir`);if(!n||n.disabled)return;let r=Math.min(a-1,Math.max(0,u+Number(n.dataset.ir)));A(e,c+(r+.5)*l,1.1)}),{medir(){c=t.getBoundingClientRect().top+scrollY,l=(t.offsetHeight-n.offsetHeight)/a},rolar(e){d(Math.min(a-1,Math.max(0,Math.floor((e-c)/l))))}}}var F={whatsapp:``,grade:{seg:[[`01`,`Trote leve + mobilidade`,`Aquecimento · Corrida`,`10 min`],[`02`,`Agachamento goblet 3 × 10-12`,`Força · Academia`,`20 min`],[`03`,`Panturrilha excêntrica 3 × 12`,`Força do corredor`,`8 min`],[`04`,`Prancha 3 × 40 s`,`Core · Calistenia`,`5 min`]],ter:[[`01`,`Trote + educativos`,`Aquecimento · Corrida`,`15 min`],[`02`,`6 × 400 m, 90 s de pausa`,`Tiros · Corrida`,`25 min`],[`03`,`Corrida regenerativa`,`Solto · Corrida`,`10 min`]],qua:[[`01`,`Remada curvada 4 × 8-10`,`Força · Academia`,`15 min`],[`02`,`Supino reto 4 × 8-10`,`Força · Academia`,`15 min`],[`03`,`Elevação pélvica unilateral 3 × 12`,`Força do corredor`,`10 min`]],qui:[[`01`,`Corrida contínua a 6:30/km`,`Rodagem · Corrida`,`35 min`],[`02`,`Acelerações 4 × 80 m`,`Técnica · Corrida`,`8 min`]],sex:[[`01`,`Circuito: 400 m de corrida + farmer walk + wall ball`,`Híbrido · Híbrido`,`30 min`],[`02`,`Canoa 3 × 30 s`,`Core · Calistenia`,`5 min`]],sab:[[`01`,`Corrida leve e constante`,`Longão · Corrida`,`60 min`],[`02`,`Mande o print da corrida`,`XP · FIT.AI`,`1 min`]]}},I=[`seg`,`ter`,`qua`,`qui`,`sex`,`sab`],L={seg:`segunda`,ter:`terça`,qua:`quarta`,qui:`quinta`,sex:`sexta`,sab:`sábado`};function R(){let e=document.querySelector(`.grade`);if(!e)return;let t=[...e.querySelectorAll(`.grade__dia`)],n=e.querySelector(`.grade__aulas`),r=null,i=0;function a(e,a){if(e===r)return;r=e,t.forEach(t=>{let n=t.dataset.dia===e;t.setAttribute(`aria-selected`,n),t.tabIndex=n?0:-1,n&&a&&t.focus()}),n.setAttribute(`aria-label`,`Aulas de ${L[e]}`);let o=++i;[...n.children].forEach(e=>e.classList.remove(`is-vista`)),setTimeout(()=>{o===i&&(n.innerHTML=(F.grade[e]||[]).map(([e,t,n,r],i)=>`
        <li class="aula" style="--i:${i}">
          <span class="aula__hora">${e}</span>
          <span><span class="aula__nome">${t}</span><br><span class="aula__prof">${n}</span></span>
          <span class="aula__dur">${r}</span>
        </li>`).join(``),requestAnimationFrame(()=>requestAnimationFrame(()=>{o===i&&[...n.children].forEach(e=>e.classList.add(`is-vista`))})))},n.children.length?160:0)}e.addEventListener(`click`,e=>{let t=e.target.closest(`.grade__dia`);t&&a(t.dataset.dia)}),e.addEventListener(`keydown`,e=>{if(!e.target.closest(`.grade__dia`))return;let t=I.indexOf(r),n=e.key===`ArrowRight`?t+1:e.key===`ArrowLeft`?t-1:e.key===`Home`?0:e.key===`End`?I.length-1:-1;n<0||n>=I.length||n===t||(e.preventDefault(),a(I[n],!0))}),a(I[new Date().getDay()-1]||`seg`)}function ee(){document.querySelectorAll(`.duvida`).forEach(e=>{let t=e.querySelector(`summary`),n=e.querySelector(`.duvida__corpo`),r=null;t.addEventListener(`click`,t=>{if(!h){if(t.preventDefault(),r?.cancel(),e.open&&!e.classList.contains(`is-fechando`))e.classList.add(`is-fechando`),r=n.animate({height:[`${n.offsetHeight}px`,`0px`]},{duration:460,easing:`cubic-bezier(0.65, 0, 0.35, 1)`}),r.onfinish=()=>{e.open=!1,e.classList.remove(`is-fechando`),r=null};else{let t=e.open?n.offsetHeight:0;e.classList.remove(`is-fechando`),e.open=!0,r=n.animate({height:[`${t}px`,`${n.scrollHeight}px`]},{duration:620,easing:`cubic-bezier(0.16, 1, 0.3, 1)`}),r.onfinish=()=>{r=null}}}})})}var z=e=>e.replace(/\D/g,``).slice(0,11);function B(e){let t=z(e);return t.length<3?t.length?`(${t}`:``:t.length<7?`(${t.slice(0,2)}) ${t.slice(2)}`:t.length<11?`(${t.slice(0,2)}) ${t.slice(2,6)}-${t.slice(6)}`:`(${t.slice(0,2)}) ${t.slice(2,7)}-${t.slice(7)}`}function V(){let e=document.querySelector(`.pedido`);if(!e)return;let t=e.elements.nome,n=e.elements.whatsapp,r=e.querySelector(`.pedido__feito`),i=e.querySelector(`.pedido__campos`),a=``;document.addEventListener(`click`,e=>{let t=e.target.closest(`[data-plano]`);t&&(a=t.dataset.plano)});let o=(e,t)=>{let n=e.closest(`.campo`);return n.classList.toggle(`is-erro`,!!t),t&&(n.querySelector(`.campo__erro`).textContent=t),e.setAttribute(`aria-invalid`,t?`true`:`false`),!t},s=()=>o(t,t.value.trim().length<2?`Escreva o seu nome.`:``),c=()=>o(n,z(n.value).length<10?`Coloque o número com o DDD.`:``);n.addEventListener(`input`,()=>{n.value=B(n.value),n.closest(`.is-erro`)&&c()}),t.addEventListener(`input`,()=>{t.closest(`.is-erro`)&&s()}),t.addEventListener(`blur`,()=>{t.value&&s()}),n.addEventListener(`blur`,()=>{n.value&&c()}),e.addEventListener(`submit`,o=>{o.preventDefault();let l=s(),u=c();if(!l){t.focus();return}if(!u){n.focus();return}let d=new FormData(e),f=`Oi! Quero agendar uma aula experimental de ${d.get(`modalidade`)}, de preferência no período da ${String(d.get(`periodo`)).toLowerCase()}.${a?` Tenho interesse no plano ${a}.`:``} Meu nome é ${t.value.trim()} e o meu WhatsApp é ${n.value}.`;F.whatsapp&&window.open(`https://wa.me/${F.whatsapp}?text=${encodeURIComponent(f)}`,`_blank`,`noopener`),e.classList.add(`is-feito`),i.inert=!0,r.setAttribute(`aria-hidden`,`false`)}),e.querySelector(`.pedido__de-novo`).addEventListener(`click`,()=>{e.classList.remove(`is-feito`),i.inert=!1,r.setAttribute(`aria-hidden`,`true`),t.focus({preventScroll:!0})})}var H=[`anilha`,`halter`,`kettlebell`,`saco`,`bola`,`cadeado`,`cronometro`],te=`
const float PI = 3.14159265;
const float TAU = 6.2831853;

float smin(float a, float b, float k) { float h = max(k - abs(a - b), 0.0) / k; return min(a, b) - h * h * k * 0.25; }
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
mat2 gira(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float caixa2(vec2 p, vec2 b, float r) { vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }
float caixa3(vec3 p, vec3 b, float r) { vec3 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r; }
// cilindro de bordas redondas: d2 = distância até o eixo, h = posição ao longo do eixo
float cil(float d2, float h, float raio, float meia, float r) {
  vec2 d = vec2(d2 - raio + r, abs(h) - meia + r);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float capsula(vec3 p, vec3 a, vec3 b, float r) {
  vec3 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h) - r;
}
// arco em volta do eixo x: raio ra, meia abertura (seno, cosseno) sc, meia espessura rb
float arco(vec2 p, vec2 sc, float ra, float rb) {
  p.y = abs(p.y);
  return ((sc.y * p.y > sc.x * p.x) ? length(p - vec2(sc.y, sc.x) * ra) : abs(length(p) - ra)) - rb;
}

// ---- anilha: disco emborrachado com aro, cubo e três pegas vazadas -------------------------------------------
float anilha(vec3 p) {
  float r = length(p.xy);
  vec2 q = vec2(r, p.z);
  float disco = caixa2(q - vec2(0.56, 0.0), vec2(0.42, 0.072), 0.03);
  float aro = caixa2(q - vec2(0.895, 0.0), vec2(0.105, 0.165), 0.08);
  float cubo = caixa2(q - vec2(0.255, 0.0), vec2(0.105, 0.135), 0.05);
  float d = smin(smin(disco, aro, 0.07), cubo, 0.07);
  // as três pegas: o ângulo dobrado em três e um rasgo em arco em cada terço
  float a = atan(p.y, p.x);
  float terco = TAU / 3.0;
  float af = mod(a + terco * 0.5, terco) - terco * 0.5;
  vec2 pl = vec2(cos(af), sin(af)) * r;
  float pega = arco(pl, vec2(sin(0.46), cos(0.46)), 0.585, 0.078);
  return smax(d, -pega, 0.05);
}
float relevoAnilha(vec3 p) {
  float r = length(p.xy);
  float a = atan(p.y, p.x);
  // a face rebaixada, entre o cubo e o aro: losangos em espiral (ângulo × logaritmo do raio, células quadradas)
  float face = smoothstep(0.385, 0.42, r) * smoothstep(0.775, 0.74, r) * smoothstep(0.045, 0.062, abs(p.z));
  float h = face * losango(vec2(a, log(max(r, 0.05))) * (66.0 / TAU));
  // a banda de rodagem do aro
  float banda = smoothstep(0.972, 0.992, r) * smoothstep(0.10, 0.07, abs(p.z));
  h += banda * losango(vec2(a * (96.0 / TAU), p.z / 0.0655));
  return h;
}

// ---- halter sextavado ----------------------------------------------------------------------------------------
float halter(vec3 p) {
  vec3 q = vec3(abs(p.x) - 0.655, p.y, p.z);
  vec2 s = abs(q.yz);
  float hex = max(s.x * 0.8660254 + s.y * 0.5, s.y) - 0.43;
  vec2 w = vec2(hex + 0.06, abs(q.x) - 0.27 + 0.06);
  float cabeca = min(max(w.x, w.y), 0.0) + length(max(w, 0.0)) - 0.06;
  float eixo = length(p.yz);
  float pega = max(eixo - (0.098 + 0.022 * cos(p.x * PI / 0.42)), abs(p.x) - 0.6);
  float colar = cil(eixo, abs(p.x) - 0.355, 0.165, 0.04, 0.02);
  return smin(smin(cabeca, pega, 0.03), colar, 0.025);
}
float relevoHalter(vec3 p) {
  float zona = smoothstep(0.30, 0.27, abs(p.x)) * smoothstep(0.17, 0.14, length(p.yz));
  return zona * losango(vec2(atan(p.z, p.y) * (22.0 / TAU), p.x / 0.031));
}

// ---- kettlebell ----------------------------------------------------------------------------------------------
float kettle(vec3 p) {
  float corpo = length(p - vec3(0.0, -0.27, 0.0)) - 0.61;
  corpo = smax(corpo, -(p.y + 0.80), 0.07);
  corpo = smax(corpo, abs(p.z) - 0.55, 0.10);
  vec3 a = p - vec3(0.0, 0.34, 0.0);
  a.y -= clamp(a.y, -0.2, 0.1);
  float alca = length(vec2(length(a.xy) - 0.33, a.z)) - 0.086;
  return smin(corpo, alca, 0.13);
}

// ---- saco de pancada -----------------------------------------------------------------------------------------
float saco(vec3 p) {
  vec3 b = p - vec3(0.0, -0.25, 0.0);
  float corpo = cil(length(b.xz), b.y, 0.37, 0.62, 0.13);
  float costura = min(abs(b.y - 0.33), abs(b.y + 0.33));
  corpo += 0.014 * smoothstep(0.035, 0.0, costura);
  vec3 q = vec3(abs(p.x), p.y, abs(p.z));
  float tira = capsula(q, vec3(0.215, 0.31, 0.215), vec3(0.02, 0.80, 0.02), 0.026);
  vec3 e = p - vec3(0.0, 0.90, 0.0);
  float elo = length(vec2(length(e.xy) - 0.082, e.z)) - 0.03;
  return min(smin(corpo, tira, 0.04), elo);
}

// ---- bola de arremesso ---------------------------------------------------------------------------------------
float bola(vec3 p) {
  float d = length(p) - 0.80;
  float gomo = min(min(abs(p.x), abs(p.y)), abs(p.z));
  return d + 0.022 * smoothstep(0.045, 0.0, gomo);
}
float relevoBola(vec3 p) {
  vec3 s = vec3(p.x < 0.0 ? -1.0 : 1.0, p.y < 0.0 ? -1.0 : 1.0, p.z < 0.0 ? -1.0 : 1.0);
  vec3 c = s * 0.57735;
  vec3 t1 = normalize(vec3(s.x, 0.0, -s.z));
  vec3 t2 = cross(c, t1);
  float gomo = min(min(abs(p.x), abs(p.y)), abs(p.z));
  return smoothstep(0.06, 0.11, gomo) * losango(vec2(dot(p, t1), dot(p, t2)) / 0.075);
}

// ---- cadeado aberto ------------------------------------------------------------------------------------------
float cadeado(vec3 p) {
  float corpo = caixa3(p - vec3(0.0, -0.40, 0.0), vec3(0.54, 0.42, 0.21), 0.11);
  // o buraco da chave, só na frente
  vec2 k = p.xy - vec2(0.0, -0.36);
  float chave = min(length(k) - 0.075, caixa2(k - vec2(0.0, -0.12), vec2(0.032, 0.10), 0.02));
  corpo = smax(corpo, -max(chave, 0.15 - p.z), 0.02);
  // a haste em U, levantada e girada em torno da perna direita
  vec3 h = p - vec3(0.29, 0.0, 0.0);
  h.xz = gira(0.72) * h.xz;
  h.x += 0.29;
  h.y -= 0.45;
  float u = length(vec2(length(vec2(h.x, max(h.y, 0.0))) - 0.29, h.z)) - 0.078;
  float corte = h.x > 0.0 ? -(h.y + 0.62) : -(h.y + 0.17);
  u = smax(u, corte, 0.05);
  return min(corpo, u);
}

// ---- cronômetro ----------------------------------------------------------------------------------------------
float crono(vec3 p) {
  vec3 c = p - vec3(0.0, -0.14, 0.0);
  float r = length(c.xy);
  float corpo = cil(r, c.z, 0.73, 0.165, 0.07);
  // o mostrador rebaixado na frente
  corpo = smax(corpo, -cil(r, c.z - 0.21, 0.60, 0.075, 0.02), 0.03);
  // doze marcas das horas
  float a = atan(c.y, c.x);
  float doze = TAU / 12.0;
  float af = mod(a + doze * 0.5, doze) - doze * 0.5;
  vec3 m = vec3(cos(af) * r - 0.50, sin(af) * r, c.z - 0.135);
  float marca = caixa3(m, vec3(0.055, 0.016, 0.02), 0.012);
  // ponteiro e pino
  vec3 f = c - vec3(0.0, 0.0, 0.14);
  float ponteiro = capsula(f, vec3(-0.06, -0.08, 0.0), vec3(0.24, 0.34, 0.0), 0.026);
  float pino = length(f * vec3(1.0, 1.0, 1.6)) - 0.07;
  float d = min(corpo, min(marca, min(ponteiro, pino)));
  // coroa em cima e os dois botões nos ombros
  float coroa = cil(length(p.xz), p.y - 0.755, 0.125, 0.085, 0.03);
  float pescoco = cil(length(p.xz), p.y - 0.63, 0.07, 0.07, 0.01);
  vec3 o = vec3(abs(c.x), c.y, c.z);
  o.xy = gira(0.66) * o.xy;
  float botao = cil(length(o.xz), o.y - 0.80, 0.075, 0.075, 0.025);
  return min(d, min(smin(coroa, pescoco, 0.02), botao));
}
float relevoCrono(vec3 p) {
  float zona = smoothstep(0.68, 0.70, p.y) * smoothstep(0.84, 0.82, p.y) * smoothstep(0.10, 0.118, length(p.xz));
  float u = atan(p.z, p.x) * (18.0 / TAU);
  return zona * (1.0 - 2.0 * abs(fract(u) - 0.5));
}

float forma(int id, vec3 p) {
  if (id == 0) return anilha(p);
  if (id == 1) return halter(p);
  if (id == 2) return kettle(p);
  if (id == 3) return saco(p);
  if (id == 4) return bola(p);
  if (id == 5) return cadeado(p);
  return crono(p);
}
float relevoDe(int id, vec3 p) {
  if (id == 0) return relevoAnilha(p);
  if (id == 1) return relevoHalter(p);
  if (id == 4) return relevoBola(p);
  if (id == 6) return relevoCrono(p);
  return 0.0;
}
`,ne=`
float piramide(vec2 uv) { vec2 g = abs(fract(uv) - 0.5); return 1.0 - 2.0 * max(g.x, g.y); }
float losango(vec2 uv) { return piramide(vec2(uv.x + uv.y, uv.x - uv.y)); }
`,re=`#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`,ie=`#version 300 es
precision highp float;
precision highp int;

uniform vec2 uCentro;   // centro da peça em px do canvas (origem embaixo)
uniform float uRaio;    // px por unidade do mundo (a peça tem raio ~1)
uniform mat3 uRot;      // rotação da peça
uniform ivec3 uForma;   // até três formas misturadas
uniform vec3 uPeso;     // o peso de cada uma (somam 1)
uniform float uTempo;
uniform float uAgito;   // 0 parado, 1 no meio de uma troca: a borracha balança
uniform vec3 uBase;     // cor do corpo
uniform vec3 uLuz;      // cor das caixas de luz
uniform vec3 uContra;   // cor da contraluz
uniform vec4 uHalo;     // luz no fundo, atrás da peça (cor e força)
uniform float uAlfa;
uniform float uPassos;
out vec4 saida;

${ne}
${te}

const float DIST = 7.0;   // câmera
const float BORDA = 1.3;  // esfera que envolve qualquer forma

float mapa(vec3 p) {
  float d = uPeso.x * forma(uForma.x, p);
  if (uPeso.y > 0.001) d += uPeso.y * forma(uForma.y, p);
  if (uPeso.z > 0.001) d += uPeso.z * forma(uForma.z, p);
  if (uAgito > 0.001) {
    // no meio da troca a peça passa por uma bolha: a mistura com uma esfera arredonda as quinas das duas formas
    d = mix(d, length(p) - 0.60, 0.52 * uAgito);
    d += uAgito * 0.028 * sin(p.x * 4.1 + uTempo * 5.3) * sin(p.y * 3.7 - uTempo * 4.1) * sin(p.z * 4.6 + uTempo * 3.2);
  }
  return d;
}
float relevo(vec3 p) {
  float h = uPeso.x * relevoDe(uForma.x, p);
  if (uPeso.y > 0.001) h += uPeso.y * relevoDe(uForma.y, p);
  if (uPeso.z > 0.001) h += uPeso.z * relevoDe(uForma.z, p);
  return h;
}
vec3 normalDe(vec3 p) {
  const vec2 e = vec2(1.0, -1.0) * 0.0014;
  return normalize(e.xyy * mapa(p + e.xyy) + e.yyx * mapa(p + e.yyx) + e.yxy * mapa(p + e.yxy) + e.xxx * mapa(p + e.xxx));
}
float oclusao(vec3 p, vec3 n) {
  float o = 0.0, s = 1.0;
  for (int i = 1; i <= 4; i++) {
    float h = 0.035 * float(i);
    o += (h - mapa(p + n * h)) * s;
    s *= 0.6;
  }
  return clamp(1.0 - 3.2 * o, 0.0, 1.0);
}

// O estúdio: caixas de luz em volta da peça, vistas só no reflexo. b = quanto a borda da caixa esfuma.
float caixaLuz(vec2 p, vec2 c, vec2 m, float b) {
  vec2 d = m - abs(p - c);
  return smoothstep(-b, b, d.x) * smoothstep(-b, b, d.y);
}
vec3 estudio(vec3 r, float b) {
  vec3 c = vec3(mix(0.003, 0.045, smoothstep(-0.5, 1.0, r.y)));
  if (r.y > 0.03) {   // o teto: uma caixa grande e macia, um pouco à esquerda e à frente
    vec2 q = r.xz / r.y;
    c += uLuz * 6.4 * caixaLuz(q, vec2(-0.3, 0.3), vec2(1.1, 0.6), 0.16 + b);
  }
  if (r.z > 0.03) {   // na frente: uma janela alta à esquerda (nítida) e um rebatedor bem fraco
    vec2 q = r.xy / r.z;
    c += uLuz * 3.4 * caixaLuz(q, vec2(-0.6, 0.64), vec2(0.30, 0.27), b);
    c += uLuz * 0.10 * caixaLuz(q, vec2(0.45, -0.05), vec2(0.7, 0.9), 0.5);
  }
  if (r.x < -0.03) {  // tira em pé à esquerda
    vec2 q = r.zy / -r.x;
    c += uLuz * 2.6 * caixaLuz(q, vec2(0.25, 0.15), vec2(0.12, 1.5), b);
  }
  if (r.x > 0.03) {   // tira fina à direita
    vec2 q = r.zy / r.x;
    c += uLuz * 1.7 * caixaLuz(q, vec2(-0.2, 0.0), vec2(0.06, 1.7), b);
  }
  if (r.z < -0.03) {  // contraluz: uma tira forte atrás à direita e uma fraca à esquerda, que desenham a borda
    vec2 q = r.xy / -r.z;
    c += uContra * 2.6 * caixaLuz(q, vec2(0.66, 0.15), vec2(0.30, 1.5), 0.10 + b);
    c += uContra * 0.7 * caixaLuz(q, vec2(-0.7, 0.1), vec2(0.26, 1.3), 0.10 + b);
  }
  if (r.y < -0.03) {  // chão: um rebatedor fraco
    vec2 q = r.xz / -r.y;
    c += uLuz * 0.22 * caixaLuz(q, vec2(0.0, 0.2), vec2(1.4, 0.7), 0.5);
  }
  return c;
}

float ruido(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

void main() {
  vec2 q = (gl_FragCoord.xy - uCentro) / uRaio;
  // a luz no fundo, atrás da peça
  float dq = dot(q, q);
  vec3 halo = uHalo.rgb * uHalo.a * exp(-dq / 1.5);

  vec3 ro = vec3(0.0, 0.0, DIST);
  vec3 rd = normalize(vec3(q, -DIST));
  // a esfera que envolve a peça
  float bq = dot(ro, rd);
  float cq = dot(ro, ro) - BORDA * BORDA;
  float disc = bq * bq - cq;
  float cobre = 0.0;
  vec3 cor = vec3(0.0);
  if (disc > 0.0) {
    float raiz = sqrt(disc);
    float t = -bq - raiz, fim = -bq + raiz;
    mat3 inv = transpose(uRot);
    vec3 o = inv * ro, d = inv * rd;
    float px = 1.0 / (uRaio * DIST);   // o tamanho de um pixel, por unidade de distância
    float menor = 1e9, tMenor = t;
    bool bateu = false;
    float passo = uAgito > 0.001 ? 0.8 : 0.95;
    int limite = int(uPassos);
    for (int i = 0; i < 96; i++) {
      if (i >= limite) break;
      float dist = mapa(o + d * t);
      float rel = dist / t;
      if (rel < menor) { menor = rel; tMenor = t; }
      if (dist < 0.0006 * t) { bateu = true; break; }
      t += dist * passo;
      if (t > fim) break;
    }
    // borda lisa: o raio que passa raspando cobre uma parte do pixel
    cobre = bateu ? 1.0 : 1.0 - smoothstep(0.0, 1.4, menor / px);
    if (cobre > 0.002) {
      vec3 p = o + d * (bateu ? t : tMenor);
      vec3 n = normalDe(p);
      // a recartilha inclina a normal (some quando a célula fica menor que uns pixels)
      // (e também de raspão, onde viraria chuvisco)
      float fino = smoothstep(55.0, 150.0, uRaio) * smoothstep(0.1, 0.42, dot(uRot * n, -rd));
      if (fino > 0.0) {
        const float e = 0.004;
        float h0 = relevo(p);
        if (h0 > 0.0005 || relevo(p + n.yzx * 0.01) > 0.0005) {
          vec3 g = vec3(relevo(p + vec3(e, 0.0, 0.0)), relevo(p + vec3(0.0, e, 0.0)), relevo(p + vec3(0.0, 0.0, e))) - h0;
          g /= e;
          g -= n * dot(g, n);
          n = normalize(n - g * 0.016 * fino);
        }
      }
      float ao = oclusao(p, n);
      vec3 N = normalize(uRot * n);
      vec3 V = -rd;
      vec3 R = reflect(rd, N);
      float nv = clamp(dot(N, V), 0.0, 1.0);
      float fres = 0.04 + 0.96 * pow(1.0 - nv, 5.0);
      vec3 L = normalize(vec3(-0.45, 0.8, 0.55));
      float dif = max(dot(N, L), 0.0);
      cor = uBase * (0.45 + 2.3 * dif) * ao;
      // reflexo nítido (o verniz) e um reflexo largo por baixo (a borracha)
      cor += estudio(R, 0.03) * fres * mix(0.3, 1.0, ao) * 1.35;
      cor += estudio(R, 0.6) * 0.0045 * ao;
      cor = cor / (1.0 + 0.55 * cor);
      cor = pow(cor, vec3(1.0 / 2.2));
    }
  }
  halo += (ruido(gl_FragCoord.xy) - 0.5) / 255.0 * step(0.0005, uHalo.a);
  // a luz do fundo sai como branco com alfa (cor nunca maior que o alfa): somada com alfa zero, o Safari
  // estourava as cores quando ela passava sobre um cartão claro
  halo = max(halo, 0.0);
  vec4 fundo = vec4(halo, max(halo.r, max(halo.g, halo.b)));
  saida = mix(fundo, vec4(cor, 1.0), cobre) * uAlfa;
}`;function U(e,t,n){let r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),!e.getShaderParameter(r,e.COMPILE_STATUS))throw Error(`shader: ${e.getShaderInfoLog(r)}`);return r}function ae(e,{dprMax:t=2}={}){let n=e.getContext(`webgl2`,{alpha:!0,antialias:!1,premultipliedAlpha:!0,powerPreference:`high-performance`});if(!n)throw Error(`sem WebGL2`);let r=n.createProgram();if(n.attachShader(r,U(n,n.VERTEX_SHADER,re)),n.attachShader(r,U(n,n.FRAGMENT_SHADER,ie)),n.linkProgram(r),!n.getProgramParameter(r,n.LINK_STATUS))throw Error(`programa: ${n.getProgramInfoLog(r)}`);n.useProgram(r);let i=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,i),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),n.STATIC_DRAW);let a=n.getAttribLocation(r,`aPos`);n.enableVertexAttribArray(a),n.vertexAttribPointer(a,2,n.FLOAT,!1,0,0);let o={};for(let e of[`uCentro`,`uRaio`,`uRot`,`uForma`,`uPeso`,`uTempo`,`uAgito`,`uBase`,`uLuz`,`uContra`,`uHalo`,`uAlfa`,`uPassos`])o[e]=n.getUniformLocation(r,e);n.disable(n.DEPTH_TEST),n.clearColor(0,0,0,0);let s=0,c=0,l=1,u=1,d={base:[.0045,.0045,.005],luz:[1,1,1],contra:[1,1,1],halo:[1,1,1,0],passos:80};function f(r,i){s=r,c=i,l=Math.min(devicePixelRatio||1,t)*u;let a=Math.round(r*l),o=Math.round(i*l);(e.width!==a||e.height!==o)&&(e.width=a,e.height=o),n.viewport(0,0,a,o)}function p(t,r){n.disable(n.SCISSOR_TEST),n.clear(n.COLOR_BUFFER_BIT),n.enable(n.SCISSOR_TEST),n.uniform1f(o.uTempo,r),n.uniform3fv(o.uBase,d.base),n.uniform3fv(o.uLuz,d.luz),n.uniform3fv(o.uContra,d.contra),n.uniform4fv(o.uHalo,d.halo),n.uniform1f(o.uPassos,d.passos);for(let r of t){if(!(r.alfa>.003)||!(r.raio>1))continue;let t=r.x*l,i=(c-r.y)*l,a=r.raio*l,s=a*(d.halo[3]>5e-4?2.9:1.34)+2,u=Math.max(0,Math.floor(t-s)),f=Math.max(0,Math.floor(i-s)),p=Math.min(e.width,Math.ceil(t+s)),m=Math.min(e.height,Math.ceil(i+s));p<=u||m<=f||(n.scissor(u,f,p-u,m-f),n.uniform2f(o.uCentro,t,i),n.uniform1f(o.uRaio,a),n.uniformMatrix3fv(o.uRot,!1,r.rot),n.uniform3i(o.uForma,r.formas[0],r.formas[1],r.formas[2]),n.uniform3f(o.uPeso,r.pesos[0],r.pesos[1],r.pesos[2]),n.uniform1f(o.uAgito,r.agito||0),n.uniform1f(o.uAlfa,r.alfa),n.drawArrays(n.TRIANGLES,0,3))}}return{gl:n,medir:f,desenhar:p,material:d,definirQualidade(e){u=e,f(s,c)},get qualidade(){return u}}}var W={deEuler(e,t,n){let r=Math.PI/360,[i,a,o,s,c,l]=[Math.sin(e*r),Math.cos(e*r),Math.sin(t*r),Math.cos(t*r),Math.sin(n*r),Math.cos(n*r)],u=[0,0,c,l],d=[i,0,0,a],f=[0,o,0,s];return W.mul(f,W.mul(d,u))},mul(e,t){return[e[3]*t[0]+e[0]*t[3]+e[1]*t[2]-e[2]*t[1],e[3]*t[1]-e[0]*t[2]+e[1]*t[3]+e[2]*t[0],e[3]*t[2]+e[0]*t[1]-e[1]*t[0]+e[2]*t[3],e[3]*t[3]-e[0]*t[0]-e[1]*t[1]-e[2]*t[2]]},mistura(e,t,n){let r=e[0]*t[0]+e[1]*t[1]+e[2]*t[2]+e[3]*t[3]<0?-1:1,i=[e[0]+(t[0]*r-e[0])*n,e[1]+(t[1]*r-e[1])*n,e[2]+(t[2]*r-e[2])*n,e[3]+(t[3]*r-e[3])*n],a=Math.hypot(i[0],i[1],i[2],i[3])||1;return[i[0]/a,i[1]/a,i[2]/a,i[3]/a]},matriz(e,t=new Float32Array(9)){let[n,r,i,a]=e;return t[0]=1-2*(r*r+i*i),t[1]=2*(n*r+i*a),t[2]=2*(n*i-r*a),t[3]=2*(n*r-i*a),t[4]=1-2*(n*n+i*i),t[5]=2*(r*i+n*a),t[6]=2*(n*i+r*a),t[7]=2*(r*i-n*a),t[8]=1-2*(n*n+r*r),t}},G=[W.deEuler(-14,24,0),W.deEuler(18,-32,24),W.deEuler(-8,28,-6),W.deEuler(-6,24,5),W.deEuler(24,32,12),W.deEuler(-6,-26,6),W.deEuler(-10,22,-8)],oe=1.5,se=1.2,ce=.95,le=[.16,.84],K=(e,t=0,n=1)=>Math.min(n,Math.max(t,e)),q=e=>(e=K(e),e*e*e*(e*(e*6-15)+10));function J(e,t=null){let n=0,r=0;for(let i=e;i&&i!==t;i=i.offsetParent)n+=i.offsetLeft,r+=i.offsetTop;return[n,r]}function Y(e,t){let n=/^#?([0-9a-f]{6})$/i.exec(e.trim());return n?[0,2,4].map(e=>(parseInt(n[1].slice(e,e+2),16)/255)**2.2):t}function X({canvas:e,reduzido:t=!1}){let n=matchMedia(`(max-width: 760px)`).matches,r=ae(e,{dprMax:2});r.material.passos=n?64:80;let i=H.length,a=[],o=1,s=1,c=0,l=new Float32Array(i),u=new Float32Array(i),d=G[0].slice(),f=0,p=oe,m=0,h=-1,g=-1,_=!1,v=0,y=0,b=0,x=0,S=0,C=0,w=0,T=1,E=!1,D=0,O=90,k={x:0,y:0,raio:0,rot:new Float32Array(9),formas:[0,0,0],pesos:[1,0,0],agito:0,alfa:1},A=Array.from({length:i},(e,t)=>t);function j(){let e=getComputedStyle(document.documentElement);r.material.base=Y(e.getPropertyValue(`--peca`),r.material.base),r.material.luz=Y(e.getPropertyValue(`--peca-luz`),[1,1,1]),r.material.contra=Y(e.getPropertyValue(`--peca-contra`),[1,1,1]),r.material.halo=[1,1,1,parseFloat(e.getPropertyValue(`--peca-halo`))||0]}function M(){innerWidth!==o&&(s=innerHeight),o=innerWidth,r.medir(e.clientWidth,e.clientHeight);let t=Math.max(0,document.documentElement.scrollHeight-innerHeight),n=[];for(let e of document.querySelectorAll(`[data-vaga]`)){let r=e.offsetWidth,i=e.offsetHeight;if(Math.min(r,i)<8)continue;let a=(e.dataset.formas||e.dataset.forma||H[0]).split(/\s+/).map(e=>Math.max(0,H.indexOf(e))),o=e.dataset.pose?W.deEuler(...e.dataset.pose.split(/\s+/).map(Number)):null,c=Math.min(r,i)/2,l=e.dataset.voo?e.dataset.voo.split(/\s+/).map(Number):le,u=e.hasAttribute(`data-preso`)&&e.closest(`[data-palco]`);if(u){let t=u.parentElement,[s,d]=J(e,u),f=J(t)[1],p=f+t.offsetHeight-u.offsetHeight,m=e=>(e<f?f-e:e>p?p-e:0)+d+i/2,h=(p-f)/a.length;a.forEach((e,t)=>n.push({x:s+r/2,yEm:m,raio:c,voo:l,forma:e,pose:o||G[e],S:f+(t+.5)*h}))}else{let[u,d]=J(e),f=d+i/2,p=parseFloat(getComputedStyle(e).getPropertyValue(`--foco`))||.5;n.push({x:u+r/2,yEm:e=>f-e,raio:c,voo:l,forma:a[0],pose:o||G[a[0]],S:K(f-s*p,0,t)})}}for(let e=1;e<n.length;e++)n[e].S<n[e-1].S+60&&(n[e].S=n[e-1].S+60);a=n,!E&&a.length&&(c=N(scrollY).perto,l.fill(0),l[a[c].forma]=1,d=a[c].pose.slice(),E=!0),c=Math.min(c,Math.max(0,a.length-1))}function N(e){let t=0;for(;t<a.length-2&&e>=a[t+1].S;)t++;let n=a[t],r=a[Math.min(t+1,a.length-1)],i=r===n?0:K((e-n.S)/(r.S-n.S));return{i:t,a:n,b:r,t:i,perto:i<.5||r===n?t:t+1}}addEventListener(`pointermove`,e=>{e.pointerType===`mouse`&&(h=e.clientX,g=e.clientY,_=!0)},{passive:!0}),document.documentElement.addEventListener(`pointerleave`,()=>{_=!1});function P(e,n){if(!a.length)return;let E=Math.min(.05,w?(e-w)/1e3:.016);w=e;let j=e/1e3,{i:M,a:P,b:F,t:I}=N(n),L=q((I-P.voo[0])/(P.voo[1]-P.voo[0])),R=P.yEm(n),ee=F.yEm(n),z=P.x+(F.x-P.x)*L,B=R+(ee-R)*L,V=P.raio+(F.raio-P.raio)*L,H;H=c===M?I>.51?M+1:M:c===M+1?I<.49?M:M+1:I<.5?M:M+1,H=Math.min(H,a.length-1),H!==c&&(a[H].forma!==a[c].forma&&(t||(f+=H>c?360:-360),p=P.x===F.x&&P.yEm===F.yEm?se:oe),c=H);let te=a[c].forma,ne=t?1:E/p,re=0;for(let e=0;e<i;e++){let t=+(e===te)-l[e];l[e]+=Math.sign(t)*Math.min(Math.abs(t),ne),u[e]=q(l[e]),re+=u[e]}A.sort((e,t)=>u[t]-u[e]);let ie=u[A[0]]+u[A[1]]+u[A[2]]||1;for(let e=0;e<3;e++)k.formas[e]=A[e],k.pesos[e]=u[A[e]]/ie;k.agito=t?0:q(2*(1-k.pesos[0]));let U=p/ce;d=W.mistura(d,a[c].pose,1-Math.exp(-E/(.3*U))),f*=Math.exp(-E/(.5*U)),m+=E/U,Math.abs(f)<.02&&(f=0);let ae=_?K((h-z)/o,-1,1):0,G=_?K((g-B)/s,-1,1):0;b+=((ae*20-v)*70-b*9)*E,v+=b*E,x+=((G*14-y)*70-x*9)*E,y+=x*E;let le=(n-C)/Math.max(E,.001);C=n,S+=(K(-le/s*9,-15,15)-S)*(1-Math.exp(-E/.16));let J=0,Y=1;if(T<1){T=Math.min(1,T+E/1.5);let e=(1-(1-(1-T)**4))*o*.5;z+=e,J=-e/Math.max(V,1)*57.2958,Y=K(T*5)}let X=t?[0,0]:[Math.sin(j*.41+1)*3.5,Math.sin(j*.55)*7],Z=W.mul(d,W.deEuler(0,0,J));Z=W.mul(W.deEuler(y+X[0]+S,v+X[1]+f,0),Z),W.matriz(Z,k.rot),k.x=z,k.y=B,k.raio=V,k.alfa=Y;let ue=B<-V*3||B>s+V*3;r.desenhar(ue?[]:[k],m),--O<0?(D=D*.9+E*.1,D>.024&&r.qualidade>.56&&(r.definirQualidade(r.qualidade*.8),O=120,D=.016)):D=.016}return j(),{medir:M,quadro:P,entrar(){!t&&scrollY<20&&(T=0)},get paradas(){return a},peca:r}}window.__kiloViva=!0;var Z=document.documentElement,ue=document.querySelector(`.peca`),Q=_();y({lenis:Q}),O({lenis:Q}),k(),j({lenis:Q});var de=M(),fe=N(),pe=P({lenis:Q});R(),ee(),V();var $=null;try{$=X({canvas:ue,reduzido:h})}catch(e){console.warn(`Kilo: sem a peça 3D.`,e),Z.classList.add(`sem-peca`)}function me(){fe.medir(),pe.medir(),$?.medir()}function he(e){Q?.raf(e);let t=scrollY;fe.rolar(t),pe.rolar(t),$?.quadro(e,t),requestAnimationFrame(he)}Promise.race([Promise.all([document.fonts.load(`900 80px "Big Shoulders Stencil Variable"`),document.fonts.load(`900 80px "Big Shoulders L"`,`L`),document.fonts.ready]),new Promise(e=>setTimeout(e,1800))]).then(()=>{me(),de.ligar(),$?.entrar(),requestAnimationFrame(he),requestAnimationFrame(()=>ue.classList.add(`is-pronta`)),window.__kilo={percurso:$,lenis:Q}});var ge=0,_e=()=>{cancelAnimationFrame(ge),ge=requestAnimationFrame(me)};addEventListener(`resize`,_e),new ResizeObserver(_e).observe(document.body);