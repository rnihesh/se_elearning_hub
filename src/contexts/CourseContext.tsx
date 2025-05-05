
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";
import { useAuth } from './AuthContext';

export type Course = {
  id: string;
  title: string;
  instructor: string;
  level: string;
  price: string;
  image: string;
  description: string;
};

type CourseContextType = {
  courses: Course[];
  userEnrollments: string[];
  enrollInCourse: (courseId: string) => void;
  isEnrolled: (courseId: string) => boolean;
};

const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Initial course data
const initialCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    instructor: 'John Doe',
    level: 'Beginner',
    price: 'Free',
    image: 'https://media.licdn.com/dms/image/v2/D5612AQHAcm8mGnSxBA/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1682869877196?e=2147483647&v=beta&t=afVlN5jagHBNJwPPzaKbzahDsG7mb3221qe8RGds3aw',
    description: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. Start building your own websites from scratch.'
  },
  {
    id: '2',
    title: 'Digital Marketing 101',
    instructor: 'Emily Smith',
    level: 'Intermediate',
    price: 'Free',
    image: 'https://www.investopedia.com/thmb/gVszoGBuWBrWopoa4vQ7S7ZCsBI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Term-Definitions_Digital-Marketing-5ae6ea1aee934b02a94a1a4d9401443d.jpg',
    description: 'Master digital marketing strategies including SEO, content marketing, social media, and more.'
  },
  {
    id: '3',
    title: 'Employee Training Essentials',
    instructor: 'Sarah Lee',
    level: 'Beginner',
    price: 'Free',
    image: 'https://cdn.prod.website-files.com/602bb4fef9fa885b85f30bf7/678df8afb8a3bd32f825ba3b_NS%20Employee%20Training%20Essentials.png',
    description: 'Learn the essential skills to effectively train and develop employees in any organization.'
  },
  {
    id: '4',
    title: 'International Business Management',
    instructor: 'Michael Brown',
    level: 'Intermediate',
    price: 'Free',
    image: 'https://askusedu.com/blogdashboard/wp-content/uploads/2023/12/Career-Jobs-Opportunities-after-International-Business-Management-Degree.jpg',
    description: 'Explore global business strategies, international trade, and cross-cultural management.'
  },
  {
    id: '5',
    title: 'Character Design Basics',
    instructor: 'James Williams',
    level: 'Beginner',
    price: 'Free',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLN_co3AuNfoMU--YVyThwv-P0XxpfWAfbrQ&s',
    description: 'Create compelling characters for animation, gaming, comics, and other visual storytelling media.'
  },
  {
    id: '6',
    title: 'Social Psychology',
    instructor: 'Jessica Taylor',
    level: 'Advanced',
    price: 'Free',
    image: 'https://ananda.ai/wp-content/uploads/2021/12/vlog-44-1024x536.jpg',
    description: 'Understand how social influence, perception, and interaction shape human behavior.'
  },
  {
    id: '7',
    title: 'Project Management Essentials',
    instructor: 'David Johnson',
    level: 'Intermediate',
    price: 'Free',
    image: 'https://pm360consulting.ie/wp-content/uploads/2021/05/PIC-KISSFLOW-PM-STATS.jpg',
    description: 'Master project planning, execution, monitoring, and closure with industry-standard methodologies.'
  },
  {
    id: '8',
    title: 'AI & Machine Learning Basics',
    instructor: 'Robert Clark',
    level: 'Advanced',
    price: 'Free',
    image: 'https://www.kdnuggets.com/wp-content/uploads/arya_back_basics_week_3_introduction_machine_learning_1.png',
    description: 'Explore the fundamentals of artificial intelligence and machine learning algorithms.'
  },
];

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [courses] = useState<Course[]>(initialCourses);
  const [userEnrollments, setUserEnrollments] = useState<string[]>([]);
  const { user } = useAuth();
  
  React.useEffect(() => {
    // Load enrollments from localStorage when user changes
    if (user) {
      const savedEnrollments = localStorage.getItem(`enrollments_${user.id}`);
      if (savedEnrollments) {
        setUserEnrollments(JSON.parse(savedEnrollments));
      }
    } else {
      setUserEnrollments([]);
    }
  }, [user]);

  const enrollInCourse = (courseId: string) => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      return;
    }
    
    if (userEnrollments.includes(courseId)) {
      toast.info('You are already enrolled in this course');
      return;
    }
    
    const newEnrollments = [...userEnrollments, courseId];
    setUserEnrollments(newEnrollments);
    
    // Save to localStorage
    localStorage.setItem(`enrollments_${user.id}`, JSON.stringify(newEnrollments));
    
    toast.success('Successfully enrolled in course!');
  };

  const isEnrolled = (courseId: string) => {
    return userEnrollments.includes(courseId);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        userEnrollments,
        enrollInCourse,
        isEnrolled
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CourseProvider');
  }
  return context;
};
