import React, { useEffect, useState } from "react";
import { CustomCard } from "../components/CustomCard";
import { TeamModal } from "../components/TeamModal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTeamsRequest } from "../redux/actions/userActions";
import { RosterCompositionModal } from "../components/RosterCompositionModal";

const TeamList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = "MANAGER";
  const { user: currentUser } = useSelector((state) => state.auth);

  const { teamsLoading, message, teams } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTeamId, setModalTeamId] = useState(null);

  useEffect(() => {
    dispatch(fetchTeamsRequest(currentUser.userId));
  }, [dispatch]);

  /* useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]); */

  return (
    <>
      {/* {currentUser.role === "MANAGER" && ( */}
      {role === "MANAGER" && (
        <section className="mt-10">
          <TeamModal />
        </section>
      )}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 p-6 pb-44">
        {teams.map((team) => (
          <CustomCard
            key={team.teamId}
            id={team.teamId}
            name={team.teamName}
            number={team.rosterCount}
            onView={() => {
              setModalTeamId(team.teamId);
              setIsModalOpen(true);
            }}
          />
        ))}
      </section>
      <RosterCompositionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        teamId={modalTeamId}
      />
    </>
  );
};

export default TeamList;
