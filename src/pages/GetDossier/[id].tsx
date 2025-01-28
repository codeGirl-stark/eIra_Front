import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader";
import Etape1 from "@/components/UpdateDossier/etape1";
import Etape2 from "@/components/UpdateDossier/etape2";
import Etape3 from "@/components/UpdateDossier/etape3";
import Etape4 from "@/components/UpdateDossier/etape4";
import Etape5 from "@/components/UpdateDossier/etape5";
import Etape6 from "@/components/UpdateDossier/etape6";
import Link from "next/link";

interface FormDataType {
    numDossier: string;
    antecedentPersonnel: string;
    carcinomeFamiliale: boolean;
    antecedentFamiliaux: string;
    ageDecouverte: number | null;
    typeHisto: string;
    clasT: string;
    clasN: string;
    clasM: string;
    focalite: string;
    effraCapsulaire: boolean;
    embonVasculaire: boolean;
    stade: string;
    risque: string;
    metastase: string[];
    nbrCure: number | null;
    activiteCumule: number | null;
    thera: string;
    curage: string[];
    circonstance: string[];
    cures: string[];
    defrenations: string[];
    bilans: string[];
    examens: string[];
    resume: string;
    consigne: string;
    refrac: string;
    patient: number | null;
}

export const GetDossier: React.FC = () => {
    const router = useRouter();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const { id } = router.query; // Récupérer l'ID depuis l'URL
    const [loading, setLoading] = useState<boolean>(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);


    const [formData, setFormData] = useState<FormDataType>({
        numDossier: "",
        antecedentPersonnel: "",
        carcinomeFamiliale: false,
        antecedentFamiliaux: "",
        ageDecouverte: null,
        typeHisto: "",
        clasT: "",
        clasN: "",
        clasM: "",
        focalite: "",
        effraCapsulaire: false,
        embonVasculaire: false,
        stade: "",
        risque: "",
        metastase: [],
        nbrCure: null,
        activiteCumule: null,
        thera: "",
        curage: [],
        circonstance: [],
        cures: [],
        defrenations: [],
        bilans: [],
        examens: [],
        resume: "",
        consigne: "",
        refrac: "",
        patient: null,
    });


    //Récupérer le dossier médical du patient selectionné
    useEffect(() => {
        const fetchDossier = async () => {
            const access = localStorage.getItem('access_token');
            if (!access) {
                router.push("/doctorLogin");
                return;
            }
    
            await axios.get(`${apiUrl}dossier_medical/dossier/${id}/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access}`,
                }
            })
                .then(response =>{
                    setFormData(response.data); // Enregistre les Patients dans le state
                    const formattedDateRDV = new Date(response.data.dateRdv).toISOString().slice(0, 16); // Génère "YYYY-MM-DDTHH:mm"
                    setFormData((prevState) => ({
                        ...prevState,
                        dateRdv:formattedDateRDV,
                    }));
                })
                .catch(error =>{
                    //alert(error.response.data.erreur[0])
                    console.error('Échec de la récupération du dossier médical');
                    console.log(error)
                })
        }
    
        fetchDossier();
    }, [apiUrl, id]);

    useEffect(() => {
        if (id) {
            setFormData((prevData) => ({
                ...prevData,
                patient: Number(id), // Assurez-vous que l'ID est un nombre
            }));
        }
    }, [id]);


    const handleCheckboxChange = (
        fieldName: keyof FormDataType,
        value: string,
        isChecked: boolean
      ) => {
        setFormData((prevData) => {
          // Vérifiez que prevData[fieldName] est un tableau, sinon initialisez-le comme tableau vide
          const fieldValue = Array.isArray(prevData[fieldName])
            ? (prevData[fieldName] as string[])
            : [];
      
          if (isChecked) {
            // Ajouter la valeur si elle n'existe pas déjà
            return {
              ...prevData,
              [fieldName]: [...fieldValue, value],
            };
          } else {
            // Retirer la valeur si elle existe
            return {
              ...prevData,
              [fieldName]: fieldValue.filter((item) => item !== value),
            };
          }
        });
    };
      

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const target = e.target;

        if (target instanceof HTMLInputElement) {
            if (target.type === "checkbox") {
                setFormData((prevData) => ({
                    ...prevData,
                    [target.name]: target.checked,
                }));
            } else {
                setFormData((prevData) => ({
                    ...prevData,
                    [target.name]: target.value,
                }));
            }
        } else if (
            target instanceof HTMLSelectElement ||
            target instanceof HTMLTextAreaElement
        ) {
            setFormData((prevData) => ({
                ...prevData,
                [target.name]: target.value,
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const access = localStorage.getItem("access_token");
        if (!access) {
            router.push("/doctorLogin");
            return;
        }

        setIsSubmitted(true);

        const form = new FormData();

        for (const key in formData) {
            const value = formData[key as keyof FormDataType];

            if (Array.isArray(value)) {
                form.append(key, JSON.stringify(value));
            } else {
                form.append(key, value as string);
            }
        }

        axios
            .put(`${apiUrl}dossier_medical/dossier/`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${access}`,
                },
            })
            .then(() => {
                setIsSubmitted(false);
                alert("Dossier modifié avec succès");
                router.push("/listePatients");
            })
            .catch((error) => {
                setIsSubmitted(false);
                console.error(error);
            });
    };

    const nextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        setCurrentStep(currentStep - 1);
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
            <Breadcrumb pageName={`Dossier médical ${formData.numDossier}`} />

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
                {currentStep === 1 && (
                    <Etape1
                        formData={formData}
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange}
                        nextStep={nextStep}
                    />
                )}
                {currentStep === 2 && (
                    <Etape2
                        formData={formData}
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 3 && (
                    <Etape3
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 4 && (
                    <Etape4
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 5 && (
                    <Etape5
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 6 && (
                    <Etape6
                        formData={formData}
                        handleChange={handleChange}
                        prevStep={prevStep}
                        isSubmitted = {isSubmitted}
                    />
                )}
            </form>
        </DefaultLayout>
    );
};

export default GetDossier;
