import { BlockTypeEnum } from "@/models/quiz";

export const BLOCKS = [
  { type: BlockTypeEnum.HEADER, label: "Heading" },
  { type: BlockTypeEnum.QUESTION, label: "Question" },
  { type: BlockTypeEnum.BUTTON, label: "Button" },
  { type: BlockTypeEnum.FOOTER, label: "Footer" },
] as const;

export const TEXT_BLOCK_TYPES: readonly BlockTypeEnum[] = [
  BlockTypeEnum.HEADER,
  BlockTypeEnum.FOOTER,
  BlockTypeEnum.BUTTON,
];

export const DEFAULT_HEADER_TEXT = "New Heading";
export const DEFAULT_QUESTION_TEXT = "New Question?";
export const DEFAULT_BUTTON_TEXT = "Button";
export const DEFAULT_FOOTER_TEXT = "Footer text";
