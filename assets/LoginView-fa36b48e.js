import{J as ke,b as c,K as Ke,g as je,r as V,L as we,e as We,h as Q,f as Se,M as Ue,N as ee,m as Pe,O as Ye,d as Xe,j as Ce,P as te,V as Ze,Q as qe,R as Ge,S as Je,U as Qe,W as ae,X as P,Y as Ie,Z as et,B as tt,$ as at,a0 as ot,o as d,c as x,v as h,F as oe,s as m,q as t,p as W,a as y,n as I,w as R,t as U,E as B,x as se,H as X,a1 as st,a2 as nt,a3 as lt,G as Y,a4 as rt,y as it,a5 as _e,C as ut,_ as ct,I as Ee}from"./index-8a2f206a.js";import{c as dt,u as pt,d as ft,a as vt,b as ht}from"./use-form-item-0b678903.js";const mt=()=>ke&&/firefox/i.test(window.navigator.userAgent),ne="update:modelValue",yt=o=>/([\uAC00-\uD7AF\u3130-\u318F])+/gi.test(o),bt=["class","style"],gt=/^on[A-Z]/,xt=(o={})=>{const{excludeListeners:f=!1,excludeKeys:n}=o,a=c(()=>((n==null?void 0:n.value)||[]).concat(bt)),r=je();return r?c(()=>{var i;return Ke(Object.entries((i=r.proxy)==null?void 0:i.$attrs).filter(([u])=>!a.value.includes(u)&&!(f&&gt.test(u))))}):c(()=>({}))};function wt(o){const f=V();function n(){if(o.value==null)return;const{selectionStart:r,selectionEnd:i,value:u}=o.value;if(r==null||i==null)return;const S=u.slice(0,Math.max(0,r)),p=u.slice(Math.max(0,i));f.value={selectionStart:r,selectionEnd:i,value:u,beforeTxt:S,afterTxt:p}}function a(){if(o.value==null||f.value==null)return;const{value:r}=o.value,{beforeTxt:i,afterTxt:u,selectionStart:S}=f.value;if(i==null||u==null||S==null)return;let p=r.length;if(r.endsWith(u))p=r.length-u.length;else if(r.startsWith(i))p=i.length;else{const b=i[S-1],_=r.indexOf(b,S-1);_!==-1&&(p=_+1)}o.value.setSelectionRange(p,p)}return[n,a]}let g;const St=`
  height:0 !important;
  visibility:hidden !important;
  ${mt()?"":"overflow:hidden !important;"}
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important;
`,Ct=["letter-spacing","line-height","padding-top","padding-bottom","font-family","font-weight","font-size","text-rendering","text-transform","width","text-indent","padding-left","padding-right","border-width","box-sizing"];function It(o){const f=window.getComputedStyle(o),n=f.getPropertyValue("box-sizing"),a=Number.parseFloat(f.getPropertyValue("padding-bottom"))+Number.parseFloat(f.getPropertyValue("padding-top")),r=Number.parseFloat(f.getPropertyValue("border-bottom-width"))+Number.parseFloat(f.getPropertyValue("border-top-width"));return{contextStyle:Ct.map(u=>`${u}:${f.getPropertyValue(u)}`).join(";"),paddingSize:a,borderSize:r,boxSizing:n}}function ze(o,f=1,n){var a;g||(g=document.createElement("textarea"),document.body.appendChild(g));const{paddingSize:r,borderSize:i,boxSizing:u,contextStyle:S}=It(o);g.setAttribute("style",`${S};${St}`),g.value=o.value||o.placeholder||"";let p=g.scrollHeight;const b={};u==="border-box"?p=p+i:u==="content-box"&&(p=p-r),g.value="";const _=g.scrollHeight-r;if(we(f)){let v=_*f;u==="border-box"&&(v=v+r+i),p=Math.max(v,p),b.minHeight=`${v}px`}if(we(n)){let v=_*n;u==="border-box"&&(v=v+r+i),p=Math.min(v,p)}return b.height=`${p}px`,(a=g.parentNode)==null||a.removeChild(g),g=void 0,b}const _t=We({id:{type:String,default:void 0},size:dt,disabled:Boolean,modelValue:{type:Q([String,Number,Object]),default:""},type:{type:String,default:"text"},resize:{type:String,values:["none","both","horizontal","vertical"]},autosize:{type:Q([Boolean,Object]),default:!1},autocomplete:{type:String,default:"off"},formatter:{type:Function},parser:{type:Function},placeholder:{type:String},form:{type:String},readonly:{type:Boolean,default:!1},clearable:{type:Boolean,default:!1},showPassword:{type:Boolean,default:!1},showWordLimit:{type:Boolean,default:!1},suffixIcon:{type:Se},prefixIcon:{type:Se},containerRole:{type:String,default:void 0},label:{type:String,default:void 0},tabindex:{type:[String,Number],default:0},validateEvent:{type:Boolean,default:!0},inputStyle:{type:Q([Object,Array,String]),default:()=>Ue({})}}),Et={[ne]:o=>ee(o),input:o=>ee(o),change:o=>ee(o),focus:o=>o instanceof FocusEvent,blur:o=>o instanceof FocusEvent,clear:()=>!0,mouseleave:o=>o instanceof MouseEvent,mouseenter:o=>o instanceof MouseEvent,keydown:o=>o instanceof Event,compositionstart:o=>o instanceof CompositionEvent,compositionupdate:o=>o instanceof CompositionEvent,compositionend:o=>o instanceof CompositionEvent},zt=["role"],kt=["id","type","disabled","formatter","parser","readonly","autocomplete","tabindex","aria-label","placeholder","form"],Pt=["id","tabindex","disabled","readonly","autocomplete","aria-label","placeholder","form"],Vt=Pe({name:"ElInput",inheritAttrs:!1}),Nt=Pe({...Vt,props:_t,emits:Et,setup(o,{expose:f,emit:n}){const a=o,r=Ye(),i=Xe(),u=c(()=>{const e={};return a.containerRole==="combobox"&&(e["aria-haspopup"]=r["aria-haspopup"],e["aria-owns"]=r["aria-owns"],e["aria-expanded"]=r["aria-expanded"]),e}),S=c(()=>[a.type==="textarea"?re.b():s.b(),s.m(Ve.value),s.is("disabled",z.value),s.is("exceed",Fe.value),{[s.b("group")]:i.prepend||i.append,[s.bm("group","append")]:i.append,[s.bm("group","prepend")]:i.prepend,[s.m("prefix")]:i.prefix||a.prefixIcon,[s.m("suffix")]:i.suffix||a.suffixIcon||a.clearable||a.showPassword,[s.bm("suffix","password-clear")]:D.value&&q.value},r.class]),p=c(()=>[s.e("wrapper"),s.is("focus",N.value)]),b=xt({excludeKeys:c(()=>Object.keys(u.value))}),{form:_,formItem:v}=pt(),{inputId:le}=ft(a,{formItemContext:v}),Ve=vt(),z=ht(),s=Ce("input"),re=Ce("textarea"),O=te(),C=te(),N=V(!1),Z=V(!1),$=V(!1),A=V(!1),ie=V(),H=te(a.inputStyle),F=c(()=>O.value||C.value),ue=c(()=>{var e;return(e=_==null?void 0:_.statusIcon)!=null?e:!1}),T=c(()=>(v==null?void 0:v.validateState)||""),ce=c(()=>T.value&&Ze[T.value]),Ne=c(()=>A.value?qe:Ge),$e=c(()=>[r.style,a.inputStyle]),de=c(()=>[a.inputStyle,H.value,{resize:a.resize}]),E=c(()=>Je(a.modelValue)?"":String(a.modelValue)),D=c(()=>a.clearable&&!z.value&&!a.readonly&&!!E.value&&(N.value||Z.value)),q=c(()=>a.showPassword&&!z.value&&!a.readonly&&!!E.value&&(!!E.value||N.value)),k=c(()=>a.showWordLimit&&!!b.value.maxlength&&(a.type==="text"||a.type==="textarea")&&!z.value&&!a.readonly&&!a.showPassword),G=c(()=>E.value.length),Fe=c(()=>!!k.value&&G.value>Number(b.value.maxlength)),Te=c(()=>!!i.suffix||!!a.suffixIcon||D.value||a.showPassword||k.value||!!T.value&&ue.value),[Le,Me]=wt(O);Qe(C,e=>{if(Re(),!k.value||a.resize!=="both")return;const l=e[0],{width:w}=l.contentRect;ie.value={right:`calc(100% - ${w+15+6}px)`}});const L=()=>{const{type:e,autosize:l}=a;if(!(!ke||e!=="textarea"||!C.value))if(l){const w=_e(l)?l.minRows:void 0,j=_e(l)?l.maxRows:void 0,xe=ze(C.value,w,j);H.value={overflowY:"hidden",...xe},P(()=>{C.value.offsetHeight,H.value=xe})}else H.value={minHeight:ze(C.value).minHeight}},Re=(e=>{let l=!1;return()=>{var w;if(l||!a.autosize)return;((w=C.value)==null?void 0:w.offsetParent)===null||(e(),l=!0)}})(L),M=()=>{const e=F.value;!e||e.value===E.value||(e.value=E.value)},J=async e=>{Le();let{value:l}=e.target;if(a.formatter&&(l=a.parser?a.parser(l):l,l=a.formatter(l)),!$.value){if(l===E.value){M();return}n(ne,l),n("input",l),await P(),M(),Me()}},pe=e=>{n("change",e.target.value)},fe=e=>{n("compositionstart",e),$.value=!0},ve=e=>{var l;n("compositionupdate",e);const w=(l=e.target)==null?void 0:l.value,j=w[w.length-1]||"";$.value=!yt(j)},he=e=>{n("compositionend",e),$.value&&($.value=!1,J(e))},Be=()=>{A.value=!A.value,K()},K=async()=>{var e;await P(),(e=F.value)==null||e.focus()},Oe=()=>{var e;return(e=F.value)==null?void 0:e.blur()},me=e=>{N.value=!0,n("focus",e)},ye=e=>{var l;N.value=!1,n("blur",e),a.validateEvent&&((l=v==null?void 0:v.validate)==null||l.call(v,"blur").catch(w=>Ie()))},Ae=e=>{Z.value=!1,n("mouseleave",e)},He=e=>{Z.value=!0,n("mouseenter",e)},be=e=>{n("keydown",e)},De=()=>{var e;(e=F.value)==null||e.select()},ge=()=>{n(ne,""),n("change",""),n("clear"),n("input","")};return ae(()=>a.modelValue,()=>{var e;P(()=>L()),a.validateEvent&&((e=v==null?void 0:v.validate)==null||e.call(v,"change").catch(l=>Ie()))}),ae(E,()=>M()),ae(()=>a.type,async()=>{await P(),M(),L()}),et(()=>{!a.formatter&&a.parser,M(),P(L)}),f({input:O,textarea:C,ref:F,textareaStyle:de,autosize:tt(a,"autosize"),focus:K,blur:Oe,select:De,clear:ge,resizeTextarea:L}),(e,l)=>at((d(),x("div",se(t(u),{class:t(S),style:t($e),role:e.containerRole,onMouseenter:He,onMouseleave:Ae}),[h(" input "),e.type!=="textarea"?(d(),x(oe,{key:0},[h(" prepend slot "),e.$slots.prepend?(d(),x("div",{key:0,class:m(t(s).be("group","prepend"))},[W(e.$slots,"prepend")],2)):h("v-if",!0),y("div",{class:m(t(p))},[h(" prefix slot "),e.$slots.prefix||e.prefixIcon?(d(),x("span",{key:0,class:m(t(s).e("prefix"))},[y("span",{class:m(t(s).e("prefix-inner")),onClick:K},[W(e.$slots,"prefix"),e.prefixIcon?(d(),I(t(B),{key:0,class:m(t(s).e("icon"))},{default:R(()=>[(d(),I(U(e.prefixIcon)))]),_:1},8,["class"])):h("v-if",!0)],2)],2)):h("v-if",!0),y("input",se({id:t(le),ref_key:"input",ref:O,class:t(s).e("inner")},t(b),{type:e.showPassword?A.value?"text":"password":e.type,disabled:t(z),formatter:e.formatter,parser:e.parser,readonly:e.readonly,autocomplete:e.autocomplete,tabindex:e.tabindex,"aria-label":e.label,placeholder:e.placeholder,style:e.inputStyle,form:a.form,onCompositionstart:fe,onCompositionupdate:ve,onCompositionend:he,onInput:J,onFocus:me,onBlur:ye,onChange:pe,onKeydown:be}),null,16,kt),h(" suffix slot "),t(Te)?(d(),x("span",{key:1,class:m(t(s).e("suffix"))},[y("span",{class:m(t(s).e("suffix-inner")),onClick:K},[!t(D)||!t(q)||!t(k)?(d(),x(oe,{key:0},[W(e.$slots,"suffix"),e.suffixIcon?(d(),I(t(B),{key:0,class:m(t(s).e("icon"))},{default:R(()=>[(d(),I(U(e.suffixIcon)))]),_:1},8,["class"])):h("v-if",!0)],64)):h("v-if",!0),t(D)?(d(),I(t(B),{key:1,class:m([t(s).e("icon"),t(s).e("clear")]),onMousedown:nt(t(lt),["prevent"]),onClick:ge},{default:R(()=>[X(t(st))]),_:1},8,["class","onMousedown"])):h("v-if",!0),t(q)?(d(),I(t(B),{key:2,class:m([t(s).e("icon"),t(s).e("password")]),onClick:Be},{default:R(()=>[(d(),I(U(t(Ne))))]),_:1},8,["class"])):h("v-if",!0),t(k)?(d(),x("span",{key:3,class:m(t(s).e("count"))},[y("span",{class:m(t(s).e("count-inner"))},Y(t(G))+" / "+Y(t(b).maxlength),3)],2)):h("v-if",!0),t(T)&&t(ce)&&t(ue)?(d(),I(t(B),{key:4,class:m([t(s).e("icon"),t(s).e("validateIcon"),t(s).is("loading",t(T)==="validating")])},{default:R(()=>[(d(),I(U(t(ce))))]),_:1},8,["class"])):h("v-if",!0)],2)],2)):h("v-if",!0)],2),h(" append slot "),e.$slots.append?(d(),x("div",{key:1,class:m(t(s).be("group","append"))},[W(e.$slots,"append")],2)):h("v-if",!0)],64)):(d(),x(oe,{key:1},[h(" textarea "),y("textarea",se({id:t(le),ref_key:"textarea",ref:C,class:t(re).e("inner")},t(b),{tabindex:e.tabindex,disabled:t(z),readonly:e.readonly,autocomplete:e.autocomplete,style:t(de),"aria-label":e.label,placeholder:e.placeholder,form:a.form,onCompositionstart:fe,onCompositionupdate:ve,onCompositionend:he,onInput:J,onFocus:me,onBlur:ye,onChange:pe,onKeydown:be}),null,16,Pt),t(k)?(d(),x("span",{key:0,style:rt(ie.value),class:m(t(s).e("count"))},Y(t(G))+" / "+Y(t(b).maxlength),7)):h("v-if",!0)],64))],16,zt)),[[ot,e.type!=="hidden"]])}});var $t=it(Nt,[["__file","/home/runner/work/element-plus/element-plus/packages/components/input/src/input.vue"]]);const Ft=ut($t);const Tt={},Lt={class:"flex h-screen relative"},Mt=y("div",{class:"flex-1 h-full bg-white"},null,-1),Rt=y("div",{class:"flex-1 h-full bg-[#1c3b67]"},"这里是登录页面",-1),Bt={class:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 shadow-lg bg-white"},Ot={class:"flex h-full bg-white text-slate-200"},At={class:"flex-1"},Ht=y("div",{class:"flex-1 h-full bg-[#1c3b67]"},[Ee(" 登录模块 "),y("span",{class:"drop-shadow"},"UserLogin"),Ee(" 欢迎登录， Lor 后台管理系统 ")],-1);function Dt(o,f){const n=Ft;return d(),x("div",null,[y("div",null,[y("div",Lt,[Mt,Rt,y("div",Bt,[y("main",Ot,[y("div",At,[X(n,{placeholder:"请输入账号"}),X(n,{placeholder:"请输入密码"}),X(n,{placeholder:"请输入内容"})]),Ht])])])])])}const Ut=ct(Tt,[["render",Dt]]);export{Ut as default};
