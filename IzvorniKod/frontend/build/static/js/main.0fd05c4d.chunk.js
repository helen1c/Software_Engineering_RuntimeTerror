(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{100:function(e,a,t){e.exports=t.p+"static/media/login-image.d43f1d58.png"},108:function(e,a,t){e.exports=t(127)},113:function(e,a,t){},114:function(e,a,t){},119:function(e,a,t){},124:function(e,a,t){},127:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),l=t(14),i=t.n(l),s=(t(113),t(85),t(104)),c=t(2),o=(t(114),function(){var e=Object(c.g)();return r.a.createElement("body",null,r.a.createElement("main",{className:"main"},r.a.createElement("div",{className:"main-images"},r.a.createElement("div",{className:"staze",onClick:function(a){return e.push("/mountain-path/search")}},r.a.createElement("span",{className:"pretraga"},"Pretra\u017eite planinarske staze")),r.a.createElement("div",{className:"domovi",onClick:function(a){return e.push("/mountain-lodge/search")}},r.a.createElement("span",{className:"pretraga"},"Pretra\u017eite planinarske domove")))))}),m=function(){return r.a.createElement("div",null,"Ponosno predstavljamo najbolji tim ikada: -Helena Ladi\u0107 -Neda Ku\u0161urin -David Konjevod -Ivan Martinovi\u0107 -Josipa Kaselj -Luka Raven\u0161\u0107ak -Marko Rajnovi\u0107")},u=t(33),p=(t(119),t(90)),d=t.n(p);var E=function(){var e=Object(n.useState)(""),a=Object(u.a)(e,2),t=a[0],l=a[1],i=Object(c.g)();return Object(n.useEffect)((function(){null!==sessionStorage.getItem("key")&&fetch("/api/users/image?",{method:"GET",headers:new Headers({authorization:sessionStorage.getItem("key")||""})}).then((function(e){200===e.status&&e.blob().then((function(e){l(URL.createObjectURL(e))}))}))}),[]),r.a.createElement("nav",{className:"header"},r.a.createElement("div",{className:"title-container"},r.a.createElement("img",{src:d.a,alt:"Logo",className:"logo-image",onClick:function(e){return i.push("/home")}}),r.a.createElement("div",{className:"title"},"Planinarski dnevnik")),r.a.createElement("ul",{className:"profil"},r.a.createElement("li",{className:"profil-part"},sessionStorage.getItem("key")?r.a.createElement("div",{className:"user-cnt"},r.a.createElement("img",{className:"profil-image",alt:"Slika profila",src:t}),r.a.createElement("button",{className:"logout-button",onClick:function(){sessionStorage.removeItem("key"),window.location.assign("/home")}},"Odjava")):r.a.createElement("div",{className:"login-cnt"},r.a.createElement("button",{className:"loginAndRegisterButton",onClick:function(e){return i.push("/login")}},"Prijavi se"),r.a.createElement("button",{className:"loginAndRegisterButton",onClick:function(e){return i.push("/register")}},"Registriraj se")))))},v=t(23),g=t(36),h=t(94),f=function e(){Object(h.a)(this,e)};f.SUCCESS=200,f.CREATED=201,f.BAD_REQUEST=400,f.UNAUTHORIZED=401,f.FORBIDDEN=403,f.NOT_FOUND=404;t(86);var N=t(142),b=t(143),O=t(95),j=t.n(O),C=t(96),L=t.n(C),S=function(){var e=Object(n.useState)(""),a=Object(u.a)(e,2),t=a[0],l=a[1],i=Object(c.g)(),s=Object(g.d)({initialValues:{name:"",email:"",password:"",confirmPassword:"",placeOfResidence:"",dateOfBirth:"",image:"",description:""},validateOnChange:!1,validateOnMount:!1,validateOnBlur:!1,validationSchema:v.a({name:v.c().required("Obavezan unos!"),email:v.c().required("Obavezan unos!").email("E-mail u ne ispravnom obliku."),password:v.c().required("Obavezan unos!"),confirmPassword:v.c().required("Obavezan unos!").oneOf([v.b("password"),""],"Lozinke moraju biti iste!")}),onSubmit:function(e){e.image=t.split(",")[1],fetch("/api/users",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"}}).then((function(e){e.status!==f.CREATED?e.text().then((function(e){e=JSON.parse(e),Object.values(e).forEach((function(e){var a=JSON.parse(JSON.stringify(e));s.setFieldError(a.fieldName,a.message)}))})):i.push("/login")}))}});return r.a.createElement("div",{className:"registrationForm"},r.a.createElement("form",{onSubmit:s.handleSubmit},r.a.createElement("h1",null,"Registracija"),r.a.createElement("div",{className:"registration-container"},r.a.createElement("div",{className:"registration-column"},r.a.createElement("div",{className:"inputComponent textAlignLeft"},r.a.createElement("p",{className:"inputLabel"},"Ime i prezime:"),r.a.createElement("input",{id:"name",className:"registration-input",value:s.values.name,onChange:s.handleChange}),r.a.createElement("p",{className:"errorText"},s.errors.name?s.errors.name:null)),r.a.createElement("div",{className:"inputComponent textAlignLeft"},r.a.createElement("p",{className:"inputLabel"},"E-mail:"),r.a.createElement("input",{className:"registration-input",id:"email",value:s.values.email,onChange:s.handleChange}),r.a.createElement("p",{className:"errorText"},s.errors.email?s.errors.email:null)),r.a.createElement("div",{className:"inputComponent textAlignLeft"},r.a.createElement("p",{className:"inputLabel"},"Lozinka:"),r.a.createElement("input",{className:"registration-input",id:"password",type:"password",value:s.values.password,onChange:s.handleChange}),r.a.createElement("p",{className:"errorText"},s.errors.password?s.errors.password:null)),r.a.createElement("div",{className:"inputComponent textAlignLeft"},r.a.createElement("p",{className:"inputLabel"},"Ponovite lozinku:"),r.a.createElement("input",{className:"registration-input",id:"confirmPassword",type:"password",value:s.values.confirmPassword,onChange:s.handleChange}),r.a.createElement("p",{className:"errorText"},s.errors.confirmPassword?s.errors.confirmPassword:null)),r.a.createElement("div",{className:"inputComponent textAlignLeft"},r.a.createElement("p",{className:"inputLabel"},"Mjesto stanovanja:"),r.a.createElement("input",{className:"registration-input",id:"placeOfResidence",value:s.values.placeOfResidence,onChange:s.handleChange}),r.a.createElement("p",{className:"errorText"},s.errors.placeOfResidence?s.errors.placeOfResidence:null)),r.a.createElement("div",{className:"textAlignLeft"},r.a.createElement("p",{className:"inputLabel"},"Datum ro\u0111enja:"),r.a.createElement("input",{className:"registration-input",id:"dateOfBirth",type:"date",max:j()().format("YYYY-MM-DD"),value:s.values.dateOfBirth,onChange:s.handleChange}))),r.a.createElement("div",{className:"registration-column"},r.a.createElement("div",{className:"textAlignLeft"},r.a.createElement("p",{style:{marginTop:"2rem"},className:"inputLabel"},"O meni:"),r.a.createElement("textarea",{placeholder:"Unesite ne\u0161to vi\u0161e o sebi...",className:"registration-text-area",id:"description",value:s.values.description,onChange:s.handleChange}),r.a.createElement("p",{className:"errorText"},s.errors.description?s.errors.description:null)),r.a.createElement("input",{className:"upload-picture",accept:"image/*",id:"icon-button-file",type:"file",multiple:!0,onChange:function(e){!function(e){if(e){var a=e.target.files[0],t=new FileReader;t.onload=function(e){var a;l(null===e||void 0===e||null===(a=e.target)||void 0===a?void 0:a.result)},void 0!==a&&t.readAsDataURL(a)}}(e),e.target.value=""}}),t?r.a.createElement("div",{className:"wrapper-picture"},r.a.createElement("img",{style:{display:"block"},className:"profileImage",src:t,alt:"Slika profila"}),r.a.createElement("span",{className:"remove-picture",onClick:function(){return l("")}},r.a.createElement(L.a,null))):r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"wrapper-picture"},r.a.createElement("div",{className:"picture-container"},r.a.createElement("label",{htmlFor:"icon-button-file"},r.a.createElement(N.a,{color:"primary","aria-label":"upload picture",component:"span"},r.a.createElement(b.a,null)))))))),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",className:"submitButton"},"Registriraj se"))))},w=t(100),k=t.n(w),y=function(){var e=Object(n.useState)(!1),a=Object(u.a)(e,2),t=a[0],l=a[1],i=Object(g.d)({initialValues:{email:"",password:""},validateOnChange:!1,validateOnMount:!1,validateOnBlur:!1,validationSchema:v.a({email:v.c().required("Molimo unesite e-mail.").email("Ne ispravan oblik mail-a."),password:v.c().required("Molimo unesite lozinku.")}),onSubmit:function(e){var a={email:e.email,password:e.password};fetch("/api/login",{method:"POST",body:JSON.stringify(a),headers:{"Content-Type":"application/json"}}).then((function(e){e.status===f.UNAUTHORIZED||e.status===f.FORBIDDEN?l(!0):e.status===f.SUCCESS&&(sessionStorage.setItem("key",e.headers.get("authorization")||""),window.location.href="/home")}))}});return r.a.createElement("div",{className:"loginForm"},r.a.createElement("form",{onSubmit:i.handleSubmit},r.a.createElement("h1",null,"Prijava"),r.a.createElement("div",{className:"inputForm"},r.a.createElement("div",{className:"inputComponent"},r.a.createElement("p",{className:"inputLabel"},"E-mail:"),r.a.createElement("input",{className:"login-input",id:"email",value:i.values.email,placeholder:"Unesite e-mail...",onChange:i.handleChange}),r.a.createElement("p",{className:"errorText"},i.errors.email)),r.a.createElement("div",{className:"inputComponent password-component"},r.a.createElement("p",{className:"inputLabel"},"Lozinka:"),r.a.createElement("input",{className:"login-input",id:"password",type:"password",placeholder:"Unesite lozinku...",value:i.values.password,onChange:i.handleChange}),r.a.createElement("p",{className:"errorText"},i.errors.password))),r.a.createElement("div",null,t?r.a.createElement("span",{className:"errorText"},"Neispravan e-mail ili lozinka."):r.a.createElement(r.a.Fragment,null)),r.a.createElement("div",null,r.a.createElement("button",{type:"submit",className:"submitButton"},"Prijavi se")),r.a.createElement("div",null,r.a.createElement("p",{className:"toRegistration"},"Nema\u0161 korisni\u010dki ra\u010dun?"," ",r.a.createElement("a",{className:"toRegistrationAction",href:"/register"},"Registriraj se"))),r.a.createElement("div",null,r.a.createElement("img",{src:k.a,alt:"Mountaineers pic",className:"loginImage"}))))},x=(t(124),t(105)),R=t(62),I=t(83),T=t.n(I),A=t(102),D=function(){var e=Object(A.a)(T.a.mark((function e(){var a;return T.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/api/hills/all");case 2:return a=e.sent,e.abrupt("return",a.json());case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),F=function(){var e=Object(R.b)(),a=Object(n.useState)(""),t=Object(u.a)(a,2),l=t[0],i=t[1],s=Object(R.c)((function(e){return e.findAllHillsReducer})).results;return Object(n.useEffect)((function(){void 0!==s&&0!==s.length||(console.log("Get all Hills..."),e((function(e){e({type:"FIND_ALL_HILLS",payload:void 0}),D().then((function(a){e({type:"FIND_ALL_HILLS_SUCCESS",payload:a})})).catch((function(a){e({type:"FIND_ALL_HILLS_ERROR",payload:void 0})}))})))}),[e,s]),r.a.createElement("div",{className:"search-form"},r.a.createElement(g.c,{initialValues:{searchText:""},onSubmit:function(e){i("Upravo pretra\u017eujete dom naziva: "+e.searchText)}},(function(e){var a=e.setFieldValue;return r.a.createElement(g.b,{className:"search-lodges-form"},r.a.createElement("button",{className:"search-button",type:"submit"},"\u2315"),r.a.createElement(g.a,{className:"input-search",placeholder:"Pretra\u017eite planinarske domove...",name:"searchText",id:"searchText"}),r.a.createElement(x.a,{className:"hill-select",isClearable:!0,isSearchable:!0,placeholder:"Odaberite podru\u010dje...",name:"hillId",onChange:function(e){return a("hillId",null===e?null:e.value)},options:s}))})),r.a.createElement("p",{className:"searching"},l))},_=function(){return r.a.createElement("div",null,r.a.createElement(E,null),r.a.createElement(c.d,null,r.a.createElement(c.b,{path:"/",exact:!0},r.a.createElement(c.a,{to:"home"})),r.a.createElement(c.b,{path:"/home",component:o,exact:!0}),r.a.createElement(c.b,{path:"/aboutus",component:m,exact:!0}),r.a.createElement(c.b,{path:"/register",component:S,exact:!0}),r.a.createElement(c.b,{path:"/login",component:y,exact:!0}),r.a.createElement(c.b,{path:"/mountain-lodge/search",component:F,exact:!0})))},z=t(40),P=t(42),U={results:[],error:void 0,status:"idle"},B=Object(z.c)({findAllHillsReducer:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:U,a=arguments.length>1?arguments[1]:void 0;switch(a.type){case"FIND_ALL_HILLS":return Object(P.a)(Object(P.a)({},e),{},{status:"waiting"});case"FIND_ALL_HILLS_SUCCESS":return Object(P.a)(Object(P.a)({},e),{},{status:"success",results:a.payload});case"FIND_ALL_HILLS_ERROR":return Object(P.a)(Object(P.a)({},e),{},{status:"error",error:a.payload});default:return e}}}),H=t(103),M=Object(z.d)(B,Object(z.a)(H.a));var J=function(){return r.a.createElement(R.a,{store:M},r.a.createElement(s.a,null,r.a.createElement(_,null)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(J,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},85:function(e,a,t){},86:function(e,a,t){},90:function(e,a,t){e.exports=t.p+"static/media/logo.9659fa90.jpg"}},[[108,1,2]]]);
//# sourceMappingURL=main.0fd05c4d.chunk.js.map