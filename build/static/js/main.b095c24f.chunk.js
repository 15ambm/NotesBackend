(this.webpackJsonpexamples=this.webpackJsonpexamples||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(14),c=n.n(r),u=n(4),l=n(2),i=function(e){var t=e.note,n=e.toggleImportance,a=t.important?"make not important":"make important";return o.a.createElement("li",{className:"note"},t.content,o.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s=function(){return f.a.get("/api/notes").then((function(e){return e.data}))},p=function(e){return f.a.post("/api/notes",e).then((function(e){return e.data}))},d=function(e,t){return f.a.put("".concat("/api/notes","/").concat(e),t).then((function(e){return e.data}))},b=function(e){var t=e.message;return null===t?null:o.a.createElement("div",{className:"error"},t)},g=function(){return o.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},o.a.createElement("br",null),o.a.createElement("em",null,"Note App, Made by Alex Mason 2020"))},h=function(e){var t=Object(a.useState)([]),n=Object(l.a)(t,2),r=n[0],c=n[1],m=Object(a.useState)(""),f=Object(l.a)(m,2),h=f[0],E=f[1],v=Object(a.useState)(!0),O=Object(l.a)(v,2),j=O[0],S=O[1],k=Object(a.useState)(null),y=Object(l.a)(k,2),w=y[0],x=y[1];Object(a.useEffect)((function(){s().then((function(e){c(e)})).catch((function(e){alert("there has been a problem getting notes from the server")}))}),[]);var I=j?r:r.filter((function(e){return e.important}));return o.a.createElement("div",null,o.a.createElement("h1",null,"Notes"),o.a.createElement(b,{message:w}),o.a.createElement("div",null,o.a.createElement("button",{onClick:function(){return S(!j)}},"show ",j?"important":"all")),o.a.createElement("ul",null,I.map((function(e){return o.a.createElement(i,{key:e.id,note:e,toggleImportance:function(){return function(e){console.log("toggle id ",e);var t=r.find((function(t){return t.id===e})),n=Object(u.a)(Object(u.a)({},t),{},{important:!t.important});d(e,n).then((function(t){console.log(t),c(r.map((function(n){return n.id!==e?n:t})))})).catch((function(n){x("The note '".concat(t.content,"' was already removed")),setTimeout((function(){x(null)}),5e3),c(r.filter((function(t){return e!==t.id})))}))}(e.id)}})}))),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t={content:h,date:(new Date).toISOString(),important:Math.random()<.5,id:r.length+1};p(t).then((function(e){c(r.concat(e)),E("")}))}},o.a.createElement("input",{value:h,onChange:function(e){console.log(e.target.value),E(e.target.value)}}),o.a.createElement("button",{type:"submit"},"Save")),o.a.createElement(g,null))};n(37);c.a.render(o.a.createElement(h,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.b095c24f.chunk.js.map