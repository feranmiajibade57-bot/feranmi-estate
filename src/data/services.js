import apartment from '../assets/images/apartment-lagos.jpg';
import villa from '../assets/images/villa-palms.jpg';
import duplex from '../assets/images/duplex-twin.jpg';
import interior from '../assets/images/living-room-wood.jpg';
import commercial from '../assets/images/commercial-lagos.jpg';
import estate from '../assets/images/estate-aerial.jpg';

export const services = [
  {
    id: 'buying',
    icon: 'search',
    title: 'Buying with Feranmi',
    tagline: 'Find the right property, verified before you commit',
    image: villa,
    description:
      'Tell us how you want to live and what you can truly afford. A local advisor in your city shortlists homes and plots that match, arranges inspections, and gives you the full picture — title status, service charges, access roads, everything — before you pay.',
    points: [
      'Free buyer advisory and shortlisting',
      'Guided physical or video inspections',
      'Legal search and title verification report',
      'Negotiation and written offer-to-purchase',
      'Escrow-backed payment and completion support',
    ],
    price: 'Free for buyers',
    cta: 'Start a property search',
  },
  {
    id: 'selling',
    icon: 'chart',
    title: 'Selling & Landlord Services',
    tagline: 'A fair valuation, a real audience, a clean sale',
    image: duplex,
    description:
      'We price your property with evidence from the streets around it, not wishful thinking. Professional photography, listing across our 37-state network and diaspora channels, vetted buyers only, and a transaction desk that chases every document until the sale closes.',
    points: [
      'Evidence-based valuation and pricing strategy',
      'Professional photography and 3D walkthroughs',
      'Listing across our national branch network',
      'Buyer screening and inspection management',
      'Documentation, deed and payment coordination',
    ],
    price: 'Commission agreed upfront',
    cta: 'Request a valuation',
  },
  {
    id: 'renting',
    icon: 'key',
    title: 'Renting & Relocation',
    tagline: 'Land smoothly in a new city',
    image: apartment,
    description:
      'Whether you are moving from Warri to Abuja for work or returning from abroad, we handle the search, the landlord checks, the tenancy agreement and the move-in inspection. You get one advisor, one number, and honest advice about the neighbourhood.',
    points: [
      'Neighbourhood and commute guidance',
      'Viewing itinerary built around your week',
      'Landlord and property checks',
      'Tenancy agreement review',
      'Move-in inventory and handover',
    ],
    price: 'From a half-year rent',
    cta: 'Plan a relocation',
  },
  {
    id: 'land',
    icon: 'cube',
    title: 'Land & Off-plan Estates',
    tagline: 'Buy early, with the paperwork already checked',
    image: estate,
    description:
      'We only bring land to market when the title chain is clean — excision, C of O or gazette as applicable, and a survey that matches. For off-plan estates we show you approvals, timelines and the developer’s track record, then structure a payment plan that fits.',
    points: [
      'Title and survey due diligence',
      'Per-perch transparent pricing',
      'Developer approvals and track record',
      '12–24 month payment plans',
      'Allocation letters and deed processing',
    ],
    price: 'Plots from ₦42M',
    cta: 'See land opportunities',
  },
  {
    id: 'investment',
    icon: 'chart',
    title: 'Investment Advisory',
    tagline: 'Rent yields and growth, in plain numbers',
    image: interior,
    description:
      'We model the numbers before you commit: purchase cost, realistic rent, occupancy, service charges, levies and exit. Our advisors build a portfolio plan around your goals — cashflow now, capital growth later, or a mix of both.',
    points: [
      'Rental yield and total-return modelling',
      'Area growth and infrastructure analysis',
      'Portfolio construction (residential & commercial)',
      'Diaspora investment support',
      'Annual portfolio reviews',
    ],
    price: 'From ₦250,000 / plan',
    cta: 'Book an advisory call',
  },
  {
    id: 'management',
    icon: 'shield',
    title: 'Property Management',
    tagline: 'Own without the worry',
    image: commercial,
    description:
      'For landlords at home and abroad. We find and vet tenants, collect rent, manage repairs with approved spending limits, handle renewals and send a plain-English quarterly report with photographs and a full account of every naira.',
    points: [
      'Tenant sourcing and screening',
      'Rent collection and remittance',
      'Maintenance with spending limits',
      'Renewals, notices and compliance',
      'Quarterly photo reports and accounts',
    ],
    price: '8–10% of annual rent',
    cta: 'Hand your property over',
  },
];

export const process = [
  {
    step: '01',
    icon: 'users',
    title: 'A proper conversation',
    text: 'We start with what you actually need — budget, timeline, family, commute, plans for the next ten years. No listing links thrown at you on day one.',
  },
  {
    step: '02',
    icon: 'search',
    title: 'A shortlist with reasons',
    text: 'Your advisor in the relevant state sends a small, considered shortlist with photos, pricing, title status and why each one made the cut.',
  },
  {
    step: '03',
    icon: 'shield',
    title: 'Verification first',
    text: 'Before any money moves, our legal desk confirms ownership, title and survey, and shares the report with you in writing.',
  },
  {
    step: '04',
    icon: 'key',
    title: 'Close with confidence',
    text: 'We coordinate negotiation, payments through verified channels, documentation and handover — then stay reachable after you have the keys.',
  },
];

export const guarantees = [
  { icon: 'shield', title: 'Verified listings only', text: 'Every property is checked by our legal desk before it is published.' },
  { icon: 'check', title: 'Written, transparent fees', text: 'You know our fee before you commit to anything. No surprise charges.' },
  { icon: 'clock', title: '48-hour response promise', text: 'Every enquiry gets a human reply within two working days — usually the same day.' },
  { icon: 'pin', title: 'A local advisor in your state', text: '37 territories, one standard of care. Someone near you knows the ground.' },
];
