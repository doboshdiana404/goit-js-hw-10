import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{i as r}from"./assets/vendor-BbbuE1sJ.js";const c=document.querySelector(".input-delay"),n=document.querySelector(".form"),u=(e,t)=>new Promise((o,i)=>{setTimeout(()=>{t==="fulfilled"?o(`✅ Fulfilled promise in ${e}ms`):t==="rejected"&&i(`❌ Rejected promise in ${e}ms`)},e)});n.addEventListener("submit",e=>{e.preventDefault();const t=document.querySelector('input[name="state"]:checked'),o=c.value,i=t.value;if(t&&o){const m=parseInt(o,10);u(m,i).then(s=>{r.success({title:"OK",message:s,position:"topRight",timeout:5e3})}).catch(s=>{r.error({title:"Error",message:s,position:"topRight",timeout:5e3})})}n.reset()});
//# sourceMappingURL=2-snackbar.js.map
