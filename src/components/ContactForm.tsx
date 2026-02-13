import { useState, type FormEvent } from 'react';

interface ContactFormProps {
  translations?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
}

const defaultTranslations = {
  firstName: 'Prénom',
  lastName: 'Nom',
  email: 'Email',
  phone: 'Téléphone',
  message: 'Message',
  send: 'Envoyer',
  sending: 'Envoi en cours...',
  success: 'Merci ! Votre message a bien été envoyé.',
  error: 'Une erreur est survenue. Veuillez réessayer.',
};

export default function ContactForm({ translations }: ContactFormProps) {
  const labels = { ...defaultTranslations, ...translations };
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot anti-spam
    if (formData.get('website')) {
      setStatus('success');
      return;
    }

    try {
      const data = {
        access_key: '09bec302-dd06-4d6a-9ce5-d0578496410a',
        subject: `Nouveau message de ${formData.get('prenom')} ${formData.get('nom')} — digital-factory.lu`,
        from_name: `${formData.get('prenom')} ${formData.get('nom')}`,
        prenom: formData.get('prenom'),
        nom: formData.get('nom'),
        email: formData.get('email'),
        tel: formData.get('tel') || 'Non renseigné',
        message: formData.get('message') || 'Aucun message',
      };

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.firstName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-dark focus:ring-2 focus:ring-cyan-light/50 outline-none transition-colors bg-white"
          />
        </div>
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.lastName} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-dark focus:ring-2 focus:ring-cyan-light/50 outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.email} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-dark focus:ring-2 focus:ring-cyan-light/50 outline-none transition-colors bg-white"
          />
        </div>
        <div>
          <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.phone}
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-dark focus:ring-2 focus:ring-cyan-light/50 outline-none transition-colors bg-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {labels.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-cyan-dark focus:ring-2 focus:ring-cyan-light/50 outline-none transition-colors bg-white resize-vertical"
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="bg-black text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'sending' ? labels.sending : labels.send}
        </button>
      </div>

      {status === 'success' && (
        <p role="alert" className="text-center text-green-600 font-medium">
          {labels.success}
        </p>
      )}
      {status === 'error' && (
        <p role="alert" className="text-center text-red-600 font-medium">
          {labels.error}
        </p>
      )}
    </form>
  );
}
