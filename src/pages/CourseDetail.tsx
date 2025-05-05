
import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { courses, enrollInCourse, isEnrolled } = useCourses();
  const { isAuthenticated } = useAuth();
  
  const course = courses.find(c => c.id === id);
  
  if (!course) {
    return <Navigate to="/courses" />;
  }
  
  const handleEnroll = () => {
    enrollInCourse(course.id);
  };
  
  return (
    <>
      <Navbar />
      <div className="py-12">
        <div className="container-custom">
          <Link to="/courses" className="flex items-center gap-2 text-primary mb-6">
            <ArrowLeft size={16} />
            <span>Back to Courses</span>
          </Link>
          
          <div className="bg-white rounded-lg shadow-card overflow-hidden">
            <div className="h-64 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title}
                className="w-full object-cover"
              />
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                  <p className="text-muted-foreground">Instructor: {course.instructor}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="bg-secondary py-1 px-3 rounded-full text-sm">
                    {course.level}
                  </span>
                  <span className="bg-secondary py-1 px-3 rounded-full text-sm">
                    {course.price}
                  </span>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3">About this course</h2>
                <p>{course.description}</p>
              </div>
              
              {isAuthenticated ? (
                isEnrolled(course.id) ? (
                  <div className="bg-muted p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">You are enrolled in this course</h3>
                    <p className="mb-4">Start learning now to enhance your skills!</p>
                    <Button>Start Learning</Button>
                  </div>
                ) : (
                  <Button onClick={handleEnroll} size="lg">
                    Enroll in this Course
                  </Button>
                )
              ) : (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Sign in to enroll</h3>
                  <p className="mb-4">Join our community to start learning!</p>
                  <div className="flex gap-3">
                    <Button asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
