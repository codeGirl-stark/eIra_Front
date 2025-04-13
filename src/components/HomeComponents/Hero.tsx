import Image from "next/image";
import { Container } from "./Container"; 
import doctor from "../../../public/HomePage/doctor.jpg";


export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex xl:pl-5 items-center w-full lg:w-1/2">
          <div className="max-w-2xl">
            <h1 className="text-xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
                Fonctionnement de l&apos;application eIra.
            </h1>
            <p className="py-5 text-base leading-normal text-gray-500 lg:text-lg xl:text-xl dark:text-gray-300">
                Découvrez comment eIra facilite la gestion des patients en irathérapie grâce à une interface fluide et des fonctionnalités adaptées à chaque acteur du parcours de soins.       
            </p>

          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={doctor}
              width="500"
              height="500"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
            />
          </div>
        </div>
      </Container>
    </>
  );
}