import{d as g,r as a,c as h,b as l,t as m,e as p,w as f,E as v,o as y,_ as b,f as I,a as r,u as O,g as u}from"./index-31cb23c6.js";const x=g({__name:"ItemOneHeader",props:{age:{type:Number,required:!0}},emits:["ageFn"],setup(_,{emit:s}){const n=_,o=a("hhh"),c=()=>{let t=n.age;t++,s("ageFn",t)};return(t,d)=>{const i=v;return y(),h("div",null,[l(" 我是该头部标签 "+m(o.value)+" ",1),p(i,{onClick:c},{default:f(()=>[l(m(t.age),1)]),_:1})])}}}),E=b(x,[["__file","D:/codedata/Improveyourself/testCliDemo/Vue3/element-vue3/mymanagementsystem/src/views/pages/NavigatorOne/ItemOne/components/ItemOneHeader.vue"]]),N={class:"item-one overflow-y-auto"},B=r("h1",null,"This is an dashboard page tIEMone",-1),C=["src"],D=r("video",{src:"https://www.apple.com.cn/105/media/cn/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/pairing/medium.mp4#t=4.471418",controls:""},null,-1),V=g({__name:"ItemOne",setup(_){const s=a(""),n=a(""),o=a(12);let c="";c="https://apis.netstart.cn",fetch(c+"/zhihudaily/story/9741200").then(e=>e.json()).then(e=>{console.log("数据测试",e.story.image),s.value=e.story.title,n.value=e.story.image});const t=e=>{o.value=e},d=a("nihao"),i=I(d);return(e,k)=>{const w=v;return y(),h("div",N,[p(E,{age:o.value,onAgeFn:t},null,8,["age"]),B,r("h2",null,m(s.value),1),l(" "+m(O(i))+" ",1),r("img",{src:n.value,alt:"这是一张图片"},null,8,C),u(" https://bucket-bnq-app.oss-cn-hangzhou.aliyuncs.com/emallmgr/content/cases/1557711192811.jpg "),u(" https://bucket-bnq-app.oss-cn-hangzhou.aliyuncs.com/emallmgr/content/cases/1557711192811.jpg?x-oss-process=image/format,webp "),u(" https://www.apple.com.cn/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/spatial-audio/medium.mp4 "),D,p(w,null,{default:f(()=>[l("hello")]),_:1})])}}});const j=b(V,[["__file","D:/codedata/Improveyourself/testCliDemo/Vue3/element-vue3/mymanagementsystem/src/views/pages/NavigatorOne/ItemOne/ItemOne.vue"]]);export{j as default};
