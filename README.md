# Meu Espetáculo

Site estático em três atos, com cenários desenhados em CSS, um envelope interativo e um botão que leva ao Spotify. Textos da declaração preservados conforme definidos.

## Começar

1. Abra `config.js` e cole o endereço verdadeiro da playlist Spotify em `window.SPOTIFY_PLAYLIST_URL`.
2. Abra `index.html` no navegador para experimentar.
3. Para colocar na internet com `meuespetaculo.com.br`, siga **GUIA_PUBLICACAO.md**.

## Estrutura

- `index.html` — conteúdo e textos das três telas
- `style.css` — visuais, jardim, cottage, pôr do sol, noite estrelada e responsividade
- `script.js` — navegação, abertura do envelope, validação e abertura do Spotify
- `config.js` — único ajuste necessário: link da playlist
- `CNAME` — domínio personalizado para GitHub Pages
- `.nojekyll` — publicação direta de arquivos estáticos
- `assets/favicon.svg` — ícone do navegador
- `GUIA_PUBLICACAO.md` — guia completo de publicação

## Características

- Sem frameworks ou build; funciona com arquivos estáticos
- Layout adaptado a celulares
- Controles acessíveis por teclado e suporte a movimento reduzido
- Botão voltar discreto; ao voltar à carta ela continua aberta
- Fundo muda de pôr do sol para noite estrelada na última tela
- Sem áudio automático, coleta de dados ou cookies de rastreamento do projeto
- Carrega fontes públicas do Google Fonts quando há acesso à internet; possui fontes locais de fallback

**Importante:** no GitHub Pages, o repositório público expõe o código e os textos do site; não inclua informações privadas que não deseja publicar.
