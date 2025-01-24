//Informations générales, diagnostics et circonstance de découverte
import React from "react";

export default function Step6({ formData, handleChange,prevStep, isSubmitted}) {
    
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les defrenations.."
                                >
                            </textarea>
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

            <div className="w-full">  
                {/* SECTION ASSURANCE */}
                    <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
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
                                        onChange={handleChange}
                                        className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                        placeholder="Entrez les consignes.."
                                        >
                                    </textarea>
                                </div>
                            </div>
                            
                            {isSubmitted?(
                                <div className="flex justify-end">
                                    <button type="submit" className="flex btn-wide justify-center rounded-md bg-blue-500 text-white text-sm lg:text-base uppercase p-2 font-medium hover:bg-opacity-90">
                                        <span className="loading loading-dots loading-lg bg-white"></span>
                                    </button>
                                </div>
                            ):(
                                <div className="flex justify-end">
                                    <button 
                                        type="submit" 
                                        className="flex justify-center rounded-2xl bg-blue-800 text-white text-sm lg:text-base uppercase p-2 font-medium text-gray hover:bg-opacity-90">
                                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="20px" fill="#FFFFFF"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q32 0 62-6t58-17l60 61q-41 20-86 31t-94 11Zm280-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM424-296 254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>                            
                                    </button>
                                </div>                                   
                            )} 
                    </div>
                {/* FIN SECTION PARTIE2 BILAN */}
            </div>
        </div>
      </>
    );
  }