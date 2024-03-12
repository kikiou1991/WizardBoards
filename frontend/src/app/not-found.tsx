import Link from "next/link";

export default function NotFound() {
  return (
    <div className="global h-full w-full flex flex-col gap-2 items-center justify-center">
      <h2 className="text-xl font-semibold">
        Ooops this link appears to be broken
      </h2>
      <p>Let's get you back to the Home page</p>
      <Link
        href="/workspace/home"
        className="font-semibold p-2 rounded-lg bg-slate-500"
      >
        Take Me Home
      </Link>
    </div>
  );
}
