//Informations générales, diagnostics et circonstance de découverte
import React from "react";
import { useState, useEffect } from "react";


const METASTASE_OPTIONS = [
    { value: "Ganglionaire", label: "Ganglionaire" },
    { value: "Pulmonaire", label: "Pulmonaire" },
    { value: "Oseuse", label: "Osseuse" },
    { value: "Hépatique", label: "Hépatique" },
    { value: "Cerebrale", label: "Cérébrale" },
    { value: "Autres", label: "Autres" },
];


const CURAGE_OPTIONS = [
    { value: "1temps", label: "1 temps" },
    { value: "2temps", label: "2 temps" },
    { value: "curage", label: "Curage" },
];


export default function Etape2({prevStep, formData, nextStep }) {
    const [metastaseOptions, setMetastaseOptions] = useState([]);

    

    return (
      <>
        <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="w-full">
                <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            Classifications
                        </h3>
                    </div>
                    {/* SECTION INFORMATIONS GÉNÉRALES */}
                    <div className="flex flex-col gap-5 p-10">
                        {/* section clasT */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Classification T
                            </label>
                            <select
                                id="clasT"
                                name="clasT"
                                value={formData.clasT}
                                readOnly
                                className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Sélectionnez...</option>
                                <option value="Tx">Tx</option>
                                <option value="T0">T0</option>
                                <option value="T1a">T1a</option>
                                <option value="T1b">T1b</option>
                                <option value="T2">T2</option>
                                <option value="T3a">T3a</option>
                                <option value="T3b">T3b</option>
                                <option value="T4a">T4a</option>
                                <option value="T4b">T4b</option>
                            </select>
                        </div>
                        {/* fin section clasT */}

                        {/* section clasM */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Classification M
                            </label>
                            <select
                                id="clasM"
                                name="clasM"
                                value={formData.clasM}
                                readOnly
                                className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Sélectionnez...</option>
                                <option value="Mx">Mx</option>
                                <option value="M0">M0</option>
                                <option value="M1">M1</option>
                            </select>
                        </div>
                        {/* section clasM */}

                        {/* section clasN */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Classification N
                            </label>
                            <select
                                id="clasN"
                                name="clasN"
                                value={formData.clasN}
                                readOnly
                                className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Sélectionnez...</option>
                                <option value="Nx">Nx</option>
                                <option value="N0">N0</option>
                                <option value="N1a">N1a</option>
                                <option value="N1b">N1b</option>
                            </select>
                        </div>
                        {/* section clasN */}

                        {/* section Multifocalité */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Multifocalité
                            </label>
                            <select
                                id="focalite"
                                name="focalite"
                                value={formData.focalite}
                                readOnly
                                className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Sélectionnez...</option>
                                <option value="Uni">Unifocale</option>
                                <option value="Bi">Bifocale</option>
                                <option value="Multi">Multifocale</option>
                            </select>
                        </div>
                        {/* fin section Multifocalité */}

                        {/* section Effraction Capsulaire */}
                        <div >
                            <label className="label cursor-pointer">
                            <span className="label-text text-sm text-black dark:text-white mr-5">Effraction Capsulaire</span>
                            <input 
                                type="checkbox" 
                                name="effraCapsulaire"
                                checked={formData.effraCapsulaire}
                                readOnly
                                className="checkbox checkbox-primary" />
                            </label>
                        </div>
                        {/* fin section Effraction Capsulaire */}

                        {/* section Embole Vasculaire */}
                        <div >
                            <label className="label cursor-pointer">
                            <span className="label-text text-sm text-black dark:text-white mr-5">Embole Vasculaire</span>
                            <input 
                                type="checkbox" 
                                name="embonVasculaire"
                                checked={formData.embonVasculaire}
                                readOnly
                                className="checkbox checkbox-primary" />
                            </label>
                        </div>
                        {/* fin section Embole Vasculaire */}

                        {/* section Stade */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Stade
                            </label>
                            <select
                                id="stade"
                                name="stade"
                                value={formData.stade}
                                readOnly
                                className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Sélectionnez...</option>
                                <option value="I">Stade I</option>
                                <option value="II">Stade II</option>
                                <option value="III">Stade III</option>
                                <option value="IVA">Stade IVA</option>
                                <option value="IVB">Stade IVB</option>
                            </select>
                        </div>
                        {/* fin section Stade */}

                        {/* section Risques */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Risque
                            </label>
                            <select
                                id="risque"
                                name="risque"
                                value={formData.risque}
                                readOnly
                                className="w-full text-sm lg:text-base rounded-lg border border-stroke bg-transparent p-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-blue-950 dark:text-white dark:focus:border-primary"
                            >
                                <option value="">Sélectionnez...</option>
                                <option value="Faible">Faible</option>
                                <option value="Intermédiaire">Intermédiaire</option>
                                <option value="Haut">Haut</option>
                            </select>
                        </div>
                        {/* fin section Risques */}
                    </div>

                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            Métastase et Traitements
                        </h3>
                    </div>
                    
                    <div className="flex flex-col gap-5 p-10"> 
                    <div className="flex justify-between">      
                        {/* section Metastase */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Métastase:
                            </label>
                            <div className="space-y-2">
                                {METASTASE_OPTIONS.map((option) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={option.value}
                                            value={option.value}
                                            checked={Array.isArray(formData.metastase) && formData.metastase.includes(option.value)}
                                            readOnly
                                            className="checkbox checkbox-primary"
                                        />
                                        <label htmlFor={option.value} className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}

                                {/* Afficher le champ texte si "Autre" est coché */}
                                {Array.isArray(formData.metastase) && formData.metastase.includes("Autres") && (
                                    <div className="mt-4">
                                        <label
                                            htmlFor="metastaseOptions"
                                            className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-400"
                                        >
                                            Veuillez préciser :
                                        </label>
                                        <input
                                            type="text"
                                            id="metastaseOptions"
                                            value={metastaseOptions}
                                            readOnly
                                            className="w-full rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                            placeholder="Précisez votre réponse"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* fin section Métastase */}

                        {/* section CURAGE */}
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Totalisation Chirugicale:
                            </label>
                            <div className="space-y-2">
                                {CURAGE_OPTIONS.map((option) => (
                                    <div key={option.value} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={option.value}
                                            value={option.value}
                                            checked={Array.isArray(formData.curage) && formData.curage.includes(option.value)}
                                            readOnly
                                            className="checkbox checkbox-primary"
                                        />
                                        <label htmlFor={option.value} className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* fin section CURAGE */}
                    </div> 

                    {/* section nombre de cure */}
                    <div>
                        <label className="mb-3 block text-sm text-black dark:text-white">
                            Nombre de Cure:
                        </label>
                        <input
                            type="number"
                            name="nbrCure"
                            value={formData.nbrCure}
                            readOnly
                            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                        />
                    </div>
                    {/* fin section nombre de cures */}

                    {/* Section activités cumulées */}
                    <div>
                        <label className="mb-3 block text-sm text-black dark:text-white">
                            activités Cumulées :
                        </label>
                        <input
                            type="number"
                            name="activiteCumule"
                            value={formData.activiteCumule}
                            readOnly
                            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                        />
                    </div>
                    {/* Fin section activités cumulées */}

                    {/* section autre thérapeutiques */}
                    <div>
                        <label className="mb-3 block text-sm text-black dark:text-white">
                            Autres thérapeutiques :
                        </label>
                        <textarea 
                            name="thera"
                            value={formData.thera}
                            readOnly
                            className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                            placeholder="Entrez les antécédents du patient.."
                            >
                        </textarea>
                    </div>
                    {/* fin section autre thérapeutiques */}
                    </div>
                    
                    <div className="flex justify-between">  
                        <button 
                            type="button" 
                            onClick={prevStep} 
                            className="flex justify-center rounded-2xl bg-blue-800 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/></svg>
                        </button>

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