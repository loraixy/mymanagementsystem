import{d as n,r as s,K as a,o as _,c as d,a as o}from"./index-7ddd169e.js";const c={class:"bg-white dashboard rounded-md p-2"},r=o("h1",null,"This is an itemTwo page ITEMtWO",-1),i=["innerHTML"],l={},m=n({...l,__name:"ItemTwo",setup(u){const t=s("");return fetch("https://apis.netstart.cn/zhihudaily/story/9741200").then(e=>e.json()).then(e=>{t.value=e.story.body}),a(()=>{console.log("onMounted")}),(e,h)=>(_(),d("div",c,[r,o("div",{innerHTML:t.value},null,8,i)]))}});export{m as default};