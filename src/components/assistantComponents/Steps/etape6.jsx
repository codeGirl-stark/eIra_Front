//Informations générales, diagnostics et circonstance de découverte
import React from "react";

export default function Step6({ formData,prevStep}) {

    return (
      <>
        <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="w-full ">
                {/* SECTION DÉFRÉNATION */}
                <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            DÉFRÉNATIONS
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5 p-10">
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Défrénation 1 :
                            </label>
                            <textarea 
                                name="defrenation1"
                                value={formData.defrenation1}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les defrenations.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Défrénation 2 :
                            </label>
                            <textarea 
                                name="defrenation2"
                                value={formData.defrenation2}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les defrenations.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Défrénation 3 :
                            </label>
                            <textarea 
                                name="defrenation3"
                                value={formData.defrenation3}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les defrenations.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Défrénation 4 :
                            </label>
                            <textarea 
                                name="defrenation4"
                                value={formData.defrenation4}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les defrenations.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Défrénation 5 :
                            </label>
                            <textarea 
                                name="defrenation5"
                                value={formData.defrenation5}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les defrenations.."
                                >
                            </textarea>
                        </div>

                        <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                            <h3 className="text-base lg:text-sm text-black dark:text-white">
                                RÉSUMÉS ET CONSIGNES
                            </h3>
                        </div>


                        <div className="flex flex-col gap-5 p-10">
                                {/* section Réfractaire */}
                                <div >
                                    <label className="label ">
                                    <span className="label-text text-sm text-black dark:text-white mr-5">Réfractaire</span>
                                    <input 
                                        type="checkbox" 
                                        name="refrac"
                                        checked={formData.refrac}
                                        readOnly
                                        className="checkbox checkbox-primary" />
                                    </label>
                                </div>
                                {/* fin section Réfractaire */}   
                                <div>
                                    <label className="mb-3 block text-sm text-black dark:text-white">
                                        Résumé :
                                    </label>
                                    <textarea 
                                        name="resume"
                                        value={formData.resume}
                                        readOnly
                                        className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                        placeholder="Saisissez un résumé.."
                                        >
                                    </textarea>
                                </div>

                                <div>
                                    <label className="mb-3 block text-sm text-black dark:text-white">
                                        Consignes :
                                    </label>
                                    <textarea 
                                        name="consigne"
                                        value={formData.consigne}
                                        readOnly
                                        className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                        placeholder="Entrez les consignes.."
                                        >
                                    </textarea>
                                </div> 
                            </div>
                    </div>

                    <div className="flex justify-start">  
                        <button 
                            type="button" 
                            onClick={prevStep} 
                            className="flex justify-center rounded-2xl bg-blue-800 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                            <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="m287-446.67 240 240L480-160 160-480l320-320 47 46.67-240 240h513v66.66H287Z"/></svg>
                        </button>
                    </div>
                </div>
                {/* FIN SECTION PARTIE1 BILAN */}
            </div>
        </div>
      </>
    );
  }