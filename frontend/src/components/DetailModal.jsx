import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import AnimatedButton from "./AnimatedButton";
import { BiSolidUserDetail } from "react-icons/bi";

export const DetailModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <AnimatedButton
        onClick={() => setIsOpen(true)}
        text="View"
        icon={BiSolidUserDetail}
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
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-12">
            <DialogTitle className="font-bold">User Details</DialogTitle>
            <p>
              Are you sure you want to deactivate your account? All of your data
              will be permanently removed.
            </p>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};
