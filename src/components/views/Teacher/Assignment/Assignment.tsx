import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useAssignment from "./useAssignment";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";
import { Chip, useDisclosure } from "@heroui/react";
import { COLUMN_LISTS_ASSIGNMENT } from "./Assignment.constants";
import AssignmentFilterModal from "./AssignmentFilter";

const Assignment = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataAssignments,
    isLoadingAssignments,
    refetchAssignments,
    isRefetchingAssignments,
    setSelectedId,
  } = useAssignment();

  const filterAssignment = useDisclosure();
  const { setUrlAssignment } = useChangeUrl()

  useEffect(() => {
    if (!isReady) return;

    setUrlAssignment();
    refetchAssignments();
  }, [isReady, query.subject]);

  const renderCell = useCallback(
    (assignment: Record<string, unknown>, columnKey: Key) => {
      const cellValue = assignment[columnKey as keyof typeof assignment];

      switch (columnKey) {
        case "studentName":
          const student = (assignment as any)?.student?.studentName;
          return (
            <p className="capitalize">{student}</p>
          );
        case "subject":
          return (
            <Chip
              color={cellValue === "MATH" ? "success" : "secondary"
              }
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          )
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/teacher/assignment/${assignment.id}`)}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          isLoading={isLoadingAssignments || isRefetchingAssignments}
          columns={COLUMN_LISTS_ASSIGNMENT}
          onClickButtonFilterTopContent={filterAssignment.onOpen}
          buttonFilterTopContentLabel={"Filter Data"}
          emptyContent="Assignment is empty"
          renderCell={renderCell}
          totalPages={Math.ceil(dataAssignments?.pagination.total / dataAssignments?.pagination.perPage)}
          data={dataAssignments?.data || []}
        />
      )}
      <AssignmentFilterModal
        refetchAssignments={refetchAssignments}
        {...filterAssignment}
      />

    </section>
  );
};

export default Assignment;
