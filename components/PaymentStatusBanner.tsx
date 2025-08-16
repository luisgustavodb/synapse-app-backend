import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const PaymentStatusBanner: React.FC = () => {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center space-x-3">
      <CheckCircleIcon className="h-6 w-6 text-emerald-500" />
      <div>
        <h3 className="font-bold text-sm text-slate-800">Synapse+ Ativo</h3>
        <p className="text-xs text-slate-500">Seu pagamento mensal está em dia.</p>
      </div>
    </div>
  );
};

export default PaymentStatusBanner;