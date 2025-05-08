import React, { useEffect, useState } from "react";
import { TableHead } from "../components/TableHead";
import { TableRow } from "../components/TableRow";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../redux/actions/userActions";
import { TeamCompositionModal } from "../components/TeamCompositionModal";

const MemberList = () => {
  const dispatch = useDispatch();
  const { loading, message, users } = useSelector((state) => state.user);

  // lift modal state here to prevent re-renders
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalUserId, setModalUserId] = useState(null);

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
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <TableRow
              key={user.userId}
              id={user.userId}
              name={user.username}
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
