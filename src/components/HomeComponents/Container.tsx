import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container(props: Readonly<ContainerProps>) {
  return (
    <div
      className={`container p-3 lg:p-8 mx-auto xl:px-0 dark:text-white ${
        props.className ? props.className : ""
      }`}>
      {props.children}
    </div>
  );
}