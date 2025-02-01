import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();
  return (
    <header
      className="border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80
    "
    >
      <div className="container mx-auto px-4 h-16">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">daisyUI</a>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={"/settings"}
              className={`btn btn-sm gap-3 transition-colors`}
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">settings</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to={"/profile"}
                  className={`btn btn-sm gap-3 transition-colors`}
                >
                  <User className="size-5" />
                  <span className="hidden sm:inline">User</span>
                </Link>

                <button className="flex gap-3 items-center" onClick={logout}>
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
