import { motion } from 'framer-motion';
import { FaEye, FaUsers, FaPhoneAlt } from 'react-icons/fa';

const teamMembers = [
  { src: "https://via.placeholder.com/150", alt: "Team Member 1" },
  { src: "https://via.placeholder.com/150", alt: "Team Member 2" },
  { src: "https://via.placeholder.com/150", alt: "Team Member 3" },
];

const AboutUsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl lg:text-5xl font-extrabold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h2>

        <motion.p
          className="text-lg lg:text-xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We are dedicated to transforming healthcare by providing innovative solutions for hospitals. Our technology streamlines patient management, improves operational efficiency, and enhances the overall patient experience. Our mission is to leverage advanced technology to support healthcare professionals and ensure the best care for patients.
        </motion.p>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
          {/* Our Vision */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-left relative overflow-hidden transition-transform transform hover:scale-105"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 right-0 p-4 text-blue-500">
              <FaEye className="text-4xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be at the forefront of healthcare innovation, delivering solutions that create a seamless and efficient experience for hospitals and patients alike. We aim to redefine the standards of patient care through technology and innovation.
            </p>
          </motion.div>

          {/* Our Team */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-left relative overflow-hidden transition-transform transform hover:scale-105"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 right-0 p-4 text-indigo-500">
              <FaUsers className="text-4xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Team</h3>
            <p className="text-gray-600">
              Our team consists of experienced professionals with a passion for improving healthcare systems. We work collaboratively to develop and implement solutions that meet the needs of modern healthcare facilities.
            </p>
          </motion.div>

          {/* Contact Us */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full text-left relative overflow-hidden transition-transform transform hover:scale-105"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute top-0 right-0 p-4 text-blue-400">
              <FaPhoneAlt className="text-4xl" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-600">
              Have any questions or want to learn more about our solutions? Reach out to us, and we'll be happy to provide more information and assist with your needs.
            </p>
            <a href="/contact" className="text-blue-600 hover:underline mt-4 inline-block">Get in Touch</a>
          </motion.div>
        </div>

        {/* Team Images */}
        <div className="flex justify-center mt-12 space-x-6">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative w-32 h-32 rounded-full overflow-hidden transition-transform transform hover:scale-110">
              <img
                src={member.src}
                alt={member.alt}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
