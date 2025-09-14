---
title: 'IoT Hello, World'
date:  2025-09-13T15:58:59Z
draft: true
pageresources: []
tags: null
author: Ole Halvor Smylingsås
description: 'En liten tutorial som plutselig ble større. hello world med lyspære ble til dev container, kopire dockerfiler til remote host med ssh osv'
image: RPI_Twitter_COLOUR.webp
keywords: 'iot dotnet docker'
---

<!--more-->

# Hello, World fra et IOT perspektiv!

Hvordan sette opp en rasberry pi
vise biler av deler og fremdrift

ssh
enable under opprettelse av OS på minnekortet

i2c
enable i configfilen


dev container
dotnet new
dotnet build
dotnet run (pwd må da være prosjektet du skal kjøre. det holder ikke med solution)
dotnet publish --runtime linux-arm64 --self-contained
ssh pi@rasberrypi mkdir ~/<Navn på prosjekt>
scp -r <path to files>/* olehsm@rpi3b.local:~/LedBlink
chmod +x ./LedBlink (inne på target)

vise hvordan man opprettet en ferdig dev container med .net8


programm

deler 

Siden dev container er islert på min maskin kan ikke data overføres direkte til target, må derfor kopiere en self-contained versjon av programmet ut av containere og legge på disk til host maskinen. Dette gjøres fra WSL.
docker cp iot-projects:/workspaces/dotnet/LedBlink/bin/Release/net8.0/linux-arm64/publish blink

overfører alle filene over til en mappe på target
scp -r ./* olehsm@pi3b.local:~/BlinkLed


logger meg så inn på target og kjører programmet

