import Link from "next/link";

const Roadmap = () => {
  return (
    <div className="rounded-lg bg-white p-4 h-auto">
      <div className="flex justify-between pb-4">
        <h1 className="font-bold">Roadmap</h1>
        <Link href={"/roadmap"} className="hover:underline hover:text-blue">
          View
        </Link>
      </div>
      <ul className="">
        <li className="flex items-center">
          <span className="h-2 w-2 mr-2 rounded-full bg-orange block"></span>
          <div className="flex w-full justify-between">
            <span>Planned</span>
            <span>2</span>
          </div>
        </li>
        <li className="flex items-center">
          <span className="h-2 w-2 mr-2 rounded-full bg-purple block"></span>
          <div className="flex w-full justify-between">
            <span>In-Progress</span>
            <span>3</span>
          </div>
        </li>
        <li className="flex items-center">
          <span className="h-2 w-2 mr-2 rounded-full bg-baby-blue block"></span>
          <div className="flex w-full justify-between">
            <span>Live</span>
            <span>1</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Roadmap;
