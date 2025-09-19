"use client";

import { BlockTypeEnum } from "@/models/quiz";
import { FC } from "react";

interface IBlockListItemProps {
  type: BlockTypeEnum;
  label: string;
  onAddBlock: (type: BlockTypeEnum) => void;
}

export const BlockListItem: FC<IBlockListItemProps> = ({
  type,
  label,
  onAddBlock,
}) => {
  const handleClick = () => onAddBlock(type);

  return (
    <li>
      <button
        className="w-full text-left px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg 
                   hover:bg-slate-200 active:bg-slate-300 transition cursor-pointer"
        onClick={handleClick}
      >
        {label}
      </button>
    </li>
  );
};
