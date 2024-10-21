export const apiService = {
    getUsers: async (userId: string | number) => {
      const response = await fetch('http://localhost:3005/users', {
        headers: { 'user_id': `${userId}` },
      });
      return await response.json();
    },
  
    getCustomers: async (userId: string | number) => {
      const response = await fetch('http://localhost:3005/customers', {
        headers: { 'user_id': `${userId}` },
      });
      return await response.json();
    },
  
    getPendingProposals: async (userId: string | number) => {
      const response = await fetch('http://localhost:3005/proposals', {
        headers: { 'user_id': `${userId}` },
      });
      return await response.json();
    },
  
    getRefusedProposals: async (userId: string | number) => {
      const response = await fetch('http://localhost:3005/proposals/refused', {
        headers: { 'user_id': `${userId}` },
      });
      return await response.json();
    },
  
    createCustomer: async (userId: string | number, name: string, cpf: string) => {
      const response = await fetch('http://localhost:3005/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user_id': `${userId}`,
        },
        body: JSON.stringify({
          name,
          cpf,
        }),
      });
      return await response.json();
    },
  
    createProposal: async (userId: string | number, customerId: string | number, profit: string | number) => {
      const response = await fetch('http://localhost:3005/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user_id': `${userId}`,
        },
        body: JSON.stringify({
          customerId,
          profit,
        }),
      });
      return await response.json();
    },
  
    approveProposal: async (userId: string | number, proposalId: string | number) => {
      const response = await fetch(`http://localhost:3005/proposals/${proposalId}/approve`, {
        method: 'POST',
        headers: {
          'user_id': `${userId}`,
        },
      });
      return await response.json();
    },
  };
  