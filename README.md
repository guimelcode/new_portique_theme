# Le Portique
## new_portique_theme
*theme wordpresse for Le Portique*

*Front & Back End : Mathieu Roquet & Guillaume Melennec.*
*Travail d'après une maquette de Mathias Schweizer.*
Version "fonctionnelle"

## Générer le bundle.js
Juste :
```
webpack
```
Ou encore :
```
webpack -w
```
Pour l'instant

## TODO
### Ajouter un champ d'ajout d'image via ACF dans (un template page_avec_image.php) : !ALMOST WORKING!, à voir comment réprer cela
  - Médiation/Jeunes Publics
  - Médiation/Scolaires
  - Information/Équipe

### Évènements / Expositions à venir
Ajout des posts de type "évènement" -> Ils ne se rangent pas dans les archives une fois la date passée (mais restent présents dans la base de donnée et accessible/republiables via l'interface)  

### Simplebar ?
Ajout du plugin Simplebar https://github.com/Grsmto/simplebar sur :
```
#app > div > .bxslider > .swiper-slide-active"
```
pour la rendre discrète ?

### galerie images dans Archives
ne fonctionne pas

### Fonctionnement de la partie Archives (résolution de la croix)
- on clique dans Expositions : en cours -> on arrive sur la grille
on choisit un post : il s'affiche puis les flèches de navigation dans le site nous font passer d'une archive à l'autre, choronologiquement
- pour ré-atterir sur la grille, il suffit d'y accéder par le menu : expositions, puis archives
- Mathias : "C'est le plus intuitif, notamment pour la navigation Mobile"
- QUESTION : est-ce qu'il est possible de mettre ça en place facilement ?

### Fonctionnement du menu mobile :
- le menu réduit affiche toujours (et seulment deux éléments)
par exemple : expostion > archives
- le menu déployé affiche l'ensemble de l'arborescence comme dans la version leportique.org

### Archives
- Akané dans un mail : "Navigation dans "Expositions", bug. On ne voit plus les archives excepté "l'atelier marmalade", et lorsque l'on veut par exemple retourner sur "à venir" ou "en cours" ça ne bouge pas."
= retour en haut de page (ancre sur le titre lors du clic ?) pour voir l'article sélectionné
= comment faire en sorte de faire disparaitre la div de l'article orsqu'on clique ailleurs sur la menu ?
= lorsque l'arborescence n'est plus sur /archives/.... -> l'article disparaît pour laisser la place à la grille d'archive ?

### Template custom
- faire fonctionner template avec image à droite (médiations, information > équipe)
Template custom pour l'intégration google maps dans infos / nous trouver

### Question à Mathias
- qu'advient-il de "À venir lorsque ce cham est vide ?" désactiver "à venir du menu ?"
faire au plus simple par rapport à l'architecture
-> réponse : "c'est au portique d'avoir constamment l'annonce des prochaines expositions"
- verisons définitives des fontes portypes pour génération webfont
-> réponse : non, il n'y a pas forcément de version plus élaborée


### CSS
- enlever le grisé dans le menu
- Tout reste bleu #00f, les éléments actifs sont soulignés et clignottent (au moins version lapotop, pas sur version mobile car non nécessaire ?
- Version non mobile : activer un Affix sur la div de galerie : le texte seulement défile, l'image rest fixe
- mise en page des expositions et évènements à venir : OK

### Mise en page et classes bootstrap
- Agrandir la taille de la colonne de texte
- Grille d'archives (version Laptop) : grille "fixe" avec hauteur fixe pour empêcher le chevauchement
- Grille d'archives : réduire taille typo, tester avec un corps inféreieur
- ajouter sur debug en bas de fenêtre le dégradé présent sur la version leportique.org, voir pour le rendre plus présent en hauteur


### Consignes et questions au portique
- Attention à la mise en page pour les retours à la ligne systématique <br> du côté du back office
- Question à Akané (posée au téléphone cet après-midi) : ne pas écrir en outes lettres le "newsletter dans le menu" Au pire, dessiner une enveloppe (Mathias) qui ira avec les icones de réseaux sociaux
