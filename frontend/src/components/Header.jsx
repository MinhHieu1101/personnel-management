import React, { useState, useEffect } from "react";
import logo from "/teams.svg";
import { FiMoon, FiSun, FiX, FiMenu } from "react-icons/fi";

function Header() {
  const [nav, setNav] = useState(false);
  const currentUser = "null";
  /*   const dark = useSelector((state) => state.darkMode.dark);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const darkModeHandler = () => {
    if (dark) {
      dispatch(clearDarkMode());
    } else {
      dispatch(setDarkMode());
    }
  }; */

  const toggleNav = () => {
    setNav(!nav);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    setTimeout(() => {
      const logoutConfirm = window.confirm("Are you sure you want to logout ?");
      if (logoutConfirm) {
        dispatch(logout());
      }
    }, 0);
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <header>
      <nav className="bg-gray-50 dark:bg-black border-gray-200 px-4 lg:px-6 xl:py-2.5 shadow h-[60px] overflow-hidden">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-(--breakpoint-2xl) pt-2 md:pt-3 xl:pt-1">
          <a href="/" className="flex items-center">
            <img src={logo} alt="Personnel" className="h-8 w-8 mr-2" />
          </a>

          <div
            className={`flex-col md:flex md:flex-row items-center w-full md:w-auto md:order-2 transition-all duration-300 ${
              nav
                ? "z-100 absolute top-14 left-0 w-full bg-emerald-50 dark:bg-emerald-700 shadow-md p-4 md:relative md:top-0 md:w-auto md:bg-transparent md:shadow-none"
                : "hidden md:flex gap-6"
            }`}
          >
            {currentUser ? (
              <>
                <ul className="flex flex-col md:flex-row md:gap-8 gap-0">
                  <li>
                    <a
                      href="/members"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:text-emerald-700 hover:font-semibold rounded md:bg-transparent md:text-primary-700 md:p-0 dark:text-white dark:hover:text-stone-900 focus:text-emerald-700 focus:font-semibold dark:focus:text-gray-800 dark:focus:font-semibold focus:tracking-wider"
                      aria-current="page"
                    >
                      Members
                    </a>
                  </li>
                  <li>
                    <a
                      href="/managers"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:text-emerald-700 hover:font-semibold border-b border-gray-700 dark:border-white hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-stone-900 md:dark:hover:bg-transparent focus:text-emerald-700 focus:font-semibold dark:focus:text-gray-800 dark:focus:font-semibold focus:tracking-wider"
                    >
                      Managers
                    </a>
                  </li>
                  <li>
                    <a
                      href="/teams"
                      className="block py-2 pr-4 pl-3 text-gray-700 hover:text-emerald-700 hover:font-semibold border-b border-gray-700 dark:border-white hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-stone-900 md:dark:hover:bg-transparent focus:text-emerald-700 focus:font-semibold dark:focus:text-gray-800 dark:focus:font-semibold focus:tracking-wider"
                    >
                      Teams
                    </a>
                  </li>
                </ul>

                <div className="relative inline-block group">
                  <button
                    className="relative mt-4 md:mt-0 rounded-full bg-gray-50 dark:bg-gray-400 dark:hover:bg-stone-900 hover:bg-gray-300 py-1 px-3 border border-transparent text-center text-sm dark:text-slate-900 dark:hover:text-gray-50 transition-all shadow-md hover:shadow-lg focus:bg-gray-700 focus:shadow-none active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={handleLogout}
                  >
                    <span className="block group-hover:hidden">Log Out</span>
                    <span className="hidden group-hover:block">{`Goodbye, ${currentUser.name}`}</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-stone-900 dark:text-emerald-50">
                {getCurrentDate()}
              </div>
            )}
            {/*             <button
              aria-label="Dark Mode Toggle"
              className="px-2 xl:pl-0"
              onClick={darkModeHandler}
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button> */}
          </div>

          {/* hamburger menu icon */}
          <div className="md:hidden flex items-center lg:order-1">
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={nav}
              onClick={toggleNav}
            >
              <span className="sr-only">Open main menu</span>
              {nav ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
