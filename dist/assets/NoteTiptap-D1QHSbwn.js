import{J as t,j as d,aG as u,aH as n,aI as c,aJ as l,aK as b,aL as i,aM as p,aN as f,aO as m,aP as g,aQ as x,aR as h,aS as j,aT as L,aU as R,aV as U,aW as O,aX as T,aY as w,aZ as C,a_ as P,a$ as v,b0 as E,b1 as N,b2 as k,b3 as y,b4 as D,b5 as I,b6 as M,b7 as S,b8 as G,b9 as H,ba as J,bb as V,bc as W,bd as _,be as $,bf as z,bg as A,bh as B,bi as F,bj as K}from"./vendor-CTgXdXBL.js";const Q=[n.configure({placeholder:{showOnlyCurrent:!0},characterCount:{limit:5e4}}),c,l,b,i.configure({spacer:!0}),p,f,m.configure({spacer:!0}),g,x,h,j,L,R,U,O,T.configure({spacer:!0}),w,C,P,v.configure({types:["heading","paragraph"],spacer:!0}),E,N,k.configure({spacer:!0,taskItem:{nested:!0}}),y,D,I.configure({upload:e=>new Promise(s=>{setTimeout(()=>{s(URL.createObjectURL(e))},500)})}),M,S.configure({upload:e=>{const s=e.map(a=>({src:URL.createObjectURL(a),alt:a.name}));return Promise.resolve(s)}}),G,H,J,V.configure({toolbar:!1}),W.configure({defaultTheme:"dracula"}),_,$,z,A.configure({spacer:!0}),B.configure({upload:e=>{const s=e.map(a=>({src:URL.createObjectURL(a),alt:a.name}));return Promise.resolve(s)}}),F,K];function Y({content:e,onValueChange:s,readonly:a}){const[r,o]=t.useState(!!a);return t.useEffect(()=>{o(!!a)},[a]),d.jsx("div",{className:"p-[14px] flex flex-col w-full max-w-screen-lg gap-[10px] mx-[auto] my-0 ",style:{margin:"10px auto",border:"none",outline:"none"},children:d.jsx(u,{output:"html",hideToolbar:r,dense:!0,content:e,onChangeContent:s,extensions:Q,disabled:r,dark:!1})})}export{Y as default};
