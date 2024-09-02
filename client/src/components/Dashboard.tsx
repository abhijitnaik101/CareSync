import React from 'react';

const Dashboard: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div className="flex-1 p-10 text-2xl">
      <h1>{title}</h1>
    </div>
  );
};

export default Dashboard;
