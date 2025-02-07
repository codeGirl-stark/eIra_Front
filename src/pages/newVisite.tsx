import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import styles from "../styles/common.module.css"
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Link from "next/link";


interface FormDataType {
    dateRdv : Date|any;
    motif : string;
    patient : string;
}

interface PatientInterface {
    id : number;
    nom : string;
    prenom : string;
}

export const NewVisite: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [patients, setPatients] = useState<PatientInterface[]>([]);

    const [formData, setFormData] = useState<FormDataType>({
        dateRdv : "",
        motif : "",
        patient : "",
    });

     //Récupérer les patients du docteur en ligne
     useEffect(() => {
        const fetchPatient = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/doctorLogin");
                return;
            }
    
            await axios.get(`${apiUrl}/dossier_medical/patient/`, {
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
            router.push('/doctorLogin')
            return;
        }

        setIsSubmitted(true);

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key as keyof FormDataType] as Blob | string);
        }
        
        axios.post(`${apiUrl}/dossier_medical/visite/`, form,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(() =>{
            setIsSubmitted(false)
            alert('Visite enregistrée avec succès');
            router.push('visites')
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Erreur lors de l'enregistrement !");
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
            <Breadcrumb pageName="Nouvelle Visite Médicale" />

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center lg:p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-auto w-full">
                        <div className="flex flex-col gap-9">
                        {/* File upload */}
                            <div className="rounded-lg border border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="font-medium text-base lg:text-lg text-black dark:text-white">
                                        Enregistrer une Nouvelle Visite  Médicale
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
                                            value={formData.dateRdv}
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

                                    <div className="flex flex-col lg:justify-between">  
                                        <Link href="/newPatient" className="dark:text-white flex mb-5 ">
                                            <svg 
                                                className="fill-current duration-300 ease-in-out"
                                                xmlns="http://www.w3.org/2000/svg" 
                                                height="18px" 
                                                viewBox="0 -960 960 960" 
                                                width="24px" 
                                                fill="none">
                                                <path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                                            </svg>
                                                Nouveau patient
                                        </Link>

                                        {isSubmitted?(
                                            <div className="flex justify-end">
                                                <button type="submit" className={styles.waitingButton}>
                                                    <span className={styles.waitingSpan}></span>
                                                </button>
                                            </div>
                                        ):(
                                            <div className="flex justify-end">
                                                <button className="flex btn-wide justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                                    Enregistrer
                                                </button>
                                            </div>                                    
                                        )} 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </DefaultLayout>
      )
};

export default NewVisite;
