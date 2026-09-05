// Les versions longues et complètes vivent dans Semaine-1-Contenu/03..06-CaseStudy-*.md
// Ici : la version resserrée, pour le site.
//
// ⚠️  `published: false` = la référence n'apparaît nulle part sur le site.
//     Passe à `true` UNIQUEMENT après le feu vert écrit
//     — voir Semaine-1-Contenu/02-Autorisations.md
//
// ⚠️  Les jetons ⟦…⟧ bloquent le build tant qu'ils ne sont pas remplacés
//     par des chiffres réels (`npm run check`).

export type CaseSection = { heading: string; body: string[] };

export type CaseContent = {
  title: string;
  kicker: string;
  role: string;
  period: string;
  summary: string;
  proof: { v: string; l: string };
  images?: { src: string; w: number; h: number; alt: string; caption: string }[];
  sections: CaseSection[];
  results: string[];
  redoHeading: string;
  redo: string[];
};

export type CaseStudy = {
  slug: string;
  published: boolean;
  /** Site public du produit, si le lien est publiable. */
  link?: { url: string; label: string };
  stack: string[];
  fr: CaseContent;
  en: CaseContent;
};

export const cases: CaseStudy[] = [
  {
    slug: "bidtender",
    published: true,
    link: { url: "https://bidtndr.com", label: "bidtndr.com" },
    stack: ["PostgreSQL", "pgvector", "HNSW", "BM25", "Python", "FastAPI", "Azure Document Intelligence", "OpenAI", "Gemini", "Supabase", "React", "TypeScript", "Docker"],
    fr: {
      title: "RAG citable sur des documents qui cassent les pipelines",
      kicker: "BidTender — SaaS multi-tenant",
      role: "Co-fondateur · ingénieur IA et full-stack",
      period: "Depuis septembre 2025",
      summary:
        "Un dossier de consultation marocain arrive en dix à trente fichiers — PDF, Word, Excel, plans AutoCAD — en français et en arabe, souvent scannés, jusqu’à 3 592 pages pour un seul marché. J’ai construit le système qui les lit, avec chaque valeur extraite rattachée à l’extrait de texte qui l’a produite.",
      proof: { v: "4 h → 40 min", l: "dépouillement d’un dossier · 10 → 30 dossiers/mois, effectif constant" },
      sections: [
        {
          heading: "Le problème",
          body: [
            "Avant de répondre à un marché public, une entreprise doit savoir si elle est éligible, quel agrément est exigé, quelle caution provisoire déposer, comment elle sera notée, et quelles clauses vont lui coûter cher. Cette lecture prend des heures, elle est faite par les gens les plus chers de la maison, et la majorité des dossiers finit écartée.",
            "Mettre un LLM dessus est l’idée évidente. C’est aussi là que ça casse : un dossier de consultation n’est pas un document, c’est une pièce contractuelle. Une réponse approximative n’est pas une réponse un peu moins bonne — c’est une candidature rejetée pour non-conformité, ou un engagement pris par erreur.",
            "« Je crois que la caution provisoire est de 50 000 dirhams » est inutilisable. Le même montant accompagné de la phrase exacte du CPS qui l’énonce est utilisable, parce que l’humain vérifie en trois secondes. La contrainte n’est pas la qualité de la réponse : c’est sa traçabilité.",
          ],
        },
        {
          heading: "Les contraintes",
          body: [
            "Deux fondateurs techniques : ce qui n’est pas maintenable par une personne n’est pas construit.",
            "Multi-tenant dès le premier jour, avec des entreprises concurrentes sur la même base. Une fuite entre locataires n’est pas un bug, c’est la fin du produit.",
            "Aucun contrôle sur le format d’entrée : PDF natifs, scans, documents Word, tableurs, plans AutoCAD, et deux langues — français et arabe, y compris en écriture manuscrite ou scannée.",
            "Une réponse fausse coûte plus cher qu’une absence de réponse. « Cette information n’est pas dans le dossier » devait être un résultat de première classe.",
          ],
        },
        {
          heading: "Ce que j’ai construit",
          body: [
            "**La provenance, transportée de bout en bout.** La citation ne se perd pas à la génération, elle se perd au découpage. Chaque valeur extraite conserve l’extrait verbatim du texte qui l’a produite : 274 376 citations sur 58 champs distincts, dont 99,95 % avec le passage source. Un champ qu’on ne peut pas sourcer est signalé comme incertain plutôt que renvoyé avec aplomb.",
            "**Un découpage par clause, pas par fenêtre de tokens.** Couper un CPS tous les 800 tokens produit des chunks qui commencent au milieu d’un article. Sur un texte contractuel c’est destructeur : l’unité de sens est l’article numéroté, et une obligation coupée en deux devient une obligation fausse. Le découpage suit la hiérarchie documentaire, la fenêtre de tokens ne sert que de filet.",
            "**Recherche hybride pgvector + BM25 — par nécessité, pas par élégance.** Le vocabulaire des marchés publics est formulaire : deux passages qui disent l’inverse ont des embeddings quasi identiques. Symétriquement, ce que l’utilisateur cherche — un numéro d’article, une référence de lot, une date, un montant — sont des tokens rares, le terrain de BM25. Aucune des deux approches seule n’atteignait un niveau utilisable. 151 661 chunks, 113 244 vecteurs, index HNSW.",
            "**Un routage OCR page par page, bilingue.** Les pages sans couche texte exploitable et les pages en écriture arabe partent vers un moteur d’OCR dédié ; les autres non, parce que l’OCR systématique coûte cher et dégrade un PDF natif. Sur les documents concernés, la position et le score de confiance de chaque mot sont conservés — 1,1 million de mots géolocalisés dans leur page.",
            "**Isolation multi-tenant dans la recherche, pas après.** L’implémentation naïve cherche sur tout l’index puis filtre par locataire : sécurisée, et cassée. Si les meilleurs résultats globaux appartiennent à d’autres organisations, l’utilisateur reçoit zéro résultat sur ses propres documents. Le rappel s’effondre à mesure que la base grossit, et le bug n’apparaît jamais en démo mono-client.",
            "**Extraction structurée, tableaux compris.** 58 champs extraits par dossier, mais aussi 132 492 exigences documentaires, 29 096 lots, 12 521 critères d’attribution, et 228 771 lignes de bordereau de prix — la partie la plus dure, parce que dans une grille tarifaire la structure du tableau *est* l’information.",
            "**Traitement asynchrone avec reprise.** Le vrai travail n’est pas la file d’attente : c’est qu’un document qui échoue à la page 180 reprenne là où il s’est arrêté au lieu de repayer 180 pages d’OCR.",
          ],
        },
      ],
      results: [
        "45 000 fichiers traités en production, 40 800 documents distincts, 56 Go — PDF, Word, Excel, plans AutoCAD",
        "Plus de 250 000 pages comptées · dossier médian 58 pages · plus gros dossier rencontré 3 592 pages sur 32 fichiers",
        "274 376 citations de provenance sur 58 champs, dont 99,95 % avec l’extrait verbatim",
        "14 % des documents indexés ont dû passer par l’OCR — 1,1 million de mots conservés avec position et score de confiance",
        "228 771 lignes de bordereau de prix extraites sur 2 950 dossiers",
        "Recherche vectorielle en 1 ms côté serveur sur 113 000 vecteurs, index HNSW",
        "Un dossier complet analysé de bout en bout en 2 min 11 s médian, pour 0,22 USD",
        "4 organisations clientes actives, dont 3 sur un plan payant",
        "Dépouillement d’un dossier : de 4 h à 40 min — et le nombre de dossiers réellement examinés est passé de 10 à 30 par mois, à effectif constant (deux entretiens clients)",
        "Exactitude d’extraction mesurée sur un jeu de référence annoté à la main — 30 dossiers stratifiés × 8 champs critiques, 240 cellules : 90,4 % globalement, 86,2 % sur les dossiers scannés, et 75 % sur le sous-ensemble où le document source était relisible, où se trouvent la totalité des erreurs. Échantillon tiré de façon déterministe, protocole et code de scoring reproductibles.",
      ],
      redoHeading: "Ce que je referais autrement",
      redo: [
        "**Le jeu d’évaluation avant le pipeline.** Pendant des mois, « est-ce que c’est meilleur ? » se jugeait à l’œil sur quelques requêtes familières. Le jeu de référence existe aujourd’hui — 30 dossiers stratifiés entre natifs, scannés et plus de cent pages, tirés de façon déterministe pour que n’importe qui puisse rejouer exactement le même échantillon. Deux jours de travail qui auraient rendu chaque décision mesurable au lieu d’opinable. Je le referais en premier.",
        "**J’ai sous-estimé les tableaux.** Le texte au fil de l’eau se règle vite ; les bordereaux de prix, où la structure de la grille est l’information, ont demandé une chaîne de traitement entièrement séparée. Aujourd’hui, sur un corpus inconnu, ma première question est : quelle part de votre information vit dans des tableaux ? La réponse change le plan de charge du simple au double.",
        "**Le silence aurait dû être un objectif produit dès le départ.** Un système qui répond toujours est un système qui invente parfois — le seul mode de défaillance vraiment grave sur une pièce contractuelle. En faire une réponse correcte et assumée est autant un travail d’interface que de modèle, et je l’ai traité trop tard.",
      ],
    },
    en: {
      title: "Citable RAG on documents that break pipelines",
      kicker: "BidTender — multi-tenant SaaS",
      role: "Co-founder · AI and full-stack engineer",
      period: "Since September 2025",
      summary:
        "A Moroccan public tender file arrives as ten to thirty documents — PDF, Word, Excel, AutoCAD drawings — in French and Arabic, often scanned, up to 3,592 pages for a single contract. I built the system that reads them, with every extracted value tied back to the passage that produced it.",
      proof: { v: "4 h → 40 min", l: "to triage a file · 10 → 30 files/month, same headcount" },
      sections: [
        {
          heading: "The problem",
          body: [
            "Before bidding, a company has to know whether it qualifies, which certification is required, what bid bond to post, how it will be scored, and which clauses will prove expensive. That reading takes hours, it is done by the most expensive people in the building, and most files end up discarded anyway.",
            "Pointing an LLM at it is the obvious move. It is also where things break: a tender file is not a document, it is a contractual instrument. An approximate answer is not a slightly worse answer — it is a bid rejected for non-compliance, or a commitment made by mistake.",
            "“I think the bid bond is 50,000 dirhams” is unusable. The same figure with the exact sentence from the specification that states it is usable, because a human verifies it in three seconds. The constraint is not answer quality. It is traceability.",
          ],
        },
        {
          heading: "Constraints",
          body: [
            "Two technical founders: anything one person cannot maintain does not get built.",
            "Multi-tenant from day one, with competing companies on the same database. A cross-tenant leak is not a bug, it is the end of the product.",
            "No control over input format: native PDFs, scans, Word documents, spreadsheets, AutoCAD drawings, and two languages — French and Arabic, including scanned Arabic script.",
            "A wrong answer costs more than no answer. “That information is not in the file” had to be a first-class result.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "**Provenance carried end to end.** Citations are not lost at generation, they are lost at chunking. Every extracted value keeps the verbatim passage that produced it: 274,376 citations across 58 distinct fields, 99.95 % of them with the source text. A field that cannot be sourced is flagged as uncertain rather than returned with confidence.",
            "**Clause-based chunking, not token windows.** Splitting a contractual specification every 800 tokens produces chunks that start mid-article. On legal text that is destructive: the unit of meaning is the numbered article, and an obligation cut in half becomes a false obligation. Chunking follows the document hierarchy; the token window is only a safety net.",
            "**Hybrid pgvector + BM25 retrieval — out of necessity, not elegance.** Procurement language is formulaic: two passages saying opposite things have near-identical embeddings. Conversely, what users actually search for — an article number, a lot reference, a date, an amount — are rare tokens, which is BM25’s territory. Neither approach alone reached a usable level. 151,661 chunks, 113,244 vectors, HNSW index.",
            "**Page-level OCR routing, bilingual.** Pages with no usable text layer and pages in Arabic script go to a dedicated OCR engine; the rest do not, because blanket OCR is expensive and degrades a native PDF. On the documents that need it, every word keeps its bounding box and confidence score — 1.1 million words located on their page.",
            "**Tenant isolation inside retrieval, not after it.** The naive implementation searches the whole index then filters by tenant: secure, and broken. If the global top results belong to other organisations, the user gets zero results on documents they own. Recall collapses as the corpus grows, and the bug never shows up in a single-customer demo.",
            "**Structured extraction, tables included.** 58 fields per file, but also 132,492 documentary requirements, 29,096 lots, 12,521 award criteria, and 228,771 price-schedule rows — the hardest part, because in a pricing grid the table structure *is* the information.",
            "**Asynchronous processing with resume.** The real engineering is not the queue: it is that a document failing at page 180 restarts there instead of paying for 180 pages of OCR again.",
          ],
        },
      ],
      results: [
        "45,000 files processed in production, 40,800 distinct documents, 56 GB — PDF, Word, Excel, AutoCAD drawings",
        "Over 250,000 pages counted · median file 58 pages · largest encountered 3,592 pages across 32 documents",
        "274,376 provenance citations across 58 fields, 99.95 % carrying the verbatim excerpt",
        "14 % of indexed documents required OCR — 1.1 million words kept with position and confidence score",
        "228,771 price-schedule rows extracted across 2,950 files",
        "Vector search in 1 ms server-side over 113,000 vectors, HNSW index",
        "A complete tender file analysed end to end in a median 2 min 11 s, for 0.22 USD",
        "4 active client organisations, 3 of them on a paid plan",
        "Triaging a tender file: from 4 h down to 40 min — and the number of files actually reviewed went from 10 to 30 a month at constant headcount (two client interviews)",
        "Extraction accuracy measured against a hand-annotated reference set — 30 stratified tender files × 8 critical fields, 240 cells: 90.4% overall, 86.2% on scanned files, and 75% on the subset where the source document could be re-read, which is where every error sits. Deterministic sample, reproducible protocol and scoring code.",
      ],
      redoHeading: "What I’d do differently",
      redo: [
        "**Build the evaluation set before the pipeline.** For months, “is this better?” was judged by eye on a handful of familiar queries. The reference set exists today — 30 files stratified across native, scanned and hundred-page-plus, drawn deterministically so anyone can replay exactly the same sample. Two days of work that would have made every decision measurable instead of arguable. I’d do it first.",
        "**I underestimated tables.** Flowing text settles quickly; price schedules, where the grid structure is the information, needed an entirely separate processing chain. On an unfamiliar corpus my first question is now: how much of your information lives in tables? The answer doubles or halves the estimate.",
        "**Silence should have been a product goal from the start.** A system that always answers is a system that sometimes invents — the only truly serious failure mode on a contractual document. Making “not in this file” a correct, deliberate answer is as much interface work as model work, and I got to it too late.",
      ],
    },
  },

  {
    slug: "leyton",
    published: true,
    stack: ["Python", "RAG", "Embeddings", "Flask", "MongoDB", "Docker", "AWS"],
    fr: {
      title: "Personnalisation temps réel avec un pipeline de personas RAG",
      kicker: "Leyton — mission de conseil",
      role: "Consultant data science",
      period: "Septembre 2023 — février 2024",
      summary:
        "Une plateforme cosmétique recommandait par segments figés, en ignorant tout le texte qu’elle possédait déjà. Passage à une recommandation par personne, en temps réel, construite sur de la récupération documentaire — et explicable par l’équipe métier.",
      proof: { v: "+15 %", l: "taux de conversion · −20 % de cycle d’analyse" },
      sections: [
        {
          heading: "Le problème",
          body: [
            "Le segment n’est pas la personne. « Femme, 25-34, peau mixte » regroupe des gens dont les besoins n’ont rien en commun : la recommandation moyenne ne convient précisément à personne.",
            "Et le signal le plus riche dormait. Descriptions produits, compositions, avis clients, contenus éditoriaux : beaucoup de texte non structuré, plein d’information, totalement invisible pour un moteur à base de règles.",
          ],
        },
        {
          heading: "Les contraintes",
          body: [
            "Temps réel : la recommandation arrive pendant la session, dans un budget de latence de page web. Un batch nocturne était hors sujet.",
            "Démarrage à froid : un visiteur nouveau n’a pas d’historique, et le système devait être utile dès la première interaction.",
            "Explicabilité : l’équipe métier devait pouvoir répondre à « pourquoi ce produit ? ». Personne n’accepte de céder son merchandising à une boîte noire.",
            "Mission de conseil : ce qui n’était pas repris par les équipes internes après mon départ n’avait aucune valeur.",
          ],
        },
        {
          heading: "Ce que j’ai construit",
          body: [
            "**Une couche de personas alimentée par RAG.** Plutôt qu’un embedding produit brut, un espace intermédiaire interprétable entre l’utilisateur et le catalogue, construit par récupération sur le corpus textuel. C’est ce qui résout l’explicabilité : la recommandation n’est pas « le modèle a dit », c’est « ce profil correspond à ce persona, qui correspond à ces produits, pour ces raisons textuelles ». L’équipe métier lit le raisonnement et peut le contester.",
            "**Deux vitesses, pas une.** Hors ligne : embeddings, personas, associations produits — coûteux, précalculé. En ligne : signal de session, appariement, classement final — léger, à la requête. Le temps réel n’est pas « tout calculer vite », c’est précalculer tout ce qui peut l’être.",
            "**Un service volontairement simple.** Flask, MongoDB, Docker, AWS. L’équipe interne devait pouvoir reprendre la maintenance, donc rien d’ingénieux pour le plaisir.",
          ],
        },
      ],
      results: [
        "+15 % de taux de conversion, rapporté par le client",
        "−20 % de temps de cycle d’analyse pour l’équipe métier",
        "Recommandations explicables, reprises et maintenues en interne après la fin de la mission",
      ],
      redoHeading: "Ce que je referais autrement",
      redo: [
        "**Poser la mesure avant la construction.** Le +15 % a été rapporté ; un protocole d’A/B test défini au premier jour aurait produit un chiffre défendable plutôt qu’un chiffre crédible. C’est aujourd’hui la première chose que je cadre : comment saura-t-on que ça a marché, et qui accepte ce chiffre ?",
        "**Traiter le démarrage à froid comme une stratégie, pas comme un cas dégradé.** Sur un site grand public, les visiteurs nouveaux sont une part énorme du trafic. En faire un repli du chemin nominal, c’est mal servir la majorité des gens.",
      ],
    },
    en: {
      title: "Real-time personalisation with a RAG persona pipeline",
      kicker: "Leyton — consulting engagement",
      role: "Data science consultant",
      period: "September 2023 — February 2024",
      summary:
        "A cosmetics platform was recommending from frozen segments while ignoring all the text it already owned. Moved to per-person, real-time recommendation built on retrieval — and explainable by the business team.",
      proof: { v: "+15%", l: "conversion rate · −20% analysis cycle" },
      sections: [
        {
          heading: "The problem",
          body: [
            "A segment is not a person. “Woman, 25-34, combination skin” groups people whose needs have nothing in common: the average recommendation suits precisely nobody.",
            "And the richest signal was dormant. Product descriptions, compositions, customer reviews, editorial content: a great deal of unstructured text, full of information, completely invisible to a rules-based engine.",
          ],
        },
        {
          heading: "Constraints",
          body: [
            "Real time: the recommendation lands during the session, inside a web-page latency budget. A nightly batch was off the table.",
            "Cold start: a new visitor has no history, and the system had to be useful from the first interaction.",
            "Explainability: the business team had to be able to answer “why this product?”. Nobody hands their merchandising to a black box.",
            "Consulting engagement: anything the internal team could not take over after I left had no value.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "**A RAG-driven persona layer.** Rather than raw product embeddings, an interpretable intermediate space between user and catalogue, built by retrieval over the text corpus. That is what solves explainability: the recommendation is not “the model said so”, it is “this profile matches this persona, which matches these products, for these textual reasons”. The business team reads the reasoning and can argue with it.",
            "**Two speeds, not one.** Offline: embeddings, personas, product associations — expensive, precomputed. Online: session signal, persona matching, final ranking — light, per request. Real time is not “compute everything fast”, it is precompute everything that can be precomputed.",
            "**A deliberately plain service.** Flask, MongoDB, Docker, AWS. The internal team had to take over maintenance, so nothing clever for its own sake.",
          ],
        },
      ],
      results: [
        "+15 % conversion rate, reported by the client",
        "−20 % analysis cycle time for the business team",
        "Explainable recommendations, taken over and maintained in-house after the engagement ended",
      ],
      redoHeading: "What I’d do differently",
      redo: [
        "**Set the measurement before the build.** The +15 % was reported; an A/B protocol defined on day one would have produced a defensible number rather than a credible one. It is now the first thing I scope: how will we know it worked, and who accepts that number?",
        "**Treat cold start as a strategy, not a degraded path.** On a consumer site, new visitors are a huge share of traffic. Making them a fallback from the happy path means serving most people badly.",
      ],
    },
  },

  {
    slug: "chemin-du-roi",
    // Accord de Jérémie obtenu (5 sept. 2026).
    // Rappel : c'est une PREUVE, pas un marché. Ne vends jamais dans ce domaine.
    published: true,
    stack: ["OPC UA", "Modbus", "MQTT", "SFTP", "TimescaleDB", "Python", "TensorFlow", "FastAPI", "React", "Grafana", "Docker"],
    fr: {
      title: "Jumeau numérique d’une unité de méthanisation",
      kicker: "Chemin du Roi — plateforme industrielle",
      role: "Ingénieur IA et jumeau numérique",
      period: "Depuis novembre 2024",
      summary:
        "Cinq flux temps réel hétérogènes, cinq protocoles, cinq notions du temps — unifiés en une plateforme sur laquelle des ingénieurs d’exploitation prennent des décisions tous les matins.",
      proof: { v: "5 → 1", l: "protocoles unifiés · OPC UA · Modbus · MQTT · SFTP · API" },
      sections: [
        {
          heading: "Le problème",
          body: [
            "Une unité de méthanisation est instrumentée, mais son instrumentation est un archipel : chaque capteur, chaque automate, chaque prestataire arrive avec son protocole et son format. La donnée existe, personne ne peut la lire ensemble.",
            "Les exploitants naviguent entre plusieurs interfaces, corrèlent de tête, et découvrent une dérive quand elle est déjà visible dans les résultats. Deux besoins : voir l’état du procédé en temps réel, puis anticiper son comportement.",
          ],
        },
        {
          heading: "Les contraintes",
          body: [
            "Cinq sources hétérogènes, aucune sous notre contrôle : API métier, OPC UA, Modbus, MQTT, dépôts SFTP.",
            "Le terrain n’est pas un datacenter. Les capteurs décrochent, les réseaux tombent, les horloges dérivent, certaines valeurs sont physiquement absurdes.",
            "Procédé biologique : dynamique lente, forte inertie, non-linéarités, et des données rares qu’on ne peut pas multiplier par des essais.",
            "Les utilisateurs sont des ingénieurs procédé. Un modèle boîte noire qui contredit leur intuition physique sans pouvoir s’expliquer n’est jamais adopté.",
          ],
        },
        {
          heading: "Ce que j’ai construit",
          body: [
            "**Un connecteur par protocole, un seul modèle temporel.** La spécificité s’arrête à la frontière ; au-delà, tout est une mesure horodatée dans TimescaleDB. Le travail réel n’est pas de parler cinq protocoles, c’est de réconcilier cinq horloges — un analyseur à la seconde, un automate à la minute, un fichier SFTP qui tombe la nuit pour la veille.",
            "**Le vide comme donnée, pas comme accident.** Un jumeau naïf interpole tout et affiche une belle courbe continue : c’est un mensonge par omission, l’exploitant ne distingue plus une mesure d’une extrapolation. Ici, mesuré, agrégé et absent sont explicitement distincts. C’est ce qui fait qu’un ingénieur accepte l’outil au lieu de retourner à ses fichiers.",
            "**Modélisation hybride mécaniste + neuronale.** Un modèle AM2 porte la physique connue de la digestion anaérobie, la partie apprise capte l’écart entre le modèle et cette installation-là. Deux bénéfices, et le second est le vrai : il apprend avec peu de données, et il reste explicable — une erreur se lit comme un écart de modèle ou comme une dérive capteur, pas comme une opacité.",
          ],
        },
      ],
      results: [
        "Cinq flux temps réel hétérogènes unifiés en une plateforme unique",
        "KPI procédé et observabilité capteur utilisés quotidiennement en exploitation",
        "Passage d’un programme de recherche appliquée à une plateforme en production continue",
      ],
      redoHeading: "Ce que je referais autrement",
      redo: [
        "**Comprendre la décision avant de construire l’ingestion.** Le premier réflexe est de tout récupérer parce qu’on peut. Mais un jumeau numérique ne vaut que rapporté à une décision d’exploitation, et j’ai fiabilisé des flux qui n’en pilotaient aucune. Je commence désormais par : quelle décision, prise par qui, à quelle fréquence ?",
        "**Une couche de qualité de donnée dès le départ.** Elle s’est retrouvée dispersée entre les connecteurs et les modèles. Bornes physiques, valeur gelée, dérive d’horloge : validée juste après l’ingestion, chaque anomalie devient attribuable à une cause.",
      ],
    },
    en: {
      title: "Digital twin of an anaerobic digestion plant",
      kicker: "Chemin du Roi — industrial platform",
      role: "AI and digital twin engineer",
      period: "Since November 2024",
      summary:
        "Five heterogeneous real-time streams, five protocols, five notions of time — unified into one platform that plant engineers make decisions on every morning.",
      proof: { v: "5 → 1", l: "protocols unified · OPC UA · Modbus · MQTT · SFTP · API" },
      sections: [
        {
          heading: "The problem",
          body: [
            "An anaerobic digestion plant is instrumented, but its instrumentation is an archipelago: every sensor, controller and supplier arrives with its own protocol and format. The data exists; nobody can read it together.",
            "Operators move between several interfaces, correlate in their heads, and notice drift once it is already visible in the output. Two needs: see the process state in real time, then anticipate its behaviour.",
          ],
        },
        {
          heading: "Constraints",
          body: [
            "Five heterogeneous sources, none under our control: a business API, OPC UA, Modbus, MQTT, SFTP drops.",
            "The field is not a datacentre. Sensors drop out, networks fail, clocks drift, some values are physically absurd.",
            "A biological process: slow dynamics, strong inertia, non-linearities, and scarce data that cannot be multiplied by running experiments.",
            "The users are process engineers. A black-box model that contradicts their physical intuition without being able to explain itself is never adopted.",
          ],
        },
        {
          heading: "What I built",
          body: [
            "**One connector per protocol, a single time model.** Protocol specifics stop at the boundary; beyond it, everything is a timestamped measurement in TimescaleDB. The real work is not speaking five protocols, it is reconciling five clocks — an analyser sampling per second, a controller per minute, an SFTP file arriving overnight for the previous day.",
            "**Absence as data, not as an accident.** A naive twin interpolates everything and draws a smooth continuous curve: that is a lie by omission, because the operator can no longer tell a measurement from an extrapolation. Here, measured, aggregated and missing are explicitly distinct. That is what makes an engineer accept the tool instead of going back to spreadsheets.",
            "**Hybrid mechanistic + neural modelling.** An AM2 model carries the known physics of anaerobic digestion; the learned component captures the gap between that model and this particular plant. Two benefits, and the second is the real one: it learns from little data, and it stays explainable — an error reads either as model mismatch or as sensor drift, not as opacity.",
          ],
        },
      ],
      results: [
        "Five heterogeneous real-time streams unified into a single platform",
        "Process KPIs and sensor observability used daily in operations",
        "Moved from an applied research programme to a continuously running production platform",
      ],
      redoHeading: "What I’d do differently",
      redo: [
        "**Understand the decision before building ingestion.** The first instinct is to capture everything because you can. But a digital twin is only worth what it changes about an operating decision, and I hardened streams that drove none. I now start with: which decision, made by whom, how often?",
        "**A data quality layer from the start.** It ended up scattered between connectors and models. Physical bounds, frozen values, clock drift — validated right after ingestion, every anomaly becomes attributable to a cause.",
      ],
    },
  },

  {
    slug: "produits-mobiles",
    published: true,
    stack: ["Kotlin", "Jetpack Compose", "ML Kit", "Room", "Hilt", "Expo", "React Native", "TypeScript", "Supabase", "RLS"],
    fr: {
      title: "Deux produits mobiles conçus, construits et publiés en solo",
      kicker: "Lbassi · Wadrari",
      role: "Conception, développement et distribution",
      period: "Projets personnels",
      summary:
        "Ce que ces deux applications prouvent tient en un mot : je finis. Un client qui confie un système documentaire craint de recevoir un notebook impressionnant et rien qui tourne.",
      proof: { v: "En distribution", l: "pas en prototype · Kotlin · Expo · Supabase RLS" },
      images: [
        { src: "/cases/lbassi.webp", w: 1700, h: 1450,
          alt: "Lbassi — recommandation explicable, découpe hors ligne, garde-robe",
          caption: "**Lbassi.** La recommandation affiche le raisonnement derrière son score au lieu de demander qu’on lui fasse confiance. La découpe tourne téléphone en mode avion — la barre d’état est la preuve. La garde-robe est entièrement construite par du travail fait sur l’appareil." },
        { src: "/cases/wadrari.webp", w: 1700, h: 1450,
          alt: "Wadrari — chat temps réel, classement, quêtes",
          caption: "**Wadrari.** Ce qui compte n’est pas la liste des fonctionnalités, c’est où vivent les règles. Scores, progression des quêtes et accès aux messages sont décidés par des politiques Postgres et des fonctions RPC : le client peut demander, il ne peut pas décider." },
      ],
      sections: [
        {
          heading: "Lbassi — IA embarquée d’abord",
          body: [
            "Une application de garde-robe suppose des photos de vos vêtements et de vous. La plupart envoient tout dans le cloud. Ici, découpe d’image et recommandation tournent hors ligne, sur l’appareil, et le réseau n’est sollicité que pour ce qui l’exige réellement.",
            "La règle de routage — quoi en local, quoi à distance — est la vraie décision de conception. C’est exactement la question qu’on se pose sur un système RAG en entreprise : qu’est-ce qui doit sortir du périmètre, et pourquoi ? Les recommandations sont explicables : l’utilisateur voit sur quoi la suggestion s’appuie.",
            "Kotlin, Jetpack Compose, Room, Hilt, ML Kit, assistance Gemini routée, essayage virtuel via FastAPI.",
          ],
        },
        {
          heading: "Wadrari — social temps réel",
          body: [
            "Chat, quêtes, mini-jeux, classements, modération. L’intérêt professionnel n’est pas le produit, c’est le modèle d’autorisation : politiques RLS et fonctions RPC, de sorte qu’un client mobile compromis ne puisse pas lire ce qui ne lui appartient pas.",
            "C’est la même discipline que l’isolation multi-tenant de BidTender, appliquée au grand public — la frontière de sécurité vit dans la base, pas dans le client. Livré jusqu’à la distribution Android.",
            "Expo, React Native, TypeScript, Supabase (Postgres, Realtime, RLS, RPC), EAS.",
          ],
        },
      ],
      results: [
        "Sécurité au niveau de la base, pas dans le client — RLS et RPC ici, isolation par locataire ailleurs",
        "Exécution locale par défaut, distant quand il apporte quelque chose : le même arbitrage coût / latence / confidentialité que sur tout système LLM",
        "Livré jusqu’à la distribution, pas jusqu’au prototype",
      ],
      redoHeading: "Ce qu’il faut en retenir",
      redo: [
        "Ce ne sont pas des missions client, et ce n’est pas le cœur de ce que je vends. Elles répondent à une seule question, celle que personne ne pose à voix haute : est-ce que ce système finira en production, ou en démo ?",
      ],
    },
    en: {
      title: "Two mobile products designed, built and shipped solo",
      kicker: "Lbassi · Wadrari",
      role: "Design, development and distribution",
      period: "Personal projects",
      summary:
        "What these two apps prove comes down to one word: I finish. A client handing over a document system fears receiving an impressive notebook and nothing that runs.",
      proof: { v: "Shipped", l: "not a prototype · Kotlin · Expo · Supabase RLS" },
      images: [
        { src: "/cases/lbassi.webp", w: 1700, h: 1450,
          alt: "Lbassi — explainable recommendation, offline cutout, the wardrobe",
          caption: "**Lbassi.** The recommendation shows the reasoning behind its score instead of asking you to trust it. The cutout runs with the phone in airplane mode — the status bar is the proof. The wardrobe is built entirely from work done on the device." },
        { src: "/cases/wadrari.webp", w: 1700, h: 1450,
          alt: "Wadrari — real-time chat, leaderboard, quests",
          caption: "**Wadrari.** The interesting part isn’t the feature list, it’s where the rules live. Scores, quest progress and message access are decided by Postgres row-level policies and RPC functions: the client can request, it cannot decide." },
      ],
      sections: [
        {
          heading: "Lbassi — on-device AI first",
          body: [
            "A wardrobe app implies photos of your clothes and of you. Most send everything to the cloud. Here, image cutout and recommendation run offline, on the device, and the network is only used for what genuinely requires it.",
            "The routing rule — what stays local, what goes remote — is the real design decision. It is exactly the question you face on an enterprise RAG system: what has to leave the perimeter, and why? Recommendations are explainable: the user sees what the suggestion rests on.",
            "Kotlin, Jetpack Compose, Room, Hilt, ML Kit, routed Gemini assistance, virtual try-on via FastAPI.",
          ],
        },
        {
          heading: "Wadrari — real-time social",
          body: [
            "Chat, quests, mini-games, leaderboards, moderation. The professionally interesting part is not the product, it is the authorisation model: RLS policies and RPC functions, so that a compromised mobile client cannot read what it does not own.",
            "It is the same discipline as BidTender’s tenant isolation, applied to a consumer context — the security boundary lives in the database, not the client. Shipped through to Android distribution.",
            "Expo, React Native, TypeScript, Supabase (Postgres, Realtime, RLS, RPC), EAS.",
          ],
        },
      ],
      results: [
        "Security in the database, not the client — RLS and RPC here, tenant isolation elsewhere",
        "Local execution by default, remote when it earns its place: the same cost / latency / privacy trade-off as any LLM system",
        "Shipped to distribution, not to prototype",
      ],
      redoHeading: "What to take from this",
      redo: [
        "These are not client engagements, and they are not the core of what I sell. They answer one question, the one nobody asks out loud: will this system end up in production, or in a demo?",
      ],
    },
  },
];

export const publishedCases = cases.filter((c) => c.published);

export function getCase(slug: string) {
  return publishedCases.find((c) => c.slug === slug);
}
