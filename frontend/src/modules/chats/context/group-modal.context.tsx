import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

import { AddParticipantModal } from "@modules/chats/ui/GroupModals/AddParticipantModal/AddParticipantModal";
import { EditGroupModal } from "@modules/chats/ui/GroupModals/EditGroupModal/EditGroupModal";
import { NewGroupMembersModal } from "@modules/chats/ui/GroupModals/NewGroupMembersModal/NewGroupMembersModal";
import { NewGroupModal } from "@modules/chats/ui/GroupModals/NewGroupModal/NewGroupModal";
import { useGetFriendsQuery } from "@modules/friends/api/friends.api";
import { useUserContext } from "@modules/auth/context/user.context";
import { friend } from "@modules/friends/types/friends.types";

type GroupModalType =
  | null
  | "new-group-members"
  | "new-group"
  | "edit-group"
  | "add-participant";

interface GroupModalContextValue {
  modalType: GroupModalType;
  openNewGroupMembers: () => void;
  openNewGroup: () => void;
  openEditGroup: () => void;
  openAddParticipant: () => void;
  closeModal: () => void;
  selectedIds: number[];
  setSelectedIds: React.Dispatch<React.SetStateAction<number[]>>;
  PARTICIPANTS: friend[] | undefined;
}

const GroupModalContext = createContext<GroupModalContextValue | null>(null);

export function GroupModalProvider(props: PropsWithChildren) {
  const { children } = props;
  const { token } = useUserContext()
  const [modalType, setModalType] = useState<GroupModalType>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {data: PARTICIPANTS, error, isLoading} = useGetFriendsQuery(token!)

  function openNewGroupMembers() {
    setModalType("new-group-members");
  }

  function openNewGroup() {
    setModalType("new-group");
  }

  function openEditGroup() {
    setModalType("edit-group");
  }

  function openAddParticipant() {
    setModalType("add-participant");
  }

  function closeModal() {
    setModalType(null);
  }

  const value = useMemo<GroupModalContextValue>(
    () => ({
      modalType,
      openNewGroupMembers,
      openNewGroup,
      openEditGroup,
      openAddParticipant,
      closeModal,
      selectedIds,
      setSelectedIds,
      PARTICIPANTS
    }),
    [modalType, selectedIds]
  );

  return (
    <GroupModalContext.Provider value={value}>
      {children}
      <NewGroupMembersModal />
      <NewGroupModal />
      <EditGroupModal />
      <AddParticipantModal />
    </GroupModalContext.Provider>
  );
}

export function useGroupModal() {
  const context = useContext(GroupModalContext);

  if (!context) {
    throw new Error("useGroupModal must be used inside provider");
  }

  return context;
}
