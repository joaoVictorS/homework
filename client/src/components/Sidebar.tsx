import { useState } from 'react';
import Form from './Form';
import { apiService } from '../services/apiService';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface SidebarProps {
  userId: string | number;
  setUserId: (value: string | number) => void;
  setResult: (result: any) => void;
}

const Sidebar = ({ userId, setUserId, setResult }: SidebarProps) => {
  const [loading, setLoading] = useState(false);
  const [showProposalInput, setShowProposalInput] = useState(false);
  const [showCustomerInput, setShowCustomerInput] = useState(false);
  const [showCreateProposalInput, setShowCreateProposalInput] = useState(false);
  const [proposalId, setProposalId] = useState<number | string>('');
  const [customerIdToFetch, setCustomerIdToFetch] = useState<number | string>('');

  // Estados para criação de Customer
  const [customerName, setCustomerName] = useState('');
  const [customerCpf, setCustomerCpf] = useState('');

  // Estados para criação de Proposal
  const [customerId, setCustomerId] = useState<number | string>(''); 
  const [profit, setProfit] = useState<number | string>('');

  // Função auxiliar para verificar se userId está preenchido
  const checkUserId = () => {
    if (!userId) {
      toast.error('Por favor, insira um ID de usuário válido');
      return false;
    }
    return true;
  };

  // Funções para chamadas de API via apiService
  const handleGetUsers = async () => {
    if (!checkUserId()) return;
    try {
      setLoading(true);
      const data = await apiService.getUsers(userId);
      setResult(data);
      toast.success('Usuários buscados com sucesso!');
    } catch (error) {
      toast.error('Erro ao buscar usuários');
    } finally {
      setLoading(false);
    }
  };

  const handleGetCustomers = async () => {
    if (!checkUserId()) return;
    try {
      setLoading(true);
      const data = await apiService.getCustomers(userId);
      setResult(data);
      toast.success('Clientes buscados com sucesso!');
    } catch (error) {
      toast.error('Erro ao buscar clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateCustomer = async () => {
    if (!checkUserId()) return;
    try {
      setLoading(true);
      const data = await apiService.createCustomer(userId, customerName, customerCpf);
      setResult(data);
      toast.success('Cliente criado com sucesso!');
      setShowCustomerInput(false);
      setCustomerName('');
      setCustomerCpf('');
    } catch (error) {
      toast.error('Erro ao criar cliente');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProposal = async () => {
    if (!checkUserId()) return;
    try {
      setLoading(true);
      const data = await apiService.createProposal(userId, customerId, profit);
      setResult(data);
      toast.success('Proposta criada com sucesso!');
      setShowCreateProposalInput(false);
      setCustomerId('');
      setProfit('');
    } catch (error) {
      toast.error('Erro ao criar proposta');
    } finally {
      setLoading(false);
    }
  };

  const handleGetProposal = async () => {
    if (!checkUserId()) return;
    try {
      setLoading(true);
      const data = await apiService.getPendingProposals(userId, customerId, profit);
      setResult(data);
      toast.success('Propostas buscadas com sucesso!');
      setShowCreateProposalInput(false);
      setCustomerId('');
      setProfit('');
    } catch (error) {
      toast.error('Erro ao buscar propostas');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveProposal = async () => {
    if (!checkUserId()) return;
    if (!proposalId) {
      toast.error('Por favor, insira um ID de proposta válido');
      return;
    }

    try {
      setLoading(true);
      const data = await apiService.approveProposal(userId, proposalId);
      setResult(data);
      toast.success('Proposta aprovada com sucesso!');
      setShowProposalInput(false);
      setProposalId('');
    } catch (error) {
      toast.error('Erro ao aprovar proposta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/4 bg-gray-800 text-white p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">NestJS API Demo</h1>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Input para definir o userId */}
      <div className="mb-4">
        <label>
          Insira o ID do Usuário:
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border p-2 rounded ml-2 w-full text-white"
          />
        </label>
      </div>

      {/* Exibição de Loading */}
      {loading && <div className="text-yellow-500">Carregando...</div>}

      {/* Botões */}
      <button
        className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded"
        onClick={handleGetUsers}
        disabled={loading}
      >
        Buscar Usuários
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 w-full text-white py-2 px-4 rounded"
        onClick={handleGetCustomers}
        disabled={loading}
      >
        Buscar Clientes
      </button>

      <button
        className="bg-yellow-500 hover:bg-yellow-700 w-full text-white py-2 px-4 rounded"
        onClick={() => setShowCustomerInput(!showCustomerInput)}
        disabled={loading}
      >
        Criar Cliente
      </button>

      <button
        className="bg-purple-500 hover:bg-purple-700 w-full text-white py-2 px-4 rounded"
        onClick={handleGetProposal}
        disabled={loading}
      >
        Buscar Propostas Pendentes
      </button>

      <button
        className="bg-red-500 hover:bg-red-700 w-full text-white py-2 px-4 rounded"
        onClick={() => setShowProposalInput(!showProposalInput)}
        disabled={loading}
      >
        Aprovar Proposta
      </button>

      <button
        className="bg-teal-500 hover:bg-teal-700 w-full text-white py-2 px-4 rounded"
        onClick={() => setShowCreateProposalInput(!showCreateProposalInput)}
        disabled={loading}
      >
        Criar Proposta
      </button>

      {/* Formulários Condicionais */}
      {showCustomerInput && (
        <Form
          title="Criar Cliente"
          fields={[
            { label: 'Nome do Cliente', type: 'text', stateSetter: setCustomerName, className: 'text-white' },
            { label: 'CPF do Cliente', type: 'text', stateSetter: setCustomerCpf, className: 'text-white' },
          ]}
          onSubmit={handleCreateCustomer}
        />
      )}

      {showCreateProposalInput && (
        <Form
          title="Criar Proposta"
          fields={[
            { label: 'ID do Cliente', type: 'number', stateSetter: setCustomerId },
            { label: 'Lucro da Proposta', type: 'number', stateSetter: setProfit },
          ]}
          onSubmit={handleCreateProposal}
        />
      )}

      {showProposalInput && (
        <div className="mt-4">
          <label>
            Insira o ID da Proposta:
            <input
              type="number"
              value={proposalId}
              onChange={(e) => setProposalId(e.target.value)}
              className="border p-2 rounded ml-2 w-full text-white"
            />
          </label>
          <button
            className="bg-green-500 hover:bg-green-700 w-full text-white py-2 px-4 rounded mt-2"
            onClick={handleApproveProposal}
            disabled={loading}
          >
            Confirmar Aprovação
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
