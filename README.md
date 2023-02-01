# Design Tokens Italia

[![Versione](https://img.shields.io/npm/v/design-tokens-italia.svg?logo=npm)](https://github.com/italia/design-tokens-italia/releases)
[![Build](https://github.com/italia/design-tokens-italia/actions/workflows/build.yml/badge.svg)](https://github.com/italia/design-tokens-italia/actions)
[![GitHub issues](https://img.shields.io/github/issues/italia/design-tokens-italia.svg)](https://github.com/italia/design-tokens-italia/issues)
[![Join the #design channel](https://img.shields.io/badge/Slack%20channel-%23design-blue.svg)](https://developersitalia.slack.com/messages/C7VPAUVB3/)
[![Get invited](https://slack.developers.italia.it/badge.svg)](https://slack.developers.italia.it/)

Design Tokens per il progetto Designers Italia.

## Installazione

```sh
npm i design-tokens-italia
```

Il package include i seguenti file:

- CSS: `design-tokens-italia/css/_variables.css`
- SCSS: `design-tokens-italia/scss/_variables.scss`
- Tokens: `design-tokens-italia/tokens/`

## Contribuire allo sviluppo

### Installazione dipendenze

```sh
npm i
```

### Utilizzo

I tokens devono essere esportati da Figma nella cartella `/tokens`.

Per compilare i token una volta esportati da Figma: 

```sh
npm run build
```