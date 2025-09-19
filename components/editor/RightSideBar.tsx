"use client";

import { FC } from "react";
import { BlockTypeEnum, TQuizBlock } from "@/models/quiz";
import { SelectTutorial } from "./components/SelectTutorial";
import { TextInputField } from "./components/TextInputField";
import { TEXT_BLOCK_TYPES } from "./constants";
interface ISidebarRightProps {
  block: TQuizBlock | null;
  onUpdateBlock: (block: TQuizBlock) => void;
}

function isTextBlock(
  block: TQuizBlock
): block is Extract<TQuizBlock, { props: { text: string } }> {
  return TEXT_BLOCK_TYPES.includes(block.type as BlockTypeEnum);
}

function isQuestionBlock(
  block: TQuizBlock
): block is Extract<
  TQuizBlock,
  { props: { question: string; options: string[]; type: "single" | "multi" } }
> {
  return block.type === BlockTypeEnum.QUESTION;
}

export const SidebarRight: FC<ISidebarRightProps> = ({
  block,
  onUpdateBlock,
}) => {
  if (!block) {
    return <SelectTutorial />;
  }

  const handleTextChange = (value: string) => {
    if (isTextBlock(block)) {
      onUpdateBlock({
        ...block,
        props: { ...block.props, text: value },
      });
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isQuestionBlock(block)) {
      onUpdateBlock({
        ...block,
        props: { ...block.props, question: e.target.value },
      });
    }
  };

  const isSomeVariable = TEXT_BLOCK_TYPES.includes(block.type as BlockTypeEnum);

  return (
    <aside className="w-1/4 bg-white border-l p-4">
      <h2 className="font-bold mb-4">Properties</h2>

      {isSomeVariable ? (
        <TextInputField
          label="Text"
          value={(block.props as { text: string }).text}
          onChange={handleTextChange}
        />
      ) : null}

      {block.type === BlockTypeEnum.QUESTION && (
        <TextInputField
          label="Question"
          value={(block.props as { question: string }).question}
          onChange={(val) =>
            handleQuestionChange({
              target: { value: val },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        />
      )}
    </aside>
  );
};
