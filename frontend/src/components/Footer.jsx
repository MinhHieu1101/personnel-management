import React from "react";
import { FiFacebook, FiGithub, FiInstagram, FiTwitter } from "react-icons/fi";
import logo from "/teams.svg";

const Footer = () => {
  return (
    <footer className="z-20 bg-gray-50 dark:bg-black border-gray-200 shadow mx-auto w-full max-w-container fixed inset-x-0 bottom-0 px-10 sm:px-6 py-2 md:py-0 lg:py-2.5">
      <div className="pt-0 pb-2">
        <div className="flex flex-row mx-0 justify-between items-center lg:mx-40">
          <div className="text-center lg:text-left mt-2 xl:mt-1">
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt="Personnel"
                className="mx-auto lg:mx-0 h-5 w-5 xl:h-8 xl:w-8 motion-safe:animate-spin"
              />
            </div>
            <p className="mt-1 lg:mt-2 text-[0.5rem] xl:text-sm leading-6 text-gray-700 dark:text-white">
              © 2025 TeamEngine Inc. All rights reserved.
            </p>
          </div>
          <div className="mt-2 xl:mt-1 flex flex-col items-center lg:items-end">
            <div className="flex items-center space-x-4 text-[0.5rem] xl:text-sm font-semibold leading-6 text-gray-700 dark:text-white">
              <a href="#">Privacy Policy</a>
              <div className="h-4 w-px bg-gray-700 dark:bg-white" />
              <a href="#">Changelog</a>
            </div>
            <div className="mt-2 lg:mt-1 xl:mt-4 flex justify-center lg:justify-end space-x-6">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-700 hover:text-lime-500 dark:text-white dark:hover:text-gray-700"
              >
                <FiFacebook className="w-4 h-4 xl:w-6 xl:h-6" />
              </a>
              <a
                href="#"
                aria-label="Github"
                className="text-gray-700 hover:text-lime-500 dark:text-white dark:hover:text-gray-700"
              >
                <FiGithub className="w-4 h-4 xl:w-6 xl:h-6" />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-700 hover:text-lime-500 dark:text-white dark:hover:text-gray-700"
              >
                <FiInstagram className="w-4 h-4 xl:w-6 xl:h-6" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-700 hover:text-lime-500 dark:text-white dark:hover:text-gray-700"
              >
                <FiTwitter className="w-4 h-4 xl:w-6 xl:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
