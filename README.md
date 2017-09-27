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

### croix de fermeture des posts
n'apparaît pas

### Archives
- Akané dans un mail : "Navigation dans "Expositions", bug. On ne voit plus les archives excepté "l'atelier marmalade", et lorsque l'on veut par exemple retourner sur "à venir" ou "en cours" ça ne bouge pas."
= retour en haut de page (ancre sur le titre lors du clic ?) pour voir l'article sélectionné
= comment faire en sorte de faire disparaitre la div de l'article orsqu'on clique ailleurs sur la menu ?
= lorsque l'arborescence n'est plus sur /archives/.... -> l'article disparaît pour laisser la place à la grille d'archive ?

### Template custom
- faire fonctionner template avec image à droite (médiations, information > équipe)
Template custom pour l'intégration google maps dans infos / nous trouver
