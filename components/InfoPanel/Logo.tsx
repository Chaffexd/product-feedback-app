import { useSession } from "next-auth/react";
import Image from "next/image";

const Logo = () => {
  const { data: session, status } = useSession();

  return (
    <div className="sm:rounded-lg bg-navy p-4 md:h-40 lg:w-auto lg:h-40 flex flex-col justify-end sm:mb-4 w-full sm:w-4/12">
      {status === "authenticated" && (
        <div>
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={40}
            height={40}
            className="rounded-full"
          />
          <h1 className="text-white pb-4">Welcome, {session?.user?.name}!</h1>
        </div>
      )}
      <div>
        <h1 className="text-white font-bold">Frontend Mentor</h1>
        <p className="text-off-white font-thin">Feedback board</p>
      </div>
    </div>
  );
};

export default Logo;
