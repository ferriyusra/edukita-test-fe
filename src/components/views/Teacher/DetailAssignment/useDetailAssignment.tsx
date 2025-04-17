import { ToasterContext } from "@/contexts/ToasterContext";
import assignmentService from "@/services/assignment.service";
import gradeService from "@/services/grade.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useContext } from "react";

const useDetailAssignment = () => {
  const { query, isReady } = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getAssignmentById = async () => {
    const { data } = await assignmentService.getAssignment(`${query.id}`);
    return data.data;
  };

  const { data: dataAssignment, refetch: refetchCategory } = useQuery({
    queryKey: ["Assignment"],
    queryFn: getAssignmentById,
    enabled: isReady,
  });

  const submitGrade = async (payload: any) => {
    const { data } = await gradeService.submitGrade(
      payload,
    );
    return data.data;
  };

  const {
    mutate: mutateSubmitGrade,
    isPending: isPendingMutateSubmitGrade,
    isSuccess: isSuccessMutateSubmitGrade,
  } = useMutation({
    mutationFn: (payload: any) => submitGrade(payload),
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
    onSuccess: () => {
      refetchCategory();
      setToaster({
        type: "success",
        message: "Success submit grade.",
      });
    },
  });

  const handleSubmitGrade = (data: any) => mutateSubmitGrade(data);

  return {
    dataAssignment,
    handleSubmitGrade,
    isPendingMutateSubmitGrade,
    isSuccessMutateSubmitGrade,
  };
};

export default useDetailAssignment;
