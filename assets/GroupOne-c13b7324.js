import{d as _,r,F as m,o as y,c as N,b as S,a as s,e as i,t as c}from"./index-239a5544.js";import{E as g}from"./el-input-efbc2e30.js";import"./event-43d54cf5.js";const q=s("p",null,"这里是js经典的精度问题",-1),k=_({__name:"GroupOne",setup(E){const n=r([]),u=r(0),a=r(1),v=m(()=>(u.value*100-a.value*100)/100),f=m(()=>u.value*a.value);fetch("treeData.json").then(e=>e.json()).then(e=>{n.value=e.data[0],console.log("treeData =>",n.value),p(n.value,"groupNum"),console.log(n.value)});function p(e,t){for(let l=0;l<e.length;l++)for(const o in e[l]){const d=e[l][o];Array.isArray(d)?p(d,t):e[l].SqdMxList&&(e[l].SqdMxList=e[l].SqdMxList.map((x,V)=>({...x,[t]:V+1})))}}return(e,t)=>{const l=g;return y(),N("div",null,[S("树形数据修改 "),s("div",null,[i(l,{type:"text",modelValue:u.value,"onUpdate:modelValue":t[0]||(t[0]=o=>u.value=o)},null,8,["modelValue"]),i(l,{type:"text",modelValue:a.value,"onUpdate:modelValue":t[1]||(t[1]=o=>a.value=o)},null,8,["modelValue"]),s("p",null,"使用先将小数转换整数后再转换回来(只能解决固定返回的小数)"+c(v.value),1),s("p",null,c(f.value),1),q])])}}});export{k as default};
