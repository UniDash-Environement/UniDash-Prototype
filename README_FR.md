<img src="wallpaper/UniDash_Banner.png" alt="UniDash Banner" width="100%">

# UniDash

-----

## Licence

Ce projet est sous licence GNU GPL v3.0

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://github.com/UniDash-Environement/UniDash/blob/main/LICENSE)

## Auteur

> ## [![Pikatsuto_Icon](https://avatars.githubusercontent.com/u/52610162?s=48&v=4)](https://github.com/Pikatsuto) [Gabriel Guillou](https://github.com/Pikatsuto)

[README_EN 🇺🇸](README.md)

-----

## Screenshots

<img src="wallpaper/UniDash_Screen.png" alt="UniDash Screenshot" width="100%">

## Description

UniDash est un Dashboard universel fonctionnant garce avec une intégration de module
utilisant des plugins Vue.JS pour intégrer tout type de fonctionnalité.

UniDash est prévu pour fonctionner de pair avec l'environnement serveur UniDash Environnement.
Cet environnement intègre un système de cluster auto-suffisant sur une base débian 11 proxmox.
Il y est aussi intégré UniDash Repo qui est un gestionnaire de service baser sur ansible.

Le projet UniDash est actuellement dans ses débuts de développement
et donc le projet n'est pas encore utilisable.

## Intégration

Les intégrations prévues pour ce panel sont:

- SSH
- SFTP
- FTP
- VNC
- RDP
- VM
- LXC
- Docker
- Réseaux
- Proxy
- DNS

## Comment tester l'avencement du projet

### Prérequis

- NodeJS 18 LTS
- NPM

### Installation et lancement

```bash
git clone https://github.com/UniDash-Environement/UniDash.git; cd UniDash
npm i
npm run dev
```
