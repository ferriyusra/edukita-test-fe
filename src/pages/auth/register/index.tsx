import AuthLayout from "@/components/layouts/AuthLayout";
import Register from "@/components/views/Auth/Register";

const RegisterPage = () => {
  return (
    <AuthLayout title="Registration">
      <Register />
    </AuthLayout>
  )
}

export default RegisterPage;