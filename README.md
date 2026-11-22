# Najhin.ma — Site multipages prêt pour GitHub Pages

Le site est statique (HTML/CSS/JavaScript) et fonctionne gratuitement sur GitHub Pages. Aucun serveur, base de données, npm ou build n'est nécessaire.

## Pages
- `index.html` : accueil, navigation et recherche
- `tronc-commun.html`, `1ere-bac.html`, `2eme-bac.html` : pages de niveaux, recherche et filtre par filière
- `cours/<slug>.html` : page autonome pour chaque cours
- `exercices/<slug>.html` : page autonome pour chaque exercice
- `devoirs.html` : devoirs filtrables par niveau
- `examens.html` : examens filtrables par année et session
- `examen.html?exam=<slug>` : détail d'un examen avec liens vers sujets et corrigés

## Fonctionnalités
- Menu mobile et mise en page responsive
- Mode clair/sombre mémorisé sur l'appareil
- Recherche de chapitres depuis l'accueil
- Recherche et filtre par filière sur chaque niveau
- Onglets Cours / Vidéo / Exercices
- Lecteur PDF intégré et liens de téléchargement
- Lecteur vidéo MP4 local
- Images d'énoncés et de corrections
- Correction masquable/affichable
- Marquage d'un exercice terminé et progression locale
- Filtres des devoirs et examens

## Contenu de démonstration
Les fichiers PDF, images et vidéo inclus servent à tester l'interface. Les exercices/devoirs/examens sont fictifs et ne sont pas des ressources officielles. Remplacez-les avant utilisation pédagogique.

## Modifier le contenu
Les données sont dans `assets/js/data.js` sous `window.NAJHIN_DATA`. Les fichiers médias sont rangés dans `assets/pdfs`, `assets/images` et `assets/videos`. Les pages HTML des cours et exercices sont générées individuellement dans `cours/` et `exercices/`.

Pour ajouter un cours ou un exercice, dupliquez une page HTML existante, adaptez le slug, les données et les liens, puis ajoutez les nouveaux fichiers médias.

## Publication GitHub Pages
1. Décompressez le ZIP.
2. Téléversez le contenu du dossier `najhin-ma-complete` à la racine du dépôt GitHub.
3. Dans Settings → Pages, choisissez Deploy from a branch, branche `main`, dossier `/(root)`.
4. Attendez la publication.
5. Pour utiliser `najhin.ma`, conservez `CNAME` et configurez les DNS chez le registraire du domaine.

## Important
- Pas de base de données : la progression est sauvegardée dans localStorage sur le même navigateur/appareil.
- Le site ne collecte pas de données d'élèves et ne comprend pas de connexion.
- Les liens Drive doivent être accessibles en lecture à toute personne disposant du lien.
