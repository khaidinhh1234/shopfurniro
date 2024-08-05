import { useLocalStorage } from "@/common/hook/useStoratge";
import { IconWishlist, Iconcart, Logo } from "@/components/Icons";
import instance from "@/configs/axios";

import { AuthContext, AuthContextType } from "@/contexts/AuthContext";

import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [avatar, setAvatar] = useState<string>("");
  // const [users] = useLocalStorage("user", {});

  const { user, logout } = useContext(AuthContext) as AuthContextType;

  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();
  const [search, setSearch] = useState("");
  const handleKeyDown = (e: any) => {
    if (search) {
      // console.log(search);
      e.preventDefault();
      nav(`/search?rau=${search}`);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  useEffect(() => {
    (async () => {
      if (user?._id) {
        const { data } = await instance.get(`/v1/auth/users/${user?._id}`);
        setAvatar(data.avatar);
      } else {
        const { data } = await instance.get(`/v1/auth/users`);
        setAvatar(data.avatar);
      }
    })();

    const handleClickOutside = (e: any) => {
      if (
        !e.target.closest("#user-menu-button") &&
        !e.target.closest("#dropdown-menu")
      ) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [user?._id]);

  return (
    <>
      {" "}
      <header className="header">
        <div className="container">
          <div className="header-inner">
            <div className="grid grid-cols-3 items-center">
              <Link to="/home" className="header__logo col-span-1">
                <img src={Logo} alt="#" />
              </Link>
              <div className="button-mobile">
                <div className="button-mobile-bar1" />
                <div className="button-mobile-bar2" />
                <div className="button-mobile-bar3" />
              </div>

              <nav className="main-menu col-span-1">
                <ul className="main-menu__list">
                  <li className="main-menu__item ">
                    <NavLink to="/" className="main-menu_link  rounded-lg ">
                      Home
                    </NavLink>
                  </li>
                  <li className="main-menu__item ">
                    <NavLink
                      to="/shop"
                      className="main-menu_link rounded-lg mx-1"
                    >
                      Shop
                    </NavLink>
                  </li>
                  <li className="main-menu__item  ">
                    <NavLink
                      to="/about"
                      className="main-menu_link rounded-lg mx-1"
                    >
                      About
                    </NavLink>
                  </li>
                  <li className="main-menu__item ">
                    <NavLink
                      to="/contact"
                      className="main-menu_link rounded-lg "
                    >
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </nav>
              <div className="header-items col-span-1">
                {/* <div className="header-item-user">
                <span>
                  // <a href=""> */}

                <form className="px-[7px]  py-1 overflow-hidden w-[37px] h-[35px] hover:w-[270px] border border-black bg-slate-500 shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300 text-xs">
                  <div className="flex items-center justify-center fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Isolation_Mode"
                      data-name="Isolation Mode"
                      viewBox="0 0 24 24"
                      width={22}
                      height={22}
                      className=""
                      type="submit"
                    >
                      <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    onKeyDown={handleKeyDown}
                    placeholder="Search"
                    className="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4 "
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </form>

                {/* </a>
                </span>
              </div> */}
                <div className="header-item-user mt-1">
                  <span>
                    <a href="#">
                      <img src={IconWishlist} />
                    </a>
                  </span>
                </div>
                <div className="header-item-user mt-1">
                  <a href="/cart">
                    <img src={Iconcart} />
                  </a>
                </div>
                {user ? (
                  <>
                    {" "}
                    <div className="hidden md:block">
                      <div className=" flex items-center ">
                        <div className="relative ">
                          <button
                            id="user-menu-button"
                            className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none"
                            onClick={toggleDropdown}
                          >
                            <img
                              className="h-8 w-8 rounded-full"
                              src={avatar}
                              alt=""
                            />
                          </button>

                          {isOpen && (
                            <div
                              id="dropdown-menu"
                              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg"
                            >
                              {" "}
                              <p className="block px-4 py-2 font-bold   text-gray-700 no-underline bg-slate-400">
                                {user?.name}
                              </p>
                              <a
                                href={`/users/${user?._id}`}
                                className="block px-4 py-2 text-sm font-medium text-gray-700 no-underline "
                              >
                                Thông tin cá nhân
                              </a>
                              <p
                                className="block px-4 py-2 text-sm font-medium text-gray-700 no-underline cursor-pointer "
                                onClick={logout}
                              >
                                Đăng xuất
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className="header-item-user">
                      <Link to="signup">
                        <img src="../src/assets/images/img1.svg" />
                      </Link>{" "}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
