export type Comment = {
  id: number;
  userId: string;
  content: string;
  writtenTime: string;
  like: number;
  created_at: Date;
  updated_at: Date;
  replies: Comment[];
};

export type Routine = {
  id: number;
  title: string;
  userId: string;
  purpose: string;
  target: string[];
  level: string;
  list: Routine[];
  content: string;
  category: string;
  writtenTime: string;
  likes: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
  imageUrl: string;
};

export const routines: Routine[] = [
  {
    id: 1,
    title: 'Morning Flexibility Routine',
    userId: 'user001',
    purpose: 'Increase morning energy',
    target: ['Legs', 'Back'],
    level: 'Beginner',
    list: [],
    content: 'Start your morning with simple stretches to energize your day.',
    category: 'Stretching',
    writtenTime: '2024-04-20',
    likes: 120,
    views: 1500,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-20'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 2,
    title: 'Advanced Cardio Blast',
    userId: 'user002',
    purpose: 'High-intensity fat burn',
    target: ['Cardiovascular'],
    level: 'Advanced',
    list: [],
    content: 'Push your limits with this high-intensity cardio routine to blast fat.',
    category: 'Cardio',
    writtenTime: '2024-04-20',
    likes: 95,
    views: 1120,
    createdAt: new Date('2024-04-20'),
    updatedAt: new Date('2024-04-21'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 3,
    title: 'Strength Training for Beginners',
    userId: 'user003',
    purpose: 'Build muscle strength',
    target: ['Arms', 'Chest'],
    level: 'Beginner',
    list: [],
    content: 'Beginner-friendly strength training to help you build muscle.',
    category: 'Strength Training',
    writtenTime: '2024-04-21',
    likes: 85,
    views: 940,
    createdAt: new Date('2024-04-21'),
    updatedAt: new Date('2024-04-22'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 4,
    title: 'Yoga for Stress Relief',
    userId: 'user004',
    purpose: 'Reduce stress and relax',
    target: ['Whole Body'],
    level: 'Intermediate',
    list: [],
    content: 'Yoga sequences to help you unwind and de-stress.',
    category: 'Yoga',
    writtenTime: '2024-04-22',
    likes: 130,
    views: 1620,
    createdAt: new Date('2024-04-22'),
    updatedAt: new Date('2024-04-23'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 5,
    title: 'Pilates for Core Strength',
    userId: 'user005',
    purpose: 'Strengthen core muscles',
    target: ['Core'],
    level: 'Intermediate',
    list: [],
    content: 'Strengthen your core with these pilates exercises.',
    category: 'Pilates',
    writtenTime: '2024-04-23',
    likes: 75,
    views: 890,
    createdAt: new Date('2024-04-23'),
    updatedAt: new Date('2024-04-24'),
    comments: [],
    imageUrl:
    'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 6,
    title: 'Total Body Workout',
    userId: 'user006',
    purpose: 'Improve overall fitness',
    target: ['Whole Body'],
    level: 'Advanced',
    list: [],
    content: 'A comprehensive workout to improve your overall fitness level.',
    category: 'General Fitness',
    writtenTime: '2024-04-24',
    likes: 140,
    views: 1750,
    createdAt: new Date('2024-04-24'),
    updatedAt: new Date('2024-04-25'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 7,
    title: 'Low Impact Cardio for Seniors',
    userId: 'user007',
    purpose: 'Gentle cardio exercises',
    target: ['Cardiovascular'],
    level: 'Beginner',
    list: [],
    content: 'Gentle, low-impact cardio exercises tailored for seniors.',
    category: 'Cardio',
    writtenTime: '2024-04-25',
    likes: 65,
    views: 730,
    createdAt: new Date('2024-04-25'),
    updatedAt: new Date('2024-04-26'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 8,
    title: 'High-Intensity Interval Training (HIIT)',
    userId: 'user008',
    purpose: 'Burn calories quickly',
    target: ['Cardiovascular', 'Legs'],
    level: 'Advanced',
    list: [],
    content: 'Engage in high-intensity bursts to burn calories quickly.',
    category: 'HIIT',
    writtenTime: '2024-04-26',
    likes: 110,
    views: 1350,
    createdAt: new Date('2024-04-26'),
    updatedAt: new Date('2024-04-27'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 9,
    title: 'Kickboxing for Beginners',
    userId: 'user009',
    purpose: 'Learn basic kickboxing moves',
    target: ['Arms', 'Legs'],
    level: 'Beginner',
    list: [],
    content: 'Kickboxing routines to learn the basics and improve your fitness.',
    category: 'Kickboxing',
    writtenTime: '2024-04-27',
    likes: 90,
    views: 1050,
    createdAt: new Date('2024-04-27'),
    updatedAt: new Date('2024-04-28'),
    comments: [],
    imageUrl:
    'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
  {
    id: 10,
    title: 'Meditation and Breathing Techniques',
    userId: 'user010',
    purpose: 'Promote relaxation and mental clarity',
    target: ['Mind'],
    level: 'All Levels',
    list: [],
    content: 'Explore various meditation and breathing techniques to calm your mind and body.',
    category: 'Meditation',
    writtenTime: '2024-04-28',
    likes: 200,
    views: 2500,
    createdAt: new Date('2024-04-28'),
    updatedAt: new Date('2024-04-29'),
    comments: [],
    imageUrl: 'https://img.freepik.com/free-photo/full-shot-young-woman-stretching_23-2148309115.jpg',
  },
];