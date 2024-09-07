import React from "react";
import Slider from "react-slick";

const TestimonialsCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800">
          Our Clients' Feedback
        </h2>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          We’re honored to work with healthcare leaders and hospitals to deliver cutting-edge solutions. Here's what they say about working with us.
        </p>
      </div>

      <div className="mt-16 px-6">
        <Slider {...settings}>
          {/* Testimonial 1 */}
          <div className="px-4">
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
          </div>

          {/* Testimonial 2 */}
          <div className="px-4">
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
          </div>

          {/* Testimonial 3 */}
          <div className="px-4">
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
          </div>

          {/* Testimonial 4 */}
          <div className="px-4">
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
          </div>

          {/* Testimonial 5 */}
          <div className="px-4">
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
          </div>

          {/* Testimonial 6 */}
          <div className="px-4">
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
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
