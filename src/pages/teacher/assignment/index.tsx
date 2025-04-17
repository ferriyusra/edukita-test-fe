import DashboardLayout from "@/components/layouts/DashboardLayout";
import Assignment from "@/components/views/Teacher/Assignment";

const TeacherAssignmentPage = () => {
  return (
    <DashboardLayout
      title="Assignment"
      description="Manage Assignment"
      type="TEACHER">
      <Assignment />
    </DashboardLayout>
  )
}

export default TeacherAssignmentPage;