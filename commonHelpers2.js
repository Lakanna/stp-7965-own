/* empty css                      */import{V as O}from"./assets/vendor-238c927e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}})();document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".js-menu-toggle"),t=document.querySelector(".js-menu"),o=document.createElement("div"),r=document.querySelectorAll(".header-nav-list a");o.classList.add("overlay"),document.body.appendChild(o);function n(){window.innerWidth<1200&&(t.classList.toggle("active"),e.classList.toggle("active"),o.classList.toggle("active"))}e==null||e.addEventListener("click",n),o.addEventListener("click",n),r.forEach(i=>{i.addEventListener("click",function(){window.innerWidth<1200&&setTimeout(n,300)})})});document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".about-img");let t=5,o=-35;e.style.transform=`rotateX(${t}deg) rotateY(${o}deg) scale(1)`,O.init(e,{max:40,speed:400,glare:!0,"max-glare":.5,perspective:1e3,mobile:!0,gyroscope:!0}),e.addEventListener("mouseleave",function(){requestAnimationFrame(()=>{e.style.transform=`rotateX(${t}deg) rotateY(${o}deg) scale(1)`})})});document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".hero-btn");e&&(e.addEventListener("mouseenter",()=>{e.classList.add("hover")}),e.addEventListener("mouseleave",()=>{e.classList.remove("hover")}))});document.addEventListener("DOMContentLoaded",()=>{const e=document.querySelectorAll("section"),t=document.querySelectorAll(".header-nav-list a"),o=document.querySelectorAll(".footer-content a"),r=document.querySelector(".header");let n=r?r.offsetHeight:0;function i(){return window.matchMedia("(max-width: 768px)").matches?70:130}const l={root:null,threshold:.5},I=new IntersectionObserver(s=>{s.forEach(c=>{const u=c.target.id,y=document.querySelector(`.header-nav-list a[href*="${u}"]`);c.isIntersecting&&(t.forEach(L=>L.classList.remove("active")),y&&y.classList.add("active"))})},l);e.forEach(s=>{s.id&&I.observe(s)}),t.forEach(s=>{s.addEventListener("click",c=>{const u=s.getAttribute("href");if(u==="./index.html")return;c.preventDefault();const y=u.replace("./index.html","").replace("#",""),L=document.getElementById(y);L&&(window.scrollTo({top:L.offsetTop-n-i(),behavior:"smooth"}),t.forEach(B=>B.classList.remove("active")),s.classList.add("active"))})}),window.addEventListener("resize",()=>{n=r?r.offsetHeight:0});function q(){const s=window.location.pathname.replace(/\/$/,"");o.forEach(c=>{const u=new URL(c.getAttribute("href"),window.location.origin).pathname.replace(/\/$/,"");s===u?c.classList.add("active"):c.classList.remove("active")})}q()});var m=window.innerWidth>=1200?470:140,T=-40,v=window.innerWidth>=1200?234:120,p=window.innerWidth>=1200?450.6:170,f=document.getElementById("drag-container"),a=document.getElementById("spin-container"),b=document.getElementById("ground");function E(){window.innerWidth>=1200?(m=470,v=234,p=450.6):(m=140,v=120,p=170),a.style.width=v+"px",a.style.height=p+"px";let e=a.getElementsByTagName("img");for(let t of e)t.style.width=v+"px",t.style.height=p+"px";b.style.width=m*3+"px",b.style.height=m*3+"px",$(1)}function $(e){var t=Array.from(a.getElementsByTagName("img")),o=a.getElementsByTagName("video"),r=window.innerWidth>=1200?t:t.slice(0,6),n=[...r,...o];a.style.width=v+"px",a.style.height=p+"px";for(var i=0;i<n.length;i++){let l=i*360/n.length;n[i].style.transform=`rotateY(${l}deg) translateZ(${m}px)`,n[i].style.transition="transform 1s",n[i].style.transitionDelay=e||(n.length-i)/4+"s"}}function S(e){let t=85,o=0;d>t&&(d=t),d<o&&(d=o),e.style.transform=`rotateX(${-d}deg) rotateY(${w}deg)`}function x(e){a.style.animationPlayState=e?"running":"paused"}var g=0,h=0,w=0,d=10;{var A="spinRevert";a.style.animation=`${A} ${Math.abs(T)}s infinite linear`}document.onpointerdown=function(e){clearInterval(f.timer),e=e||window.event;var t=e.clientX,o=e.clientY;return this.onpointermove=function(r){r=r||window.event;var n=r.clientX,i=r.clientY;g=n-t,h=i-o,w+=g*.1,d+=h*.1,S(f),t=n,o=i},this.onpointerup=function(){f.timer=setInterval(function(){g*=.95,h*=.95,w+=g*.1,d+=h*.1,S(f),x(!1),Math.abs(g)<.5&&Math.abs(h)<.5&&(clearInterval(f.timer),x(!0))},17),this.onpointermove=this.onpointerup=null},!1};document.onmousewheel=function(e){e=e||window.event;var t=e.wheelDelta/20||-e.detail;m+=t,E()};function M(){let e=a.getElementsByTagName("img"),t=document.getElementById("lightbox"),o=document.getElementById("lightbox-img"),r=document.querySelector(".close");for(let n of e)n.addEventListener("click",function(){t.style.display="flex",setTimeout(()=>{t.classList.add("show"),o.src=this.src,o.alt=this.alt},10)});r.addEventListener("click",function(){t.classList.remove("show"),setTimeout(()=>{t.style.display="none",o.src=""},300)}),t.addEventListener("click",function(n){n.target===t&&(t.classList.remove("show"),setTimeout(()=>{t.style.display="none",o.src=""},300))})}setTimeout(E,1e3);window.addEventListener("resize",E);M();document.addEventListener("DOMContentLoaded",function(){const e=document.querySelector(".js-cookies-popup"),t=document.querySelector(".js-accept-button"),o=document.querySelector(".js-decline-button");localStorage.getItem("cookiesAccepted")&&e.classList.add("hidden"),localStorage.getItem("cookiesDeclined")&&e.classList.add("hidden"),t.addEventListener("click",function(){localStorage.setItem("cookiesAccepted","true"),e.classList.add("hidden")}),o.addEventListener("click",function(){localStorage.setItem("cookiesDeclined","true"),e.classList.add("hidden")})});
//# sourceMappingURL=commonHelpers2.js.map
