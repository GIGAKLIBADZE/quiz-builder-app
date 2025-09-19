"use client";

import { FC } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Question } from "./components/Question";
import { Button } from "./components/Button";

import { TQuizBlock, BlockTypeEnum } from "@/models/quiz";

interface IBlockRendererProps {
  block: TQuizBlock;
}

export const BlockRenderer: FC<IBlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case BlockTypeEnum.HEADER: {
      const text = String(block.props?.text ?? "");
      return <Header key={block.id} id={block.id} text={text} />;
    }

    case BlockTypeEnum.QUESTION: {
      const qType =
        (block.props?.type as "single" | "multi" | "text") ?? "single";
      const question = String(block.props?.question ?? "");
      const options = Array.isArray(block.props?.options)
        ? block.props.options
        : [];

      return (
        <Question
          id={block.id}
          question={question}
          options={options.map(String)}
          qType={qType}
        />
      );
    }

    case BlockTypeEnum.BUTTON: {
      const text = String(block.props?.text ?? "Next");
      return <Button id={block.id} text={text} />;
    }

    case BlockTypeEnum.FOOTER: {
      const text = String(block.props?.text ?? "");
      return <Footer id={block.id} text={text} />;
    }

    default:
      return null;
  }
};
