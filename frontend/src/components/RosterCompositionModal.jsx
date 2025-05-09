import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTeamRequest } from "../redux/actions/teamActions";
import { toast } from "react-toastify";

export const RosterCompositionModal = ({ isOpen, setIsOpen, teamId }) => {
  const dispatch = useDispatch();
  const { loading, message, people } = useSelector((state) => state.team);

  useEffect(() => {
    if (!isOpen || !teamId) return;
    dispatch(fetchTeamRequest(teamId));
  }, [dispatch, isOpen, teamId]);

  useEffect(() => {
    if (message && !loading) {
      toast.error(message);
    }
  }, [message, loading]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="w-6/12 h-5/12 space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold text-lg mb-1">
              Team Composition
            </DialogTitle>
            <div className="bg-gray-100 min-h-lg">
              <div className="container mx-auto p-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  {/* column 1 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg w-5/12">
                    <h2 className="text-xl font-bold mb-4">Managers</h2>
                    <div className="space-y-6">
                      {people.map((person) => (
                        <div
                        // id here
                          key={person}
                          className="flex items-center space-x-2"
                        >
                          <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                            Mngr.
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">person</h3>
                            <p className="text-gray-600">SubPerson</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* column 2 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg w-5/12">
                    <h2 className="text-xl font-bold mb-4">Members</h2>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                          Mbr.
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">Person</h3>
                          <p className="text-gray-600">SubPerson</p>
                        </div>
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
