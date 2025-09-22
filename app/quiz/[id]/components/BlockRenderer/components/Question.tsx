"use client";

import { FC } from "react";

interface IQuestionProps {
  id: string;
  question: string;
  qType: "single" | "multi" | "text";
  options: string[];
}

export const Question: FC<IQuestionProps> = ({
  id,
  question,
  qType,
  options,
}) => {
  return (
    <div key={id} className="space-y-2">
      <div className="font-medium">{question}</div>

      {qType === "text" ? (
        <input
          className="w-full border rounded px-2 py-1"
          placeholder="Your answer"
        />
      ) : (
        <div className="space-y-1">
          {options.map((opt, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type={qType === "single" ? "radio" : "checkbox"}
                name={id}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};
