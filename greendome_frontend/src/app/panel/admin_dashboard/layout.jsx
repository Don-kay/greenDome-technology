"use client";
import Sidebar from "@/components/Csr-components/layout_constructs/sidebar";
import { toggleSideBar } from "@/features/functions/functionSlice";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import { useEffect } from "react";

const AdminLayout = ({ children }) => {
  const { isSideBarOpen, isSubmenuOpen } = useSelector(
    (state) => state.functions
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.reload && isSideBarOpen !== false) {
      dispatch(toggleSideBar());
    }
  }, []);

  const OpensideBar = () => {
    if (isSideBarOpen === false) {
      dispatch(toggleSideBar());
    } else if (isSideBarOpen !== false) {
      dispatch(toggleSideBar());
    }
  };

  return (
    <main className="flex justify-center item-center ">
      <section
        className={
          isSideBarOpen
            ? " overflow-hidden inline-block items-stretch  transition-800 duration-700 min-w-mino bg-metal relative h-screen"
            : " overflow-hidden inline-block items-stretch  transition-800 duration-500 min-w-minc bg-metal relative h-screen "
        }
        id=""
      >
        <Sidebar />
      </section>
      <section
        className={
          isSideBarOpen
            ? "h-screen z-0 overflow-y-scroll transition-800 duration-700 min-w-maxo"
            : "h-screen z-0 overflow-y-scroll transition-800 duration-700 min-w-maxc"
        }
      >
        <RxHamburgerMenu
          className="text-15 top-10 relative left-28 "
          onClick={OpensideBar}
        />
        <div className=" p-responsive3 ">{children}</div>
      </section>
    </main>
  );
};

export default AdminLayout;
// export async function getServerSideProps(context) {
//   const session = await getSession(context);
//   if (!session) {
//     return {
//       redirect: {
//         destination: "/",
//         permanentt: false,
//       },
//     };
//   }
//   return {
//     props: { session },
//   };
// }
