import { useState } from 'react';
import Sidebar from './components/Sidebar.tsx';
import Result from './components/Result.tsx';

function App() {
  const [result, setResult] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | string>(''); // ID do usuário controlado por input

  const handleSetResult = (data: any) => {
    setResult(JSON.stringify(data, null, 2));
  };

  return (
    <div className="h-screen flex">
      {/* Menu lateral */}
      <Sidebar userId={userId} setUserId={setUserId} setResult={handleSetResult} />

      {/* Conteúdo principal */}
      <div className="w-3/4 bg-gray-100 p-8">
        <Result result={result} />
      </div>
    </div>
  );
}

export default App;
