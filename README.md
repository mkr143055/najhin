# Najhin.ma — Version 3 (gestion par un seul fichier JSON)

Site statique en HTML/CSS/JavaScript, prêt pour GitHub Pages. Pas de framework, pas de npm, pas de base de données et pas de frais d'hébergement GitHub Pages.

## Le principe essentiel

**Pour ajouter ou modifier le contenu pédagogique, modifiez uniquement `data/site.json`.** Les pages sont génériques et se remplissent automatiquement à partir de ce fichier. Ne modifiez pas les fichiers HTML ou `assets/js/app.js` pour ajouter un cours, exercice, devoir ou examen.

Le JSON s'ouvre avec VS Code, Notepad++ ou même le Bloc-notes. Respectez les guillemets, virgules et accolades. Une virgule manquante rendrait le fichier illisible.

## Pages incluses
- `index.html` : accueil et niveaux
- `niveau.html?id=tronc` : page d'un niveau (mêmes modèles pour `1bac` et `2bac`)
- `cours.html?id=functions` : page d'un cours
- `exercice.html?id=functions-exercice-1` : page d'un exercice
- `devoirs.html` et `devoir.html?id=devoir-tc-demo`
- `examens.html` et `examen.html?id=national-2024-normale`

## Où mettre vos fichiers ?
Vous pouvez garder les fichiers dans `assets/pdfs/`, `assets/videos/` et `assets/images/`, ou les héberger ailleurs (Google Drive, YouTube, etc.). Dans ce cas, mettez le lien public direct dans le champ correspondant de `data/site.json`.

- PDF : utilisez un lien direct vers le PDF pour que l'aperçu intégré fonctionne.
- Vidéo YouTube : utilisez une URL d'intégration `https://www.youtube.com/embed/ID_VIDEO` (si vous souhaitez un lecteur intégré, il faut utiliser un champ videoEmbed; la version actuelle attend une URL vidéo lisible par la balise video, par exemple MP4). Pour YouTube ou Google Drive, utilisez plutôt le champ `videoEmbed` avec une URL d’intégration (YouTube : `https://www.youtube.com/embed/VIDEO_ID`; Drive : URL d’aperçu/embedding autorisée). Le champ `video` est destiné à une vidéo directe MP4/WebM lisible par le navigateur.
- Les fichiers Google Drive doivent être accessibles aux visiteurs disposant du lien.

## Structure de `data/site.json`

```json
{
  "site": { "name": "Najhin.ma", "language": "fr" },
  "levels": [
    { "id": "tronc", "slug": "tronc-commun", "name": "Tronc Commun", "short": "TC", "description": "...", "tracks": ["Sciences"] }
  ],
  "lessons": [
    {
      "slug": "nouveau-cours",
      "title": "Titre du cours",
      "description": "Présentation courte",
      "level": "tronc",
      "levelName": "Tronc Commun",
      "tracks": ["Sciences"],
      "topics": ["Partie 1", "Partie 2"],
      "resources": { "coursePdf": "assets/pdfs/cours/mon-cours.pdf", "video": "assets/videos/mon-cours.mp4", "videoEmbed": "https://www.youtube.com/embed/VIDEO_ID" },
      "exercises": [
        {
          "slug": "nouveau-cours-exercice-1",
          "title": "Exercice 1",
          "statement": "Énoncé de l'exercice",
          "answer": "Correction courte ou résumé",
          "difficulty": "Moyen",
          "resources": {
            "statementPdf": "assets/pdfs/exercices/enonce.pdf",
            "correctionPdf": "assets/pdfs/exercices/corrige.pdf",
            "statementImage": "assets/images/enonce.png",
            "correctionImage": "assets/images/corrige.png"
          }
        }
      ]
    }
  ],
  "devoirs": [
    { "slug": "ds-1bac-1", "title": "Devoir surveillé 1", "level": "1bac", "track": "Sciences", "date": "Semestre 1", "resources": { "statementPdf": "...", "correctionPdf": "..." } }
  ],
  "exams": [
    { "slug": "national-2025-normale", "year": "2025", "session": "Session normale", "title": "Examen National 2025", "level": "2ème Bac", "track": "Sciences Physiques", "resources": { "fullPdf": "..." }, "exercises": [ { "title": "Exercice 1", "topic": "Analyse", "resources": { "statementPdf": "...", "correctionPdf": "..." } } ] }
  ]
}
```

## قواعد مهمة لإضافة المحتوى
1. `slug` يجب أن يكون فريداً، بدون مسافات أو أحرف خاصة؛ استعمل `-`.
2. `level` يجب أن يساوي `tronc` أو `1bac` أو `2bac`، ويجب أن يكون المستوى معرفاً في `levels`.
3. أضف التمرين داخل `exercises` الخاص بالدرس الذي ينتمي إليه. لا تحتاج إلى إنشاء صفحة HTML.
4. أضف الفرض في مصفوفة `devoirs`، والامتحان في `exams`.
5. اكتب المسارات النسبية من جذر الموقع، مثل `assets/pdfs/cours/nom.pdf`، أو روابط HTTPS كاملة.
6. ارفع الملفات الجديدة إلى GitHub في نفس المسارات المكتوبة في JSON.
7. لا تضع فاصلة بعد آخر عنصر في أي مصفوفة أو كائن JSON.

## التصميم والخصائص
- تخطيط مضغوط ومساحات مدروسة لعرض محتوى أكثر في الشاشة.
- بطاقات صغيرة وخط واضح، دون واجهات ضخمة.
- متجاوب مع الهاتف والحاسوب.
- بحث داخل فصول المستوى، وتصفية حسب الشعبة.
- صفحات منفصلة للدروس والتمارين والفروض والامتحانات عبر قوالب ديناميكية.
- PDF مدمج، فيديو، صور، تصحيح قابل للإظهار، ومتابعة التمارين محلياً.
- وضع داكن وفاتح.

## التشغيل محلياً
لأن المتصفح قد يمنع `fetch()` من قراءة JSON عند فتح `index.html` مباشرة بصيغة `file://`، شغّل مجلداً محلياً بواسطة VS Code Live Server أو Python: `python -m http.server 8000` ثم افتح `http://localhost:8000`.

## النشر على GitHub Pages
1. فك ضغط ZIP.
2. ارفع محتويات مجلد `najhin-ma-v3` إلى جذر مستودع GitHub.
3. Settings → Pages → Deploy from a branch → `main` → `/(root)`.
4. اترك ملف `CNAME` الموجود إذا كنت ستستعمل `najhin.ma`.
5. احتفظ بإعدادات DNS الحالية الصحيحة للنطاق.

## ملاحظة عن النسخة التجريبية
البيانات والدروس والتمارين والفروض والامتحانات الموجودة مأخوذة من نموذج الموقع السابق لأغراض التجربة، وبعض الموارد تجريبية. استبدلها بمحتواك الحقيقي قبل تعميم الموقع على التلاميذ.
