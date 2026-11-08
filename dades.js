// Una entrada per compositor. id = el que va al QR (escolta/?c=<id>, després /escolta/<id>).
// Àudio: només PD / CC0 / CC-BY. Sempre font + llicència + intèrpret (es mostren a la pàgina). Fitxers propis a audio/ (copiats de Wikimedia Commons).
// obres[0] = l'obra de la peana (reproductor gran); la resta = «Altres obres».
// sense_audio: true = no hi ha cap gravació lliure (obres: []); la pàgina mostra un avís en lloc del reproductor.
const EPOQUES = {
  "Edat Mitjana": "#6b8f71", "Renaixement": "#5b7db1", "Barroc": "#c9a227",
  "Classicisme": "#b56576", "Romanticisme": "#8e5ea2", "Segle XX": "#3d9fa0",
};
// Lletra de cada època (Google Fonts), triada perquè es llegeixi bé a 1r ESO.
const LLETRES = {
  "Edat Mitjana": "'Uncial Antiqua'", "Renaixement": "'IM Fell English SC'", "Barroc": "'Cormorant Garamond'",
  "Classicisme": "Cinzel", "Romanticisme": "'Abril Fatface'", "Segle XX": "'Bebas Neue'",
};
// Fons de cada sala: img/fons/<slug>.jpg (sortits de img/fons/fons-3x3.png).
const fons = e => `img/fons/${e.toLowerCase().replace(/ /g, "-")}.jpg`;
// Banderes del país on va néixer (país d'avui), dibuixades amb CSS: no cal cap imatge.
const BANDERES = {
  de: "linear-gradient(#000 33.3%, #dd0000 0 66.6%, #ffce00 0)",
  it: "linear-gradient(90deg, #009246 33.3%, #fff 0 66.6%, #ce2b37 0)",
  es: "linear-gradient(#aa151b 25%, #f1bf00 0 75%, #aa151b 0)",
  // Senyera valenciana: franja blava + quatre barres (la corona, simplificada a la franja).
  val: "linear-gradient(90deg, #0d3b8c 22%, #0000 0), repeating-linear-gradient(#fcdd09 0 11.1%, #da121a 0 22.2%)",
  cat: "repeating-linear-gradient(#fcdd09 0 11.1%, #da121a 0 22.2%)",  // senyera: 5 grogues, 4 vermelles
  at: "linear-gradient(#c8102e 33.3%, #fff 0 66.6%, #c8102e 0)",
  pl: "linear-gradient(#fff 50%, #dc143c 0)",
  fr: "linear-gradient(90deg, #002395 33.3%, #fff 0 66.6%, #ed2939 0)",
  // Union Jack simplificada: creus sense diagonals (a la mida d'una bandereta no es nota).
  // Anglaterra (creu de sant Jordi): Dowland probablement va néixer a Londres
  eng: "linear-gradient(#0000 40%, #ce1124 0 60%, #0000 0), linear-gradient(90deg, #0000 43%, #ce1124 0 57%, #0000 0), #fff",
  // Mallorca: senyera amb el quarter morat (el castell no es veu a aquesta mida)
  mall: "linear-gradient(90deg, #6b2c91 0 38%, #0000 0) top left / 100% 56% no-repeat, repeating-linear-gradient(#fcdd09 0 11.1%, #da121a 0 22.2%)",
};
const ANYS = {
  "Edat Mitjana": "500 – 1400", "Renaixement": "1400 – 1600", "Barroc": "1600 – 1750",
  "Classicisme": "1750 – 1820", "Romanticisme": "1820 – 1900", "Segle XX": "1900 – avui",
};
// Vestit de La Pauta per època (img/pauta-<vestit>-escolta.png i -idea.png). Sense vestit: base.
const PAUTA = {};

const COMPOSITORS = {
  bach: {
    nom: "Johann Sebastian Bach",
    epoca: "Barroc",
    dates: "1685 – 1750",
    lloc: "Eisenach · Leipzig (Alemanya)",
    pais: "de",
    qui: "Organista d’església i pare de 20 fills. Cada setmana havia d’escriure música nova per a la missa del diumenge!",
    pistes: [
      { titol: "Tocata", text: "comença com una explosió: notes ràpides i acords enormes." },
      { titol: "Fuga", text: "un tema curt passa d’una veu a una altra, com una pilota." },
    ],
    curiositat: "Ningú no ho sap del cert: alguns musicòlegs pensen que aquesta obra potser no la va escriure Bach!",
    obres: [
      {
        titol: "Tocata i fuga en re menor",
        interpret: "Norbert Schenk, orgue",
        src: "audio/Bach__Toccata_und_Fuge_d-moll_BWV_565__Norbert_Schenk.mp3",
        llicencia: "CC BY 4.0",
        font: "https://commons.wikimedia.org/wiki/File:Bach,_Toccata_und_Fuge_d-moll_BWV_565,_Norbert_Schenk.mp3",
      },
      {
        titol: "Ària (Suite núm. 3)",
        interpret: "Air Force Strings, orquestra de corda",
        src: "audio/Air_-_Air_Force_Strings_-_United_States_Air_Force_Band.mp3",
        llicencia: "Domini públic",
        font: "https://commons.wikimedia.org/wiki/File:Air_-_Air_Force_Strings_-_United_States_Air_Force_Band.mp3",
      },
      {
        titol: "Preludi de la Suite per a violoncel núm. 1",
        interpret: "Pau Casals, violoncel",
        src: "audio/Bach_-_Cello_Suite_no._1_in_G_major__BWV_1007_-_I._Pr_lude.mp3",
        llicencia: "Domini públic",
        font: "https://commons.wikimedia.org/wiki/File:Bach_-_Cello_Suite_no._1_in_G_major,_BWV_1007_-_I._Pr%C3%A9lude.ogg",
      },
    ],
  },
  vivaldi: {
    nom: "Antonio Vivaldi",
    epoca: "Barroc",
    dates: "1678 – 1741",
    lloc: "Venècia (Itàlia)",
    pais: "it",
    qui: "Capellà pèl-roig de Venècia. Ensenyava música a les noies d’un orfenat, que es van fer famoses tocant.",
    pistes: [
      { titol: "Tutti", text: "tota l’orquestra toca junta el tema alegre de la primavera." },
      { titol: "Solo", text: "un violí sol imita els ocells que canten." },
    ],
    curiositat: "Cada estació porta un poema: ocells, tempestes… i fins i tot un gos que borda!",
    obres: [
      {
        titol: "La primavera (1r moviment)",
        interpret: "Modena Chamber Orchestra, corda",
        src: "audio/The_Modena_Chamber_Orchestra_-_Vivaldi_s_Spring__RV_269_-_I._Allegro.mp3",
        llicencia: "Domini públic",
        font: "https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Spring,_RV_269_-_I._Allegro.ogg",
      },
      {
        titol: "L’hivern",
        interpret: "Modena Chamber Orchestra",
        src: "audio/The_Modena_Chamber_Orchestra_-_Vivaldi_s_Winter__RV_297_-_II._Largo.mp3",
        llicencia: "Domini públic",
        font: "https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Winter,_RV_297_-_II._Largo.ogg",
      },
      {
        titol: "La tempesta d’estiu",
        interpret: "Modena Chamber Orchestra",
        src: "audio/The_Modena_Chamber_Orchestra_-_Vivaldi_s_Summer__RV_315_-_III._Presto.mp3",
        llicencia: "Domini públic",
        font: "https://commons.wikimedia.org/wiki/File:The_Modena_Chamber_Orchestra_-_Vivaldi%27s_Summer,_RV_315_-_III._Presto.ogg",
      },
    ],
  },
  cabanilles: {
    nom: "Joan Cabanilles",
    epoca: "Barroc",
    dates: "1644 – 1712",
    lloc: "Algemesí · València",
    pais: ["es", "val"],  // país d’avui + la seva terra
    qui: "Va néixer a Algemesí i va ser organista de la catedral de València gairebé 50 anys. És el gran compositor d’orgue del seu temps.",
    pistes: [
      { titol: "Tiento", text: "el compositor «tempteja» (prova) tot el que pot fer l’orgue." },
      { titol: "Veus", text: "escolta com entren les melodies una darrere l’altra." },
    ],
    curiositat: "Els orgues espanyols tenen tubs horitzontals, com canons, que sonen com trompetes. A les «batalles», Cabanilles els feia servir per imitar una guerra!",
    obres: [
      {
        titol: "Tiento de primer to",
        interpret: "Ashtar Moïra, orgue",
        src: "audio/Cabaniles_Tiento.mp3",
        llicencia: "Domini públic",
        font: "https://commons.wikimedia.org/wiki/File:Cabaniles_Tiento.ogg",
      },
    ],
  },
  guido: {
    "nom": "Guido d’Arezzo",
    "epoca": "Edat Mitjana",
    "dates": "c. 991 – 1033",
    "lloc": "Arezzo · Pomposa (Itàlia)",
    "pais": "it",
    "qui": "Monjo i mestre de cantants. Estava fart que els nois trigressin mesos a aprendre els cants, i va inventar trucs perquè ho fessin en dies.",
    "pistes": [
      {
        "titol": "Ut, re, mi…",
        "text": "cada frase de l’himne comença una nota més amunt: escolta com puja l’escala."
      },
      {
        "titol": "Nom de les notes",
        "text": "les primeres síl·labes de cada vers són els noms de les notes que fem servir avui."
      }
    ],
    "curiositat": "Va treure el nom de les notes d’aquest himne a sant Joan: ut, re, mi, fa, sol, la. Més tard, «ut» es va canviar per «do», que es canta més fàcil.",
    "obres": [
      {
        "titol": "Ut queant laxis (himne a sant Joan)",
        "interpret": "Membeth, veu (cant gregorià)",
        "src": "audio/Johannes.Hymnus.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Johannes.Hymnus.ogg"
      }
    ]
  },
  hildegard: {
    "nom": "Hildegard von Bingen",
    "epoca": "Edat Mitjana",
    "dates": "1098 – 1179",
    "lloc": "Bingen (Alemanya)",
    "pais": "de",
    "qui": "Abadessa d’un monestir, escriptora, metgessa i compositora. Deia que la seva música li arribava en visions.",
    "pistes": [
      {
        "titol": "Monodia",
        "text": "una sola melodia, sense acompanyament: totes les veus canten el mateix."
      },
      {
        "titol": "Melisma",
        "text": "escolta com una sola síl·laba s’allarga sobre moltes notes, com un riu."
      }
    ],
    "curiositat": "També va inventar una llengua secreta, amb paraules i alfabet propis, la «lingua ignota».",
    "obres": [
      {
        "titol": "O frondens virga",
        "interpret": "Makemi, veu",
        "src": "audio/O_frondens_2.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:O_frondens_2.ogg"
      }
    ]
  },
  sibilla: {
    "nom": "Cant de la Sibil·la",
    "epoca": "Edat Mitjana",
    "dates": "tradició medieval",
    "lloc": "Mallorca",
    "pais": ["es", "mall"],
    "qui": "No té un sol autor: és un cant medieval que anuncia el final del món. A Mallorca s’ha cantat cada Nit de Nadal durant segles, sense parar mai.",
    "pistes": [
      {
        "titol": "Veu solista",
        "text": "una sola veu, sovint d’un nen o una nena, canta tota la història."
      },
      {
        "titol": "Estrofa i interludi",
        "text": "entre estrofa i estrofa, l’orgue fa una petita música que deixa respirar."
      }
    ],
    "curiositat": "La persona que canta porta una espasa aixecada a les mans. Des del 2010 la UNESCO el protegeix com a patrimoni de tota la humanitat.",
    "obres": [],
    "sense_audio": true
  },
  josquin: {
    "nom": "Josquin des Prez",
    "epoca": "Renaixement",
    "dates": "c. 1450 – 1521",
    "lloc": "Hainaut (França) · Itàlia",
    "pais": "fr",
    "qui": "El compositor més famós del seu temps. Va treballar per a reis, ducs i fins i tot per al papa a Roma.",
    "pistes": [
      {
        "titol": "Polifonia",
        "text": "diverses veus canten melodies diferents alhora, i totes encaixen."
      },
      {
        "titol": "Imitació",
        "text": "una veu canta una frase i les altres la repeteixen després, com un eco."
      }
    ],
    "curiositat": "Martí Luter va dir que Josquin era «el mestre de les notes»: les notes feien el que ell volia.",
    "obres": [
      {
        "titol": "Mille regretz",
        "interpret": "Collegium Vocale Bydgoszcz, cor",
        "src": "audio/Josquin_Desprez_--_Mille_regretz.mp3",
        "llicencia": "CC BY 3.0",
        "font": "https://commons.wikimedia.org/wiki/File:Josquin_Desprez_--_Mille_regretz.opus"
      }
    ]
  },
  dowland: {
    "nom": "John Dowland",
    "epoca": "Renaixement",
    "dates": "1563 – 1626",
    "lloc": "Anglaterra · Dinamarca",
    "pais": "eng",
    "qui": "El millor llaütista d’Europa. Va tocar per al rei de Dinamarca, però somiava treballar per a la reina d’Anglaterra.",
    "pistes": [
      {
        "titol": "Melodia acompanyada",
        "text": "una veu canta la melodia i un instrument l’acompanya per sota."
      },
      {
        "titol": "Llaüt",
        "text": "escolta l’instrument de cordes pinçades, avi de la guitarra."
      }
    ],
    "curiositat": "Li agradava tant la música trista que signava «Semper Dowland, semper dolens»: sempre Dowland, sempre trist.",
    "obres": [
      {
        "titol": "Flow, my tears (Flueixin les meves llàgrimes)",
        "interpret": "Makemi, soprano i llaüt",
        "src": "audio/Flow__my_tears.mp3",
        "llicencia": "CC BY 2.5",
        "font": "https://commons.wikimedia.org/wiki/File:Flow,_my_tears.ogg"
      },
      {
        "titol": "Can she excuse my wrongs?",
        "interpret": "Collegium Vocale Bydgoszcz, cor",
        "src": "audio/John_Dowland_--_Can_she_excuse_my_wrongs-.mp3",
        "llicencia": "CC BY 3.0",
        "font": "https://commons.wikimedia.org/wiki/File:John_Dowland_--_Can_she_excuse_my_wrongs-.opus"
      }
    ]
  },
  fletxa: {
    "nom": "Mateu Fletxa el Vell",
    "epoca": "Renaixement",
    "dates": "c. 1481 – 1553",
    "lloc": "Prades · Poblet",
    "pais": [
      "es",
      "cat"
    ],
    "qui": "Va néixer a Prades i va ser mestre de música de les infantes a la cort. És famós per les «ensalades»: cançons on es barreja de tot.",
    "pistes": [
      {
        "titol": "Música descriptiva",
        "text": "les veus imiten sons i escenes: crits, sorolls, una història que es veu."
      },
      {
        "titol": "Veus",
        "text": "escolta com dialoguen les veus, com en una petita obra de teatre."
      }
    ],
    "curiositat": "No es conserva cap retrat seu: no sabem quina cara feia! Les seves ensalades les va publicar el seu nebot, també músic.",
    "obres": [
      {
        "titol": "Teresica hermana",
        "interpret": "Collegium Vocale Bydgoszcz, cor",
        "src": "audio/Mateo_Flecha_--_Teresica_hermana.mp3",
        "llicencia": "CC BY 3.0",
        "font": "https://commons.wikimedia.org/wiki/File:Mateo_Flecha_--_Teresica_hermana.opus"
      }
    ]
  },
  haydn: {
    "nom": "Joseph Haydn",
    "epoca": "Classicisme",
    "dates": "1732 – 1809",
    "lloc": "Rohrau · Viena · Esterháza",
    "pais": "at",
    "qui": "El «pare de la simfonia»: en va escriure més de cent per a un príncep.",
    "pistes": [
      {
        "titol": "Dinàmica",
        "text": "la melodia comença molt fluixet, gairebé de puntetes…"
      },
      {
        "titol": "El cop fort",
        "text": "…i de cop, tota l’orquestra fa un acord fortíssim. Estigues atent!"
      }
    ],
    "curiositat": "Diuen que va posar el cop de timbal per despertar el públic que s’adormia als concerts!",
    "obres": [
      {
        "titol": "Simfonia de la sorpresa (2n moviment)",
        "interpret": "Boston Symphony Orchestra, orquestra",
        "src": "audio/Haydn__Symphony_No._94__Surprise__2._Andante.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Haydn;_Symphony_No._94_%22Surprise%22,_2._Andante.ogg"
      },
      {
        "titol": "Simfonia de la sorpresa (1r moviment)",
        "interpret": "Boston Symphony Orchestra, orquestra",
        "src": "audio/Haydn__Symphony_No._94__Surprise__1._Adagio___Vivace_assai.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Haydn;_Symphony_No._94_%22Surprise%22,_1._Adagio_%E2%80%93_Vivace_assai.ogg"
      }
    ]
  },
  mozart: {
    "nom": "Wolfgang Amadeus Mozart",
    "epoca": "Classicisme",
    "dates": "1756 – 1791",
    "lloc": "Salzburg · Viena",
    "pais": "at",
    "qui": "Un nen prodigi: als 5 anys ja componia i als 6 tocava per a reis de tot Europa. Va escriure més de 600 obres!",
    "pistes": [
      {
        "titol": "Frase",
        "text": "la melodia es divideix en frases com una pregunta i una resposta."
      },
      {
        "titol": "Forma",
        "text": "el tema del principi torna més endavant: reconeix-lo!"
      }
    ],
    "curiositat": "Va escriure aquesta serenata el 1787, però no es va publicar fins molts anys després de morir. Avui és una de les músiques més conegudes del món.",
    "obres": [
      {
        "titol": "Petita serenata nocturna (1r moviment)",
        "interpret": "Orquestra de corda (Musopen)",
        "src": "audio/Mozart_K525_Serenade_in_G_Major_1_-_Allegro.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Mozart_K525_Serenade_in_G_Major_1_-_Allegro.ogg"
      },
      {
        "titol": "Petita serenata nocturna (Romança)",
        "interpret": "Orquestra de corda (Musopen)",
        "src": "audio/Mozart_-_Serenade_No._13_for_strings_in_G_major__K._525_-_Romanze.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Mozart_-_Serenade_No._13_for_strings_in_G_major,_K._525_-_Romanze.ogg"
      }
    ]
  },
  martin: {
    "nom": "Vicent Martín i Soler",
    "epoca": "Classicisme",
    "dates": "1754 – 1806",
    "lloc": "València · Viena · Sant Petersburg",
    "pais": [
      "es",
      "val"
    ],
    "qui": "Valencià que va triomfar a Viena i a Sant Petersburg escrivint òperes. Va ser amic i rival de Mozart.",
    "pistes": [
      {
        "titol": "Melodia",
        "text": "melodies fàcils de recordar que tothom taral·lejava pel carrer."
      },
      {
        "titol": "Òpera",
        "text": "una història cantada: cada personatge té la seva ària."
      }
    ],
    "curiositat": "La seva òpera «Una cosa rara» va tenir més èxit a Viena que «Les noces de Fígaro» de Mozart. Mozart, divertit, va posar-ne una melodia dins el seu «Don Giovanni».",
    "obres": [],
    "sense_audio": true
  },
  beethoven: {
    "nom": "Ludwig van Beethoven",
    "epoca": "Romanticisme",
    "dates": "1770 – 1827",
    "lloc": "Bonn · Viena",
    "pais": "de",
    "qui": "Pianista genial i caràcter fort. Es va quedar sord i, tot i així, va seguir component obres immenses.",
    "pistes": [
      {
        "titol": "Motiu",
        "text": "quatre notes: ta-ta-ta-taaam. Tota la simfonia es construeix amb aquest «maó»."
      },
      {
        "titol": "Ritme",
        "text": "compta quantes vegades torna el ta-ta-ta-taaam, de mil maneres diferents."
      }
    ],
    "curiositat": "A la Segona Guerra Mundial, el ta-ta-ta-taaam (curt-curt-curt-llarg) era la lletra V de «victòria» en codi Morse, i la ràdio el feia sonar com a senyal.",
    "obres": [
      {
        "titol": "Simfonia núm. 5 (1r moviment)",
        "interpret": "Skidmore College Orchestra",
        "src": "audio/Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor__op._67_-_i._allegro_con_brio.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor,_op._67_-_i._allegro_con_brio.ogg"
      },
      {
        "titol": "Simfonia núm. 5 (3r moviment)",
        "interpret": "Skidmore College Orchestra",
        "src": "audio/Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor__op._67_-_iii._allegro.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Ludwig_van_Beethoven_-_symphony_no._5_in_c_minor,_op._67_-_iii._allegro.ogg"
      }
    ]
  },
  chopin: {
    "nom": "Frédéric Chopin",
    "epoca": "Romanticisme",
    "dates": "1810 – 1849",
    "lloc": "Polònia · París · Valldemossa",
    "pais": "pl",
    "qui": "El «poeta del piano»: gairebé tota la seva música és per a piano. Va marxar de Polònia de jove i ja no hi va tornar mai.",
    "pistes": [
      {
        "titol": "Tempo",
        "text": "la melodia va tranquil·la, com una cançó de nit."
      },
      {
        "titol": "Rubato",
        "text": "el pianista «roba» temps: s’atura i corre una mica, com qui parla emocionat."
      }
    ],
    "curiositat": "L’hivern de 1838 va viure a la Cartoixa de Valldemossa, a Mallorca. Diuen que el soroll de la pluja que gotejava li va inspirar el preludi de la «gota d’aigua».",
    "obres": [
      {
        "titol": "Nocturn op. 9 núm. 2",
        "interpret": "Frank Levy, piano",
        "src": "audio/Chopin_-_Nocturne_No._2_in_E-flat_major__Op._9_No._2__Frank_Levy_.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Chopin_-_Nocturne_No._2_in_E-flat_major,_Op._9_No._2_(Frank_Levy).flac"
      },
      {
        "titol": "Nocturn op. 9 núm. 1",
        "interpret": "Olga Gurevich, piano",
        "src": "audio/Chopin_-_Nocturne_No._1_in_B-flat_minor__Op._9_No._1__Olga_Gurevich_.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Chopin_-_Nocturne_No._1_in_B-flat_minor,_Op._9_No._1_(Olga_Gurevich).flac"
      }
    ]
  },
  tarrega: {
    "nom": "Francesc Tàrrega",
    "epoca": "Romanticisme",
    "dates": "1852 – 1909",
    "lloc": "Vila-real · Barcelona",
    "pais": [
      "es",
      "val"
    ],
    "qui": "Nascut a Vila-real, va convertir la guitarra en un instrument de concert. És el pare de la guitarra clàssica moderna.",
    "pistes": [
      {
        "titol": "Guitarra",
        "text": "escolta tots els colors que treu d’un sol instrument de sis cordes."
      },
      {
        "titol": "Vals",
        "text": "compta 1-2-3, 1-2-3: és un ball en tres temps, com els de Viena."
      }
    ],
    "curiositat": "Un trosset del seu «Gran Vals» es va convertir en la melodia dels mòbils Nokia: potser l’han sentit milions de vegades sense saber que era seva!",
    "obres": [
      {
        "titol": "Gran Vals",
        "interpret": "Joni Ikäläinen, guitarra",
        "src": "audio/Francisco_T_rrega_-_Gran_Vals.mp3",
        "llicencia": "CC0",
        "font": "https://commons.wikimedia.org/wiki/File:Francisco_T%C3%A1rrega_-_Gran_Vals.ogg"
      },
      {
        "titol": "Capricho árabe",
        "interpret": "Agustín Barrios, guitarra (1928)",
        "src": "audio/Capricho__rabe_F_Tarrega_Agust_n_Barrios_2475e_17-04-28_Ode_n_202-A__ySZzZPVtSVo_.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Capricho_%C3%A1rabe_F_Tarrega_Agust%C3%ADn_Barrios_2475e_17-04-28_Ode%C3%B3n_202-A_(ySZzZPVtSVo).ogg"
      }
    ]
  },
  debussy: {
    "nom": "Claude Debussy",
    "epoca": "Segle XX",
    "dates": "1862 – 1918",
    "lloc": "París (França)",
    "pais": "fr",
    "qui": "Músic parisenc que pintava amb sons, com els pintors impressionistes pintaven amb llum.",
    "pistes": [
      {
        "titol": "Colors",
        "text": "escolta com els acords es fonen com una boira de colors."
      },
      {
        "titol": "Pentatònica",
        "text": "Debussy fa servir escales de cinc notes, com les tecles negres del piano."
      }
    ],
    "curiositat": "A l’Exposició Universal de París de 1889 va sentir un gamelan de Java (una orquestra de gongs) i li va canviar la manera de fer música.",
    "obres": [
      {
        "titol": "Clar de lluna",
        "interpret": "Laurens Goedhart, piano",
        "src": "audio/Clair_de_lune__Claude_Debussy__Suite_bergamasque.mp3",
        "llicencia": "CC BY 3.0",
        "font": "https://commons.wikimedia.org/wiki/File:Clair_de_lune_(Claude_Debussy)_Suite_bergamasque.ogg"
      }
    ]
  },
  schoenberg: {
    "nom": "Arnold Schönberg",
    "epoca": "Segle XX",
    "dates": "1874 – 1951",
    "lloc": "Viena · Califòrnia",
    "pais": "at",
    "qui": "Va trencar les regles de sempre i va inventar una manera nova de compondre. Va fugir dels nazis i va acabar fent classes a Califòrnia.",
    "pistes": [
      {
        "titol": "Atonalitat",
        "text": "la música no té una nota «casa» on tornar a descansar."
      },
      {
        "titol": "Sèrie de 12 notes",
        "text": "fa servir les 12 notes de l’octava en un ordre fix, sense repetir-ne cap."
      }
    ],
    "curiositat": "Amb la sèrie dodecafònica, cap de les 12 notes no pot tornar a sonar fins que han sonat totes les altres: totes són igual d’importants.",
    "obres": [],
    "sense_audio": true
  },
  albeniz: {
    "nom": "Isaac Albéniz",
    "epoca": "Segle XX",
    "dates": "1860 – 1909",
    "lloc": "Camprodon · París",
    "pais": [
      "es",
      "cat"
    ],
    "qui": "Nen prodigi del piano nascut a Camprodon. Va viatjar per mig món fent concerts i va acabar vivint a París.",
    "pistes": [
      {
        "titol": "Escales",
        "text": "escolta les escales i els girs que sonen a música andalusa."
      },
      {
        "titol": "Música espanyola",
        "text": "el piano imita la guitarra: notes repetides i acords rasgats."
      }
    ],
    "curiositat": "«Astúries» es va escriure per a piano, però avui és molt més famosa tocada a la guitarra.",
    "obres": [
      {
        "titol": "Astúries (Llegenda)",
        "interpret": "Musopen (intèrpret sense nom)",
        "src": "audio/Isaac_Albeniz_-_suite_espanola_op._47_-_leyenda.mp3",
        "llicencia": "Domini públic",
        "font": "https://commons.wikimedia.org/wiki/File:Isaac_Albeniz_-_suite_espanola_op._47_-_leyenda.ogg"
      },
      {
        "titol": "Rondeña (Iberia)",
        "interpret": "La Pianista, piano",
        "src": "audio/Alb_niz_-_Ronde_a_from_Iberia.mp3",
        "llicencia": "CC0",
        "font": "https://commons.wikimedia.org/wiki/File:Alb%C3%A9niz_-_Ronde%C3%B1a_from_Iberia.ogg"
      }
    ]
  },
};
