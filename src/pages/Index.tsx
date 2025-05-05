import React from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { useCourses } from "@/contexts/CourseContext";
import { Button } from "@/components/ui/button";

const Index: React.FC = () => {
  const { courses } = useCourses();
  const featuredCourses = courses.slice(0, 3); // Get first 3 courses for featured section

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-secondary py-16">
        <div className="container-custom">
          <div className="flex flex-wrap items-center gap-8">
            <div className="flex-1 min-w-[300px]">
              <h1 className="text-4xl font-bold mb-4">
                Finding Your Way to Knowledge.
              </h1>
              <p className="text-[#667085] mb-6">
                eLearning Hub is an innovative online course platform designed
                to empower learners in discovering and mastering new skills with
                ease.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Button asChild size="lg">
                  <Link to="/courses">Explore Courses</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/signup">Sign Up Free</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 min-w-[300px]">
              <img
                src="../../public/hero-illustration.jpg"
                alt="Student learning online"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-wrap-reverse items-center gap-8">
            <div className="flex-1 min-w-[300px] text-center">
              <img
                src="../../public/why-illustration.avif"
                alt="Why choose us"
                className="inline-block rounded-2xl"
              />
            </div>
            <div className="flex-1 min-w-[300px]">
              <h2 className="text-3xl font-bold mb-4">Why Choose Us!</h2>
              <ul className="space-y-3">
                <li className="relative pl-7 text-[#667085]">
                  <span className="absolute left-0 text-primary">✔</span>
                  Expert Guidance and Proven Results.
                </li>
                <li className="relative pl-7 text-[#667085]">
                  <span className="absolute left-0 text-primary">✔</span>
                  Customized Learning Paths.
                </li>
                <li className="relative pl-7 text-[#667085]">
                  <span className="absolute left-0 text-primary">✔</span>
                  Engaging, Interactive Learning.
                </li>
                <li className="relative pl-7 text-[#667085]">
                  <span className="absolute left-0 text-primary">✔</span>
                  Flexible Learning Options.
                </li>
                <li className="relative pl-7 text-[#667085]">
                  <span className="absolute left-0 text-primary">✔</span>
                  Commitment to Excellence.
                </li>
                <li className="relative pl-7 text-[#667085]">
                  <span className="absolute left-0 text-primary">✔</span>
                  Positive Student Feedback.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Featured Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Student Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-card flex flex-col">
              <p className="text-[#667085] mb-6 flex-1">
                "Industry-relevant content helped me gain a deeper understanding
                of digital marketing strategies."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                  alt="Rahul"
                  className="w-10 h-10 rounded-full"
                />
                <div className="font-semibold">Rahul</div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-card flex flex-col">
              <p className="text-[#667085] mb-6 flex-1">
                "The web development course was very insightful and provided me
                with the necessary skills to build my first website."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://c8.alamy.com/comp/2PWERD5/student-avatar-illustration-simple-cartoon-user-portrait-user-profile-icon-youth-avatar-vector-illustration-2PWERD5.jpg"
                  alt="Sushank"
                  className="w-10 h-10 rounded-full"
                />
                <div className="font-semibold">Sushank</div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-card flex flex-col">
              <p className="text-[#667085] mb-6 flex-1">
                "The project management course gave me a solid foundation in
                organizing tasks, setting goals, and managing teams
                effectively."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/009/749/656/non_2x/male-profile-mascot-illustration-man-avatar-icon-cartoon-face-business-user-logo-free-vector.jpg"
                  alt="Revanth"
                  className="w-10 h-10 rounded-full"
                />
                <div className="font-semibold">Revanth</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-secondary">
        <div className="container-custom">
          <div className="flex flex-wrap gap-8">
            <div className="flex-1 min-w-[300px]">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <textarea
                    rows={4}
                    placeholder="Message"
                    className="w-full p-3 border border-gray-300 rounded-md"
                  ></textarea>
                </div>
                <Button type="submit" className="w-full">
                  Send
                </Button>
              </form>
              <div className="mt-4">
                <p className="text-[#667085]">
                  📞 +91-8328094810 ✉️ info@eLearningHub.com
                </p>
              </div>
            </div>
            <div className="flex-1 min-w-[300px] h-[350px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3804.344773382346!2d78.3828276749838!3d17.538764398426878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e0ab28e0975%3A0x7b048b2858fdee94!2sVallurupalli%20Nageswara%20Rao%20Vignana%20Jyothi%20Institute%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1745770479656!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-dark text-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">eLearning Hub</h2>
              <p className="text-sm">Finding Your Way to Knowledge</p>
            </div>
            <div>
              <ul className="flex gap-4 flex-wrap justify-center">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
              </ul>
              <p className="text-sm mt-2 text-center">
                © 2025 eLearning Hub. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;
