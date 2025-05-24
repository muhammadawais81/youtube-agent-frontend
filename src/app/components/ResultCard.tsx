type ResultProps = {
    transcript: string;
    summary: string;
  };
  
  export default function ResultCard({ transcript, summary }: ResultProps) {
    return (
      <div className="mt-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Summary</h2>
          <p className="bg-blue-50 p-4 rounded-lg whitespace-pre-wrap">{summary}</p>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Transcript</h2>
          <p className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap max-h-[400px] overflow-y-auto">
            {transcript}
          </p>
        </div>
      </div>
    );
  }
  