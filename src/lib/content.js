/* Static marketing / structural content — not sourced from the database.
   Mirrors BRAND, NAV, STYLES, PROCESS, WHYS, SERVICES, SERVICE_STEPS, STATS,
   VALUES, PHILOSOPHY, FAQS, SHOWCASE, PROPERTY_TYPES, BUDGETS, HOME_SIZES and
   JOURNEY from the original single-file prototype. */

export const BRAND = {
  name: "Rishi Home Interior",
  nameLead: "Rishi Home",
  nameAccent: "Interior",
  tagline: "Thoughtful interiors. Timeless living.",
  phone: "+91 98104 81819",
  phoneHref: "tel:+919810481819",
  whatsapp: "919810481819",
  email: "rishijihome@gmail.com",
  address: "First floor, G - 97, G Block, Sector 9, Noida, Uttar Pradesh 201304",
  hours: "Mon – Sat · 10:00 – 19:00"
};

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Design Ideas", href: "/design-ideas" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const STYLES = ["Modern", "Minimal", "Contemporary", "Scandinavian", "Luxury", "Indian", "Japandi", "Industrial", "Classic"];

export const SHOWCASE = [
  { img: "photo-1615873968403-89e068629265", cap: "Living Room · Gurugram" },
  { img: "photo-1600489000022-c2086d79f9d4", cap: "Modular Kitchen · Sector 57" },
  { img: "photo-1566665797739-1674de7a421a", cap: "Master Bedroom · DLF Phase 4" },
  { img: "photo-1696987007764-7f8b85dd3033", cap: "Bathroom · Golf Course Road" },
  { img: "photo-1617806118233-18e1de247200", cap: "Dining Room · South City" },
  { img: "photo-1618236444721-4a8dba415c15", cap: "Wardrobe · Nirvana Country" },
  { img: "photo-1724582586508-8f06117dc979", cap: "TV Unit · Sohna Road" },
  { img: "photo-1524549207884-e7d1130ae2f3", cap: "Balcony · Sector 65" },
  { img: "photo-1616628188540-925618b98318", cap: "Material Study · Studio" }
];

export const PROCESS = [
  { n: "01", t: "Discover", d: "We start with how you actually live — routines, storage, light, the things you already own." },
  { n: "02", t: "Design", d: "Concepts, layouts, 3D views and a material palette you can hold before anything is ordered." },
  { n: "03", t: "Build", d: "Factory-made modules, site carpentry and finishing, run to a dated schedule." },
  { n: "04", t: "Move In", d: "Snag list closed, surfaces cleaned, warranty handed over. You walk into a finished home." }
];

export const WHYS = [
  { n: "01", t: "Thoughtful Design", d: "Every plan starts from your routine and the light the site actually gets — not from a template." },
  { n: "02", t: "Transparent Process", d: "Itemised quotes, dated schedules and a single point of contact from first sketch to handover." },
  { n: "03", t: "Quality Materials", d: "Specified by brand and grade in writing, with samples in your hands before approval." },
  { n: "04", t: "Personalised Approach", d: "A small studio by choice. The designer who draws your home is the one who sees it built." }
];

export const SERVICES = [
  { n: "01", t: "Full Home Interiors", img: "photo-1615873968403-89e068629265",
    d: "End-to-end design and execution for a complete home — planning, joinery, finishes, lighting, furnishing and handover under one schedule.",
    incl: ["Space planning and 3D views", "Civil, electrical and plumbing coordination", "Modular joinery for every room", "Lighting scheme and fixture selection", "Furnishing, styling and handover"] },
  { n: "02", t: "Modular Kitchens", img: "photo-1600489000022-c2086d79f9d4",
    d: "Kitchens planned around how you cook, built from factory-finished modules with hardware chosen to survive Indian kitchens.",
    incl: ["Ergonomic working triangle", "Moisture-resistant carcass options", "Soft-close and lift-up hardware", "Counter, backsplash and sink specification", "Appliance integration"] },
  { n: "03", t: "Wardrobes & Storage", img: "photo-1618236444721-4a8dba415c15",
    d: "Wardrobes, dressing areas, utility and loft storage — sized to what you own rather than to a standard module chart.",
    incl: ["Internal layout to your wardrobe audit", "Sliding, hinged or open systems", "Integrated lighting and mirrors", "Anti-dust and anti-moisture detailing", "Loft and utility storage"] },
  { n: "04", t: "Living Room Design", img: "photo-1615529182904-14819c35db37",
    d: "Seating layouts, media walls, accent surfaces and lighting for the room that carries the most traffic in the house.",
    incl: ["Seating and circulation plan", "TV and media wall joinery", "Accent wall and texture selection", "Layered lighting design", "Soft furnishing and art placement"] },
  { n: "05", t: "Bedroom Interiors", img: "photo-1566665797739-1674de7a421a",
    d: "Master, guest and children's bedrooms — headboard walls, wardrobes, side storage and a lighting layout that works at night.",
    incl: ["Headboard and accent wall joinery", "Wardrobe and side storage", "Two-scene bedroom lighting", "Drapery and blackout detailing", "Child-safe options for kids' rooms"] },
  { n: "06", t: "Renovation", img: "photo-1638799869566-b17fa794c4de",
    d: "Renovating an older home or a single room — surveyed first, then planned around what can and cannot be moved.",
    incl: ["Existing-condition survey", "Structural and services coordination", "Phased work plan for occupied homes", "Waterproofing and surface repair", "Finish matching with existing areas"] },
  { n: "07", t: "Custom Furniture", img: "photo-1723750290151-164cb19ebab7",
    d: "Pieces made to the millimetre when nothing off the shelf fits — tables, beds, consoles, seating and shelving.",
    incl: ["Measured drawings and prototypes", "Solid wood and veneer options", "Upholstery fabric selection", "Finish and edge detailing", "Delivery and on-site fitting"] }
];

export const SERVICE_STEPS = [
  { n: "01", t: "Consult", d: "A conversation about the home, the budget and the timeline." },
  { n: "02", t: "Plan", d: "Site measurement, layout options and a working scope." },
  { n: "03", t: "Design", d: "3D views, material palette and an itemised quotation." },
  { n: "04", t: "Execute", d: "Production, site work and weekly progress updates." },
  { n: "05", t: "Handover", d: "Snagging, cleaning, documentation and warranty." }
];

export const STATS = [
  { v: "100+", l: "Spaces Designed" },
  { v: "8+", l: "Years of Experience" },
  { v: "50+", l: "Design Concepts" },
  { v: "4.9/5", l: "Client Experience" }
];

export const VALUES = [
  { t: "Clarity", d: "Scope, cost and dates written down before work starts, and updated when anything changes." },
  { t: "Craft", d: "Detailing checked at the factory and again on site, because the last five per cent is what you live with." },
  { t: "Restraint", d: "We would rather specify four materials well than twelve for effect." },
  { t: "Longevity", d: "Finishes and layouts chosen so the home still reads well after eight years of use." }
];

export const PHILOSOPHY = [
  { k: "Beauty", p: "Good design should feel effortless." },
  { k: "Function", p: "Every detail should have a purpose." },
  { k: "Personality", p: "Your home should feel like you." }
];

export const FAQS = [
  { q: "How does the interior design process work?",
    a: "It runs in five stages — consultation, planning, design, execution and handover. After a first conversation we measure the site, prepare layout options and a material palette, and issue an itemised quotation. Once that is approved, production and site work begin against a dated schedule, with weekly updates until snagging and handover." },
  { q: "How much does interior design cost?",
    a: "Cost depends on scope, the number of rooms and the material grades chosen, so we quote line by line rather than by a single per-square-foot figure. As a broad guide, a 2 BHK full-home interior typically starts in the ₹5–10 lakh range and rises with bespoke joinery, natural stone and imported hardware. You will always see a written breakdown before committing." },
  { q: "Can you customise designs?",
    a: "Yes — every project is drawn for the specific home. The designs on this site are starting points for a conversation about proportion, storage and palette, not fixed packages. Sizes, finishes, layouts and hardware are all specified to your rooms." },
  { q: "Do you handle execution?",
    a: "Yes. We handle design and execution together, including modular production, site carpentry, electrical and plumbing coordination, false ceiling, painting and finishing. One team is accountable for the drawing and for what gets built from it." },
  { q: "How long does a project take?",
    a: "A single room typically takes three to five weeks from approval. A 2–3 BHK full home usually runs eight to twelve weeks, and a villa or a renovation of an occupied home longer. The schedule is shared at the start and reviewed weekly." },
  { q: "Can I choose materials and finishes?",
    a: "Always. You see physical samples of laminates, veneers, stone, fabric and hardware before approving anything, and the final quotation names each material by brand and grade so there are no substitutions later." }
];

export const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Villa", "Office", "Other"];
export const BUDGETS = ["Under ₹5L", "₹5–10L", "₹10–20L", "₹20L+"];
export const HOME_SIZES = ["Under 800 sq ft", "800 – 1200 sq ft", "1200 – 1800 sq ft", "1800 – 2500 sq ft", "2500+ sq ft"];
export const JOURNEY = ["Inspire", "Explore", "Discover", "Visualize", "Consult", "Create"];

export const META = {
  "/": { t: "Rishi Home Interior | Premium Home Interior Design",
    d: "Thoughtfully designed interiors that balance beauty, functionality and the way you live. Full home interiors, modular kitchens and wardrobes in Delhi." },
  "/design-ideas": { t: "Design Ideas | Rishi Home Interior",
    d: "Explore curated interior design ideas for kitchens, living rooms, bedrooms, bathrooms, wardrobes and more. Filter by room, style and keyword." },
  "/services": { t: "Interior Design Services | Rishi Home Interior",
    d: "Full home interiors, modular kitchens, wardrobes, living room and bedroom design, renovation and custom furniture — designed and executed by one team." },
  "/about": { t: "About the Studio | Rishi Home Interior",
    d: "A Delhi interior design studio working since 2018. Planning first, styling last — our story, philosophy, approach and values." },
  "/contact": { t: "Book a Consultation | Rishi Home Interior",
    d: "Tell us about your space and book a free interior design consultation. Call +91 98104 81819 or send us your requirements." },
  "404": { t: "Page Not Found | Rishi Home Interior", d: "The page you were looking for has moved or never existed." }
};
