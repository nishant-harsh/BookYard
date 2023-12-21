import { useEffect, useState } from "react";
import { EditBookModal } from "../modals/update-book-modal";
import { CreateBookModal } from "../modals/create-book-modal";
import { UserProfileModal } from "../modals/user-profile-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <EditBookModal />
      <CreateBookModal />
      <UserProfileModal />
    </>
  );
};
