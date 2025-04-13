//Informations générales, diagnostics et circonstance de découverte
import React from "react";
import { useState } from "react";

export default function Etape3({ formData,prevStep, nextStep }) {
    
    return (
      <>
        <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="w-full ">
                {/* SECTION CURES */}
                <div className="rounded-lg border mb-10 border-gray-500 bg-white shadow-lg p-6 dark:border-gray-600 dark:bg-blue-950">
                    <div className="border-b border-gray-400 py-4 px-6 dark:border-slate-500">
                        <h3 className="text-base lg:text-sm text-black dark:text-white">
                            CURES
                        </h3>
                    </div>
                    <div className="flex flex-col gap-5 p-10">
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 1 :
                            </label>
                            <textarea 
                                name="cure1"
                                value={formData.cure1}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 2 :
                            </label>
                            <textarea 
                                name="cure2"
                                value={formData.cure2}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 3 :
                            </label>
                            <textarea 
                                name="cure3"
                                value={formData.cure3}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 4 :
                            </label>
                            <textarea 
                                name="cure4"
                                value={formData.cure4}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 5 :
                            </label>
                            <textarea 
                                name="cure5"
                                value={formData.cure5}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>  
                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 6 :
                            </label>
                            <textarea 
                                name="cure6"
                                value={formData.cure6}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 7 :
                            </label>
                            <textarea 
                                name="cure7"
                                value={formData.cure7}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 8 :
                            </label>
                            <textarea 
                                name="cure8"
                                value={formData.cure8}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 9 :
                            </label>
                            <textarea 
                                name="cure9"
                                value={formData.cure9}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
                                >
                            </textarea>
                        </div>

                        <div>
                            <label className="mb-3 block text-sm text-black dark:text-white">
                                Cure 10 :
                            </label>
                            <textarea 
                                name="cure10"
                                value={formData.cure10}
                                readOnly
                                className="w-full  rounded-lg border border-stroke bg-transparent p-3 outline-none transition file:mr-5 file:rounded file:border-[2px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2 text-sm lg:text-base focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:border-gray-500 dark:file:bg-white/30 dark:text-white"
                                placeholder="Entrez les cures.."
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
                {/* FIN SECTION PARTIE1 CURE */}
            </div>
        </div>
      </>
    );
  }