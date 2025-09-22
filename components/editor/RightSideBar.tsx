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
  if (!block) return <SelectTutorial />;

  const handleTextChange = (value: string) => {
    if (isTextBlock(block)) {
      onUpdateBlock({
        ...block,
        props: { ...block.props, text: value },
      });
    }
  };

  const handleQuestionChange = (value: string) => {
    if (isQuestionBlock(block)) {
      onUpdateBlock({
        ...block,
        props: { ...block.props, question: value },
      });
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    if (isQuestionBlock(block)) {
      const newOptions = [...block.props.options];
      newOptions[index] = value;
      onUpdateBlock({
        ...block,
        props: { ...block.props, options: newOptions },
      });
    }
  };

  const handleAddOption = () => {
    if (isQuestionBlock(block)) {
      onUpdateBlock({
        ...block,
        props: { ...block.props, options: [...block.props.options, ""] },
      });
    }
  };

  const handleRemoveOption = (index: number) => {
    if (isQuestionBlock(block)) {
      const newOptions = block.props.options.filter((_, i) => i !== index);
      onUpdateBlock({
        ...block,
        props: { ...block.props, options: newOptions },
      });
    }
  };

  const handleTypeChange = (value: "single" | "multi") => {
    if (isQuestionBlock(block)) {
      onUpdateBlock({
        ...block,
        props: { ...block.props, type: value },
      });
    }
  };

  const isSomeVariable = TEXT_BLOCK_TYPES.includes(block.type as BlockTypeEnum);

  return (
    <aside className="w-1/4 bg-white border-l p-4 space-y-4">
      <h2 className="font-bold mb-4">Properties</h2>

      {isSomeVariable && (
        <TextInputField
          label="Text"
          value={(block.props as { text: string }).text}
          onChange={handleTextChange}
        />
      )}

      {isQuestionBlock(block) && (
        <>
          <TextInputField
            label="Question"
            value={block.props.question}
            onChange={handleQuestionChange}
          />

          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              className="w-full border rounded px-2 py-1"
              value={block.props.type}
              onChange={(e) =>
                handleTypeChange(e.target.value as "single" | "multi")
              }
            >
              <option value="single">Single choice</option>
              <option value="multi">Multiple choice</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Options</label>
            {block.props.options.map((opt, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  className="flex-1 border rounded px-2 py-1"
                  value={opt}
                  onChange={(e) => handleOptionChange(idx, e.target.value)}
                />
                <button
                  className="px-2 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveOption(idx)}
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>
        </>
      )}
    </aside>
  );
};
