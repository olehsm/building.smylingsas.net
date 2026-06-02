---
title: 'Hvordan Kopiere en Tabell SQL'
date:  2026-06-02T13:09:52Z
draft: true
pageresources: []
tags:
  - sql
author: Ole Halvor Smylingsås
description: null
image: null
---
TIL: Temporær kopi av tabell i SQL Server
<!--more-->

```sql
SELECT * INTO olebak
FROM Animals;
```

### Syntax
```sql
SELECT *
    INTO newtable
FROM oldtable
WHERE condition;
```
