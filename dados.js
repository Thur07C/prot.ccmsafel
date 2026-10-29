/* ===== Dados editáveis: notícias e avisos =====
   Para publicar, copie um modelo abaixo, preencha e coloque dentro dos colchetes [ ].
   Separe os itens com vírgula. Datas no formato AAAA-MM-DD.

   Modelo de notícia:
   { id:"identificador-unico", titulo:"Título", data:"2026-01-31", imagem:"", imagemAlt:"",
     resumo:"Resumo curto.", texto:["Parágrafo 1.","Parágrafo 2."] },

   Modelo de aviso (prioridade:true destaca em vermelho):
   { titulo:"Título", data:"2026-01-31", categoria:"Reunião", prioridade:false, texto:"Texto do aviso." },
*/
const NOTICIAS = [
  // PENDENTE: nenhuma notícia oficial cadastrada ainda
];
const AVISOS = [
  // PENDENTE: nenhum aviso oficial cadastrado ainda
];

/* ===== LINKS OFICIAIS =====
   Cole entre as aspas o endereço completo (https://...). Enquanto estiver vazio,
   o botão aparece como "link pendente de configuração" e não leva a lugar nenhum. */
const LINKS = {
  matricula: "",          // matrícula e rematrícula
  documentos: "",         // solicitação de documentos
  declaracoes: "",        // declarações e históricos
  transferencias: "",     // transferências
  ouvidoria: "",          // canal oficial da Ouvidoria
  plataforma1: "",        // plataforma educacional oficial 1
  plataforma2: "",        // plataforma educacional oficial 2
  calendario: "",         // calendário escolar (se publicado online)
  conselhoEscolar: "",    // página oficial do Conselho Escolar
  apmf: "",               // página oficial da APMF
  transparencia: "",      // página oficial de transparência
  instagram: "",
  facebook: "",
  whatsapp: "",           // botão de contato (se autorizado)
  mapa: ""                // link do mapa (Google Maps, etc.)
};
/* ===== CONTATOS OFICIAIS (preencher somente com dados confirmados) ===== */
const CONTATOS = { endereco: "", telefone: "", email: "", horario: "" };
/* ===== DOCUMENTOS =====
   Coloque o PDF na pasta docs/ e acrescente uma linha. Categorias aceitas:
   "Projeto Político-Pedagógico (PPP)", "Regimento escolar", "Calendário escolar", "Horários das aulas",
   "Editais e comunicados", "Regulamentos e orientações", "Outros documentos"
   Modelo: { categoria:"Regimento escolar", titulo:"Título", descricao:"Resumo", ano:"2026", arquivo:"docs/arquivo.pdf" }, */
const DOCUMENTOS = [
  // PENDENTE: nenhum documento oficial publicado ainda
];
/* ===== GALERIAS =====
   Coloque as fotos em img/galeria/ e acrescente um evento.
   Modelo: { titulo:"Nome do evento", ano:"2026", fotos:[ { arquivo:"img/galeria/foto1.jpg", legenda:"Descrição" } ] }, */
const GALERIAS = [
  // PENDENTE: nenhuma foto oficial autorizada ainda
];
/* ===== PERGUNTAS FREQUENTES =====
   Enquanto a resposta estiver vazia, aparece "resposta pendente". */
const FAQ = [
  { pergunta:"Como é o atendimento da secretaria?", resposta:"" },
  { pergunta:"Onde encontro os horários das aulas?", resposta:"" },
  { pergunta:"Onde consulto o calendário escolar?", resposta:"" },
  { pergunta:"Como solicito documentos escolares?", resposta:"" },
  { pergunta:"Quais são os canais de contato com a escola?", resposta:"" }
];
