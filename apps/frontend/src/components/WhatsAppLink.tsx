import React from 'react';

interface Props {
  phoneNumber: string; // Deve estar no formato internacional, ex: 5511999999999
}

const WhatsAppLink: React.FC<Props> = ({ phoneNumber }) => {
  const openWhatsApp = () => {
    const url = `https://wa.me/${phoneNumber}`;
    window.open(url, '_blank');
  };

  return (
    <button
      onClick={openWhatsApp}
      className="text-green-600 hover:underline"
    >
      {phoneNumber}
    </button>
  );
};

export default WhatsAppLink;