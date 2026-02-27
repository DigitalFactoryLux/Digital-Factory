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
    requiredField: string;
    invalidEmail: string;
    rgpdConsent: string;
    rgpdConsentLink: string;
    rgpdRequired: string;
    privacyUrl: string;
  };
  csrfToken?: string;
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
  requiredField: 'Ce champ est requis.',
  invalidEmail: 'Adresse email invalide.',
  rgpdConsent: "J'accepte que mes données soient traitées conformément à la",
  rgpdConsentLink: 'politique de confidentialité',
  rgpdRequired: 'Vous devez accepter la politique de confidentialité.',
  privacyUrl: '/politique-de-confidentialite',
};

export default function ContactForm({ translations, csrfToken }: ContactFormProps) {
  const labels = { ...defaultTranslations, ...translations };
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot anti-spam
    if (formData.get('website')) {
      setStatus('success');
      return;
    }

    // Validation côté client
    const errors: Record<string, string> = {};
    const prenomVal = (formData.get('prenom') as string || '').trim();
    const nomVal = (formData.get('nom') as string || '').trim();
    const emailVal = (formData.get('email') as string || '').trim();

    if (!prenomVal) errors.prenom = labels.requiredField;
    if (!nomVal) errors.nom = labels.requiredField;
    if (!emailVal) {
      errors.email = labels.requiredField;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailVal)) {
      errors.email = labels.invalidEmail;
    }

    const rgpdChecked = formData.get('rgpd_consent') === 'on';
    if (!rgpdChecked) errors.rgpd = labels.rgpdRequired;

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setStatus('sending');

    try {
      const data = {
        prenom: prenomVal,
        nom: nomVal,
        email: emailVal,
        tel: (formData.get('tel') as string || '').trim() || 'Non renseigné',
        message: (formData.get('message') as string || '').trim() || 'Aucun message',
        website: formData.get('website'),
        _csrf: csrfToken,
      };

      const response = await fetch('/api/contact', {
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
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.firstName} <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(requis)</span>
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            required
            maxLength={100}
            aria-describedby={fieldErrors.prenom ? 'prenom-error' : undefined}
            aria-invalid={!!fieldErrors.prenom}
            className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.prenom ? 'border-red-400' : 'border-gray-200'} focus:border-teal-500 focus:ring-2 focus:ring-teal-200/50 outline-none transition-colors bg-white`}
          />
          {fieldErrors.prenom && <p id="prenom-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.prenom}</p>}
        </div>
        <div>
          <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.lastName} <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(requis)</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            maxLength={100}
            aria-describedby={fieldErrors.nom ? 'nom-error' : undefined}
            aria-invalid={!!fieldErrors.nom}
            className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.nom ? 'border-red-400' : 'border-gray-200'} focus:border-teal-500 focus:ring-2 focus:ring-teal-200/50 outline-none transition-colors bg-white`}
          />
          {fieldErrors.nom && <p id="nom-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.nom}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.email} <span className="text-red-500" aria-hidden="true">*</span>
            <span className="sr-only">(requis)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={254}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            aria-invalid={!!fieldErrors.email}
            className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.email ? 'border-red-400' : 'border-gray-200'} focus:border-teal-500 focus:ring-2 focus:ring-teal-200/50 outline-none transition-colors bg-white`}
          />
          {fieldErrors.email && <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.email}</p>}
        </div>
        <div>
          <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-2">
            {labels.phone}
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            maxLength={30}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/50 outline-none transition-colors bg-white"
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
          maxLength={5000}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-200/50 outline-none transition-colors bg-white resize-vertical"
        />
      </div>

      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="rgpd_consent"
            aria-describedby={fieldErrors.rgpd ? 'rgpd-error' : undefined}
            aria-invalid={!!fieldErrors.rgpd}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="text-sm text-gray-600">
            {labels.rgpdConsent}{' '}
            <a href={labels.privacyUrl} className="text-teal-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">
              {labels.rgpdConsentLink}
            </a>.
            <span className="text-red-500" aria-hidden="true"> *</span>
          </span>
        </label>
        {fieldErrors.rgpd && <p id="rgpd-error" className="mt-1 text-sm text-red-600" role="alert">{fieldErrors.rgpd}</p>}
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
