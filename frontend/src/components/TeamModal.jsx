import React, { useState } from "react";
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

export const TeamModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const users = [
    { id: 1, username: "John Doe", email: "john@example.com" },
    { id: 2, username: "Jane Smith", email: "jane@example.com" },
    { id: 3, username: "Alice Johnson", email: "alice@example.com" },
  ];

  const users2 = [
    { id: 3, username: "Batman", email: "john@example.com" },
    { id: 4, username: "Superman", email: "jane@example.com" },
    { id: 5, username: "Flash", email: "alice@example.com" },
  ];

  const [selectedUsers, setSelectedUsers] = useState({});

  const handleCheckboxChange = (id) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
          <div class="bg-white py-2 rounded-lg">
            <div class="relative bg-inherit">
              <input
                type="text"
                id="teamName"
                name="teamName"
                class="peer bg-transparent h-10 w-full rounded-full text-gray-200 placeholder-transparent ring-2 px-2 ring-gray-500 focus:ring-emerald-600 focus:outline-none"
                placeholder="Team Name"
              />
              <label
                for="teamName"
                class="absolute cursor-text left-0 -top-3 text-sm text-gray-500 bg-inherit mx-1 px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2 peer-focus:-top-3 peer-focus:text-emerald-600 peer-focus:text-sm transition-all"
              >
                Team Name
              </label>
            </div>
          </div>
          <TabGroup>
            <TabList className="flex space-x-2 bg-emerald-200 p-1 rounded-full mt-4 w-auto">
              <Tab className="w-60 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-900 hover:bg-white/10 data-selected:bg-white data-selected:text-emerald-700 data-selected:shadow">
                Members
              </Tab>
              <Tab className="w-60 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-900 hover:bg-white/10 data-selected:bg-white data-selected:text-emerald-700 data-selected:shadow">
                Managers
              </Tab>
            </TabList>

            <TabPanels className="mt-4">
              <TabPanel className="p-3 rounded-xl bg-gray-50">
                {users.map((user) => (
                  <div
                    key={user.id}
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
                        checked={!!selectedUsers[user.id]}
                        onChange={() => handleCheckboxChange(user.id)}
                        className="h-5 w-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                ))}
              </TabPanel>
              <TabPanel className="p-3 rounded-xl bg-gray-50">
                {users2.map((user) => (
                  <div
                    key={user.id}
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
                        checked={!!selectedUsers[user.id]}
                        onChange={() => handleCheckboxChange(user.id)}
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
              onClick={() => setIsOpen(false)}
            >
              Create
            </button>
          </div>
        </DialogPanel>
      </Dialog>
    </>
  );
};
