import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/admin/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader";
import Etape1 from "@/components/admin/InfoDossierPatient/etape1";
import Etape2 from "@/components/admin/InfoDossierPatient/etape2";
import Etape3 from "@/components/admin/InfoDossierPatient/etape3";
import Etape4 from "@/components/admin/InfoDossierPatient/etape4";
import Etape5 from "@/components/admin/InfoDossierPatient/etape5";
import Etape6 from "@/components/admin/InfoDossierPatient/etape6";
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
                router.push("/admin/login");
                return;
            }
    
            await axios.get(`${apiUrl}/dossier_medical/dossier/${id}/`, {
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
                    alert(error?.response?.data?.erreur || "Erreur lors du chargement du dossier !");
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

            <Link href="/admin/allPatients">
                <button 
                    type="button"
                    className="flex mb-5 justify-center rounded-md text-sm lg:text-base uppercase font-bold text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-opacity-90"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="currentColor">
                        <path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/>
                    </svg>
                </button>
            </Link>

            <form>
                {currentStep === 1 && (
                    <Etape1
                        formData={formData}
                        nextStep={nextStep}
                    />
                )}
                {currentStep === 2 && (
                    <Etape2
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 3 && (
                    <Etape3
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 4 && (
                    <Etape4
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 5 && (
                    <Etape5
                        formData={formData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 6 && (
                    <Etape6
                        formData={formData}
                        prevStep={prevStep}
                    />
                )}
            </form>
        </DefaultLayout>
    );
};

export default GetDossier;
