import { NextResponse, NextRequest } from "next/server";
import jwtDecode from "jwt-decode";
// import { jwtVerify } from "jose";

const isProfileRoute = (pathname) => {
  return pathname.includes("/view_profile");
};

const isUserRoute = (pathname) => {
  return pathname.startsWith("/panel");
};
const PanelRoute = (pathname) => {
  return pathname.startsWith("/panel/admin_dashboard");
};
const arrayLoop = ["company", "Admin", "tutor", "student"];
const adminnArray = ["company", "Admin", "tutor"];

export default function middleware(req, res) {
  const { cookies } = req;
  const jwt = cookies.get("myToken")?.value;
  // const url = req.url;
  const { pathname } = req.nextUrl;
  // console.log(pathname);
  // console.log(cookies);
  if (!jwt) {
    return NextResponse.redirect("http://localhost:3000/login");
  }
  const role = jwtDecode(jwt);
  const user = role.roles;
  const isAuthentic = user.some((ai) => arrayLoop.includes(ai));
  const isPanel = user.some((ai) => adminnArray.includes(ai));
  // console.log(isPanel);

  if (isUserRoute(pathname) && !isAuthentic) {
    return NextResponse.redirect("http://localhost:3000/login", req.url);
  }
  if (PanelRoute(pathname) && !isPanel) {
    return NextResponse.redirect("http://localhost:3000/student_dashboard");
  }
  // if (isProfileRoute(pathname) && isPanel) {
  //   return console.log(jwt)
  // }
  return NextResponse.next();
  // console.log(jwt);
  // if (url.includes("/greendometech")) {
  //   if (!jwt) {
  //     return NextResponse.redirect("http://localhost:3000/userauth/login");
  //   }
  // }

  // // throw new Error(error);

  // // const { origin } = req.nexturl;
  // return NextResponse.next();
}

export const config = {
  matcher: ["/panel/:path*", "/panel/admin_dashboard/:path*"],
};
