---
title: 'Alt jeg lærte da jeg satt opp Smylingsas.net opp på nytt i 2025'
date:  2026-01-01T18:47:42Z
draft: true
pageresources: []
tags: null
author: Ole Halvor Smylingsås
description: null
image: null
---

<!--more-->
Har etter mange år valgt å bygge opp denne bloggen smylingsas.net fra bunnen av igjen. Designet skal neppe gjennom de store endringene, men Hugo har blitt oppdatert så mange ganger siden jeg første gang kjørte kommandoen “Hugo new site smylingsas” at jeg nå velger å skrape oppsettet og begynne fra bunnen av. Jeg ønsker også å innføre Node i utviklingsmiljøet.NPM-pakken “Hugo-bin” (hugo-bin - npm) gjør det mulig å oppdatere Hugoversjon til ett prosjekt fremfor å endre globalt på min utviklermaskin. Det er også ønskelig å enklere kunne ta i bruk andre sine pakker som ferdiglagde “service workers”, tekstbasert søk, reset.css osv. En siste grunn er muligheten til å bruke mer Docker, både for å kunne lage enklere deployrutiner og ved å ta i bruk “Dev containers”. Jeg har flere maskiner som jeg kan drive utvikling på og ønsker at oppsettet skal være likt på alle maskiner.

Et av punktene på planen var gjøre utvikling i isolerte kontainere på min utviklermaskin. Det første jeg da begynte med var å avinstallere de fleste av VS code sine extensions. Jeg har installert noen for git, noen for Hugo, noen for .Net osv. Jeg endte med å avinstallere alle bortsett fra “Remote Development” (Remote Development - Visual Studio Marketplace). En utvidelse fra Microsoft som egentlig fungerer som en paraply for flere relaterte pakker: WSL, Remote-SSH, Remote Tunnels og Dev containers. Det er Dev container-utvidelsen jeg skal bruke nå for å lage denne isolerte containeren til Hugo-utvikling. Jeg fjerner også Hugo.exe fra min lokale disk og fjerner Hugo fra PATH.

For at Dev container-utvidelsen skal fungere behøver man Docker. Docker kan man installere for eksempel ved å installere Docker desktop for Windows. 

Skriv noe om Windows 11 Home edition som mangler Hyper-V og man kan dermed ikke kjøre windowsbaserte Docker-containere, kun linuxbaserte containere via WSL (Windows Subsystem for Linux). Jeg hadde hadde problemer med å kjøre i gang Docker Desktop på min maskin, jeg mistenker at det kan ha noe med at jeg kjører Windows 11 Home Edition som mangler Hyper-V. Docker ga bare feilmeldinger og jeg klarte ikke bruke Dev containere. Jeg endte opp med å laste Ubuntu som så kjører inne i WSL. I Ubuntu installerte jeg Docker.

Med Docker installert var det mulig å benytte seg av Dev container-extension til VS Code. Det eneste jeg vet at jeg behøver på dette tidspunktet er Node så jeg sjekker for å se om det finnes en ferdiglaget kontainer for dette. Trykker F1 i VS code og velger “Dev containers: New Dev container…”. Søker deretter på Node og får opp et valg som heter Node.jeg laget av @csutter. Trykker “Ok” når jeg er ferdig. VS Code restarter, men har nå åpnet en tom kontainer som inneholder Node klar til å brukes.

## Filstruktur
Et lite avsnitt om filstruktur.

## Innstallere Hugo for første gang
Jeg hadde nå en tom Nodekontainer klar til bruk og det neste steget var å bruke NPX(npx | npm Docs, Introducing npx: an npm package runner | by Kat Marchán | Medium). Jeg velger å bruke NPX for å kjøre kommandoen “hugo new site <name>”. Det skal kun gjøres en gang for dette prosjektet og det vil da ikke ha noen hensikt i å legge dette til i package.js.

npx hugo-bin new site building.smylingsas.net lager en Hugo mappestruktur på roten til dev containeren, men som jeg skal legge merke til senere - ved siden av av devcontainer-mappen. 

Jeg entrer mappen ved  å kjøre følgende kommando og for å opprette en package,json-fil.

```
cd building.smylingsas.net
npm init -y
Wrote to /workspaces/barebones-nodejs-3/building.smylingsas.net/package.json:

{
  "name": "building.smylingsas.net",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}
```


En package.json ble da opprettet i roten til prosjektet.

Ja jeg benyttet NPX til å opprette en ny site til å begynne med, men det vil være litt slitsom å måtte aksessere Hugo fra remote hver gang man skal kjøre en kommando så jeg velger å installere lokalt ved å benytte npm-pakken “Hugo-bin“. Da kan jeg også enkelt endre versjonen til Hugo fra package.json.

Hugo kommer i 2 versjoner; en vanlig og en extended. Jeg velger extended for å ha tilgang til Hugo sine mange funksjoner rundt bildebehandling. Extendedversjonen er også den anbefalte versjonen fra gjengen som står bak Hugo. Derfor legger jeg til følgende linje i min package.json. Det er meget viktig at dette gjøres før man installerer eller vil NPM alltid installere den vanlige versjonen uansett

```
"hugo-bin": {
  "buildTags": "extended"
}
```


Kjør følgende kommano for å installere hugo-bin:
```
npm install hugo-bin -S
```

Endrer så litt på script-seksjonen i package.json: 
Hugo server bygger prosjektet og starter den innebygde webserveren med hot-reload
```
"scripts": {
  "start": "hugo server --buildDrafts --cleanDestinationDir",
  "hugo": "hugo",
  "hugo:build": "hugo --minify"
},
```

For å sjekke hvilken versjon av hugo man kjører kan nå denne kommandoen eksekveres:
npm run hugo version

```
// Svaret blir noe i nærheten av (om alt er satt opp riktig): 
hugo v0.136.2-ad985550a4faff6bc40ce4c88b11215a9330a74e+extended linux/amd64 BuildDate=2024-10-17T14:30:05Z VendorInfo=gohugoio
```

## Git
Jeg vil versjonskontrollere prosjektet og oppretter derfor et prosjekt på GitHub (uten gitignore)
— mer detaljer

Kjører git init --initial-branch=main på roten av prosjektet. Merk da at jeg står i building.smylingsas.net. Ser da at mitt oppsett av dev container: mappen .devcontainer med configfil og dockerfil ikke blir med i det lokale repoet. Jeg tar da sjansen på å flytte .devcontainer inn i building.smylingsas.net slik at denne mappen også blir versjonskontrollert, det er jo litt av poenget med denne konfigurasjonen - hent ned hele repoet og start med utvikling, i stedet for å starte med konfigurering. Hver gang jeg har gjort en endring i dev container - oppsettet har jeg valgt å starte den virtuelle containere på nytt for å sjekke at endringene ble utført. Det gjorde jeg også nå - det feilet fordi den ikke lenger finner devcontainer-configfilen. containeren kan nå da ikke lenger åpnes på nytt.

> Jeg endte opp med å slette alle docker containere og docker images på maskinen og starte på nytt

Nyttig tips:
Bruk remote explorer og start containeren i samme vindu om man har måtte restarte host-maskinen siden sist. Remote-explorer - extention tar var på alle dev containerne som er opprettet på hostmaskinen i VS Code. 

Jeg er tilbake på det samme punktet jeg kom til før jeg gjorde denne tabben. Jeg forsøker å kjøre 

npm start. 

Det fungerer. Hugo bygger prosjektet



og VS Code spør om jeg vil åpne resultatet i en nettleser:



Resultet ble dette (som ikke er så rart fordi jeg ikke har lagt til noe innhold ennå)


Jeg har ikke innhold, jeg har heller ikke noen måte å vise innholdet på. La oss ta en titt filstrukturen i prosjektet per nå:


Innholdet skal etterhvert plasseres i mappa content, utformmingen av innholdet skal plasseres i mappa Layouts. 

Jeg starter med å lage en mappe under layouts:

```
mkdir layouts/_default
```
Et prosjekt i Hugo er bygget opp av ulike sidetyper: index, 404, single og list for å nevne noen. Hver av disse må ha en egen templatefil, vi oppretter de nå

```
touch layouts/_default/baseof.html
touch layouts/_default/single.html
touch layouts/_default/list.html
```

baseof.html inneholder skjelettet til nettsiden. Både <html>,<head> og <body> - elementene kan plasseres i denne filen. De andre templatefilene bruker denne filen.

```
<!DOCTYPE html>
<html lang="no">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta author="Ole Halvor Smylingsås">
    </head>
    <body>
        <div>
            {{- block "main" . -}}{{- end -}}
        </div>
    </body>
</html>
```

Oppretter også en index.html-fil på roten av content-mappa. Dette er filen som blir vist når en besøker base-url eller localhost:1313 akkurat nå

```
touch content/_index.html
```

og legger inn følgende som innhold i filen

```
---
title: 'Home'
---
<h1>This is the home page</h1>
```

Om man nå sjekker nettlesren vil dette forhåpentligvis være resultatet:


## Konfigurasjon av Hugo

Konfigurasjonen av Hugo foregår i en fil plassert på rot i prosjektet: hugo.toml, jeg foretrekker YAML så jeg starter med å endre filtypen:

mv hugo.toml hugo.yaml

Innholdet av hugo.yaml vil da se slik ut som dette:

```
baseURL = 'https://example.org/'
languageCode = 'en-us'
title = 'My New Hugo Site'
```


Det er ikke riktig format for en YAML-fil og nettleseren vil akkurat nå vise følgende feilmelding: 



Dette nå rettes opp i: 

Endrer innholdet til dette format:

```
baseURL: https://building.smylingsas.net/
languageCode: nb #ISO 639-1 Language Codes
title: building.smylingsas.net
module:
   hugoVersion:
    extended: true
    min: "0.112.0"
```
Legg merke til at “=” er byttet ut med “:” og at fnutter er fjernet.

The baseUrl is used by Hugo to generate absolute URLs, like the ones that are used in a RSS feed. The baseURL should contain the absolute URL (protocol, host, path, and trailing slash) of your published site. I’ve used the URL that was generated by Cloudflare, which hosts my blog. Deployment to Cloudflare is covered in the last chapter of this guide. If you don’t have a URL yet, don’t worry, set it to http://localhost:1313/ for now and change it later it when you deploy your site.

All possible configuration settings are listed here: https://gohugo.io/getting-started/configuration/#all-configuration-settings. For now, the above settings will suffice.

CSS

Tilbake til filstrukturen ser vi mappen “assets”



The assets folder contains all files (CSS, images, JavaScript, etc..) that need to be processed by HUGO. Assets that are not referenced in content or layout files, will not end up in production.

Jeg oppretter i første omgang en mappe for CSS og oppretter så en enkel fil: styles.css. For å teste at alt fungerer, legger jeg kun inn 1 linje CSS for å endre bakgrunnsfarge.

Lagre på GitHub

Opprette nytt, tomt repo på github kalt building.smylingsas.net

navigere til containeren rotmappe og kjøre kommandoen git init:

git init --initial-branch=main


 git remote set-url origin https://github.com/olehsm/building.smylingsas.net.git

git remote add origin https://github.com/olehsm/iot-helloworld-blinkled.git

git pull origin main

git push --set-upstream origin main

Lager en commit og pusher en gang til





## Oppsett av templates

Jeg oppretter i første omgang en template for <head>-taggen som jeg inkluderer i baseof-templaten. Denne templaten skal inneholde alt innhold som kan plasseres mellom <head> og </head>. det være seg Hugo sin pipe-funksjonalitet for CSS, oppsett av favicon, oppsett av twitter-kort, såkalt OG-images og inkludering av en manifestfil slik at nettsiden på sikt kan intalleres som en PWA.

Etter å ha studert dokumentasjonen til Hugo fant jeg ut at det finnes ferdiglagde templates for Open Graph, både til Twitter/X og Facebook


##  Hugo Pipes og CSS
Jeg tok en avgjørelse da jeg startet et nytt prosjektet, jeg ønsket å fjerne SCSS fra kodebasen og heller bruke vanilla CSS. Det er jo når disse ord skrives fullt mulig å bruke @import i vanilla css og det var også planen min. men desverre:

Hugo Pipes doesn’t process @import in plain .css files. It does not parse or resolve them, because it's not a full CSS parser or bundler like PostCSS, Webpack, or Vite.  	

Because when you use .scss files with resources.ToCSS, Hugo uses the LibSass engine, which does support resolving @import (and @use).
That’s why:
✅ @import works in .scss


❌ @import is ignored in plain .css with Hugo Pipes
If you write something like this in main.css:
css
CopyEdit
@import 'variables.css';
@import 'header.css';

Hugo will just treat that as a string of text. It won’t actually look for the imported files or combine them — because Hugo doesn’t resolve @import dependencies in plain CSS.

default image dersom man magler image i page.params
```
{{ with .Resources.GetMatch .Params.image }} 
    <img src="{{ .RelPermalink }}" width="{{ .Width }}" height="{{ .Height }}">
{{ else }}
    {{ with resources.Get "images/shrug.svg" }}
        <img src="{{ .RelPermalink }}" alt="No image found. Showing the default image" title="Default image">
    {{ end }}
{{ end }}

```
> legg merke til at det er forskjell på .Resources.Get og resources.Get, dette er ikke en skrivefeil. den siste er ment for å hente globale filer

## Pagefind
Jeg ønsket et søk på nettsiden. Brukte pagefind


