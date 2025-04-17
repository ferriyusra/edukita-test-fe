import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from "@heroui/react";
import { NAV_ITEMS, BUTTON_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment, useState } from "react";
import Image from "next/image";

const LandingPageLayoutNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const { dataProfile } = useLandingPageLayoutNavbar();

  const isTeacher = dataProfile?.role === "TEACHER";
  const isStudent = dataProfile?.role === "STUDENT";

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} className="bg-white">
      <NavbarBrand>
        <Link href="/">
          <Image
            src="/images/general/logo.svg"
            alt="logo"
            width={100}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </NavbarBrand>

      {/* Center menu items - only visible on large screen */}
      <NavbarContent className="hidden lg:flex gap-6" justify="center">
        {NAV_ITEMS.map((item) => (
          <NavbarItem key={item.label}>
            <Link href={item.href} className="text-teal-600 hover:font-bold transition-all">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Right section (avatar or login/register) */}
      <NavbarContent className="hidden lg:flex gap-4" justify="end">
        {session.status === "authenticated" ? (
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Avatar
                  src={dataProfile?.profilePicture}
                  className="cursor-pointer"
                  showFallback
                />
              </DropdownTrigger>
              <DropdownMenu>
                {isTeacher ? (
                  <DropdownItem key="teacher-dashboard" href="/teacher/assignment">
                    My Assignment Dashboard
                  </DropdownItem>
                ) : null}
                {isStudent ? (
                  <DropdownItem key="student-dashboard" href="/student/assignment">
                    Student
                  </DropdownItem>
                ) : null}
                <DropdownItem key="signout" onPress={() => signOut()}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Link href="/auth/login" className="text-teal-600 hover:font-semibold">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Link
                href="/auth/register"
                className="bg-teal-600 text-white rounded-full px-4 py-2 hover:underline font-semibold"
              >
                Register
              </Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Menu toggle on mobile */}
      <NavbarMenuToggle className="lg:hidden" />

      {/* Mobile menu */}
      <NavbarMenu className="bg-white">
        {NAV_ITEMS.map((item) => (
          <NavbarMenuItem key={item.label}>
            <Link href={item.href} className="text-black text-base py-2 w-full block">
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        {/* Auth section inside mobile menu */}
        {session.status === "authenticated" ? (
          <>
            {isTeacher && (
              <NavbarMenuItem>
                <Link href="/teacher/assignment" className="text-black block py-2">
                  My Assignment Dashboard
                </Link>
              </NavbarMenuItem>
            )}
            {isStudent && (
              <NavbarMenuItem>
                <Link href="/student/assignment" className="text-black block py-2">
                  Student
                </Link>
              </NavbarMenuItem>
            )}
            <NavbarMenuItem>
              <Button
                onPress={() => signOut()}
                className="bg-teal-50 text-teal-600 block py-2 w-full text-left"
              >
                Logout
              </Button>
            </NavbarMenuItem>
          </>
        ) : (
          <>
            <NavbarMenuItem>
              <Link href="/auth/login" className="text-teal-600 py-2 block">Login</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                href="/auth/register"
                className="bg-teal-600 text-white text-center py-3 rounded-full block font-semibold"
              >
                Register
              </Link>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
