# Pra minha garota ❤️

Um site romântico estático, feito com **HTML, CSS e JavaScript puro**, pronto para publicar no GitHub Pages como um presente digital.

## Estrutura do projeto

```text
/
├── index.html
├── styles.css
├── script.js
├── photos.js
├── README.md
└── assets/
    └── fotos/
        └── .gitkeep
```

## 1. Como colocar fotos

1. Coloque suas imagens dentro da pasta `assets/fotos/`.
2. Abra o arquivo `photos.js`.
3. Cadastre cada caminho no array `COUPLE_PHOTOS`.

Exemplo:

```js
const COUPLE_PHOTOS = [
  "./assets/fotos/foto1.jpg",
  "./assets/fotos/foto2.jpg",
  "./assets/fotos/foto3.webp"
];
```

A galeria aceita `.jpg`, `.jpeg`, `.png` e `.webp`, desde que o caminho esteja correto no `photos.js`.

Se o array estiver vazio ou nenhuma foto carregar, o site mostra uma mensagem bonita pedindo para adicionar as fotos.

## 2. Como publicar no GitHub Pages

1. Suba este projeto para um repositório no GitHub.
2. No GitHub, abra **Settings**.
3. Vá até **Pages**.
4. Em **Branch**, selecione `main`.
5. Salve.
6. Aguarde o GitHub gerar o link e abra a página publicada.

O site abre diretamente pelo `index.html` e usa apenas arquivos estáticos.

## 3. Onde alterar o número do WhatsApp

No arquivo `script.js`, altere a variável:

```js
const WHATSAPP_NUMBER = "5511919730067";
```

Use o número com código do país e DDD, sem `+`, espaços ou traços.

## 4. Onde alterar a data da contagem regressiva

No arquivo `script.js`, altere a variável:

```js
const COUNTDOWN_TARGET = "2026-10-31T23:59:59-03:00";
```

## 5. Onde alterar os textos

Os textos principais ficam no arquivo `index.html`.

Procure pelos comentários no HTML para editar:

- Título e subtítulo do início.
- Texto principal de saudade.
- Pergunta especial.
- Frases dos botões.

## Observações técnicas

- Não usa backend.
- Não usa banco de dados.
- Não exige Node.js.
- Não usa frameworks.
- Usa caminhos relativos para funcionar bem no GitHub Pages.
