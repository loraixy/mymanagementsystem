import{d as u,r as i,o as f,c as d}from"./index-ec4a305e.js";const _=u({__name:"GroupOne",setup(p){const n=i([]);fetch("treeData.json").then(o=>o.json()).then(o=>{n.value=o.data[0],console.log("treeData =>",n.value),t(n.value,"groupNum"),console.log(n.value)});function t(o,s){for(let e=0;e<o.length;e++)for(const c in o[e]){const r=o[e][c];Array.isArray(r)?t(r,s):o[e].SqdMxList&&(o[e].SqdMxList=o[e].SqdMxList.map((a,l)=>({...a,[s]:l+1})))}}return(o,s)=>(f(),d("div",null,"树形数据修改"))}});export{_ as default};
