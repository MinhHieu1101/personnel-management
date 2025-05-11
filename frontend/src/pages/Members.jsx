import React, { useEffect, useState } from "react";
import { TableHead } from "../components/TableHead";
import { TableRow } from "../components/TableRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../redux/actions/userActions";
import { TeamCompositionModal } from "../components/TeamCompositionModal";
import { useNavigate } from "react-router-dom";

const MemberList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, message, members } = useSelector((state) => state.user);
  const { user: currentUser } = useSelector((state) => state.auth);

  // lift modal state here to prevent re-renders
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  useEffect(() => {
    dispatch(fetchUsersRequest("MEMBER"));
  }, [dispatch]);

  useEffect(() => {
    if (message && !loading) {
      toast.error(message);
    }
  }, [message, loading]);

  if (loading) {
    return <div className="p-4">Loading members…</div>;
  }

  return (
    <>
      <table className="mt-4 min-w-7xl divide-y divide-gray-200">
        <TableHead />
        <tbody className="bg-white divide-y divide-gray-200 overflow-auto">
          {members.map((user) => (
            <TableRow
              key={user.userId}
              id={user.userId}
              name={
                user.userId === currentUser.userId
                  ? `${user.username} (You)`
                  : user.username
              }
              email={user.email}
              role={user.role}
              c_date={new Date(user.createdAt).toLocaleString()}
              onView={() => {
                setModalUserId(user.userId);
                setIsModalOpen(true);
              }}
            />
          ))}
        </tbody>
      </table>
      <TeamCompositionModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        userId={modalUserId}
      />
    </>
  );
};

export default MemberList;
