import { Modal } from "@mantine/core";
import React from "react";
type ViewChildrenInModalProps = {
  opened: boolean;
  open: () => void;
  close: () => void;
  refetch: () => void;
  children: React.ReactNode;
  modalColors?: {
    backgroundColor: string;
    borderColor: string;
  };
};
const ViewChildrenInModal: React.FC<ViewChildrenInModalProps> = ({
  opened,
  open,
  close,
  refetch,
  children,
  modalColors,
}) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      size="xl"
      withCloseButton={false}
      styles={{
        header: {
          backgroundColor: modalColors?.backgroundColor,
          borderColor: modalColors?.borderColor,
          borderBottom: "1px solid",
        },

        content: {
          backgroundColor: modalColors?.backgroundColor,
          borderRadius: "1.2rem",
        },
      }}
    >
      {children}
    </Modal>
  );
};

export default ViewChildrenInModal;
