# D3Map | 30.E6N.45-D3Map

Module de rendu des cartes électorales avec résultats en direct.

La carte peut être exportée dans un widget pour un document de nouvelles ou contenue dans son écosystème électoral.
- Requiert des configurations (mapData) initiales provenant de Scoop (en contexte de Widget) ou SphereConfig (page E6N).
- Prend un fichier topojson préparé en fonction de l'élection à laquelle il est rattaché.
- Nécessite des résultats provenants du loop GES-E6NAgent-E6NApi pour des circonscriptions et des candidats.

### Composantes utilisées
```js
import D3MapRenderer from 'components/e6n/modules/D3MapRenderer';
import D3MapRendererModule from 'components/modules/D3MapRenderer';
import D3MapZoomButton from 'components/e6n/modules/D3MapZoomButton';
import E6NToolTip from 'containers/modules/e6n/E6NToolTip';
```

### Usage
``` js
<D3Map
  allRidings={allRidings}
  allParties={allParties}
  allowClick={allowClick}
  allowZoom={allowZoom}
  currentPan={currentPan}
  currentRidingId={currentRidingId}
  d3SourceScript={d3SourceScript}
  forwardMapRef={forwardMapRef}
  isRidingOpen={isRidingOpen}
  isWidget={isWidget}
  mapData={mapData}
  setCurrentRiding={setCurrentRiding}
  setCurrentRidingTooltip={setCurrentRidingTooltip}
  setCurrentPan={setCurrentPan}
  setCurrentZoom={setCurrentZoom}
  zoomLevel={zoomLevel}
/>
```

#### Propriétés
* `allRidings` : Toutes les informations sur toutes les circonscriptions de l'élection actuelle.
* `allParties` : Toutes les informations sur tous les partis de l'élection actuelle.
* `allowClick` : Permet, suivant un click par l'usager sur une des circonscriptions, de montrer les résultats pour celle-ci.
* `allowZoom` : Permet à un usager de se déplacer et de zoomer la carte.
* `currentPan` : Objet avec propriétés "x", "y", "k" représentant les déplacements et niveau de zoom actuels (x: 0, y:0, k: 1, par défaut).
* `currentRidingId` : Le id de la circonscription (telle que transmise par le GES) présentement ouverte. 
* `d3SourceScript` : Objet contenant la librairie d3, bundled.
* `forwardMapRef` : Référence de l'instance provenant du parent.
* `isRidingOpen` : Renvoit si la fiche d'une circonscription est présentement ouverte.
* `isWidget` : Indique si la carte existe en tant que widget exporté (true) ou dans son contexte naturel de la page E6N (false).
* `mapData` : Objet contenant les configurations requises pour la carte (centrage, scaling initial selon les breakpoints, url du topojson, max zoom levels).
* `setCurrentRiding` : Fonction qui envoit au store le id correspondant à la circonscription reliée à un polygone quelconque sur la carte.
* `setCurrentRidingTooltip` : Fonction qui permet au store d'afficher le nom de la circonscription en tooltip sous le curseur.
* `setCurrentPan` : Garde en mémoire l'objet currentPan actuel: gère la présence du bouton pour reset le zoom.
* `zoomLevel` : Niveau de zoom actuel (sans coordonnées x et y de currentPan)

| propName                | propType | defaultValue | isRequired |
|-------------------------|----------|--------------|------------|
| allRidings              | object   | -            | -          |
| allParties              | object   | -            | -          |
| allowClick              | bool     | true         | -          |
| allowZoom               | bool     | true         | -          |
| currentPan              | object   | -            | -          |
| currentRidingId         | number   | -            | -          |
| d3SourceScript          | object   | -            | yes        |
| forwardMapRef           | func     | -            | -          |
| isRidingOpen            | bool     | false        | -          |
| isWidget                | bool     | false        | -          |
| mapData                 | object   | -            | -          |
| setCurrentRiding        | func     | -            | -          |
| setCurrentRidingTooltip | func     | -            | -          |
| setCurrentPan           | func     | -            | -          |
| zoomLevel               | number   | 1            | -          |


### Accessibilité
* Aucune

### Création et mises à jour (20190202)
* Alexandre Daigneault - Martin Marquis - Olivier St-Louis Desjardins
* Agnosticisation, storybooking et maintenance assumée par Alexandre Daigneault