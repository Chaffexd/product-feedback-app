"use client"
import Feed from "@/components/Feed/Feed";
import InfoPanel from "@/components/InfoPanel/InfoPanel";
import Modal from "../components/UI/Modal";

export default function Home() {
  return (
    <>
      <Modal />
      <InfoPanel />
      <main className="w-3/4">
        <Feed />
      </main>
    </>
  );
}
