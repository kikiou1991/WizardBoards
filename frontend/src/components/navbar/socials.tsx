import Icon from "@/components/Icons";
import Link from "next/link";

const Socials = () => {
  return (
    <div className="flex flex-row flex-wrap-0 gap-2 text-foreground">
      <Link
        href="https://github.com/kikiou1991"
        target="_blank"
        className="transfrom transition-transform hover:scale-125"
      >
        <Icon name="linkedIn" classname={"fill-current"} />
      </Link>
      <Link
        href="https://www.linkedin.com/in/gabor-adorjani-599666290/"
        target="_blank"
        className="transfrom transition-transform hover:scale-125"
      >
        <Icon name="github" classname={"fill-current"} />
      </Link>
      <Link href="" className="transfrom transition-transform hover:scale-125">
        <Icon name="discord" classname={"fill-current"} />
      </Link>
    </div>
  );
};

export default Socials;
