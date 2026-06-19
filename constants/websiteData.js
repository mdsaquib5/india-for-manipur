import React from 'react';

export const hm = (text) => {
  if (typeof text !== 'string') return text;
  const parts = text.split(/(Manipur)/g);
  return parts.map((part, index) =>
    part === 'Manipur' ? <span key={index} className="red-manipur">Manipur</span> : part
  );
};

export const navigation = {
  logo: 'India For Manipur',
  links: [
    { label: 'Story', href: '#story' },
    { label: 'Contribution', href: '#contribution' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Human Cost', href: '#human-cost' },
    { label: 'Voices', href: '#voices' },
    { label: 'Act', href: '#cta' },
  ],
};

export const heroData = {
  preTitle: 'A Humanitarian Story',
  headline: 'Do You Remember',
  subheadline: 'Not the conflict. Not the headlines.\nThe people.',
  cta: 'Hear Their Story',
  scrollLabel: 'Scroll to explore',
};

export const contributionData = {
  preTitle: hm("What Manipur Gave India"),
  headline: hm('Before Asking India To Help Manipur'),
  subheadline: hm('Remember What Manipur Has Given India'),
  items: [
    {
      id: 'mary-kom',
      image: '/images/1.jpg',
      imageAlt: 'A boxer representing the spirit of Mary Kom from Manipur',
      tag: 'World Champion',
      name: 'Mary Kom',
      role: 'Boxing Legend',
      description: hm('Six-time World Boxing Champion. Olympic medalist. A woman from Manipur who put India on the world map of boxing and became a symbol of resilience for every Indian girl.'),
    },
    {
      id: 'mirabai',
      image: '/images/3.jpg',
      imageAlt: 'Manipuri traditional artisan representing the spirit of Mirabai Chanu',
      tag: 'Olympic Silver',
      name: 'Mirabai Chanu',
      role: 'Weightlifting Champion',
      description:
        'Silver medalist at the Tokyo 2020 Olympics. Mirabai trained against all odds, carrying the weight of a nation on her shoulders — and lifting it higher than ever before.',
    },
    {
      id: 'polo',
      image: '/images/5.jpg',
      imageAlt: 'A cultural scene from Manipur representing the birthplace of polo',
      tag: 'Cultural Heritage',
      name: 'The Birthplace of Polo',
      role: 'Sagol Kangjei — Ancient Sport',
      description: hm('The modern sport of polo was born in the valleys of Manipur. "Sagol Kangjei," played here for over 1,500 years, was introduced to the world through this land.'),
    },
    {
      id: 'handloom',
      image: '/images/handloom.jpg',
      imageAlt: 'Manipuri woman weaving on traditional handloom',
      tag: 'Living Tradition',
      name: 'Handloom & Textiles',
      role: 'GI-Tagged Heritage Craft',
      description: hm('Manipuri handloom — including the iconic Moirang Phee and Shaphee Lanphee — is a GI-tagged heritage that dresses India in culture. Every thread carries centuries of artistry.'),
    },
    {
      id: 'women',
      image: '/images/Paibis.jpg',
      imageAlt: 'Women of Manipur in traditional cultural dress',
      tag: "Women's Power",
      name: "Meira Paibis",
      role: "Women's Rights Movement",
      description: hm("The 'Meira Paibis' — torch-bearing women of Manipur — have led peaceful protests for human rights and justice for decades. They are among the most powerful civil society voices in India."),
    },
    {
      id: 'military',
      image: '/images/solder.jpg',
      imageAlt: 'Representation of military service from Manipur',
      tag: 'National Service',
      name: 'Military Contribution',
      role: 'Defenders of the Nation',
      description: hm('Thousands of soldiers from Manipur have served in the Indian Armed Forces — protecting our borders in Siachen, Kargil, and across every frontier. Manipur has always stood guard for India.'),
    },
  ],
};

export const beforeAfterData = {
  preTitle: 'Same Land. Different Reality.',
  headline: 'A Community Transformed by Crisis',
  subheadline: hm('These images show two faces of the same Manipur. One is memory. The other is the present.'),
  before: {
    label: 'Before',
    image: '/images/after.jpg',
    imageAlt: 'Imphal market — vibrant community life before the conflict',
    caption: 'The Ima Keithel market — one of the world\'s only all-women markets. Life, trade, and community.',
  },
  after: {
    label: 'After',
    image: '/images/before.jpg',
    imageAlt: 'Relief camps in Manipur — families displaced by the conflict',
    caption: 'Relief camps shelter thousands of families who have not returned home.',
  },
};

export const timelineData = {
  preTitle: 'The Story So Far',
  headline: 'How Did We Reach Here?',
  subheadline:
    'A chronological account — not of blame, but of understanding. History does not begin in 2023.',
  events: [
    {
      id: 'e1',
      year: 'Centuries Old',
      title: 'A Land of Diverse Communities',
      description: hm('Manipur has long been home to the valley-dwelling Meiteis, the hill-dwelling Naga and Kuki-Zo communities, and dozens of other groups. Each community carries its own culture, language, and identity — all woven into the fabric of one state.'),
    },
    {
      id: 'e2',
      year: '1949',
      title: 'Merger with India',
      description: hm('Manipur acceded to the Indian Union in September 1949. Statehood arrived in 1972. The transition brought new administrative structures that reshaped land rights, representation, and community relationships.'),
    },
    {
      id: 'e3',
      year: '1980s–2000s',
      title: 'Decades of Armed Unrest',
      description:
        'Multiple insurgent groups operated across both valley and hill areas. AFSPA was imposed in 1980 and remained in force for decades. Civil society — especially women\'s groups like the Meira Paibis — consistently called for peace, dignity, and accountability.',
    },
    {
      id: 'e4',
      year: '2022–2023',
      title: 'Escalating Tensions',
      description:
        'Disputes over land, tribal scheduled status, and forest protection orders deepened fault lines between communities. Political and social tensions reached a critical point in early 2023.',
    },
    {
      id: 'e5',
      year: 'May 2023',
      title: 'The Crisis Escalates',
      description:
        'Violence erupted in May 2023, quickly spreading across multiple districts. Homes, schools, and places of worship were destroyed. Communities that had co-existed for generations were violently separated.',
    },
    {
      id: 'e6',
      year: 'May – December 2023',
      title: 'Mass Displacement',
      description:
        'Tens of thousands of people were forced to flee their homes. Relief camps swelled. Education was disrupted. Medical access in conflict zones became critically limited. Families were torn apart.',
    },
    {
      id: 'e7',
      year: '2024',
      title: 'Ongoing Crisis',
      description:
        'Despite calls for peace, tens of thousands of people remained in relief camps well into 2024. Internet shutdowns continued for months. Normalcy in education and healthcare remained elusive for hundreds of thousands.',
    },
    {
      id: 'e8',
      year: 'Today',
      title: 'The People Are Still Waiting',
      description:
        'Families separated by conflict zones, children who have not returned to school, elders who have not seen their homes — these are the stories that are not making headlines. But they are happening. Right now.',
    },
  ],
};

export const humanCostData = {
  preTitle: 'The Human Cost',
  headline: 'Behind Every Number\nIs A Human Story',
  subheadline: 'These are not statistics. These are lives.',
  stats: [
    {
      id: 's1',
      number: 60000,
      suffix: '+',
      label: 'People Displaced',
      description: 'Tens of thousands forced to flee their homes and communities',
    },
    {
      id: 's2',
      number: 250,
      suffix: '+',
      label: 'Lives Lost',
      description: 'Every life a story, every loss an irreplaceable void in a community',
    },
    {
      id: 's3',
      number: 4000,
      suffix: '+',
      label: 'Homes Destroyed',
      description: 'Decades of lives built and then erased in days of violence',
    },
    {
      id: 's4',
      number: 300,
      suffix: '+',
      label: 'Relief Camps',
      description: 'Where families have spent months, some still living in uncertainty',
    },
  ],
};

export const generationData = {
  preTitle: 'A Generation Waiting',
  headline: 'They Didn\'t Start\nThis Conflict',
  subheadline: 'Yet They Are Growing Up Inside It',
  image: '/images/children-1.jpg',
  imageAlt: 'Children of Manipur in a classroom, representing hope and disrupted futures',
  body: [
    hm('Thousands of children across Manipur have had their education disrupted. Schools turned into relief camps. Teachers displaced. Exams missed. Childhoods interrupted.'),
    hm('The children of Manipur did not draw the lines that divide communities. They do not understand why they cannot go home, why their school is now someone\'s shelter, why their friends from the other side of the hill are no longer reachable.'),
    'But they are growing up with these realities embedded in their earliest memories. What we do today will determine what kind of India they grow up to belong to.',
  ],
  quote: '"The biggest casualty of a prolonged conflict is always the generation that grows up inside it."',
};

export const silenceData = {
  line1: 'If This Happened',
  line2: 'In Your City',
  line3: '—',
  line4: 'Would We Look Away?',
  subtext: hm('The people of Manipur are Indians. Their pain is India\'s responsibility.'),
};

export const voiceData = {
  preTitle: hm('Voices of Manipur'),
  headline: 'Voices That Deserve\nTo Be Heard',
  subheadline:
    'These are composite accounts drawn from humanitarian reports and oral testimonies, shared to honor those whose stories represent thousands more.',
  voices: [
    {
      id: 'v1',
      quote:
        '"I was supposed to write my Class 12 board exam. Instead, I spent that week helping my mother pack whatever we could carry. We walked for hours. I still haven\'t sat that exam."',
      name: 'A student, 18',
      role: 'Displaced from her village in May 2023',
      initial: 'S',
    },
    {
      id: 'v2',
      quote:
        '"I taught at the same school for 22 years. When I returned to see it, it was a shelter for 400 families. I cried — not from sadness for myself, but for the children who needed both."',
      name: 'A school teacher, 49',
      role: hm('Primary school teacher, inner Manipur'),
      initial: 'T',
    },
    {
      id: 'v3',
      quote:
        '"In the camp, I delivered three babies. No electricity, no proper equipment. We did what we could. But what haunts me is the pregnant women who could not reach us in time."',
      name: 'A doctor, 34',
      role: 'Volunteer medic, relief camp',
      initial: 'D',
    },
    {
      id: 'v4',
      quote:
        '"My son is on one side of the hill. I am on the other. We talk by phone when the network works. He says he is fine. I know he is lying to protect me. A mother always knows."',
      name: 'A mother, 55',
      role: 'Living in a relief camp, separated from family',
      initial: 'M',
    },
    {
      id: 'v5',
      quote:
        '"We had Hindu and Christian families, Meitei and Kuki neighbors at the same community center. Now I hold meetings in a half-burnt building and dream of that old table where we all sat together."',
      name: 'A community worker, 41',
      role: 'Community reconciliation organizer',
      initial: 'C',
    },
  ],
};

export const solutionsData = {
  preTitle: 'Restoring Manipur',
  headline: 'What Peace\nTruly Demands',
  subheadline:
    'Stopping the violence is just the baseline. Real peace means every child returns to school and every family can safely go home.',
  solutions: [
    {
      id: 'sol1',
      icon: 'MdOutlineHealing',
      title: 'Acknowledgment of Pain',
      description:
        'Before healing can begin, the suffering must be recognized. The people of Manipur need the nation to acknowledge their loss, displacement, and the deep trauma they continue to endure.',
    },
    {
      id: 'sol2',
      icon: 'MdHomeWork',
      title: 'A Safe Return Home',
      description:
        'Relief camps are not homes. Every displaced family deserves the fundamental right to return to their original lands with absolute, unwavering guarantees of safety and dignity.',
    },
    {
      id: 'sol3',
      icon: 'MdGavel',
      title: 'Justice & Accountability',
      description:
        'True peace cannot be built on impunity. There must be transparent investigations, unbiased justice, and strict accountability for the violence, destruction, and lives lost.',
    },
    {
      id: 'sol4',
      icon: 'MdChildCare',
      title: 'Saving A Generation',
      description:
        'An entire generation has lost years of education and innocence. Prioritizing their schooling, trauma care, and physical security is critical to saving Manipur\'s future.',
    },
    {
      id: 'sol5',
      icon: 'MdStorefront',
      title: 'Economic Survival',
      description:
        'Markets have burned, and lifelong livelihoods have vanished overnight. True recovery means aggressively rebuilding local economies so families can stand on their own feet again.',
    },
    {
      id: 'sol6',
      icon: 'MdHandshake',
      title: 'Grassroots Reconciliation',
      description:
        'Lasting solutions cannot be imposed from the top down. Peace requires an honest, inclusive dialogue where ordinary citizens and community leaders have an equal voice at the table.',
    },
  ],
};

export const movementData = {
  preTitle: hm('India For Manipur'),
  headline: hm('When Manipur Celebrated India\nIndia Celebrated.'),
  subheadline: hm('When Manipur Suffers,\nIndia Must Stand Together.'),
  body: hm('Manipur has carried India\'s flag in sports arenas, battlefields, and cultural stages across the world. Today, it is time for India to carry Manipur\'s story — to every city, every living room, every conversation.'),
  stat: 'One nation. One responsibility.',
};

export const ctaData = {
  sequence: [
    'They did not choose this conflict,',
    'But they are living it.',
    'We cannot undo the past,',
    'But we can hear their pain.',
    'One nation. One responsibility.',
    'It is time to act.',
  ],
  headline: hm('India For Manipur'),
  tagline: 'They Carried India\'s Pride. Let Us Carry Their Voice.',
  buttons: [
    { label: 'Join The Movement', id: 'join-btn', type: 'primary' },
  ],
};

export const footerData = {
  tagline: 'A humanitarian awareness campaign. Not political. Not partisan. Human.',
  links: [
    { label: 'About', href: '#story' },
    { label: 'Sources', href: '#sources' },
    { label: 'Research', href: '#research' },
    { label: 'Contact', href: 'mailto:contact@indiaformanipure.org' },
    { label: 'Privacy', href: '#privacy' },
  ],
  copyright: hm(`© ${new Date().getFullYear()} India For Manipur. All rights reserved.`),
  disclaimer:
    'This website is a humanitarian awareness campaign. It does not represent any political party, government body, or armed group. All content is based on publicly available humanitarian reporting.',
};
