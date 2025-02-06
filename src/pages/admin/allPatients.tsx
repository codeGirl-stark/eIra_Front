import Loader from "@/common/Loader";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";

interface DocteurInterface {
    username : string;
    email : string;
}

interface PatientInterface {
    id : number;
    nom : string;
    prenom : string;
    sexe : string;
    age : number;
    adresse : string;
    telephone : string;
    medecin_info : DocteurInterface;
}

export const ListePatient: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [patients, setPatients] = useState<PatientInterface[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [patientsPerPage] = useState<number>(10); // Nombre de patients par page



    //Récupérer tous les patients
    useEffect(() => {
        const fetchPatient = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/admin/login");
                return;
            }
    
            await axios.get(`${apiUrl}/dossier_medical/Allpatients/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setPatients(response.data); // Enregistre les Patients dans le state
                })
                .catch(error =>{
                    alert(error?.response?.data?.erreur || "Erreur lors de la récupération des patients !");
                    console.log(error)
                })
        }
    
        fetchPatient();
    }, [apiUrl]);


    // Pagination : calculer les patients à afficher pour la page actuelle
    const indexOfLastPatient = currentPage * patientsPerPage;
    const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
    const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

    
    // Changer de page
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Nombre total de pages
    const totalPages = Math.ceil(patients.length / patientsPerPage);

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
            <Breadcrumb pageName="Liste des Patients" />

            {patients.length == 0 ? (
            <p className="dark:text-white text-xl">Aucun patient enregistré.</p>
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
                                            Sexe
                                        </th>
                                        <th className="min-w-[120px] py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                            Age
                                        </th>
                                        <th className="min-w-[120px] py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                            Medecin en charge
                                        </th>
                                        <th className="py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {currentPatients.map((patient: PatientInterface, index) => (
                                    <tr key={patient.id}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                            <p className="text-black dark:text-white font-bold">
                                                {indexOfFirstPatient + 1}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 xl:pl-11 sm:text-sm">
                                            <h5 className="text-black dark:text-white">
                                                {patient.nom} {patient.prenom}
                                            </h5>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                            <p className="text-black dark:text-white">
                                                {patient.sexe === "M" ? ("Masculin") : ("Féminin")}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                            <p className="text-black dark:text-white">
                                                {patient.age} ans
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                            <p className="text-black dark:text-white">
                                                {patient.medecin_info.email}
                                            </p>
                                        </td>

                                        <td className="border-b border-[#eee] dark:border-gray-500 py-5 px-5 dark:text-white ">
                                            <div className="flex items-center space-x-3">
                                                <Link href={`/admin/Dossier/${patient.id}`}>
                                                    <button className="hover:text-primary pt-2">
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg" 
                                                            viewBox="0 -960 960 960" 
                                                            className="fill-current"
                                                            width="18"
                                                            height="18"
                                                            fill="none"
                                                        >
                                                            <path 
                                                                d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v242q-18-14-38-23t-42-19v-200H447l-80-80H160v480h120v80H160ZM640-40q-91 0-168-48T360-220q35-84 112-132t168-48q91 0 168 48t112 132q-35 84-112 132T640-40Zm0-80q57 0 107.5-26t82.5-74q-32-48-82.5-74T640-320q-57 0-107.5 26T450-220q32 48 82.5 74T640-120Zm0-40q-25 0-42.5-17.5T580-220q0-25 17.5-42.5T640-280q25 0 42.5 17.5T700-220q0 25-17.5 42.5T640-160Zm-480-80v-480 277-37 240Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
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

export default ListePatient;