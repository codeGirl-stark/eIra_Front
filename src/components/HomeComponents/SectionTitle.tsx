import React from "react";
import { Container } from "./Container";
import { LucideIcon } from "lucide-react"; // facultatif mais utile pour typer

interface SectionTitleProps {
  Icon?: LucideIcon; // 👈 une icône React (ex: User, Calendar)
  title?: string;
  align?: "left" | "center";
  children?: React.ReactNode;
}

export const SectionTitle = (props: Readonly<SectionTitleProps>) => {
  return (
    <Container
      className={`flex w-full flex-col ${
        props.align === "left" ? "" : "items-center justify-center text-center"
      }`}>

      {props.title && (
        <div className={`flex items-center gap-2 ${props.align === "left" ? "" : "justify-center"}`}>
          {props.Icon && <props.Icon className="w-6 h-6" />}
          <h2 className="text-2xl font-bold leading-snug tracking-tight text-gray-800 lg:leading-tight lg:text-3xl dark:text-white">
            {props.title}
          </h2>
        </div>
      )}


      {props.children && (
        <p className="max-w-5xl lg:py-4 text-sm leading-normal text-gray-500 lg:text-lg dark:text-gray-300">
          {props.children}
        </p>
      )}
    </Container>
  );
}