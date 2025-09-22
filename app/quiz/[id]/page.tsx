"use client";

import { useParams } from "next/navigation";
import { useQuizzes } from "@/hooks/useQuizzes";
import { NotPublished } from "./components/NotPublished";
import { EmptyQuizMessage } from "@/components/quiz/EmptyQuizMessage";
import { BlockTypeEnum, TQuiz } from "@/models/quiz";
import { BlockRenderer } from "./components/BlockRenderer/BlockRenderer";

export default function QuizViewPage() {
  const { id } = useParams<{ id: string }>();
  const { getQuiz } = useQuizzes();
  const quiz = getQuiz(id);

  if (!quiz) return <div>Quiz not found</div>;

  if (!quiz.published) {
    return <NotPublished />;
  }

  const isQuizEmpty = (quiz: TQuiz) => {
    if (quiz.blocks.length === 0) return true;

    return quiz.blocks.every((b) => {
      if (b.type === BlockTypeEnum.HEADER && b.props?.text === "New Heading")
        return true;
      if (b.type === BlockTypeEnum.FOOTER && b.props?.text === "Footer text")
        return true;
      if (b.type === BlockTypeEnum.BUTTON && b.props?.text === "Button")
        return true;
      if (
        b.type === BlockTypeEnum.QUESTION &&
        b.props?.question === "New Question?"
      )
        return true;
      return false;
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>

      {isQuizEmpty(quiz) ? (
        <EmptyQuizMessage quizId={quiz.id} />
      ) : (
        <div className="space-y-4">
          {quiz.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      )}
    </div>
  );
}
