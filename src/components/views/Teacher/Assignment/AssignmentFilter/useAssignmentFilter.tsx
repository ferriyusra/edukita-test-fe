import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  subject: yup.string(),
});

const useAssignmentFilter = () => {
  const {
    control,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  return {
    control,
    reset,
    watch,
    getValues,
    setValue
  }
}

export default useAssignmentFilter;