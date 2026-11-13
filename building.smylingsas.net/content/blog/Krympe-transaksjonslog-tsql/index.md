---
title: 'Krympe transaksjonslog T-SQL'
date:  2026-10-29T09:39:48Z
draft: true
pageresources: []
tags: 
    - SQL
author: Ole Halvor Smylingsås
description: null
image: microsoft-sql-server4529.jpg
---

TIL: Database shrinkfile
<!--more-->
Følgende kommando krymper logfilen til den databasen du er er i akkurat nå (Om du har rettigheter til kjøre kommandoen). 

```sql
DBCC SHRINKFILE ('logname_log').
```


### Hvorfor må man kjøre en slik kommando?
Dersom det gjøres tester på store dataset. Det spiller ingen rolle om det er INSERT, UPDATE eller DELETE, transaksjonsloggen vil alltid utvide seg, slik at det er mulig å rulle tilbake. Transaksjonsloggen vil dog til slutt bli full og da er det ikke lenger mulig å kjøre SQL - kommandoer andre enn SELECT.