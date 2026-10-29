/* ===== Portal CCM Santa Felicidade — cabeçalho, menu e rodapé =====
   Tudo é montado aqui, para não repetir o código em cada página.
   Para criar uma nova página: adicione uma linha em PAGINAS. */
const CONFIG = {
  nome: "Colégio Cívico-Militar Santa Felicidade",
  subtitulo: "Portal institucional",
  brasao: ""  // PENDENTE: coloque aqui o caminho da imagem do brasão (ex.: "img/brasao.png")
};
const PAGINAS = [
  ["index.html","Página inicial"],
  ["o-colegio.html","O colégio"],
  ["gestao-escolar.html","Gestão escolar"],
  ["noticias.html","Notícias"],
  ["avisos.html","Avisos e comunicados"],
  ["secretaria.html","Secretaria escolar"],
  ["estudante.html","Área do estudante"],
  ["responsaveis.html","Área dos responsáveis"],
  ["documentos.html","Documentos oficiais"],
  ["ouvidoria.html","Ouvidoria"],
  ["contatos.html","Contatos"],
  ["galeria.html","Galeria de fotos"],
  ["transparencia.html","Transparência e participação"],
  ["faq.html","Perguntas frequentes"]
];
(function(){
  let atual = location.pathname.split("/").pop() || "index.html";
  if (atual === "noticia.html") atual = "noticias.html"; // detalhe da notícia destaca "Notícias"
  const brasao = CONFIG.brasao ? `<img src="${CONFIG.brasao}" alt="Brasão do colégio">` : "Brasão<br>(pendente)";
  const itens = PAGINAS.map(([u,t]) => `<li><a href="${u}"${u===atual?' aria-current="page"':""}>${t}</a></li>`).join("");
  document.body.insertAdjacentHTML("afterbegin", `
    <a class="pular" href="#principal">Ir para o conteúdo</a>
    <header class="topo">
      <div class="brasao">${brasao}</div>
      <div class="titulo-site"><strong>${CONFIG.nome}</strong><span>${CONFIG.subtitulo}</span></div>
      <button class="btn-menu" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu"><span></span><span></span><span></span></button>
    </header>
    <div class="estrutura">
      <nav class="menu" id="menu" aria-label="Menu principal">
        <div class="menu-cab">Menu <button class="btn-fechar" aria-label="Fechar menu">✕</button></div>
        <ul>${itens}</ul>
      </nav>
      <div class="fundo-menu"></div>
      <main class="conteudo" id="principal"></main>
    </div>`);
  // move o conteúdo da página para dentro da área principal
  const main = document.getElementById("principal");
  const modelo = document.getElementById("conteudo-pagina");
  main.append(...modelo.content.childNodes);
  modelo.remove();
  document.body.insertAdjacentHTML("beforeend", `
    <footer class="rodape"><div class="rodape-in">
      <div><h2>${CONFIG.nome}</h2>${[CONTATOS.endereco,CONTATOS.telefone,CONTATOS.email].filter(Boolean).map(x=>`<p>${x.replace(/</g,"&lt;")}</p>`).join("")||"<p>Contatos oficiais pendentes de configuração.</p>"}</div>
      <div><h2>Páginas</h2><ul>${PAGINAS.slice(0,6).map(([u,t])=>`<li><a href="${u}">${t}</a></li>`).join("")}</ul></div>
      <div><h2>Atalhos</h2><ul><li><a href="ouvidoria.html">Ouvidoria</a></li><li><a href="contatos.html">Contatos</a></li><li><a href="documentos.html">Documentos oficiais</a></li><li><a href="faq.html">Perguntas frequentes</a></li></ul></div>
    </div></footer>`);
  // menu do celular
  const menu = document.getElementById("menu"), fundo = document.querySelector(".fundo-menu"), btn = document.querySelector(".btn-menu");
  function abrir(sim){
    menu.classList.toggle("aberto", sim); fundo.classList.toggle("aberto", sim);
    btn.setAttribute("aria-expanded", sim); btn.setAttribute("aria-label", sim?"Fechar menu":"Abrir menu");
    if(sim) menu.querySelector("a").focus(); else btn.focus();
  }
  btn.onclick = () => abrir(!menu.classList.contains("aberto"));
  document.querySelector(".btn-fechar").onclick = () => abrir(false);
  fundo.onclick = () => abrir(false);
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("aberto")));
  document.addEventListener("keydown", e => { if(e.key==="Escape" && menu.classList.contains("aberto")) abrir(false); });
})();
