import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import DefaultLayout from "@/components/Layout/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Loader from "@/common/Loader";
import Step1 from "@/components/DossierSteps/step1";
import Step2 from "@/components/DossierSteps/step2";
import Step3 from "@/components/DossierSteps/step3";
import Step4 from "@/components/DossierSteps/step4";
import Step5 from "@/components/DossierSteps/step5";
import Step6 from "@/components/DossierSteps/step6";

interface FormDataType {
    numDossier: string;
    antecedentPersonnel: string;
    carcinomeFamiliale: boolean;
    antecedentFamiliaux: string;
    ageDecouverte: number | null;
    effraCapsulaire: boolean;
    embonVasculaire: boolean;
    nbrCure: number | null;
    activiteCumule: number | null;
    thera: string;
    typeHisto: string;
    clasT: string;
    clasN: string;
    clasM: string;
    focalite: string;
    stade: string;
    risque: string;
    metastase: string[];
    curage: string[];
    circonstance: string[];
    cure1: string;
    cure2: string;
    cure3: string;
    cure4: string;
    cure5: string;
    cure6: string;
    cure7: string;
    cure8: string;
    cure9: string;
    cure10: string;
    bilan1: string;
    bilan2: string;
    bilan3: string;
    bilan4: string;
    bilan5: string;
    bilan6: string;
    bilan7: string;
    bilan8: string;
    bilan9: string;
    bilan10: string;
    examen1: string;
    examen2: string;
    examen3: string;
    examen4: string;
    examen5: string;
    examen6: string;
    examen7: string;
    examen8: string;
    examen9: string;
    examen10: string;
    defrenation1: string;
    defrenation2: string;
    defrenation3: string;
    defrenation4: string;
    defrenation5: string;
    resume: string;
    consigne: string;
    refrac: string;
    patient: number | null;
}

export const NewDossier: React.FC = () => {
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
        effraCapsulaire: false,
        embonVasculaire: false,
        nbrCure: null,
        activiteCumule: null,
        thera: "",
        typeHisto: "",
        clasT: "",
        clasN: "",
        clasM: "",
        focalite: "",
        stade: "",
        risque: "",
        metastase: [],
        curage: [],
        circonstance: [],
        cure1: "",
        cure2: "",
        cure3: "",
        cure4: "",
        cure5: "",
        cure6: "",
        cure7: "",
        cure8: "",
        cure9: "",
        cure10: "",
        bilan1: "",
        bilan2: "",
        bilan3: "",
        bilan4: "",
        bilan5: "",
        bilan6: "",
        bilan7: "",
        bilan8: "",
        bilan9: "",
        bilan10: "",
        examen1: "",
        examen2: "",
        examen3: "",
        examen4: "",
        examen5: "",
        examen6: "",
        examen7: "",
        examen8: "",
        examen9: "",
        examen10: "",
        defrenation1: "",
        defrenation2: "",
        defrenation3: "",
        defrenation4: "",
        defrenation5: "",
        resume: "",
        consigne: "",
        refrac: "",
        patient: null,
    });

    useEffect(() => {
        if (id) {
            setFormData((prevData) => ({
                ...prevData,
                patient: Number(id), // Assurez-vous que l'ID est un nombre
            }));
        }
    }, [id]); 

    // Gestion des changements des checkboxes pour les champs JSON
    const handleCheckboxChange = (fieldName: string, value: string, isChecked: boolean) => {
        setFormData((prevData) => {
             // Vérifier si la propriété est un tableau, sinon initialiser comme tableau vide
            const fieldArray = Array.isArray(prevData[fieldName as keyof FormDataType])
            ? (prevData[fieldName as keyof FormDataType] as string[])
            : [];

            const updatedField = isChecked
                ? [...(prevData[fieldName as keyof FormDataType] as string[]), value]
                : (prevData[fieldName as keyof FormDataType] as string[]).filter(
                      (item) => item !== value
                  );
            return {
                ...prevData,
                [fieldName]: updatedField,
            };
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

        for (const [key, value] of form.entries()) {
            console.log(`${key}: ${value}`);
        }
        

        axios
            .post(`${apiUrl}dossier_medical/dossier/`, form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${access}`,
                },
            })
            .then((response) => {
                setIsSubmitted(false);
                alert("Dossier créé avec succès");
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
            <Breadcrumb pageName="Enregistrer le dossier" />

            <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                    <Step1
                        formData={formData}
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange}
                        nextStep={nextStep}
                    />
                )}
                {currentStep === 2 && (
                    <Step2
                        formData={formData}
                        handleChange={handleChange}
                        handleCheckboxChange={handleCheckboxChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 3 && (
                    <Step3
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 4 && (
                    <Step4
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 5 && (
                    <Step5
                        formData={formData}
                        handleChange={handleChange}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}
                {currentStep === 6 && (
                    <Step6
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

export default NewDossier;
