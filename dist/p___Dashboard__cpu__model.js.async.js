(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{Ss4v:function(e,t,a){"use strict";a.r(t);var n=a("smUt"),r=a.n(n),u=a("NTxs"),s=a.n(u),p=a("dCQc");t["default"]={namespace:"cpu",state:{data:[],equipment:[],defaultEquipment:"",percent:100,isShow:!1},effects:{fetchCpuData:s.a.mark(function e(t,a){var n,r,u,c,o,i,d,l,b,f,m;return s.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=t.payload,r=a.call,u=a.put,console.log("%cpayload: ","font-size:15px;background-color: rgb(135, 208, 104);",n),e.next=5,r(p["l"]);case 5:if(c=e.sent,o=n,i=o.id,d=o.pathname,i){e.next=13;break}return n={id:c[0].key},e.next=11,u({type:"setDefaultEquipment",payload:c[0].name});case 11:e.next=22;break;case 13:n={id:i},e.t0=s.a.keys(c);case 15:if((e.t1=e.t0()).done){e.next=22;break}if(l=e.t1.value,n.id!=c[l].key){e.next=20;break}return e.next=20,u({type:"setDefaultEquipment",payload:c[l].name});case 20:e.next=15;break;case 22:e.t2=d,e.next="/dashboard/cpu"===e.t2?25:"/dashboard/storage"===e.t2?27:"/dashboard/disk"===e.t2?29:31;break;case 25:return b=p["j"],e.abrupt("break",32);case 27:return b=p["n"],e.abrupt("break",32);case 29:return b=p["k"],e.abrupt("break",32);case 31:return e.abrupt("break",32);case 32:return e.next=34,r(b,n);case 34:return f=e.sent,m=[],f.length>0&&(m=f.map(function(e){return{key:e.id,time:e.create_time,cpu:e.usage_rate,cpuPercent:100*e.usage_rate+"%",tableTime:new Date(e.create_time).toLocaleTimeString()}})),e.next=39,u({type:"setEquipmentData",payload:c});case 39:return e.next=41,u({type:"setCpuData",payload:m});case 41:return e.next=43,u({type:"setIsShow",payload:!0});case 43:case"end":return e.stop()}},e)})},reducers:{setCpuData:function(e,t){var a=t.payload;return r()({},e,{data:a,percent:a.length>0?100*a[a.length-1].cpu:100})},setEquipmentData:function(e,t){var a=t.payload;return r()({},e,{equipment:a})},setDefaultEquipment:function(e,t){var a=t.payload;return r()({},e,{defaultEquipment:a})},setIsShow:function(e,t){var a=t.payload;return r()({},e,{isShow:a})}}}}}]);