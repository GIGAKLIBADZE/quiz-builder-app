"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";

interface IQuizActionsProps {
  quizId: string;
  onDelete: (id: string) => void;
}

export const QuizActions: FC<IQuizActionsProps> = ({ quizId, onDelete }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button
        className="px-2 py-1 bg-yellow-400 text-white rounded cursor-pointer"
        onClick={() => router.push(`/quiz/edit/${quizId}`)}
      >
        Edit
      </button>

      <button
        className="px-2 py-1 bg-green-500 text-white rounded cursor-pointer"
        onClick={() => router.push(`/quiz/${quizId}`)}
      >
        View
      </button>
      <button
        className="px-2 py-1 bg-red-500 text-white rounded cursor-pointer"
        onClick={() => {
          if (window.confirm("Are you sure you want to delete this quiz?")) {
            onDelete(quizId);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};
