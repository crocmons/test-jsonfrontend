"use client";
import { useState } from "react";
import loader from "@/public/assets/loader.svg"
import Image from "next/image";

const ValidatorForm = () => {
  const [data, setData] = useState("");
  const [format, setFormat] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    setResult(null);
    setError(null);

    try {
      const response = await fetch("/api/json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data, format: JSON.parse(format) }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setResult(JSON.stringify(result, null, 2) || "");
      setError(result.error || "")
    } catch (error: any) {
      setError(error.message);
    }finally {
      setIsLoading(false);
  }
  };

  const handleKeyDown = (e : any)=>{
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSubmit(e);
    }
}

  return (
    <div className="w-full sm:w-[50%] h-full mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">JSON AI Validator</h1>
      <form onSubmit={handleSubmit} className="space-y-4" onKeyDown={handleKeyDown}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Data
          </label>
          <textarea
            className="my-2 block w-full border-gray-700 rounded-md shadow-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-2 py-3"
            rows={5}
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder='Example: Fiona is 20 years old..She is a software developer....'
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Format (JSON)
          </label>
          <textarea
            className="my-2 block w-full border-gray-700 rounded-md shadow-xl focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-2 py-3"
            rows={5}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            placeholder='Example: {
            "name": {"type": "string"}, 
            "age": {"type": "number"}
            }'
          ></textarea>
        </div>
        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Validate JSON Answer
          </button>
        </div>
      </form>
      {isLoading ? (
        <Image src={loader} alt='loader' className='object-contain justify-center mx-auto' width={80} height={80} />
      ) : error ? (<p className="text-red-500 mt-4 text-xl font-medium my-2 py-2">{error}</p>)
      : result && (
        <div className="glassmorphism mb-4 sm:px-4 mx-auto my-6">
          <h2 className="text-xl font-bold">Validation Result</h2>
          <pre className="bg-gray-100 p-4 rounded">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default ValidatorForm;
