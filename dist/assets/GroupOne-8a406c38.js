var j=Object.defineProperty;var q=(a,o,n)=>o in a?j(a,o,{enumerable:!0,configurable:!0,writable:!0,value:n}):a[o]=n;var S=(a,o,n)=>(q(a,typeof o!="symbol"?o+"":o,n),n),E=(a,o,n)=>{if(!o.has(a))throw TypeError("Cannot "+n)};var I=(a,o,n)=>(E(a,o,"read from private field"),n?n.call(a):o.get(a)),M=(a,o,n)=>{if(o.has(a))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(a):o.set(a,n)};import{d as B,r as m,I as i,c as f,a as u,b as c,e as r,w as C,aI as D,t as _,a3 as F,ap as T,o as V,_ as A}from"./index-31cb23c6.js";import{E as z}from"./el-input-203f3361.js";import"./event-43d54cf5.js";const H=u("p",null,"这里是js经典的精度问题",-1),J={class:"w-80"},K={class:"w-full"},Q=B({__name:"GroupOne",setup(a){var v;const o=m([]),n=m(0),d=m(1),N=i(()=>{const e=g(n.value),l=g(d.value);let t=0;return e>l?t=e:t=l,(n.value*10**t-d.value*10**t)/10**t}),O=i(()=>n.value*d.value),g=e=>{let l=e.toString().indexOf(".");return l===-1?0:e.toString().substring(l+1,e.toString().length).length};fetch("treeData.json").then(e=>e.json()).then(e=>{o.value=e.data[0],console.log("treeData =>",o.value),x(o.value,"groupNum"),console.log(o.value)});function x(e,l){for(let t=0;t<e.length;t++)for(const s in e[t]){const y=e[t][s];Array.isArray(y)?x(y,l):e[t].SqdMxList&&(e[t].SqdMxList=e[t].SqdMxList.map((G,L)=>({...G,[l]:L+1})))}}const p=m([{type:"垫付",money:17.2},{type:"微信",money:0},{type:"现金",money:27.2}]);class U{constructor(){M(this,v,"0");S(this,"sb","sb");this.privateFun(I(this,v))}sayhello(l){console.log(l+"woshishui")}privateFun(l){return console.log("我是谁"+l),new Proxy({name:"sss"},{})}}v=new WeakMap;const P=new U;console.log(P.sayhello("牛牛"));const w=i({get(){return p.value[2].money},set(e){p.value[2].money=e}}),k=i(()=>p.value.reduce((e,l)=>e+l.money,0)),h=i(()=>k.value-b.value),b=m(128.5);return(e,l)=>{const t=z;return V(),f("div",null,[u("div",null,[c(" 树形数据修改 "),H,r(t,{type:"text",modelValue:n.value,"onUpdate:modelValue":l[0]||(l[0]=s=>n.value=s)},null,8,["modelValue"]),r(t,{type:"text",modelValue:d.value,"onUpdate:modelValue":l[1]||(l[1]=s=>d.value=s)},null,8,["modelValue"]),u("p",null,[c("使用先将小数转换整数后再转换回来(只能解决固定返回的小数) "),r(D,{name:"num-move"},{default:C(()=>[u("span",null,_(N.value),1)]),_:1})]),u("p",null,_(O.value),1)]),u("div",J,[c(" 计算 "),(V(!0),f(F,null,T(p.value,s=>(V(),f("div",{class:"w-full",key:s.type},[r(t,{modelValue:s.money,"onUpdate:modelValue":y=>s.money=y,modelModifiers:{number:!0}},null,8,["modelValue","onUpdate:modelValue"])]))),128)),u("div",null,[c("实收: "),r(t,{modelValue:w.value,"onUpdate:modelValue":l[2]||(l[2]=s=>w.value=s),modelModifiers:{number:!0}},null,8,["modelValue"])]),c(" 找补 "),u("div",K,[r(t,{modelValue:h.value,"onUpdate:modelValue":l[3]||(l[3]=s=>h.value=s),modelModifiers:{number:!0}},null,8,["modelValue"])]),u("div",null,"合计: "+_(b.value),1)])])}}});const Z=A(Q,[["__file","D:/codedata/Improveyourself/testCliDemo/Vue3/element-vue3/mymanagementsystem/src/views/pages/NavigatorOnetwo/GroupOne.vue"]]);export{Z as default};
