import DashboardLayout from "@/components/layouts/DashboardLayout";
import Assignment from "@/components/views/Student/Assignment";

const StudentAssignmentPage = () => {
  return (
    <DashboardLayout
      title="Assignment"
      description="List Assignment"
      type="STUDENT">
      <Assignment />
    </DashboardLayout>
  )
}

export default StudentAssignmentPage;