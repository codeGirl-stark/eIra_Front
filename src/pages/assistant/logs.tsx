import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useEffect, useState} from "react";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import DefaultLayout from "@/components/assistantComponents/Layout/DefaultLayout";


interface LogInterface {
    id : number;
    date : Date;
    prenom : string;
    libelle : string;
    medecin_email : string;
}

export const ListesLog: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [logs, setLogs] = useState<LogInterface[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1); // Page actuelle
    const [logsPerPage] = useState<number>(10); // Nombre de patients par page
    const [selectedLogs, setSelectedLogs] = useState<number[]>([]);

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

    //Récupérer les logs du medecin
    useEffect(() => {
        const fetchLogs = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/doctorLogin");
                return;
            }
    
            await axios.get(`${apiUrl}/medecin/logs/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setLogs(response.data); // Enregistre les Patients dans le state
                })
                .catch(error =>{
                    alert(error?.response?.data?.erreur || "Erreur lors du chargement des logs !");
                    console.log(error)
                })
        }
    
        fetchLogs();
    }, [apiUrl]);


    // Fonction pour gérer la sélection des logs
    const handleCheckboxChange = (logId: number) => {
        setSelectedLogs((prev) =>
            prev.includes(logId) ? prev.filter((id) => id !== logId) : [...prev, logId]
        );
    };

    // Fonction pour sélectionner ou désélectionner tous les logs
    const handleSelectAll = () => {
        if (selectedLogs.length === currentLogs.length) {
            setSelectedLogs([]); // Tout désélectionner
        } else {
            setSelectedLogs(currentLogs.map((log) => log.id)); // Tout sélectionner
        }
    };


    // Fonction pour supprimer les logs sélectionnés
    const handleDeleteSelected = async () => {
        if (selectedLogs.length === 0) return alert("Aucun log sélectionné !");
        
        const confirmed = window.confirm("Voulez-vous vraiment supprimer ces logs ?");
        if (!confirmed) return;

        const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                router.push("/doctorLogin");
                return;
            }

        console.log("Logs sélectionnés :", selectedLogs);

        await axios.delete(`${apiUrl}/medecin/delete-logs/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
                data: { log_ids: selectedLogs },
                
            })
                .then(() =>{
                    alert("Log supprimé avec succès !"); // Enregistre les Patients dans le state
                    window.location.reload();
                })
                .catch(error =>{
                    alert(error?.response?.data?.erreur || "Erreur lors de la suppression des logs !");
                    console.log(error)
                })
    };


    // Pagination : calculer les patients à afficher pour la page actuelle
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);

    // Changer de page
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    // Nombre total de pages
    const totalPages = Math.ceil(logs.length / logsPerPage);

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
            <Breadcrumb pageName="Liste des actions" />

            {logs.length == 0 ? (
                <p className="dark:text-white text-xl">Aucune action enregistrée.</p>
            ) :(
                <>
                    <div className="flex justify-end mb-5">
                        <button
                            onClick={handleDeleteSelected}
                            disabled={selectedLogs.length === 0}
                            className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
                        >
                            Supprimer les logs sélectionnés
                        </button>
                    </div>
                
                    <div 
                        className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-gray-500 dark:bg-blue-950 sm:px-6 xl:pb-1"
                        style={{ overflowX: 'auto' }} // Forcer l'overflow horizontal
                    >               
                        <div className="max-w-full overflow-x-auto">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr className="bg-blue-50 text-left dark:bg-slate-900">
                                            <th className="py-4 px-4">
                                                <input
                                                    type="checkbox"
                                                    onChange={handleSelectAll}
                                                    checked={selectedLogs.length === currentLogs.length && currentLogs.length > 0}
                                                    className="checkbox checkbox-info"
                                                />
                                            </th>
                                            <th className="min-w-[150px] text-center py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                                Numéro
                                            </th>
                                            <th className="min-w-[150px] text-center py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                                Date d&apos;enregistrement
                                            </th>
                                            <th className="min-w-[120px] text-center py-4 px-4 font-medium lg:text-base text-black dark:text-white">
                                                Libellé
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {currentLogs.map((log: LogInterface, index) => (
                                        <tr key={log.id}>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedLogs.includes(log.id)}
                                                    onChange={() => handleCheckboxChange(log.id)}
                                                    className="checkbox checkbox-info"
                                                />
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                                <p className="text-black text-center dark:text-white font-bold">
                                                    {indexOfFirstLog + index + 1}
                                                </p>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 xl:pl-11 sm:text-sm">
                                                <h5 className="text-black text-center dark:text-white">
                                                    {log.date? formatDate(log.date.toString()) : 'Date non disponible'}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4 dark:border-gray-500 sm:text-sm">
                                                <p className="text-black text-center dark:text-white">
                                                    {log.libelle}
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
                    </>
                )}

        </DefaultLayout>
    );

}

export default ListesLog;