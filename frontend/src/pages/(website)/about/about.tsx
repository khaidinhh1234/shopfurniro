import { abc, abc1 } from "@/assets/img";
import React from "react";

const AboutPage = () => {
  return (
    <div>
      <div>
        <header className="bg-white ">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-4xl font-bold text-center">Giới Thiệu</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {/* Câu Chuyện Của Chúng Tôi */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold mb-4">
              Câu Chuyện Của Chúng Tôi
            </h2>
            <div className="flex flex-col md:flex-row items-center">
              <img
                src="https://mms.img.susercontent.com/vn-11134513-7r98o-lsv6c7w1g2ah5f@resize_ss1242x600!@crop_w1242_h600_cT"
                alt="Câu chuyện của chúng tôi"
                className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
              />
              <p className="text-lg leading-relaxed">
                Thực phẩm là nguồn cung cấp chất dinh dưỡng cho sự phát triển
                của cơ thể, tác động trực tiếp và gây ảnh hưởng lâu dài đến sức
                khỏe. Làm sao để lựa chọn được thực phẩm sạch, vừa an toàn về
                chất lượng, vừa tiết kiệm thời gian để đảm bảo tốt cho sức khỏe
                của gia đình mình? Hiểu được sự trăn trở chung của các chị em
                nội trợ và cũng chính là sự lo lắng của bản thân Organic Mart
                đối với tổ ấm của mình. Chính vì vậy, Organic Mart – chuỗi cửa
                hàng bán lẻ thực phẩm hữu cơ ra đời, để cùng đồng hành, chia sẻ
                với các chị em nội trợ trong việc lựa chọn thực phẩm sạch, nguồn
                gốc rõ ràng để bảo vệ sức khỏe, làm nền tảng cho sự phát triển
                khoẻ mạnh của bạn và gia đình ở thời điểm hiện tại và cả tương
                lai sau này. Bên cạnh việc đồng hành cùng bạn trong bữa cơm gia
              </p>
            </div>
          </section>
          {/* Đội Ngũ Của Chúng Tôi */}
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-3xl font-semibold mb-4">
              Đội Ngũ Của Chúng Tôi
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                <img
                  src="https://assets.weforum.org/author/image/ttFgjNf25ibDpqQeJZBsCZWxcOFUc_fNQsvW_K3RI_E.jpeg"
                  alt="Nguyễn Văn A"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Nguyễn Văn A</h3>
                <p>Giám Đốc Điều Hành</p>
              </div>
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                <img
                  src={abc1}
                  alt="Trần Thị B"
                  className="w-32 h-32 mx-auto rounded-full mb-4 bg-center"
                />
                <h3 className="text-xl font-semibold mb-2">Trần Thị B</h3>
                <p>Giám Đốc Sản Phẩm</p>
              </div>
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg text-center">
                <img
                  src={abc}
                  alt="Lê Văn C"
                  className="w-32 h-32 mx-auto rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Lê Văn C</h3>
                <p>Trưởng Nhóm Phát Triển</p>
              </div>
            </div>
          </section>
          {/* Tầm Nhìn Của Chúng Tôi */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-3xl font-semibold mb-4">
              Tầm Nhìn Của Chúng Tôi
            </h2>
            <div className="flex flex-col md:flex-row items-center">
              <img
                src="https://tdtdecor.vn/wp-content/uploads/2021/06/thiet-ke-cua-hang-rau-sach-18.jpg"
                alt="Tầm nhìn của chúng tôi"
                className="w-full md:w-1/2 rounded-lg shadow-lg mb-4 md:mb-0 md:mr-6"
              />
              <p className="text-lg leading-relaxed">
                Nhìn về phía trước, chúng tôi hướng tới việc [Tầm nhìn của bạn].
                Chúng tôi tin tưởng vào [Niềm tin hoặc Nguyên tắc của bạn], và
                rất mong chờ tiếp tục hành trình của mình với sự hỗ trợ của
                khách hàng và đối tác.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AboutPage;
