if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let t={};const c=e=>i(e,o),d={module:{uri:o},exports:t,require:c};n[o]=Promise.all(s.map((e=>d[e]||c(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-UNmLaylN.js",revision:null},{url:"assets/workbox-window.prod.es5-prqDwDSL.js",revision:null},{url:"index.html",revision:"adda82fe11c067ed8c51a6d7185ae547"},{url:"pen_192.png",revision:"8d3b60e66b92cc9153a3c026a2ff8ebc"},{url:"pen_512.png",revision:"f7d4d2b0534320b589d83eb31d5febea"},{url:"pen_mask.png",revision:"4cf0c17340acfdeec978e1b7a5ce4b0f"},{url:"manifest.webmanifest",revision:"14e31ae164e65cf16574161e5ca3dc15"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
