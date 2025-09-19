"use client";

import { useQuizzes } from "@/hooks/useQuizzes";
import { useRouter } from "next/navigation";
import { QuizTable } from "./QuizTable";

export const QuizList = () => {
  const { quizzes, deleteQuiz } = useQuizzes();
  const router = useRouter();

  const handleCreate = () => {
    const id = crypto.randomUUID();
    router.push(`/quiz/edit/${id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Quizzes</h1>

      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
        onClick={handleCreate}
      >
        Create a quiz
      </button>

      <QuizTable quizzes={quizzes} onDelete={deleteQuiz} />
    </div>
  );
};
