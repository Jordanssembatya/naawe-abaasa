import type { LocaleContent } from './types';

/** Runyankore product and glossary text. Needs review by a native speaker before launch. */

const SOURCE_NOTE =
  'Amakuru g’ekyokureeberaho agakozirwe ahabwa puroojekiti ya InsurGuide. Tigarikugamba aha nshuwarensi ya mazima, kandi emihendo yoona n’ey’ekyokureeberaho.';

const CONTACT_NOTE =
  'Egi n’inshuwarensi y’ekyokureeberaho, n’ahabw’ekyo tihariho kampuni y’inshuwarensi ya mazima ei orikubaasa kugambira. Ahabw’inshuwarensi ya mazima, tunga amakuru g’okugambira kuruga omu mihanda y’amazima eya kampuni y’inshuwarensi nari omukozi w’inshuwarensi nari burooka oine layisensi.';

export const nynContent: LocaleContent = {
  products: {
    'boda-inpatient-basic': {
      insurer: 'Kampuni y’Inshuwarensi y’Ekyokureeberaho A (ti ya mazima)',
      tagline: 'Inshuwarensi y’irwariro y’omuhendo muke ahabw’abavuzi abarikwetenga kurindwa aha sente nyingi z’okuraara omu irwariro.',
      coverageSummary:
        'Neeshasurira okuraara omu irwariro kuhika aha kigarukiro ky’omwaka. Tekushasurira okugyenda aha kirwariro ogaruka omuka eizooba eryo.',
      coverage: {
        inpatient: 'Okuraara omu irwariro, ekitanda, okubaagwa n’emibazi ehebwa omu irwariro.',
        outpatient: 'Okugyenda aha kirwariro n’emibazi ei orikugura tibirimu.',
        maternity: null,
        dental: null,
        optical: null,
      },
      coveredServices: [
        'Okuraara omu irwariro omu waadi ya buri izooba',
        'Okubaagwa oraire omu irwariro',
        'Emibazi n’okukeberwa oraire omu irwariro',
        'Obujanjabi bw’amango oburikukuretera kuraara omu irwariro',
      ],
      benefitLimits: [{ label: 'Esente zoona z’okuraara omu irwariro' }, { label: 'Ekitanda omu waadi' }],
      exclusions: [
        'Okugyenda aha kirwariro n’emibazi ei orikugura kukoresa omuka',
        'Okukomereka orikuvuga otaine pamiti y’okuvuga ehikire',
        'Endwara ezi waabaire oine otakaayegaitsire, omu mwaka gw’okubanza',
        'Obujanjabi bw’okushemeza endeebeka',
      ],
      waitingPeriods: [
        { appliesTo: 'Okuraara omu irwariro ahabw’endwara', duration: 'Ebiro 30' },
        { appliesTo: 'Endwara ezi waabaire oine', duration: 'Emyezi 12' },
        { appliesTo: 'Obuhuta', duration: 'Tihariho kurindira' },
      ],
      eligibility: ['Emyaka 18 kuhika 60', 'Aine pamiti y’okuvuga ehikire (ahabw’abavuzi)'],
      premiumBasis: 'buri muntu',
      enrolmentRequirements: [
        'Ijuza fomu y’amazima y’okushaba eya kampuni y’inshuwarensi',
        'Shasura esente z’inshuwarensi ez’okubanza orikurabira omu muhanda oguikirizibwe',
      ],
      requiredDocuments: ['Endangamuntu', 'Pamiti y’okuvuga (waaba oriyo nooyavuga)', 'Ekishushani kimwe kya paasipooti'],
      enrolmentSteps: ['Buuza yaaba siteegi yaawe ya bodaboda nari SACCO yaawe eine entebeekanisa y’ekibiina erimu ebiragiro birungi.'],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'family-starter': {
      insurer: 'Kampuni y’Inshuwarensi y’Ekyokureeberaho B (ti ya mazima)',
      tagline: 'Inshuwarensi ya hamwe y’okuraara omu irwariro n’obujanjabi bw’okugaruka omuka ahabw’eka, harimu n’okuzaara.',
      coverageSummary:
        'Neerinda eka y’abantu kuhika bana aha kuraara omu irwariro n’okugyenda aha kirwariro, n’ekigarukiro ky’omwaka eky’abona hamwe. Harimu okuzaara bwanyima y’obwire bw’okurindira.',
      coverage: {
        inpatient: 'Okuraara omu irwariro, okubaagwa n’emibazi oraire omu irwariro.',
        outpatient: 'Okureebwa omushaho aha kirwariro, okukeberwa omu laabu n’emibazi ehandiikirwe.',
        maternity: 'Okukeberwa oine enda n’okuzaara kwa buri izooba nari okw’okubaagwa.',
        dental: 'Neetungwa orikushasura esente ezindi.',
        optical: null,
      },
      coveredServices: [
        'Okuraara omu irwariro n’okubaagwa',
        'Okureebwa omushaho aha kirwariro n’okukeberwa omu laabu',
        'Emibazi ehandiikirwe',
        'Okukeberwa oine enda n’okuzaara',
        'Okugyemwa kw’abaana okutarikuhebwa buhwa gavumenti',
      ],
      benefitLimits: [
        { label: 'Okuraara omu irwariro (eky’eka yoona hamwe)' },
        { label: 'Obujanjabi bw’okugaruka omuka (obw’eka yoona hamwe)' },
        { label: 'Okuzaara' },
      ],
      exclusions: [
        'Obujanjabi bw’okuhwera kutunga enda',
        'Okubaagwa kw’okushemeza endeebeka',
        'Obujanjabi aheru y’amarwariro agu kampuni y’inshuwarensi yaaikiriza, kureka eby’amango',
        'Endwara ezi waabaire oine omu myezi 12 y’okubanza',
      ],
      waitingPeriods: [
        { appliesTo: 'Endwara za buri izooba', duration: 'Ebiro 30' },
        { appliesTo: 'Okuzaara', duration: 'Emyezi 10' },
        { appliesTo: 'Endwara ezi waabaire oine', duration: 'Emyezi 12' },
      ],
      eligibility: [
        'Nyineyo inshuwarensi w’emyaka 18 kuhika 65',
        'Abaana kuhika aha myaka 18, nari 25 baaba bakiri kushoma obwire bwona',
      ],
      premiumBasis: 'buri ka y’abantu kuhika 4',
      enrolmentRequirements: [
        'Ijuza fomu y’amazima y’okushaba ahabwa buri muntu w’omu ka',
        'Oreke endwara ezi oine aha fomu ya kampuni y’inshuwarensi',
        'Shasura esente z’inshuwarensi ez’okubanza orikurabira omu muhanda oguikirizibwe',
      ],
      requiredDocuments: [
        'Endangamuntu z’abakuru',
        'Satifikeeti z’okuzaarwa ez’abaana',
        'Ebishushani bya paasipooti ebya buri muntu',
      ],
      enrolmentSteps: ['Hamya amarwariro agari haihi naiwe agari aha rukarara rwa kampuni y’inshuwarensi.'],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'vendor-outpatient-plus': {
      insurer: 'Kampuni y’Inshuwarensi y’Ekyokureeberaho C (ti ya mazima)',
      tagline: 'Inshuwarensi y’okugyenda aha kirwariro buri izooba ahabw’abacuruzi, erikushasurwa omu sente nkye buri wiiki nari buri kwezi.',
      coverageSummary:
        'Munonga neeshasurira okugyenda aha kirwariro n’emibazi. Okuraara omu irwariro nikushasurirwa sente nkye zonka, n’ahabw’ekyo okumaraho obwire burikuraingwa nikubaasa kukureka orikushasura ezishigaire.',
      coverage: {
        inpatient: 'Esente nkye aha kuraara omu irwariro obwire bugufu bwonka.',
        outpatient: 'Okureebwa omushaho, okukeberwa kwa buri izooba omu laabu n’emibazi ya buri izooba (generic).',
        maternity: null,
        dental: 'Okukeberwa n’okukuurwa amaino kwonka.',
        optical: 'Okukeberwa amaisho rimwe buri mwaka.',
      },
      coveredServices: [
        'Okureebwa omushaho aha kirwariro',
        'Okukeberwa kwa buri izooba omu laabu',
        'Emibazi ya buri izooba (generic) ehandiikirwe',
        'Okuraara omu irwariro obwire bugufu',
        'Okukeberwa amaino n’okugakuura',
        'Okukeberwa amaisho rimwe buri mwaka',
      ],
      benefitLimits: [
        { label: 'Obujanjabi bw’okugaruka omuka' },
        { label: 'Okuraara omu irwariro' },
        { label: 'Amaino' },
        { label: 'Esente ezi orikushasura buri ku orikugyenda aha kirwariro', notes: 'Noshasura esente ezi buri ku orikugyenda.' },
      ],
      exclusions: [
        'Emibazi y’eiziina erikumanywa omu mwanya gw’ey’obuguzi bwa buri izooba (generic) eriho',
        'Gaarubindi n’obuweewo bw’amaisho',
        'Okujanjaba endwara ez’obutoosha kurenga okureebwa omushaho kwa buri izooba',
      ],
      waitingPeriods: null,
      eligibility: ['Emyaka 18 kuhika 70'],
      premiumBasis: 'buri muntu',
      enrolmentRequirements: ['Ijuza fomu y’amazima y’okushaba'],
      requiredDocuments: null,
      enrolmentSteps: [
        'Buuza yaaba nobaasa kushasura buri wiiki orikurabira aha mobile money, kandi otunge ebiragiro by’amazima by’okushasura omu buhandiike.',
      ],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'salaried-comprehensive': {
      insurer: 'Kampuni y’Inshuwarensi y’Ekyokureeberaho D (ti ya mazima)',
      tagline: 'Inshuwarensi ngari y’omuntu omwe ahabw’abantu abarikutunga esente buri kwezi. Amakuru agamwe tigarakatungwa.',
      coverageSummary:
        'Neeshasurira okuraara omu irwariro, okugyenda aha kirwariro, okuzaara, amaino n’amaisho. Omuhendo n’ebiragiro ebimwe tibihairwe omu makuru g’ekyokureeberaho, n’ahabw’ekyo noshemerera kubuuza kampuni y’inshuwarensi.',
      coverage: {
        inpatient: 'Okuraara omu irwariro, okubaagwa, ICU n’obujanjabi bw’abashaho abakugu.',
        outpatient: 'Okureebwa omushaho, abashaho abakugu, okukeberwa n’emibazi.',
        maternity: null,
        dental: null,
        optical: 'Okukeberwa amaisho na gaarubindi emwe buri myaka ebiri.',
      },
      coveredServices: [
        'Okuraara omu irwariro, okubaagwa n’obujanjabi bw’amaani (ICU)',
        'Okureebwa abashaho abakugu',
        'Okukeberwa omu laabu n’ebishushani by’omubiri (X-ray, scan)',
        'Emibazi ehandiikirwe',
        'Obujanjabi bw’okuzaara',
        'Obujanjabi bw’amaino n’amaisho',
      ],
      benefitLimits: [{ label: 'Okuraara omu irwariro' }, { label: 'Obujanjabi bw’okugaruka omuka' }, { label: 'Okuzaara' }],
      exclusions: null,
      waitingPeriods: [{ appliesTo: 'Okuzaara', duration: 'Emyezi 12' }],
      eligibility: null,
      premiumBasis: null,
      enrolmentRequirements: null,
      requiredDocuments: null,
      enrolmentSteps: null,
      contactNote: CONTACT_NOTE,
      sourceNotes: `${SOURCE_NOTE} Amakuru aga tigaijwiremu ahabw’ekigyendererwa kworeka oku amakuru agarikubura garikworekwa.`,
    },
  },
  glossary: {
    premium: {
      term: 'Esente z’inshuwarensi',
      short: 'Esente ezi orikushasura kampuni y’inshuwarensi, munonga buri kwezi nari buri mwaka, kugira ngu inshuwarensi yaawe egume neekora.',
      detail:
        'Waareka kushasura, inshuwarensi yaawe munonga neehwa nayo. Buuza oku n’obu orikushemerera kushasura, n’ekirikubaho waakereererwa kushasura.',
      example: 'Okushasura UGX 25,000 buri kwezi ahabw’inshuwarensi y’amagara.',
    },
    'benefit-limit': {
      term: 'Ekigarukiro ky’okushasura',
      short: 'Esente ezirikukirayo kampuni y’inshuwarensi ezi eraashasure aha muringo gw’obujanjabi omu bwire burikumanywa, nk’omwaka.',
      detail:
        'Ekigarukiro kyahwa, niiwe orikushasura esente ezindi zoona kuhitsya obwire bwongyere kutandika. Ebigarukiro nibibaasa kukwata aha nshuwarensi yoona, aha muringo gumwe gw’obujanjabi, nari aha buri ku orikugyenda nari buri kiro omu irwariro.',
      example: 'Ekigarukiro ky’okuraara omu irwariro kya UGX 5,000,000 buri mwaka nikimanyisa ngu kampuni y’inshuwarensi neerekyera kushasura bwanyima y’esente ezo omu mwaka gumwe.',
    },
    exclusion: {
      term: 'Ekitarikushasurirwa',
      short: 'Ekintu eki inshuwarensi etarikushasurira, n’obu waakuba nookyetenga.',
      detail:
        'Buri kanya shoma ebitarikushasurirwa otakatoorainwe inshuwarensi. Okubura kw’orukarara rw’ebitarikushasurirwa omu makuru magufu tikirikumanyisa ngu tibiriho; endagaano y’inshuwarensi yoona neeza kubibamu.',
      example: 'Okubaagwa kw’okushemeza endeebeka munonga tikurikushasurirwa.',
    },
    'waiting-period': {
      term: 'Obwire bw’okurindira',
      short: 'Obwire bwanyima y’okwegaita otakabaasize kukoresa inshuwarensi yoona nari ekicweka kyayo.',
      detail:
        'Omu bwire bw’okurindira noshasura esente z’inshuwarensi kwonka tobaasa kushaba kushasurirwa aha bujanjabi oburikukwatwaho. Okuzaara n’endwara ezi waabaire oine munonga biine obwire burikuraingwa bw’okurindira. Obuhuta munonga tibuburiho.',
      example: 'Obwire bw’okurindira bw’emyezi 10 ahabw’okuzaara nibumanyisa ngu tobaasa kushaba kushasurirwa okuzaara omu myezi 10 y’okubanza.',
    },
    'co-payment': {
      term: 'Esente ezi orikwongyeraho',
      short: 'Omuhendo ogurikumanywa nari ekicweka kya bbiiru eki orikushasura iwe wenka buri ku orikukoresa inshuwarensi.',
      detail: 'Kampuni y’inshuwarensi neeshasura ebishigaire aha bbiiru, kuhika aha kigarukiro ky’okushasura. Esente ezi orikwongyeraho nizihwera esente z’inshuwarensi kuguma ziri nkye.',
      example: 'Okushasura UGX 5,000 buri ku orikugyenda aha kirwariro kampuni y’inshuwarensi yaashasura ezishigaire.',
    },
    deductible: {
      term: 'Esente ezi orikubanza kushasura',
      short: 'Esente ezi oshemereire kubanza kwesasurira kampuni y’inshuwarensi etakatandikire kushasura.',
      detail: 'Inshuwarensi ezimwe nizikoresa esente ezi rimwe buri mwaka; ezindi buri ku orikushaba. Buuza ekirikukora n’omuhendo gwazo.',
      example: 'Waaba oine esente ez’okubanza kushasura za UGX 100,000 aha bbiiru ya UGX 400,000, iwe noshasura 100,000 kampuni y’inshuwarensi yaashasura 300,000.',
    },
    inpatient: {
      term: 'Okuraara omu irwariro',
      short: 'Obujanjabi obu orikutunga ohandiikirwe kandi oraire omu irwariro, munonga ekiro kyona.',
      detail:
        'Harimu ekitanda, okubaagwa, emibazi n’okukeberwa oraire omu irwariro. Bbiiru z’okuraara omu irwariro nizo munonga ezirikuba nyingi kukira ezindi ezi eka ziriguma zirikushanga aha by’amagara.',
    },
    outpatient: {
      term: 'Obujanjabi bw’okugaruka omuka',
      short: 'Obujanjabi orikugyenda aha kirwariro nari irwariro kandi ogaruke omuka eizooba eryo.',
      detail:
        'Harimu okureebwa omushaho, okukeberwa omu laabu n’emibazi ehandiikirwe. Inshuwarensi ezimwe z’omuhendo muke tiziine bujanjabi bw’okugaruka omuka n’akakye.',
    },
    'pre-existing-condition': {
      term: 'Endwara ei waabaire oine',
      short: 'Embeera y’amagara ei waabaire oine, nari obumanyiso bwayo, otakaayegaitsire aha nshuwarensi.',
      detail:
        'Kampuni z’inshuwarensi munonga tiziribishasurira nari niziteekaho obwire bw’okurindira. Garukamu ebibuuzo by’amagara ebya kampuni y’inshuwarensi omu mazima aha fomu yaabo y’amazima; okuha amakuru agatahikire nikubaasa kureetera okushaba kwawe kwangwa.',
      example: 'Sukaari nari puresa ebyazoorwe otakaayegaitsire.',
    },
    dependants: {
      term: 'Abu orikureeberera',
      short: 'Ab’omu ka abarikurindwa ahansi y’inshuwarensi yaawe, nk’omukazi nari omushaija waawe nari abaana.',
      detail:
        'Kampuni z’inshuwarensi niziteeraho ebiragiro aha orikubarwa nk’orikureeberwa, harimu n’ebigarukiro by’emyaka y’abaana. Buri muntu orikureeberwa nabaasa kwongyera aha sente z’inshuwarensi.',
    },
    'principal-member': {
      term: 'Nyineyo inshuwarensi',
      short: 'Omuntu omukuru orikutwara inshuwarensi kandi orikuryozibwa okushasura esente z’inshuwarensi.',
      detail: 'Abu orikureeberera nibongyerwa ahansi y’inshuwarensi ya nyineyo inshuwarensi.',
    },
    intermediary: {
      term: 'Omukozi w’inshuwarensi oikirizibwe',
      short: 'Omukozi w’inshuwarensi nari burooka oine layisensi oikirizibwe kutunda nari kusoboorora inshuwarensi ahabwa kampuni y’inshuwarensi.',
      detail:
        'Omuri Uganda, abakozi b’inshuwarensi na burooka nibaheebwa layisensi ekitongore ekirikureeberera inshuwarensi. Shaba kureeba obuhamya bwa layisensi otakahaire sente nari empapura.',
    },
  },
};
