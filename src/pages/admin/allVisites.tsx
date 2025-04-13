import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DefaultLayout from "@/components/adminComponents/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader";

interface DocteurInterface{
    username : string;
    email: string;
}

interface patientInfo {
    id: number;
    nom : string;
    prenom : string;
    telephone : string;
    medecin_info : DocteurInterface;
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
    const [dateVisite, setDateVisite] = useState<string>(""); // Pour la recherche par date
    const [visites, setVisites] = useState<VisiteInterface[]>([]);//Pour enregistrer les visites trouvées
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [visitesPerPage] = useState<number>(10); // Nombre de patients par page

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

    //Récupérer tous les rendez-vous
    useEffect(() => {
        const fetchAllVisites = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/admin/login");
                return;
            }
    
            await axios.get(`${apiUrl}/dossier_medical/Allvisites/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setVisites(response.data); // Enregistre les Patients dans le state
                })
                .catch(error =>{
                    alert(error?.response?.data?.erreur || "Erreur lors de la récupération des visites !");
                    console.log(error)
                })
        }
    
        fetchAllVisites();
    }, [apiUrl]);

    //Fonction pour récupérer les visites
    const fetchVisites = async (date: string | null = null) => {
        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push("/admin/login");
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
                    alert(error?.response?.data?.erreur || "Erreur lors du chargement des visites !");
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

    
    // Pagination : calculer les patients à afficher pour la page actuelle
    const indexOfLastPatient = currentPage * visitesPerPage;
    const indexOfFirstPatient = indexOfLastPatient - visitesPerPage;
    const currentPatients = visites.slice(indexOfFirstPatient, indexOfLastPatient);

    // Changer de page
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Nombre total de pages
    const totalPages = Math.ceil(visites.length / visitesPerPage);

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
        <Breadcrumb pageName ="Toutes les visites médicales" />
        <div className="flex justify-end my-5">
            <form >
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
        <p className="dark:text-white text-xl">Aucune visite enregistrée.</p>
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
                                Motif
                            </th>
                            <th className="min-w-[120px] py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                Médecin en charge
                            </th>
                        </tr>
                      </thead>
                      <tbody>
                      {currentPatients.map((visite: VisiteInterface, index:number) => (
                          <tr key={visite.id}>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                  <p className="text-black dark:text-white font-bold">
                                    {indexOfFirstPatient + index + 1}
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
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                  <p className="text-black dark:text-white">
                                      {visite.motif}
                                  </p>
                              </td>
                              <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                  <p className="text-black dark:text-white">
                                      {visite.patientInfo.medecin_info.email}
                                  </p>
                              </td>
                          </tr>
                      ))}
                      </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 text-white bg-blue-500 rounded ${
                            currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                        }`}
                    >
                        Précédent
                    </button>

                    <span className="text-black dark:text-white font-bold">
                        Page {currentPage} sur {totalPages}
                    </span>

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 text-white bg-blue-500 rounded ${
                            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                        }`}
                    >
                        Suivant
                    </button>
                </div>
            </div>
          )}
    </DefaultLayout>
  );
}

export default VisitesByDate;
