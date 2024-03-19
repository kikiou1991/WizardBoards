import React from "react";
import InputField from "./InputField";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import Icon from "@/components/Icons";

const Login = () => {
  return (
    <div className="relaitve flex h-full flex-row">
      <div className="md:basis-2/3 hidden md:flex bg-gradient-to-r from-[#602ee4] to-[#14a0eb]">
        <Icon name="shape" />
      </div>
      <div className="md:basis-1/3 w-full flex flex-col justify-center items-center gap-2 py-5 px-5 bg-gradient-to-r from-[#66a6db] to-[#c9d7e7]">
        <div className="mt-5 mb-5 ">Welcome to Hogwarts</div>
        <InputField />
        <div>Or</div>
        <Button color="primary" variant="light">
          <Link href="/auth/sign-up">Register</Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
