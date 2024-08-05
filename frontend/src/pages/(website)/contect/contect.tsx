import React from "react";

const ContectPage = () => {
  return (
    <div>
      <div>
        <header className="bg-white ">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-center">Liên Hệ</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {/* Thông Tin Liên Hệ */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold mb-4">Thông Tin Liên Hệ</h2>
            <div className="flex flex-col md:flex-row md:space-x-6">
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">Địa Chỉ</h3>
                <p className="mb-4">
                  123 Đường XYZ, Phường ABC, Quận 1, Thành phố Hồ Chí Minh, Việt
                  Nam
                </p>
                <h3 className="text-xl font-semibold mb-2">Điện Thoại</h3>
                <p className="mb-4">(+84) 123-456-789</p>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p>contact@company.com</p>
              </div>
              <div className="md:w-1/2">
                <h3 className="text-xl font-semibold mb-2">Giờ Làm Việc</h3>
                <p className="mb-4">
                  Thứ Hai - Thứ Sáu: 08:00 - 17:00 <br />
                  Thứ Bảy: 09:00 - 12:00 <br />
                  Chủ Nhật: Nghỉ
                </p>
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Theo Dõi Chúng Tôi
                  </h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      <i className="fab fa-facebook-f" /> Facebook
                    </a>
                    <a href="#" className="text-blue-400 hover:text-blue-600">
                      <i className="fab fa-twitter" /> Twitter
                    </a>
                    <a href="#" className="text-gray-800 hover:text-gray-600">
                      <i className="fab fa-linkedin-in" /> LinkedIn
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Biểu Mẫu Liên Hệ */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-4">Gửi Tin Nhắn</h2>
            <form action="#" method="post">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium mb-2"
                  >
                    Họ và Tên
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="block text-lg font-medium mb-2"
                >
                  Tin Nhắn
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 p-3"
                  defaultValue={""}
                />
              </div>
              <button
                type="submit"
                className="mt-6 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Gửi Tin Nhắn
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ContectPage;
