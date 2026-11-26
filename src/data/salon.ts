export interface BeautyRitual {
  id: string;
  name: string;
  category: 'Facial Atelier' | 'Hair Architecture' | 'Editorial Makeup' | 'Body Sanctuary';
  isNew?: boolean;
  tagline: string;
  description: string;
  duration: string;
  price: number;
  monthlyOrCadence: string;
  metricValue: string;
  metricCopy: string;
  specHighlight: string;
  image: string;
  imageAlt: string;
  specs: {
    label: string;
    value: string;
    opticalHighlight?: boolean;
  }[];
}

export interface CampaignHighlight {
  id: string;
  label: string;
  specTag: string;
  headline: string;
  subcopy: string;
  image: string;
  imageAlt: string;
}

export interface ProtocolStage {
  step: string;
  title: string;
  metric: string;
  summary: string;
  detail: string;
  image: string;
  imageAlt: string;
}

export interface BeforeAfterStudy {
  id: string;
  title: string;
  protocol: string;
  timeline: string;
  observation: string;
  image: string;
  imageAlt: string;
  beforeFilter: string;
  afterFilter: string;
}

export interface ClientPerspective {
  id: string;
  quote: string;
  author: string;
  role: string;
  ritual: string;
  image: string;
  imageAlt: string;
}

export const BEAUTY_RITUALS: BeautyRitual[] = [
  {
    id: 'sculptural-facial',
    name: 'Sculptural Facial 01',
    category: 'Facial Atelier',
    isNew: true,
    tagline: 'Intra-oral buccal release and lymphatic contour.',
    description:
      'Ninety minutes of precision myofascial sculpting, cryo-calibrated soothing, and cold-pressed peptide infusion tailored to release jaw tension and lift cheekbone posture.',
    duration: '90 min',
    price: 295,
    monthlyOrCadence: 'Recommended every 4 weeks',
    metricValue: '90 min',
    metricCopy: 'Full myofascial buccal release, lymphatic drainage, and cryo-peptide finish.',
    specHighlight: '4°C Cryo-Toned · 2.4% GHK-Cu Matrix',
    image: '/images/sculptural-facial-dark.jpg',
    imageAlt: 'Facial specialist sculpting glowing jawline and cheekbone on dark obsidian stage',
    specs: [
      { label: 'Core Protocol', value: 'Buccal Release + Lymphatic', opticalHighlight: true },
      { label: 'Active Infusion', value: '2.4% Liposomal GHK-Cu' },
      { label: 'Session Duration', value: '90 minutes · Private Suite' },
      { label: 'Barrier Finish', value: '3:1:1 Lamellar Ceramide Seal' },
    ],
  },
  {
    id: 'botanical-hair',
    name: 'Silk Hair Architecture',
    category: 'Hair Architecture',
    isNew: true,
    tagline: 'Precision dry cutting and Hinoki steam infusion.',
    description:
      'Architectural hair shaping followed by amino-lipid steam hydration and high-gloss finishing built to hold clean silhouette weeks beyond the studio.',
    duration: '75 min',
    price: 210,
    monthlyOrCadence: 'Recommended every 6–8 weeks',
    metricValue: '75 min',
    metricCopy: 'Dry-cut architectural tailoring paired with warm botanical cuticle sealing.',
    specHighlight: 'Zero Silicones · Camellia Lipid Gloss',
    image: '/images/hair-architecture-dark.jpg',
    imageAlt: 'Sleek glass-shine dark hair waves illuminated by burgundy and silver studio rim light',
    specs: [
      { label: 'Cut Technique', value: 'Dry Structural Tailoring', opticalHighlight: true },
      { label: 'Scalp Therapy', value: 'Hinoki Steam + Rosemary Tonic' },
      { label: 'Session Duration', value: '75 minutes' },
      { label: 'Finish', value: 'Camellia Amino Cuticle Seal' },
    ],
  },
  {
    id: 'atelier-complexion',
    name: 'Atelier Complexion',
    category: 'Editorial Makeup',
    tagline: 'Second-skin editorial finish for private occasions.',
    description:
      'Skincare-led complexion prep using lymphatic massage, sheer mineral pigments, and calibrated brow architecture that reads like luminous bare skin in daylight or flash.',
    duration: '75 min',
    price: 240,
    monthlyOrCadence: 'Bespoke occasion or bridal',
    metricValue: '75 min',
    metricCopy: 'Lymphatic skin prep and micro-layered mineral pigment complexion work.',
    specHighlight: '12-Hour Breathable Luminous Wear',
    image: '/images/complexion-editorial-dark.jpg',
    imageAlt: 'Dark luxury editorial beauty portrait showing glass-like hydrated complexion',
    specs: [
      { label: 'Prep Phase', value: '15-min Lymphatic De-Puff', opticalHighlight: true },
      { label: 'Pigment System', value: 'Squalane Sheer Mineral Veil' },
      { label: 'Session Duration', value: '75 minutes' },
      { label: 'Longevity', value: '12-hour flash-tested wear' },
    ],
  },
  {
    id: 'thermal-orchid',
    name: 'Thermal Orchid Stone',
    category: 'Body Sanctuary',
    tagline: 'Heated basalt meridian work and warm neroli oil.',
    description:
      'Slow rhythmic bodywork using hand-warmed volcanic basalt stones along postural meridians to decompress neck, shoulder, and upper-back tension.',
    duration: '90 min',
    price: 275,
    monthlyOrCadence: 'Recommended bi-weekly',
    metricValue: '52°C',
    metricCopy: 'Calibrated volcanic basalt thermal stones paired with cold-pressed orchid oil.',
    specHighlight: 'Volcanic Basalt · Neroli Botanical Oil',
    image: '/images/thermal-stone-dark.jpg',
    imageAlt: 'Smooth black volcanic basalt stones beside smoked amber botanical oil bottle on slate plinth',
    specs: [
      { label: 'Thermal Source', value: '52°C Calibrated Basalt', opticalHighlight: true },
      { label: 'Botanical Carrier', value: 'Orchid + Sweet Almond Oil' },
      { label: 'Session Duration', value: '90 minutes · Heated Suite' },
      { label: 'Focus Zones', value: 'Cervical, Scapular & Meridian' },
    ],
  },
  {
    id: 'cellular-hydration',
    name: 'Cellular Hydration',
    category: 'Facial Atelier',
    tagline: 'Micro-kaolin polish and multi-weight hyaluronic lock.',
    description:
      'Resurfacing mineral kaolin polish followed by chilled quartz massage and triple-weight hyaluronic layering to restore bounce to dehydrated skin.',
    duration: '60 min',
    price: 215,
    monthlyOrCadence: 'Recommended every 3–4 weeks',
    metricValue: '+42%',
    metricCopy: 'Measured surface hydration surge immediately following cryo-quartz sealing.',
    specHighlight: '4% PHA · Triple Hyaluronic Matrix',
    image: '/images/barrier-creme-dark.jpg',
    imageAlt: 'Smoked obsidian-burgundy glass cream vessel revealing lamellar ceramide moisturizer',
    specs: [
      { label: 'Exfoliation', value: '4% Gluconolactone + Kaolin', opticalHighlight: true },
      { label: 'Hydration Complex', value: '3-Weight Hyaluronic Acid' },
      { label: 'Session Duration', value: '60 minutes' },
      { label: 'Recovery', value: 'Zero downtime · Instant glow' },
    ],
  },
  {
    id: 'hydro-sanctuary',
    name: 'Camellia Hydro-Soak',
    category: 'Body Sanctuary',
    tagline: 'Private colloidal silk soak and dry exfoliation.',
    description:
      'Reserved 60-minute private suite immersion in fermented white camellia milk and mineral salts, paired with dry-brush lymphatic priming.',
    duration: '60 min',
    price: 195,
    monthlyOrCadence: 'Standalone or pre-facial add-on',
    metricValue: '60 min',
    metricCopy: 'Private suite colloidal silk soak designed to reset sensory fatigue.',
    specHighlight: 'Colloidal Silk · White Camellia',
    image: '/images/hydro-sanctuary-dark.jpg',
    imageAlt: 'Dark honed basalt hydrotherapy water sanctuary with floating white camellia blossoms',
    specs: [
      { label: 'Immersion Base', value: 'Colloidal Silk + Sea Salt', opticalHighlight: true },
      { label: 'Prep Ritual', value: 'Dry-Brush Lymphatic Sweep' },
      { label: 'Session Duration', value: '60 minutes · Private Bath' },
      { label: 'Aftercare', value: 'Warm Ceramide Body Emulsion' },
    ],
  },
];

export const CAMPAIGN_HIGHLIGHTS: CampaignHighlight[] = [
  {
    id: 'campaign-luminosity',
    label: 'Editorial Skin',
    specTag: '90-MIN SCULPTURAL FACIAL · ZERO DOWNTIME',
    headline: 'Skin clarity calibrated at the cellular surface.',
    subcopy:
      'Buccal myofascial lifting meets cold-pressed copper tripeptides inside private dark-curtained treatment suites.',
    image: '/images/complexion-editorial-dark.jpg',
    imageAlt: 'Luminous editorial beauty portrait showcasing refined glass-skin texture on obsidian',
  },
  {
    id: 'campaign-ritual',
    label: 'Facial Craft',
    specTag: '4°C COLD-PRESSED BOTANICAL MATRIX',
    headline: 'Measured botanical actives. Zero synthetic filler.',
    subcopy:
      'Every facial formulation is blended fresh prior to arrival—free from fragrance, drying alcohols, and cyclic silicones.',
    image: '/images/dark-serum-macro.jpg',
    imageAlt: 'Copper-burgundy peptide drop suspended from smoked glass pipette on pitch black',
  },
  {
    id: 'campaign-atelier',
    label: 'Hair & Silhouette',
    specTag: 'DRY ARCHITECTURAL TAILORING',
    headline: 'Hair movement shaped to dry effortlessly.',
    subcopy:
      'Precision dry cutting paired with Hinoki steam scalp therapy and weightless camellia cuticle sealing.',
    image: '/images/hair-architecture-dark.jpg',
    imageAlt: 'Glossy sculpted hair silhouette illuminated against dark studio stage',
  },
  {
    id: 'campaign-sanctuary',
    label: 'Thermal Bodywork',
    specTag: '52°C VOLCANIC BASALT MERIDIANS',
    headline: 'Slow thermal release from spine to temple.',
    subcopy:
      'Heated volcanic stone work melts postural strain before facial sculpting begins.',
    image: '/images/thermal-stone-dark.jpg',
    imageAlt: 'Heated basalt stones and smoked botanical oil bottle against dark slate',
  },
];

export const PROTOCOL_STAGES: ProtocolStage[] = [
  {
    step: 'Stage 01',
    title: 'Botanical Oil-to-Milk Cleanse',
    metric: 'pH 5.1',
    summary: 'Dissolves urban particulate and sunscreen without disrupting acid-mantle lipids.',
    detail: 'Steamed linen compresses soften congestion prior to lymphatic work.',
    image: '/images/facial-1.jpg',
    imageAlt: 'Esthetician applying botanical emulsion cleanser in warm studio light',
  },
  {
    step: 'Stage 02',
    title: 'Buccal & Lymphatic Sculpting',
    metric: '45 min',
    summary: 'Targeted intra-oral and jawline release drains fluid and elevates cheekbone contour.',
    detail: 'Performed exclusively by senior facialists trained in facial anatomy.',
    image: '/images/sculptural-facial-dark.jpg',
    imageAlt: 'Facial specialist sculpting glowing jawline and cheek contour',
  },
  {
    step: 'Stage 03',
    title: 'Cold-Pressed Peptide Drop',
    metric: '2.4% GHK-Cu',
    summary: 'Concentrated liposomal copper tripeptide serum absorbed into warmed, micro-circulated skin.',
    detail: 'Pressed at 4°C to preserve delicate antioxidant bio-activity.',
    image: '/images/dark-serum-macro.jpg',
    imageAlt: 'Precision glass pipette dispensing copper-burgundy peptide serum',
  },
  {
    step: 'Stage 04',
    title: 'Lamellar Barrier Seal',
    metric: '72 hr lock',
    summary: 'Biomimetic 3:1:1 ceramide emulsion seals hydration and calms post-treatment redness.',
    detail: 'Leaves skin satin-matte and photo-ready with zero heavy residue.',
    image: '/images/barrier-creme-dark.jpg',
    imageAlt: 'Smoked obsidian-burgundy glass cream jar open revealing whipped lamellar ceramide moisturizer',
  },
];

export const BEFORE_AFTER_STUDIES: BeforeAfterStudy[] = [
  {
    id: 'study-contour',
    title: 'Jawline Tension & Surface Dullness',
    protocol: 'Sculptural Facial 01 (Single 90-Minute Session)',
    timeline: 'Immediate post-ritual',
    observation:
      'Visible reduction in lower-face puffiness, softened nasolabial shadows, and crisp light reflection across cheekbones.',
    image: '/images/complexion-editorial-dark.jpg',
    imageAlt: 'Radiant hydrated portrait illustrating before and after facial sculpting on dark backdrop',
    beforeFilter: 'saturate(0.65) contrast(0.92) brightness(0.84)',
    afterFilter: 'saturate(1.06) contrast(1.04) brightness(1.03)',
  },
  {
    id: 'study-barrier',
    title: 'Dehydrated Barrier & Uneven Tone',
    protocol: 'Cellular Hydration (Two-Session Cadence)',
    timeline: 'Day 14 evaluation',
    observation:
      'Refined pore uniformity and calm barrier luster requiring little to no complexion coverage.',
    image: '/images/serum-campaign-alt.jpg',
    imageAlt: 'Close-up beauty portrait showing before and after barrier hydration on black stage',
    beforeFilter: 'saturate(0.62) contrast(0.90) brightness(0.82)',
    afterFilter: 'saturate(1.05) contrast(1.04) brightness(1.02)',
  },
];

export const CLIENT_PERSPECTIVES: ClientPerspective[] = [
  {
    id: 'client-1',
    quote:
      'Ninety minutes of Sculptural Facial 01 lifted my cheek contour more visibly than any device I have tried, and the calm, disciplined atmosphere feels worlds apart from typical salons.',
    author: 'Claire Beaumont',
    role: 'Creative Director · Monthly Ritual Member (Illustrative Client Voice)',
    ritual: 'Sculptural Facial 01',
    image: '/images/complexion-editorial-dark.jpg',
    imageAlt: 'Dark-lit studio beauty portrait of client',
  },
  {
    id: 'client-2',
    quote:
      'Élodie shaped my hair dry so it falls cleanly without heavy styling paste. Pair it with the Hinoki steam scalp therapy and nothing else compares.',
    author: 'Noémi Laurent',
    role: 'Architectural Editor · Paris',
    ritual: 'Silk Hair Architecture',
    image: '/images/hair-architecture-dark.jpg',
    imageAlt: 'Sculpted dark hair waves illuminated in studio light',
  },
];

export const SPECIALISTS = [
  { id: 'camille', name: 'Camille Laurent', role: 'Lead Sculptural Facialist' },
  { id: 'elodie', name: 'Élodie Moreau', role: 'Creative Hair Director' },
  { id: 'sora', name: 'Sora Takahashi', role: 'Editorial Complexion Artist' },
  { id: 'any', name: 'First Available Specialist', role: 'Matched to Ritual' },
];

export const TIME_SLOTS = ['09:30 AM', '11:15 AM', '01:30 PM', '03:15 PM', '05:00 PM'];
