import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Key, ReactNode, useCallback, useEffect } from "react";
import useAssignment from "./useAssignment";
import useChangeUrl from "@/hooks/useChangeUrl";
import { Chip, useDisclosure } from "@heroui/react";
import { COLUMN_LISTS_ASSIGNMENT } from "./Assignment.constants";
import { CiCircleInfo } from "react-icons/ci";
import AddAssignmentModal from "./AddAssignmentModal";

const Assignment = () => {
  const { isReady, push, query } = useRouter();
  const {
    dataAssignments,
    isLoadingAssignments,
    refetchAssignments,
    isRefetchingAssignments,
  } = useAssignment();

  const addAssignment = useDisclosure();
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
          return (
            <p className="capitalize">{`${assignment.studentName}`}</p>
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
        case "grade":
          return assignment.grade !== null ? (
            <p className="text-sm">{`${assignment.grade}`}</p>
          ) : (
            <Chip
              color="primary"
              variant="flat"
              size="sm"
              className="text-sm"
              startContent={<CiCircleInfo className="text-lg" />}
            >
              Nilai Belum Tersedia
            </Chip>
          );

        case "feedback":
          return assignment.feedback !== null ? (
            <p className="text-sm">{`${assignment.feedback}`}</p>
          ) : (
            <Chip
              color="primary"
              variant="flat"
              size="sm"
              className="text-sm"
              startContent={<CiCircleInfo className="text-lg" />}
            >
              Feedback Belum Tersedia
            </Chip>
          );

        case "teacherName":
          return assignment.teacherName !== null ? (
            <p className="text-sm capitalize">{`${assignment.teacherName}`}</p>
          ) : (
            <Chip
              color="primary"
              variant="flat"
              size="sm"
              className="text-sm"
              startContent={<CiCircleInfo className="text-lg" />}
            >
              Nama Guru Belum Tersedia
            </Chip>
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
          onClickButtonTopContent={addAssignment.onOpen}
          buttonTopContentLabel="Submit New Assignment"
          isLoading={isLoadingAssignments || isRefetchingAssignments}
          columns={COLUMN_LISTS_ASSIGNMENT}
          emptyContent="Assignment is empty"
          renderCell={renderCell}
          totalPages={Math.ceil(dataAssignments?.pagination.total / dataAssignments?.pagination.perPage)}
          data={dataAssignments?.data || []}
        />
      )}
      <AddAssignmentModal
        refechAssignments={refetchAssignments}
        {...addAssignment}
      />
    </section>
  );
};

export default Assignment;
