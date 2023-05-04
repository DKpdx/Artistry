import React from "react";
import { NavLink } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 text-white py-32 px-8">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to Fine Whatevers... or whatever
          </h1>
          <p className="text-xl mb-8">
            We made a social media platform dedicated to showcasing and sharing
            your artistic creations.
          </p>
          <NavLink
            to="/signup"
            className="bg-white text-orange-500 font-semibold px-6 py-2 rounded-full hover:bg-orange-600 hover:text-white"
          >
            Get Started
          </NavLink>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-20 px-8">
        <div className="container mx-auto">
          <h2 className="text-4xl font-semibold mb-6">About Us</h2>
          <p className="text-lg mb-6">
            We are a team of developers passionate about art and creativity. Our
            mission is to provide a platform where artists can share their work,
            connect with others, and gain inspiration from others with similar
            interests.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 px-8 mt-auto">
        <div className="container mx-auto">
          <div className="flex justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-4">Fine Whatevers</h3>
              <p>
                © {new Date().getFullYear()} Fine Whatevers. All rights
                reserved.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p>Email: support@finewhatevers.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
