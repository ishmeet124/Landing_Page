export interface LocationData {
  [state: string]: {
    [city: string]: string[];
  };
}

export const LOCATIONS: LocationData = {
  "Andhra Pradesh": {
    Visakhapatnam: [
      "Andhra University",
      "GITAM University",
      "GVPCE",
    ],
    Vijayawada: [
      "KL University",
      "SRM University AP",
      "VIT-AP University",
    ],
    Tirupati: [
      "Sri Venkateswara University",
      "IIT Tirupati",
      "IIIT Sri City",
    ],
    Guntur: [
      "Nagarjuna University",
      "RVR & JC College of Engineering",
    ],
  },
  "Assam": {
    Guwahati: [
      "IIT Guwahati",
      "Gauhati University",
      "Cotton University",
    ],
    Silchar: ["NIT Silchar", "Assam University"],
  },
  "Bihar": {
    Patna: [
      "IIT Patna",
      "NIT Patna",
      "Patna University",
      "Chanakya National Law University",
    ],
    Muzaffarpur: ["Bihar Agricultural University"],
    Gaya: ["Central University of South Bihar"],
  },
  "Chandigarh": {
    Chandigarh: [
      "Panjab University",
      "PEC University of Technology",
      "Punjab Engineering College",
    ],
  },
  "Chhattisgarh": {
    Raipur: [
      "NIT Raipur",
      "IIT Bhilai",
      "Pt. Ravishankar Shukla University",
    ],
    Bilaspur: ["Guru Ghasidas University"],
  },
  "Delhi": {
    "New Delhi": [
      "IIT Delhi",
      "Delhi University",
      "JNU",
      "Jamia Millia Islamia",
      "NSUT",
      "DTU",
      "IIIT Delhi",
      "IP University",
      "Amity University",
      "Shiv Nadar University",
    ],
  },
  "Goa": {
    Panaji: ["Goa University", "NIT Goa", "BITS Pilani Goa"],
    Margao: ["Don Bosco College"],
  },
  "Gujarat": {
    Ahmedabad: [
      "IIT Gandhinagar",
      "NID Ahmedabad",
      "CEPT University",
      "Gujarat University",
      "Nirma University",
    ],
    Vadodara: ["MS University", "Parul University"],
    Surat: ["SVNIT", "Veer Narmad South Gujarat University"],
    Rajkot: ["Saurashtra University", "Marwadi University"],
  },
  "Haryana": {
    Gurugram: [
      "MDU Rohtak (Gurugram Campus)",
      "Amity University Gurugram",
      "GD Goenka University",
    ],
    Sonipat: [
      "Ashoka University",
      "Jindal Global University",
      "BML Munjal University",
    ],
    Rohtak: ["MDU Rohtak", "IIM Rohtak"],
    Kurukshetra: ["NIT Kurukshetra", "Kurukshetra University"],
    Hisar: ["Guru Jambheshwar University"],
  },
  "Himachal Pradesh": {
    Shimla: ["Himachal Pradesh University", "IIT Mandi"],
    Hamirpur: ["NIT Hamirpur"],
  },
  "Jharkhand": {
    Ranchi: ["IIT ISM Dhanbad", "BIT Mesra", "Ranchi University"],
    Jamshedpur: ["NIT Jamshedpur", "XLRI"],
  },
  "Karnataka": {
    Bengaluru: [
      "IISc Bangalore",
      "IIM Bangalore",
      "RV College of Engineering",
      "BMS College of Engineering",
      "PES University",
      "Christ University",
      "Jain University",
      "NMIT",
      "MSRIT",
      "DSCE",
    ],
    Mysuru: ["University of Mysore", "NIE Mysore", "SJCE"],
    Mangaluru: ["NIT Karnataka Surathkal", "MIT Manipal"],
    Hubli: ["BVB College / KLE Technological University"],
    Dharwad: ["IIT Dharwad", "Karnatak University"],
  },
  "Kerala": {
    Thiruvananthapuram: [
      "IIT Palakkad",
      "University of Kerala",
      "CET Trivandrum",
    ],
    Kochi: [
      "CUSAT",
      "NIT Calicut",
      "Amrita Vishwa Vidyapeetham",
    ],
    Kozhikode: ["IIM Kozhikode", "NIT Calicut"],
    Thrissur: ["Kerala Agricultural University"],
  },
  "Madhya Pradesh": {
    Bhopal: [
      "IIT Indore",
      "MANIT Bhopal",
      "IISER Bhopal",
      "LNCT University",
    ],
    Indore: [
      "IIM Indore",
      "IIT Indore",
      "Devi Ahilya University",
      "Symbiosis Indore",
    ],
    Gwalior: ["IIITM Gwalior", "Jiwaji University"],
    Jabalpur: ["IIITDM Jabalpur", "Rani Durgavati University"],
  },
  "Maharashtra": {
    Mumbai: [
      "IIT Bombay",
      "University of Mumbai",
      "VJTI",
      "SPIT",
      "DJ Sanghvi",
      "Thadomal Shahani",
      "St. Xavier's College",
      "HR College",
      "KC College",
      "Mithibai College",
    ],
    Pune: [
      "COEP Technological University",
      "Symbiosis International University",
      "MIT Pune",
      "VIT Pune",
      "Fergusson College",
      "Savitribai Phule Pune University",
    ],
    Nagpur: [
      "VNIT Nagpur",
      "Nagpur University",
      "RCOEM",
    ],
    Aurangabad: [
      "Dr. Babasaheb Ambedkar Marathwada University",
      "MGM University",
    ],
  },
  "Manipur": {
    Imphal: ["Manipur University", "NIT Manipur"],
  },
  "Meghalaya": {
    Shillong: ["IIM Shillong", "NEHU", "NIT Meghalaya"],
  },
  "Mizoram": {
    Aizawl: ["Mizoram University", "NIT Mizoram"],
  },
  "Nagaland": {
    Kohima: ["Nagaland University", "NIT Nagaland"],
  },
  "Odisha": {
    Bhubaneswar: [
      "IIT Bhubaneswar",
      "NIT Rourkela",
      "KIIT University",
      "SOA University",
      "Utkal University",
    ],
    Rourkela: ["NIT Rourkela"],
  },
  "Punjab": {
    Chandigarh: ["Panjab University", "PEC"],
    Jalandhar: ["NIT Jalandhar", "LPU"],
    Patiala: ["Thapar Institute of Engineering"],
    Amritsar: ["Guru Nanak Dev University"],
    Mohali: ["IISER Mohali", "NIPER", "Chandigarh University"],
  },
  "Rajasthan": {
    Jaipur: [
      "IIT Jodhpur",
      "MNIT Jaipur",
      "IIIT Kota",
      "University of Rajasthan",
      "Manipal University Jaipur",
      "LNMIIT",
    ],
    Jodhpur: ["IIT Jodhpur", "AIIMS Jodhpur"],
    Pilani: ["BITS Pilani"],
    Kota: ["RTU Kota"],
    Udaipur: ["IIM Udaipur", "MLSU"],
  },
  "Sikkim": {
    Gangtok: ["Sikkim Manipal University", "NIT Sikkim"],
  },
  "Tamil Nadu": {
    Chennai: [
      "IIT Madras",
      "Anna University",
      "SRM University",
      "VIT Chennai",
      "Sathyabama University",
      "Loyola College",
      "Madras Christian College",
      "Presidency College",
    ],
    Coimbatore: [
      "PSG College of Technology",
      "Amrita Vishwa Vidyapeetham",
      "CIT Coimbatore",
    ],
    Tiruchirappalli: ["NIT Tiruchirappalli", "IIM Tiruchirappalli"],
    Madurai: ["Madurai Kamaraj University", "Thiagarajar College"],
    Vellore: ["VIT Vellore"],
  },
  "Telangana": {
    Hyderabad: [
      "IIT Hyderabad",
      "IIIT Hyderabad",
      "University of Hyderabad",
      "Osmania University",
      "BITS Pilani Hyderabad",
      "CBIT",
      "Vasavi College of Engineering",
      "Mahindra University",
    ],
    Warangal: ["NIT Warangal"],
  },
  "Tripura": {
    Agartala: ["NIT Agartala", "Tripura University"],
  },
  "Uttar Pradesh": {
    Noida: [
      "Amity University Noida",
      "Shiv Nadar University",
      "Galgotias University",
      "Bennett University",
      "Sharda University",
      "JIIT Noida",
    ],
    Lucknow: [
      "IIT Kanpur",
      "University of Lucknow",
      "BBAU",
      "IIM Lucknow",
    ],
    Kanpur: ["IIT Kanpur", "HBTU Kanpur"],
    Varanasi: [
      "BHU",
      "IIT BHU",
      "Indian Institute of Technology BHU",
    ],
    Allahabad: [
      "IIIT Allahabad",
      "MNNIT Allahabad",
      "University of Allahabad",
    ],
    Agra: ["Dr. BR Ambedkar University"],
    "Greater Noida": [
      "Gautam Buddha University",
      "GL Bajaj Institute",
    ],
  },
  "Uttarakhand": {
    Dehradun: [
      "IIT Roorkee",
      "UPES",
      "Graphic Era University",
      "DIT University",
    ],
    Roorkee: ["IIT Roorkee"],
    Nainital: ["Kumaun University"],
    Haridwar: ["Gurukul Kangri University"],
  },
  "West Bengal": {
    Kolkata: [
      "IIT Kharagpur",
      "Jadavpur University",
      "Presidency University",
      "University of Calcutta",
      "St. Xavier's College Kolkata",
      "IIEST Shibpur",
    ],
    Kharagpur: ["IIT Kharagpur"],
    Durgapur: ["NIT Durgapur"],
    Siliguri: ["University of North Bengal"],
  },
};

export const STATES = Object.keys(LOCATIONS).sort();

export function getCities(state: string): string[] {
  return state && LOCATIONS[state]
    ? Object.keys(LOCATIONS[state]).sort()
    : [];
}

export function getColleges(state: string, city: string): string[] {
  return state && city && LOCATIONS[state]?.[city]
    ? [...LOCATIONS[state][city]].sort()
    : [];
}

export const INTERESTS = [
  "Music",
  "Sports",
  "Photography",
  "Gaming",
  "Coding",
  "Art & Design",
  "Dance",
  "Reading",
  "Travel",
  "Fitness",
  "Movies & TV",
  "Cooking",
  "Startups",
  "Social Impact",
  "Fashion",
  "Writing",
  "Astronomy",
  "Debating",
  "Volunteering",
  "Stand-up Comedy",
  "Podcasts",
  "Anime & Manga",
  "Theatre",
  "Yoga & Meditation",
];

export const PRONOUNS = ["He/Him", "She/Her", "They/Them", "Other"];

export const YEARS_OF_STUDY = [
  "1st Year",
  "2nd Year",
  "3rd Year",
  "4th Year",
  "5th Year+",
  "Alumni",
];
