---
title: 'Anbefalte Extensions I VSCode'
date:  2026-06-02T12:56:21Z
draft: true
pageresources: []
tags:
  - misc
author: Ole Halvor Smylingsås
description: null
image: null
---
ett opp anbefalte extensions for et prosjekt i Visual Studio Code
<!--more-->

Det er to måter å gjøre dette på avhengig av om ditt workspace er et multi-root workspace eller ikke. Dette prosjektet er satt opp som multi-root, det vil si at prosjektet inneholder en workspace og har en .code-workspace fil på roten.

> .code-workspace

Trykk F1 og kjøre kommandoen "Extensions: Configure Recommended Extensions (Workspace Folder)"

> Extensions: Configure Recommended Extensions (Workspace Folder)

```json
"extensions": {
    "recommendations": [
        "bungcip.better-toml", 
        "budparr.language-hugo-vscode", 
        "eamodio.gitlens", 
        "eliostruyf.vscode-front-matter", 
        "pwabuilder.pwa-studio"
    ]
}
```


Kommandoen legger inn Extensionsattributtet i workspacefilen og jeg la selv inn de utvidelsene jeg mentte måtte med. Disse må legge inn med følgende form: "utvikler.navn"

> Tips er å åpne extensionsmappen som på min windowsmaskin ligger her: C:\Users\me\.vscode\extensions. Der ligger alle extensions på tvers av prosjekter på formen: "utvikler.navn-versjon". Da er det enkelt å fjerne versjonsnummeret og legge det inn i recommendations.