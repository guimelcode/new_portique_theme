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
