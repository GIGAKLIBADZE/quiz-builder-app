"use client";

import { FC } from "react";
import { TQuiz } from "@/models/quiz";
import { RowQuiz } from "./RowQuiz";

interface IQuizTableProps {
  quizzes: TQuiz[];
  onDelete: (id: string) => void;
}

export const QuizTable: FC<IQuizTableProps> = ({ quizzes, onDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-left border-b">
          <th className="py-2">Title</th>
          <th className="py-2">Updated At</th>
          <th className="py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <RowQuiz key={quiz.id} quiz={quiz} onDelete={onDelete} />
          ))
        ) : (
          <tr>
            <td colSpan={3} className="py-4 text-center text-gray-500">
              There are no quizzes yet.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
