import type { LocaleContent } from './types';

/** Luganda product and glossary text. Needs review by a native speaker before launch. */

const SOURCE_NOTE =
  'Obubaka obw’ekyokulabirako obwakolebwa ku lwa pulojekiti ya InsurGuide. Tebwogera ku yinsuwa ya ddala, era emiwendo gyonna gya kulabirako.';

const CONTACT_NOTE =
  'Eno yinsuwa ya kyokulabirako, n’olwekyo tewali kampuni ya yinsuwa ya ddala gy’oyinza kutuukirira. Ku yinsuwa ya ddala, funa engeri y’okutuukirira okuva mu makubo amatongole aga kampuni ya yinsuwa oba okuva ku mukozi wa yinsuwa oba bulooka alina layisinsi.';

export const lgContent: LocaleContent = {
  products: {
    'boda-inpatient-basic': {
      insurer: 'Kampuni ya Yinsuwa ey’Ekyokulabirako A (si ya ddala)',
      tagline: 'Yinsuwa y’eddwaliro ey’ebbeeyi entono eri abavuzi abeetaaga okukuumibwa ku bbiiru ennene ez’okusula mu ddwaliro.',
      coverageSummary:
        'Esasulira okusula mu ddwaliro okutuuka ku kkomo ly’omwaka. Tesasulira kugenda ku kalwaliro n’oddayo eka ku lunaku lwe lumu.',
      coverage: {
        inpatient: 'Okusula mu ddwaliro, ekitanda, okulongoosebwa n’eddagala eriweebwa mu ddwaliro.',
        outpatient: 'Okugenda ku kalwaliro n’eddagala ly’ogula tebirimu.',
        maternity: null,
        dental: null,
        optical: null,
      },
      coveredServices: [
        'Okusula mu ddwaliro mu waadi eya bulijjo',
        'Okulongoosebwa ng’osuze mu ddwaliro',
        'Eddagala n’okukeberebwa ng’osuze mu ddwaliro',
        'Obujjanjabi obw’amangu obukuviirako okusula mu ddwaliro',
      ],
      benefitLimits: [{ label: 'Omugatte gw’okusula mu ddwaliro' }, { label: 'Ekitanda mu waadi' }],
      exclusions: [
        'Okugenda ku kalwaliro n’eddagala ly’ogula okukozesa awaka',
        'Okulumizibwa ng’ovuga nga tolina pamiti ya kuvuga entuufu',
        'Endwadde z’obadde nazo nga tonneegatta, mu mwaka ogusooka',
        'Obujjanjabi obw’okulongoosa endabika',
      ],
      waitingPeriods: [
        { appliesTo: 'Okusula mu ddwaliro olw’obulwadde', duration: 'Ennaku 30' },
        { appliesTo: 'Endwadde z’obadde nazo', duration: 'Emyezi 12' },
        { appliesTo: 'Obubenje', duration: 'Tewali kulinda' },
      ],
      eligibility: ['Emyaka 18 okutuuka ku 60', 'Alina pamiti ya kuvuga entuufu (eri abavuzi)'],
      premiumBasis: 'buli muntu',
      enrolmentRequirements: [
        'Jjuza foomu entongole ey’okusaba eya kampuni ya yinsuwa',
        'Sasula ssente za yinsuwa ezisooka ng’oyita mu kkubo erikkirizibwa',
      ],
      requiredDocuments: ['Endagamuntu', 'Pamiti ya kuvuga (bw’oba ovuga)', 'Ekifaananyi kimu ekya paasipooti'],
      enrolmentSteps: ['Buuza oba siteegi yo eya bodaboda oba SACCO yo erina enteekateeka y’ekibiina erimu obukwakkulizo obulungi.'],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'family-starter': {
      insurer: 'Kampuni ya Yinsuwa ey’Ekyokulabirako B (si ya ddala)',
      tagline: 'Yinsuwa ey’awamu ey’okusula mu ddwaliro n’obujjanjabi obw’okuddayo eka eri amaka, nga mw’otwalidde eby’okuzaala.',
      coverageSummary:
        'Ekuuma amaka ag’abantu okutuuka ku bana ku kusula mu ddwaliro n’okugenda ku kalwaliro, n’ekkomo ly’omwaka erigabanyizibwa. Erimu eby’okuzaala oluvannyuma lw’ekiseera eky’okulinda.',
      coverage: {
        inpatient: 'Okusula mu ddwaliro, okulongoosebwa n’eddagala ng’osuze mu ddwaliro.',
        outpatient: 'Okulaba omusawo ku kalwaliro, okukeberebwa mu laabu n’eddagala eriwandiikiddwa.',
        maternity: 'Okukeberebwa ng’oli lubuto n’okuzaala okwa bulijjo oba okw’okulongoosebwa.',
        dental: 'Efunibwa ng’osasudde ssente ez’enjawulo.',
        optical: null,
      },
      coveredServices: [
        'Okusula mu ddwaliro n’okulongoosebwa',
        'Okulaba omusawo ku kalwaliro n’okukeberebwa mu laabu',
        'Eddagala eriwandiikiddwa',
        'Okukeberebwa ng’oli lubuto n’okuzaala',
        'Okugemebwa kw’abaana okutaweebwa bwereere gavumenti',
      ],
      benefitLimits: [
        { label: 'Okusula mu ddwaliro (kugabanyizibwa amaka)' },
        { label: 'Obujjanjabi obw’okuddayo eka (bugabanyizibwa amaka)' },
        { label: 'Eby’okuzaala' },
      ],
      exclusions: [
        'Obujjanjabi obw’okuyamba okufuna olubuto',
        'Okulongoosa endabika',
        'Obujjanjabi ebweru w’amalwaliro kampuni ya yinsuwa ge yakkiriza, okuggyako ebyamangu',
        'Endwadde z’obadde nazo mu myezi 12 egisooka',
      ],
      waitingPeriods: [
        { appliesTo: 'Obulwadde obwa bulijjo', duration: 'Ennaku 30' },
        { appliesTo: 'Eby’okuzaala', duration: 'Emyezi 10' },
        { appliesTo: 'Endwadde z’obadde nazo', duration: 'Emyezi 12' },
      ],
      eligibility: [
        'Nannyini yinsuwa ow’emyaka 18 okutuuka ku 65',
        'Abaana okutuuka ku myaka 18, oba 25 bwe baba nga bakyasoma obudde bwonna',
      ],
      premiumBasis: 'buli maka ag’abantu okutuuka ku 4',
      enrolmentRequirements: [
        'Jjuza foomu entongole ey’okusaba ku lwa buli muntu ow’omu maka',
        'Laga endwadde z’olina ku foomu ya kampuni ya yinsuwa',
        'Sasula ssente za yinsuwa ezisooka ng’oyita mu kkubo erikkirizibwa',
      ],
      requiredDocuments: [
        'Endagamuntu z’abantu abakulu',
        'Satifikeeti z’okuzaalibwa ez’abaana',
        'Ebifaananyi bya paasipooti ebya buli muntu',
      ],
      enrolmentSteps: ['Kakasa amalwaliro agali okumpi nawe agali ku lukalala lwa kampuni ya yinsuwa.'],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'vendor-outpatient-plus': {
      insurer: 'Kampuni ya Yinsuwa ey’Ekyokulabirako C (si ya ddala)',
      tagline: 'Yinsuwa ey’okugenda ku kalwaliro buli lunaku eri abasuubuzi, esasulwa mu ssente entono buli wiiki oba buli mwezi.',
      coverageSummary:
        'Okusinga esasulira okugenda ku kalwaliro n’eddagala. Okusula mu ddwaliro kusasulirwa ssente ntono zokka, n’olwekyo okumalayo ekiseera ekiwanvu kiyinza okukuleka ng’osasula ezisigadde.',
      coverage: {
        inpatient: 'Ssente ntono ku kusula mu ddwaliro okw’ekiseera ekitono kyokka.',
        outpatient: 'Okulaba omusawo, okukeberebwa okwa bulijjo mu laabu n’eddagala erya bulijjo (generic).',
        maternity: null,
        dental: 'Okukeberebwa n’okukuulibwa amannyo kwokka.',
        optical: 'Okukeberebwa amaaso omulundi gumu buli mwaka.',
      },
      coveredServices: [
        'Okulaba omusawo ku kalwaliro',
        'Okukeberebwa okwa bulijjo mu laabu',
        'Eddagala erya bulijjo (generic) eriwandiikiddwa',
        'Okusula mu ddwaliro okw’ekiseera ekitono',
        'Okukeberebwa amannyo n’okugakuula',
        'Okukeberebwa amaaso omulundi gumu buli mwaka',
      ],
      benefitLimits: [
        { label: 'Obujjanjabi obw’okuddayo eka' },
        { label: 'Okusula mu ddwaliro' },
        { label: 'Amannyo' },
        { label: 'Ssente z’osasula buli lw’ogenda ku kalwaliro', notes: 'Osasula ssente zino buli lw’ogenda.' },
      ],
      exclusions: [
        'Eddagala ery’erinnya ery’amaanyi nga waliwo erya bulijjo (generic)',
        'Gaalubindi n’obuweewo bw’amaaso',
        'Okujjanjaba endwadde ez’olubeerera okusukka okulaba omusawo okwa bulijjo',
      ],
      waitingPeriods: null,
      eligibility: ['Emyaka 18 okutuuka ku 70'],
      premiumBasis: 'buli muntu',
      enrolmentRequirements: ['Jjuza foomu entongole ey’okusaba'],
      requiredDocuments: null,
      enrolmentSteps: [
        'Buuza oba osobola okusasula buli wiiki ng’oyita ku mobile money, era ofune ebiragiro ebitongole eby’okusasula mu buwandiike.',
      ],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'salaried-comprehensive': {
      insurer: 'Kampuni ya Yinsuwa ey’Ekyokulabirako D (si ya ddala)',
      tagline: 'Yinsuwa engazi ey’omuntu omu eri abantu abalina ensimbi eziyingira buli mwezi. Ebintu ebimu tebinnaba kufunibwa.',
      coverageSummary:
        'Esasulira okusula mu ddwaliro, okugenda ku kalwaliro, eby’okuzaala, amannyo n’amaaso. Ebbeeyi n’obukwakkulizo obumu tebiweereddwa mu bubaka obw’ekyokulabirako, n’olwekyo wandibadde obuuza kampuni ya yinsuwa.',
      coverage: {
        inpatient: 'Okusula mu ddwaliro, okulongoosebwa, ICU n’obujjanjabi bw’abasawo abakugu.',
        outpatient: 'Okulaba omusawo, abasawo abakugu, okukeberebwa n’eddagala.',
        maternity: null,
        dental: null,
        optical: 'Okukeberebwa amaaso ne gaalubindi emu buli myaka ebiri.',
      },
      coveredServices: [
        'Okusula mu ddwaliro, okulongoosebwa n’obujjanjabi obw’amaanyi (ICU)',
        'Okulaba abasawo abakugu',
        'Okukeberebwa mu laabu n’ebifaananyi by’omubiri (X-ray, scan)',
        'Eddagala eriwandiikiddwa',
        'Obujjanjabi bw’eby’okuzaala',
        'Obujjanjabi bw’amannyo n’amaaso',
      ],
      benefitLimits: [{ label: 'Okusula mu ddwaliro' }, { label: 'Obujjanjabi obw’okuddayo eka' }, { label: 'Eby’okuzaala' }],
      exclusions: null,
      waitingPeriods: [{ appliesTo: 'Eby’okuzaala', duration: 'Emyezi 12' }],
      eligibility: null,
      premiumBasis: null,
      enrolmentRequirements: null,
      requiredDocuments: null,
      enrolmentSteps: null,
      contactNote: CONTACT_NOTE,
      sourceNotes: `${SOURCE_NOTE} Obubaka buno tebujjuziddwa mu bugenderevu okulaga engeri obubaka obubulamu gye bulagibwamu.`,
    },
  },
  glossary: {
    premium: {
      term: 'Ssente za yinsuwa',
      short: 'Ssente z’osasula kampuni ya yinsuwa, ebiseera ebisinga buli mwezi oba buli mwaka, yinsuwa yo esigale ng’ekola.',
      detail:
        'Bw’olekera awo okusasula, yinsuwa yo ebiseera ebisinga nayo ekoma. Buuza engeri n’ekiseera ky’okusasula, n’ekibaawo singa olwawo okusasula.',
      example: 'Okusasula UGX 25,000 buli mwezi ku yinsuwa y’ebyobulamu.',
    },
    'benefit-limit': {
      term: 'Ekkomo ly’okusasula',
      short: 'Ssente ezisinga kampuni ya yinsuwa z’enaasasula ku kika ky’obujjanjabi mu kiseera ekigere, ng’omwaka.',
      detail:
        'Ekkomo bwe liggwaako, ggwe osasula ensaasaanya endala zonna okutuusa ekiseera lwe kiddamu okutandika. Ekkomo liyinza okukwata ku yinsuwa yonna, ku kika ky’obujjanjabi kimu, oba ku buli lw’ogenda oba buli kiro mu ddwaliro.',
      example: 'Ekkomo ly’okusula mu ddwaliro erya UGX 5,000,000 buli mwaka litegeeza nti kampuni ya yinsuwa ekoma okusasula oluvannyuma lw’omuwendo ogwo mu mwaka gumu.',
    },
    exclusion: {
      term: 'Ekitasasulirwa',
      short: 'Ekintu yinsuwa ky’etasasulira, ne bw’oba ng’okyetaaga.',
      detail:
        'Bulijjo soma ebitasasulirwa nga tonnalonda yinsuwa. Okubulawo kw’olukalala lw’ebitasasulirwa mu bufunze tekitegeeza nti tebiriiwo; endagaano ya yinsuwa enzijuvu ejja kubibaamu.',
      example: 'Okulongoosa endabika kutera obutasasulirwa.',
    },
    'waiting-period': {
      term: 'Ekiseera eky’okulinda',
      short: 'Ebbanga oluvannyuma lw’okwegatta nga tonnasobola kukozesa yinsuwa yonna oba ekitundu kyayo.',
      detail:
        'Mu kiseera eky’okulinda osasula ssente za yinsuwa naye tosobola kusaba kusasulwa ku bujjanjabi obukwatibwako. Eby’okuzaala n’endwadde z’obadde nazo bitera okuba n’ebiseera eby’okulinda ebiwanvu. Obubenje butera obutaba nabyo.',
      example: 'Ekiseera eky’okulinda eky’emyezi 10 ku by’okuzaala kitegeeza nti tosobola kusaba kusasulirwa kuzaala mu myezi 10 egisooka.',
    },
    'co-payment': {
      term: 'Ssente z’oyongerako',
      short: 'Omuwendo ogugere oba ekitundu kya bbiiru ky’osasula ggwe kennyini buli lw’okozesa yinsuwa.',
      detail: 'Kampuni ya yinsuwa esasula ebisigadde ku bbiiru, okutuuka ku kkomo ly’okusasula. Ssente z’oyongerako ziyamba ssente za yinsuwa okusigala nga ntono.',
      example: 'Okusasula UGX 5,000 buli lw’ogenda ku kalwaliro ng’ate kampuni ya yinsuwa esasula ebisigadde.',
    },
    deductible: {
      term: 'Ssente z’osooka okusasula',
      short: 'Ssente z’olina okusooka okwesasulira nga kampuni ya yinsuwa tennatandika kusasula.',
      detail: 'Yinsuwa ezimu zikozesa ssente zino omulundi gumu buli mwaka; endala buli lw’osaba. Buuza ekikola n’omuwendo gwazo.',
      example: 'Ng’olina ssente z’osooka okusasula za UGX 100,000 ku bbiiru ya UGX 400,000, ggwe osasula 100,000 ate kampuni ya yinsuwa n’esasula 300,000.',
    },
    inpatient: {
      term: 'Okusula mu ddwaliro',
      short: 'Obujjanjabi bw’ofuna ng’owandiisiddwa era ng’osula mu ddwaliro, ebiseera ebisinga ekiro kyonna.',
      detail:
        'Mulimu ekitanda, okulongoosebwa, eddagala n’okukeberebwa ng’osuze mu ddwaliro. Bbiiru z’okusula mu ddwaliro ze zitera okuba ensaasaanya ennene ennyo ku by’obulamu amaka ze gasanga.',
    },
    outpatient: {
      term: 'Obujjanjabi obw’okuddayo eka',
      short: 'Obujjanjabi ng’ogenda ku kalwaliro oba eddwaliro n’oddayo eka ku lunaku lwe lumu.',
      detail:
        'Mulimu okulaba omusawo, okukeberebwa mu laabu n’eddagala eriwandiikiddwa. Yinsuwa ezimu ez’ebbeeyi entono tezirina bujjanjabi bwa kuddayo eka n’akatono.',
    },
    'pre-existing-condition': {
      term: 'Obulwadde bw’obadde nabwo',
      short: 'Embeera y’obulamu gye wali nayo, oba obubonero bwayo, nga tonneegatta ku yinsuwa.',
      detail:
        'Kampuni za yinsuwa zitera obutabisasulira oba okuteekawo ekiseera eky’okulinda. Ddamu ebibuuzo by’obulamu ebya kampuni ya yinsuwa mu bwesimbu ku foomu yaabwe entongole; okuwa obubaka obukyamu kiyinza okuviirako okusaba kwo okugaanibwa.',
      example: 'Ssukaali oba puleesa ebyazuulibwa nga tonneegatta.',
    },
    dependants: {
      term: 'Ab’omu maka b’olabirira',
      short: 'Ab’omu maka abakuumibwa wansi wa yinsuwa yo, ng’omwagalwa wo oba abaana.',
      detail:
        'Kampuni za yinsuwa zissaawo amateeka ku ani abalibwa ng’alabirirwa, nga mw’otwalidde ekkomo ly’emyaka gy’abaana. Buli muntu alabirirwa ayinza okwongera ku ssente za yinsuwa.',
    },
    'principal-member': {
      term: 'Nannyini yinsuwa',
      short: 'Omuntu omukulu atwala yinsuwa era avunaanyizibwa okusasula ssente za yinsuwa.',
      detail: 'Ab’omu maka b’olabirira bongerwa wansi wa yinsuwa ya nannyini yinsuwa.',
    },
    intermediary: {
      term: 'Omukozi wa yinsuwa akkirizibwa',
      short: 'Omukozi wa yinsuwa oba bulooka alina layisinsi akkirizibwa okutunda oba okunnyonnyola yinsuwa ku lwa kampuni ya yinsuwa.',
      detail:
        'Mu Uganda, abakozi ba yinsuwa ne bulooka bafuna layisinsi okuva mu kitongole ekirondoola yinsuwa. Saba olabe obukakafu bwa layisinsi nga tonnawaayo ssente oba biwandiiko.',
    },
  },
};
