import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import axios from "axios";
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import DarkModeSwitcher from './DarkModeSwitcher';
import Image from 'next/image';

interface SearchInterface {
  users: { id: number; username: string }[];
  doctors: { id: number; specialite: string }[];
  patients: { id: number; nom: string; prenom: string }[];
  dossiers: { id: number; numDossier: string }[];
}

const Header = (props: {sidebarOpen: string | boolean | undefined;setSidebarOpen: (arg0: boolean) => void;}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [results, setResults] = useState<SearchInterface | null>(null);


    const fetchResults = async () => {
      setLoading(true);

      const access = localStorage.getItem('access_token');
      if (!access) {
          router.push('../../admin/login')
          return;
      }

      axios.post(`${apiUrl}/medecin/search/`, {"q": query},{
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${access}`,  // Si authentification requise
          }
      })
      .then(response =>{
        setLoading(false);
        setResults(response.data.results);
      })
      .catch(error =>{
          setLoading(false);
          alert(error?.response?.data?.erreur || "Erreur lors de la recherche !");
          console.error(error);   
      })
  }


  useEffect(() => {
    if (query.trim().length > 0) { // Vérifie si la chaîne n'est pas vide
      fetchResults();
    } else {
        setResults(null);
    }
  }, [query]);


  return (
    <header className="sticky top-0 z-999 flex w-full bg-white dark:bg-slate-800 shadow-xl">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-white bg-white shadow-xl dark:border-blue-950 dark:bg-gray-800 lg:hidden"
          >
            <span className="relative block h-6 w-6 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-300'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && 'delay-400 !w-full'
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!w-full delay-500'
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-[0]'
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && '!h-0 !delay-200'
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden mt-1" href="#">
            <Image src="/logo.png" alt="Logo" width={50} height={50} />
          </Link>
        </div>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <button className="absolute left-0 top-1/2 -translate-y-1/2">
              <svg
                className="fill-gray-300 hover:fill-primary dark:fill-gray-100 dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                    fill=""
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                    fill=""
                />
                </svg>
              </button>

               <input
                type="text"
                placeholder="Rechercher..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
              />
            </div>
          </form>

          {query.length > 1 && (
            <div className="absolute z-50 mt-2 w-[50%] bg-white dark:bg-blue-950 shadow-lg rounded-lg">
              {loading && <p className="text-gray-500 dark:text-blue-100 p-2">Recherche en cours...</p>}

              {!loading && results && Object.values(results).every(arr => arr.length === 0) && (
                <p className="text-gray-500 dark:text-blue-100 p-2">Aucun résultat</p>
              )}

              {!loading && results?.users?.map((user) => (
                <p key={user.id} className="p-5 border-b border-gray-600 w-[100%] dark:text-blue-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                  {user.username} (Utilisateur)
                </p>
              ))}
              
              {!loading && results?.doctors?.map((doctor) => (
                <p key={doctor.id} className="p-5 border-b border-gray-600 w-[100%] dark:text-blue-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                  {doctor.specialite} (Profil Médecin)
                </p>
              ))}
              
              {!loading && results?.patients?.map((patient) => (
                <p key={patient.id} className="p-5 border-b border-gray-600 w-[100%] dark:text-blue-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                  {patient.nom} {patient.prenom} (Patient)
                </p>
              ))}
              
              {!loading && results?.dossiers?.map((dossier) => (
                <p key={dossier.id} className="p-5 border-b border-gray-600 w-[100%] dark:text-blue-100 hover:bg-gray-100 dark:hover:bg-gray-600">
                  {dossier.numDossier} (Dossier Médical)
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;