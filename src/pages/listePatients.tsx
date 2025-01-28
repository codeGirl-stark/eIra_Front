import Loader from "@/common/Loader";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";

interface PatientInterface {
    id : number;
    nom : string;
    prenom : string;
    sexe : string;
    age : number;
    adresse : string;
    telephone : string;
}

export const ListePatient: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [patients, setPatients] = useState<PatientInterface[]>([]);


    //Récupérer les patients du docteur en ligne
    useEffect(() => {
        const fetchPatient = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/doctorLogin");
                return;
            }
    
            await axios.get(`${apiUrl}dossier_medical/patient/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setPatients(response.data); // Enregistre les Patients dans le state
                })
                .catch(error =>{
                    alert(error.response.data.erreur)
                    console.error('Échec de la récupération des patients');
                    console.log(error)
                })
        }
    
        fetchPatient();
    }, [apiUrl]);

    const handleDelete = async (id : any) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer ce patient ?")) {
            setLoading(true);
            console.error(null);

            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                router.push("/doctorLogin");
                return;
            }

            await axios.delete(`${apiUrl}dossier_medical/patient/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: { id },
            })
                .then(() =>{
                    alert("Patient supprimé avec succès !"); // Enregistre les Patients dans le state
                    setPatients((prevPatients) => prevPatients.filter(patient => patient.id !== id));
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
            <Breadcrumb pageName="Liste des Patients" />

            <div className="flex justify-end my-5">
                <Link href="/trajets" className="dark:text-white flex ">
                    <svg 
                        className="fill-current duration-300 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg" 
                        height="18px" 
                        viewBox="0 -960 960 960" 
                        width="24px" 
                        fill="none">
                        <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                    </svg>
                    Ajouter un patient
                </Link>
            </div>

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
                                        <th className="py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                {patients.map((patient: PatientInterface, index) => (
                                    <tr key={patient.id}>
                                        <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                            <p className="text-black dark:text-white font-bold">
                                                {index + 1}
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

                                        <td className="border-b border-[#eee] dark:border-gray-500 py-5 px-5 dark:text-white ">
                                            <div className="flex items-center space-x-3">
                                                <Link href={`/Patient/${patient.id}`}>
                                                    <button className="hover:text-primary pt-2">
                                                        <svg 
                                                            xmlns="http://www.w3.org/2000/svg"                                             
                                                            viewBox="0 -960 960 960" 
                                                            className="fill-current"
                                                            width="18"
                                                            height="18"
                                                            fill="none"
                                                        >
                                                            <path fill="" d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                                                        </svg>
                                                    </button>
                                                </Link>

                                                <Link href={`/GetDossier/${patient.id}`}>
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
                                                <button 
                                                    onClick={() => handleDelete(patient.id)}
                                                    className="hover:text-primary">
                                                    <svg
                                                        className="fill-current"
                                                        width="18"
                                                        height="18"
                                                        viewBox="0 0 18 18"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path
                                                        d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                                                        fill=""
                                                        />
                                                        <path
                                                        d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                                                        fill=""
                                                        />
                                                        <path
                                                        d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                                                        fill=""
                                                        />
                                                        <path
                                                        d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                                                        fill=""
                                                        />
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

export default ListePatient;