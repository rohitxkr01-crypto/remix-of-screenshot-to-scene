import brainImg from "@/assets/article-brain.jpg";
import spineImg from "@/assets/article-spine.jpg";
import consultImg from "@/assets/article-consultation.jpg";

export interface ArticleSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  published: string; // ISO date
  updated: string; // ISO date
  readMinutes: number;
  /** Only fill once a named, verified clinician has reviewed the article. */
  reviewer?: string;
  sections: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: "understanding-brain-health",
    title: "Understanding Brain Health",
    excerpt:
      "Simple, everyday habits that support a healthy brain, and signs that it may be time to speak with a doctor.",
    category: "Brain Health",
    image: brainImg,
    imageAlt: "Illustration of the human brain with neural pathways",
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 4,
    sections: [
      {
        heading: "Why brain health matters",
        paragraphs: [
          "The brain controls how we think, move, feel and remember. Looking after it is part of looking after your overall health, at every age.",
        ],
      },
      {
        heading: "Everyday habits that help",
        bullets: [
          "Keep blood pressure, blood sugar and cholesterol under regular review with your doctor.",
          "Stay physically active in ways that are safe for you.",
          "Aim for regular, sufficient sleep.",
          "Avoid tobacco and limit alcohol.",
          "Stay socially connected and mentally engaged.",
          "Protect your head: wear a helmet on two-wheelers and use seat belts.",
        ],
      },
      {
        heading: "When to seek medical advice",
        paragraphs: [
          "Speak with a doctor if you or a family member notice new or worsening problems with memory, speech, balance, vision, weakness or numbness, or frequent severe headaches. Sudden symptoms need urgent medical attention.",
        ],
      },
    ],
  },
  {
    slug: "learning-about-spine-health",
    title: "Learning About Spine Health",
    excerpt:
      "How the spine works, common causes of back and neck discomfort, and practical ways to protect your spine.",
    category: "Spine Health",
    image: spineImg,
    imageAlt: "Illustration of the human spine and vertebrae",
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 4,
    sections: [
      {
        heading: "How the spine works",
        paragraphs: [
          "The spine is a column of bones called vertebrae, cushioned by discs. It supports the body and protects the spinal cord, which carries signals between the brain and the rest of the body.",
        ],
      },
      {
        heading: "Common reasons for back and neck pain",
        bullets: [
          "Muscle strain from lifting, posture or sudden movement",
          "Age-related changes in the discs and joints",
          "Injuries from falls or road accidents",
          "Nerve irritation, which can cause pain spreading to the arms or legs",
        ],
      },
      {
        heading: "Protecting your spine",
        bullets: [
          "Lift with your knees bent and the load close to your body.",
          "Take regular breaks from long periods of sitting.",
          "Keep active with movement that suits your fitness level.",
        ],
      },
      {
        heading: "When to see a doctor",
        paragraphs: [
          "Seek medical evaluation if back or neck pain is severe, does not improve, follows an injury, or comes with numbness, weakness, or difficulty controlling the bladder or bowels. The last of these needs urgent attention.",
        ],
      },
    ],
  },
  {
    slug: "preparing-for-a-hospital-consultation",
    title: "Preparing for a Hospital Consultation",
    excerpt:
      "A simple checklist to help you and your family get the most from your appointment.",
    category: "Patient Guide",
    image: consultImg,
    imageAlt: "Stethoscope, notebook and pen on a clinic desk",
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 3,
    sections: [
      {
        heading: "Before your visit",
        bullets: [
          "Write down your symptoms: when they started, how often they happen and what makes them better or worse.",
          "List all medicines you take, including doses.",
          "Gather previous reports, scans and prescriptions.",
          "Note down questions you want to ask.",
        ],
      },
      {
        heading: "On the day",
        bullets: [
          "Bring a valid ID and any documents the hospital asked for.",
          "Consider bringing a family member, especially for older patients.",
          "Arrive a little early to allow time for registration.",
        ],
      },
      {
        heading: "During the consultation",
        paragraphs: [
          "Share your concerns openly. If something is unclear, ask the doctor to explain again. It is helpful to note down the advice and next steps before you leave.",
        ],
      },
    ],
  },
  {
    slug: "understanding-neurological-symptoms",
    title: "Understanding Neurological Symptoms",
    excerpt:
      "An introduction to symptoms that can relate to the brain, spinal cord or nerves, and why proper evaluation matters.",
    category: "Neurology",
    image: brainImg,
    imageAlt: "Illustration of the human brain",
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 4,
    sections: [
      {
        heading: "What are neurological symptoms?",
        paragraphs: [
          "Neurological symptoms are changes that may come from the nervous system. Many have other causes too, which is why a careful medical evaluation is important.",
        ],
      },
      {
        heading: "Examples",
        bullets: [
          "Headaches that are new, severe or different from usual",
          "Numbness, tingling or weakness in the face, arms or legs",
          "Dizziness, loss of balance or difficulty walking",
          "Seizures or episodes of unusual behaviour",
          "Changes in memory, speech or vision",
        ],
      },
      {
        heading: "Getting the right help",
        paragraphs: [
          "Do not try to diagnose yourself from information online. If you notice symptoms like these, speak with a doctor. Sudden symptoms need emergency care straight away.",
        ],
      },
    ],
  },
  {
    slug: "persistent-headaches-when-to-seek-evaluation",
    title: "When to Seek Medical Evaluation for Persistent Headaches",
    excerpt:
      "Most headaches are not serious, but some warning signs mean you should speak with a doctor.",
    category: "Neurology",
    image: consultImg,
    imageAlt: "Clinic desk with a stethoscope and notebook",
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 3,
    sections: [
      {
        heading: "Headaches are common",
        paragraphs: [
          "Many people experience headaches from time to time. Common triggers include stress, lack of sleep, skipped meals and dehydration.",
        ],
      },
      {
        heading: "See a doctor if headaches",
        bullets: [
          "Happen frequently or are getting worse over time",
          "Wake you from sleep or are worst in the morning",
          "Change in pattern, especially after the age of 50",
          "Need pain relief medicine on many days of the month",
        ],
      },
      {
        heading: "Seek emergency care for",
        bullets: [
          "A sudden, extremely severe headache",
          "Headache with fever and a stiff neck",
          "Headache after a head injury",
          "Headache with weakness, confusion, difficulty speaking or loss of vision",
        ],
      },
    ],
  },
  {
    slug: "understanding-stroke-warning-signs",
    title: "Understanding Stroke Warning Signs",
    excerpt:
      "Recognising a stroke quickly and getting emergency help can make an important difference.",
    category: "Brain Health",
    image: brainImg,
    imageAlt: "Illustration of the human brain with highlighted pathways",
    published: "2026-11-12",
    updated: "2026-11-12",
    readMinutes: 3,
    sections: [
      {
        heading: "What is a stroke?",
        paragraphs: [
          "A stroke happens when blood supply to part of the brain is interrupted or when a blood vessel in the brain bleeds. It is a medical emergency.",
        ],
      },
      {
        heading: "Remember BE FAST",
        bullets: [
          "Balance: sudden loss of balance or coordination",
          "Eyes: sudden loss of vision or blurred vision",
          "Face: one side of the face drooping",
          "Arm: weakness or numbness in one arm or leg",
          "Speech: slurred or confused speech",
          "Time: get emergency medical help immediately",
        ],
      },
      {
        heading: "What to do",
        paragraphs: [
          "Do not wait to see if symptoms improve. Take the person to the nearest hospital emergency service straight away and note the time the symptoms started.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
