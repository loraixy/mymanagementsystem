import{d as h,r as s,o as d,c as m,b as c,t as _,e as u,w as g,E as p,a as r}from"./index-c584c814.js";const f=h({__name:"ItemOneHeader",props:{age:{}},emits:["ageFn"],setup(i,{emit:t}){const n=i,a=s("hhh"),o=()=>{let e=n.age;e++,t("ageFn",e)};return(e,v)=>{const l=p;return d(),m("div",null,[c(" 我是该头部标签 "+_(a.value)+" ",1),u(l,{onClick:o},{default:g(()=>[c(_(e.age),1)]),_:1})])}}}),y={class:"dashboard"},E=r("h1",null,"This is an dashboard page tIEMone",-1),B=["src"],F=h({__name:"ItemOne",setup(i){const t=s(""),n=s(""),a=s(12);fetch("https://apis.netstart.cn/zhihudaily/story/9741200").then(e=>e.json()).then(e=>{console.log("数据测试",e.story.image),t.value=e.story.title,n.value=e.story.image});const o=e=>{a.value=e};return(e,v)=>{const l=p;return d(),m("div",y,[u(f,{age:a.value,onAgeFn:o},null,8,["age"]),E,r("h2",null,_(t.value),1),r("img",{src:n.value,alt:"这是一张图片"},null,8,B),u(l,null,{default:g(()=>[c("hello")]),_:1})])}}});export{F as default};
