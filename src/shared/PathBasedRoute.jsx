import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";

function PathBasedRoute({ setTitle }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      setTitle("Book Club");
    } else if (location.pathname === "/mybooks") {
      setTitle("My Books");
    }
  }, []);
  return <Outlet />;
}

export default PathBasedRoute;
