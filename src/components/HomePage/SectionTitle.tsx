import React from "react";
import { Container } from "@/components/HomePage/Container";

interface SectionTitleProps {
  preTitle?: string;
  title?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
  return (
    <Container
      className={`flex w-full flex-col mt-4 ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}>
      {props.preTitle && (
        <div className="text-xs font-bold tracking-wider text-indigo-600 uppercase">
          {props.preTitle}
        </div>
      )}

      {props.title && (
        <h2 className="max-w-2xl mt-3 text-xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-2xl dark:text-white">
          {props.title}
        </h2>
      )}

      {props.children && (
        <p className="max-w-5xl lg:py-4 text-sm leading-normal text-gray-500 lg:text-lg dark:text-gray-300">
          {props.children}
        </p>
      )}
    </Container>
  );
}
