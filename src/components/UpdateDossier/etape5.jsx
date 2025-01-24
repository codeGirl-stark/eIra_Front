//Informations générales, diagnostics et circonstance de découverte
import React from "react";

export default function Etape5({ formData, handleChange,prevStep, nextStep}) {
    
    return (
      <>
        <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="w-full ">
                {/* SECTION EXAMENS */}
                <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            EXAMENS COMPLÉMENTAIRES
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5 p-10">
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 1 :
                            </label>
                            <textarea 
                                name="examen1"
                                value={formData.examen1}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 2 :
                            </label>
                            <textarea 
                                name="examen2"
                                value={formData.examen2}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 3 :
                            </label>
                            <textarea 
                                name="examen3"
                                value={formData.examen3}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 4 :
                            </label>
                            <textarea 
                                name="examen4"
                                value={formData.examen4}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 5 :
                            </label>
                            <textarea 
                                name="examen5"
                                value={formData.examen5}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div> 
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 6 :
                            </label>
                            <textarea 
                                name="examen6"
                                value={formData.examen6}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 7 :
                            </label>
                            <textarea 
                                name="examen7"
                                value={formData.examen7}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 8 :
                            </label>
                            <textarea 
                                name="examen8"
                                value={formData.examen8}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 9 :
                            </label>
                            <textarea 
                                name="examen9"
                                value={formData.examen9}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Examen 10 :
                            </label>
                            <textarea 
                                name="examen10"
                                value={formData.examen10}
                                onChange={handleChange}
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les examens.."
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
                {/* FIN SECTION PARTIE EXAMEN */}
            </div>
        </div>
      </>
    );
  }