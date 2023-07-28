"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiFillSetting } from "react-icons/ai";
import { BiCalendar } from "react-icons/bi";
import { toggleSubmenu } from "@/features/functions/functionSlice";
import { toggleSideBar } from "@/features/functions/functionSlice";
import { SidebarEl } from "../../data/elements";
import Dennis from "../../asset/dennis.jpg";
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const { isSubmenuOpen, isSideBarOpen } = useSelector(
    (state) => state.functions
  );
  const { user } = useSelector((strore) => strore.user);

  const admin = user.data.user;
  const adminParams = admin.id;

  const dispatch = useDispatch();

  const linkContainerRef = useRef(null);
  const linksRef = useRef(null);
  const openSubmenu = (id) => {
    if (isSubmenuOpen === id) {
      dispatch(toggleSubmenu(null));
      // console.log(isSubmenuOpen);
      // console.log("i was clicked before, so i am closing");
    } else {
      dispatch(toggleSubmenu(id));
      // console.log("you clibked me");
    }
  };
  const openMenu = (id) => {
    if (isSubmenuOpen === id) {
      dispatch(toggleSideBar(null));
    } else {
      dispatch(toggleSideBar(true));
    }
  };

  useEffect(() => {
    const linkHeight = linksRef.current.getBoundingClientRect().height;
    linkContainerRef.current.style.height = `${linkHeight}`;
  }, [isSubmenuOpen]);

  // const [isSubmenuOpen, setisSubMenuOpen] = useState(0);

  // const toggleSubmenu = (id) => {
  //   if (isSubmenuOpen === id) {
  //     setisSubMenuOpen(null);
  //     console.log(isSubmenuOpen);
  //   } else {
  //     setisSubMenuOpen(id);
  //     console.log(isSubmenuOpen);
  //     console.log("i was clibked");
  //   }
  // };

  return (
    <main
      className={
        "sidebar  relative bg-dark    h-screen flex justify-center items-center flex-col"
      }
    >
      <section
        className={
          isSideBarOpen
            ? " bg-midnight z-10  flex justify-center relative items-center flex-row  top-12 min-w-sidebarImg "
            : " bg-midnight z-10 flex justify-center relative items-center flex-row  top-10  w-96 "
        }
      >
        <div className="imgCont inline-block items-stretch m-3 overflow-hidden max-w-md h-any rounded-full">
          <Image src={Dennis} alt="image 2" className="  h-32 w-52 " />
        </div>
      </section>
      <section className="  bg-metal top-12 cursor-pointer overflow-scroll relative flex justify-center p-responsive items-center flex-col h-5/6 min-w-sidebarImg ">
        {SidebarEl.map((item, id) => {
          const { title, icon, pages, urls } = item;
          let param = "";
          let role = null;
          if (id === 2) {
            param = `/${adminParams}`;
          }
          if (id === 8) {
            role = `/${urls}`;
          }
          const titled = title === "Role Types";

          return (
            <section
              key={id}
              className={
                isSideBarOpen
                  ? "sec relative -top-14 "
                  : "sec relative -top-16 left-28 "
              }
            >
              <div
                key={id}
                className={
                  isSideBarOpen
                    ? "elements m-4 flex flex-row items-center"
                    : "elements m-4 relative flex flex-row items-center"
                }
                onClick={() => openSubmenu(id)}
              >
                <div className=" mr-6" onClick={() => openMenu()}>
                  {icon}
                </div>
                {titled ? (
                  <Link key={id} href={`${urls}`}>
                    <h3
                      className={
                        isSideBarOpen
                          ? " text-white text-17 tracking-wider font-medium "
                          : " text-white text-17 opacity-0 tracking-wider font-medium "
                      }
                    >
                      {title}
                    </h3>
                  </Link>
                ) : (
                  <h3
                    className={
                      isSideBarOpen
                        ? " text-white text-17 tracking-wider font-medium "
                        : " text-white text-17 opacity-0 tracking-wider font-medium "
                    }
                  >
                    {title}
                  </h3>
                )}
              </div>
              <div
                ref={linkContainerRef}
                className={
                  isSubmenuOpen === id
                    ? "sub left-5 overflow-hidden top-0 relative flex  h-unimport justify-start  duration-700  w-64"
                    : "sub bg-midnight left-5 overflow-hidden top-0  relative flex justify-start transition-500 duration-700  flex-col  h-0 w-64"
                }
              >
                <ul
                  ref={linksRef}
                  className={
                    isSubmenuOpen === id && isSideBarOpen
                      ? "sub bg-tahiti overflow-hidden top-0 relative  inline-block  flex-col  transition-800 ease-linear duration-500 w-64"
                      : "sub overflow-hidden  -top-28 transition-500 duration-700 inline-block  flex-col h-0 w-64"
                  }
                >
                  {pages?.map((item, idx) => {
                    const { title, id, urls } = item;
                    // let url = "";
                    // if (id === 0) {
                    //   url = "/thety";
                    // }
                    return (
                      <Link key={idx} href={`${urls}${param}`}>
                        <li className="subcont  m-5 ">
                          <h3 className=" text-white text-17 ">{title}</h3>
                        </li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
            </section>
          );
        })}
        <div
          className={
            isSideBarOpen
              ? "elements -left-14  relative  top-8 flex flex-row items-center"
              : "elements left-14  relative top-8 flex flex-row items-center"
          }
        >
          <div className="mr-6" onClick={() => openMenu()}>
            <BiCalendar />
          </div>
          <h3
            className={
              isSideBarOpen
                ? " text-white text-17 tracking-wider font-medium"
                : " text-white text-17 opacity-0 tracking-wider font-medium"
            }
          >
            Calender
          </h3>
        </div>

        <div
          className={
            isSideBarOpen
              ? "elements my-1 -left-14  relative  top-14 flex flex-row items-center"
              : "elements my-1 left-14  relative  top-14 flex flex-row items-center"
          }
        >
          <div className="mr-6">
            <AiFillSetting onClick={() => openMenu()} />
          </div>
          <h3
            className={
              isSideBarOpen
                ? " text-white text-17 tracking-wider font-medium"
                : " text-white opacity-0 text-17 tracking-wider font-medium"
            }
          >
            Settings
          </h3>
        </div>
      </section>
    </main>
  );
};

export default Sidebar;

//  isSubmenuOpen === id
//    ? "sub bg-midnight left-3  -top-2  inline-block  justify-start transition-800 ease-linear duration-300 p-responsive  flex-col  h-64 w-64"
//    : "sub bg-midnight left-3 overflow-hidden -top-2  relative flex justify-start transition-500   flex-col  h-0 w-64";
