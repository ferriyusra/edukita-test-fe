import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import { Controller } from "react-hook-form";
import { useEffect } from "react";
import useAddAssignmentModal from "./useAddAssignmentModal";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  refechAssignments: () => void;
}

const AddAssignmentModal = (props: PropTypes) => {

  const { isOpen, onClose, onOpenChange, refechAssignments } = props;

  const {
    control,
    errors,
    handleSubmitForm,
    handleAddAssignment,
    isPendingMutateAddAssignment,
    isSuccessMutateAddAssignment,
    handleOnClose,
  } = useAddAssignmentModal();

  useEffect(() => {
    if (isSuccessMutateAddAssignment) {
      onClose();
      refechAssignments();
    }

  }, [isSuccessMutateAddAssignment,])

  const disbaledSubmit = isPendingMutateAddAssignment;

  return (
    <Modal
      onClose={() => handleOnClose(onClose)}
      onOpenChange={onOpenChange}
      isOpen={isOpen} placement="center" scrollBehavior="inside">
      <form onSubmit={handleSubmitForm(handleAddAssignment)}>
        {/* {Object.keys(errors).length > 0 && (
          <pre className="text-red-500">❗ERROR: {JSON.stringify(errors, null, 2)}</pre>
        )} */}
        <ModalContent className="m-4">
          <ModalHeader>Submit Assignment</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold">Information</p>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Subject Assignment"
                    variant="bordered"
                    isInvalid={errors.subject !== undefined}
                    errorMessage={errors.subject?.message}
                    disallowEmptySelection
                  >
                    <SelectItem key="MATH">
                      Math
                    </SelectItem>
                    <SelectItem key="ENGLISH">
                      English
                    </SelectItem>
                  </Select>
                )}
              />
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label="Title"
                    variant="bordered"
                    type="text"
                    isInvalid={errors.title !== undefined}
                    errorMessage={errors.title?.message}
                    className="mb-2"
                  />
                )}
              />
              <Controller
                control={control}
                name="content"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Your Answer..."
                    variant="bordered"
                    isInvalid={errors.content !== undefined}
                    errorMessage={errors.content?.message}
                    className="mb-2"
                  />
                )}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="text-teal-600 bg-white rounded-full border border-teal-600 hover:bg-teal-50"
              onPress={() => handleOnClose(onClose)}
              disabled={disbaledSubmit}
            >Cancel</Button>
            <Button
              type="submit"
              className="text-white bg-teal-600 rounded-full border border-white hover:bg-teal-600"
              disabled={disbaledSubmit}
            >{
                isPendingMutateAddAssignment ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  <p className="text-white">Submit</p>
                )
              }</Button>
          </ModalFooter>
        </ModalContent>
      </form >
    </Modal >
  )
}

export default AddAssignmentModal;