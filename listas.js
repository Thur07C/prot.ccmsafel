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

/* ===== Etapas 3 e 4: links, contatos, documentos, galeria e FAQ ===== */
document.querySelectorAll("[data-link]").forEach(a=>{const u=LINKS[a.dataset.link];
  if(u){a.href=u;a.target="_blank";a.rel="noopener";a.className="botao"}
  else a.replaceWith(el("span","botao pendente",a.textContent+" (link pendente de configuração)"))});
document.querySelectorAll("[data-contato]").forEach(s=>{const v=CONTATOS[s.dataset.contato];
  if(v)s.textContent=v;else{s.textContent="[pendente de configuração]";s.className="prov"}});
if($("lista-documentos")){
  const cats=["Projeto Político-Pedagógico (PPP)","Regimento escolar","Calendário escolar","Horários das aulas","Editais e comunicados","Regulamentos e orientações","Outros documentos"];
  DOCUMENTOS.forEach(d=>{if(!cats.includes(d.categoria))cats.push(d.categoria)});
  cats.forEach(c=>{const s=el("section","bloco");s.append(el("h2",null,c));
    const ds=DOCUMENTOS.filter(d=>d.categoria===c);
    if(!ds.length)s.append(el("p","vazio","Nenhum documento publicado ainda."));
    ds.forEach(d=>{const i=el("div");i.append(el("h3",null,d.titulo+(d.ano?" ("+d.ano+")":"")),el("p",null,d.descricao||""));
      const a=el("a","botao","Visualizar ou baixar");a.href=d.arquivo;a.target="_blank";a.rel="noopener";i.append(a);s.append(i)});
    $("lista-documentos").append(s)})}
if($("lista-galerias")){
  const dlg=$("visualizador");
  if(!GALERIAS.length)vazio($("lista-galerias"),"Nenhuma galeria publicada ainda.");
  [...GALERIAS].sort((a,b)=>b.ano.localeCompare(a.ano)).forEach(g=>{
    const s=el("section","bloco");s.append(el("h2",null,g.titulo+" ("+g.ano+")"));const gr=el("div","grade");
    g.fotos.forEach(f=>{const b=el("button","miniatura");b.type="button";const i=el("img");i.src=f.arquivo;i.alt=f.legenda||g.titulo;b.append(i);
      b.onclick=()=>{$("vis-img").src=f.arquivo;$("vis-img").alt=f.legenda||g.titulo;$("vis-leg").textContent=f.legenda||"";dlg.showModal()};gr.append(b)});
    s.append(gr);$("lista-galerias").append(s)});
  $("vis-fechar").onclick=()=>dlg.close();dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close()})}
if($("lista-faq")){FAQ.forEach(q=>{const d=el("details","bloco");d.append(el("summary",null,q.pergunta),
  el("p",q.resposta?null:"prov",q.resposta||"[Resposta pendente de informação oficial.]"));$("lista-faq").append(d)})}
