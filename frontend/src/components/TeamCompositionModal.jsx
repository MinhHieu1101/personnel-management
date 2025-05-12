import React, { useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { TbUsersGroup } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamsRequest } from "../redux/actions/userActions";
import { toast } from "react-toastify";

export const TeamCompositionModal = ({ isOpen, setIsOpen, userId }) => {
  const dispatch = useDispatch();
  const { teamsLoading, message, teams } = useSelector((state) => state.user);

  useEffect(() => {
    if (!isOpen || !userId) return;
    dispatch(fetchTeamsRequest(userId));
  }, [dispatch, isOpen, userId]);

  useEffect(() => {
    if (message && !loading) {
      toast.error(message);
    }
  }, [message, teamsLoading]);
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black opacity-60" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-8/12 min-h-5/12 max-h-11/12 space-y-4 border bg-white p-12">
            <div className="bg-gray-100 min-h-lg">
              <div className="container mx-auto p-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-8/12 h-10/12">
                    <h2 className="text-xl font-bold mb-4">List of Teams</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4 overflow-auto max-h-96">
                        {teams && teams.length > 0 ? (
                          teams.map((team) => (
                            <div
                              key={team.teamId}
                              className="flex items-center space-x-2"
                            >
                              <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                                <TbUsersGroup className="w-8 h-8" />
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold">
                                  {team.teamName}
                                </h3>
                                <p className="text-gray-600">
                                  `ID: {team.teamId}`
                                </p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p>This user has not joined any team yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
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
