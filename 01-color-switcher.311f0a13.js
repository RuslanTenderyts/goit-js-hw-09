const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]");let o=null;t.disabled=!0,e.addEventListener("click",(()=>{o=setInterval((()=>{e.disabled=!0,t.disabled=!1,console.log("start change backgroundColor for body"),document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.addEventListener("click",(()=>{clearInterval(o),e.disabled=!1,t.disabled=!0,console.log(`Interval with id ${o} has stopped!`)}));
//# sourceMappingURL=01-color-switcher.311f0a13.js.map