import AuthLayout from "@/components/layouts/AuthLayout";
import RegisterSuccess from "@/components/views/Auth/RegisterSuccess";

const RegisterSuccessPage = () => {
  return (
    <AuthLayout title="Success Activation">
      <RegisterSuccess />
    </AuthLayout>
  )
}

export default RegisterSuccessPage;