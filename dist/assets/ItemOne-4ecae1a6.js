import{d as l,r as a,o as c,c as r,a as e,t as _,b as i,w as u,e as d}from"./index-dd30a8ff.js";import{E as h}from"./el-button-868cb5aa.js";const m={class:"dashboard"},p=e("h1",null,"This is an dashboard page tIEMone",-1),f=["src"],B=l({__name:"ItemOne",setup(g){const s=a(""),o=a("");return fetch("https://apis.netstart.cn/zhihudaily/story/9741200").then(t=>t.json()).then(t=>{console.log("数据测试",t.story.image),s.value=t.story.title,o.value=t.story.image}),(t,y)=>{const n=h;return c(),r("div",m,[p,e("h2",null,_(s.value),1),e("img",{src:o.value,alt:"这是一张图片"},null,8,f),i(n,null,{default:u(()=>[d("hello")]),_:1})])}}});export{B as default};
