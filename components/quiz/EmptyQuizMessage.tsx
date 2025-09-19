"use client";

import Link from "next/link";

export const EmptyQuizMessage = ({ quizId }: { quizId: string }) => {
  return (
    <div className="mt-6 flex flex-col items-center justify-center text-center">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm max-w-lg">
        <p className="text-lg font-semibold text-gray-700 mb-2">
          This quiz is empty
        </p>
        <p className="text-sm text-gray-500 mb-4">
          The quiz has been published, but no questions or content have been
          added yet.
        </p>
        <Link
          href={`/quiz/edit/${quizId}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Add Questions
        </Link>
      </div>
    </div>
  );
};
