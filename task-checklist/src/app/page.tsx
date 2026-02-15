import TaskChecklist from "@/components/TaskChecklist";

export default function Home() {
  return (
    <main
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat p-6 md:p-10"
      style={{ backgroundImage: "url('/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-950/35" />
      <div className="relative z-10 w-full max-w-2xl">
        <TaskChecklist />
      </div>
    </main>
  );
}
