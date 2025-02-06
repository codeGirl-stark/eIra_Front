import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/HomePage/Container";
import doctor from "../../../public/HomePage/doctor.jpg";

export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex xl:pl-5 items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight xl:text-4xl xl:leading-tight dark:text-white">
              Révolutionnez la gestion de vos patients en irathérapie avec eIra.
            </h1>
            <p className="py-5 text-base leading-normal text-gray-500 lg:text-lg xl:text-xl dark:text-gray-300">
              Optimisez vos consultations, centralisez vos dossiers et gagnez du temps pour ce qui compte vraiment : vos patients.            
            </p>

            <div className="flex flex-col lg:items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <Link 
                href="../../doctorLogin" 
                className="px-2 py-4 lg:text-base font-medium text-center text-white bg-indigo-600 rounded-md "
                >
                    Commencez l&apos;aventure
                </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="">
            <Image
              src={doctor}
              width="616"
              height="617"
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