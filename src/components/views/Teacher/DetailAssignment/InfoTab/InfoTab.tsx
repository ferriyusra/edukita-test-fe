import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  NumberInput,
  Skeleton,
  Slider,
  Spinner,
  Textarea,
} from "@heroui/react";
import useInfoTab from "./useInfoTab";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Controller } from "react-hook-form";

interface PropTypes {
  dataAssignment: any;
  onSubmit: (data: any) => void;
  isPendingSubmitGrade: boolean;
  isSuccessSubmitGrade: boolean;
}

const InfoTab = (props: PropTypes) => {
  const router = useRouter();
  const { dataAssignment, isPendingSubmitGrade, } = props;
  const {
    control,
    errors,
    reset,
    handleSubmitForm,
    handleAddGrade,
    isPendingMutateAddGrade,
    isSuccessMutateAddGrade,
    setValue,
  } = useInfoTab();

  useEffect(() => {
    if (dataAssignment?.id) {
      setValue("assignmentId", dataAssignment.id);
    }
  }, [dataAssignment?.id]);

  useEffect(() => {
    if (isSuccessMutateAddGrade) {
      router.back();
    }
  }, [isSuccessMutateAddGrade]);

  const disbaledSubmit = isPendingMutateAddGrade;

  return (
    <Card className="w-full p-4 lg:w-1/2">
      <CardHeader className="flex-col items-center">
        <h1 className="w-full text-xl font-bold">Information Assignment</h1>
        <p className="w-full text-small text-default-400">Assignment</p>
      </CardHeader>
      <CardBody>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmitForm(handleAddGrade)}
        >
          {Object.keys(errors).length > 0 && (
            <pre className="text-red-500">❗ERROR: {JSON.stringify(errors, null, 2)}</pre>
          )}
          <p className="text-sm font-bold">Information</p>
          <Skeleton isLoaded={!!dataAssignment?.student?.studentName} className="rounded-lg">
            <Input
              label="Student Name"
              labelPlacement="outside"
              variant="flat"
              disabled
              value={dataAssignment?.student?.studentName}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataAssignment?.subject} className="rounded-lg">
            <Input
              label="Subject"
              labelPlacement="outside"
              variant="flat"
              disabled
              value={dataAssignment?.subject}
            />
          </Skeleton>
          <Skeleton isLoaded={!!dataAssignment?.title} className="rounded-lg">
            <Input
              label="Title"
              labelPlacement="outside"
              variant="flat"
              disabled
              value={dataAssignment?.title}
            />
          </Skeleton>
          <Skeleton
            isLoaded={!!dataAssignment?.content}
            className="rounded-lg"
          >
            <Textarea
              readOnly
              label="Content"
              variant="bordered"
              labelPlacement="outside"
              value={dataAssignment?.content}
            ></Textarea>
          </Skeleton>

          <Controller
            control={control}
            name="grade"
            render={({ field }) => (
              <NumberInput
                {...field}
                label="Grade"
                labelPlacement="outside"
                hideStepper
                aria-label="Amount"
                className="max-w-xs"
                description="The value should be greater than or equal to 100"
                minValue={10}
                maxValue={100}
                placeholder="Input the grade : 10 - 100"
                isInvalid={errors.grade !== undefined}
                errorMessage={errors.grade?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="feedback"
            rules={{ required: "Feedback is required" }}
            render={({ field }) => (
              <Textarea
                {...field}
                label="Feedback"
                labelPlacement="outside"
                variant="flat"
                isInvalid={errors.feedback !== undefined}
                errorMessage={errors.feedback?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="assignmentId"
            render={({ field }) => (
              <Input {...field}
                className="hidden"
                value={dataAssignment?.id}
              />
            )}
          />
          <Button
            type="submit"
            className="bg-teal-600 mt-2 disabled:bg-default-500"
            disabled={disbaledSubmit || !dataAssignment?.id}
          >
            {" "}
            {isPendingSubmitGrade ? (
              <Spinner size="sm" color="white" />
            ) : (
              <p className="text-white">Grade</p>
            )}
          </Button>
          <Button
            className="text-teal-600 bg-white border border-teal-600 hover:bg-teal-50 "
            onPress={() => router.back()}
          >
            <span>Back To Assignments</span>
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};

export default InfoTab;
