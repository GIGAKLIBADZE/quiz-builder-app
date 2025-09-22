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

const DEFAULTS = {
  header: "New Heading",
  footer: "Footer text",
  button: "Button",
  question: "New Question?",
};

export const BlockRenderer: FC<IBlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case BlockTypeEnum.HEADER: {
      const text = String(block.props?.text ?? "");
      if (!text || text === DEFAULTS.header) return null;
      return <Header key={block.id} id={block.id} text={text} />;
    }

    case BlockTypeEnum.FOOTER: {
      const text = String(block.props?.text ?? "");
      if (!text || text === DEFAULTS.footer) return null;
      return <Footer id={block.id} text={text} />;
    }

    case BlockTypeEnum.BUTTON: {
      const text = String(block.props?.text ?? "");
      if (!text || text === DEFAULTS.button) return null;
      return <Button id={block.id} text={text} />;
    }

    case BlockTypeEnum.QUESTION: {
      const question = String(block.props?.question ?? "");
      if (!question || question === DEFAULTS.question) return null;

      const qType =
        (block.props?.type as "single" | "multi" | "text") ?? "single";
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

    default:
      return null;
  }
};
