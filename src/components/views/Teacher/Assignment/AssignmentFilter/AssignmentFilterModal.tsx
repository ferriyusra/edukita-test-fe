import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Button,
  Spinner,
} from "@heroui/react";
import { Controller } from "react-hook-form";
import useAssignmentFilter from "./useAssignmentFilter";
import useChangeUrl from "@/hooks/useChangeUrl";
import { useRouter } from "next/router";
import { PAGE_DEFAULT, PER_PAGE_DEFAULT } from "@/constants/list.constants";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refetchAssignments: () => void;
}

const AssignmentFilterModal = (props: PropTypes) => {

  const router = useRouter();
  const { isOpen, onClose, onOpenChange } = props;

  const { control, setValue } = useAssignmentFilter();
  const { currentSubject, handleChangeSubject } = useChangeUrl();

  setValue("subject", `${currentSubject}`);

  const handleResetFilter = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        page: PAGE_DEFAULT,
        perPage: PER_PAGE_DEFAULT,
        search: "",
      },
    }, undefined, { shallow: true });

    setValue("subject", "");

    onClose();
  };


  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} placement="center" scrollBehavior="inside">
      <ModalContent className="m-4">
        <ModalHeader>Filter Assignment</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Subject"
                  labelPlacement="outside"
                  placeholder="Select Subject"
                  variant="bordered"
                  onChange={(e) => {
                    handleChangeSubject(e.target.value);
                    onClose();
                  }}
                >
                  <SelectItem key="MATH">Math</SelectItem>
                  <SelectItem key="ENGLISH">English</SelectItem>
                </Select>
              )}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            className="text-teal-600 bg-white rounded-full border border-teal-600 hover:bg-teal-50"
            onPress={onClose}
          >
            Cancel
          </Button>
          <Button
            className="text-white bg-teal-600 rounded-full border border-white hover:bg-teal-600"
            onPress={() => {
              handleResetFilter();
            }}
          >
            Reset Filter
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignmentFilterModal;
