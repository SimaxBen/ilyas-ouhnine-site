import type { Locale } from "./i18n";

const fr = {
  htmlLang: "fr",
  nav: { home: "Accueil", cases: "Références", about: "À propos", contact: "Contact" },
  switchTo: "English",

  home: {
    eyebrow: "Ingénieur IA indépendant — Casablanca, sur le fuseau de Paris",
    h1: "Je construis des systèmes RAG qui tiennent sur de vrais documents.",
    lead: "La plupart des démos marchent sur des PDF propres. En production, les documents sont scannés, font des centaines de pages, mélangent le français et l’arabe, et engagent juridiquement. J’ai déjà résolu ce problème une fois, à l’échelle : 45 000 documents, 274 000 citations de provenance, chaque valeur extraite rattachée au passage qui l’a produite.",
    ctaPrimary: "Réserver 30 minutes",
    ctaSecondary: "Voir les références",
    anchor: "Projets à partir de " ,
    anchorMid: " · TJM ",
    anchorEnd: " · disponible immédiatement",

    problemTitle: "Pourquoi les systèmes RAG cassent en production",
    problems: [
      {
        title: "Les documents réels sont sales",
        body: "Scans, photocopies de scans, tableaux qui n’existent qu’en image, structure qui change d’un émetteur à l’autre. Le pipeline qui marche sur vos dix PDF de test ne survit pas au onzième.",
      },
      {
        title: "Le vectoriel seul ne discrimine pas",
        body: "Dans un corpus juridique ou réglementaire, les formulations se répètent. Deux passages qui disent l’inverse ont des embeddings presque identiques — et ce que l’utilisateur cherche vraiment, un numéro d’article, une référence, une date, un montant, est précisément ce que les embeddings gèrent le plus mal.",
      },
      {
        title: "Sans citation, le système est inutilisable",
        body: "Dès que l’enjeu est contractuel, une réponse invérifiable ne vaut rien. Et la traçabilité ne s’ajoute pas à la fin : elle se perd au découpage. Il faut la transporter depuis l’OCR jusqu’à l’écran.",
      },
    ],

    offerTitle: "Comment on travaille ensemble",
    offers: [
      {
        title: "Audit et cadrage",
        body: "Quelques jours pour établir pourquoi votre recherche échoue, ce qui est réparable, et ce que ça coûte. Vous repartez avec un plan chiffré — que vous me confiiez la suite ou non.",
      },
      {
        title: "Construction en production",
        body: "Conception et mise en production du système complet : ingestion, recherche, citations, interface. Livré avec un jeu d’évaluation qui vous appartient, pour que vous puissiez juger la qualité sans moi.",
      },
      {
        title: "Accompagnement",
        body: "Un à deux jours par mois pour faire évoluer un système existant, arbitrer les choix techniques et transmettre à votre équipe.",
      },
    ],

    sectorsTitle: "Secteurs",
    sectorsLead: "Le problème est le même partout : beaucoup de texte, peu de structure, et un enjeu qui interdit l’à-peu-près.",
    sectors: [
      "Legal-tech — contrats, extraction de clauses, dossiers",
      "Assurance — sinistres, comparaison de garanties",
      "Santé et administration — dossiers, codage, conformité",
      "Documentation technique — manuels, normes, spécifications",
      "Finance — rapports, dépôts réglementaires, due diligence",
    ],

    casesTitle: "Références",
    casesLead: "Trois systèmes livrés en production, plus deux applications publiées en solo.",
    casesAll: "Toutes les références",

    ctaTitle: "Un corpus qui résiste ?",
    ctaBody: "Décrivez vos documents en trois lignes — volume, format, ce que vous cherchez dedans. Je vous dis en trente minutes si c’est faisable, comment, et à quel prix.",
  },

  cases: {
    title: "Références",
    lead: "Ce qui a été construit, dans quelles contraintes, et ce que je referais autrement.",
    role: "Rôle",
    period: "Période",
    stack: "Stack",
    results: "Résultats",
    back: "Toutes les références",
    next: "Référence suivante",
  },

  about: {
    title: "À propos",
    lead: "Ingénieur IA, formé à Centrale, basé à Casablanca. Je construis des systèmes de recherche documentaire qui vont jusqu’en production — et l’interface avec laquelle les gens travaillent réellement.",
    body: [
      "J’ai passé les deux dernières années sur deux systèmes qui devaient tourner pour de vrai : un SaaS multi-tenant de réponse aux marchés publics, dont je suis co-fondateur, et une plateforme de jumeau numérique pour une unité industrielle. Dans les deux cas, la partie intéressante n’a jamais été le modèle. C’est ce qui se passe quand la donnée d’entrée est laide, quand un flux tombe, quand un document fait quatre cents pages et que la réponse doit rester vérifiable.",
      "Je travaille seul, de bout en bout : ingestion, recherche, modèle, API, interface, mise en production. C’est utile pour les équipes trop petites pour recruter trois spécialistes, et pour celles qui ont déjà un prototype qui ne passe pas à l’échelle.",
      "Je travaille en missions cadrées, à distance, en français ou en anglais, et je prends de nouveaux projets en continu. Le cadrage se fait au périmètre et à la date de livraison, pas au nombre de jours par semaine — c’est ce qui vous donne une date ferme plutôt qu’une disponibilité théorique.",
    ],
    factsTitle: "En bref",
    facts: [
      ["Formation", "École Centrale Casablanca — Data Science & Digitalisation · échange à CentraleSupélec"],
      ["Langues", "Français (DALF C1) · Anglais (TOEIC 885) · Arabe (langue maternelle)"],
      ["Basé à", "Casablanca — même fuseau horaire que Paris, pas de décalage"],
      ["Disponibilité", "Immédiate — missions à distance, en français ou en anglais"],
      ["Facturation", "Statut auto-entrepreneur marocain, facturation en euros"],
    ],
    notTitle: "Ce que je ne fais pas",
    notBody: "Pas de marchés publics ni d’achats — c’est le domaine de ma propre société. Pas de jumeau numérique ni d’IA industrielle — c’est celui de mon employeur. Et pas de projet où personne ne peut me dire comment on saura que ça a marché.",
  },

  contact: {
    title: "Parlons-en",
    lead: "Trente minutes suffisent pour savoir si le problème est faisable et à quel prix. Pas de présentation commerciale — vous décrivez vos documents, je vous dis ce que j’en pense.",
    bookCta: "Réserver un créneau",
    orEmail: "Ou écrivez-moi directement",
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

  footer: {
    tagline: "Systèmes RAG et intelligence documentaire, de l’ingestion à l’interface.",
    rights: "Tous droits réservés.",
  },
};

type Dict = typeof fr;

const en: Dict = {
  htmlLang: "en",
  nav: { home: "Home", cases: "Work", about: "About", contact: "Contact" },
  switchTo: "Français",

  home: {
    eyebrow: "Independent AI engineer — Casablanca, on Paris time",
    h1: "I build RAG systems that survive contact with real documents.",
    lead: "Most demos work on clean PDFs. In production, documents are scanned, hundreds of pages long, mix French and Arabic, and are legally binding. I’ve solved that once already, at scale: 45,000 documents, 274,000 provenance citations, every extracted value tied back to the passage that produced it.",
    ctaPrimary: "Book 30 minutes",
    ctaSecondary: "See the work",
    anchor: "Projects from ",
    anchorMid: " · Day rate ",
    anchorEnd: " · available now",

    problemTitle: "Why RAG systems break in production",
    problems: [
      {
        title: "Real documents are dirty",
        body: "Scans, photocopies of scans, tables that exist only as images, structure that changes with every issuer. The pipeline that works on your ten test PDFs does not survive the eleventh.",
      },
      {
        title: "Dense retrieval alone doesn’t discriminate",
        body: "In legal or regulatory corpora, the phrasing repeats. Two passages saying opposite things have near-identical embeddings — and what users actually search for, an article number, a reference, a date, an amount, is exactly what embeddings handle worst.",
      },
      {
        title: "Without citations, the system is unusable",
        body: "The moment the stakes are contractual, an unverifiable answer is worth nothing. And traceability isn’t bolted on at the end: it gets lost at chunking. It has to be carried from OCR all the way to the screen.",
      },
    ],

    offerTitle: "Ways to work together",
    offers: [
      {
        title: "Audit and scoping",
        body: "A few days to establish why your retrieval is failing, what’s fixable, and what it costs. You leave with a costed plan — whether or not you hand me the build.",
      },
      {
        title: "Production build",
        body: "Design and delivery of the full system: ingestion, retrieval, citations, interface. Shipped with an evaluation set that belongs to you, so you can judge quality without me.",
      },
      {
        title: "Ongoing support",
        body: "One to two days a month to evolve an existing system, arbitrate technical choices and hand knowledge over to your team.",
      },
    ],

    sectorsTitle: "Sectors",
    sectorsLead: "The problem is the same everywhere: a lot of text, very little structure, and stakes that rule out approximation.",
    sectors: [
      "Legal tech — contracts, clause extraction, case files",
      "Insurance — claims, policy and coverage comparison",
      "Healthcare and admin — records, coding, compliance",
      "Technical documentation — manuals, standards, specifications",
      "Finance — reports, regulatory filings, due diligence",
    ],

    casesTitle: "Selected work",
    casesLead: "Three systems delivered to production, plus two apps shipped solo.",
    casesAll: "All work",

    ctaTitle: "Got a corpus that fights back?",
    ctaBody: "Describe your documents in three lines — volume, format, what you need out of them. In thirty minutes I’ll tell you whether it’s feasible, how, and what it costs.",
  },

  cases: {
    title: "Work",
    lead: "What was built, under which constraints, and what I’d do differently.",
    role: "Role",
    period: "Period",
    stack: "Stack",
    results: "Results",
    back: "All work",
    next: "Next case",
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
      ["Based in", "Casablanca — same time zone as Paris, no overlap problem"],
      ["Availability", "Immediate — remote engagements, in French or English"],
      ["Invoicing", "Moroccan sole-trader status, invoices in euros"],
    ],
    notTitle: "What I don’t do",
    notBody: "No public procurement or tendering — that’s my own company’s field. No digital twins or industrial AI — that’s my employer’s. And no project where nobody can tell me how we’ll know it worked.",
  },

  contact: {
    title: "Let’s talk",
    lead: "Thirty minutes is enough to establish whether the problem is feasible and what it costs. No sales deck — you describe your documents, I tell you what I think.",
    bookCta: "Book a slot",
    orEmail: "Or email me directly",
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

  footer: {
    tagline: "RAG systems and document intelligence, from ingestion to interface.",
    rights: "All rights reserved.",
  },
};

export const content: Record<Locale, Dict> = { fr, en };
export type { Dict };
