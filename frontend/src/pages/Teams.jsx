import React from "react";
import { CustomCard } from "../components/Card";

const TeamList = () => {
  return (
    <section className="my-8 sm:my-10 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 p-6">
      <CustomCard
        id = "234325423"
        name = "Hello"
        number = "100"
      />

      <CustomCard />
    </section>
  );
};

export default TeamList;
