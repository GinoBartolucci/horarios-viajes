"use client"
import { useState } from 'react';
type Company = {
  id: number;
  name: string;
};
const Page = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [newCompanyName, setNewCompanyName] = useState('');

  const addCompany = () => {
    const newCompany: Company = {
      id: companies.length + 1,
      name: newCompanyName,
    };

    setCompanies([...companies, newCompany]);
    setNewCompanyName('');
  };

  const deleteCompany = (companyId: number) => {
    const updatedCompanies = companies.filter((company) => company.id !== companyId);
    setCompanies(updatedCompanies);
  };

  return (
    <div>
      <h1>Company Management</h1>
      <input
        type="text"
        value={newCompanyName}
        onChange={(e) => setNewCompanyName(e.target.value)}
        placeholder="Enter company name"
      />
      <button onClick={addCompany}>Add Company</button>

      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            {company.name}
            <button onClick={() => deleteCompany(company.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;