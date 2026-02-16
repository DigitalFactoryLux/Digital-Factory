import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

// Rate limiting simple (en mémoire)
const submissions = new Map<string, number>();
const RATE_LIMIT_MS = 60_000; // 1 min entre chaque envoi par IP

export const POST: APIRoute = async ({ request, clientAddress }) => {
  // Rate limiting
  const now = Date.now();
  const lastSubmission = submissions.get(clientAddress) ?? 0;
  if (now - lastSubmission < RATE_LIMIT_MS) {
    return new Response(
      JSON.stringify({ success: false, message: 'Veuillez patienter avant de renvoyer un message.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const data = await request.json();
    const { prenom, nom, email, tel, message, website } = data;

    // Honeypot anti-spam
    if (website) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validation
    if (!prenom || !nom || !email) {
      return new Response(
        JSON.stringify({ success: false, message: 'Champs obligatoires manquants.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validation email basique
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ success: false, message: 'Adresse email invalide.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Créer le transporteur SMTP
    const transporter = nodemailer.createTransport({
      host: import.meta.env.SMTP_HOST,
      port: Number(import.meta.env.SMTP_PORT),
      secure: true, // SSL pour port 465
      auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
      },
    });

    // Destinataires
    const recipients = import.meta.env.SMTP_TO;

    // Envoyer l'email
    await transporter.sendMail({
      from: `"Digital Factory Site" <${import.meta.env.SMTP_USER}>`,
      replyTo: `"${prenom} ${nom}" <${email}>`,
      to: recipients,
      subject: `Nouveau message de ${prenom} ${nom} — digital-factory.lu`,
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: 'Segoe UI', Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px 40px; border-radius: 16px 16px 0 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <h1 style="margin: 0 0 4px; font-size: 22px; font-weight: 700; color: #ffffff;">Digital Factory</h1>
                    <p style="margin: 0; font-size: 13px; color: #94a3b8; letter-spacing: 0.5px;">NOUVEAU MESSAGE DE CONTACT</p>
                  </td>
                  <td align="right" valign="middle">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #0d9488, #06b6d4); border-radius: 12px; text-align: center; line-height: 48px; font-size: 24px;">
                      ✉
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Expéditeur -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488, #06b6d4); padding: 20px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0 0 2px; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: rgba(255,255,255,0.7);">Expéditeur</p>
                    <p style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff;">${prenom} ${nom}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 40px;">

              <!-- Infos contact -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 10px 10px 0 0; border-bottom: 1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" valign="middle">
                          <span style="font-size: 16px;">📧</span>
                        </td>
                        <td style="padding-left: 8px;">
                          <p style="margin: 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                          <a href="mailto:${email}" style="color: #0d9488; font-size: 15px; font-weight: 600; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; background-color: #f8fafc; border-radius: 0 0 10px 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td width="28" valign="middle">
                          <span style="font-size: 16px;">📱</span>
                        </td>
                        <td style="padding-left: 8px;">
                          <p style="margin: 0; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px;">Téléphone</p>
                          <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1e293b;">${tel || 'Non renseigné'}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <div>
                <p style="margin: 0 0 10px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">💬 Message</p>
                <div style="background-color: #f8fafc; border-left: 4px solid #0d9488; padding: 20px; border-radius: 0 10px 10px 0; font-size: 15px; line-height: 1.7; color: #334155; white-space: pre-wrap;">${message || 'Aucun message'}</div>
              </div>

              <!-- Bouton répondre -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 28px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}?subject=Re: Votre demande — Digital Factory" style="display: inline-block; background: linear-gradient(135deg, #0d9488, #06b6d4); color: #ffffff; padding: 14px 36px; border-radius: 50px; font-size: 14px; font-weight: 700; text-decoration: none; letter-spacing: 0.3px;">Répondre à ${prenom}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 40px; border-top: 1px solid #e2e8f0; border-radius: 0 0 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8;">Digital Factory Sàrl-s · Luxembourg</p>
                  </td>
                  <td align="right">
                    <a href="https://www.digital-factory.lu" style="font-size: 12px; color: #0d9488; text-decoration: none; font-weight: 600;">digital-factory.lu</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });

    // Enregistrer le rate limit
    submissions.set(clientAddress, now);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erreur envoi email:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Erreur lors de l\'envoi.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
