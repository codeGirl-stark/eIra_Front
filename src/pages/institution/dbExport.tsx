import axios from "axios";
import Loader from "@/common/Loader";
import { useRouter } from "next/router";
import {useState, useEffect} from "react";
import styles from "../../styles/common.module.css"
import DefaultLayout from "@/components/institutionComponents/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

interface FormDataType {
    format: string;
}

export const NewVisite: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);


    const [formData, setFormData] = useState<FormDataType>({
        format:""
    });


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
            router.push('/institution/login')
            return;
        }

        setIsSubmitted(true);

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key as keyof FormDataType] as Blob | string);
        }
        
        axios.post(`${apiUrl}/medecin/export/`, form,{
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${access}`,  // Si authentification requise
            },
            responseType: "blob",
        })
        .then(response =>{
            setIsSubmitted(false)
            // Gérer le téléchargement du fichier
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", `base.${formData.format}`); // Nom du fichier en fonction du format
            document.body.appendChild(fileLink);
            fileLink.click();
            document.body.removeChild(fileLink);

            //router.push('visites')
        })
        .catch(error =>{
            alert(error?.response?.data?.erreur || "Erreur lors du téléchargement !");
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
            <Breadcrumb pageName="Base de données" />

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center items-center p-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mx-auto w-full">
                        <div className="flex flex-col gap-9">
                        {/* File upload */}
                            <div className="rounded-lg border border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                                <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                                    <h3 className="font-medium text-base lg:text-lg text-black dark:text-white">
                                        Exporter la base de données
                                    </h3>
                                </div>
                                <div className="flex flex-col gap-5 p-10">
                                    {/* section format */}
                                    <div>
                                        <label className="mb-3 block text-sm text-black dark:text-white">
                                            Format d&apos;exportation de la base de données:
                                        </label>
                                        <select
                                            id="format"
                                            name="format"
                                            value={formData.format}
                                            onChange={handleChange}
                                            required
                                            className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                                        >
                                            <option value="">Sélectionnez le format d&apos;exportation</option>
                                            <option value="csv">CSV</option>
                                            <option value="mysql">MYSQL</option>
                                        </select>
                                    </div>
                                    {/* fin section format */}

                                    {isSubmitted?(
                                            <div className="flex justify-end">
                                                <button type="submit" className={styles.waitingButton}>
                                                    <span className={styles.waitingSpan}></span>
                                                </button>
                                            </div>
                                        ):(
                                            <div className="flex justify-end">
                                                <button className="flex btn-wide justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                                    Exporter
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

export default NewVisite;
