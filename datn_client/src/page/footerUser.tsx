import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter, BsHouseDoor, BsPhone, BsEnvelope } from "react-icons/bs";

const FooterUser = () => {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="https://flowbite.com"
              src="../public/logo.svg"
              alt="Flowbite Logo"
              className="font-bold"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
          
            <div>
              <Footer.Title title={<><BsHouseDoor className="inline mr-2" /> <span className="font-bold">Địa chỉ</span></>} /> 
              <Footer.LinkGroup col>
                <Footer.Link href="#">18 Phạm Văn Đồng, TT. Ái Nghĩa,</Footer.Link>
                <Footer.Link href="#">Đại Lộc, Quảng Nam</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title={<><BsPhone className="inline mr-2" /> <span className="font-bold">Liên hệ với chúng tôi</span></>} />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Hotline: 0918341155 - (024) 3 2444 086</Footer.Link>
                <Footer.Link href="#">
                  Mở cửa 7:30 – 17:00 xuyên trưa* <br />
                  (*) Một số Trung tâm có giờ hoạt động riêng
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title={<><BsEnvelope className="inline mr-2" /> <span className="font-bold">Email</span></>} />
              <Footer.LinkGroup col>
                <Footer.Link href="#">tcvxdl@gmail.com</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="HuynhThiHaiHau_QLTVX™" />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterUser;