import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="lg:py flex w-full flex-col items-center justify-center gap-10 py-10 lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/login.svg"
          alt="login"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-teal-600">Register</h2>
          <p className="mb-4 mt-2 text-small">
            Apakah sudah punya akun?&nbsp;
            <Link href="/auth/login" className="font-semibold text-teal-400">
              Login here!
            </Link>
          </p>
          {
            errors.root && (
              <p className="mb-2 font-medium text-danger">
                {errors?.root?.message}
              </p>
            )
          }
          <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleRegister)}>
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Nama Lengkap"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.fullName !== undefined}
                  errorMessage={errors.fullName?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="email"
                  label="Email"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.email !== undefined}
                  errorMessage={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.password ? "text" : "password"}
                  label="Kata Sandi"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <>
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() => handleVisiblePassword("password")}
                      >
                        {visiblePassword.password ? (
                          <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                      </button>
                    </>
                  }
                />
              )}
            />
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={visiblePassword.confirmPassword ? "text" : "password"}
                  label="Konfirmasi Kata Sandi"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.confirmPassword !== undefined}
                  errorMessage={errors.confirmPassword?.message}
                  endContent={
                    <>
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={() =>
                          handleVisiblePassword("confirmPassword")
                        }
                      >
                        {visiblePassword.confirmPassword ? (
                          <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                      </button>
                    </>
                  }
                />
              )}
            />
            <Button color="danger" size="lg" type="submit" className="bg-teal-600 mt-4">
              {
                isPendingRegister ? (
                  <Spinner color="white" size="sm" />
                ) : "Register"
              }
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Register;
