"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const STORAGE_KEY = "task-checklist-items";

export default function TaskChecklist() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setLoaded(true);
        return;
      }

      const parsed = JSON.parse(raw) as Task[];
      if (Array.isArray(parsed)) {
        setTasks(parsed);
      }
    } catch {
      // ignore corrupted localStorage data
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, loaded]);

  const remainingCount = useMemo(
    () => tasks.filter((task) => !task.completed).length,
    [tasks],
  );

  const addTask = (event: FormEvent) => {
    event.preventDefault();

    const trimmed = input.trim();
    if (!trimmed) return;

    const newTask: Task = {
      id: crypto.randomUUID(),
      text: trimmed,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setInput("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <section className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h1 className="text-2xl font-bold text-slate-900">Task Checklist</h1>
      <p className="mt-1 text-sm text-slate-500">
        {remainingCount} task{remainingCount === 1 ? "" : "s"} remaining
      </p>

      <form onSubmit={addTask} className="mt-6 flex gap-3">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Add a new task..."
          className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 outline-none ring-blue-200 transition focus:ring-2"
        />
        <button
          type="submit"
          className="rounded-xl bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
        >
          Add
        </button>
      </form>

      <ul className="mt-6 space-y-3">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
          >
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-4 w-4"
              />
              <span
                className={
                  task.completed
                    ? "text-slate-400 line-through"
                    : "text-slate-800"
                }
              >
                {task.text}
              </span>
            </label>
            <button
              type="button"
              onClick={() => deleteTask(task.id)}
              className="rounded-lg bg-rose-100 px-3 py-1.5 text-sm font-medium text-rose-700 transition hover:bg-rose-200"
            >
              Delete
            </button>
          </li>
        ))}

        {tasks.length === 0 && (
          <li className="rounded-xl border border-dashed border-slate-300 px-4 py-8 text-center text-slate-500">
            No tasks yet. Add your first task above.
          </li>
        )}
      </ul>
    </section>
  );
}

