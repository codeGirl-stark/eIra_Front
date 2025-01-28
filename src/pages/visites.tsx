import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader";

interface patientInfo {
  id: number;
  nom : string;
  prenom : string;
  telephone : string;
}

interface VisiteInterface {
    id : number;
    patientInfo : patientInfo;
    dateRdv : Date;
    motif:string;
}

const VisitesByDate = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [visites, setVisites] = useState<VisiteInterface[]>([]);//Pour enregistrer les visites trouvées
    const [dateVisite, setDateVisite] = useState<string>(""); // Pour la recherche par date
    const [loading, setLoading] = useState<boolean>(true);


    //fonction pour convertir la date
    const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      return new Date(dateString).toLocaleDateString('fr-FR', options);
    };

    //Récupérer les RDV du médecin en ligne
    useEffect(() => {
        const fetchAllVisites = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/doctorLogin");
                return;
            }
    
            await axios.get(`${apiUrl}dossier_medical/visite/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setVisites(response.data); // Enregistre les Patients dans le state
                })
                .catch(error =>{
                    alert(error.response.data.erreur)
                    console.error('Échec de la récupération des patients');
                    console.log(error)
                })
        }
    
        fetchAllVisites();
    }, [apiUrl]);

    //Fonction pour récupérer les visites
    const fetchVisites = async (date: string | null = null) => {
      const access = localStorage.getItem('access_token');
      if (!access) {
          router.push("/doctorLogin");
          return;
      }

      await axios.get(`${apiUrl}/dossier_medical/getVisites/`, {
        params: date ? { date_visite: date } : {}, // Ajouter `date_visite` si elle est fournie
        headers: {
          'Content-Type': 'application/json', // JSON au lieu de multipart/form-data si ce n'est pas un upload
          'Authorization': `Bearer ${access}`, // Token d'accès
        },
      })
      
          .then(response =>{
              setVisites(response.data); // Enregistre les Patients dans le state
          })
          .catch(error =>{
              alert(error.response.data.erreur)
              console.error('Échec de la récupération des patients');
              console.log(error)
          })
    }

    // Gérer la soumission du champ de recherche
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDate = e.target.value;
        setDateVisite(newDate);

        if (newDate) {
        fetchVisites(newDate);
        }
    };

    const handleDelete = async (id : any) => {
        if (window.confirm("Êtes-vous sûr de vouloir annuler cette visite médicale ?")) {
            setLoading(true);
            console.error(null);

            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                router.push("/doctorLogin");
                return;
            }

            await axios.delete(`${apiUrl}dossier_medical/visite/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: { id },
            })
                .then(() =>{
                    alert("Visite annulée avec succès !"); // Enregistre les Patients dans le state
                    setVisites((prevVisites) => prevVisites.filter(visite => visite.id !== id));
                    setLoading(false)
                })
                .catch(error =>{
                    alert(error.response.data.erreur)
                    console.error('Erreur lors de la suppression du patient');
                    console.log(error)
                    setLoading(false)
                })
        }
    };

  useEffect(() => {
      window.scrollTo(0, 0);
  }, [router]);

  useEffect(() => {
      setTimeout(() => setLoading(false), 1000);
  }, []);


  return loading ? (
    <Loader />
) : (
    <DefaultLayout>
        <Breadcrumb pageName ="Vos visites médicales" />

        <div className="flex justify-between my-5">
            <div className="">
                <Link href="/newVisite" className="dark:text-white flex ">
                    <svg 
                        className="fill-current duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg" 
                        height="18px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="none">
                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                        Nouvelle visite médicale
                </Link>
            </div>

            <form>
              <div className="flex">
                <button className="left-0 top-1/3 ">
                  <svg
                    className="fill-gray-300 hover:fill-primary dark:fill-gray-100 dark:hover:fill-primary"
                    width="15"
                    height="15"
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
                  type="date"
                  value={dateVisite} // La date actuelle par défaut
                  onChange={handleDateChange} // Gère le changement de la date
                  className="w-full bg-transparent pl-2 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                />
              </div>
            </form>
        </div>

        {visites.length == 0 ? (
        <p className="dark:text-white text-xl">Aucune visite pour cette date.</p>
        ) :(
            <div 
                className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-500 dark:bg-blue-950 sm:px-6 xl:pb-1"
                style={{ overflowX: 'auto' }} // Forcer l'overflow horizontal
            >                
                <div className="max-w-full overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-blue-50 text-left dark:bg-slate-900">
                            <th className="min-w-[150px] py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                Numéro
                            </th>
                            <th className="min-w-[150px] py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                Nom et Prénom du Patient
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                Contact
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                Date et heure de la visite
                            </th>
                            <th className="py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                Actions
                            </th>
                        </tr>
                      </thead>
                      <tbody>
                      {visites.map((visite: VisiteInterface, index) => (
                          <tr key={visite.id}>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                  <p className="text-black dark:text-white font-bold">
                                    {index + 1}
                                  </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 xl:pl-11 sm:text-sm">
                                  <h5 className="text-black dark:text-white">
                                      {visite.patientInfo.nom} {visite.patientInfo.prenom}
                                  </h5>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                  <p className="text-black dark:text-white">
                                      {visite.patientInfo.telephone}
                                  </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                  <p className="text-black dark:text-white">
                                    {visite.dateRdv ? formatDate(visite.dateRdv.toString()) : 'Date non disponible'}
                                  </p>
                              </td>

                              <td className="border-b border-[#eee] dark:border-gray-500 py-5 px-5 dark:text-white ">
                                  <div className="flex items-center space-x-3">
                                      <Link href={`/Visite/${visite.id}`}>
                                          <button className="hover:text-primary pt-2">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 -960 960 960" 
                                                className="fill-current"
                                                width="18"
                                                height="18"
                                                fill="none"
                                            >
                                                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v200h-80v-40H200v400h280v80H200Zm0-560h560v-80H200v80Zm0 0v-80 80ZM560-80v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T903-300L683-80H560Zm300-263-37-37 37 37ZM620-140h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
                                            </svg>
                                          </button>
                                      </Link>
                                      <button 
                                          onClick={() => handleDelete(visite.id)}
                                          className="hover:text-primary">
                                            <svg 
                                                xmlns="http://www.w3.org/2000/svg" 
                                                viewBox="0 -960 960 960" 
                                                className="fill-current"
                                                width="18"
                                                height="18" 
                                                fill="none"
                                            >
                                                <path d="m388-212-56-56 92-92-92-92 56-56 92 92 92-92 56 56-92 92 92 92-56 56-92-92-92 92ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/>
                                            </svg>
                                      </button>
                                  </div>
                              </td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
                </div>
            </div>
          )}
    </DefaultLayout>
  );
}

export default VisitesByDate;
