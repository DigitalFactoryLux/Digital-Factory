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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    body { margin: 0; padding: 0; width: 100% !important; }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

  <!-- Wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">

        <!-- Container 600px -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; border-collapse: separate;">

          <!-- ===== HEADER DARK ===== -->
          <tr>
            <td style="background-color: #0f172a; padding: 28px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td valign="middle">
                    <p style="margin: 0; font-size: 24px; font-weight: 700; color: #ffffff; font-family: 'Segoe UI', Tahoma, sans-serif;">DIGITAL FACTORY</p>
                    <p style="margin: 6px 0 0; font-size: 12px; color: #94a3b8; letter-spacing: 2px; text-transform: uppercase; font-family: 'Segoe UI', Tahoma, sans-serif;">Nouveau message de contact</p>
                  </td>
                  <td width="50" align="right" valign="middle">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" style="height:44px;v-text-anchor:middle;width:44px;" arcsize="25%" fillcolor="#0d9488" stroke="f">
                      <v:textbox style="mso-fit-shape-to-text:false;" inset="0,0,0,0">
                        <center style="color:#ffffff;font-size:20px;">&#9993;</center>
                      </v:textbox>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <div style="width: 44px; height: 44px; background-color: #0d9488; border-radius: 10px; text-align: center; line-height: 44px; font-size: 20px; color: #ffffff;">&#9993;</div>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ===== BANDE TEAL - NOM EXPEDITEUR ===== -->
          <tr>
            <td style="background-color: #0d9488; padding: 18px 36px;">
              <p style="margin: 0 0 2px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #ccfbf1; font-family: 'Segoe UI', Tahoma, sans-serif;">Expediteur</p>
              <p style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; font-family: 'Segoe UI', Tahoma, sans-serif;">${prenom} ${nom}</p>
            </td>
          </tr>

          <!-- ===== LIGNE ACCENT ===== -->
          <tr>
            <td style="background-color: #0891b2; height: 4px; font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>

          <!-- ===== CORPS PRINCIPAL ===== -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 36px;">

              <!-- Coordonnees -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e2e8f0;">
                <!-- Ligne Email -->
                <tr>
                  <td width="120" style="padding: 14px 16px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, sans-serif;">E-mail</p>
                  </td>
                  <td style="padding: 14px 16px; background-color: #ffffff; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:${email}" style="color: #0d9488; font-size: 15px; font-weight: 600; text-decoration: none; font-family: 'Segoe UI', Tahoma, sans-serif;">${email}</a>
                  </td>
                </tr>
                <!-- Ligne Telephone -->
                <tr>
                  <td width="120" style="padding: 14px 16px; background-color: #f8fafc; border-right: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, sans-serif;">Telephone</p>
                  </td>
                  <td style="padding: 14px 16px; background-color: #ffffff;">
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1e293b; font-family: 'Segoe UI', Tahoma, sans-serif;">${tel || 'Non renseigne'}</p>
                  </td>
                </tr>
              </table>

              <!-- Separateur -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 12px;">
                <tr>
                  <td style="border-bottom: 1px solid #e2e8f0; font-size: 1px; line-height: 1px;">&nbsp;</td>
                </tr>
              </table>

              <!-- Label Message -->
              <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 2px; font-family: 'Segoe UI', Tahoma, sans-serif;">Message</p>

              <!-- Contenu du message -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="4" style="background-color: #0d9488;"></td>
                  <td style="padding: 20px 24px; background-color: #f8fafc;">
                    <p style="margin: 0; font-size: 15px; line-height: 26px; color: #334155; font-family: 'Segoe UI', Tahoma, sans-serif; white-space: pre-wrap;">${message || 'Aucun message'}</p>
                  </td>
                </tr>
              </table>

              <!-- Bouton Repondre -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="mailto:${email}?subject=Re: Votre demande - Digital Factory" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="50%" fillcolor="#0d9488" stroke="f">
                      <v:textbox style="mso-fit-shape-to-text:false;" inset="0,0,0,0">
                        <center style="color:#ffffff;font-size:14px;font-weight:bold;font-family:'Segoe UI',Tahoma,sans-serif;">REPONDRE A ${prenom.toUpperCase()}</center>
                      </v:textbox>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="mailto:${email}?subject=Re: Votre demande - Digital Factory" style="display: inline-block; background-color: #0d9488; color: #ffffff; padding: 14px 40px; border-radius: 50px; font-size: 14px; font-weight: 700; text-decoration: none; letter-spacing: 0.5px; font-family: 'Segoe UI', Tahoma, sans-serif;">REPONDRE A ${prenom.toUpperCase()}</a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ===== FOOTER ===== -->
          <tr>
            <td style="background-color: #1e293b; padding: 20px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 13px; font-weight: 600; color: #ffffff; font-family: 'Segoe UI', Tahoma, sans-serif;">Digital Factory Sarl-s</p>
                    <p style="margin: 4px 0 0; font-size: 12px; color: #94a3b8; font-family: 'Segoe UI', Tahoma, sans-serif;">Luxembourg</p>
                  </td>
                  <td align="right" valign="middle">
                    <a href="https://www.digital-factory.lu" style="font-size: 13px; color: #2dd4bf; text-decoration: none; font-weight: 600; font-family: 'Segoe UI', Tahoma, sans-serif;">digital-factory.lu</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- /Container -->

      </td>
    </tr>
  </table>
  <!-- /Wrapper -->

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
