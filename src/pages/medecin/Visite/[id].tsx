import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import styles from "../../../styles/common.module.css"
import DefaultLayout from "@/components/medecinComponents/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Link from "next/link";


interface FormDataType {
    id : number|null;
    dateRdv : Date;
    motif : string;
    patient : string;
}

interface PatientInterface {
    id : number;
    nom : string;
    prenom : string;
}

export const UpdateVisite: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { id } = router.query; // Récupérer l'ID depuis l'URL
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [patients, setPatients] = useState<PatientInterface[]>([]);


    const [formData, setFormData] = useState<FormDataType>({
        id:null,
        dateRdv : new Date(),
        motif : "",
        patient : "",
    });

    useEffect(() => {
        if (id) {
            setFormData((prevData) => ({
                ...prevData,
                id: Number(id), // Assurez-vous que l'ID est un nombre
            }));
        }
    }, [id]); 

    function formatDateToLocal(dateString: string | number | Date) {
        // Vérifie que dateString est bien défini et crée une date
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            console.error("La date fournie est invalide");
            return '';
        }

        const offset = date.getTimezoneOffset() * 60000; // Décalage en millisecondes
        const localISOTime = new Date(date.getTime() - offset).toISOString().slice(0, 19).replace('T', ' ');

        return localISOTime;
    }

    //Récupérer les patients du docteur en ligne
    useEffect(() => {
        const fetchPatient = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/medecin/login");
                return;
            }
    
            await axios.get(`${apiUrl}/dossier_medical/patient/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    if (response.data.length === 0) {
                        // Si aucun patient n'est trouvé, redirigez vers la page de création d'un nouveau patient
                        router.push("/medecin/newPatient");
                    } else {
                        setPatients(response.data); // Enregistre les patients dans le state
                    }
                })
                .catch(error =>{
                    alert(error?.response?.data?.erreur || "Echec de la récupération!");
                    console.log(error)
                })
        }
    
        fetchPatient();
    }, [apiUrl]);


    //Récupérer la visite
    useEffect(() => {
        const fetchPatient = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/medecin/login");
                return;
            }
    
            await axios.get(`${apiUrl}/dossier_medical/visite_details/${id}/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setFormData(response.data); 
                })
                .catch(error =>{
                    alert(error?.response?.data?.erreur || "Echec de la récupération !");
                    console.log(error)
                })
        }
    
        fetchPatient();
    }, [apiUrl, id]);


    const handleChange = (e: any) => {
        const { name, type, value, checked } = e.target;
      
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,  // Utilise 'checked' pour les checkboxes, 'value' pour le reste
        });
    };



    const handleSubmit = async (e:any) => {
        e.preventDefault();

        const access = localStorage.getItem('access_token');
        if (!access) {
            router.push('/medecin/login')
            return;
        }

        setIsSubmitted(true);

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key as keyof FormDataType] as Blob | string);
        }
        
        axios.put(`${apiUrl}/dossier_medical/visite/`, form,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(() =>{
            setIsSubmitted(false)
            alert('Visite modifiée avec succès');
            router.push(`/medecin/visites`)
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Echec de modification !");
            setIsSubmitted(false)
            console.error(error);   
        })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [router]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000); // Simule un chargement de données
    }, []);

    return loading ? (
        // Spinner de chargement
        <Loader/>
      ) : (
        <DefaultLayout>
            <Breadcrumb pageName="Modifier la visite" />

            <Link href="/medecin/visites">
                <button 
                    type="button"
                    className="flex mb-5 justify-center rounded-md text-sm lg:text-base uppercase font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-opacity-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="currentColor">
                        <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/>
                    </svg>
                </button>
            </Link>

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center lg:p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-auto w-full">
                        <div className="flex flex-col gap-9">
                        {/* File upload */}
                            <div className="rounded-lg border border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="font-medium text-base lg:text-lg text-black dark:text-white">
                                        Informations sur la visite médicale
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5 p-10">
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Date du prochain rendez-vous
                                        </label>
                                        <input
                                            type="datetime-local"
                                            name="dateRdv"
                                            required
                                            value={formData.dateRdv ? formatDateToLocal(formData.dateRdv) : ''}
                                            onChange={handleChange}
                                            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                           Motif de la visite
                                        </label>
                                        <textarea 
                                            name="motif"
                                            value={formData.motif}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            placeholder="Entrez le motif de la visite.."
                                            >
                                        </textarea>
                                    </div>

                                    {/* section patient */}
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Patient
                                        </label>
                                        <select
                                            name="patient"
                                            value={formData.patient}
                                            onChange={handleChange}
                                            required
                                            className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                                        >
                                            <option value="">Sélectionnez le patient concerné</option>
                                            {patients.map((patient) => (
                                            <option key={patient.id} value={patient.id}>
                                                {patient.nom}  {patient.prenom}
                                            </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* fin section patient */}

                                    {isSubmitted?(
                                        <div className="flex justify-end">
                                            <button type="submit" className={styles.waitingButton}>
                                                <span className={styles.waitingSpan}></span>
                                            </button>
                                        </div>
                                    ):(
                                        <div className="flex justify-end">
                                            <button className="flex btn-wide justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                                Modifier
                                            </button>
                                        </div>                                    
                                    )} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </DefaultLayout>
      )
};

export default UpdateVisite;
