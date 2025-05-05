
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { useCourses } from '@/contexts/CourseContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const MyCourses: React.FC = () => {
  const { courses, userEnrollments } = useCourses();
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  // Get enrolled courses
  const enrolledCourses = courses.filter(course => 
    userEnrollments.includes(course.id)
  );
  
  return (
    <>
      <Navbar />
      <section className="py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">My Courses</h1>
          
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map(course => (
                <div key={course.id} className="card-course">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
                    <p className="text-sm text-[#667085] mb-4">By {course.instructor}</p>
                    <div className="mt-auto">
                      <Button asChild>
                        <Link to={`/courses/${course.id}`}>Continue Learning</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-secondary rounded-lg">
              <h2 className="text-xl font-semibold mb-3">You haven't enrolled in any courses yet</h2>
              <p className="text-[#667085] mb-6">Browse our catalog and find courses that interest you.</p>
              <Button asChild>
                <Link to="/courses">Explore Courses</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default MyCourses;
