export interface GradientStop {
  color: string;
  offset: number;
}

export interface GradientDef {
  id: string;
  label: string;
  stops: GradientStop[];
  angle: number;
}

export const WEBGRADIENTS: GradientDef[] = [
  {
    id: "warm-flame",
    label: "Warm Flame",
    angle: 45,
    stops: [
      { color: "#ff9a9e", offset: 0 },
      { color: "#fad0c4", offset: 99 },
      { color: "#fad0c4", offset: 100 },
    ],
  },
  {
    id: "night-fade",
    label: "Night Fade",
    angle: 0,
    stops: [
      { color: "#a18cd1", offset: 0 },
      { color: "#fbc2eb", offset: 100 },
    ],
  },
  {
    id: "spring-warmth",
    label: "Spring Warmth",
    angle: 0,
    stops: [
      { color: "#fad0c4", offset: 0 },
      { color: "#fad0c4", offset: 1 },
      { color: "#ffd1ff", offset: 100 },
    ],
  },
  {
    id: "juicy-peach",
    label: "Juicy Peach",
    angle: 90,
    stops: [
      { color: "#ffecd2", offset: 0 },
      { color: "#fcb69f", offset: 100 },
    ],
  },
  {
    id: "young-passion",
    label: "Young Passion",
    angle: 90,
    stops: [
      { color: "#ff8177", offset: 0 },
      { color: "#ff867a", offset: 0 },
      { color: "#ff8c7f", offset: 21 },
      { color: "#f99185", offset: 52 },
      { color: "#cf556c", offset: 78 },
      { color: "#b12a5b", offset: 100 },
    ],
  },
  {
    id: "lady-lips",
    label: "Lady Lips",
    angle: 0,
    stops: [
      { color: "#ff9a9e", offset: 0 },
      { color: "#fecfef", offset: 99 },
      { color: "#fecfef", offset: 100 },
    ],
  },
  {
    id: "sunny-morning",
    label: "Sunny Morning",
    angle: 120,
    stops: [
      { color: "#f6d365", offset: 0 },
      { color: "#fda085", offset: 100 },
    ],
  },
  {
    id: "rainy-ashville",
    label: "Rainy Ashville",
    angle: 0,
    stops: [
      { color: "#fbc2eb", offset: 0 },
      { color: "#a6c1ee", offset: 100 },
    ],
  },
  {
    id: "frozen-dreams",
    label: "Frozen Dreams",
    angle: 0,
    stops: [
      { color: "#fdcbf1", offset: 0 },
      { color: "#fdcbf1", offset: 1 },
      { color: "#e6dee9", offset: 100 },
    ],
  },
  {
    id: "winter-neva",
    label: "Winter Neva",
    angle: 120,
    stops: [
      { color: "#a1c4fd", offset: 0 },
      { color: "#c2e9fb", offset: 100 },
    ],
  },
  {
    id: "dusty-grass",
    label: "Dusty Grass",
    angle: 120,
    stops: [
      { color: "#d4fc79", offset: 0 },
      { color: "#96e6a1", offset: 100 },
    ],
  },
  {
    id: "tempting-azure",
    label: "Tempting Azure",
    angle: 120,
    stops: [
      { color: "#84fab0", offset: 0 },
      { color: "#8fd3f4", offset: 100 },
    ],
  },
  {
    id: "heavy-rain",
    label: "Heavy Rain",
    angle: 0,
    stops: [
      { color: "#cfd9df", offset: 0 },
      { color: "#e2ebf0", offset: 100 },
    ],
  },
  {
    id: "amy-crisp",
    label: "Amy Crisp",
    angle: 120,
    stops: [
      { color: "#a6c0fe", offset: 0 },
      { color: "#f68084", offset: 100 },
    ],
  },
  {
    id: "mean-fruit",
    label: "Mean Fruit",
    angle: 120,
    stops: [
      { color: "#fccb90", offset: 0 },
      { color: "#d57eeb", offset: 100 },
    ],
  },
  {
    id: "lilac-sky",
    label: "Lilac Sky",
    angle: 120,
    stops: [
      { color: "#e0c3fc", offset: 0 },
      { color: "#8ec5fc", offset: 100 },
    ],
  },
  {
    id: "ripe-malinka",
    label: "Ripe Malinka",
    angle: 120,
    stops: [
      { color: "#f093fb", offset: 0 },
      { color: "#f5576c", offset: 100 },
    ],
  },
  {
    id: "cloudy-knoxville",
    label: "Cloudy Knoxville",
    angle: 120,
    stops: [
      { color: "#fdfbfb", offset: 0 },
      { color: "#ebedee", offset: 100 },
    ],
  },
  {
    id: "malibu-beach",
    label: "Malibu Beach",
    angle: 90,
    stops: [
      { color: "#4facfe", offset: 0 },
      { color: "#00f2fe", offset: 100 },
    ],
  },
  {
    id: "new-life",
    label: "New Life",
    angle: 90,
    stops: [
      { color: "#43e97b", offset: 0 },
      { color: "#38f9d7", offset: 100 },
    ],
  },
  {
    id: "true-sunset",
    label: "True Sunset",
    angle: 90,
    stops: [
      { color: "#fa709a", offset: 0 },
      { color: "#fee140", offset: 100 },
    ],
  },
  {
    id: "morpheus-den",
    label: "Morpheus Den",
    angle: 0,
    stops: [
      { color: "#30cfd0", offset: 0 },
      { color: "#330867", offset: 100 },
    ],
  },
  {
    id: "rare-wind",
    label: "Rare Wind",
    angle: 0,
    stops: [
      { color: "#a8edea", offset: 0 },
      { color: "#fed6e3", offset: 100 },
    ],
  },
  {
    id: "near-moon",
    label: "Near Moon",
    angle: 0,
    stops: [
      { color: "#5ee7df", offset: 0 },
      { color: "#b490ca", offset: 100 },
    ],
  },
  {
    id: "wild-apple",
    label: "Wild Apple",
    angle: 0,
    stops: [
      { color: "#d299c2", offset: 0 },
      { color: "#fef9d7", offset: 100 },
    ],
  },
  {
    id: "saint-petersburg",
    label: "Saint Petersburg",
    angle: 135,
    stops: [
      { color: "#f5f7fa", offset: 0 },
      { color: "#c3cfe2", offset: 100 },
    ],
  },
  {
    id: "arielle-s-smile",
    label: "Arielle's Smile",
    angle: 135,
    stops: [
      { color: "#16d9e3", offset: 0 },
      { color: "#46aef7", offset: 100 },
    ],
  },
  {
    id: "plum-plate",
    label: "Plum Plate",
    angle: 135,
    stops: [
      { color: "#667eea", offset: 0 },
      { color: "#764ba2", offset: 100 },
    ],
  },
  {
    id: "everlasting-sky",
    label: "Everlasting Sky",
    angle: 135,
    stops: [
      { color: "#fdfcfb", offset: 0 },
      { color: "#e2d1c3", offset: 100 },
    ],
  },
  {
    id: "happy-fisher",
    label: "Happy Fisher",
    angle: 120,
    stops: [
      { color: "#89f7fe", offset: 0 },
      { color: "#66a6ff", offset: 100 },
    ],
  },
  {
    id: "blessing",
    label: "Blessing",
    angle: 0,
    stops: [
      { color: "#fddb92", offset: 0 },
      { color: "#d1fdff", offset: 100 },
    ],
  },
  {
    id: "sharpeye-eagle",
    label: "Sharpeye Eagle",
    angle: 0,
    stops: [
      { color: "#9890e3", offset: 0 },
      { color: "#b1f4cf", offset: 100 },
    ],
  },
  {
    id: "ladoga-bottom",
    label: "Ladoga Bottom",
    angle: 0,
    stops: [
      { color: "#ebc0fd", offset: 0 },
      { color: "#d9ded8", offset: 100 },
    ],
  },
  {
    id: "lemon-gate",
    label: "Lemon Gate",
    angle: 0,
    stops: [
      { color: "#96fbc4", offset: 0 },
      { color: "#f9f586", offset: 100 },
    ],
  },
  {
    id: "itmeo-branding",
    label: "Itmeo Branding",
    angle: 180,
    stops: [
      { color: "#2af598", offset: 0 },
      { color: "#009efd", offset: 100 },
    ],
  },
  {
    id: "zeus-miracle",
    label: "Zeus Miracle",
    angle: 0,
    stops: [
      { color: "#cd9cf2", offset: 0 },
      { color: "#f6f3ff", offset: 100 },
    ],
  },
  {
    id: "old-hat",
    label: "Old Hat",
    angle: 90,
    stops: [
      { color: "#e4afcb", offset: 0 },
      { color: "#b8cbb8", offset: 0 },
      { color: "#b8cbb8", offset: 0 },
      { color: "#e2c58b", offset: 30 },
      { color: "#c2ce9c", offset: 64 },
      { color: "#7edbdc", offset: 100 },
    ],
  },
  {
    id: "star-wine",
    label: "Star Wine",
    angle: 90,
    stops: [
      { color: "#b8cbb8", offset: 0 },
      { color: "#b8cbb8", offset: 0 },
      { color: "#b465da", offset: 0 },
      { color: "#cf6cc9", offset: 33 },
      { color: "#ee609c", offset: 66 },
      { color: "#ee609c", offset: 100 },
    ],
  },
  {
    id: "deep-blue",
    label: "Deep Blue",
    angle: 90,
    stops: [
      { color: "#6a11cb", offset: 0 },
      { color: "#2575fc", offset: 100 },
    ],
  },
  {
    id: "coup-de-grace",
    label: "Coup de Grace",
    angle: 180,
    stops: [
      { color: "#DCD9D4", offset: 0 },
      { color: "#DCD9D4", offset: 100 },
    ],
  },
  {
    id: "happy-acid",
    label: "Happy Acid",
    angle: 0,
    stops: [
      { color: "#37ecba", offset: 0 },
      { color: "#72afd3", offset: 100 },
    ],
  },
  {
    id: "awesome-pine",
    label: "Awesome Pine",
    angle: 0,
    stops: [
      { color: "#ebbba7", offset: 0 },
      { color: "#cfc7f8", offset: 100 },
    ],
  },
  {
    id: "new-york",
    label: "New York",
    angle: 0,
    stops: [
      { color: "#fff1eb", offset: 0 },
      { color: "#ace0f9", offset: 100 },
    ],
  },
  {
    id: "shy-rainbow",
    label: "Shy Rainbow",
    angle: 90,
    stops: [
      { color: "#eea2a2", offset: 0 },
      { color: "#bbc1bf", offset: 19 },
      { color: "#57c6e1", offset: 42 },
      { color: "#b49fda", offset: 79 },
      { color: "#7ac5d8", offset: 100 },
    ],
  },
  {
    id: "loon-crest",
    label: "Loon Crest",
    angle: 180,
    stops: [
      { color: "#989898", offset: 0 },
      { color: "#989898", offset: 100 },
    ],
  },
  {
    id: "mixed-hopes",
    label: "Mixed Hopes",
    angle: 0,
    stops: [
      { color: "#c471f5", offset: 0 },
      { color: "#fa71cd", offset: 100 },
    ],
  },
  {
    id: "fly-high",
    label: "Fly High",
    angle: 0,
    stops: [
      { color: "#48c6ef", offset: 0 },
      { color: "#6f86d6", offset: 100 },
    ],
  },
  {
    id: "strong-bliss",
    label: "Strong Bliss",
    angle: 90,
    stops: [
      { color: "#f78ca0", offset: 0 },
      { color: "#f9748f", offset: 19 },
      { color: "#fd868c", offset: 60 },
      { color: "#fe9a8b", offset: 100 },
    ],
  },
  {
    id: "fresh-milk",
    label: "Fresh Milk",
    angle: 0,
    stops: [
      { color: "#feada6", offset: 0 },
      { color: "#f5efef", offset: 100 },
    ],
  },
  {
    id: "snow-again",
    label: "Snow Again",
    angle: 0,
    stops: [
      { color: "#e6e9f0", offset: 0 },
      { color: "#eef1f5", offset: 100 },
    ],
  },
  {
    id: "february-ink",
    label: "February Ink",
    angle: 0,
    stops: [
      { color: "#accbee", offset: 0 },
      { color: "#e7f0fd", offset: 100 },
    ],
  },
  {
    id: "kind-steel",
    label: "Kind Steel",
    angle: -20,
    stops: [
      { color: "#e9defa", offset: 0 },
      { color: "#fbfcdb", offset: 100 },
    ],
  },
  {
    id: "soft-grass",
    label: "Soft Grass",
    angle: 0,
    stops: [
      { color: "#c1dfc4", offset: 0 },
      { color: "#deecdd", offset: 100 },
    ],
  },
  {
    id: "grown-early",
    label: "Grown Early",
    angle: 0,
    stops: [
      { color: "#0ba360", offset: 0 },
      { color: "#3cba92", offset: 100 },
    ],
  },
  {
    id: "sharp-blues",
    label: "Sharp Blues",
    angle: 0,
    stops: [
      { color: "#00c6fb", offset: 0 },
      { color: "#005bea", offset: 100 },
    ],
  },
  {
    id: "shady-water",
    label: "Shady Water",
    angle: 90,
    stops: [
      { color: "#74ebd5", offset: 0 },
      { color: "#9face6", offset: 100 },
    ],
  },
  {
    id: "dirty-beauty",
    label: "Dirty Beauty",
    angle: 0,
    stops: [
      { color: "#6a85b6", offset: 0 },
      { color: "#bac8e0", offset: 100 },
    ],
  },
  {
    id: "great-whale",
    label: "Great Whale",
    angle: 0,
    stops: [
      { color: "#a3bded", offset: 0 },
      { color: "#6991c7", offset: 100 },
    ],
  },
  {
    id: "teen-notebook",
    label: "Teen Notebook",
    angle: 0,
    stops: [
      { color: "#9795f0", offset: 0 },
      { color: "#fbc8d4", offset: 100 },
    ],
  },
  {
    id: "polite-rumors",
    label: "Polite Rumors",
    angle: 0,
    stops: [
      { color: "#a7a6cb", offset: 0 },
      { color: "#8989ba", offset: 52 },
      { color: "#8989ba", offset: 100 },
    ],
  },
  {
    id: "sweet-period",
    label: "Sweet Period",
    angle: 0,
    stops: [
      { color: "#3f51b1", offset: 0 },
      { color: "#5a55ae", offset: 13 },
      { color: "#7b5fac", offset: 25 },
      { color: "#8f6aae", offset: 38 },
      { color: "#a86aa4", offset: 50 },
      { color: "#cc6b8e", offset: 62 },
      { color: "#f18271", offset: 75 },
      { color: "#f3a469", offset: 87 },
      { color: "#f7c978", offset: 100 },
    ],
  },
  {
    id: "wide-matrix",
    label: "Wide Matrix",
    angle: 0,
    stops: [
      { color: "#fcc5e4", offset: 0 },
      { color: "#fda34b", offset: 15 },
      { color: "#ff7882", offset: 35 },
      { color: "#c8699e", offset: 52 },
      { color: "#7046aa", offset: 71 },
      { color: "#0c1db8", offset: 87 },
      { color: "#020f75", offset: 100 },
    ],
  },
  {
    id: "soft-cherish",
    label: "Soft Cherish",
    angle: 0,
    stops: [
      { color: "#dbdcd7", offset: 0 },
      { color: "#dddcd7", offset: 24 },
      { color: "#e2c9cc", offset: 30 },
      { color: "#e7627d", offset: 46 },
      { color: "#b8235a", offset: 59 },
      { color: "#801357", offset: 71 },
      { color: "#3d1635", offset: 84 },
      { color: "#1c1a27", offset: 100 },
    ],
  },
  {
    id: "red-salvation",
    label: "Red Salvation",
    angle: 0,
    stops: [
      { color: "#f43b47", offset: 0 },
      { color: "#453a94", offset: 100 },
    ],
  },
  {
    id: "burning-spring",
    label: "Burning Spring",
    angle: 0,
    stops: [
      { color: "#4fb576", offset: 0 },
      { color: "#44c489", offset: 30 },
      { color: "#28a9ae", offset: 46 },
      { color: "#28a2b7", offset: 59 },
      { color: "#4c7788", offset: 71 },
      { color: "#6c4f63", offset: 86 },
      { color: "#432c39", offset: 100 },
    ],
  },
  {
    id: "night-party",
    label: "Night Party",
    angle: 0,
    stops: [
      { color: "#0250c5", offset: 0 },
      { color: "#d43f8d", offset: 100 },
    ],
  },
  {
    id: "sky-glider",
    label: "Sky Glider",
    angle: 0,
    stops: [
      { color: "#88d3ce", offset: 0 },
      { color: "#6e45e2", offset: 100 },
    ],
  },
  {
    id: "heaven-peach",
    label: "Heaven Peach",
    angle: 0,
    stops: [
      { color: "#d9afd9", offset: 0 },
      { color: "#97d9e1", offset: 100 },
    ],
  },
  {
    id: "purple-division",
    label: "Purple Division",
    angle: 0,
    stops: [
      { color: "#7028e4", offset: 0 },
      { color: "#e5b2ca", offset: 100 },
    ],
  },
  {
    id: "aqua-splash",
    label: "Aqua Splash",
    angle: 15,
    stops: [
      { color: "#13547a", offset: 0 },
      { color: "#80d0c7", offset: 100 },
    ],
  },
  {
    id: "above-clouds",
    label: "Above Clouds",
    angle: 270,
    stops: [
      { color: "#BDBBBE", offset: 0 },
      { color: "#9D9EA3", offset: 100 },
    ],
  },
  {
    id: "spiky-naga",
    label: "Spiky Naga",
    angle: 0,
    stops: [
      { color: "#505285", offset: 0 },
      { color: "#585e92", offset: 12 },
      { color: "#65689f", offset: 25 },
      { color: "#7474b0", offset: 37 },
      { color: "#7e7ebb", offset: 50 },
      { color: "#8389c7", offset: 62 },
      { color: "#9795d4", offset: 75 },
      { color: "#a2a1dc", offset: 87 },
      { color: "#b5aee4", offset: 100 },
    ],
  },
  {
    id: "love-kiss",
    label: "Love Kiss",
    angle: 0,
    stops: [
      { color: "#ff0844", offset: 0 },
      { color: "#ffb199", offset: 100 },
    ],
  },
  {
    id: "sharp-glass",
    label: "Sharp Glass",
    angle: -180,
    stops: [
      { color: "#C9CCD3", offset: 0 },
      { color: "#C9CCD3", offset: 100 },
    ],
  },
  {
    id: "clean-mirror",
    label: "Clean Mirror",
    angle: 45,
    stops: [
      { color: "#93a5cf", offset: 0 },
      { color: "#e4efe9", offset: 100 },
    ],
  },
  {
    id: "cold-evening",
    label: "Cold Evening",
    angle: 0,
    stops: [
      { color: "#0c3483", offset: 0 },
      { color: "#a2b6df", offset: 100 },
      { color: "#6b8cce", offset: 100 },
      { color: "#a2b6df", offset: 100 },
    ],
  },
  {
    id: "cochiti-lake",
    label: "Cochiti Lake",
    angle: 45,
    stops: [
      { color: "#93a5cf", offset: 0 },
      { color: "#e4efe9", offset: 100 },
    ],
  },
  {
    id: "summer-games",
    label: "Summer Games",
    angle: 90,
    stops: [
      { color: "#92fe9d", offset: 0 },
      { color: "#00c9ff", offset: 100 },
    ],
  },
  {
    id: "passionate-bed",
    label: "Passionate Bed",
    angle: 90,
    stops: [
      { color: "#ff758c", offset: 0 },
      { color: "#ff7eb3", offset: 100 },
    ],
  },
  {
    id: "mountain-rock",
    label: "Mountain Rock",
    angle: 90,
    stops: [
      { color: "#868f96", offset: 0 },
      { color: "#596164", offset: 100 },
    ],
  },
  {
    id: "desert-hump",
    label: "Desert Hump",
    angle: 0,
    stops: [
      { color: "#c79081", offset: 0 },
      { color: "#dfa579", offset: 100 },
    ],
  },
  {
    id: "jungle-day",
    label: "Jungle Day",
    angle: 45,
    stops: [
      { color: "#8baaaa", offset: 0 },
      { color: "#ae8b9c", offset: 100 },
    ],
  },
  {
    id: "phoenix-start",
    label: "Phoenix Start",
    angle: 90,
    stops: [
      { color: "#f83600", offset: 0 },
      { color: "#f9d423", offset: 100 },
    ],
  },
  {
    id: "october-silence",
    label: "October Silence",
    angle: -20,
    stops: [
      { color: "#b721ff", offset: 0 },
      { color: "#21d4fd", offset: 100 },
    ],
  },
  {
    id: "faraway-river",
    label: "Faraway River",
    angle: -20,
    stops: [
      { color: "#6e45e2", offset: 0 },
      { color: "#88d3ce", offset: 100 },
    ],
  },
  {
    id: "alchemist-lab",
    label: "Alchemist Lab",
    angle: -20,
    stops: [
      { color: "#d558c8", offset: 0 },
      { color: "#24d292", offset: 100 },
    ],
  },
  {
    id: "over-sun",
    label: "Over Sun",
    angle: 60,
    stops: [
      { color: "#abecd6", offset: 0 },
      { color: "#fbed96", offset: 100 },
    ],
  },
  {
    id: "premium-white",
    label: "Premium White",
    angle: 0,
    stops: [
      { color: "#d5d4d0", offset: 0 },
      { color: "#d5d4d0", offset: 1 },
      { color: "#eeeeec", offset: 31 },
      { color: "#efeeec", offset: 75 },
      { color: "#e9e9e7", offset: 100 },
    ],
  },
  {
    id: "mars-party",
    label: "Mars Party",
    angle: 0,
    stops: [
      { color: "#5f72bd", offset: 0 },
      { color: "#9b23ea", offset: 100 },
    ],
  },
  {
    id: "eternal-constance",
    label: "Eternal Constance",
    angle: 0,
    stops: [
      { color: "#09203f", offset: 0 },
      { color: "#537895", offset: 100 },
    ],
  },
  {
    id: "japan-blush",
    label: "Japan Blush",
    angle: -20,
    stops: [
      { color: "#ddd6f3", offset: 0 },
      { color: "#faaca8", offset: 100 },
      { color: "#faaca8", offset: 100 },
    ],
  },
  {
    id: "smiling-rain",
    label: "Smiling Rain",
    angle: -20,
    stops: [
      { color: "#dcb0ed", offset: 0 },
      { color: "#99c99c", offset: 100 },
    ],
  },
  {
    id: "cloudy-apple",
    label: "Cloudy Apple",
    angle: 0,
    stops: [
      { color: "#f3e7e9", offset: 0 },
      { color: "#e3eeff", offset: 99 },
      { color: "#e3eeff", offset: 100 },
    ],
  },
  {
    id: "big-mango",
    label: "Big Mango",
    angle: 0,
    stops: [
      { color: "#c71d6f", offset: 0 },
      { color: "#d09693", offset: 100 },
    ],
  },
  {
    id: "healthy-water",
    label: "Healthy Water",
    angle: 60,
    stops: [
      { color: "#96deda", offset: 0 },
      { color: "#50c9c3", offset: 100 },
    ],
  },
  {
    id: "amour-amour",
    label: "Amour Amour",
    angle: 0,
    stops: [
      { color: "#f77062", offset: 0 },
      { color: "#fe5196", offset: 100 },
    ],
  },
  {
    id: "risky-concrete",
    label: "Risky Concrete",
    angle: 0,
    stops: [
      { color: "#c4c5c7", offset: 0 },
      { color: "#dcdddf", offset: 52 },
      { color: "#ebebeb", offset: 100 },
    ],
  },
  {
    id: "strong-stick",
    label: "Strong Stick",
    angle: 90,
    stops: [
      { color: "#a8caba", offset: 0 },
      { color: "#5d4157", offset: 100 },
    ],
  },
  {
    id: "vicious-stance",
    label: "Vicious Stance",
    angle: 60,
    stops: [
      { color: "#29323c", offset: 0 },
      { color: "#485563", offset: 100 },
    ],
  },
  {
    id: "palo-alto",
    label: "Palo Alto",
    angle: -60,
    stops: [
      { color: "#16a085", offset: 0 },
      { color: "#f4d03f", offset: 100 },
    ],
  },
  {
    id: "happy-memories",
    label: "Happy Memories",
    angle: -60,
    stops: [
      { color: "#ff5858", offset: 0 },
      { color: "#f09819", offset: 100 },
    ],
  },
  {
    id: "midnight-bloom",
    label: "Midnight Bloom",
    angle: -20,
    stops: [
      { color: "#2b5876", offset: 0 },
      { color: "#4e4376", offset: 100 },
    ],
  },
  {
    id: "crystalline",
    label: "Crystalline",
    angle: -20,
    stops: [
      { color: "#00cdac", offset: 0 },
      { color: "#8ddad5", offset: 100 },
    ],
  },
  {
    id: "raccoon-back",
    label: "Raccoon Back",
    angle: -180,
    stops: [
      { color: "#BCC5CE", offset: 0 },
      { color: "#929EAD", offset: 98 },
    ],
  },
  {
    id: "party-bliss",
    label: "Party Bliss",
    angle: 0,
    stops: [
      { color: "#4481eb", offset: 0 },
      { color: "#04befe", offset: 100 },
    ],
  },
  {
    id: "confident-cloud",
    label: "Confident Cloud",
    angle: 0,
    stops: [
      { color: "#dad4ec", offset: 0 },
      { color: "#dad4ec", offset: 1 },
      { color: "#f3e7e9", offset: 100 },
    ],
  },
  {
    id: "le-cocktail",
    label: "Le Cocktail",
    angle: 45,
    stops: [
      { color: "#874da2", offset: 0 },
      { color: "#c43a30", offset: 100 },
    ],
  },
  {
    id: "river-city",
    label: "River City",
    angle: 0,
    stops: [
      { color: "#4481eb", offset: 0 },
      { color: "#04befe", offset: 100 },
    ],
  },
  {
    id: "frozen-berry",
    label: "Frozen Berry",
    angle: 0,
    stops: [
      { color: "#e8198b", offset: 0 },
      { color: "#c7eafd", offset: 100 },
    ],
  },
  {
    id: "elegance",
    label: "Elegance",
    angle: 135,
    stops: [
      { color: "#EADFDF", offset: 0 },
      { color: "#ECE2DF", offset: 100 },
    ],
  },
  {
    id: "child-care",
    label: "Child Care",
    angle: -20,
    stops: [
      { color: "#f794a4", offset: 0 },
      { color: "#fdd6bd", offset: 100 },
    ],
  },
  {
    id: "flying-lemon",
    label: "Flying Lemon",
    angle: 60,
    stops: [
      { color: "#64b3f4", offset: 0 },
      { color: "#c2e59c", offset: 100 },
    ],
  },
  {
    id: "new-retrowave",
    label: "New Retrowave",
    angle: 0,
    stops: [
      { color: "#3b41c5", offset: 0 },
      { color: "#a981bb", offset: 49 },
      { color: "#ffc8a9", offset: 100 },
    ],
  },
  {
    id: "hidden-jaguar",
    label: "Hidden Jaguar",
    angle: 0,
    stops: [
      { color: "#0fd850", offset: 0 },
      { color: "#f9f047", offset: 100 },
    ],
  },
  {
    id: "above-the-sky",
    label: "Above The Sky",
    angle: 0,
    stops: [
      { color: "#e0e0e0", offset: 26 },
      { color: "#efefef", offset: 48 },
      { color: "#d9d9d9", offset: 75 },
      { color: "#bcbcbc", offset: 100 },
    ],
  },
  {
    id: "nega",
    label: "Nega",
    angle: 45,
    stops: [
      { color: "#ee9ca7", offset: 0 },
      { color: "#ffdde1", offset: 100 },
    ],
  },
  {
    id: "dense-water",
    label: "Dense Water",
    angle: 90,
    stops: [
      { color: "#3ab5b0", offset: 0 },
      { color: "#3d99be", offset: 31 },
      { color: "#56317a", offset: 100 },
    ],
  },
  {
    id: "chemic-aqua",
    label: "Chemic Aqua",
    angle: 180,
    stops: [
      { color: "#CDDCDC", offset: 0 },
      { color: "#CDDCDC", offset: 100 },
    ],
  },
  {
    id: "seashore",
    label: "Seashore",
    angle: 0,
    stops: [
      { color: "#209cff", offset: 0 },
      { color: "#68e0cf", offset: 100 },
    ],
  },
  {
    id: "marble-wall",
    label: "Marble Wall",
    angle: 0,
    stops: [
      { color: "#bdc2e8", offset: 0 },
      { color: "#bdc2e8", offset: 1 },
      { color: "#e6dee9", offset: 100 },
    ],
  },
  {
    id: "cheerful-caramel",
    label: "Cheerful Caramel",
    angle: 0,
    stops: [
      { color: "#e6b980", offset: 0 },
      { color: "#eacda3", offset: 100 },
    ],
  },
  {
    id: "night-sky",
    label: "Night Sky",
    angle: 0,
    stops: [
      { color: "#1e3c72", offset: 0 },
      { color: "#1e3c72", offset: 1 },
      { color: "#2a5298", offset: 100 },
    ],
  },
  {
    id: "magic-lake",
    label: "Magic Lake",
    angle: 0,
    stops: [
      { color: "#d5dee7", offset: 0 },
      { color: "#ffafbd", offset: 0 },
      { color: "#c9ffbf", offset: 100 },
    ],
  },
  {
    id: "young-grass",
    label: "Young Grass",
    angle: 0,
    stops: [
      { color: "#9be15d", offset: 0 },
      { color: "#00e3ae", offset: 100 },
    ],
  },
  {
    id: "colorful-peach",
    label: "Colorful Peach",
    angle: 90,
    stops: [
      { color: "#ed6ea0", offset: 0 },
      { color: "#ec8c69", offset: 100 },
    ],
  },
  {
    id: "gentle-care",
    label: "Gentle Care",
    angle: 90,
    stops: [
      { color: "#ffc3a0", offset: 0 },
      { color: "#ffafbd", offset: 100 },
    ],
  },
  {
    id: "plum-bath",
    label: "Plum Bath",
    angle: 0,
    stops: [
      { color: "#cc208e", offset: 0 },
      { color: "#6713d2", offset: 100 },
    ],
  },
  {
    id: "happy-unicorn",
    label: "Happy Unicorn",
    angle: 0,
    stops: [
      { color: "#b3ffab", offset: 0 },
      { color: "#12fff7", offset: 100 },
    ],
  },
  {
    id: "full-metal",
    label: "Full Metal",
    angle: 180,
    stops: [
      { color: "#D5DEE7", offset: 0 },
      { color: "#E8EBF2", offset: 50 },
      { color: "#E2E7ED", offset: 100 },
    ],
  },
  {
    id: "african-field",
    label: "African Field",
    angle: 0,
    stops: [
      { color: "#65bd60", offset: 0 },
      { color: "#5ac1a8", offset: 25 },
      { color: "#3ec6ed", offset: 50 },
      { color: "#b7ddb7", offset: 75 },
      { color: "#fef381", offset: 100 },
    ],
  },
  {
    id: "solid-stone",
    label: "Solid Stone",
    angle: 90,
    stops: [
      { color: "#243949", offset: 0 },
      { color: "#517fa4", offset: 100 },
    ],
  },
  {
    id: "orange-juice",
    label: "Orange Juice",
    angle: -20,
    stops: [
      { color: "#fc6076", offset: 0 },
      { color: "#ff9a44", offset: 100 },
    ],
  },
  {
    id: "slick-carbon",
    label: "Slick Carbon",
    angle: 180,
    stops: [
      { color: "#323232", offset: 0 },
      { color: "#3F3F3F", offset: 40 },
      { color: "#1C1C1C", offset: 150 },
    ],
  },
  {
    id: "north-miracle",
    label: "North Miracle",
    angle: 90,
    stops: [
      { color: "#00dbde", offset: 0 },
      { color: "#fc00ff", offset: 100 },
    ],
  },
  {
    id: "fruit-blend",
    label: "Fruit Blend",
    angle: 90,
    stops: [
      { color: "#f9d423", offset: 0 },
      { color: "#ff4e50", offset: 100 },
    ],
  },
  {
    id: "millennium-pine",
    label: "Millennium Pine",
    angle: 0,
    stops: [
      { color: "#50cc7f", offset: 0 },
      { color: "#f5d100", offset: 100 },
    ],
  },
  {
    id: "high-flight",
    label: "High Flight",
    angle: 90,
    stops: [
      { color: "#0acffe", offset: 0 },
      { color: "#495aff", offset: 100 },
    ],
  },
  {
    id: "mole-hall",
    label: "Mole Hall",
    angle: -20,
    stops: [
      { color: "#616161", offset: 0 },
      { color: "#9bc5c3", offset: 100 },
    ],
  },
  {
    id: "earl-gray",
    label: "Earl Gray",
    angle: 0,
    stops: [
      { color: "#E4E4E1", offset: 0 },
      { color: "#E4E4E1", offset: 100 },
    ],
  },
  {
    id: "space-shift",
    label: "Space Shift",
    angle: 60,
    stops: [
      { color: "#3d3393", offset: 0 },
      { color: "#2b76b9", offset: 37 },
      { color: "#2cacd1", offset: 65 },
      { color: "#35eb93", offset: 100 },
    ],
  },
  {
    id: "forest-inei",
    label: "Forest Inei",
    angle: 0,
    stops: [
      { color: "#df89b5", offset: 0 },
      { color: "#bfd9fe", offset: 100 },
    ],
  },
  {
    id: "royal-garden",
    label: "Royal Garden",
    angle: 90,
    stops: [
      { color: "#ed6ea0", offset: 0 },
      { color: "#ec8c69", offset: 100 },
    ],
  },
  {
    id: "rich-metal",
    label: "Rich Metal",
    angle: 90,
    stops: [
      { color: "#d7d2cc", offset: 0 },
      { color: "#304352", offset: 100 },
    ],
  },
  {
    id: "juicy-cake",
    label: "Juicy Cake",
    angle: 0,
    stops: [
      { color: "#e14fad", offset: 0 },
      { color: "#f9d423", offset: 100 },
    ],
  },
  {
    id: "smart-indigo",
    label: "Smart Indigo",
    angle: 0,
    stops: [
      { color: "#b224ef", offset: 0 },
      { color: "#7579ff", offset: 100 },
    ],
  },
  {
    id: "sand-strike",
    label: "Sand Strike",
    angle: 90,
    stops: [
      { color: "#c1c161", offset: 0 },
      { color: "#c1c161", offset: 0 },
      { color: "#d4d4b1", offset: 100 },
    ],
  },
  {
    id: "norse-beauty",
    label: "Norse Beauty",
    angle: 90,
    stops: [
      { color: "#ec77ab", offset: 0 },
      { color: "#7873f5", offset: 100 },
    ],
  },
  {
    id: "aqua-guidance",
    label: "Aqua Guidance",
    angle: 0,
    stops: [
      { color: "#007adf", offset: 0 },
      { color: "#00ecbc", offset: 100 },
    ],
  },
  {
    id: "sun-veggie",
    label: "Sun Veggie",
    angle: -225,
    stops: [
      { color: "#20E2D7", offset: 0 },
      { color: "#F9FEA5", offset: 100 },
    ],
  },
  {
    id: "sea-lord",
    label: "Sea Lord",
    angle: -225,
    stops: [
      { color: "#2CD8D5", offset: 0 },
      { color: "#C5C1FF", offset: 56 },
      { color: "#FFBAC3", offset: 100 },
    ],
  },
  {
    id: "black-sea",
    label: "Black Sea",
    angle: -225,
    stops: [
      { color: "#2CD8D5", offset: 0 },
      { color: "#6B8DD6", offset: 48 },
      { color: "#8E37D7", offset: 100 },
    ],
  },
  {
    id: "grass-shampoo",
    label: "Grass Shampoo",
    angle: -225,
    stops: [
      { color: "#DFFFCD", offset: 0 },
      { color: "#90F9C4", offset: 48 },
      { color: "#39F3BB", offset: 100 },
    ],
  },
  {
    id: "landing-aircraft",
    label: "Landing Aircraft",
    angle: -225,
    stops: [
      { color: "#5D9FFF", offset: 0 },
      { color: "#B8DCFF", offset: 48 },
      { color: "#6BBBFF", offset: 100 },
    ],
  },
  {
    id: "witch-dance",
    label: "Witch Dance",
    angle: -225,
    stops: [
      { color: "#A8BFFF", offset: 0 },
      { color: "#884D80", offset: 100 },
    ],
  },
  {
    id: "sleepless-night",
    label: "Sleepless Night",
    angle: -225,
    stops: [
      { color: "#5271C4", offset: 0 },
      { color: "#B19FFF", offset: 48 },
      { color: "#ECA1FE", offset: 100 },
    ],
  },
  {
    id: "angel-care",
    label: "Angel Care",
    angle: -225,
    stops: [
      { color: "#FFE29F", offset: 0 },
      { color: "#FFA99F", offset: 48 },
      { color: "#FF719A", offset: 100 },
    ],
  },
  {
    id: "crystal-river",
    label: "Crystal River",
    angle: -225,
    stops: [
      { color: "#22E1FF", offset: 0 },
      { color: "#1D8FE1", offset: 48 },
      { color: "#625EB1", offset: 100 },
    ],
  },
  {
    id: "soft-lipstick",
    label: "Soft Lipstick",
    angle: -225,
    stops: [
      { color: "#B6CEE8", offset: 0 },
      { color: "#F578DC", offset: 100 },
    ],
  },
  {
    id: "salt-mountain",
    label: "Salt Mountain",
    angle: -225,
    stops: [
      { color: "#FFFEFF", offset: 0 },
      { color: "#D7FFFE", offset: 100 },
    ],
  },
  {
    id: "perfect-white",
    label: "Perfect White",
    angle: -225,
    stops: [
      { color: "#E3FDF5", offset: 0 },
      { color: "#FFE6FA", offset: 100 },
    ],
  },
  {
    id: "fresh-oasis",
    label: "Fresh Oasis",
    angle: -225,
    stops: [
      { color: "#7DE2FC", offset: 0 },
      { color: "#B9B6E5", offset: 100 },
    ],
  },
  {
    id: "strict-november",
    label: "Strict November",
    angle: -225,
    stops: [
      { color: "#CBBACC", offset: 0 },
      { color: "#2580B3", offset: 100 },
    ],
  },
  {
    id: "morning-salad",
    label: "Morning Salad",
    angle: -225,
    stops: [
      { color: "#B7F8DB", offset: 0 },
      { color: "#50A7C2", offset: 100 },
    ],
  },
  {
    id: "deep-relief",
    label: "Deep Relief",
    angle: -225,
    stops: [
      { color: "#7085B6", offset: 0 },
      { color: "#87A7D9", offset: 50 },
      { color: "#DEF3F8", offset: 100 },
    ],
  },
  {
    id: "sea-strike",
    label: "Sea Strike",
    angle: -225,
    stops: [
      { color: "#77FFD2", offset: 0 },
      { color: "#6297DB", offset: 48 },
      { color: "#1EECFF", offset: 100 },
    ],
  },
  {
    id: "night-call",
    label: "Night Call",
    angle: -225,
    stops: [
      { color: "#AC32E4", offset: 0 },
      { color: "#7918F2", offset: 48 },
      { color: "#4801FF", offset: 100 },
    ],
  },
  {
    id: "supreme-sky",
    label: "Supreme Sky",
    angle: -225,
    stops: [
      { color: "#D4FFEC", offset: 0 },
      { color: "#57F2CC", offset: 48 },
      { color: "#4596FB", offset: 100 },
    ],
  },
  {
    id: "light-blue",
    label: "Light Blue",
    angle: -225,
    stops: [
      { color: "#9EFBD3", offset: 0 },
      { color: "#57E9F2", offset: 48 },
      { color: "#45D4FB", offset: 100 },
    ],
  },
  {
    id: "mind-crawl",
    label: "Mind Crawl",
    angle: -225,
    stops: [
      { color: "#473B7B", offset: 0 },
      { color: "#3584A7", offset: 51 },
      { color: "#30D2BE", offset: 100 },
    ],
  },
  {
    id: "lily-meadow",
    label: "Lily Meadow",
    angle: -225,
    stops: [
      { color: "#65379B", offset: 0 },
      { color: "#886AEA", offset: 53 },
      { color: "#6457C6", offset: 100 },
    ],
  },
  {
    id: "sugar-lollipop",
    label: "Sugar Lollipop",
    angle: -225,
    stops: [
      { color: "#A445B2", offset: 0 },
      { color: "#D41872", offset: 52 },
      { color: "#FF0066", offset: 100 },
    ],
  },
  {
    id: "sweet-dessert",
    label: "Sweet Dessert",
    angle: -225,
    stops: [
      { color: "#7742B2", offset: 0 },
      { color: "#F180FF", offset: 52 },
      { color: "#FD8BD9", offset: 100 },
    ],
  },
  {
    id: "magic-ray",
    label: "Magic Ray",
    angle: -225,
    stops: [
      { color: "#FF3CAC", offset: 0 },
      { color: "#562B7C", offset: 52 },
      { color: "#2B86C5", offset: 100 },
    ],
  },
  {
    id: "teen-party",
    label: "Teen Party",
    angle: -225,
    stops: [
      { color: "#FF057C", offset: 0 },
      { color: "#8D0B93", offset: 50 },
      { color: "#321575", offset: 100 },
    ],
  },
  {
    id: "frozen-heat",
    label: "Frozen Heat",
    angle: -225,
    stops: [
      { color: "#FF057C", offset: 0 },
      { color: "#7C64D5", offset: 48 },
      { color: "#4CC3FF", offset: 100 },
    ],
  },
  {
    id: "gagarin-view",
    label: "Gagarin View",
    angle: -225,
    stops: [
      { color: "#69EACB", offset: 0 },
      { color: "#EACCF8", offset: 48 },
      { color: "#6654F1", offset: 100 },
    ],
  },
  {
    id: "fabled-sunset",
    label: "Fabled Sunset",
    angle: -225,
    stops: [
      { color: "#231557", offset: 0 },
      { color: "#44107A", offset: 29 },
      { color: "#FF1361", offset: 67 },
      { color: "#FFF800", offset: 100 },
    ],
  },
  {
    id: "perfect-blue",
    label: "Perfect Blue",
    angle: -225,
    stops: [
      { color: "#3D4E81", offset: 0 },
      { color: "#5753C9", offset: 48 },
      { color: "#6E7FF3", offset: 100 },
    ],
  },
];
