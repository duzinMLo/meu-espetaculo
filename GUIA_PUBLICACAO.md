# Meu Espetáculo — Guia para publicar no GitHub Pages + Registro.br

Este projeto é um site estático. Você não precisa de Vercel, servidor, banco de dados ou Node.js para colocá-lo no ar.

## 1. Colocar a URL da playlist (obrigatório)

1. No Spotify, abra a playlist que deseja compartilhar. Se for privada, confira se o destinatário poderá acessá-la pelo link.
2. Copie o link da playlist. Exemplo: `https://open.spotify.com/playlist/37i9dQZF1DX...`
3. No VS Code, abra **config.js**.
4. Substitua a linha `window.SPOTIFY_PLAYLIST_URL = "";` por `window.SPOTIFY_PLAYLIST_URL = "https://open.spotify.com/playlist/SEU_ID_REAL";`.
5. Salve. Não apague as aspas.
6. Para testar antes de publicar, abra `index.html` no navegador; passe pelas três telas e clique no botão final.

**Atenção:** sem preencher esse endereço, o botão exibe um aviso de configuração, não um link fictício.

## 2. Criar o repositório no GitHub

1. Entre em https://github.com e faça login.
2. Clique em **New repository**. Sugestão de nome: `meu-espetaculo`.
3. Escolha **Public** (GitHub Pages gratuito para repositórios públicos em contas pessoais; confirme as regras atuais do seu plano).
4. Crie o repositório.
5. Use **Add file → Upload files** e envie **os arquivos e a pasta `assets` que estão dentro da pasta `meu-espetaculo`**, não a pasta externa como um nível adicional.
6. Confira se `index.html`, `style.css`, `script.js`, `config.js`, `CNAME`, `.nojekyll` e `assets/favicon.svg` estão na raiz/estrutura correta.
7. Confirme o commit.

**Privacidade:** um repositório público permite visualizar os arquivos e os textos da declaração. O site também é acessível a qualquer pessoa que tenha o link; não é protegido por senha.

## 3. Ativar o GitHub Pages

1. Abra seu repositório → **Settings → Pages**.
2. Em **Build and deployment**, selecione **Deploy from a branch**.
3. Escolha **main** e a pasta **/(root)**. Clique em **Save**.
4. Em **Custom domain**, escreva `meuespetaculo.com.br` e salve. O arquivo `CNAME` já foi criado com esse nome.
5. Aguarde o GitHub indicar que a publicação foi concluída. Inicialmente pode aparecer um endereço temporário `SEU_USUARIO.github.io/meu-espetaculo/`.

> Configure o domínio no GitHub antes de apontar o DNS no Registro.br, para reduzir o risco de configuração indevida.

## 4. Apontar o domínio no Registro.br

1. Registre e pague `meuespetaculo.com.br` em https://registro.br/ se ainda não estiver registrado. O nome precisa estar disponível.
2. Entre no painel do domínio em **Registro.br → DNS → Configurar zona DNS** (ou a opção equivalente, como **Editar Zona**). Caso use DNS de outro provedor, faça os apontamentos no provedor DNS ativo, não no Registro.br.
3. Crie **quatro registros do tipo A** para o domínio raiz (host `@`, ou campo de nome vazio quando o painel assim solicitar):

| Tipo | Nome/host | Destino |
| --- | --- | --- |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

4. Para que **www.meuespetaculo.com.br** também funcione, crie um registro:

| Tipo | Nome/host | Destino |
| --- | --- | --- |
| CNAME | www | `SEU_USUARIO.github.io` |

Substitua `SEU_USUARIO` pelo seu nome de usuário exato do GitHub, **sem** `https://` e **sem** `/meu-espetaculo`. **Não** use `meuespetaculo.com.br` como destino do CNAME de `www`.

5. Salve as alterações. A propagação DNS e a emissão de certificado podem levar algum tempo.
6. Volte em **GitHub → Settings → Pages**. Quando estiver disponível, habilite **Enforce HTTPS**.
7. Teste os dois endereços: `https://meuespetaculo.com.br` e `https://www.meuespetaculo.com.br`.

**Se existirem registros A ou AAAA antigos e conflitantes para `@`, analise-os antes de substituir.** Não apague MX/TXT de e-mail ou outras entradas que você não conhece. Evite registros wildcard (`*`) apontando ao GitHub Pages.

## 5. Verificar e resolver problemas

- **Site abre, mas sem estilo?** Confirme que todos os arquivos estão na raiz, inclusive `style.css`, e que a pasta `assets` foi enviada.
- **Botão do Spotify mostra aviso?** Preencha a constante `window.SPOTIFY_PLAYLIST_URL` em `config.js`, com link completo `https://open.spotify.com/playlist/...` e faça commit.
- **404 no domínio?** Confira o domínio em Settings → Pages, a presença do `CNAME`, DNS e deployment na branch main/root.
- **HTTPS não pode ser habilitado?** Revise registros DNS conflitantes, espere a emissão do certificado e consulte Settings → Pages.
- **www não abre?** Confirme `CNAME www → SEU_USUARIO.github.io`.
- **O nome não resolve?** Confirme que `meuespetaculo.com.br` foi registrado e está usando a zona DNS editada.

## 6. Depois que o site estiver no ar

Para atualizar textos, cores, link do Spotify ou decoração: edite o arquivo no GitHub (ou localmente e envie um novo commit). O GitHub Pages publicará a nova versão após a próxima implantação.

## Fontes oficiais para conferir as configurações

- GitHub Pages — domínio personalizado: https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- GitHub Pages — HTTPS: https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https
- Registro.br — gerenciamento DNS: https://registro.br/tecnologia/caracteristicas-tecnicas/


## Publicar a versão 2.0 (fotos e vídeo)
1. Abra o mesmo repositório do GitHub Pages já conectado ao domínio.
2. Envie `index.html`, `style.css`, `script.js` atualizados e a pasta `assets` completa, incluindo `assets/fotos` e `assets/video`.
3. **Não apague** `CNAME` e mantenha o endereço real da playlist em `config.js` (caso já o tenha configurado).
4. Faça commit e aguarde a implantação do GitHub Pages. Não altere o DNS no Registro.br.
5. Abra `https://meuespetaculo.com.br` em janela anônima e teste a galeria, o player e o Spotify.
6. As mídias são públicas se o repositório/site é público. Obtenha autorização das pessoas retratadas antes de divulgar.
