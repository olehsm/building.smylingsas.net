---
title: 'Hvordan Opprette Ny Guid I Sql'
date:  2026-06-02T13:07:09Z
draft: true
pageresources: []
tags:
  - sql
author: Ole Halvor Smylingsås
description: null
image: null
---
TIL: Hvordan opprette GUID?
<!--more-->

## Nøkkelord i T-SQL
GUID eller unique identifier genereres med følgende funksjon T-SQL

```sql
NEWID()
```
> Merk: Dette vil føre til syntaxfeil i SQL - SERVER
## Hvordan generere GUID i T-SQL?
```sql
SELECT NEWID();
```
#### Som en variabel:
```sql
DECLARE @myid uniqueidentifier  
SET @myid: NEWID()  
PRINT '@myid: '+ CONVERT(varchar(255), @myid) 
```