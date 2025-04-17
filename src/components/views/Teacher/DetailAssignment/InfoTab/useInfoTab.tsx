import gradeService from "@/services/grade.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";

const schemaSubmitGrade = yup.object().shape({
  grade: yup.number().required(),
  feedback: yup.string().required(),
  assignmentId: yup.string().required(),
});

const useInfoTab = () => {
  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schemaSubmitGrade),
  });

  const addGrade = async (payload: any) => {
    const res = await gradeService.submitGrade(payload);
    return res;
  };

  const {
    mutate: mutateAddGrade,
    isPending: isPendingMutateAddGrade,
    isSuccess: isSuccessMutateAddGrade,
  } = useMutation({
    mutationFn: addGrade,
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Success Give Grade!",
      });
      reset();
    },
  });

  const handleAddGrade = (data: any) => {
    mutateAddGrade(data);
  };

  return {
    control,
    errors,
    reset,
    setValue,
    handleSubmitForm,
    handleAddGrade,
    isPendingMutateAddGrade,
    isSuccessMutateAddGrade,
  };
};

export default useInfoTab;
