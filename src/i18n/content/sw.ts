import type { LocaleContent } from './types';

/** Kiswahili product and glossary text. Needs review by a native speaker before launch. */

const SOURCE_NOTE =
  'Rekodi ya kubuni iliyotengenezwa kwa ajili ya mfano wa InsurGuide. Haielezi bima halisi, na viwango vyote ni vya kuelezea tu.';

const CONTACT_NOTE =
  'Hii ni bima ya kubuni kwa mfano tu, kwa hiyo hakuna kampuni halisi ya bima ya kuwasiliana nayo. Kwa bima halisi, pata maelezo ya mawasiliano kupitia njia rasmi za kampuni ya bima au kwa wakala au dalali mwenye leseni.';

export const swContent: LocaleContent = {
  products: {
    'boda-inpatient-basic': {
      insurer: 'Kampuni ya Bima ya Mfano A (ya kubuni)',
      tagline: 'Bima ya hospitali ya gharama nafuu kwa waendesha bodaboda wanaohitaji zaidi kulindwa dhidi ya bili kubwa za kulazwa.',
      coverageSummary:
        'Inalipia kulazwa hospitalini hadi kikomo cha mwaka. Hailipii ziara za kliniki ambapo unarudi nyumbani siku hiyohiyo.',
      coverage: {
        inpatient: 'Kulazwa, kitanda cha wodi, upasuaji na dawa zinazotolewa hospitalini.',
        outpatient: 'Ziara za kliniki na dawa za kununua hazijajumuishwa.',
        maternity: null,
        dental: null,
        optical: null,
      },
      coveredServices: [
        'Kulazwa hospitalini katika wodi ya kawaida',
        'Upasuaji unaofanywa wakati wa kulazwa',
        'Dawa na vipimo vinavyotolewa ukiwa umelazwa',
        'Matibabu ya dharura yanayosababisha kulazwa',
      ],
      benefitLimits: [{ label: 'Jumla ya malipo ya kulazwa' }, { label: 'Kitanda cha wodi' }],
      exclusions: [
        'Ziara za kliniki (wagonjwa wa nje) na dawa zinazonunuliwa kwa matumizi ya nyumbani',
        'Majeraha unapoendesha bila kibali halali cha kuendesha',
        'Magonjwa uliyokuwa nayo kabla ya kujiunga, katika mwaka wa kwanza',
        'Matibabu ya urembo',
      ],
      waitingPeriods: [
        { appliesTo: 'Kulazwa kwa sababu ya ugonjwa', duration: 'Siku 30' },
        { appliesTo: 'Magonjwa yaliyokuwepo awali', duration: 'Miezi 12' },
        { appliesTo: 'Ajali', duration: 'Hakuna kipindi cha kusubiri' },
      ],
      eligibility: ['Umri wa miaka 18 hadi 60', 'Awe na kibali halali cha kuendesha (kwa waendeshaji)'],
      premiumBasis: 'kwa kila mtu',
      enrolmentRequirements: [
        'Jaza fomu rasmi ya maombi ya kampuni ya bima',
        'Lipa ada ya kwanza kupitia njia iliyoidhinishwa',
      ],
      requiredDocuments: ['Kitambulisho cha Taifa', 'Kibali cha kuendesha (kama wewe ni mwendeshaji)', 'Picha moja ya pasipoti'],
      enrolmentSteps: ['Uliza kama kituo chako cha bodaboda au SACCO yako ina mpango wa kikundi wenye masharti bora zaidi.'],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'family-starter': {
      insurer: 'Kampuni ya Bima ya Mfano B (ya kubuni)',
      tagline: 'Bima ya pamoja ya kulazwa na ya wagonjwa wa nje kwa familia, ikiwemo uzazi.',
      coverageSummary:
        'Inalinda familia ya hadi watu wanne kwa kulazwa hospitalini na ziara za kliniki, kwa kikomo cha pamoja cha mwaka. Inajumuisha uzazi baada ya kipindi cha kusubiri.',
      coverage: {
        inpatient: 'Kulazwa, upasuaji na dawa ukiwa umelazwa.',
        outpatient: 'Kuonana na daktari kliniki, vipimo vya maabara na dawa ulizoandikiwa.',
        maternity: 'Kliniki za wajawazito na kujifungua kwa kawaida au kwa upasuaji.',
        dental: 'Inapatikana kwa gharama ya ziada.',
        optical: null,
      },
      coveredServices: [
        'Kulazwa hospitalini na upasuaji',
        'Kuonana na daktari kliniki na vipimo vya maabara',
        'Dawa ulizoandikiwa',
        'Huduma kwa wajawazito na kujifungua',
        'Chanjo za watoto zisizotolewa bure na serikali',
      ],
      benefitLimits: [
        { label: 'Malipo ya kulazwa (ya pamoja kwa familia)' },
        { label: 'Malipo ya wagonjwa wa nje (ya pamoja kwa familia)' },
        { label: 'Uzazi' },
      ],
      exclusions: [
        'Matibabu ya kusaidia kupata mimba',
        'Upasuaji wa urembo',
        'Matibabu nje ya hospitali zilizoidhinishwa na kampuni ya bima, isipokuwa dharura',
        'Magonjwa yaliyokuwepo awali katika miezi 12 ya kwanza',
      ],
      waitingPeriods: [
        { appliesTo: 'Magonjwa ya kawaida', duration: 'Siku 30' },
        { appliesTo: 'Uzazi', duration: 'Miezi 10' },
        { appliesTo: 'Magonjwa yaliyokuwepo awali', duration: 'Miezi 12' },
      ],
      eligibility: [
        'Mwanachama mkuu mwenye umri wa miaka 18 hadi 65',
        'Watoto hadi miaka 18, au 25 kama bado wanasoma muda wote',
      ],
      premiumBasis: 'kwa familia ya hadi watu 4',
      enrolmentRequirements: [
        'Jaza fomu rasmi ya maombi kwa kila mwanafamilia',
        'Taja magonjwa uliyonayo kwenye fomu ya kampuni ya bima',
        'Lipa ada ya kwanza kupitia njia iliyoidhinishwa',
      ],
      requiredDocuments: [
        'Kitambulisho cha Taifa kwa watu wazima',
        'Vyeti vya kuzaliwa kwa watoto',
        'Picha za pasipoti kwa kila mwanafamilia',
      ],
      enrolmentSteps: ['Thibitisha ni hospitali zipi karibu nawe zilizo kwenye orodha ya kampuni ya bima.'],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'vendor-outpatient-plus': {
      insurer: 'Kampuni ya Bima ya Mfano C (ya kubuni)',
      tagline: 'Bima ya kliniki ya kila siku kwa wafanyabiashara, inayolipwa kwa kiasi kidogo kila wiki au kila mwezi.',
      coverageSummary:
        'Hasa inalipia ziara za kliniki na dawa. Kulazwa hospitalini kunalipiwa kwa kiasi kidogo tu, kwa hiyo kukaa muda mrefu kunaweza kukuacha ukilipa kiasi kinachobaki.',
      coverage: {
        inpatient: 'Malipo machache kwa kulazwa kwa muda mfupi tu.',
        outpatient: 'Kuonana na daktari, vipimo vya msingi vya maabara na dawa za kawaida (generic).',
        maternity: null,
        dental: 'Uchunguzi na kung’oa meno tu.',
        optical: 'Kipimo kimoja cha macho kwa mwaka.',
      },
      coveredServices: [
        'Kuonana na daktari kliniki',
        'Vipimo vya msingi vya maabara',
        'Dawa za kawaida (generic) ulizoandikiwa',
        'Kulazwa hospitalini kwa muda mfupi',
        'Uchunguzi wa meno na kung’oa meno',
        'Kipimo kimoja cha macho kwa mwaka',
      ],
      benefitLimits: [
        { label: 'Malipo ya wagonjwa wa nje' },
        { label: 'Malipo ya kulazwa' },
        { label: 'Meno' },
        { label: 'Malipo yako kwa kila ziara ya kliniki', notes: 'Unalipa kiasi hiki kila unapoenda kliniki.' },
      ],
      exclusions: [
        'Dawa zenye chapa pale ambapo dawa ya kawaida (generic) ipo',
        'Miwani na lenzi za macho',
        'Matibabu ya magonjwa sugu zaidi ya kuonana na daktari kwa kawaida',
      ],
      waitingPeriods: null,
      eligibility: ['Umri wa miaka 18 hadi 70'],
      premiumBasis: 'kwa kila mtu',
      enrolmentRequirements: ['Jaza fomu rasmi ya maombi'],
      requiredDocuments: null,
      enrolmentSteps: [
        'Uliza kama unaweza kulipa kila wiki kwa pesa za simu, na upate maelekezo rasmi ya malipo kwa maandishi.',
      ],
      contactNote: CONTACT_NOTE,
      sourceNotes: SOURCE_NOTE,
    },
    'salaried-comprehensive': {
      insurer: 'Kampuni ya Bima ya Mfano D (ya kubuni)',
      tagline: 'Bima pana ya mtu mmoja kwa watu wenye kipato cha kila mwezi. Maelezo kadhaa bado hayapatikani.',
      coverageSummary:
        'Inalipia kulazwa, ziara za kliniki, uzazi, meno na macho. Bei na baadhi ya masharti hayajatolewa katika data ya mfano, kwa hiyo utahitaji kuuliza kampuni ya bima.',
      coverage: {
        inpatient: 'Kulazwa, upasuaji, chumba cha wagonjwa mahututi (ICU) na huduma za madaktari bingwa.',
        outpatient: 'Kuonana na daktari, madaktari bingwa, vipimo na dawa.',
        maternity: null,
        dental: null,
        optical: 'Vipimo vya macho na miwani moja kila baada ya miaka miwili.',
      },
      coveredServices: [
        'Kulazwa hospitalini, upasuaji na huduma za wagonjwa mahututi',
        'Kuonana na madaktari bingwa',
        'Vipimo vya maabara na picha za mionzi',
        'Dawa ulizoandikiwa',
        'Huduma za uzazi',
        'Huduma za meno na macho',
      ],
      benefitLimits: [{ label: 'Malipo ya kulazwa' }, { label: 'Malipo ya wagonjwa wa nje' }, { label: 'Uzazi' }],
      exclusions: null,
      waitingPeriods: [{ appliesTo: 'Uzazi', duration: 'Miezi 12' }],
      eligibility: null,
      premiumBasis: null,
      enrolmentRequirements: null,
      requiredDocuments: null,
      enrolmentSteps: null,
      contactNote: CONTACT_NOTE,
      sourceNotes: `${SOURCE_NOTE} Rekodi hii kwa makusudi haijakamilika ili kuonyesha jinsi taarifa zinazokosekana zinavyoonyeshwa.`,
    },
  },
  glossary: {
    premium: {
      term: 'Ada ya bima',
      short: 'Kiasi unachokilipa kampuni ya bima, kwa kawaida kila mwezi au kila mwaka, ili bima yako iendelee kufanya kazi.',
      detail:
        'Ukiacha kulipa ada, kwa kawaida bima yako inakoma pia. Uliza malipo yanadaiwa vipi na lini, na nini kinatokea malipo yakichelewa.',
      example: 'Kulipa UGX 25,000 kila mwezi kwa bima ya afya.',
    },
    'benefit-limit': {
      term: 'Kikomo cha malipo',
      short: 'Kiasi cha juu kabisa ambacho kampuni ya bima italipa kwa aina fulani ya huduma ndani ya kipindi fulani, kama mwaka.',
      detail:
        'Kikomo kikishatumika, unalipa gharama zinazofuata mwenyewe hadi kipindi kianze upya. Vikomo vinaweza kuhusu bima nzima, aina moja ya huduma, au kila ziara au kila usiku hospitalini.',
      example: 'Kikomo cha kulazwa cha UGX 5,000,000 kwa mwaka kinamaanisha kampuni ya bima inaacha kulipa baada ya kiasi hicho ndani ya mwaka mmoja.',
    },
    exclusion: {
      term: 'Kisicholipiwa',
      short: 'Kitu ambacho bima hailipii, hata kama unakihitaji.',
      detail:
        'Daima soma visivyolipiwa kabla ya kuchagua bima. Kukosekana kwa orodha ya visivyolipiwa katika muhtasari hakumaanishi kuwa havipo; mkataba kamili wa bima utakuwa navyo.',
      example: 'Upasuaji wa urembo mara nyingi haulipiwi.',
    },
    'waiting-period': {
      term: 'Kipindi cha kusubiri',
      short: 'Muda baada ya kujiunga kabla ya kuweza kutumia sehemu au bima yote.',
      detail:
        'Wakati wa kipindi cha kusubiri unalipa ada lakini huwezi kudai malipo kwa huduma husika. Uzazi na magonjwa yaliyokuwepo awali mara nyingi vina vipindi virefu vya kusubiri. Ajali mara nyingi hazina.',
      example: 'Kipindi cha kusubiri cha miezi 10 kwa uzazi kinamaanisha huwezi kudai malipo ya kujifungua katika miezi 10 ya kwanza.',
    },
    'co-payment': {
      term: 'Malipo ya pamoja',
      short: 'Kiasi maalum au sehemu ya bili unayolipa mwenyewe kila unapotumia bima.',
      detail: 'Kampuni ya bima inalipa sehemu iliyobaki ya bili, hadi kikomo cha malipo. Malipo ya pamoja husaidia ada kubaki chini.',
      example: 'Kulipa UGX 5,000 kila unapoenda kliniki huku kampuni ya bima ikilipa kiasi kinachobaki.',
    },
    deductible: {
      term: 'Kiasi cha kujilipia kwanza',
      short: 'Kiasi unachopaswa kulipa mwenyewe kabla kampuni ya bima haijaanza kulipa dai.',
      detail: 'Baadhi ya bima hutumia kiasi hiki mara moja kwa mwaka; nyingine hukitumia kwa kila dai. Uliza kipi kinatumika na ni kiasi gani.',
      example: 'Kwa kiasi cha kujilipia cha UGX 100,000 kwenye bili ya UGX 400,000, unalipa 100,000 na kampuni ya bima inalipa 300,000.',
    },
    inpatient: {
      term: 'Kulazwa',
      short: 'Huduma unayopata ukiwa umelazwa na kukaa hospitalini, kwa kawaida usiku kucha.',
      detail:
        'Inajumuisha kitanda, upasuaji, dawa na vipimo vinavyotolewa wakati wa kulazwa. Bili za kulazwa mara nyingi ndizo gharama kubwa zaidi za afya ambazo familia hukabiliana nazo.',
    },
    outpatient: {
      term: 'Wagonjwa wa nje',
      short: 'Huduma ambapo unaenda kliniki au hospitali na kurudi nyumbani siku hiyohiyo.',
      detail:
        'Inajumuisha kuonana na daktari, vipimo vya maabara na dawa ulizoandikiwa. Baadhi ya bima za gharama nafuu hazina malipo ya wagonjwa wa nje kabisa.',
    },
    'pre-existing-condition': {
      term: 'Ugonjwa uliokuwepo awali',
      short: 'Hali ya kiafya uliyokuwa nayo, au uliyokuwa na dalili zake, kabla ya kujiunga na bima.',
      detail:
        'Makampuni ya bima mara nyingi hayalipii haya au huweka kipindi cha kusubiri. Jibu maswali ya kiafya ya kampuni ya bima kwa ukweli kwenye fomu yao rasmi; kutoa taarifa zisizo sahihi kunaweza kusababisha madai kukataliwa.',
      example: 'Kisukari au shinikizo la damu lililogunduliwa kabla ya kujiunga.',
    },
    dependants: {
      term: 'Wategemezi',
      short: 'Wanafamilia wanaolindwa chini ya bima yako, kama mwenzi au watoto.',
      detail:
        'Makampuni ya bima huweka sheria kuhusu nani anahesabiwa kuwa mtegemezi, ikiwemo vikomo vya umri kwa watoto. Kila mtegemezi anaweza kuongeza ada.',
    },
    'principal-member': {
      term: 'Mwanachama mkuu',
      short: 'Mtu mkuu anayechukua bima na anayewajibika kulipa ada.',
      detail: 'Wategemezi huongezwa chini ya bima ya mwanachama mkuu.',
    },
    intermediary: {
      term: 'Wakala aliyeidhinishwa',
      short: 'Wakala au dalali mwenye leseni anayeruhusiwa kuuza au kueleza bima kwa niaba ya kampuni ya bima.',
      detail:
        'Nchini Uganda, mawakala na madalali wa bima hupewa leseni na mdhibiti wa bima. Omba kuona uthibitisho wa leseni kabla ya kutoa pesa au hati.',
    },
  },
};
