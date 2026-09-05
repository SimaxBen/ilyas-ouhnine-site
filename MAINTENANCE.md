# ilyasouhnine.com

Site vitrine freelance. Next.js 15 (App Router), TypeScript, CSS pur, bilingue FR/EN,
sans dépendance UI. Build vérifié : 19 pages statiques.

---

## Démarrer

```bash
npm install
npm run dev      # http://localhost:3000 → redirige vers /fr
```

Autres commandes :

```bash
npm run check    # échoue s'il reste des ⟦PLACEHOLDERS⟧ non remplis
npm run build    # lance `check` d'abord (prebuild), puis le build
```

---

## Ce qu'il faut remplir avant la mise en ligne

### 1. `lib/config.ts` — cinq valeurs

| Champ | À faire |
|---|---|
| `url` | ton domaine, une fois acheté |
| `cal` | le lien Cal.com, une fois l'événement créé |
| `github` | l'URL de ton profil |
| `email`, `linkedin` | déjà remplis, vérifie |

`rateFrom` (8 000 €) et `dayRate` (500 €) sont là aussi. Ils apparaissent sur
l'accueil, la page offres et la page contact — un seul endroit à changer.

### 2. Les chiffres BidTender

`npm run check` refuse de builder tant que les jetons `⟦…⟧` de `lib/cases.ts`
ne sont pas remplacés. C'est volontaire : un chiffre inventé sur ce site coûte
plus cher qu'une case study sans chiffre.

Extraction : `Semaine-1-Contenu/00-Metriques-a-extraire.md`.

Si tu dois absolument déployer avant d'avoir les chiffres, supprime les lignes
concernées du tableau `results` — ne les remplace pas par des approximations.
(Retirer `"prebuild"` de `package.json` désactive le garde-fou, mais c'est
exactement ce qu'il ne faut pas faire.)

### 3. Publier ou non chaque référence

Dans `lib/cases.ts`, chaque entrée a un `published`. À `false`, elle disparaît
partout : accueil, page références, sitemap, URL directe.

| Référence | État | Condition |
|---|---|---|
| `bidtender` | `true` | accord écrit des co-fondateurs |
| `leyton` | `true` | ne pas nommer la marque cliente |
| `chemin-du-roi` | **`false`** | accord écrit de Jérémie |
| `produits-mobiles` | `true` | — |

Voir `Semaine-1-Contenu/02-Autorisations.md`.

---

## Où vit quoi

```
lib/config.ts     coordonnées, tarifs, liens
lib/content.ts    TOUTE la copie d'interface, FR et EN
lib/cases.ts      les études de cas, FR et EN
app/globals.css   design (couleurs, typo, espacements) — tout en haut, dans :root
```

`lib/content.ts` est typé : le bloc `en` doit avoir exactement les mêmes clés
que `fr`. Si tu ajoutes une phrase en français et que TypeScript râle, c'est
qu'il manque sa traduction. C'est le garde-fou principal contre un site à moitié
traduit.

### Ajouter une référence

Une entrée dans le tableau `cases` de `lib/cases.ts`, avec `fr` et `en`.
La page, l'entrée d'accueil, le sitemap et la navigation « suivante » se génèrent seuls.

### Changer le design

Tout est dans `:root` en haut de `app/globals.css`. L'accent est `--accent`
(terracotta). Le mode sombre reprend les mêmes noms de variables juste en dessous —
si tu changes une couleur, change les deux.

Les polices sont des piles système : aucune requête réseau, aucun décalage au
chargement. Pour passer à Google Fonts, la marche à suivre est en commentaire en
haut de `app/[locale]/layout.tsx`.

---

## Déployer

### Domaine

`ilyasouhnine.com` en priorité. `.dev` en repli. Évite les tirets et les
`-freelance` : tu gardes ce domaine dix ans.

### Vercel

```bash
git init && git add -A && git commit -m "site v1"
gh repo create ilyas-ouhnine-site --private --source=. --push
```

Puis sur vercel.com : **New Project** → importe le dépôt → **Deploy**.
Aucune variable d'environnement, aucune configuration : Next.js est détecté seul.

Ensuite **Settings → Domains** → ajoute ton domaine et suis les instructions DNS
chez ton registrar. Le HTTPS est automatique.

Après le premier déploiement, mets `url` à jour dans `lib/config.ts` et
redéploie — sitemap, robots et balises canoniques en dépendent.

### Cal.com

1. Compte sur cal.com
2. Crée un événement de 30 min, nommé « Premier échange » / « Intro call »
3. Disponibilités : **restreins fortement**. Deux ou trois créneaux par semaine,
   pas ton agenda entier. Un calendrier vide dit « personne ne m'appelle ».
4. Ajoute une question obligatoire à la réservation :
   *« En deux lignes : quels documents, quel volume, et qu'est-ce que vous
   cherchez dedans ? »* — elle filtre les appels sans objet et prépare le tien.
5. Colle le lien dans `lib/config.ts`

---

## Reste à faire (rapide, après la v1)

- [ ] **Image OG** — `app/opengraph-image.png`, 1200×630. Next la sert
      automatiquement dès qu'elle existe. Sans elle, tes liens partagés sur
      LinkedIn sont un rectangle gris.
- [ ] **Favicon** — `app/icon.png` (512×512), même mécanisme.
- [ ] **Analytics** — Vercel Analytics, un clic dans le dashboard. Utile
      seulement pour savoir si le trafic de tes emails arrive vraiment.
- [ ] **Version PDF du one-pager** dans `public/`, liée depuis la page contact.

---

## Vérifier avant d'annoncer

- [ ] `npm run build` passe
- [ ] `/fr` et `/en` : le sélecteur de langue garde la page courante
- [ ] Le lien Cal.com ouvre le bon événement
- [ ] Testé sur téléphone (la moitié des gens ouvriront ton lien depuis LinkedIn)
- [ ] Mode sombre lisible (bascule le thème système)
- [ ] Aucun `⟦` nulle part : `grep -r "⟦" lib app`
- [ ] Aucun `TODO` restant dans `lib/config.ts`
- [ ] `chemin-du-roi` toujours à `false` si l'accord n'est pas arrivé
