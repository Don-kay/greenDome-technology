"use client";
import Sidebar from "@/components/Csr-components/layout_constructs/sidebar";
import { toggleSideBar } from "@/features/functions/functionSlice";
import { useSelector, useDispatch } from "react-redux";
import { RxHamburgerMenu } from "react-icons/rx";
import Link from "next/link";
import { useEffect } from "react";

const StudentLayout = ({ children }) => {
  const { isSideBarOpen, isSubmenuOpen } = useSelector(
    (state) => state.functions
  );
  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.profiles);

  const loggedInUserId = user.data.user.id;

  const loggedInUser = users.filter((i) => i.id === loggedInUserId);

  const IsStudent = loggedInUser.map((i) => {
    return i.roles.includes("student");
  });
  const IsAdmin = loggedInUser.map((i) => {
    return i.roles.includes("Admin");
  });

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
        <Sidebar isAdmin={IsAdmin} IsStudent={IsStudent} />
      </section>
      <section
        className={
          isSideBarOpen
            ? "h-screen z-0 overflow-y-scroll transition-800 duration-700 min-w-maxo"
            : "h-screen z-0 overflow-y-scroll transition-800 duration-700 min-w-maxc"
        }
      >
        {IsAdmin && (
          <Link href={"/panel/admin_dashboard"}>
            <button>Admin Dashboard</button>
          </Link>
        )}
        <RxHamburgerMenu
          className="text-15 top-10 relative left-28 "
          onClick={OpensideBar}
        />
        <div className=" p-responsive3 ">{children}</div>
      </section>
    </main>
  );
};

export default StudentLayout;
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
