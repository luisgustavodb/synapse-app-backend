

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '../components/icons/ArrowLeftIcon';
import { CreditCardIcon } from '../components/icons/CreditCardIcon';
import { BarcodeIcon } from '../components/icons/BarcodeIcon';
import { PixIcon } from '../components/icons/PixIcon';
import { useGoBack } from '../hooks/useGoBack';

const pageVariants = {
  initial: { opacity: 0, x: '100%' },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: '-100%' },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.5,
} as const;

type PaymentMethod = 'card' | 'pix' | 'boleto';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const goBack = useGoBack('/subscription');
    const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
    
    const motionProps = {
        initial:"initial",
        animate:"in",
        exit:"out",
        variants:pageVariants,
        transition:pageTransition
    };

    return (
        <motion.div
            {...motionProps}
            className="h-full flex flex-col bg-slate-50"
        >
            <header className="flex items-center p-4 border-b border-slate-200 flex-shrink-0 bg-white">
                <button onClick={goBack} className="p-2 rounded-full hover:bg-slate-200" aria-label="Voltar">
                    <ArrowLeftIcon className="h-6 w-6 text-slate-500" />
                </button>
                <h1 className="text-xl font-bold text-slate-800 mx-auto pr-8">Pagamento</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-6 space-y-6">
                {/* Resumo */}
                <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-600">Plano Synapse+</span>
                        <span className="font-bold text-slate-800">R$29,90/mês</span>
                    </div>
                </div>

                {/* Seleção de Método */}
                <div>
                    <h2 className="text-lg font-bold text-slate-800 mb-3">Forma de Pagamento</h2>
                    <div className="grid grid-cols-3 gap-3">
                        <PaymentMethodButton icon={CreditCardIcon} label="Cartão" active={selectedMethod === 'card'} onClick={() => setSelectedMethod('card')} />
                        <PaymentMethodButton icon={PixIcon} label="Pix" active={selectedMethod === 'pix'} onClick={() => setSelectedMethod('pix')} />
                        <PaymentMethodButton icon={BarcodeIcon} label="Boleto" active={selectedMethod === 'boleto'} onClick={() => setSelectedMethod('boleto')} />
                    </div>
                </div>

                {/* Conteúdo do Método */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    {selectedMethod === 'card' && <CardPaymentForm />}
                    {selectedMethod === 'pix' && <PixPayment />}
                    {selectedMethod === 'boleto' && <BoletoPayment />}
                </div>

            </main>
            <footer className="p-4 bg-white/80 backdrop-blur-sm border-t border-slate-200">
                <button 
                    onClick={() => { alert('Pagamento concluído com sucesso!'); navigate('/account'); }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                >
                    Pagar R$29,90
                </button>
            </footer>
        </motion.div>
    );
};

const PaymentMethodButton: React.FC<{icon: React.FC<any>, label: string, active: boolean, onClick: () => void}> = ({ icon: Icon, label, active, onClick }) => (
    <button onClick={onClick} className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center space-y-2 transition-all ${active ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 bg-white'}`}>
        <Icon className={`h-6 w-6 ${active ? 'text-indigo-600' : 'text-slate-500'}`} />
        <span className={`text-sm font-semibold ${active ? 'text-indigo-600' : 'text-slate-600'}`}>{label}</span>
    </button>
);

const CardPaymentForm = () => (
    <form className="space-y-4">
        <div>
            <label htmlFor="card-number" className="block text-sm font-medium text-slate-500 mb-1">Número do Cartão</label>
            <input type="text" id="card-number" placeholder="0000 0000 0000 0000" className="w-full bg-slate-100 border border-slate-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 text-sm" />
        </div>
        <div>
            <label htmlFor="card-name" className="block text-sm font-medium text-slate-500 mb-1">Nome no Cartão</label>
            <input type="text" id="card-name" placeholder="Seu nome completo" className="w-full bg-slate-100 border border-slate-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 text-sm" />
        </div>
        <div className="flex space-x-4">
            <div className="w-1/2">
                <label htmlFor="card-expiry" className="block text-sm font-medium text-slate-500 mb-1">Validade</label>
                <input type="text" id="card-expiry" placeholder="MM/AA" className="w-full bg-slate-100 border border-slate-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 text-sm" />
            </div>
             <div className="w-1/2">
                <label htmlFor="card-cvv" className="block text-sm font-medium text-slate-500 mb-1">CVV</label>
                <input type="text" id="card-cvv" placeholder="123" className="w-full bg-slate-100 border border-slate-300 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-slate-400 text-slate-800 text-sm" />
            </div>
        </div>
    </form>
);

const PixPayment = () => (
    <div className="text-center space-y-4">
        <h3 className="font-bold text-slate-800">Pague com Pix</h3>
        <p className="text-sm text-slate-500">Escaneie o QR Code abaixo com o app do seu banco para pagar.</p>
        <div className="bg-slate-100 p-4 rounded-xl inline-block">
            <svg className="w-40 h-40" viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h50v50H0zM200 0h50v50h-50zM0 200h50v50H0zM100 0h50v50h-50zM0 100h50v50H0zM100 200h50v50h-50zM200 100h50v50h-50zM100 100h50v50h-50zM50 50h50v50H50zM150 50h50v50h-50zM50 150h50v50H50zM150 150h50v50h-50z" fill="#000"/></svg>
        </div>
         <button className="w-full bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-xl">
            Copiar Código Pix
        </button>
    </div>
);

const BoletoPayment = () => (
    <div className="text-center space-y-4">
        <h3 className="font-bold text-slate-800">Pague com Boleto</h3>
        <p className="text-sm text-slate-500">O boleto será gerado e poderá ser pago em qualquer banco ou casa lotérica.</p>
        <BarcodeIcon className="h-20 w-auto mx-auto text-slate-600" />
        <button className="w-full bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl mt-4">
            Gerar Boleto Bancário
        </button>
    </div>
);


export default PaymentPage;