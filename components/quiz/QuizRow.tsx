"use client";

import { FC } from "react";
import { TQuiz } from "@/models/quiz";
import { QuizActions } from "./QuizActions";

interface IQuizRowProps {
  quiz: TQuiz;
  onDelete: (id: string) => void;
}

export const QuizRow: FC<IQuizRowProps> = ({ quiz, onDelete }) => {
  const formattedDate = new Date(quiz.updatedAt).toLocaleString();

  return (
    <tr>
      <td className="py-2">{quiz.title}</td>
      <td className="py-2">{new Date(quiz.updatedAt).toLocaleString()}</td>
      <td className="py-2">
        {quiz.published ? (
          <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded">
            Published
          </span>
        ) : (
          <span className="ml-2 inline-block px-2 py-1 text-xs font-semibold bg-gray-200 text-gray-600 rounded">
            Draft
          </span>
        )}
      </td>
      <td className="py-2">
        <QuizActions quizId={quiz.id} onDelete={onDelete} />
      </td>
    </tr>
  );
};
