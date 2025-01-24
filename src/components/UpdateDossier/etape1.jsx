//Informations générales, diagnostics et circonstance de découverte
import React from "react";
import { useState } from "react";


const CIRCONSTANCE_OPTIONS = [
    { value: "Nodule", label: "Nodule" },
    { value: "DecouverteFortuite", label: "Découverte Fortuite" },
    { value: "gnm", label: "GNM" },
    { value: "adp", label: "ADP" },
    { value: "Metastase", label: "Métastase" },
    { value: "Autres", label: "Autres" },
];


export default function Etape1({ formData, handleChange,handleCheckboxChange, nextStep }) {
    const [otherText, setOtherText] = useState("");

// Gestion du changement pour le champ "Autre"
const handleOtherTextChange = (e) => {
    const value = e.target.value;
    setOtherText(value);

     // Mettre à jour directement dans formData
     handleChange({
        target: {
            name: "circonstance",
            value: value,
        },
    });

    // Ajouter dynamiquement "Autres" au tableau circonstance si nécessaire
    if (!formData.circonstance.includes("Autres")) {
        handleCheckboxChange("circonstance", "Autres", true);
    }
};

const handleOtherCheckbox = (isChecked) => {
    if (!isChecked) {
        // Si décoché, retirer "Autre" et son texte
        setOtherText("");
        handleCheckboxChange("circonstance", "Autres", false);
    } else {
        handleCheckboxChange("circonstance", "Autres", true);
    }
};


// Synchroniser `otherText` avec `formData` lorsqu'il est initialisé
React.useEffect(() => {
    if (formData.otherText) {
        setOtherText(formData.otherText);
    }
}, [formData.otherText]);
    
    return (
      <>
        <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="w-full">
                {/* SECTION INFORMATIONS GÉNÉRALES */}
                <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            Informations générales
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5 p-10">
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Numéro du dossier
                            </label>
                            <input
                                type="text"
                                name="numDossier"
                                value={formData.numDossier}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Antécédents Personnel
                            </label>
                            <textarea 
                                name="antecedentPersonnel"
                                value={formData.antecedentPersonnel}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les antécédents du patient.."
                            >
                            </textarea>
                        </div>

                        {/* section carcinomeFamiliale */}
                        <div >
                            <label className="label ">
                                <span className="label-text text-sm text-black dark:text-white mr-5">Carcinome Familial</span>
                                <input 
                                    type="checkbox" 
                                    name="carcinomeFamiliale"
                                    checked={formData.carcinomeFamiliale}
                                    onChange={handleChange}
                                    className="checkbox checkbox-primary" />
                            </label>
                        </div>
                        {/* fin section carcinomeFamiliale */}

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Antécédents Familiaux
                            </label>
                            <textarea 
                                name="antecedentFamiliaux"
                                value={formData.antecedentFamiliaux}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les antécédents du patient.."
                                >
                            </textarea>
                        </div>
                    </div>

                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            Diagnostics
                        </h3>
                    </div>
                    
                    <div className="flex flex-col gap-5 p-10">   
                        {/* section ageDecouverte */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Age de découverte
                            </label>
                            <input
                                type="number"
                                name="ageDecouverte"
                                value={formData.ageDecouverte ?? ""}
                                onChange={handleChange}                            
                                className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                            />
                        </div>
                        {/* fin section ageDecouverte */}

                        {/* section Type Histologique */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Type Histologique:
                            </label>
                            <select
                                id="typeHisto"
                                name="typeHisto"
                                value={formData.typeHisto}
                                onChange={handleChange}
                                className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Sélectionnez...</option>
                                <option value="Papillaire">Papillaire</option>
                                <option value="Vesiculaire">Vesiculaire</option>
                                <option value="PapilloVesiculaire">PapilloVesiculaire</option>
                                <option value="Medullaire">Medullaire</option>
                                <option value="Anaplasique">Anaplasique</option>
                                <option value="Autres">Autres</option>
                            </select>
                        </div>
                        {/* fin section Type Histologique */}

                        {/* section Circonstance de découverte */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Circonstance de découverte
                            </label>
                            <div className="space-y-2">
                                {CIRCONSTANCE_OPTIONS.map((option) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={option.value}
                                            value={option.value}
                                            checked={Array.isArray(formData.circonstance) && formData.circonstance.includes(option.value)}
                                            onChange={(e) => {
                                                if (option.value === "Autres") {
                                                    handleOtherCheckbox(e.target.checked);
                                                } else {
                                                    handleCheckboxChange(
                                                        "circonstance",
                                                        option.value,
                                                        e.target.checked
                                                    );
                                                }
                                            }}
                                            className="checkbox checkbox-primary"
                                        />
                                        <label htmlFor={option.value} className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}

                                {/* Afficher le champ texte si "Autre" est coché */}
                                {Array.isArray(formData.circonstance) && formData.circonstance.includes("Autres") && (
                                    <div className="mt-4">
                                        <label
                                            htmlFor="otherText"
                                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Veuillez préciser :
                                        </label>
                                        <input
                                            type="text"
                                            id="otherText"
                                            value={otherText}
                                            onChange={handleOtherTextChange}
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            placeholder="Précisez votre réponse"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* fin section Circonstance de découverte */}
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="button" 
                            onClick={nextStep} 
                            className="flex justify-center rounded-2xl bg-blue-800 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M673-446.67H160v-66.66h513l-240-240L480-800l320 320-320 320-47-46.67 240-240Z"/></svg>
                        </button>
                    </div>
                </div>
                {/* FIN SECTION INFORMATIONS ET AUTORISATIONS */}
            </div>
        </div>  
      </>
    );
  }