import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTeamRequest,
  deleteMemberRequest,
  deleteManagerRequest,
} from "../redux/actions/teamActions";
import { toast } from "react-toastify";
import { AiOutlineUserDelete } from "react-icons/ai";
import AnimatedButton from "./AnimatedButton";

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

  const handleDeleteMember = (e, id) => {
    e.preventDefault();
    dispatch(deleteMemberRequest(teamId, id));
  };

  const handleDeleteManager = (e, id) => {
    e.preventDefault();
    dispatch(deleteManagerRequest(teamId, id));
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black opacity-60" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-2">
          <DialogPanel className="w-8/12 min-h-5/12 max-h-11/12 space-y-4 border bg-white p-12">
            {people.managers && (
              <DialogTitle className="font-bold text-lg mb-1">
                {people.teamName}
              </DialogTitle>
            )}

            <div className="bg-gray-100 max-h-10/12 overflow-auto">
              <div className="container mx-auto p-6">
                <div className="flex flex-wrap gap-4 justify-center">
                  {/* column 1 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg w-5/12 max-h-[30rem] overflow-y-auto">
                    {people.managers && (
                      <h2 className="text-xl font-bold mb-4">{`Managers (${
                        people.managers.length + 1
                      })`}</h2>
                    )}
                    <div className="space-y-6 overflow-auto">
                      {people.teamLeader && (
                        <div className="flex items-center space-x-2">
                          <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                            1
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {`${people.teamLeader.username} (Leader)`}
                            </h3>
                            <p className="text-gray-600 text-xs">
                              {people.teamLeader.userId}
                            </p>
                          </div>
                        </div>
                      )}

                      {people.managers &&
                        people.managers.map((person, index) => (
                          <div
                            key={person.managerId}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {index + 2}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {person.managerName}
                              </h3>
                              <p className="text-gray-600 text-xs max-w-52">
                                {person.managerId}
                              </p>
                            </div>
                            <AnimatedButton
                              onClick={(e) =>
                                handleDeleteManager(e, person.managerId)
                              }
                              text="X"
                              icon={AiOutlineUserDelete}
                              borderColor="border-rose-600"
                              bgColor="bg-rose-600"
                              textColor="text-rose-600"
                              extra="w-10 h-8"
                            />
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* column 2 */}
                  <div className="bg-white p-6 rounded-lg shadow-lg w-5/12 max-h-[30rem] overflow-y-auto">
                    {people.members && (
                      <h2 className="text-xl font-bold mb-4">{`Members (${people.members.length})`}</h2>
                    )}
                    <div className="space-y-6">
                      {people.members &&
                        people.members.map((person, index) => (
                          <div
                            key={person.memberId}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="text-lg font-semibold">
                                {person.memberName}
                              </h3>
                              <p className="text-gray-600 text-xs max-w-52">
                                {person.memberId}
                              </p>
                            </div>
                            <AnimatedButton
                              onClick={(e) =>
                                handleDeleteMember(e, person.memberId)
                              }
                              text="X"
                              icon={AiOutlineUserDelete}
                              borderColor="border-rose-600"
                              bgColor="bg-rose-600"
                              textColor="text-rose-600"
                              extra="w-10 h-8"
                            />
                          </div>
                        ))}
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
