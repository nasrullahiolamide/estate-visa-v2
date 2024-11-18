import { Fragment } from "react";
import { MODALS } from "@/packages/libraries";
import { modals } from "@mantine/modals";
import { ConfirmationModal } from "@/components/shared/interface";

interface ConfirmDeleteProps {
  title: string;
  onDelete?: (props?: any) => void;
  isDeleting?: boolean;
}

export function ConfirmDelete({
  title,
  onDelete,
  isDeleting,
}: ConfirmDeleteProps) {
  const handleDelete = () => {
    onDelete && onDelete();
    modals.close(MODALS.CONFIRMATION);
  };

  return (
    <Fragment>
      <ConfirmationModal
        withTwoButtons
        title={`Are you sure you want to delete this ${title.toLowerCase()}?`}
        src='delete'
        primaryBtnText='Yes, delete'
        secondaryBtnText='No'
        primaryBtnProps={{
          color: "red",
          onClick: handleDelete,
          loading: isDeleting,
          disabled: isDeleting,
        }}
      />
    </Fragment>
  );
}
