//Informations générales, diagnostics et circonstance de découverte
import React from "react";

export default function Etape4({ formData,prevStep, nextStep }) {
    
    return (
        <>
          <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="w-full ">
                {/* SECTION BILAN */}
                <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            BILANS
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5 p-10">
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 1 :
                            </label>
                            <textarea 
                                name="bilan1"
                                value={formData.bilan1}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 2 :
                            </label>
                            <textarea 
                                name="bilan2"
                                value={formData.bilan2}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 3 :
                            </label>
                            <textarea 
                                name="bilan3"
                                value={formData.bilan3}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 4 :
                            </label>
                            <textarea 
                                name="bilan4"
                                value={formData.bilan4}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 5 :
                            </label>
                            <textarea 
                                name="bilan5"
                                value={formData.bilan5}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 6 :
                            </label>
                            <textarea 
                                name="bilan6"
                                value={formData.bilan6}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 7 :
                            </label>
                            <textarea 
                                name="bilan7"
                                value={formData.bilan7}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 8 :
                            </label>
                            <textarea 
                                name="bilan8"
                                value={formData.bilan8}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 9 :
                            </label>
                            <textarea 
                                name="bilan9"
                                value={formData.bilan9}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Bilan 10 :
                            </label>
                            <textarea 
                                name="bilan10"
                                value={formData.bilan10}
                                readOnly
                                className="w-full cursor-pointer rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les bilans.."
                                >
                            </textarea>
                        </div>
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
                {/* FIN SECTION PARTIE1 BILAN */}
            </div>
          </div>
        </>
      );
  }