import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import AnimatedButton from "./AnimatedButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsRequest } from "../redux/actions/userActions";
import { toast } from "react-toastify";

export const UserCompositionModal = ({
  id,
  type,
  title,
  buttonIcon,
  icon,
  heading1,
  node,
  subnode,
  icon2,
  heading2,
  node2,
  subnode2,
  extra = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { loading, message, teams } = useSelector((state) => state.user);

  useEffect(() => {
    if (type === "fetch_teams") {
      dispatch(fetchTeamsRequest(id));
    } else if (type === "fetch_users") {
      // implement later
    }
  }, [dispatch]);

  useEffect(() => {
    if (message && !loading) {
      toast.error(message);
    }
  }, [message, loading]);

  return (
    <>
      <AnimatedButton
        onClick={() => setIsOpen(true)}
        text="View"
        icon={buttonIcon}
        borderColor="border-emerald-600"
        bgColor="bg-emerald-600"
        textColor="text-emerald-600"
        extra="w-22 h-10"
      />
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-6/12 h-5/12 space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold text-lg mb-1">
              {title}
            </DialogTitle>
            <div className="bg-gray-100 min-h-lg">
              <div className="container mx-auto p-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  {teams.map((team) => console.log("something"))}
                  {/* column 1 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg w-5/12">
                    <h2 className="text-xl font-bold mb-4">{heading1}</h2>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{node}</h3>
                          <p className="text-gray-600">{subnode}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* column 2 */}
                  {extra && (
                    <div className="bg-white p-6 rounded-lg shadow-lg w-5/12">
                      <h2 className="text-xl font-bold mb-4">{heading2}</h2>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-2">
                          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {icon2}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{node2}</h3>
                            <p className="text-gray-600">{subnode2}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
