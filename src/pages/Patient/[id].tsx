import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import styles from "../../styles/common.module.css"
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Link from "next/link";


interface FormDataType {
    id : number;
    nom : string;
    prenom : string;
    age : number;
    annee_naissance : number;
    sexe : string;
    adresse : string;
    telephone : string;
}

export const UpdatePatient: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { id } = router.query; // Récupérer l'ID depuis l'URL
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [formData, setFormData] = useState<FormDataType>({
        id : 0,
        nom : "",
        prenom : "",
        age : 0,
        annee_naissance : 0,
        sexe : "",
        adresse : "",
        telephone : ""
    });

    //Récupérer les patients du docteur en ligne
    useEffect(() => {
        const fetchPatient = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/doctorLogin");
                return;
            }
    
            await axios.get(`${apiUrl}dossier_medical/patients/${id}/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    const currentYear = new Date().getFullYear();
                    setFormData(response.data); // Enregistre les Patients dans le state
                    const calculatedYear = currentYear - response.data['age'];
                    setFormData((prevState) => ({
                        ...prevState,
                        annee_naissance: calculatedYear,
                    }));
                })
                .catch(error =>{
                    //alert(error.response.data.erreur[0])
                    console.error('Échec de la récupération des patients');
                    console.log(error)
                })
        }
    
        fetchPatient();
    }, [apiUrl, id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        
        axios.put(`${apiUrl}dossier_medical/patient/`, form,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(() =>{
            setIsSubmitted(false)
            alert('Patient modifié avec succès');
            router.push(`/listePatients`)
        })
        .catch(error =>{
            setIsSubmitted(false)
            //alert(error.response.data.non_field_errors[0])
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
            <Breadcrumb pageName={`Détails du patient ${formData.nom} ${formData.prenom}`} />

            <Link href="/listePatients">
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
                <div className="flex justify-center items-center p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-auto w-full">
                        <div className="flex flex-col gap-9">
                        {/* File upload */}
                            <div className="rounded-lg border border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="font-medium text-base lg:text-lg text-black dark:text-white">
                                        Enregistrer un Nouveau Patient
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5 p-10">
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Nom du Patient
                                        </label>
                                        <input
                                            type="text"
                                            name="nom"
                                            value={formData.nom}
                                            onChange={handleChange}
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Prénom du patient
                                        </label>
                                        <input
                                            type="text"
                                            name="prenom"
                                            value={formData.prenom}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>

                                    {/* section sexe */}
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Sexe du patient:
                                        </label>
                                        <select
                                            id="sexe"
                                            name="sexe"
                                            value={formData.sexe}
                                            onChange={handleChange}
                                            required
                                            className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                                        >
                                            <option value="">Sélectionnez...</option>
                                            <option value="M">Masculin</option>
                                            <option value="F">Féminin</option>
                                        </select>
                                    </div>
                                    {/* fin section sexe */}

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Année de naissance du patient
                                        </label>
                                        <input
                                            type="number"
                                            name="annee_naissance"
                                            value={formData.annee_naissance}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Adresse du patient
                                        </label>
                                        <input
                                            type="text"
                                            name="adresse"
                                            value={formData.adresse}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Contact du patient
                                        </label>
                                        <input
                                            type="text"
                                            name="telephone"
                                            value={formData.telephone}
                                            onChange={handleChange}
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            required
                                        />
                                    </div>
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

export default UpdatePatient;
