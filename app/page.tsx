import Feed from "@/components/Feed/Feed";
import InfoPanel from "@/components/InfoPanel/InfoPanel";

export default function Home() {
  return (
    <>
      <InfoPanel />
      <main className="w-3/4">
        <Feed />
      </main>
    </>
  );
}
