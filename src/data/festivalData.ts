import { DaySchedule, Organizer, FestivalConfig } from '../types';

export const FESTIVAL_CONFIG_DEFAULT: FestivalConfig = {
  eventTitle: "Sri Siddhi Vinayaka Utsav 2026",
  colonyName: "B-Phase Colony, Bennur",
  eventStartDateTime: "2026-09-14T09:00:00",
  eventStartDisplay: "14 September 2026, 9:00 AM",
  venueAddress: "NARSAIAH NILAYAM, 1-100/2, B-Phase Colony, Bennur, Telangana 501144",
  district: "Vikarabad",
  state: "Telangana",
  pinCode: "501144",
  googleMapsQuery: "NARSAIAH NILAYAM, 1-100/2, Bennur, Telangana 501144",
  googleMapsUrl: "https://maps.app.goo.gl/NFBAQ5Z4YXdsFyUf9",
  luckyDrawTokenPrice: 50,
  luckyDrawDate: "22 September 2026 (Final Day & Nimarjanam)",
  specialPrize: "Special children’s cycling prize included",
  countdownDateTime: "2026-09-22T17:00:00",
  countdownTitle: "Final Day Prize Open & Ganesh Nimarjanam Countdown",
  countdownDateDisplay: "22 September 2026, 5:00 PM",
  backgroundImageUrl: "",
  posterImageUrl: "",
  instagramHandle: "@bennur_galligang",
  instagramUrl: "https://instagram.com/bennur_galligang",
  searchTag: "bennur_galligang",
  nimarjanamDate: "22 September 2026 (Day 9 - Grand Nimarjanam)"
};

export const ORGANIZERS: Organizer[] = [
  {
    name: "Sai Goud",
    role: "Utsav Coordinator (bennur_galligang)",
    phone: "9390905613",
    displayPhone: "+91 93909 05613",
    whatsappLink: "https://wa.me/919390905613?text=Namaste%20Sai%20Goud%20garu,%20I%20am%20contacting%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026%20at%20B-Phase%20Colony,%20Bennur.",
    instagramHandle: "@bennur_galligang",
    instagramUrl: "https://instagram.com/bennur_galligang",
    badge: "Tokens & Nimarjanam Inquiries"
  },
  {
    name: "Naresh Yadav",
    role: "Event & Seva Incharge",
    phone: "8688757194",
    displayPhone: "+91 86887 57194",
    whatsappLink: "https://wa.me/918688757194?text=Namaste%20Naresh%20garu,%20I%20am%20contacting%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026%20at%20B-Phase%20Colony,%20Bennur.",
    instagramHandle: "@bennur_galligang",
    instagramUrl: "https://instagram.com/bennur_galligang",
    badge: "9 Days Programs & Annadanam"
  },
  {
    name: "Venkat Yadav",
    role: "Youth & Event Coordinator",
    phone: "7671803053",
    displayPhone: "+91 76718 03053",
    whatsappLink: "https://wa.me/917671803053?text=Namaste%20Venkat%20Yadav%20garu,%20I%20am%20contacting%20regarding%20bennur_galligang%20Sri%20Siddhi%20Vinayaka%20Utsav%202026%20at%20B-Phase%20Colony,%20Bennur.",
    instagramHandle: "@bennur_galligang",
    instagramUrl: "https://instagram.com/bennur_galligang",
    badge: "Youth & Volunteer Coordination"
  }
];

export interface PoojaOption {
  id: string;
  name: string;
  teluguName: string;
  description: string;
  timeSlot: string;
  recommendedDakshina?: string;
  icon: string;
  badge?: string;
}

export const POOJA_OPTIONS: PoojaOption[] = [
  {
    id: "sahasranama",
    name: "Sri Ganapathi Sahasranama Archana & Special Pooja",
    teluguName: "శ్రీ గణపతి సహస్రనామ అర్చన & ప్రత్యేక పూజ",
    description: "1008 Sacred Ganesha names chanting with floral archana and individual Gotra-Nama Sankalpam for health and prosperity.",
    timeSlot: "Morning 8:30 AM & Evening 7:00 PM",
    recommendedDakshina: "Devotee's Wish (స్వచ్ఛంద కానుక)",
    icon: "🌺",
    badge: "Most Popular"
  },
  {
    id: "panchamrutha",
    name: "Nithya Panchamrutha Abhishekam",
    teluguName: "నిత్య పంచామృత అభిషేకం & పట్టు వస్త్ర సమర్పణ",
    description: "Sacred bathing of Vigneshwara with Milk, Curd, Ghee, Honey, Sugar & tender coconut water with Vedic Suktams.",
    timeSlot: "Morning 7:30 AM - 9:00 AM",
    recommendedDakshina: "Devotee's Wish (స్వచ్ఛంద కానుక)",
    icon: "🥛",
    badge: "Auspicious Morning Seva"
  },
  {
    id: "modak_laddu",
    name: "Modak & Laddu Maha Naivedyam Seva",
    teluguName: "మోదక & లడ్డూ మహా నైవేద్య సమర్పణ",
    description: "Special offering of 21/51 Modaks and Ganesh Laddu prasadam distributed to all colony devotees.",
    timeSlot: "Afternoon 12:30 PM & Evening Harathi",
    recommendedDakshina: "Devotee's Wish (స్వచ్ఛంద కానుక)",
    icon: "🥥",
    badge: "Prasadam Seva"
  },
  {
    id: "ganapathi_homam",
    name: "Sri Ganapathi Maha Homam / Havan",
    teluguName: "శ్రీ గణపతి మహా హోమం / హవనం (విఘ్న నివారణ)",
    description: "Sacred fire oblation with Ashtadravya for removal of all life obstacles, peace and family prosperity.",
    timeSlot: "Day 8 (21 Sep) / Auspicious Muhurtham",
    recommendedDakshina: "Devotee's Wish (స్వచ్ఛంద కానుక)",
    icon: "🔥",
    badge: "Vighna Nivarana"
  },
  {
    id: "annadanam",
    name: "Maha Annadanam & Prasadam Seva (21 Sep)",
    teluguName: "మహా అన్నదాన సేవ & మహా ప్రసాద వితరణ (సెప్టెంబర్ 21)",
    description: "Grand community feast sponsorship feeding hundreds of devotees and village guests on Day 8.",
    timeSlot: "21 Sep 2026, 1:00 PM onwards",
    recommendedDakshina: "Devotee's Wish (స్వచ్ఛంద కానుక)",
    icon: "🍲",
    badge: "Community Seva"
  },
  {
    id: "pushparchana_harathi",
    name: "Nithya Pushparchana & Maha Mangala Harathi",
    teluguName: "నిత్య పుష్పార్చన & మహా మంగళ హారతి సేవ",
    description: "Daily fresh floral offering and grand evening Dhoopa-Deepa Maha Harathi with devotional Bhajans.",
    timeSlot: "Evening 7:30 PM & 8:00 PM",
    recommendedDakshina: "Devotee's Wish (స్వచ్ఛంద కానుక)",
    icon: "🪔",
    badge: "Daily Harathi"
  },
  {
    id: "nimarjanam_yatra",
    name: "Grand Nimarjanam Shobha Yatra Seva (22 Sep)",
    teluguName: "మహా నిమజ్జన శోభాయాత్ర సేవ (సెప్టెంబర్ 22)",
    description: "Final Day Dhol Tasha procession, flower showering, and lucky draw celebration participation.",
    timeSlot: "22 Sep 2026, 4:00 PM onwards",
    recommendedDakshina: "Devotee's Wish (స్వచ్ఛంద కానుక)",
    icon: "🚩",
    badge: "Final Day Celebration"
  }
];

export const FESTIVAL_DATES = [
  "14 September 2026 (Day 1 - Ganesh Chaturthi / Prana Pratishtha)",
  "15 September 2026 (Day 2 - Nithya Pooja & Bhajan)",
  "16 September 2026 (Day 3 - Sahasranama Archana & Keerthan)",
  "17 September 2026 (Day 4 - Lalitha / Ganesha Sahasranama)",
  "18 September 2026 (Day 5 - Special Modak Naivedyam)",
  "19 September 2026 (Day 6 - Saturday Special Deepotsavam)",
  "20 September 2026 (Day 7 - Sunday Maha Bhajans)",
  "21 September 2026 (Day 8 - Sri Ganapathi Homam & Maha Annadanam)",
  "22 September 2026 (Day 9 - Final Day, Lucky Draw & Grand Nimarjanam)",
  "All 9 Days (సంపూర్ణ 9 రోజుల పూజ)"
];

export const SCHEDULE_DATA: DaySchedule[] = [
  {
    id: "day-1",
    dateStr: "14 September 2026",
    dayName: "Day 1 of 9 Days Count",
    badge: "గణేష్ స్థాపన & ప్రాణ ప్రతిష్ట (Sthapana)",
    summary: "Grand commencement of the 9-day Ganesh festival by bennur_galligang with sacred Vedic rituals, Pratishtha, first Aarti, and Modak Mahaprasadam.",
    items: [
      {
        id: "d1-1",
        time: "9:00 AM",
        title: "Ganesh Idol Installation & Pran Pratishtha (గణేష్ స్థాపన)",
        description: "Auspicious arrival with traditional drums and ceremonial Vedic consecration of Lord Ganesha.",
        category: "ritual",
        highlight: true,
        iconType: "kalash"
      },
      {
        id: "d1-2",
        time: "11:00 AM",
        title: "First Maha Aarti & Modak Prasadam",
        description: "First divine Aarti of the 9-day Utsav followed by fresh Modak distribution to all devotees.",
        category: "aarti",
        highlight: false,
        iconType: "modak"
      },
      {
        id: "d1-3",
        time: "7:30 PM",
        title: "Evening Maha Aarti & bennur_galligang Youth Gathering",
        description: "Devotional evening Aarti with Dhoop, Deepam, and community chanting by youth wing.",
        category: "aarti",
        highlight: false,
        iconType: "diya"
      }
    ]
  },
  {
    id: "day-2",
    dateStr: "15 September 2026",
    dayName: "Day 2 of 9 Days Count",
    badge: "Daily Puja & Devotional Chanting",
    summary: "Early morning Suprabhatam, fresh floral Alankaram, daily Aarti, and evening community bhajan sessions.",
    items: [
      {
        id: "d2-1",
        time: "7:00 AM",
        title: "Morning Aarti & Suprabhatam",
        description: "Start Day 2 with divine chants and fresh flower offerings to Vighnaharta.",
        category: "aarti",
        highlight: false,
        iconType: "diya"
      },
      {
        id: "d2-2",
        time: "7:30 PM",
        title: "Evening Aarti & Bhajans",
        description: "Soulful devotional singing by village elders and youth.",
        category: "cultural",
        highlight: false,
        iconType: "music"
      }
    ]
  },
  {
    id: "day-3",
    dateStr: "16 September 2026",
    dayName: "Day 3 of 9 Days Count",
    badge: "Sahasranama Archana & Youth Sangeet",
    summary: "1008 sacred names chanting, special Bilva and Garika patri archana, followed by youth musical performances.",
    items: [
      {
        id: "d3-1",
        time: "7:00 AM",
        title: "Morning Aarti & Sahasranama Archana",
        description: "Chanting of 1008 divine names with 21 types of sacred leaves (Ekavimsati Patra).",
        category: "ritual",
        highlight: false,
        iconType: "kalash"
      },
      {
        id: "d3-2",
        time: "7:30 PM",
        title: "Evening Aarti & Devotional Sangeet",
        description: "Harmonium and Dholak devotional performance by local devotees.",
        category: "cultural",
        highlight: false,
        iconType: "music"
      }
    ]
  },
  {
    id: "day-4",
    dateStr: "17 September 2026",
    dayName: "Day 4 of 9 Days Count",
    badge: "Maha Ganapati Homam & Laddu Puja",
    summary: "Sacred fire ritual (Ganapati Homam) seeking peace and prosperity for all families of Bennur village.",
    items: [
      {
        id: "d4-1",
        time: "7:30 AM",
        title: "Ganapati Homam & Purnahuti",
        description: "Vedic fire ritual performed by learned priests with consecrated herbal offerings.",
        category: "ritual",
        highlight: true,
        iconType: "kalash"
      },
      {
        id: "d4-2",
        time: "7:30 PM",
        title: "Evening Aarti & Special Laddu Bhog",
        description: "Special pure ghee laddu naivedyam and evening Maha Aarti.",
        category: "prasadam",
        highlight: false,
        iconType: "modak"
      }
    ]
  },
  {
    id: "day-5",
    dateStr: "18 September 2026",
    dayName: "Day 5 of 9 Days Count",
    badge: "Children's Cultural Events & Sloka Recitation",
    summary: "Cultural competitions for the children of Bennur including Ganesh sloka recitation, drawing, and devotional songs.",
    items: [
      {
        id: "d5-1",
        time: "7:00 AM",
        title: "Morning Aarti",
        description: "Daily morning invocations and offerings.",
        category: "aarti",
        highlight: false,
        iconType: "diya"
      },
      {
        id: "d5-2",
        time: "6:00 PM",
        title: "Children’s Sloka & Cultural Stage",
        description: "Inspiring talent presentations by village children with encouraging token gifts.",
        category: "cultural",
        highlight: true,
        iconType: "trophy"
      },
      {
        id: "d5-3",
        time: "7:45 PM",
        title: "Evening Aarti & Sweet Prasadam",
        description: "Evening Aarti joined by all children and families.",
        category: "aarti",
        highlight: false,
        iconType: "modak"
      }
    ]
  },
  {
    id: "day-6",
    dateStr: "19 September 2026",
    dayName: "Day 6 of 9 Days Count",
    badge: "Folk Bhajan Sandhya & Deepotsavam",
    summary: "Rhythmic Kolatam and folk devotional music celebrating Sri Siddhi Vinayaka with 108 illuminated earthen lamps.",
    items: [
      {
        id: "d6-1",
        time: "7:00 AM",
        title: "Morning Aarti",
        description: "Sacred morning prayers and floral decoration.",
        category: "aarti",
        highlight: false,
        iconType: "diya"
      },
      {
        id: "d6-2",
        time: "7:30 PM",
        title: "108 Deepa Alankaram & Folk Kolatam",
        description: "Mesmerizing lamp lighting ceremony and traditional Kolatam folk dance by colony youth.",
        category: "cultural",
        highlight: true,
        iconType: "music"
      }
    ]
  },
  {
    id: "day-7",
    dateStr: "20 September 2026",
    dayName: "Day 7 of 9 Days Count",
    badge: "Samuhika Kumkumarchana & Sangeet",
    summary: "Special prayers by the women of Bennur for family well-being, accompanied by devotional classical melodies.",
    items: [
      {
        id: "d7-1",
        time: "7:00 AM",
        title: "Morning Aarti",
        description: "Early morning ritual worship.",
        category: "aarti",
        highlight: false,
        iconType: "diya"
      },
      {
        id: "d7-2",
        time: "5:30 PM",
        title: "Samuhika Kumkumarchana Seva",
        description: "Collective traditional prayer by colony ladies with blessed vermillion and flowers.",
        category: "ritual",
        highlight: true,
        iconType: "kalash"
      },
      {
        id: "d7-3",
        time: "7:30 PM",
        title: "Evening Aarti & Bhajans",
        description: "Evening community prayers and prasadam.",
        category: "aarti",
        highlight: false,
        iconType: "diya"
      }
    ]
  },
  {
    id: "day-8",
    dateStr: "21 September 2026",
    dayName: "Day 8 of 9 Days Count",
    badge: "Maha Annadanam & Pre-Nimarjanam Eve",
    summary: "Grand community feast (Maha Annadanam) serving hundreds of villagers, followed by final evening Aarti.",
    items: [
      {
        id: "d8-1",
        time: "7:00 AM",
        title: "Morning Aarti & Prasadam",
        description: "Morning devotional prayers.",
        category: "aarti",
        highlight: false,
        iconType: "diya"
      },
      {
        id: "d8-2",
        time: "12:30 PM",
        title: "Grand Maha Annadanam Community Feast",
        description: "Elaborate delicious blessed lunch served with love to every resident of Bennur village.",
        category: "prasadam",
        highlight: true,
        iconType: "modak"
      },
      {
        id: "d8-3",
        time: "8:00 PM",
        title: "Pre-Nimarjanam Bhajan Night & Dhol Tasha",
        description: "Electrifying festive beats and celebratory dhol-tasha preparations for Nimarjanam Day.",
        category: "cultural",
        highlight: true,
        iconType: "music"
      }
    ]
  },
  {
    id: "day-9",
    dateStr: "22 September 2026",
    dayName: "Day 9 of 9 Days Count (Grand Culmination)",
    badge: "గణేష్ నిమజ్జనం (Ganesh Nimarjanam) & ₹50 Lucky Draw",
    summary: "Final day: ₹50 Lucky Draw Token Prize Open during Nimarjanam, Special Children’s Bicycle Distribution, and the Grand Ganesh Nimarjanam Shobhayatra!",
    items: [
      {
        id: "d9-1",
        time: "7:00 AM",
        title: "Maha Mangala Aarti & Sthapana Udwasana",
        description: "Tearful morning gratitude Aarti and final darshan.",
        category: "aarti",
        highlight: true,
        iconType: "bell"
      },
      {
        id: "d9-2",
        time: "4:30 PM",
        title: "₹50 Lucky Draw Winner Announcement & Bicycle Prize",
        description: "Official Telugu announcement: 'నిమజ్జనం సమయంలో ప్రైజ్ ఓపెన్ చేయబడును' — Live drawing on stage with the brand-new children’s cycle!",
        category: "luckydraw",
        highlight: true,
        iconType: "trophy"
      },
      {
        id: "d9-3",
        time: "6:00 PM",
        title: "Grand Ganesh Nimarjanam Procession (గణేష్ నిమజ్జనం శోభాయాత్ర)",
        description: "Mammoth farewell procession across Bennur streets with dhol-tasha beats, colorful gulal, dancing, and grand visarjan.",
        category: "procession",
        highlight: true,
        iconType: "visarjan"
      }
    ]
  }
];

export const GANESH_MANTRAS = [
  {
    title: "Vakratunda Mahakaya",
    sanskrit: "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ।\nनिर्विघ्नं कुरु मे देव सर्वकार्येषు सर्वदा॥",
    meaning: "O Lord with curved trunk and immense aura like a million suns, please make all my endeavors free of obstacles forever."
  },
  {
    title: "Ganesh Gayatri Mantra",
    sanskrit: "ॐ एकदन्ताय विद्महे वक्रतुण्डाय धीमहि।\nतन्नो दन्तिः प्रचोदयात्॥",
    meaning: "We meditate on the single-tusked God with curved trunk. May that Lord inspire and illuminate our intellect."
  }
];
