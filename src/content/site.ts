/**
 * Central, editable hospital information.
 * Items marked `verified: false` or listed in `pendingConfirmation` must be approved by
 * hospital management before they are published more prominently.
 */
export const SITE_URL = "https://www.janakpurneuro.com";

export const hospital = {
  name: "Janakpur Neuro Hospital & Research Center Pvt. Ltd.",
  shortName: "Janakpur Neuro Hospital",
  motto: "We Believe in Excellence & Trust.",
  category: "Private Hospital, Neurological Healthcare and Research Center",
  address: {
    line1: "Murli Chowk / Bishara Chowk, Ward No. 4",
    city: "Janakpur",
    district: "Dhanusha",
    province: "Madhesh Province",
    postalCode: "45600",
    country: "Nepal",
  },
  phones: {
    landline: { display: "+977 41-591584", href: "tel:+97741591584" },
    mobile: { display: "+977 9801669434", href: "tel:+9779801669434" },
  },
  email: { display: "neurohospital.janakpur@gmail.com", href: "mailto:neurohospital.janakpur@gmail.com" },
  whatsapp: "https://wa.me/9779801669434",
  facebook: "https://www.facebook.com/janakpurneurohospital/",
  maps: "https://share.google/WsMDLBn18bp7axnKZ",
} as const;

export const fullAddress = `${hospital.address.line1}, ${hospital.address.city}, ${hospital.address.district}, ${hospital.address.province} ${hospital.address.postalCode}, ${hospital.address.country}`;

export type DepartmentIcon =
  | "brain"
  | "brain-circuit"
  | "bone"
  | "heart-pulse"
  | "monitor-check"
  | "hospital"
  | "scan-line"
  | "microscope";

export interface Department {
  slug: string;
  title: string;
  short: string;
  icon: DepartmentIcon;
  intro: string;
  about: string[];
  covers: string[];
}

export const departments: Department[] = [
  {
    slug: "neurology",
    title: "Neurology",
    short: "Comprehensive care for brain disorders.",
    icon: "brain",
    intro:
      "Neurology focuses on the evaluation and medical management of conditions affecting the brain, spinal cord and nerves.",
    about: [
      "Neurological symptoms can be worrying for patients and families. Our neurology services aim to provide careful evaluation, clear explanations and a treatment plan discussed openly with you.",
      "If you are unsure whether your symptoms need a neurological consultation, please contact the hospital and our team will guide you to the right service.",
    ],
    covers: [
      "Consultation for persistent or unusual headaches",
      "Evaluation of seizures, dizziness, numbness or weakness",
      "Assessment of memory, movement and nerve-related concerns",
      "Follow-up care and guidance for families",
    ],
  },
  {
    slug: "neurosurgery",
    title: "Neurosurgery",
    short: "Advanced surgical care.",
    icon: "brain-circuit",
    intro:
      "Neurosurgery involves the surgical assessment and treatment of conditions of the brain, spine and nervous system.",
    about: [
      "Our neurosurgical service is led by a consultant neurosurgeon. Every surgical decision begins with a thorough consultation, a review of investigations and a frank discussion about benefits, risks and alternatives.",
      "Patients and families are encouraged to ask questions at every stage, from the first visit to recovery and follow-up.",
    ],
    covers: [
      "Specialist surgical consultation and second opinions",
      "Assessment of brain and spine conditions that may need surgery",
      "Pre-operative counselling for patients and families",
      "Post-operative follow-up",
    ],
  },
  {
    slug: "brain-and-spine-care",
    title: "Brain & Spine Care",
    short: "Expertise for a better life.",
    icon: "bone",
    intro:
      "Brain and spine care brings together neurological and neurosurgical expertise for conditions affecting the brain and the spinal column.",
    about: [
      "Back and neck pain, nerve pain and spine-related symptoms can affect daily life and work. We aim to identify the cause and discuss the most suitable approach with you, whether medical, rehabilitative or surgical.",
    ],
    covers: [
      "Evaluation of back pain, neck pain and radiating nerve pain",
      "Assessment of spine injuries and degenerative spine conditions",
      "Coordinated care between neurology and neurosurgery",
      "Guidance on recovery and daily activities",
    ],
  },
  {
    slug: "critical-care",
    title: "Critical Care",
    short: "Specialized intensive care.",
    icon: "heart-pulse",
    intro:
      "Critical care provides close medical attention for patients whose condition requires intensive monitoring and support.",
    about: [
      "Families of critically ill patients need clear and compassionate communication. Our care team works to keep families informed about their loved one's condition and care plan.",
    ],
    covers: [
      "Close monitoring of seriously unwell patients",
      "Care for patients after major neurological events or surgery",
      "Regular updates and counselling for family members",
    ],
  },
  {
    slug: "icu-and-hdu",
    title: "ICU & HDU",
    short: "Advanced monitoring and care.",
    icon: "monitor-check",
    intro:
      "The Intensive Care Unit (ICU) and High Dependency Unit (HDU) support patients who need a higher level of monitoring than a general ward provides.",
    about: [
      "Admission to the ICU or HDU is decided by the treating medical team based on each patient's condition. Please contact the hospital for current information about visiting arrangements for these units.",
    ],
    covers: [
      "Continuous observation by the care team",
      "Step-down care between intensive care and the ward",
      "Family communication and visiting guidance",
    ],
  },
  {
    slug: "operation-theatre",
    title: "Operation Theatre",
    short: "Surgical facilities.",
    icon: "hospital",
    intro:
      "Our operation theatre supports surgical procedures carried out by the hospital's surgical team.",
    about: [
      "Before any procedure, the surgical team will explain what to expect, how to prepare and how recovery is planned. Specific procedures available at any time depend on the treating surgeon's assessment.",
    ],
    covers: [
      "Surgical procedures planned by the treating team",
      "Pre-operative preparation and instructions",
      "Post-operative care coordination",
    ],
  },
  {
    slug: "radiology-and-diagnostics",
    title: "Radiology & Diagnostics",
    short: "Accurate and timely diagnosis.",
    icon: "scan-line",
    intro:
      "Diagnostic and imaging services help doctors understand the cause of symptoms and plan appropriate care.",
    about: [
      "The investigations available and their timing can change. Please contact the hospital to confirm which diagnostic services are currently offered and how to prepare for them.",
    ],
    covers: [
      "Investigations requested by your treating doctor",
      "Guidance on preparing for tests",
      "Reports shared with your doctor for review",
    ],
  },
  {
    slug: "medical-laboratory",
    title: "Medical Laboratory",
    short: "Quality laboratory services.",
    icon: "microscope",
    intro:
      "Laboratory services support diagnosis and monitoring through tests on blood and other samples.",
    about: [
      "Some tests need preparation such as fasting. Please follow the instructions given by your doctor or contact the hospital if you are unsure.",
    ],
    covers: [
      "Sample collection for tests requested by your doctor",
      "Routine and specialised laboratory investigations",
      "Results shared with your treating doctor",
    ],
  },
];

export interface Doctor {
  slug: string;
  name: string;
  initials: string;
  titles: string[];
  specializations: string[];
  /** Leave empty until hospital management supplies verified details. */
  qualifications: string[];
  experience: string[];
  languages: string[];
  photo?: string;
}

export const doctors: Doctor[] = [
  {
    slug: "dr-vijay-k-raut",
    name: "Dr. Vijay K. Raut",
    initials: "VR",
    titles: ["Consultant Neurosurgeon", "Brain and Spine Surgeon", "Medical Director / CEO"],
    specializations: ["Neurosurgery", "Brain & Spine Care"],
    qualifications: [],
    experience: [],
    languages: [],
  },
];

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/**
 * Exact image URLs supplied by the hospital. Image 3 of the supplied list
 * (…545912587_…_ie2bfp.jpg) returned "not found" and is omitted until a working link is provided.
 */
export const gallery: GalleryImage[] = [
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424977/696111123_1291202156490813_7894688271332108785_n_ji7xch.jpg",
    alt: "Nursing and medical staff of Janakpur Neuro Hospital gathered for a celebration inside the hospital",
    caption: "Our nursing and medical team",
    width: 1600,
    height: 1200,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424821/unnamed_zc5sav.webp",
    alt: "Operation theatre with surgical lights, operating table and monitoring equipment",
    caption: "Operation theatre",
    width: 680,
    height: 510,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424819/unnamed_1_begixh.webp",
    alt: "Hospital laboratory work area with a staff member at the bench",
    caption: "Medical laboratory",
    width: 680,
    height: 238,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424961/602007926_1181537377457292_7888503179454232010_n_yqowcy.jpg",
    alt: "Group photo at the Janakpur Neuro Hospital & Research Center CME programme with the programme banner",
    caption: "CME programme",
    width: 2048,
    height: 1365,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424863/561350901_1130435285900835_9098059476035444190_n_exctlf.jpg",
    alt: "Hospital team members standing together in front of Janaki Mandir in Janakpur",
    caption: "Our team at Janaki Mandir, Janakpur",
    width: 1093,
    height: 1280,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424838/562371463_1131194325824931_6121447335077581072_n_vfngup.jpg",
    alt: "Hospital team members with visitors at an outdoor community event under trees",
    caption: "Community outreach",
    width: 1024,
    height: 768,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424984/601972824_1181537457457284_604297337427254963_n_ou9wop.jpg",
    alt: "Participants seated around tables during an indoor session in a hall",
    caption: "Professional session",
    width: 2048,
    height: 1365,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424986/601854189_1181537337457296_9070980211954269083_n_svouil.jpg",
    alt: "Group of attendees standing together at an event venue decorated with flowers",
    caption: "Event gathering",
    width: 2048,
    height: 1365,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424851/581926318_1154585913485772_3141483175511545403_n_tntroz.jpg",
    alt: "A certificate of Janakpur Neuro Hospital being presented by a doctor in an office",
    caption: "Certificate presentation",
    width: 1534,
    height: 2048,
  },
  {
    src: "https://res.cloudinary.com/k7m1ixyt/image/upload/v1794424853/581937045_1154585596819137_6117146226394264170_n_bx7s6h.jpg",
    alt: "A Janakpur Neuro Hospital certificate being presented to a staff member in blue scrubs",
    caption: "Recognising our staff",
    width: 958,
    height: 1280,
  },
];

function pick<T>(list: readonly T[], index: number): T {
  const item = list[index];
  if (item === undefined) throw new Error(`Missing content item at index ${index}`);
  return item;
}

export const heroImage = pick(gallery, 0);
export const theatreImage = pick(gallery, 1);
export const teamEventImage = pick(gallery, 3);
export const leadDoctor = pick(doctors, 0);

/** Business details that management should confirm before launch. */
export const pendingConfirmation = [
  "Official logo artwork",
  "Doctor qualifications, registration, experience and languages",
  "Doctor photograph",
  "Current list of diagnostic and imaging services",
  "OPD / visiting hours",
  "Emergency service availability and number",
  "Exterior photograph of the hospital building",
];
