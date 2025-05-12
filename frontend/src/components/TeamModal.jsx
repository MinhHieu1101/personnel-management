import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import AnimatedButton from "./AnimatedButton";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../redux/actions/userActions";
import axiosInstance from "../api/axiosInstance";
import { toast } from "react-toastify";

export const TeamModal = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [teamName, setTeamName] = useState("");
  //const [selectedUsers, setSelectedUsers] = useState({});
  const [selectedMemberIds, setSelectedMemberIds] = useState([]);
  const [selectedManagerIds, setSelectedManagerIds] = useState([]);

  const { loading, message, members, managers } = useSelector(
    (state) => state.user
  );
  const { user: currentUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isOpen) return;

    if (selectedTabIndex === 0) {
      dispatch(fetchUsersRequest("MEMBER"));
    } else {
      dispatch(fetchUsersRequest("MANAGER"));
    }
  }, [isOpen, selectedTabIndex, dispatch]);

  const toggleMember = (id) => {
    setSelectedMemberIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleManager = (id) => {
    setSelectedManagerIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleCreate = async () => {
    if (!teamName.trim()) {
      return toast.error("Team name is required");
    }

    const membersPayload = selectedMemberIds
      .map((userId) => {
        const user = members.find((u) => u.userId === userId);
        if (!user) return null;
        return { memberId: userId, memberName: user.username };
      })
      .filter(Boolean);

    const managersPayload = selectedManagerIds
      .filter((id) => id !== currentUser.userId)
      .map((userId) => {
        const user = managers.find((u) => u.userId === userId);
        if (!user) return null;
        return { managerId: userId, managerName: user.username };
      })
      .filter(Boolean);

    const requestBody = {
      teamName,
      members: membersPayload,
      managers: managersPayload,
    };

    console.log("CREATE_TEAM_REQUEST_BODY:", requestBody);

    try {
      await axiosInstance.post("/", requestBody);
      toast.success(`Team "${teamName}" created!`, { autoClose: 3000 });
      setIsOpen(false);
      setTeamName("");
      setSelectedMemberIds([]);
      setSelectedManagerIds([]);
    } catch (err) {
      console.error("CREATE_TEAM_ERROR", err);
      toast.error(err.response?.data?.message || "Failed to create team");
    }
  };

  return (
    <>
      <AnimatedButton
        onClick={() => setIsOpen(true)}
        text="Add New Team"
        icon={AiOutlineUsergroupAdd}
        borderColor="border-emerald-600"
        bgColor="bg-emerald-600"
        textColor="text-emerald-600"
        extra="w-40 h-12"
      />
      {/* disable dialog closing when click outside of dialog */}
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(true)}
        transition
        className="z-30 fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
      >
        <DialogPanel className="max-w-2xl space-y-4 bg-white p-12">
          <DialogTitle className="font-bold text-2xl">New Team</DialogTitle>
          <div className="bg-white py-2 rounded-lg">
            <div className="relative bg-inherit">
              <input
                type="text"
                id="teamName"
                name="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="peer bg-transparent h-10 w-full rounded-full text-slate-950 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-emerald-600 focus:outline-none"
                placeholder="Team Name"
              />
              <label
                htmlFor="teamName"
                className="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-emerald-600 peer-focus:text-sm transition-all"
              >
                Team Name
              </label>
            </div>
          </div>
          <TabGroup
            selectedIndex={selectedTabIndex}
            onChange={setSelectedTabIndex}
          >
            <TabList className="flex space-x-2 bg-emerald-200 p-1 rounded-full mt-4 w-auto">
              <Tab className="w-60 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-900 hover:bg-white/10 data-selected:bg-white data-selected:text-emerald-700 data-selected:shadow">
                Members
              </Tab>
              <Tab className="w-60 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-900 hover:bg-white/10 data-selected:bg-white data-selected:text-emerald-700 data-selected:shadow">
                Managers
              </Tab>
            </TabList>

            <TabPanels className="mt-4">
              <TabPanel className="p-3 rounded-xl bg-gray-50 overflow-auto max-h-[400px]">
                {members.map((user) => (
                  <div
                    key={user.userId}
                    className="flex items-center justify-between border-b py-4 px-6 last:border-b-0"
                  >
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        {user.username}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        checked={selectedMemberIds.includes(user.userId)}
                        onChange={() => toggleMember(user.userId)}
                        className="h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </TabPanel>
              <TabPanel className="p-3 rounded-xl bg-gray-50 overflow-auto max-h-[400px]">
                {managers.map((user) => (
                  <div
                    key={user.userId}
                    className="flex items-center justify-between border-b py-4 px-6 last:border-b-0"
                  >
                    <div>
                      <div className="text-lg font-semibold text-gray-800">
                        {user.username}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>

                    <div>
                      <input
                        type="checkbox"
                        checked={selectedManagerIds.includes(user.userId)}
                        onChange={() => toggleManager(user.userId)}
                        className="h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </TabPanel>
            </TabPanels>
          </TabGroup>
          <div className="flex gap-4">
            <button
              className="hover:fill-emerald-700 hover:drop-shadow-lg hover:drop-shadow-emerald-500/50"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              className="hover:fill-emerald-700 hover:drop-shadow-lg hover:drop-shadow-emerald-500/50"
              onClick={handleCreate}
            >
              Create
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};
