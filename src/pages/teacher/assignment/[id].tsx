import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailAssignment from "@/components/views/Teacher/DetailAssignment";

const TeacherDetailAssignment = () => {
  return (
    <DashboardLayout
      title="Detail Assignment"
      description="Send Grade Assignment"
      type="TEACHER">
      <DetailAssignment />
    </DashboardLayout>
  )
}

export default TeacherDetailAssignment;