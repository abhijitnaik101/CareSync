import { useNavigate } from 'react-router-dom';
import { Fade } from 'react-awesome-reveal';
import { motion } from 'framer-motion';
import TestimonialsCarousel from '../components/LandingPage/Testimonial';

const Landing = () => {

    const hospitals = ["City Hospital", "St. Mary's Medical Center", "Sunrise Health", "Grand Oak Hospital", "Maple Valley Hospital", "Riverbend Clinic", "Greenwood Healthcare"];
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                {/* Hero Section */}
                <section className="relative bg-blue-600 text-white overflow-hidden">
                    <div className="container mx-auto px-6 py-20 flex flex-col-reverse lg:flex-row items-center justify-between">
                        <motion.div
                            className="lg:w-1/2"
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1 className="text-4xl lg:text-6xl font-bold mb-3">
                                CareSync:
                            </h1>
                            <p className='text-2xl lg:text-4xl font-bold mb-6'>Revolutionizing Healthcare with Intelligent Queuing & Patient Management</p>

                            <p className="text-lg mb-6">
                                A hospital-based solution designed for efficient patient management, real-time bed availability, and seamless admission processes. Perfectly integrated with city-wide healthcare modules.
                            </p>
                            <button
                                onClick={handleLogin}
                                className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 hover:text-white transition duration-300"
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
                                src="https://via.placeholder.com/600x400" // Replace with your image
                                alt="Healthcare"
                                className="w-full rounded-lg shadow-lg"
                            />
                        </motion.div>
                    </div>

                    {/* News Ticker */}
                    <div className="absolute bottom-0 left-0 right-0 bg-blue-700 py-3">
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



                {/* About Us Section */}
                <section className="py-20 bg-white">
                    <Fade>
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
                            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                                We are dedicated to transforming healthcare by providing innovative solutions for hospitals. Our technology streamlines patient management, improves operational efficiency, and enhances the overall patient experience.
                            </p>
                        </div>
                    </Fade>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 bg-gray-100">
                    <Fade cascade damping={0.1}>
                        <div className="container mx-auto px-6">
                            <div className="text-center mb-16">
                                <h2 className="text-4xl font-bold text-gray-800">Our Core Features</h2>
                                <p className="text-lg text-gray-600 mt-4">
                                    Tailored solutions for hospitals to improve patient care and operational efficiency.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                {/* Feature 1 */}
                                <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                                    <div className="mb-4">
                                        <svg
                                            className="w-12 h-12 mx-auto text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Smart Queuing Models</h3>
                                    <p className="text-gray-600">
                                        Efficient queuing systems for OPDs, ensuring minimal wait times and optimized patient flow.
                                    </p>
                                </div>

                                {/* Feature 2 */}
                                <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                                    <div className="mb-4">
                                        <svg
                                            className="w-12 h-12 mx-auto text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 17v-5a4 4 0 018 0v5m-1 4h-6m3-6v-1m0-4a4 4 0 00-8 0v3m2 2v-1"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Real-time Bed Availability</h3>
                                    <p className="text-gray-600">
                                        Up-to-date information on bed availability across wards, ensuring optimal resource management.
                                    </p>
                                </div>

                                {/* Feature 3 */}
                                <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                                    <div className="mb-4">
                                        <svg
                                            className="w-12 h-12 mx-auto text-blue-600"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 20h5v-2a2 2 0 00-2-2h-3a2 2 0 00-2 2v2zm-7 0h5v-2a2 2 0 00-2-2H7a2 2 0 00-2 2v2h5zm-7 0h5v-2a2 2 0 00-2-2H2a2 2 0 00-2 2v2h5zm7-12a5 5 0 01-5 5H5V8.5A1.5 1.5 0 016.5 7h1A1.5 1.5 0 019 8.5V11h2a5 5 0 015-5V7z"
                                            ></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Seamless Patient Admissions</h3>
                                    <p className="text-gray-600">
                                        Simplified and efficient patient admission processes, fully integrated with hospital management systems.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Fade>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 bg-gray-50">
                    <Fade>
                        <div className="container mx-auto px-6 text-center">
                            <h2 className="text-4xl font-bold text-gray-800">
                                Our Clients' Feedback
                            </h2>
                            <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                                We’re honored to work with healthcare leaders and hospitals to deliver cutting-edge solutions. Here's what they say about working with us.
                            </p>
                        </div>
                    </Fade>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
                        <Fade cascade damping={0.1}>

                            {/* Testimonial 1 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <p className="text-gray-700 mb-6">
                                    "The seamless integration of the system with our hospital’s existing setup was remarkable. The real-time updates make a huge difference."
                                </p>
                                <p className="font-semibold text-blue-600">- Dr. Sarah Lee</p>
                                <p className="text-sm text-gray-500">Chief Medical Officer, City Hospital</p>
                            </div>

                            {/* Testimonial 2 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <p className="text-gray-700 mb-6">
                                    "Our workflow efficiency has improved drastically with the queuing system. Patient satisfaction has gone through the roof!"
                                </p>
                                <p className="font-semibold text-blue-600">- Dr. Michael Edwards</p>
                                <p className="text-sm text-gray-500">Head of Surgery, Green Valley Hospital</p>
                            </div>

                            {/* Testimonial 3 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <p className="text-gray-700 mb-6">
                                    "With real-time bed availability updates, managing patient admissions has never been easier or more efficient."
                                </p>
                                <p className="font-semibold text-blue-600">- Dr. Emily Carter</p>
                                <p className="text-sm text-gray-500">Director, Lakeside Medical Center</p>
                            </div>

                            {/* Testimonial 4 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <p className="text-gray-700 mb-6">
                                    "The real-time data tracking has transformed how we manage patient queues and resources. It’s been a game changer."
                                </p>
                                <p className="font-semibold text-blue-600">- Dr. Jason Brown</p>
                                <p className="text-sm text-gray-500">Chief Administrator, Metro Health</p>
                            </div>

                            {/* Testimonial 5 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <p className="text-gray-700 mb-6">
                                    "This system has streamlined our hospital operations, making our staff more productive and our patients happier."
                                </p>
                                <p className="font-semibold text-blue-600">- Dr. Amanda Taylor</p>
                                <p className="text-sm text-gray-500">Chief of Staff, Horizon Medical</p>
                            </div>

                            {/* Testimonial 6 */}
                            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                                <img
                                    src="https://via.placeholder.com/100"
                                    alt="Profile"
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <p className="text-gray-700 mb-6">
                                    "Managing bed capacity and patient admissions is now efficient and stress-free, thanks to this amazing system."
                                </p>
                                <p className="font-semibold text-blue-600">- Dr. Natalie Johnson</p>
                                <p className="text-sm text-gray-500">Head of Operations, Westfield Hospital</p>
                            </div>

                        </Fade>
                    </div>
                </section>


                {/* Call to Action */}
                <section className="py-20 bg-blue-600 text-white text-center">
                    <Fade>
                        <div className="container mx-auto px-6">
                            <h2 className="text-4xl font-bold mb-6">
                                Join Us in Transforming Healthcare
                            </h2>
                            <p className="text-lg mb-10">
                                Discover how our solutions can improve patient care and hospital efficiency. Connect with us to learn more.
                            </p>
                            <a
                                href="#contact"
                                className="bg-white text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 hover:text-white transition duration-300"
                            >
                                Get in Touch
                            </a>
                        </div>
                    </Fade>
                </section>

                {/* Footer */}
                <footer className="py-10 bg-gray-800 text-white text-center">
                    <p className="text-sm">
                        © 2024 Hospital Management Solutions. All rights reserved.
                    </p>
                </footer>
            </div>
        </div>
    );
};

export default Landing;


