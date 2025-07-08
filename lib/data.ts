// Mock data for the application

// Tutors
const tutors = [
  {
    id: "tutor-1",
    name: "Dr. Sarah Johnson",
    title: "Mathematics & Physics Expert",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    subjects: ["Mathematics", "Physics", "Calculus", "Algebra", "Statistics"],
    shortBio:
      "PhD in Mathematics with 10+ years of teaching experience. Specializes in making complex concepts simple and engaging.",
    about:
      "I have a PhD in Applied Mathematics from MIT and have been teaching for over 10 years. My approach focuses on building a strong foundation and developing problem-solving skills. I believe every student can excel in math with the right guidance.",
    teachingStyle:
      "I adapt my teaching style to each student's needs. I use visual aids, real-world examples, and interactive exercises to make learning engaging and effective. I emphasize understanding concepts rather than memorization.",
    education: [
      { degree: "PhD in Applied Mathematics", institution: "Massachusetts Institute of Technology", year: "2013" },
      { degree: "MSc in Mathematics", institution: "Stanford University", year: "2010" },
      { degree: "BSc in Mathematics and Physics", institution: "University of California, Berkeley", year: "2008" },
    ],
    certifications: ["Certified Mathematics Teacher", "Advanced Pedagogical Methods", "STEM Education Specialist"],
    hourlyRate: 75,
    rating: 4.9,
    reviewCount: 124,
    yearsExperience: 10,
    lessonsCompleted: 1240,
    responseTime: "< 1 hour",
  },
  {
    id: "tutor-2",
    name: "Prof. Michael Chen",
    title: "Computer Science & Programming Tutor",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    subjects: ["Computer Science", "Python", "JavaScript", "Data Structures", "Algorithms"],
    shortBio:
      "Software engineer and CS professor with expertise in multiple programming languages. Passionate about teaching coding to students of all levels.",
    about:
      "I'm a software engineer with 8 years of industry experience and 5 years of teaching experience. I've worked at top tech companies and now teach CS at the university level. I love helping students develop their coding skills and prepare for tech careers.",
    teachingStyle:
      "My teaching approach is hands-on and project-based. I believe in learning by doing, so we'll work on real coding projects together. I'll guide you through problem-solving strategies and best practices in software development.",
    education: [
      { degree: "MSc in Computer Science", institution: "University of Washington", year: "2015" },
      { degree: "BSc in Computer Engineering", institution: "University of California, San Diego", year: "2012" },
    ],
    certifications: [
      "AWS Certified Solutions Architect",
      "Google Cloud Professional Developer",
      "Oracle Certified Java Programmer",
    ],
    hourlyRate: 65,
    rating: 4.8,
    reviewCount: 98,
    yearsExperience: 8,
    lessonsCompleted: 870,
    responseTime: "< 2 hours",
  },
  {
    id: "tutor-3",
    name: "Emma Rodriguez",
    title: "English Literature & Writing Coach",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    subjects: ["English Literature", "Creative Writing", "Essay Writing", "Grammar", "SAT/ACT Prep"],
    shortBio:
      "Published author and English teacher specializing in literature analysis and writing skills. Helps students find their unique voice.",
    about:
      "I'm a published author with an MFA in Creative Writing and 7 years of teaching experience. I've helped hundreds of students improve their writing skills, prepare for standardized tests, and gain admission to top universities through compelling personal statements.",
    teachingStyle:
      "I create a supportive environment where students can explore ideas and develop their writing skills. I provide constructive feedback and practical techniques to improve grammar, structure, and style. My goal is to help students communicate effectively and confidently.",
    education: [
      { degree: "MFA in Creative Writing", institution: "Columbia University", year: "2016" },
      { degree: "BA in English Literature", institution: "New York University", year: "2013" },
    ],
    certifications: ["TEFL Certification", "Advanced Writing Instructor", "SAT/ACT Test Prep Specialist"],
    hourlyRate: 60,
    rating: 4.9,
    reviewCount: 112,
    yearsExperience: 7,
    lessonsCompleted: 950,
    responseTime: "Same day",
  },
  {
    id: "tutor-4",
    name: "Dr. James Wilson",
    title: "Chemistry & Biology Specialist",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    subjects: ["Chemistry", "Biology", "Biochemistry", "Organic Chemistry", "AP/IB Science"],
    shortBio:
      "PhD in Biochemistry with experience teaching at university and high school levels. Makes science accessible and engaging.",
    about:
      "With a PhD in Biochemistry and experience in both research and education, I bring real-world applications into my teaching. I've taught at both university and high school levels, and I understand the challenges students face with science subjects.",
    teachingStyle:
      "I use visual aids, molecular models, and interactive simulations to make abstract concepts concrete. I break down complex topics into manageable parts and connect them to everyday examples. My students develop strong problem-solving skills and scientific thinking.",
    education: [
      { degree: "PhD in Biochemistry", institution: "Johns Hopkins University", year: "2014" },
      { degree: "BSc in Chemistry", institution: "University of Michigan", year: "2009" },
    ],
    certifications: ["Certified Science Educator", "Laboratory Safety Instructor", "AP Chemistry Examiner"],
    hourlyRate: 70,
    rating: 4.7,
    reviewCount: 86,
    yearsExperience: 9,
    lessonsCompleted: 760,
    responseTime: "< 3 hours",
  },
  {
    id: "tutor-5",
    name: "Sophia Patel",
    title: "Foreign Language Instructor",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    subjects: ["Spanish", "French", "ESL/ESOL", "Conversation Practice", "Grammar"],
    shortBio:
      "Multilingual language teacher with immersive teaching methods. Creates customized learning plans for all proficiency levels.",
    about:
      "I'm fluent in five languages and have been teaching languages for over 6 years. I've lived in Spain, France, and Italy, and I bring cultural context into my language lessons. I work with students of all ages and proficiency levels.",
    teachingStyle:
      "I use an immersive approach, speaking in the target language as much as possible. I incorporate authentic materials like songs, videos, and articles to develop real-world language skills. My lessons are interactive and conversation-focused.",
    education: [
      { degree: "MA in Applied Linguistics", institution: "Georgetown University", year: "2017" },
      { degree: "BA in Modern Languages", institution: "Boston University", year: "2014" },
    ],
    certifications: ["CELTA Certification", "DELE Examiner (Spanish)", "DELF Examiner (French)"],
    hourlyRate: 55,
    rating: 4.8,
    reviewCount: 103,
    yearsExperience: 6,
    lessonsCompleted: 890,
    responseTime: "< 1 hour",
  },
  {
    id: "tutor-6",
    name: "David Kim",
    title: "Test Prep & Academic Coach",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    coverImage:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    subjects: ["SAT", "ACT", "GRE", "GMAT", "Study Skills"],
    shortBio:
      "Specialized in standardized test preparation with proven results. Helps students develop effective study strategies and test-taking skills.",
    about:
      "I've helped hundreds of students achieve their target scores on standardized tests. My students have been admitted to Ivy League universities and received substantial scholarships. I focus not just on content knowledge but also on test-taking strategies and managing test anxiety.",
    teachingStyle:
      "I begin with a diagnostic assessment to identify strengths and areas for improvement. Then I create a personalized study plan with targeted practice and regular progress checks. I teach specific strategies for each test section and provide extensive practice with real test questions.",
    education: [
      { degree: "MEd in Education", institution: "Harvard University", year: "2015" },
      { degree: "BA in Psychology", institution: "Yale University", year: "2012" },
    ],
    certifications: [
      "Certified Test Prep Specialist",
      "Educational Psychology Certification",
      "Academic Coaching Certification",
    ],
    hourlyRate: 80,
    rating: 4.9,
    reviewCount: 145,
    yearsExperience: 8,
    lessonsCompleted: 1320,
    responseTime: "Same day",
  },
]

// Reviews
const reviews = [
  {
    id: "review-1",
    tutorId: "tutor-1",
    student: {
      name: "Alex Thompson",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    rating: 5,
    subject: "Calculus",
    date: "2023-03-15",
    content:
      "Dr. Johnson is an exceptional math tutor. She explained complex calculus concepts in a way that finally made sense to me. After just a few sessions, my grades improved significantly. Highly recommend!",
  },
  {
    id: "review-2",
    tutorId: "tutor-1",
    student: {
      name: "Jamie Lee",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    rating: 5,
    subject: "Statistics",
    date: "2023-02-20",
    content:
      "I was struggling with statistics for my research project, and Dr. Johnson was incredibly helpful. She's patient, knowledgeable, and explains concepts clearly. She also provided additional resources that were very useful.",
  },
  {
    id: "review-3",
    tutorId: "tutor-1",
    student: {
      name: "Chris Martinez",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    rating: 4,
    subject: "Physics",
    date: "2023-01-10",
    content:
      "Great tutor for physics! Dr. Johnson helped me prepare for my AP Physics exam, and I ended up getting a 5. She's very thorough and makes sure you understand the underlying principles, not just how to solve specific problems.",
  },
  {
    id: "review-4",
    tutorId: "tutor-2",
    student: {
      name: "Taylor Wong",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    rating: 5,
    subject: "Python Programming",
    date: "2023-04-05",
    content:
      "Prof. Chen is an outstanding programming tutor. I had no prior coding experience, but after 10 sessions, I was able to build my own web application. He explains concepts clearly and assigns practical exercises that reinforce learning.",
  },
  {
    id: "review-5",
    tutorId: "tutor-2",
    student: {
      name: "Jordan Smith",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    rating: 4,
    subject: "Data Structures",
    date: "2023-03-22",
    content:
      "I was struggling with data structures in my CS course, but Prof. Chen helped me understand the concepts and improve my coding skills. He's patient and knowledgeable, and he provides helpful resources for additional practice.",
  },
]

// Upcoming Lessons
const upcomingLessons = [
  {
    id: "lesson-1",
    userId: "user-1",
    tutor: {
      id: "tutor-1",
      name: "Dr. Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    subject: "Calculus II",
    date: "2023-05-15",
    time: "4:00 PM - 5:00 PM",
    type: "Online",
    canJoin: true,
  },
  {
    id: "lesson-2",
    userId: "user-1",
    tutor: {
      id: "tutor-3",
      name: "Emma Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    subject: "Essay Writing",
    date: "2023-05-18",
    time: "6:30 PM - 7:30 PM",
    type: "Online",
    canJoin: false,
  },
  {
    id: "lesson-3",
    userId: "user-1",
    tutor: {
      id: "tutor-5",
      name: "Sophia Patel",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    subject: "Spanish Conversation",
    date: "2023-05-20",
    time: "5:00 PM - 6:00 PM",
    type: "Online",
    canJoin: false,
  },
]

// Past Lessons
const pastLessons = [
  {
    id: "past-lesson-1",
    userId: "user-1",
    tutor: {
      id: "tutor-1",
      name: "Dr. Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    subject: "Calculus I",
    date: "2023-04-10",
    duration: 60,
    reviewed: true,
  },
  {
    id: "past-lesson-2",
    userId: "user-1",
    tutor: {
      id: "tutor-2",
      name: "Prof. Michael Chen",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    subject: "Python Basics",
    date: "2023-04-05",
    duration: 90,
    reviewed: true,
  },
  {
    id: "past-lesson-3",
    userId: "user-1",
    tutor: {
      id: "tutor-3",
      name: "Emma Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    subject: "College Application Essays",
    date: "2023-04-01",
    duration: 60,
    reviewed: false,
  },
]

// Data access functions
export function getFeaturedTutors() {
  return tutors.slice(0, 4)
}

export function getTutors() {
  return tutors
}

export function getTutorById(id: string) {
  return tutors.find((tutor) => tutor.id === id) || null
}

export function getTutorReviews(tutorId: string) {
  return reviews.filter((review) => review.tutorId === tutorId)
}

export function getTutorAvailability(tutorId: string, date?: Date) {
  // Mock availability - in a real app, this would come from a database
  const availableTimes = ["9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "5:00 PM", "7:00 PM"]

  return availableTimes
}

export function getUserUpcomingLessons(userId: string) {
  return upcomingLessons.filter((lesson) => lesson.userId === userId)
}

export function getUserPastLessons(userId: string) {
  return pastLessons.filter((lesson) => lesson.userId === userId)
}

export function getUserFavoriteTutors(userId: string) {
  // Mock function to get favorite tutors
  const user = getCurrentUser()
  if (!user) return []

  return tutors.filter((tutor) => user.favoriteTutors.includes(tutor.id))
}

export function getCurrentUser() {
  // In a real app, this would check authentication state
  // For demo purposes, we'll return a mock user
  if (typeof window !== "undefined") {
    const authStorage = localStorage.getItem("auth-storage")
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage)
        return state.user
      } catch (e) {
        return null
      }
    }
  }
  return null
}
