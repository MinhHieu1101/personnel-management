import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MemberList from "./pages/Members";
import TeamList from "./pages/Teams";
import UserAuthentication from "./pages/UserAuthentication";

function App() {
  return (
    <>
      <Header />
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <div className="absolute inset-0 -z-10 h-full w-full dark:bg-black bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] [background-size:16px_16px]"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-normal px-4">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<UserAuthentication />} />
              <Route path="/members" element={<MemberList />} />
              <Route path="/teams" element={<TeamList />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
