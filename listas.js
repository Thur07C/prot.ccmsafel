/* ===== Monta notícias e avisos a partir de js/dados.js ===== */
const el=(t,c,x)=>{const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e};
const dataBR=d=>d.split("-").reverse().join("/");
const porData=l=>[...l].sort((a,b)=>b.data.localeCompare(a.data));
const vazio=(alvo,msg)=>alvo.append(el("p","vazio",msg));
function cartaoNoticia(n){
  const a=el("article","bloco");
  if(n.imagem){const i=el("img");i.src=n.imagem;i.alt=n.imagemAlt||"";a.append(i)}
  const h=el("h3"),l=el("a",null,n.titulo);l.href="noticia.html?id="+encodeURIComponent(n.id);h.append(l);
  a.append(h,el("p","data",dataBR(n.data)),el("p",null,n.resumo));return a}
function cartaoAviso(v){
  const a=el("article","bloco"+(v.prioridade?" prioritario":""));
  if(v.prioridade)a.append(el("span","selo","Aviso prioritário"));
  a.append(el("h3",null,v.titulo),el("p","data",dataBR(v.data)+(v.categoria?" · "+v.categoria:"")),el("p",null,v.texto));return a}
const $=id=>document.getElementById(id);
const ns=porData(NOTICIAS), as=porData(AVISOS).sort((a,b)=>(b.prioridade?1:0)-(a.prioridade?1:0));
if($("lista-noticias")){
  const rec=ns.slice(0,10),arq=ns.slice(10);
  rec.length?rec.forEach(n=>$("lista-noticias").append(cartaoNoticia(n))):vazio($("lista-noticias"),"Nenhuma notícia cadastrada ainda.");
  if(arq.length){const anos={};arq.forEach(n=>(anos[n.data.slice(0,4)]??=[]).push(n));
    Object.keys(anos).sort().reverse().forEach(y=>{$("arquivo-noticias").append(el("h3",null,y));const g=el("div","grade");anos[y].forEach(n=>g.append(cartaoNoticia(n)));$("arquivo-noticias").append(g)})}
  else vazio($("arquivo-noticias"),"O arquivo será preenchido conforme novas notícias forem publicadas.")}
if($("noticia-detalhe")){
  const n=NOTICIAS.find(x=>x.id===new URLSearchParams(location.search).get("id")),d=$("noticia-detalhe");
  if(!n){d.append(el("p","vazio","Notícia não encontrada."));const l=el("a",null,"Voltar para as notícias");l.href="noticias.html";d.append(l)}
  else{document.title=n.titulo+" — Colégio Cívico-Militar Santa Felicidade";
    d.append(el("h2",null,n.titulo),el("p","data",dataBR(n.data)));
    if(n.imagem){const i=el("img");i.src=n.imagem;i.alt=n.imagemAlt||"";d.append(i)}
    (n.texto||[]).forEach(p=>d.append(el("p",null,p)));
    const l=el("a",null,"Voltar para as notícias");l.href="noticias.html";d.append(l)}}
if($("lista-avisos")){as.length?as.forEach(v=>$("lista-avisos").append(cartaoAviso(v))):vazio($("lista-avisos"),"Nenhum aviso cadastrado ainda.")}
if($("home-noticias")){ns.slice(0,3).forEach(n=>$("home-noticias").append(el("p",null,dataBR(n.data)+" — "+n.titulo)));if(!ns.length)vazio($("home-noticias"),"Nenhuma notícia cadastrada ainda.")}
if($("home-avisos")){as.slice(0,3).forEach(v=>$("home-avisos").append(el("p",null,(v.prioridade?"⚠ ":"")+v.titulo)));if(!as.length)vazio($("home-avisos"),"Nenhum aviso cadastrado ainda.")}
