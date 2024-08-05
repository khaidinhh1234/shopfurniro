import React from "react";
import { Link } from "react-router-dom";

const ThankyouPage = () => {
  return (
    <div className="flex justify-center my-40">
      <div className="text-center w-[50%] bg-white p-12 rounded-xl shadow-2xl transform transition-transform hover:scale-105 duration-300 ">
        <h1 className="text-4xl font-extrabold text-green-600 mb-6">
          Thank You!
        </h1>
        <p className="text-xl mb-6 text-gray-700">
          Your payment has been successfully processed.
        </p>
        <p className="text-lg mb-8 text-gray-600">
          If you have any questions, feel free to{"{"}" "{"}"}
          <a
            href="contact.html"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            contact us
          </a>
          .
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankyouPage;
