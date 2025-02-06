import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import styles from "../styles/common.module.css"
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";


interface FormDataType {
    nom : string;
    prenom : string;
    age : number;
    annee_naissance : number;
    sexe : string;
    adresse : string;
    telephone : string;
}

export const NewPatient: React.FC = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState<FormDataType>({
        nom : "",
        prenom : "",
        age : 0,
        annee_naissance : 0,
        sexe : "",
        adresse : "",
        telephone : ""
    });


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
        
        axios.post(`${apiUrl}/dossier_medical/patient/`, form,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            }
        })
        .then(response =>{
            setIsSubmitted(false)
            alert('Patient enregistré avec succès');
            router.push(`/Dossiers/${response.data["id"]}`)
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
            <Breadcrumb pageName="Nouveau Patient" />

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
                                            className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
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
                                                Enregistrer
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

export default NewPatient;
