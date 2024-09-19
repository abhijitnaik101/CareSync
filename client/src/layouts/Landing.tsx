import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import TestimonialsCarousel from "../components/LandingPage/Testimonial";
import { FaHospital, FaBed, FaClipboardCheck } from "react-icons/fa";
import { Fade } from "react-awesome-reveal";
import { FaQuoteLeft, FaUserMd, FaRegHospital } from "react-icons/fa";
import { Link } from "react-scroll"; // Import react-scroll's Link

const Landing = () => {
  const hospitals = [
    "City Hospital",
    "St. Mary's Medical Center",
    "Sunrise Health",
    "Grand Oak Hospital",
    "Maple Valley Hospital",
    "Riverbend Clinic",
    "Greenwood Healthcare",
  ];
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-800 text-white py-4 z-50">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">CareSync</h1>
          <ul className="flex space-x-6">
            {/* Navbar links with smooth scroll functionality */}
            <li>
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="testimonials"
                smooth={true}
                duration={500}
                className="cursor-pointer"
              >
                Feedback
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black text-gray-300">
        {/* Hero Section */}
        <section
          id="home"
          className="relative text-white overflow-hidden pt-20"
        >
          <div className="container mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center justify-between">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-5xl lg:text-7xl font-extrabold mb-3 pb-[5px] text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
                CareSync
              </h1>
              <p className="text-2xl lg:text-4xl font-bold mb-6 text-gray-300">
                Revolutionizing Healthcare with Intelligent Queuing & Patient
                Management
              </p>
              <p className="text-lg mb-6">
                A hospital-based solution designed for efficient patient
                management, real-time bed availability, and seamless admission
                processes.
              </p>
              <button
                onClick={handleLogin}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 hover:text-white transition duration-300"
              >
                Login
              </button>
            </motion.div>
            <motion.div
              className="lg:w-1/2 mb-10 lg:mb-0"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src="/photo.jpg"
                alt="Healthcare"
                className="w-[600px] h-[400px] rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          </div>
          {/* News Ticker */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-purple-700 to-indigo-700 py-3">
            <div className="overflow-hidden">
              <motion.div
                className="flex space-x-10 text-lg text-white"
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                {hospitals.map((hospital, index) => (
                  <span key={index}>{hospital}</span>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-gray-900 py-12">
          <div className="container mx-auto">
            <h2 className="text-center text-3xl font-semibold text-white mb-8">
              Our Services
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg hover:bg-gray-700 transition">
                <FaHospital className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-medium text-white">
                  OPD Management
                </h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg hover:bg-gray-700 transition">
                <FaHospital className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-medium text-white">
                  Bed Management
                </h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg hover:bg-gray-700 transition">
                <FaHospital className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-medium text-white">
                  Hospital Recommendation
                </h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg hover:bg-gray-700 transition">
                <FaHospital className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-medium text-white">
                  Inventory Management
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="py-20 bg-gray-900">
          <Fade>
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-white">About Us</h2>
              <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                We are dedicated to transforming healthcare by providing
                innovative solutions for hospitals. Our technology streamlines
                patient management, improves operational efficiency, and
                enhances the overall patient experience.
              </p>
            </div>
          </Fade>
        </section>

        {/* Core Features Section */}
        <section id="features" className="py-20 bg-gray-900">
          <Fade cascade damping={0.1}>
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white">
                  Our Core Features
                </h2>
                <p className="text-lg text-gray-400 mt-4">
                  Tailored solutions for hospitals to improve patient care and
                  operational efficiency.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Feature 1 */}
                <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
                  <FaHospital className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Smart Queuing Models
                  </h3>
                  <p className="text-gray-400">
                    Efficient queuing systems for OPDs, ensuring minimal wait
                    times and optimized patient flow.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
                  <FaBed className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Real-time Bed Availability
                  </h3>
                  <p className="text-gray-400">
                    Up-to-date information on bed availability across wards,
                    ensuring optimal resource management.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105">
                  <FaClipboardCheck className="w-12 h-12 mx-auto text-purple-500 mb-4" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Seamless Patient Admissions
                  </h3>
                  <p className="text-gray-400">
                    Simplified and efficient patient admission processes, fully
                    integrated with hospital management systems.
                  </p>
                </div>
              </div>
            </div>
          </Fade>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gray-900">
          <Fade>
            <div className="container mx-auto px-6 text-center">
              <h2 className="text-4xl font-bold text-white">
                Our Clients' Feedback
              </h2>
              <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                We’re honored to work with healthcare leaders and hospitals to
                deliver cutting-edge solutions. Here's what they say about
                working with us.
              </p>
            </div>
          </Fade>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
            <Fade cascade damping={0.1}>
              {/* Testimonial 1 */}
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <FaQuoteLeft className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-indigo-500"
                />
                <p className="text-gray-300 mb-6">
                  "The seamless integration of the system with our hospital’s
                  existing setup was remarkable. The real-time updates make a
                  huge difference."
                </p>
                <p className="font-semibold text-indigo-400">- Dr. Sarah Lee</p>
                <p className="text-sm text-gray-500">
                  Chief Medical Officer, City Hospital
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <FaUserMd className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-indigo-500"
                />
                <p className="text-gray-300 mb-6">
                  "Our workflow efficiency has improved drastically with the
                  queuing system. Patient satisfaction has gone through the
                  roof!"
                </p>
                <p className="font-semibold text-indigo-400">
                  - Dr. Michael Edwards
                </p>
                <p className="text-sm text-gray-500">
                  Head of Surgery, Green Valley Hospital
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <FaRegHospital className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-indigo-500"
                />
                <p className="text-gray-300 mb-6">
                  "With real-time bed availability updates, managing patient
                  admissions has never been easier or more efficient."
                </p>
                <p className="font-semibold text-indigo-400">
                  - Dr. Emily Carter
                </p>
                <p className="text-sm text-gray-500">
                  Director, Lakeside Medical Center
                </p>
              </div>

              {/* Testimonial 4 */}
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <FaQuoteLeft className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-indigo-500"
                />
                <p className="text-gray-300 mb-6">
                  "The real-time data tracking has transformed how we manage
                  patient queues and resources. It’s been a game changer."
                </p>
                <p className="font-semibold text-indigo-400">
                  - Dr. Jason Brown
                </p>
                <p className="text-sm text-gray-500">
                  Chief Administrator, Metro Health
                </p>
              </div>

              {/* Testimonial 5 */}
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <FaUserMd className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-indigo-500"
                />
                <p className="text-gray-300 mb-6">
                  "This system has streamlined our hospital operations, making
                  our staff more productive and our patients happier."
                </p>
                <p className="font-semibold text-indigo-400">
                  - Dr. Amanda Taylor
                </p>
                <p className="text-sm text-gray-500">
                  Chief of Staff, Horizon Medical
                </p>
              </div>

              {/* Testimonial 6 */}
              <div className="bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <FaRegHospital className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
                <img
                  src="https://via.placeholder.com/100"
                  alt="Profile"
                  className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-indigo-500"
                />
                <p className="text-gray-300 mb-6">
                  "Managing bed capacity and patient admissions is now efficient
                  and stress-free, thanks to this amazing system."
                </p>
                <p className="font-semibold text-indigo-400">
                  - Dr. Natalie Johnson
                </p>
                <p className="text-sm text-gray-500">
                  Head of Operations, Westfield Hospital
                </p>
              </div>
            </Fade>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
            {/* Testimonials */}
            {/* Add your testimonials here as shown in the previous code */}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-lg text-gray-300 mt-4">
              Let CareSync bring efficiency, innovation, and better patient care
              to your hospital.
            </p>
            <button
              onClick={handleLogin}
              className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg mt-6 hover:bg-gray-200 transition"
            >
              Get Started
            </button>
          </div>
        </section>
      </div>
      {/* footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6">
          {/* Logo and Chat */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-white mb-4">CareSync</h1>
            <p className="mb-4">
              Immerse yourself in stunning visuals and captivating stories as
              you navigate through our website.
            </p>
          </div>

          {/* About Us Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">About Us</h2>
            <ul>
              <li className="mb-2">
                <a href="#home" className="hover:text-orange-500">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#about" className="hover:text-orange-500">
                  About Us
                </a>
              </li>
              <li className="mb-2">
                <a href="#destination" className="hover:text-orange-500">
                  Destination
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-orange-500">
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Services</h2>
            <ul>
              <li className="mb-2">
                <a href="#support" className="hover:text-orange-500">
                  Support
                </a>
              </li>
              <li className="mb-2">
                <a href="#explore" className="hover:text-orange-500">
                  Explore
                </a>
              </li>
              <li className="mb-2">
                <a href="#get-in-touch" className="hover:text-orange-500">
                  Get in Touch
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-orange-500">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Contact Info
            </h2>
            <ul>
              <li className="mb-2">455 West Orchard Street</li>
              <li className="mb-2">Kings Mountain, NC 280867</li>
              <li className="mb-2">
                <a href="tel:+123456789" className="hover:text-orange-500">
                  123-456-789
                </a>
              </li>
              <li>
                <a
                  href="mailto:uivisionaries@gmail.com"
                  className="hover:text-orange-500"
                >
                  uivisionaries@gmail.com
                </a>
              </li>
            </ul>
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-300 hover:text-orange-500">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-orange-500">
                <i className="fab fa-pinterest"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 border-t border-gray-700 pt-4">
          © ui-visionaries 2023, All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default Landing;
