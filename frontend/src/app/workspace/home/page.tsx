import { Button, Link } from "@nextui-org/react";
import React from "react";

const Home = () => {
  return (
    <div className="text-foreground flex flex-col items-center gap-2">
      <div className="header flex flex-col items-center mt-5">
        <h1 className="text-4xl font-bold mb-5">Welcome to Wizardboards</h1>
        <h3>Thank you for checking us out</h3>
      </div>
      <h2>Workspaces or Last visited Boards?</h2>
      <h3>If you have any questions, please don't hesitate to get in touch!</h3>
      <Button className="bg-primary" size="md">
        <Link href="/workspace/contact" className="text-foreground">
          Contact Us
        </Link>
      </Button>
    </div>
  );
};

export default Home;
