import type { Locale } from "./i18n";

const fr = {
  nav: { home: "Accueil", cases: "Références", method: "Méthode", about: "À propos", contact: "Contact", book: "Réserver 30 min" },
  switchTo: "en",

  home: {
    eyebrow: "Ingénieur IA indépendant — Casablanca · fuseau de Paris",
    h1a: "Une réponse ",
    h1em: "sans sa source",
    h1b: " ne vaut rien.",
    lead: "Dès que l’enjeu est contractuel, l’acheteur ne veut pas une bonne réponse : il veut pouvoir la vérifier en trois secondes. Je construis les systèmes où c’est possible — la provenance transportée depuis l’OCR jusqu’à l’écran.",
    ctaPrimary: "Réserver 30 minutes",
    ctaSecondary: "Les 4 références",
    priceLine: "Projets à partir de 8 000 € · TJM 500 € · disponible immédiatement",

    scoreLabel: "Mesuré en production — BidTender, depuis sept. 2025",
    score: [
      { v: "45 000", l: "fichiers en production · 56 Go", hi: false },
      { v: "274 376", l: "citations de provenance", hi: true },
      { v: "90 %+", l: "exactitude · jeu annoté à la main", hi: false },
      { v: "1 ms", l: "recherche sur 113 000 vecteurs", hi: false },
    ],

    demo: {
      label: "Démonstration — CPS n° 42/2025 · 312 pages · FR/AR scanné",
      queryLabel: "Requête",
      query: "Quelle caution provisoire, et avant quelle date ?",
      answerLabel: "Réponse",
      sourceOf: "Source",
      answer: [
        { t: "La caution provisoire est fixée à " },
        { t: "150 000,00 DH", ref: 1 },
        { t: ", à déposer au plus tard le " },
        { t: "14 novembre 2025 à 10 h", ref: 2 },
        { t: ". L’agrément exigé est le " },
        { t: "secteur E — classe 3", ref: 3 },
        { t: "." },
      ] as { t: string; ref?: number }[],
      tally: "3 valeurs · 3 sources · 0 non sourcée",
      sourcesLabel: "Sources — cliquez une citation",
      sources: [
        { n: 1, doc: "CPS · Art. 9 · page 42", meta: "PDF natif · conf. 1.00",
          quote: "Le montant du cautionnement provisoire est fixé à cent cinquante mille dirhams (150 000,00 DH)." },
        { n: 2, doc: "Avis d’appel d’offres · page 1", meta: "Scan · OCR · conf. 0.97",
          quote: "Les plis devront être déposés au bureau des marchés avant le 14/11/2025 à 10 h 00." },
        { n: 3, doc: "Règlement de consultation · Art. 4", meta: "Scan AR/FR · conf. 0.91",
          quote: "Justifier de la qualification et classification : secteur E, classe 3, qualification E2." },
      ],
      note: "Démonstration reconstituée à partir d’un dossier type, valeurs anonymisées — ce n’est pas un document client. En production : 274 376 citations sur 58 champs, dont 99,95 % avec le passage verbatim.",
    },

    problemTitle: "Pourquoi les systèmes RAG cassent en production",
    problemLead: "Trois raisons, et aucune n’est le modèle.",
    problems: [
      { title: "Les documents réels sont sales",
        body: "Scans, photocopies de scans, tableaux qui n’existent qu’en image, structure qui change d’un émetteur à l’autre. Le pipeline qui marche sur vos dix PDF de test ne survit pas au onzième." },
      { title: "Le vectoriel seul ne discrimine pas",
        body: "Dans un corpus juridique, les formulations se répètent. Deux passages qui disent l’inverse ont des embeddings presque identiques — et ce que l’utilisateur cherche, un numéro d’article, une date, un montant, est précisément ce que les embeddings gèrent le plus mal." },
      { title: "Sans citation, le système est inutilisable",
        body: "Dès que l’enjeu est contractuel, une réponse invérifiable ne vaut rien. Et la traçabilité ne s’ajoute pas à la fin : elle se perd au découpage. Il faut la transporter depuis l’OCR jusqu’à l’écran." },
    ],

    pipelineTitle: "Le pipeline",
    pipelineLead: "— ce qui transporte la provenance de l’OCR jusqu’à l’écran",
    pipeline: [
      { t: "Ingestion", d: "PDF, Word, Excel, AutoCAD. 40 800 documents distincts." },
      { t: "Routage OCR", d: "Page par page, bilingue. 14 % des pages seulement." },
      { t: "Découpage", d: "Par clause, pas par fenêtre. 151 661 chunks." },
      { t: "Recherche", d: "pgvector + BM25, HNSW. 113 244 vecteurs · 1 ms." },
      { t: "Citation", d: "L’extrait verbatim, conservé. 99,95 % des 274 376.", hi: true },
      { t: "Interface", d: "Vérifiable en 3 secondes. 4 h → 40 min." },
    ],

    offerTitle: "Comment on travaille ensemble",
    offers: [
      { title: "Audit et cadrage",
        body: "Quelques jours pour établir pourquoi votre recherche échoue, ce qui est réparable et ce que ça coûte. Vous repartez avec un plan chiffré — que vous me confiiez la suite ou non." },
      { title: "Construction en production",
        body: "Le système complet : ingestion, recherche, citations, interface. Livré avec un jeu d’évaluation qui vous appartient, pour juger la qualité sans moi." },
      { title: "Accompagnement",
        body: "Un à deux jours par mois pour faire évoluer un système existant, arbitrer les choix techniques et transmettre à votre équipe." },
    ],

    refsTitle: "Quatre références",
    refsAll: "Tout voir",
    ctaTitle: "Un corpus qui résiste ?",
    ctaBody: "Décrivez vos documents en trois lignes — volume, format, ce que vous cherchez dedans. Je vous dis en trente minutes si c’est faisable, comment, et à quel prix. Réponse sous 24 h en semaine.",
  },

  method: {
    title: "La méthode",
    lead: "Quatre principes, tous appris en cassant quelque chose.",
    items: [
      { title: "Le jeu d’évaluation avant le pipeline",
        body: "30 dossiers stratifiés, 8 champs critiques, 240 cellules annotées à la main, échantillon tiré de façon déterministe pour être rejouable. Sans ça, « est-ce que c’est meilleur ? » se juge à l’œil sur quelques requêtes familières. Je l’ai fait après. Je le referais en premier." },
      { title: "Combien de votre information vit dans des tableaux ?",
        body: "C’est ma première question sur un corpus inconnu, et la réponse change le plan de charge du simple au double. Le texte au fil de l’eau se règle vite ; les 228 771 lignes de bordereau de prix ont demandé une chaîne de traitement entièrement séparée, parce que dans une grille la structure est l’information." },
      { title: "Le silence est un objectif produit",
        body: "Un système qui répond toujours est un système qui invente parfois — le seul mode de défaillance vraiment grave sur une pièce contractuelle. Faire de « cette information n’est pas dans le dossier » une réponse correcte et assumée est autant un travail d’interface que de modèle." },
      { title: "Cadrage au périmètre, pas aux jours",
        body: "« Livré le 30 » est une promesse que je peux tenir. « Deux jours par semaine » est une promesse que les imprévus font casser. Le cadrage se fait au livrable et à la date : c’est ce qui vous donne une date ferme plutôt qu’une disponibilité théorique." },
    ],
    sectorsTitle: "Secteurs",
    sectors: [
      { t: "Legal-tech", d: "Contrats, extraction de clauses, dossiers" },
      { t: "Assurance", d: "Sinistres, comparaison de garanties" },
      { t: "Santé et administration", d: "Dossiers, codage, conformité" },
      { t: "Documentation technique", d: "Manuels, normes, spécifications" },
      { t: "Finance", d: "Rapports, dépôts réglementaires, due diligence" },
    ],
    sectorsNote: "Le problème est le même partout : beaucoup de texte, peu de structure, et un enjeu qui interdit l’à-peu-près.",
  },

  cases: {
    title: "Références",
    lead: "Ce qui a été construit, dans quelles contraintes, et ce que je referais autrement.",
    client: "Client", built: "Ce qui a été construit", proof: "La preuve",
    role: "Rôle", period: "Période", stack: "Stack", results: "Résultats", visit: "Voir le produit",
    back: "Toutes les références", next: "Référence suivante",
  },

  about: {
    title: "À propos",
    lead: "Ingénieur IA, formé à Centrale, basé à Casablanca. Je construis des systèmes de recherche documentaire qui vont jusqu’en production — et l’interface avec laquelle les gens travaillent réellement.",
    body: [
      "J’ai passé les deux dernières années sur deux systèmes qui devaient tourner pour de vrai : un SaaS multi-tenant de réponse aux marchés publics, dont je suis co-fondateur, et une plateforme de jumeau numérique pour une unité industrielle. Dans les deux cas, la partie intéressante n’a jamais été le modèle. C’est ce qui se passe quand la donnée d’entrée est laide, quand un flux tombe, quand un document fait quatre cents pages et que la réponse doit rester vérifiable.",
      "Je travaille seul, de bout en bout : ingestion, recherche, modèle, API, interface, mise en production. C’est utile aux équipes trop petites pour recruter trois spécialistes, et à celles qui ont déjà un prototype qui ne passe pas à l’échelle.",
      "Je travaille en missions cadrées, à distance, en français ou en anglais, et je prends de nouveaux projets en continu. Le cadrage se fait au périmètre et à la date de livraison, pas au nombre de jours par semaine — c’est ce qui vous donne une date ferme plutôt qu’une disponibilité théorique.",
    ],
    factsTitle: "En bref",
    facts: [
      ["Formation", "École Centrale Casablanca — Data Science & Digitalisation · échange à CentraleSupélec"],
      ["Langues", "Français (DALF C1) · Anglais (TOEIC 885) · Arabe (langue maternelle)"],
      ["Basé à", "Casablanca — même fuseau horaire que Paris"],
      ["Disponibilité", "Immédiate — missions à distance"],
      ["Facturation", "Statut auto-entrepreneur marocain, facturation en euros"],
    ],
    notTitle: "Ce que je ne fais pas",
    notBody: "Pas de marchés publics ni d’achats — c’est le domaine de ma propre société. Pas de jumeau numérique ni d’IA industrielle — c’est celui de mon employeur. Et pas de projet où personne ne peut me dire comment on saura que ça a marché.",
  },

  contact: {
    title: "Parlons-en",
    lead: "Trente minutes suffisent pour savoir si le problème est faisable et à quel prix. Pas de présentation commerciale — vous décrivez vos documents, je vous dis ce que j’en pense.",
    bookCta: "Réserver un créneau",
    orEmail: "Ou écrivez-moi",
    helpTitle: "Pour que le premier appel serve à quelque chose",
    help: [
      "Quel type de documents, et combien — natifs ou scannés ?",
      "Ce que vous cherchez dedans, et qui s’en sert aujourd’hui.",
      "Ce que vous avez déjà essayé, et où ça s’est arrêté.",
      "Votre échéance, et votre ordre de grandeur budgétaire.",
    ],
    replyTitle: "Réponse",
    replyBody: "Sous 24 h en semaine. Si votre besoin ne rentre pas dans ce que je fais, je vous le dis tout de suite et j’essaie de vous orienter.",
  },

  footer: { tagline: "Systèmes RAG et intelligence documentaire, de l’ingestion à l’interface.", rights: "Tous droits réservés." },
};

type Dict = typeof fr;

const en: Dict = {
  nav: { home: "Home", cases: "Work", method: "Method", about: "About", contact: "Contact", book: "Book 30 min" },
  switchTo: "fr",

  home: {
    eyebrow: "Independent AI engineer — Casablanca · on Paris time",
    h1a: "An answer ",
    h1em: "without its source",
    h1b: " is worth nothing.",
    lead: "The moment the stakes are contractual, a buyer doesn’t want a good answer: they want to verify it in three seconds. I build the systems where that’s possible — provenance carried from OCR all the way to the screen.",
    ctaPrimary: "Book 30 minutes",
    ctaSecondary: "The 4 references",
    priceLine: "Projects from €8,000 · Day rate €500 · available now",

    scoreLabel: "Measured in production — BidTender, since Sept. 2025",
    score: [
      { v: "45,000", l: "files in production · 56 GB", hi: false },
      { v: "274,376", l: "provenance citations", hi: true },
      { v: "90%+", l: "accuracy · hand-annotated set", hi: false },
      { v: "1 ms", l: "search over 113,000 vectors", hi: false },
    ],

    demo: {
      label: "Demo — tender file no. 42/2025 · 312 pages · FR/AR scanned",
      queryLabel: "Query",
      query: "What is the bid bond, and by what date?",
      answerLabel: "Answer",
      sourceOf: "Source",
      answer: [
        { t: "The bid bond is set at " },
        { t: "150,000.00 MAD", ref: 1 },
        { t: ", to be lodged no later than " },
        { t: "14 November 2025, 10:00", ref: 2 },
        { t: ". The required certification is " },
        { t: "sector E — class 3", ref: 3 },
        { t: "." },
      ] as { t: string; ref?: number }[],
      tally: "3 values · 3 sources · 0 unsourced",
      sourcesLabel: "Sources — click a citation",
      sources: [
        { n: 1, doc: "Specification · Art. 9 · page 42", meta: "Native PDF · conf. 1.00",
          quote: "The amount of the provisional bond is set at one hundred and fifty thousand dirhams (150,000.00 MAD)." },
        { n: 2, doc: "Tender notice · page 1", meta: "Scan · OCR · conf. 0.97",
          quote: "Bids must be lodged at the procurement office before 14/11/2025 at 10:00." },
        { n: 3, doc: "Consultation rules · Art. 4", meta: "Scan AR/FR · conf. 0.91",
          quote: "Evidence of qualification and classification required: sector E, class 3, qualification E2." },
      ],
      note: "A reconstructed demo built from a typical file, values anonymised — this is not a client document. In production: 274,376 citations across 58 fields, 99.95% of them carrying the verbatim passage.",
    },

    problemTitle: "Why RAG systems break in production",
    problemLead: "Three reasons, and none of them is the model.",
    problems: [
      { title: "Real documents are dirty",
        body: "Scans, photocopies of scans, tables that exist only as images, structure that changes with every issuer. The pipeline that works on your ten test PDFs does not survive the eleventh." },
      { title: "Dense retrieval alone doesn’t discriminate",
        body: "In a legal corpus, phrasing repeats. Two passages saying opposite things have near-identical embeddings — and what users actually search for, an article number, a date, an amount, is exactly what embeddings handle worst." },
      { title: "Without citations, the system is unusable",
        body: "The moment the stakes are contractual, an unverifiable answer is worth nothing. And traceability isn’t bolted on at the end: it gets lost at chunking. It has to be carried from OCR to the screen." },
    ],

    pipelineTitle: "The pipeline",
    pipelineLead: "— what carries provenance from OCR to the screen",
    pipeline: [
      { t: "Ingestion", d: "PDF, Word, Excel, AutoCAD. 40,800 distinct documents." },
      { t: "OCR routing", d: "Page by page, bilingual. Only 14% of pages." },
      { t: "Chunking", d: "By clause, not by window. 151,661 chunks." },
      { t: "Retrieval", d: "pgvector + BM25, HNSW. 113,244 vectors · 1 ms." },
      { t: "Citation", d: "The verbatim excerpt, kept. 99.95% of 274,376.", hi: true },
      { t: "Interface", d: "Verifiable in 3 seconds. 4 h → 40 min." },
    ],

    offerTitle: "Ways to work together",
    offers: [
      { title: "Audit and scoping",
        body: "A few days to establish why your retrieval is failing, what’s fixable, and what it costs. You leave with a costed plan — whether or not you hand me the build." },
      { title: "Production build",
        body: "The full system: ingestion, retrieval, citations, interface. Shipped with an evaluation set that belongs to you, so you can judge quality without me." },
      { title: "Ongoing support",
        body: "One to two days a month to evolve an existing system, arbitrate technical choices and hand knowledge over to your team." },
    ],

    refsTitle: "Four references",
    refsAll: "See all",
    ctaTitle: "Got a corpus that fights back?",
    ctaBody: "Describe your documents in three lines — volume, format, what you need out of them. In thirty minutes I’ll tell you whether it’s feasible, how, and what it costs. Reply within 24 hours on weekdays.",
  },

  method: {
    title: "The method",
    lead: "Four principles, every one of them learned by breaking something.",
    items: [
      { title: "The evaluation set before the pipeline",
        body: "30 stratified files, 8 critical fields, 240 cells annotated by hand, sample drawn deterministically so it can be replayed. Without it, “is this better?” is judged by eye on a handful of familiar queries. I did it afterwards. I’d do it first." },
      { title: "How much of your information lives in tables?",
        body: "It’s my first question on an unfamiliar corpus, and the answer doubles or halves the estimate. Flowing text settles quickly; 228,771 price-schedule rows needed an entirely separate processing chain, because in a grid the structure is the information." },
      { title: "Silence is a product goal",
        body: "A system that always answers is a system that sometimes invents — the only truly serious failure mode on a contractual document. Making “that information is not in this file” a correct, deliberate answer is as much interface work as model work." },
      { title: "Scope by deliverable, not by days",
        body: "“Delivered on the 30th” is a promise I can keep. “Two days a week” is a promise the unexpected breaks. Scoping happens by deliverable and date: that is what gets you a firm date instead of a theoretical availability." },
    ],
    sectorsTitle: "Sectors",
    sectors: [
      { t: "Legal tech", d: "Contracts, clause extraction, case files" },
      { t: "Insurance", d: "Claims, policy and coverage comparison" },
      { t: "Healthcare and admin", d: "Records, coding, compliance" },
      { t: "Technical documentation", d: "Manuals, standards, specifications" },
      { t: "Finance", d: "Reports, regulatory filings, due diligence" },
    ],
    sectorsNote: "The problem is the same everywhere: a lot of text, very little structure, and stakes that rule out approximation.",
  },

  cases: {
    title: "Work",
    lead: "What was built, under which constraints, and what I’d do differently.",
    client: "Client", built: "What was built", proof: "The proof",
    role: "Role", period: "Period", stack: "Stack", results: "Results", visit: "Visit the product",
    back: "All work", next: "Next case",
  },

  about: {
    title: "About",
    lead: "AI engineer, Centrale-trained, based in Casablanca. I build document retrieval systems that make it to production — and the interface people actually work in.",
    body: [
      "I’ve spent the last two years on two systems that had to run for real: a multi-tenant SaaS for public-procurement responses, which I co-founded, and a digital-twin platform for an industrial plant. In both cases the interesting part was never the model. It’s what happens when the input data is ugly, when a stream drops, when a document runs four hundred pages and the answer still has to be verifiable.",
      "I work end to end, alone: ingestion, retrieval, model, API, interface, production. That’s useful for teams too small to hire three specialists, and for teams who already have a prototype that won’t scale.",
      "I work in scoped engagements, remote, in French or English, and I take on new projects continuously. Scoping is done by deliverable and delivery date rather than days per week — which is what gets you a firm date instead of a theoretical availability.",
    ],
    factsTitle: "At a glance",
    facts: [
      ["Education", "École Centrale Casablanca — Data Science & Digitalisation · exchange at CentraleSupélec"],
      ["Languages", "French (DALF C1) · English (TOEIC 885) · Arabic (native)"],
      ["Based in", "Casablanca — same time zone as Paris"],
      ["Availability", "Immediate — remote engagements"],
      ["Invoicing", "Moroccan sole-trader status, invoices in euros"],
    ],
    notTitle: "What I don’t do",
    notBody: "No public procurement or tendering — that’s my own company’s field. No digital twins or industrial AI — that’s my employer’s. And no project where nobody can tell me how we’ll know it worked.",
  },

  contact: {
    title: "Let’s talk",
    lead: "Thirty minutes is enough to establish whether the problem is feasible and what it costs. No sales deck — you describe your documents, I tell you what I think.",
    bookCta: "Book a slot",
    orEmail: "Or email me",
    helpTitle: "To make the first call worth it",
    help: [
      "What kind of documents, and how many — native or scanned?",
      "What you need out of them, and who uses that today.",
      "What you’ve already tried, and where it stopped.",
      "Your deadline, and a rough budget range.",
    ],
    replyTitle: "Response",
    replyBody: "Within 24 hours on weekdays. If your need doesn’t fit what I do, I’ll say so immediately and try to point you somewhere better.",
  },

  footer: { tagline: "RAG systems and document intelligence, from ingestion to interface.", rights: "All rights reserved." },
};

export const content: Record<Locale, Dict> = { fr, en };
export type { Dict };
