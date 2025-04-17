import { Tabs, Tab } from "@heroui/react";
import InfoTab from "./InfoTab";
import useDetailAssignment from "./useDetailAssignment";

const DetailAssignment = () => {
  const {
    dataAssignment,
    handleSubmitGrade,
    isPendingMutateSubmitGrade,
    isSuccessMutateSubmitGrade,
  } = useDetailAssignment();

  return (
    <Tabs aria-label="Options">
      <Tab key="info" title="info">
        <InfoTab
          dataAssignment={dataAssignment}
          onSubmit={handleSubmitGrade}
          isPendingSubmitGrade={isPendingMutateSubmitGrade}
          isSuccessSubmitGrade={isSuccessMutateSubmitGrade}
        />
      </Tab>
    </Tabs>
  );
};

export default DetailAssignment;
