
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Course } from '@/contexts/CourseContext';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';

type CourseCardProps = {
  course: Course;
};

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const { enrollInCourse, isEnrolled } = useCourses();
  const { isAuthenticated } = useAuth();
  
  const handleEnroll = () => {
    enrollInCourse(course.id);
  };
  
  return (
    <div className="card-course">
      <img 
        src={course.image} 
        alt={course.title} 
        className="w-full h-36 object-cover"
      />
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2">{course.title}</h3>
        <p className="text-sm text-[#667085]">By {course.instructor}</p>
        <div className="mt-auto flex justify-between items-center text-sm">
          <span>{course.level} · {course.price}</span>
          {isAuthenticated ? (
            isEnrolled(course.id) ? (
              <Button asChild variant="outline">
                <Link to={`/courses/${course.id}`}>Go to Course</Link>
              </Button>
            ) : (
              <Button onClick={handleEnroll}>
                Register
              </Button>
            )
          ) : (
            <Button asChild>
              <Link to="/login">Login to Enroll</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
