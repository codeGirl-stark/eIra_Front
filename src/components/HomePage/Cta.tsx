import React from "react";
import Link from "next/link";
import { Container } from "@/components/HomePage/Container";

export const Cta = () => {
  return (
    <Container>
      <div className="flex flex-wrap items-center justify-between w-full max-w-4xl gap-5 mx-auto text-white bg-indigo-600 px-7 py-7 lg:px-12 lg:py-12 lg:flex-nowrap rounded-xl">
        <div className="flex-grow text-center lg:text-left">
          <h2 className="text-2xl font-medium lg:text-3xl">
            Prêt à découvrir eIra?
          </h2>
          <p className="mt-2 font-medium text-white text-opacity-90 lg:text-xl">
            Commecez aujourd&apos;hui et prenez une longueur d&apos;avance sur l&apos;avenir de l&apos;irathérapie !
          </p>
        </div>
        <div className="flex-shrink-0 w-full text-center lg:w-auto">
            <Link 
                href="../../doctorLogin" 
                className="inline-block py-3 mx-auto text-lg font-medium text-center text-indigo-600 bg-white rounded-md px-7 lg:px-10 lg:py-5 "                            
            >
                <span className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M40-160v-640h400v160h-80v-80H120v480h240v-80h80v160H40Zm480 0v-160h80v80h80v80H520Zm240 0v-80h80v-80h80v160H760ZM520-640v-160h160v80h-80v80h-80Zm320 0v-80h-80v-80h160v160h-80ZM120-240v-480 480Zm560-80-56-56 63-64H240v-80h447l-63-64 56-56 160 160-160 160Z"/></svg>
                    Connectez-vous
                </span>
            </Link>
        </div>
      </div>
    </Container>
  );
};