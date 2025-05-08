import React from "react";
import { CustomCard } from "../components/CustomCard";
import { TeamModal } from "../components/TeamModal";

const TeamList = () => {
  return (
    <>
      <section className="mt-10">
        <TeamModal />
      </section>
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 p-6">
        <CustomCard id="234325423" name="Hello" number="100" />

        <CustomCard />

        <CustomCard />

        <CustomCard />
      </section>
    </>
  );
};

export default TeamList;
