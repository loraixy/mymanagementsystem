import{b as r,g as I,a6 as b,i as a,q as c,r as v,a7 as p,a8 as m,Z as S,W as y,a9 as F,B as _,aa as h}from"./index-8a2f206a.js";const w=["","default","small","large"],z=e=>{const s=I();return r(()=>{var o,u;return(u=(o=s==null?void 0:s.proxy)==null?void 0:o.$props)==null?void 0:u[e]})},g=b({type:String,values:w,required:!1}),E=Symbol("size"),K=()=>{const e=a(E,{});return r(()=>c(e.size)||"")},j=(e,s={})=>{const o=v(void 0),u=s.prop?o:z("size"),l=s.global?o:K(),n=s.form?{size:void 0}:a(p,void 0),t=s.formItem?{size:void 0}:a(m,void 0);return r(()=>u.value||c(e)||(t==null?void 0:t.size)||(n==null?void 0:n.size)||l.value||"")},q=e=>{const s=z("disabled"),o=a(p,void 0);return r(()=>s.value||c(e)||(o==null?void 0:o.disabled)||!1)},B=()=>{const e=a(p,void 0),s=a(m,void 0);return{form:e,formItem:s}},N=(e,{formItemContext:s,disableIdGeneration:o,disableIdManagement:u})=>{o||(o=v(!1)),u||(u=v(!1));const l=v();let n;const t=r(()=>{var i;return!!(!e.label&&s&&s.inputIds&&((i=s.inputIds)==null?void 0:i.length)<=1)});return S(()=>{n=y([_(e,"id"),o],([i,f])=>{const d=i??(f?void 0:F().value);d!==l.value&&(s!=null&&s.removeInputId&&(l.value&&s.removeInputId(l.value),!(u!=null&&u.value)&&!f&&d&&s.addInputId(d)),l.value=d)},{immediate:!0})}),h(()=>{n&&n(),s!=null&&s.removeInputId&&l.value&&s.removeInputId(l.value)}),{isLabeledByFormItem:t,inputId:l}};export{j as a,q as b,g as c,N as d,B as u};
