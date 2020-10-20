(()=>{"use strict";window.util={isEscEvent:(e,t)=>{"Escape"===e.key&&t()},isEnterEvent:(e,t)=>{"Enter"===e.key&&t()}},window.load=(e,t,r,o,n)=>{const d=new XMLHttpRequest;d.responseType="json",d.addEventListener("load",(()=>{200===d.status?r(d.response):o(`Статус ответа: ${d.status} ${d.statusText}`)})),d.addEventListener("error",(()=>{o("Произошла ошибка соединения")})),d.addEventListener("timeout",(()=>{o(`Запрос не успел выполниться за ${d.timeout}мс`)})),d.timeout=1e4,d.open(t,e),n?d.send(n):d.send()},(()=>{const e=document.querySelector(".map__pins"),t=document.querySelector("#pin").content.querySelector(".map__pin"),r=()=>{const e=document.querySelector(".map__pin--active");e&&e.classList.remove("map__pin--active")};window.pin={renderPins:o=>{const n=document.createDocumentFragment();let d=o.length>5?5:o.length;for(let e=0;e<d;e++){const d=t.cloneNode(!0);d.style=`left: ${o[e].location.x-25}px; top: ${o[e].location.y-70}px;`,d.querySelector("img").src=o[e].author.avatar,d.querySelector("img").alt=o[e].offer.title,n.appendChild(d),d.addEventListener("click",(()=>{r(),d.classList.add("map__pin--active"),window.map.showCard(o[e])}))}e.appendChild(n)},removePins:()=>{document.querySelectorAll(".map__pin:not(.map__pin--main)").forEach((t=>{e.removeChild(t)}))}}})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector("#card").content.querySelector(".map__card"),r={palace:"Дворец",flat:"Квартира",house:"Дом",bungalow:"Бунгало"},o=(e,t)=>{t?e.textContent=t:e.style.display="none"};window.renderCard=n=>{const d=document.createDocumentFragment(),i=document.querySelector(".map__filters-container"),s=t.cloneNode(!0),c=s.querySelector(".popup__features"),l=s.querySelectorAll(".popup__feature"),a=s.querySelector(".popup__photos"),u=s.querySelector(".popup__photo");var p,m;p=s.querySelector(".popup__avatar"),(m=n.author.avatar)?p.src=m:p.style.display="none",o(s.querySelector(".popup__title"),n.offer.title),o(s.querySelector(".popup__text--address"),n.offer.address),o(s.querySelector(".popup__text--price"),n.offer.price),o(s.querySelector(".popup__type"),r[n.offer.type]),((e,t,r)=>{const o=(e=>{let t;return t=1===e?"комната":5===e?"комнат":"комнаты",t})(t),n=(e=>{let t;return t=1===e?"гостя":"гостей",t})(r);t&&r?e.textContent=`${t} ${o} для ${r} ${n}`:e.style.display="none"})(s.querySelector(".popup__text--capacity"),n.offer.rooms,n.offer.guests),((e,t,r)=>{t&&r?e.textContent=`Заезд после ${t}, выезд до ${r}`:e.style.display="none"})(s.querySelector(".popup__text--time"),n.offer.checkin,n.offer.checkout),((e,t,r)=>{if(r){e.innerHTML="";for(let o=0;o<r.length;o++)for(let n=0;n<t.length;n++)t[n].classList.contains("popup__feature--"+r[o])&&e.appendChild(t[n])}else e.style.display="none"})(c,l,n.offer.features),o(s.querySelector(".popup__description"),n.offer.description),((e,t,r)=>{r?(e.innerHTML="",r.forEach((r=>{let o=t.cloneNode(!0);e.appendChild(o),o.src=r}))):e.style.display="none"})(a,u,n.offer.photos),d.appendChild(s),e.insertBefore(d,i)}})(),(()=>{const e=document.querySelector(".map"),t=e=>{"Escape"===e.key&&(e.preventDefault(),window.map.closeCard())};window.map={closeCard:()=>{const r=e.querySelector(".map__card");r&&(e.removeChild(r),document.removeEventListener("keydown",t))},showCard:r=>{let o=e.querySelector(".map__card");o&&e.removeChild(o),window.renderCard(r),o=e.querySelector(".map__card"),document.addEventListener("keydown",t),o.querySelector(".popup__close").addEventListener("click",(()=>{window.map.closeCard()})),o.querySelector(".popup__close").addEventListener("keydown",(e=>{"Enter"===e.key&&window.map.closeCard()}))}}})(),(()=>{const e=document.querySelector("main"),t=document.querySelector(".map").querySelector(".map__pin--main"),r=document.querySelector("#success").content.querySelector(".success"),o=document.querySelector("#error").content.querySelector(".error"),n=document.querySelector(".ad-form"),d=n.querySelector("#avatar"),i=n.querySelector(".ad-form-header__preview img"),s=n.querySelector("#address"),c=n.querySelector("#type"),l=n.querySelector("#price"),a=n.querySelector("#timein"),u=n.querySelector("#timeout"),p=n.querySelector("#room_number"),m=n.querySelector("#capacity"),y=n.querySelector("#images"),f=n.querySelector(".ad-form__photo"),w={palace:"10000",flat:"1000",house:"5000",bungalow:"0"};window.fillAddressField=(e,r)=>{let o=parseInt(t.style.left,10)+e,n=parseInt(t.style.top,10)+r;s.value=`${o}, ${n}`};const v=()=>{let e=c.value,t=w[e];l.setAttribute("placeholder",t),l.setAttribute("min",t)},_=()=>{let e=p.value,t=m.value;"100"===e&&"0"!==t?m.setCustomValidity("Это жилье не для гостей. Измените выбор"):"0"===t&&"100"!==e?m.setCustomValidity("Это жилье для размещения гостей. Измените выбор комнат"):e<t?m.setCustomValidity("Количество гостей превышает количество комнат. Уменьшите количество гостей"):m.setCustomValidity(""),m.reportValidity()},S=(e,t)=>{const r=t.options;r.forEach((e=>{e.removeAttribute("selected")})),r[e.selectedIndex].setAttribute("selected","selected")},q=()=>{const t=e.querySelector(".error"),r=e.querySelector(".success");return t||r},h=e=>{window.util.isEscEvent(e,(()=>{L()}))},E=e=>{window.util.isEnterEvent(e,(()=>{L()}))},g=e=>{const t=q();e.preventDefault(),e.target===t&&L()},L=()=>{const t=q();e.removeChild(t),document.removeEventListener("keydown",h),document.removeEventListener("click",g)},C=()=>{const t=document.createDocumentFragment(),o=r.cloneNode(!0);t.appendChild(o),e.appendChild(t),document.addEventListener("keydown",h),document.addEventListener("click",g),window.deactivatePage()},k=()=>{const t=document.createDocumentFragment(),r=o.cloneNode(!0),n=r.querySelector(".error__button");t.appendChild(r),e.appendChild(t),n.addEventListener("click",L),n.addEventListener("keydown",E),document.addEventListener("keydown",h),document.addEventListener("click",g)},b=(e,t)=>{const r=e.target.files[0],o=new FileReader;t.src="",o.addEventListener("load",(e=>{t.src=e.target.result})),o.readAsDataURL(r)};v(),_(),d.addEventListener("change",(e=>{b(e,i)})),c.addEventListener("change",(()=>{v()})),a.addEventListener("change",(()=>{S(a,u)})),u.addEventListener("change",(()=>{S(u,a)})),m.addEventListener("change",(()=>{_()})),p.addEventListener("change",(()=>{_()})),y.addEventListener("change",(e=>{f.innerHTML="",f.appendChild((e=>{let t=document.createElement("img");return t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("alt","Фотография жилья"),t.style.borderRadius="5px",b(e,t),t})(e))})),n.addEventListener("submit",(e=>{e.preventDefault(),window.load("https://21.javascript.pages.academy/keksobooking","POST",C,k,new FormData(n))}))})(),(()=>{const e=document.querySelector(".map"),t=document.querySelector(".map__pins"),r=e.querySelector(".map__pin--main"),o=t.clientWidth-31;r.addEventListener("mousedown",(e=>{(e=>{e.preventDefault();let t={x:e.clientX,y:e.clientY};const n=e=>{let n=t.x-e.clientX,d=t.y-e.clientY,i={x:r.offsetLeft-n,y:r.offsetTop-d};var s;t={x:e.clientX,y:e.clientY},(s=i).x<=-31&&(s.x=-31),s.x>=o&&(s.x=o),s.y<=46&&(s.y=46),s.y>=546&&(s.y=546),r.style.top=i.y+"px",r.style.left=i.x+"px",window.fillAddressField(31,84)},d=e=>{e.preventDefault(),n(e)},i=e=>{e.preventDefault(),n(e),document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",i)};document.addEventListener("mousemove",d),document.addEventListener("mouseup",i)})(e)}))})(),window.debounce=e=>{let t=null;return(...r)=>{let o=r;t&&window.clearTimeout(t),t=window.setTimeout((()=>{e(...o)}),500)}},(()=>{const e=document.querySelector(".map__filters"),t=e.querySelector("#housing-type"),r=e.querySelector("#housing-price"),o=e.querySelector("#housing-rooms"),n=e.querySelector("#housing-guests"),d=e.querySelectorAll("#housing-features input"),i=(e,t)=>"any"===t||String(e)===t;window.filterPins=window.debounce((e=>{window.pin.removePins(),window.map.closeCard(),window.pin.renderPins((e=>{let s=t.value,c=r.value,l=o.value,a=n.value,u=(()=>{let e=[];return d.forEach((t=>{t.checked&&e.push(t.value)})),e})();return e.filter((e=>i(e.offer.type,s)&&((e,t)=>{let r;return"any"===t||(r=e<1e4?"low":e>=1e4&&e<=5e4?"middle":"high",r===t)})(e.offer.price,c)&&i(e.offer.rooms,l)&&i(e.offer.guests,a)&&((e,t)=>t.every((t=>-1!==e.offer.features.indexOf(t))))(e,u)))})(e))}))})(),(()=>{const e=document.querySelector(".map"),t=e.querySelector(".map__pin--main"),r=document.querySelector(".ad-form"),o=document.querySelectorAll(".ad-form fieldset, .map__filters select, .map__filters fieldset"),n=document.querySelectorAll(".ad-form fieldset"),d=document.querySelectorAll(".map__filters select, .map__filters fieldset"),i=document.querySelector(".ad-form__reset");window.pins=[];const s=e=>{e.forEach((e=>{e.removeAttribute("disabled")}))},c=e=>{0===e.button&&m()},l=e=>{window.util.isEnterEvent(e,(()=>{m()}))},a=e=>{const t=document.createElement("div");t.style="z-index: 100; margin: 0 auto; text-align: center; background-color: red;",t.style.position="absolute",t.style.left=0,t.style.right=0,t.style.fontSize="30px",t.textContent=e,document.body.insertAdjacentElement("afterbegin",t)},u=e=>{window.pins=e,window.pin.renderPins(e),s(d)},p=()=>{window.deactivatePage(),i.removeEventListener("click",p)},m=()=>{s(n),e.classList.remove("map--faded"),r.classList.remove("ad-form--disabled"),window.fillAddressField(31,84),window.load("https://21.javascript.pages.academy/keksobooking/data","GET",u,a),t.removeEventListener("mousedown",c),t.removeEventListener("keydown",l),i.addEventListener("click",p)};window.deactivatePage=()=>{r.reset(),o.forEach((e=>{e.setAttribute("disabled","disabled")})),window.fillAddressField(31,31),e.classList.add("map--faded"),r.classList.add("ad-form--disabled"),t.addEventListener("mousedown",c),t.addEventListener("keydown",l),window.pin.removePins(),window.map.closeCard()}})(),(()=>{const e=document.querySelector(".map__filters");window.deactivatePage(),window.scrollTo(0,0),e.addEventListener("change",(()=>{window.filterPins(window.pins)}))})()})();