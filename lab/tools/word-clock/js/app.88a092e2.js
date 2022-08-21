(function(){"use strict";var t={3074:function(t,n,e){var r=e(9242),o=e(3396),l=e(4870),i=e(7139),a={__name:"BaseChar",props:{char:String,ctrl:String},setup(t){const n=t,e=(0,l.iH)("off"),r=(0,l.iH)(null);return(0,o.YP)((()=>n.ctrl),(t=>{e.value="1"==t?"on":"off",r.value.style.animation="none",r.value.offsetHeight,r.value.style.animation=""})),(n,l)=>((0,o.wg)(),(0,o.iD)("div",{class:(0,i.C_)(["char",e.value]),ref_key:"char_ref",ref:r},(0,i.zw)(t.char),3))}},c=e(89);const u=(0,c.Z)(a,[["__scopeId","data-v-6feff21c"]]);var f=u,s={__name:"BaseLine",props:{text:String,ctrl:String},emits:["update:ctrl","show"],setup(t,{emit:n}){const e=t,r=(0,o.Fl)((()=>e.text.length)),i=(0,l.iH)([]),a=(t,n)=>{let e=new Array(n).fill(0).join("");return t=e+t,t.slice(-n)};(0,o.YP)((()=>e.ctrl),(()=>{let t=a(parseInt(e.ctrl,16).toString(2),r.value),n=t.split("");n.forEach(((t,n)=>{i.value[n]=t}))}),{immediate:!0});const c=t=>{i.value[t]="1"==i.value[t]?"0":"1";let e=i.value.join("");n("update:ctrl",parseInt(e,2).toString(16))};return(e,r)=>((0,o.wg)(),(0,o.iD)("div",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(t.text,((t,e)=>((0,o.wg)(),(0,o.j4)(f,{key:e,char:t,ctrl:i.value[e],onClick:t=>c(e),onMouseenter:r[0]||(r[0]=t=>n("show"))},null,8,["char","ctrl","onClick"])))),128))]))}};const v=s;var p=v,h={__name:"SmartClock",setup(t){let n="ITLISASAMPM\nACQUARTERDC\nTWENTYFIVEX\nHALFBTENFTO\nPASTERUNINE\nONESIXTHREE\nFOURFIVETWO\nEIGHTELEVEN\nSEVENTWELVE\nTENSEOCLOCK".split("\n"),e=n.length;const r=(0,l.iH)(new Array(e).fill("0")),i=(t,n)=>{let e=parseInt(t,16)+parseInt(n,16);return e.toString(16)},a=(t,n,e)=>{t[n]=i(t[n],e)};let c=!1,u=0;const f=()=>{c=!1,r.value=new Array(e).fill("0")},s=()=>{let t=new Date,n=t.getHours(),o=t.getMinutes();c=!0;let l=new Array(e).fill("0");o>=35?(a(l,3,"3"),n=(n+1)%24,o<40?a(l,2,"7fe"):o<45?a(l,2,"7e0"):o<50?a(l,1,"5fc"):o<55?a(l,3,"38"):a(l,2,"1e")):o>=5?(a(l,4,"780"),o<10?a(l,2,"1e"):o<15?a(l,3,"38"):o<20?a(l,1,"5fc"):o<25?a(l,2,"7e0"):o<30?a(l,2,"7fe"):a(l,3,"780")):a(l,9,"3f"),a(l,0,n>=12?"6c3":"6cc"),n%=12,0==n?a(l,8,"3f"):1==n?a(l,5,"700"):2==n?a(l,6,"7"):3==n?a(l,5,"1f"):4==n?a(l,6,"780"):5==n?a(l,6,"78"):6==n?a(l,5,"e0"):7==n?a(l,8,"7c0"):8==n?a(l,7,"7c0"):9==n?a(l,4,"f"):10==n?a(l,9,"700"):a(l,7,"3f"),r.value=l,u&&clearTimeout(u),u=setTimeout((()=>{c&&f()}),5e3)};return(t,e)=>((0,o.wg)(),(0,o.iD)("div",{class:"clock",onClick:s},[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)((0,l.SU)(n),((t,n)=>((0,o.wg)(),(0,o.j4)(p,{key:n,text:t,ctrl:r.value[n],"onUpdate:ctrl":t=>r.value[n]=t,onShow:s},null,8,["text","ctrl","onUpdate:ctrl"])))),128))]))}};const g=(0,c.Z)(h,[["__scopeId","data-v-36e535fc"]]);var d=g;const w=(0,o._)("div",{id:"back"},null,-1);var E={__name:"App",setup(t){return(t,n)=>((0,o.wg)(),(0,o.iD)(o.HY,null,[(0,o.Wm)(d),w],64))}};const m=E;var _=m;(0,r.ri)(_).mount("#app")}},n={};function e(r){var o=n[r];if(void 0!==o)return o.exports;var l=n[r]={exports:{}};return t[r](l,l.exports,e),l.exports}e.m=t,function(){var t=[];e.O=function(n,r,o,l){if(!r){var i=1/0;for(f=0;f<t.length;f++){r=t[f][0],o=t[f][1],l=t[f][2];for(var a=!0,c=0;c<r.length;c++)(!1&l||i>=l)&&Object.keys(e.O).every((function(t){return e.O[t](r[c])}))?r.splice(c--,1):(a=!1,l<i&&(i=l));if(a){t.splice(f--,1);var u=o();void 0!==u&&(n=u)}}return n}l=l||0;for(var f=t.length;f>0&&t[f-1][2]>l;f--)t[f]=t[f-1];t[f]=[r,o,l]}}(),function(){e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,{a:n}),n}}(),function(){e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={143:0};e.O.j=function(n){return 0===t[n]};var n=function(n,r){var o,l,i=r[0],a=r[1],c=r[2],u=0;if(i.some((function(n){return 0!==t[n]}))){for(o in a)e.o(a,o)&&(e.m[o]=a[o]);if(c)var f=c(e)}for(n&&n(r);u<i.length;u++)l=i[u],e.o(t,l)&&t[l]&&t[l][0](),t[l]=0;return e.O(f)},r=self["webpackChunkwatch"]=self["webpackChunkwatch"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(3074)}));r=e.O(r)})();
//# sourceMappingURL=app.88a092e2.js.map