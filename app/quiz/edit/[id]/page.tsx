"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Header } from "@/components/editor/Header";
import { SidebarLeft } from "@/components/editor/LeftSideBar";
import { Canvas } from "@/components/editor/Canvas";
import { SidebarRight } from "@/components/editor/RightSideBar";
import { TQuiz, TQuizBlock, BlockTypeEnum } from "@/models/quiz";
import { arrayMove } from "@dnd-kit/sortable";
import { useQuizzes } from "@/hooks/useQuizzes";
import { quizService } from "@/lib/storage/quizService";

export default function EditQuizPage() {
  const params = useParams();
  const id = params?.id as string;

  const { addOrUpdateQuiz } = useQuizzes();
  const [quiz, setQuiz] = useState<TQuiz | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  useEffect(() => {
    const existing = quizService.get(id);
    if (existing) {
      setQuiz(existing);
    } else {
      setQuiz({
        id,
        title: "Untitled Quiz",
        blocks: [],
        published: false,
        publishedAt: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [id]);

  if (!quiz) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  const touch = () =>
    setQuiz((q) => q && { ...q, updatedAt: new Date().toISOString() });

  const addBlock = (kind: BlockTypeEnum) => {
    const newBlock: TQuizBlock =
      kind === BlockTypeEnum.HEADER
        ? {
            id: crypto.randomUUID(),
            type: kind,
            props: { text: "New Heading" },
          }
        : kind === BlockTypeEnum.FOOTER
        ? {
            id: crypto.randomUUID(),
            type: kind,
            props: { text: "Footer text" },
          }
        : kind === BlockTypeEnum.BUTTON
        ? { id: crypto.randomUUID(), type: kind, props: { text: "Button" } }
        : {
            id: crypto.randomUUID(),
            type: BlockTypeEnum.QUESTION,
            props: { question: "New Question?", options: [], type: "single" },
          };

    setQuiz((q) => q && { ...q, blocks: [...q.blocks, newBlock] });
    touch();
  };

  const updateBlock = (updatedBlock: TQuizBlock) => {
    setQuiz(
      (q) =>
        q && {
          ...q,
          blocks: q.blocks.map((b) =>
            b.id === updatedBlock.id ? updatedBlock : b
          ),
          updatedAt: new Date().toISOString(),
        }
    );
  };

  const onReorder = (activeId: string, overId: string) => {
    setQuiz((q) => {
      if (!q) return q;
      const oldIndex = q.blocks.findIndex((b) => b.id === activeId);
      const newIndex = q.blocks.findIndex((b) => b.id === overId);
      if (oldIndex < 0 || newIndex < 0) return q;
      const blocks = arrayMove(q.blocks, oldIndex, newIndex);
      return { ...q, blocks, updatedAt: new Date().toISOString() };
    });
  };

  const onDeleteBlock = (blockId: string) => {
    setQuiz(
      (q) =>
        q && {
          ...q,
          blocks: q.blocks.filter((b) => b.id !== blockId),
          updatedAt: new Date().toISOString(),
        }
    );
    setSelectedBlockId((sel) => (sel === blockId ? null : sel));
  };

  const handleSave = () => {
    if (!quiz) return;
    addOrUpdateQuiz(quiz);
    alert("Quiz saved!");
  };

  const handlePublish = () => {
    if (!quiz) return;
    const nowIso = new Date().toISOString();
    const updatedQuiz: TQuiz = {
      ...quiz,
      published: true,
      publishedAt: nowIso,
      updatedAt: nowIso,
    };
    setQuiz(updatedQuiz);
    addOrUpdateQuiz(updatedQuiz);
    alert("Quiz published!");
  };

  const canPublishAgain =
    !quiz.published ||
    !quiz.publishedAt ||
    new Date(quiz.updatedAt).getTime() > new Date(quiz.publishedAt).getTime();

  const selectedBlock =
    quiz.blocks.find((b) => b.id === selectedBlockId) || null;

  return (
    <div className="flex flex-col h-screen">
      <Header
        title={quiz.title}
        onTitleChange={(title) =>
          setQuiz(
            (q) => q && { ...q, title, updatedAt: new Date().toISOString() }
          )
        }
        onSave={handleSave}
        onPublish={handlePublish}
        isPublished={quiz.published}
        canPublishAgain={canPublishAgain}
      />

      <div className="flex flex-1">
        <SidebarLeft onAddBlock={addBlock} />
        <Canvas
          blocks={quiz.blocks}
          selectedBlockId={selectedBlockId}
          onSelectBlock={setSelectedBlockId}
          onReorder={onReorder}
          onDeleteBlock={onDeleteBlock}
        />
        <SidebarRight block={selectedBlock} onUpdateBlock={updateBlock} />
      </div>
    </div>
  );
}
