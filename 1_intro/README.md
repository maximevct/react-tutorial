# react-tutorial
## Partie 1
Introduction à Node.js

### Installation
Il existe différentes manières d'installer Node.js. Il est disponible sur la plupart des systèmes d'exploitation
  - [Tutoriel d'installation](http://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/installer-node-js) : Guide d'installation pour Ubuntu, Windows et Mac OS X

### Avant de se lancer
- Il est nécessaire de créer un fichier `package.json` qui contiendra les informations de votre projet ainsi que ses dépendances
```json
{
  "name": "react-tutorial-part-1",
  "version": "0.1.0",
  "description": "Introduction to Node.js",
  "main": "app.js",
  "dependencies": {},
  "devDependencies": {},
  "repository": {
    "type": "git",
    "url": "https://github.com/twiggeek/react-tutorial.git"
  },
  "scripts": {
    "start": "node app.js"
  },
  "author": "Maxime Vincent"
}
```
- Pour installer un packet :
```bash
$ npm install [package]  # Installe le packet qui sera accessible avec un simple require('package');
$ npm -i [package]       # Meme chose que npm install
$ npm install --save     # Sauvegarde le package installé dans le package.json (dependencies)
$ npm install --save-dev # Sauvegarde le package installé dans le package.json (devDependencies)
```
- Pour lancer son script
```bash
$ node app.js
$ npm start
```

