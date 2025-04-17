import { ToasterContext } from "@/contexts/ToasterContext";
import assignmentService from "@/services/assignment.service";
import { IAssignments } from "@/types/Assignment";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  subject: yup.string().required("Please select a subject"),
  title: yup.string().required("Please input title"),
  content: yup.string().required("Please input your answer"),
});

const useAddAssignmentModal = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleOnClose = (onClose: () => void) => {
    reset();
    onClose();
  };

  const addAssignment = async (payload: IAssignments) => {
    const res = await assignmentService.submitAssignment(payload);
    return res;
  };

  const {
    mutate: mutateAddAssignment,
    isPending: isPendingMutateAddAssignment,
    isSuccess: isSuccessMutateAddAssignment,
  } = useMutation({
    mutationFn: addAssignment,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success submit assignment!",
      });
      reset();
    },
  });

  const handleAddAssignment = (data: IAssignments) => {
    mutateAddAssignment(data);
  };

  return {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddAssignment,
    isPendingMutateAddAssignment,
    isSuccessMutateAddAssignment,
    handleOnClose,
  };
};

export default useAddAssignmentModal;
