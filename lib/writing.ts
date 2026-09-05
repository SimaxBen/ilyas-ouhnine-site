// Articles techniques. Même règle que les références : rien ici qui ne soit mesuré.
// Les chiffres viennent des bancs et des validations internes de BidTender.
// Le domaine (marchés publics) est une PREUVE, jamais un marché — voir
// Semaine-1-Contenu/09-REPOSITIONNEMENT.md.

export type ArticleSection = {
  heading: string;
  body: string[];
  /** Bloc monospace (arbre de décision, pseudo-code). */
  pre?: string;
  table?: { head: string[]; rows: string[][] };
};

export type ArticleContent = {
  title: string;
  kicker: string;
  standfirst: string;
  sections: ArticleSection[];
  takeawayHeading: string;
  takeaway: string[];
};

export type Article = {
  slug: string;
  published: boolean;
  date: string;
  minutes: number;
  tags: string[];
  fr: ArticleContent;
  en: ArticleContent;
};

const inferenceFr: ArticleContent = {
  title: "Déduire la règle à partir du résultat",
  kicker: "Inférence inverse",
  standfirst:
    "Une base publique m’annonçait le gagnant de chaque décision, jamais le critère appliqué pour le choisir. J’ai construit un moteur qui le déduit. Il tranche 38 cas sur 100 à haute confiance, il refuse de trancher quand il ne peut pas — et il a trouvé sept erreurs dans les données dont il partait.",
  sections: [
    {
      heading: "Le problème, en une phrase",
      body: [
        "Il existe toute une famille de problèmes où la donnée vous donne le **résultat** d’une décision, mais pas le **critère** qui l’a produit. Un jury publie son lauréat sans sa grille. Un moteur de tarification affiche un prix sans sa règle. Une commission publie le gagnant, l’ordre des offres et tous les montants — mais la case « méthode » est vide, ou remplie au petit bonheur.",
        "Dans mon cas c’était la troisième. Plusieurs milliers de décisions publiques, chacune avec ses candidats, leurs montants, et le nom du gagnant. La règle qui a produit ce gagnant n’était renseignée que par intermittence, et quand elle l’était, elle était souvent recopiée d’un champ de formulaire qui ne veut rien dire.",
        "La question tient en une ligne : **si on connaît le gagnant et l’ensemble des offres, peut-on remonter à la règle ?** La réponse est oui pour la grande majorité des cas — à condition d’accepter de ne pas répondre pour les autres.",
      ],
    },
    {
      heading: "Pourquoi on ne peut pas simplement lire la réponse",
      body: [
        "Le premier réflexe est d’aller chercher la règle dans le texte : le champ de la fiche, la phrase de justification du procès-verbal. C’est ce que faisait déjà mon collecteur, avec une table de motifs.",
        "Ça marche quand la source est honnête. Le problème est qu’elle ne l’est pas toujours, et surtout qu’elle est **silencieuse quand elle ne sait pas** : le champ contient une valeur par défaut qui a l’air d’une information.",
        "Une valeur par défaut qui ressemble à une donnée est pire qu’un champ vide. Elle ne déclenche aucune alerte, elle traverse tout le pipeline sans résistance, et elle finit dans un tableau de bord où quelqu’un la lit comme un fait.",
        "D’où le renversement : ne plus croire l’étiquette, la **recalculer** à partir de ce qui n’est pas discutable — des montants et un gagnant.",
      ],
    },
    {
      heading: "Huit observations, aucune supposition",
      body: [
        "Le point de départ est la liste des offres recevables pour une décision donnée, et le fait de savoir laquelle a gagné. Sur cette liste, huit quantités se calculent sans rien supposer.",
        "**Toutes les offres sont-elles identiques ?** Une égalité parfaite entre trois candidats ou plus n’arrive pas par hasard : elle signifie que le prix n’était pas l’objet de la compétition — c’est un pourcentage appliqué à une base commune.",
        "**Le gagnant est-il le moins cher ?** **Est-il celui qui s’approche le plus, par en dessous, d’un prix de référence calculable ?** **Existe-t-il un candidat recevable moins cher qui a perdu ?** — celui-là est le plus informatif du lot : il élimine à lui seul toute règle du moins-disant.",
        "Et quatre autres, plus faibles mais utiles pour arbitrer : la décision est-elle antérieure au changement de régime réglementaire, le libellé de la procédure contient-il un indice, combien de gagnants dans le groupe, quelle est la dispersion des montants.",
        "**La préparation compte autant que les signaux.** Avant de calculer quoi que ce soit, il faut retirer de la liste ce que la règle elle-même écarte : les offres administrativement rejetées, celles jugées anormalement basses, celles au-dessus d’un plafond. Un signal calculé sur la mauvaise population ne dit rien du tout.",
        "Et tout se calcule par lot, jamais globalement : une même décision peut porter sur plusieurs lots attribués séparément, et les mélanger brouille chaque signal.",
      ],
    },
    {
      heading: "L’arbre",
      body: [
        "L’arbre est court, et c’est voulu. Chaque nœud est une observation, pas une heuristique — on peut relire n’importe quelle décision et dire exactement quelle inégalité l’a produite.",
        "Le point important est la sortie « indéterminé ». Un seul candidat recevable, ou une égalité à deux, ne permettent de rien conclure. La tentation est de trancher quand même, avec une confiance basse. C’est une erreur : **une étiquette fausse à 0,4 de confiance sera lue comme une étiquette**, pas comme une incertitude.",
      ],
      pre: `aucun gagnant identifié ─────────────────────► INDÉTERMINÉ (0,00)

le libellé nomme explicitement la règle ────────► cette règle (0,95)

n ≥ 3 et tous les montants égaux ───────────────► base commune (0,95)

un candidat recevable MOINS CHER a perdu
        │
        ├── le gagnant est le plus proche
        │   du prix de référence, par en bas ────► règle du prix de référence
        │                                          (0,95 si n ≥ 3, 0,70 si n = 2)
        │
        └── il ne l'est pas non plus ────────────► la décision s'est jouée
                                                   ailleurs qu'au prix (0,80)

le gagnant est le moins cher ───────────────────► règle du prix
                                                   (0,90 avant réforme,
                                                    0,70 après — ambigu)`,
    },
    {
      heading: "La confiance, écrite avant les résultats",
      body: [
        "Le modèle de confiance est la partie du système qui a le plus compté, et c’est celle dont on parle le moins. Il a été écrit **avant** de regarder les résultats, pour ne pas être calibré sur l’envie d’avoir raison.",
        "Deux principes le gouvernent.",
        "**La confiance descend quand une entrée manque.** Sans estimation, le prix de référence n’est pas calculable : le plafond tombe à 0,50, quelle que soit la netteté des autres signaux. Sans la catégorie, le seuil d’anormalité est pris par défaut, on retire un cran.",
        "**La confiance descend quand deux règles prédisent la même chose.** Le cas le plus fréquent est celui où le gagnant est à la fois le moins cher et le plus proche du prix de référence. Les deux règles donnent le même gagnant : l’observation ne peut pas les départager. Le droit tranche, l’observation non — donc l’étiquette est posée, mais la confiance reste basse et le cas est marqué ambigu.",
        "Une confiance honnête coûte des points sur les tableaux de résultats et en fait gagner sur les décisions. C’est un arbitrage qu’il faut faire consciemment, une fois, au début.",
      ],
      table: {
        head: ["Situation observée", "Confiance"],
        rows: [
          ["Le libellé nomme la règle", "0,95"],
          ["n ≥ 3, tous les montants égaux, libellé muet", "0,85"],
          ["Gagnant ≠ moins cher, gagnant = plus proche du prix de référence, n ≥ 3", "0,95"],
          ["Même configuration, mais n = 2", "0,70"],
          ["Gagnant plus cher qu’un recevable, et pas le plus proche non plus", "0,80"],
          ["Gagnant = moins cher = plus proche, après réforme", "0,70 · marqué ambigu"],
          ["Un seul candidat recevable", "0,00 · indéterminé"],
          ["Estimation absente", "plafonné à 0,50"],
          ["Catégorie absente", "−0,10"],
        ],
      },
    },
    {
      heading: "La première passe échoue",
      body: [
        "Cent décisions, choisies parmi les plus récentes ayant un gagnant publié, une estimation, et au moins une offre recevable chiffrée. Aucune sélection favorable : la population entière qui remplit ces trois conditions.",
        "Résultat : **4 cas sur 100** au-dessus du seuil de confiance. Sept classements manifestement faux. Autant dire un échec.",
        "Deux erreurs symétriques, et instructives.",
        "**Une égalité à deux prise pour une règle.** Deux candidats recevables avaient déposé exactement le même montant, un chiffre rond. Le signal « tous les montants sont égaux » s’est déclenché, avec 0,90 de confiance. Deux personnes qui tombent sur le même nombre rond, c’est une coïncidence. Trois, c’est une règle. Le signal n’avait pas d’effectif minimum.",
        "**Un libellé explicite ignoré.** Six décisions dont le libellé de procédure nommait littéralement la règle ont été classées autrement, parce que l’arbre ne regardait le texte qu’en dernier recours, comme un indice faible. C’était l’inverse : quand la source dit explicitement la règle, c’est le signal le plus direct qui existe. Il doit passer **devant** les signaux calculés, pas derrière.",
        "L’erreur de conception est la même dans les deux cas : j’avais rangé les signaux par élégance — les calculés d’abord, le texte ensuite, parce que calculer est plus satisfaisant que lire — au lieu de les ranger par force probante.",
      ],
    },
    {
      heading: "Quatre règles, et la deuxième passe",
      body: [
        "Quatre corrections, chacune née d’un cas précis qui s’était mal classé — aucune d’une idée générale sur ce qui « devrait » marcher.",
        "**R1** — le libellé explicite passe en tête et l’emporte sur tout le reste. **R2** — un libellé de type concours, combiné à un gagnant qui n’est pas le moins cher, suffit à conclure que la décision ne s’est pas jouée au prix. **R3** — le signal d’égalité exige désormais trois candidats. **R4** — la configuration où deux règles prédisent le même gagnant voit sa confiance relevée de 0,55 à 0,70, parce que le droit, lui, tranche.",
        "Le résultat, sur exactement la même population de cent cas :",
        "Trente-huit cas au-dessus du seuil au lieu de quatre. Les neuf décisions à base commune correctement identifiées sur neuf. **Aucun faux positif.** Et une confiance moyenne qui monte de 0,67 à 0,78 — sans qu’aucune règle n’ait été ajoutée pour gonfler un chiffre.",
      ],
      table: {
        head: ["Mesure", "Passe 1", "Passe 2"],
        rows: [
          ["Cas au-dessus du seuil de confiance", "4 / 100", "38 / 100"],
          ["Décisions à base commune identifiées", "3 / 9", "9 / 9"],
          ["Classements manifestement faux", "7", "0"],
          ["Confiance moyenne", "0,67", "0,78"],
        ],
      },
    },
    {
      heading: "Le résultat auquel je ne m’attendais pas",
      body: [
        "Sept décisions se sont classées dans une catégorie que je n’avais pas prévu de voir apparaître aussi souvent : le gagnant y est strictement plus cher qu’un candidat recevable, et il n’est pas non plus le plus proche du prix de référence. **Aucune règle de prix ne produit ce gagnant.** La décision s’est donc jouée sur autre chose — un score technique — alors que l’étiquette de la source disait « sur offre de prix ».",
        "Ce ne sont pas des erreurs du moteur. Ce sont des erreurs **de la donnée**, que le moteur a mises au jour.",
        "Elles comptent doublement, parce qu’un autre morceau du produit calculait un « gagnant théorique » à partir de cette étiquette, pour les décisions dont le résultat n’est pas encore publié. Sur ces sept configurations, il donnait un gagnant faux. En silence.",
        "C’est le bénéfice le moins visible de ce genre de travail, et souvent le plus rentable : **un modèle qui recalcule une donnée devient un audit de cette donnée.** Faites-les tourner en parallèle un moment avant de remplacer l’un par l’autre — l’écart entre les deux est une liste de bugs.",
      ],
    },
  ],
  takeawayHeading: "Ce qui se transpose",
  takeaway: [
    "Quand une source vous donne le résultat mais pas la règle, la règle est souvent récupérable — et la récupérer vaut mieux que faire confiance au champ.",
    "Une valeur par défaut qui ressemble à une donnée est plus dangereuse qu’un champ vide : elle ne déclenche rien.",
    "Classez vos signaux par force probante, pas par élégance. Le signal explicite passe devant le signal calculé.",
    "Un seuil d’effectif est ce qui sépare une coïncidence d’une règle. Deux points ne font pas une loi.",
    "Écrivez le modèle de confiance avant de regarder les résultats, et faites-le descendre quand une entrée manque.",
    "« Indéterminé » doit rester une réponse possible. Sinon vous ne produisez pas de la connaissance, vous produisez des étiquettes.",
    "Un moteur qui recalcule une donnée existante est un détecteur d’erreurs dans cette donnée. L’écart entre les deux est votre liste de bugs.",
  ],
};

const inferenceEn: ArticleContent = {
  title: "Inferring the rule from the outcome",
  kicker: "Reverse inference",
  standfirst:
    "A public dataset told me the winner of every decision, never the criterion used to pick it. I built an engine that infers it. It rules on 38 cases out of 100 at high confidence, it refuses to rule when it cannot — and it surfaced seven errors in the very data it started from.",
  sections: [
    {
      heading: "The problem, in one sentence",
      body: [
        "There is a whole family of problems where the data hands you the **outcome** of a decision but not the **criterion** that produced it. A jury publishes its winner without its scoring grid. A pricing engine shows a price without its rule. A committee publishes the winner, the ranking and every amount — but the “method” field is empty, or filled in at random.",
        "Mine was the third. Several thousand public decisions, each with its candidates, their amounts, and the winner’s name. The rule that produced that winner was recorded only intermittently, and when it was, it had often been copied from a form field that means nothing.",
        "The question fits on one line: **given the winner and the full set of bids, can you recover the rule?** The answer is yes for the large majority of cases — provided you accept not answering for the rest.",
      ],
    },
    {
      heading: "Why you cannot simply read the answer",
      body: [
        "The first instinct is to look for the rule in the text: the record’s field, the justification sentence in the minutes. That is what my collector already did, with a pattern table.",
        "It works when the source is honest. The trouble is that it isn’t always, and above all that it is **silent when it does not know**: the field carries a default value that looks like information.",
        "A default value that looks like data is worse than an empty field. It raises no alert, it travels through the whole pipeline unopposed, and it ends up on a dashboard where someone reads it as a fact.",
        "Hence the inversion: stop believing the label, and **recompute** it from what is not up for debate — amounts and a winner.",
      ],
    },
    {
      heading: "Eight observations, no assumptions",
      body: [
        "The starting point is the list of admissible bids for a given decision, and knowing which one won. On that list, eight quantities can be computed without assuming anything.",
        "**Are all the bids identical?** A perfect tie between three or more candidates does not happen by chance: it means price was not what the competition was about — it is a percentage applied to a shared base.",
        "**Is the winner the cheapest?** **Is it the one closest to a computable reference price, from below?** **Does an admissible cheaper candidate exist that lost?** — that last one is the most informative of the set: on its own it rules out any lowest-price rule.",
        "And four weaker but useful tiebreakers: is the decision earlier than the regulatory reform, does the procedure label carry a hint, how many winners in the group, how dispersed are the amounts.",
        "**Preparation matters as much as the signals.** Before computing anything you have to remove from the list whatever the rule itself excludes: administratively rejected bids, abnormally low ones, ones above a ceiling. A signal computed on the wrong population says nothing at all.",
        "And everything is computed per lot, never globally: one decision can cover several lots awarded separately, and mixing them muddies every signal.",
      ],
    },
    {
      heading: "The tree",
      body: [
        "The tree is short, deliberately. Every node is an observation, not a heuristic — you can reopen any decision and say exactly which inequality produced it.",
        "The important part is the “undetermined” exit. A single admissible candidate, or a two-way tie, support no conclusion. The temptation is to rule anyway, at low confidence. That is a mistake: **a wrong label at 0.4 confidence gets read as a label**, not as uncertainty.",
      ],
      pre: `no identified winner ──────────────────────────► UNDETERMINED (0.00)

the label explicitly names the rule ───────────► that rule (0.95)

n ≥ 3 and every amount equal ──────────────────► shared base (0.95)

an admissible CHEAPER candidate lost
        │
        ├── the winner is the closest to the
        │   reference price, from below ───────► reference-price rule
        │                                        (0.95 if n ≥ 3, 0.70 if n = 2)
        │
        └── it is not that either ─────────────► the decision turned on
                                                 something other than price (0.80)

the winner is the cheapest ────────────────────► price rule
                                                 (0.90 pre-reform,
                                                  0.70 post — ambiguous)`,
    },
    {
      heading: "Confidence, written before the results",
      body: [
        "The confidence model is the part of the system that mattered most, and the part nobody talks about. It was written **before** looking at any results, so it could not be calibrated on the wish to be right.",
        "Two principles govern it.",
        "**Confidence drops when an input is missing.** Without an estimate, the reference price cannot be computed: the ceiling falls to 0.50 however clean the other signals are. Without the category, the abnormality threshold falls back to a default, and we take a notch off.",
        "**Confidence drops when two rules predict the same thing.** The most frequent case is a winner who is simultaneously the cheapest and the closest to the reference price. Both rules yield the same winner: observation cannot separate them. The law settles it, observation does not — so the label is written, but confidence stays low and the case is flagged ambiguous.",
        "Honest confidence costs you points on results tables and earns them on decisions. It is a trade you should make consciously, once, at the start.",
      ],
      table: {
        head: ["Observed situation", "Confidence"],
        rows: [
          ["The label names the rule", "0.95"],
          ["n ≥ 3, all amounts equal, label silent", "0.85"],
          ["Winner ≠ cheapest, winner = closest to reference price, n ≥ 3", "0.95"],
          ["Same configuration, but n = 2", "0.70"],
          ["Winner dearer than an admissible bid, and not the closest either", "0.80"],
          ["Winner = cheapest = closest, post-reform", "0.70 · flagged ambiguous"],
          ["A single admissible candidate", "0.00 · undetermined"],
          ["Estimate missing", "capped at 0.50"],
          ["Category missing", "−0.10"],
        ],
      },
    },
    {
      heading: "The first pass fails",
      body: [
        "A hundred decisions, drawn from the most recent ones having a published winner, an estimate, and at least one priced admissible bid. No favourable selection: the entire population meeting those three conditions.",
        "Result: **4 cases out of 100** above the confidence threshold. Seven plainly wrong classifications. A failure, in other words.",
        "Two symmetric mistakes, and instructive ones.",
        "**A two-way tie mistaken for a rule.** Two admissible candidates had submitted exactly the same amount, a round number. The “all amounts equal” signal fired, at 0.90 confidence. Two people landing on the same round number is a coincidence. Three is a rule. The signal had no minimum count.",
        "**An explicit label ignored.** Six decisions whose procedure label literally named the rule were classified otherwise, because the tree only looked at the text as a last resort, as a weak hint. It was the other way round: when the source states the rule outright, that is the most direct signal in existence. It belongs **ahead** of the computed signals, not behind them.",
        "The design error is the same in both: I had ordered the signals by elegance — computed first, text second, because computing is more satisfying than reading — instead of ordering them by evidential strength.",
      ],
    },
    {
      heading: "Four rules, and the second pass",
      body: [
        "Four corrections, each born from a specific case that had classified badly — none from a general idea about what “should” work.",
        "**R1** — the explicit label goes first and overrides everything else. **R2** — a competition-type label combined with a winner who is not the cheapest is enough to conclude the decision did not turn on price. **R3** — the tie signal now requires three candidates. **R4** — the configuration where two rules predict the same winner has its confidence raised from 0.55 to 0.70, because the law does settle it.",
        "The result, on exactly the same hundred cases:",
        "Thirty-eight cases above threshold instead of four. All nine shared-base decisions correctly identified out of nine. **No false positives.** And mean confidence rising from 0.67 to 0.78 — without a single rule added to inflate a number.",
      ],
      table: {
        head: ["Measure", "Pass 1", "Pass 2"],
        rows: [
          ["Cases above the confidence threshold", "4 / 100", "38 / 100"],
          ["Shared-base decisions identified", "3 / 9", "9 / 9"],
          ["Plainly wrong classifications", "7", "0"],
          ["Mean confidence", "0.67", "0.78"],
        ],
      },
    },
    {
      heading: "The result I was not expecting",
      body: [
        "Seven decisions landed in a category I had not expected to see so often: the winner there is strictly dearer than an admissible candidate, and is not the closest to the reference price either. **No price rule produces that winner.** So the decision turned on something else — a technical score — while the source’s label said “on price”.",
        "These are not engine errors. They are errors **in the data**, which the engine surfaced.",
        "They count twice over, because another part of the product computed a “theoretical winner” from that label, for decisions whose outcome is not yet published. On those seven configurations it produced a wrong winner. Silently.",
        "That is the least visible benefit of this kind of work, and often the most profitable: **a model that recomputes a value becomes an audit of that value.** Run both side by side for a while before replacing one with the other — the gap between them is a list of bugs.",
      ],
    },
  ],
  takeawayHeading: "What transfers",
  takeaway: [
    "When a source gives you the outcome but not the rule, the rule is often recoverable — and recovering it beats trusting the field.",
    "A default value that looks like data is more dangerous than an empty field: it triggers nothing.",
    "Order your signals by evidential strength, not by elegance. The explicit signal goes ahead of the computed one.",
    "A minimum count is what separates a coincidence from a rule. Two points do not make a law.",
    "Write the confidence model before you look at the results, and make it drop when an input is missing.",
    "“Undetermined” has to stay a possible answer. Otherwise you are not producing knowledge, you are producing labels.",
    "An engine that recomputes existing data is an error detector for that data. The gap between the two is your bug list.",
  ],
};

const autofillFr: ArticleContent = {
  title: "Remplir un formulaire officiel sans gabarit",
  kicker: "Géométrie, induction, vérification",
  standfirst:
    "Chaque administration a sa variante du même formulaire. Maintenir un gabarit par variante est une course perdue, et elle échoue en silence. Voici comment on remplit un document qu’on n’a jamais vu — et surtout comment on vérifie qu’on ne l’a pas abîmé.",
  sections: [
    {
      heading: "Le problème n’est pas de savoir quoi écrire",
      body: [
        "Un formulaire administratif à rendre : déclaration sur l’honneur, acte d’engagement, attestation. Les valeurs à y mettre, on les a déjà — elles sont dans la base. La raison sociale, l’identifiant fiscal, le montant, la date, le nom du signataire.",
        "La difficulté est ailleurs : **où** les écrire. Chaque donneur d’ordre a sa version. Les mêmes champs, dans un ordre différent, avec des libellés différents, parfois en tableau, parfois en pleine prose, souvent scannés de travers.",
        "On n’a pas un formulaire. On a des centaines de variantes du même formulaire, et on ne les connaît pas à l’avance.",
      ],
    },
    {
      heading: "Le défaut : une table tenue à la main, qui échoue sans bruit",
      body: [
        "La première version faisait ce que tout le monde fait : une table de correspondance entre un libellé canonique et la ligne du document. Seize clés, écrites à la main.",
        "Sur un scan, la détection lisait très bien — 60 champs appariés sur 74 pour un document, 22 sur 36 pour un autre — mais elle ne rendait **aucune géométrie** : 110 champs sur 110 sans coordonnées. La position venait donc d’un tout autre étage, l’ancrage sur les lignes détectées. Et cet étage s’arrêtait sur la table de seize clés : toute clé absente était jetée par un `continue` muet.",
        "Le résultat mesuré, sur les deux documents réellement choisis par un client ce jour-là : **21 champs dans la variante, 10 posés. 23 champs, 7 posés.**",
        "Les treize clés manquantes : l’objet du marché, la qualité du représentant, la forme juridique, la banque, le type de compte, les quatre montants, le taux de TVA, le titulaire du compte, la ville, le régime de prévoyance. **Leur valeur était correcte et disponible. Elle mourait sur un `dict.get()`.**",
        "C’est le pire type de défaut : il ne lève rien, il ne journalise rien, et il rend un document qui a l’air fini.",
      ],
    },
    {
      heading: "Pourquoi agrandir la table est le mauvais réflexe",
      body: [
        "L’instinct est d’ajouter les treize clés. Ça règle la journée et ça reconduit le défaut : un contrat tenu à la main, qui échoue fermé et sans bruit dès qu’un document sort du lot connu.",
        "Un système dont la couverture dépend d’une liste écrite par un humain a une propriété désagréable : **sa qualité se dégrade avec le temps sans que rien ne le signale**, parce que le monde produit des variantes plus vite qu’on n’en ajoute.",
        "Le changement de cadre tient en une phrase : cesser de demander « quel est le libellé » et commencer à demander « **où est le blanc** ». Les libellés varient à l’infini. La forme d’un espace à remplir, beaucoup moins.",
      ],
    },
    {
      heading: "Passe A — la géométrie",
      body: [
        "On rend chaque page en image, on la donne à un modèle de vision, et on lui demande une seule chose : les zones à remplir, avec leurs coordonnées. Pas les valeurs. Pas les libellés. Les blancs.",
        "Ce n’est pas une intuition, c’est un banc. Sur un premier banc réduit — deux documents, trois répétitions, la vérité étant les zones réellement posées en production — un modèle atteignait 96,1 %, un autre 88,2 %. Le second ratait systématiquement le bloc signature de la dernière page.",
        "Sur un banc élargi — huit documents scannés, six familles de formulaires, 280 zones de référence, deux formulations de consigne — la consigne corrigée rattrape le modèle faible : il passe à **95,0 % de rappel** et devient à la fois le meilleur et le moins cher. La correction consistait en un balayage page par page, plus une passe explicite sur les blocs de fin de document — ajoutée exactement sur le défaut mesuré, pas sur une intuition.",
        "La leçon n’est pas « les modèles de vision sont bons ». C’est : **une consigne se répare sur les défauts mesurés, jamais sur l’idée qu’on se fait des défauts.**",
      ],
    },
    {
      heading: "Passe B — les blancs qui n’ont pas de forme",
      body: [
        "La géométrie attrape ce qui a une forme reconnaissable : des pointillés, une cellule, un cadre. Elle rate le reste — un blanc en pleine prose juridique, un espace après un deux-points, une valeur attendue entre deux fragments de phrase.",
        "Une génération libre (« trouve tous les champs de ce document ») est instable : mesuré, le même document a rendu zéro champ, puis treize.",
        "Ce qui la rend stable tient en trois inversions.",
        "**Le code énumère, le modèle répond.** On découpe le document en unités et on les présente une par une. Le modèle ne choisit pas ce qu’il regarde.",
        "**Une réponse par unité présentée, et le code le vérifie.** Il ne peut pas en sauter une en silence.",
        "**Il copie les ancres, il ne les paraphrase pas, et il n’invente aucune coordonnée.**",
        "Et surtout, la question posée n’est pas une liste de mots-clés mais un **test contre-factuel** : peut-on remplacer cette région par une valeur et obtenir un formulaire complété, sans altérer le texte permanent ? Une table de marqueurs, elle, se déclenche sur du texte courant — mesuré : « Cautionnement provisoire » en en-tête de colonne d’un avis produisait un faux positif. La question contre-factuelle, non.",
      ],
    },
    {
      heading: "La métrique qui compte n’est pas celle qu’on regarde",
      body: [
        "Sur 56 documents natifs et 1 783 zones de référence, la passe géométrique seule couvrait **87,3 % des zones**. Un très bon chiffre. Elle terminait **8 documents sur 46**.",
        "Avec la seconde passe : 93,7 % de couverture — six points, un gain modeste — et **33 documents sur 46 entièrement couverts**. Quatre fois plus.",
        "**Un client ne dépose pas 87 % d’un formulaire.** La métrique agrégée récompensait un progrès que personne ne pouvait utiliser, et masquait celui qui changeait tout. Depuis, la métrique de tête est le nombre de documents terminés, pas le taux de zones couvertes.",
        "C’est une question à poser à n’importe quel système : **est-ce que ma métrique est additive alors que mon livrable est binaire ?** Si oui, elle vous ment poliment depuis le début.",
      ],
    },
    {
      heading: "Ce qu’on fait du texte autour du blanc",
      body: [
        "Un blanc n’est presque jamais seul. Il est entouré de mentions entre parenthèses ou entre crochets, et chacune demande un traitement différent. Quatre catégories, rendues par le même appel que celui qui détecte le blanc :",
        "**Le blanc est avant, la mention reste imprimée.** — **La mention est elle-même la zone à remplacer.** — **La mention décrit la forme attendue, pas la valeur.** — **C’est du texte permanent, il n’y a rien à remplir.**",
        "Sans cette distinction, le programme écrit par-dessus « (localité) » sans l’effacer. Défaut mesuré sur treize documents. Ce n’est pas un détail cosmétique : un document rendu illisible à cet endroit est un document rejeté.",
      ],
    },
    {
      heading: "Vérifier le rendu, pas les intentions",
      body: [
        "Ici est la partie que je referais en premier si je recommençais.",
        "Pendant une semaine, quatre défauts graves sont sortis : un masque blanc qui effaçait des exposants, une raison sociale posée à la place d’un signataire, une valeur écrite dans le bloc d’une autre variante juridique, et une surimpression. **Les quatre ont été trouvés à l’œil.** Aucun compteur ne les voyait — parce que les compteurs lisaient la géométrie *déclarée par le programme qui écrit*, et héritaient donc exactement de ses angles morts. Mesuré un jour : 482 caractères de prose détruits pendant que les compteurs affichaient zéro.",
        "La correction est brutale et simple : **on ne fait plus confiance à ce que le programme déclare.** On rend l’original et le livrable en image, et on compare les pixels. Deux mesures : l’**érosion** — des caractères imprimés dont l’encre a disparu — et l’**encre non revendiquée** — des régions d’encre ajoutée qu’aucune zone déclarée ne couvre.",
        "Trois pièges de mesure, tous rencontrés pour de vrai.",
        "**La résolution.** À 150 points par pouce, l’anticrénelage comptait 45 caractères « altérés » là où il y en avait 2 à 300. La mesure se fait à 300, jamais moins.",
        "**La boîte n’est pas le glyphe.** Le moteur rend la boîte de la *ligne*, pas celle du caractère : un « r » qui déborde sur la ligne du dessous produisait 42 faux positifs, stables à 300, 400 et 600 points par pouce. Stables — donc crédibles, donc dangereux. La comparaison est désormais restreinte aux lignes de pixels où le caractère a réellement de l’encre.",
        "**La page tournée.** Les coordonnées du texte ne sont pas tournées, l’image l’est. Sans matrice de rotation, tout est décalé. Et une page dont les dimensions ont changé n’est **jamais** ignorée en silence : le saut muet récompense la casse, alors elle devient une violation nommée.",
        "Enfin une doctrine, qui vaut au-delà de ce module : sur un scan sans couche texte, l’érosion n’est pas mesurable — le vérificateur rend « **indisponible** », jamais un verdict favorable par défaut. Un test qui ne peut pas tourner ne doit pas passer au vert.",
      ],
    },
    {
      heading: "Le juge qui regarde, pour ce que les pixels ne voient pas",
      body: [
        "Un comptage de pixels ne voit pas un document juridiquement faux. Si la valeur est posée proprement dans le mauvais bloc, l’encre est déclarée, rien n’est effacé, tout est vert. Le document est faux quand même.",
        "D’où un second vérificateur, qui reçoit les **pages rendues en images** et la liste des placements, et cherche quatre classes de défauts : mauvais bloc, valeur qui ne correspond pas au libellé de sa ligne, surimpression, texte du formulaire effacé.",
        "Un détail de transport qui a coûté cher à comprendre : donner le même PDF en fichier plutôt qu’en image fait chuter le rappel géométrique de **83,5 % à 42,7 %**. Le modèle lit alors le texte extrait et ne *voit* pas la page. Quand ce qu’on juge est une mise en page, il faut envoyer une image — le format d’entrée n’est pas un détail d’implémentation, c’est la moitié du résultat.",
      ],
    },
    {
      heading: "Détecter qu’on a raté quelque chose, sans savoir quoi",
      body: [
        "Le défaut le plus dangereux ne se signale pas : il fait disparaître du travail en silence. Trois documents d’une même famille butaient **exactement** à 24 zones. Il a fallu croiser une référence annotée pour découvrir qu’un tableau entier n’était jamais transporté.",
        "Le signal qui aurait prédit ce défaut sans aucune référence annotée : **quatre lignes géométriquement homologues dont aucune ne porte de champ.** Peu importe ce qu’elles contiennent, peu importe leurs libellés. Une structure répétée entièrement vide est une anomalie.",
        "Ce module ne rend délibérément pas de score composite. Le précédent en rendait un, il prédisait à l’envers, et il était impossible de dire pourquoi — précisément parce qu’il mélangeait ses composantes. On expose des quantités brutes et comparables : combien de cellules éligibles, combien détectées, la couverture par ligne **et** par colonne. De quoi distinguer une ligne oubliée d’une colonne oubliée d’une table entière absente.",
        "Un score unique est confortable à afficher et inutile à déboguer.",
      ],
    },
  ],
  takeawayHeading: "Ce qui se transpose",
  takeaway: [
    "Une table de correspondance tenue à la main est une machine à échouer en silence : si votre couverture dépend d’une liste écrite par un humain, elle se dégrade sans prévenir.",
    "Remplacez « connaître le libellé » par « voir la forme ». La géométrie se généralise, les libellés non.",
    "Le code énumère, le modèle répond. C’est ce qui transforme une génération instable en une sortie vérifiable.",
    "Posez un test contre-factuel plutôt qu’une liste de mots-clés.",
    "Demandez-vous si votre métrique est additive alors que votre livrable est binaire. 87 % de zones, ce n’est pas 87 % de documents livrables.",
    "Ne mesurez jamais un rendu avec la géométrie déclarée par le programme qui l’a produit : vous héritez de ses angles morts. Rendez, et comparez des pixels.",
    "Un saut silencieux récompense la casse. Un cas non mesurable doit rendre « indisponible », jamais « conforme ».",
    "Une structure répétée entièrement vide est une anomalie, quels que soient ses libellés. C’est le seul signal qui prédit une détection ayant raté un bloc entier.",
    "Un score composite est confortable à afficher et inutile à déboguer. Exposez les composantes.",
  ],
};

const autofillEn: ArticleContent = {
  title: "Filling an official form without a template",
  kicker: "Geometry, induction, verification",
  standfirst:
    "Every authority has its own variant of the same form. Maintaining one template per variant is a race you lose, and it fails silently. Here is how you fill a document you have never seen — and above all how you check you have not damaged it.",
  sections: [
    {
      heading: "The hard part is not knowing what to write",
      body: [
        "An administrative form to submit: a sworn statement, a commitment deed, a certificate. The values that go in it you already have — they are in the database. The company name, the tax identifier, the amount, the date, the signatory’s name.",
        "The difficulty is elsewhere: **where** to write them. Every buying authority has its own version. The same fields, in a different order, under different labels, sometimes in a table, sometimes in running prose, often scanned crooked.",
        "You do not have a form. You have hundreds of variants of the same form, and you do not know them in advance.",
      ],
    },
    {
      heading: "The defect: a hand-maintained table that fails without a sound",
      body: [
        "The first version did what everyone does: a lookup table mapping a canonical label to a line in the document. Sixteen keys, written by hand.",
        "On a scan, detection read very well — 60 fields matched out of 74 on one document, 22 out of 36 on another — but it returned **no geometry at all**: 110 fields out of 110 with no coordinates. Position therefore came from an entirely different layer, anchoring onto detected lines. And that layer stopped at the sixteen-key table: any key not in it was dropped by a silent `continue`.",
        "The measured result, on the two documents a client actually chose that day: **21 fields in the variant, 10 placed. 23 fields, 7 placed.**",
        "The thirteen missing keys: the contract object, the representative’s capacity, the legal form, the bank, the account type, the four amounts, the VAT rate, the account holder, the city, the social-insurance scheme. **Their values were correct and available. They died on a `dict.get()`.**",
        "This is the worst kind of defect: it raises nothing, it logs nothing, and it returns a document that looks finished.",
      ],
    },
    {
      heading: "Why enlarging the table is the wrong instinct",
      body: [
        "The instinct is to add the thirteen keys. That fixes the day and reproduces the defect: a hand-maintained contract that fails closed and silent as soon as a document falls outside the known set.",
        "A system whose coverage depends on a human-written list has an unpleasant property: **its quality degrades over time without anything signalling it**, because the world produces variants faster than you add entries.",
        "The reframe fits in one sentence: stop asking “what is the label” and start asking “**where is the blank**”. Labels vary endlessly. The shape of a space to be filled varies far less.",
      ],
    },
    {
      heading: "Pass A — geometry",
      body: [
        "Render every page as an image, hand it to a vision model, and ask it one thing: the regions to fill, with their coordinates. Not the values. Not the labels. The blanks.",
        "This is not a hunch, it is a benchmark. On a first small benchmark — two documents, three repetitions, ground truth being the regions actually placed in production — one model reached 96.1 %, another 88.2 %. The second systematically missed the signature block on the last page.",
        "On a wider benchmark — eight scanned documents, six form families, 280 reference regions, two prompt phrasings — the corrected prompt rescues the weak model: it rises to **95.0 % recall** and becomes both the best and the cheapest. The correction was a page-by-page sweep plus an explicit pass over end-of-document blocks — added precisely on the measured defect, not on a hunch.",
        "The lesson is not “vision models are good”. It is: **a prompt gets repaired on measured defects, never on your idea of the defects.**",
      ],
    },
    {
      heading: "Pass B — the blanks with no shape",
      body: [
        "Geometry catches whatever has a recognisable shape: dotted lines, a cell, a box. It misses the rest — a blank in the middle of legal prose, a space after a colon, a value expected between two sentence fragments.",
        "Free generation (“find every field in this document”) is unstable: measured, the same document returned zero fields, then thirteen.",
        "What makes it stable comes down to three inversions.",
        "**The code enumerates, the model answers.** The document is split into units and they are presented one by one. The model does not choose what it looks at.",
        "**One answer per unit presented, and the code checks it.** It cannot silently skip one.",
        "**It copies the anchors, it does not paraphrase them, and it invents no coordinates.**",
        "Above all, the question asked is not a keyword list but a **counterfactual test**: can this region be replaced by a value to produce a completed form, without altering the permanent text? A marker table, by contrast, fires on running text — measured: a column header reading “Provisional bond” in a tender notice produced a false positive. The counterfactual question did not.",
      ],
    },
    {
      heading: "The metric that matters is not the one you watch",
      body: [
        "Across 56 native documents and 1,783 reference regions, the geometry pass alone covered **87.3 % of regions**. A very good number. It finished **8 documents out of 46**.",
        "With the second pass: 93.7 % coverage — six points, a modest gain — and **33 documents out of 46 fully covered**. Four times as many.",
        "**A client does not submit 87 % of a form.** The aggregate metric rewarded a gain nobody could use, and hid the one that changed everything. Since then the headline metric is the number of finished documents, not the share of covered regions.",
        "It is a question worth asking of any system: **is my metric additive while my deliverable is binary?** If so, it has been lying to you politely from the start.",
      ],
    },
    {
      heading: "What to do with the text around the blank",
      body: [
        "A blank is almost never alone. It is surrounded by notes in brackets or parentheses, and each calls for different handling. Four categories, returned by the same call that detects the blank:",
        "**The blank comes first, the note stays printed.** — **The note itself is the region to replace.** — **The note describes the expected format, not the value.** — **It is permanent text, nothing to fill.**",
        "Without that distinction the program writes over “(town)” without erasing it. Measured on thirteen documents. This is not cosmetic: a document made illegible at that spot is a rejected document.",
      ],
    },
    {
      heading: "Verify the render, not the intentions",
      body: [
        "This is the part I would do first if I started again.",
        "Over one week, four serious defects surfaced: a white mask erasing superscripts, a company name placed where the signatory belonged, a value written into the block of a different legal variant, and an overprint. **All four were found by eye.** No counter saw them — because the counters read the geometry *declared by the program doing the writing*, and therefore inherited exactly its blind spots. Measured one day: 482 characters of prose destroyed while the counters showed zero.",
        "The fix is blunt and simple: **stop trusting what the program declares.** Render the original and the deliverable as images, and compare pixels. Two measures: **erosion** — printed characters whose ink has vanished — and **unclaimed ink** — regions of added ink that no declared region covers.",
        "Three measurement traps, all met for real.",
        "**Resolution.** At 150 dots per inch, anti-aliasing counted 45 “altered” characters where there were 2 at 300. Measurement happens at 300, never lower.",
        "**The box is not the glyph.** The engine returns the *line* box, not the character’s: an “r” overflowing onto the line below produced 42 false positives, stable at 300, 400 and 600 dpi. Stable — therefore credible, therefore dangerous. The comparison is now restricted to the pixel rows where the character actually has ink.",
        "**The rotated page.** Text coordinates are not rotated, the image is. Without a rotation matrix everything is offset. And a page whose dimensions changed is **never** skipped silently: a silent skip rewards breakage, so it becomes a named violation.",
        "Finally a doctrine that reaches beyond this module: on a scan with no text layer, erosion is not measurable — the verifier returns “**unavailable**”, never a favourable verdict by default. A test that cannot run must not go green.",
      ],
    },
    {
      heading: "The judge that looks, for what pixels cannot see",
      body: [
        "A pixel count does not see a legally wrong document. If the value is placed cleanly in the wrong block, the ink is declared, nothing is erased, everything is green. The document is wrong all the same.",
        "Hence a second verifier, which receives the **pages rendered as images** and the list of placements, and looks for four defect classes: wrong block, value that does not match its line’s label, overprint, erased form text.",
        "One transport detail that took a while to understand: handing the same PDF as a file rather than as an image drops geometric recall from **83.5 % to 42.7 %**. The model then reads extracted text and does not *see* the page. When what you are judging is a layout, you have to send an image — the input format is not an implementation detail, it is half the result.",
      ],
    },
    {
      heading: "Detecting that you missed something, without knowing what",
      body: [
        "The most dangerous defect does not announce itself: it makes work disappear silently. Three documents from the same family stopped at **exactly** 24 regions. It took cross-checking an annotated reference to discover an entire table was never carried through.",
        "The signal that would have predicted that defect with no annotated reference: **four geometrically homologous rows, none of which carries a field.** Whatever they contain, whatever their labels. A repeated structure that is entirely empty is an anomaly.",
        "This module deliberately returns no composite score. The previous one did, it predicted backwards, and it was impossible to say why — precisely because it blended its components. What is exposed instead are raw, comparable quantities: how many eligible cells, how many detected, coverage by row **and** by column. Enough to tell a missed row from a missed column from an entirely absent table.",
        "A single score is comfortable to display and useless to debug.",
      ],
    },
  ],
  takeawayHeading: "What transfers",
  takeaway: [
    "A hand-maintained lookup table is a machine for failing silently: if your coverage depends on a human-written list, it degrades without warning.",
    "Replace “know the label” with “see the shape”. Geometry generalises, labels do not.",
    "The code enumerates, the model answers. That is what turns unstable generation into verifiable output.",
    "Ask a counterfactual question rather than supplying a keyword list.",
    "Ask whether your metric is additive while your deliverable is binary. 87 % of regions is not 87 % of deliverable documents.",
    "Never measure a render using the geometry declared by the program that produced it: you inherit its blind spots. Render, and compare pixels.",
    "A silent skip rewards breakage. A case that cannot be measured must return “unavailable”, never “compliant”.",
    "A repeated structure that is entirely empty is an anomaly, whatever its labels. It is the one signal that predicts a detector having missed a whole block.",
    "A composite score is comfortable to display and useless to debug. Expose the components.",
  ],
};

export const articles: Article[] = [
  {
    slug: "inference-inverse",
    published: true,
    date: "2026-09-05",
    minutes: 9,
    tags: ["Inférence", "PostgreSQL", "Qualité des données", "Modèle de confiance"],
    fr: inferenceFr,
    en: inferenceEn,
  },
  {
    slug: "formulaire-sans-gabarit",
    published: true,
    date: "2026-09-05",
    minutes: 11,
    tags: ["Vision", "OCR", "Géométrie", "Vérification", "Évaluation"],
    fr: autofillFr,
    en: autofillEn,
  },
];

export const publishedArticles = articles.filter((a) => a.published);

export function getArticle(slug: string): Article | undefined {
  return publishedArticles.find((a) => a.slug === slug);
}
