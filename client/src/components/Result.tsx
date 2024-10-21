interface ResultProps {
    result: string | null;
  }
  
  const Result = ({ result }: ResultProps) => {
    return (
      <div className="bg-white p-4 rounded shadow text-black max-h-full overflow-y-auto"> {/* max-h-full e overflow-y-auto para rolagem */}
        <h2 className="text-lg font-bold">Resultado:</h2>
        <pre className="whitespace-pre-wrap">{result}</pre> {/* Pre-formatar o JSON corretamente */}
      </div>
    );
  };
  
  export default Result;
  