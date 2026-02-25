<?php
/**
 * Digital Factory — Formulaire de contact (PHP/SMTP Gmail)
 * Equivalent du fichier Node.js src/pages/api/contact.ts
 *
 * CONFIGURATION : modifier les 4 constantes ci-dessous avec vos identifiants
 */

// ===== CONFIGURATION SMTP =====
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 465);
define('SMTP_USER', 'votre-email@digital-factory.lu');  // A remplacer
define('SMTP_PASS', 'votre-mot-de-passe-app');          // A remplacer (mot de passe d'application Google)
define('SMTP_TO', 'c.singer@digital-factory.lu');       // Ajouter g.flores quand pret

// ===== CORS & Headers =====
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Seulement POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Methode non autorisee.']);
    exit;
}

// ===== Rate Limiting (fichier temporaire) =====
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateLimitFile = sys_get_temp_dir() . '/df_rate_' . md5($ip) . '.txt';
$rateLimitMs = 60; // 60 secondes entre chaque envoi

if (file_exists($rateLimitFile)) {
    $lastTime = (int)file_get_contents($rateLimitFile);
    if (time() - $lastTime < $rateLimitMs) {
        http_response_code(429);
        echo json_encode(['success' => false, 'message' => 'Veuillez patienter avant de renvoyer un message.']);
        exit;
    }
}

// ===== Lecture des donnees =====
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Donnees invalides.']);
    exit;
}

$prenom  = trim($input['prenom'] ?? '');
$nom     = trim($input['nom'] ?? '');
$email   = trim($input['email'] ?? '');
$tel     = trim($input['tel'] ?? '') ?: 'Non renseigne';
$message = trim($input['message'] ?? '') ?: 'Aucun message';
$website = trim($input['website'] ?? '');

// ===== Honeypot anti-spam =====
if (!empty($website)) {
    echo json_encode(['success' => true]);
    exit;
}

// ===== Validation =====
if (empty($prenom) || empty($nom) || empty($email)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Champs obligatoires manquants.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
    exit;
}

// ===== Protection XSS =====
$prenom  = htmlspecialchars($prenom, ENT_QUOTES, 'UTF-8');
$nom     = htmlspecialchars($nom, ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$tel     = htmlspecialchars($tel, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
$prenomUpper = mb_strtoupper($prenom, 'UTF-8');

// ===== Template email HTML (identique au Node.js) =====
$htmlBody = <<<HTML
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
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width: 600px; border-collapse: separate;">
          <!-- HEADER DARK -->
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
          <!-- BANDE TEAL -->
          <tr>
            <td style="background-color: #0d9488; padding: 18px 36px;">
              <p style="margin: 0 0 2px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #ccfbf1; font-family: 'Segoe UI', Tahoma, sans-serif;">Expediteur</p>
              <p style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; font-family: 'Segoe UI', Tahoma, sans-serif;">{$prenom} {$nom}</p>
            </td>
          </tr>
          <!-- LIGNE ACCENT -->
          <tr>
            <td style="background-color: #0891b2; height: 4px; font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>
          <!-- CORPS -->
          <tr>
            <td style="background-color: #ffffff; padding: 32px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border: 1px solid #e2e8f0;">
                <tr>
                  <td width="120" style="padding: 14px 16px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, sans-serif;">E-mail</p>
                  </td>
                  <td style="padding: 14px 16px; background-color: #ffffff; border-bottom: 1px solid #e2e8f0;">
                    <a href="mailto:{$email}" style="color: #0d9488; font-size: 15px; font-weight: 600; text-decoration: none; font-family: 'Segoe UI', Tahoma, sans-serif;">{$email}</a>
                  </td>
                </tr>
                <tr>
                  <td width="120" style="padding: 14px 16px; background-color: #f8fafc; border-right: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 1px; font-family: 'Segoe UI', Tahoma, sans-serif;">Telephone</p>
                  </td>
                  <td style="padding: 14px 16px; background-color: #ffffff;">
                    <p style="margin: 0; font-size: 15px; font-weight: 600; color: #1e293b; font-family: 'Segoe UI', Tahoma, sans-serif;">{$tel}</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 28px 0 12px;">
                <tr><td style="border-bottom: 1px solid #e2e8f0; font-size: 1px; line-height: 1px;">&nbsp;</td></tr>
              </table>
              <p style="margin: 0 0 12px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 2px; font-family: 'Segoe UI', Tahoma, sans-serif;">Message</p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="4" style="background-color: #0d9488;"></td>
                  <td style="padding: 20px 24px; background-color: #f8fafc;">
                    <p style="margin: 0; font-size: 15px; line-height: 26px; color: #334155; font-family: 'Segoe UI', Tahoma, sans-serif; white-space: pre-wrap;">{$message}</p>
                  </td>
                </tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="mailto:{$email}?subject=Re: Votre demande - Digital Factory" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="50%" fillcolor="#0d9488" stroke="f">
                      <v:textbox style="mso-fit-shape-to-text:false;" inset="0,0,0,0">
                        <center style="color:#ffffff;font-size:14px;font-weight:bold;font-family:'Segoe UI',Tahoma,sans-serif;">REPONDRE A {$prenomUpper}</center>
                      </v:textbox>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <a href="mailto:{$email}?subject=Re: Votre demande - Digital Factory" style="display: inline-block; background-color: #0d9488; color: #ffffff; padding: 14px 40px; border-radius: 50px; font-size: 14px; font-weight: 700; text-decoration: none; letter-spacing: 0.5px; font-family: 'Segoe UI', Tahoma, sans-serif;">REPONDRE A {$prenomUpper}</a>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- FOOTER -->
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
      </td>
    </tr>
  </table>
</body>
</html>
HTML;

// ===== Envoi SMTP via fsockopen (pas besoin de librairie externe) =====
try {
    $subject = "Nouveau message de {$prenom} {$nom} — digital-factory.lu";
    $fromName = "Digital Factory Site";
    $replyToName = "{$prenom} {$nom}";

    // Connexion SSL au serveur SMTP
    $socket = @fsockopen('ssl://' . SMTP_HOST, SMTP_PORT, $errno, $errstr, 30);
    if (!$socket) {
        throw new Exception("Connexion SMTP impossible: {$errstr}");
    }

    // Lire la reponse de bienvenue
    smtpRead($socket);

    // EHLO
    smtpSend($socket, "EHLO digital-factory.lu");

    // AUTH LOGIN
    smtpSend($socket, "AUTH LOGIN");
    smtpSend($socket, base64_encode(SMTP_USER));
    smtpSend($socket, base64_encode(SMTP_PASS));

    // Expediteur
    smtpSend($socket, "MAIL FROM:<" . SMTP_USER . ">");

    // Destinataires
    $recipients = explode(',', SMTP_TO);
    foreach ($recipients as $rcpt) {
        smtpSend($socket, "RCPT TO:<" . trim($rcpt) . ">");
    }

    // Donnees
    smtpSend($socket, "DATA");

    // En-tetes email
    $headers = "From: \"{$fromName}\" <" . SMTP_USER . ">\r\n";
    $headers .= "Reply-To: \"{$replyToName}\" <{$email}>\r\n";
    $headers .= "To: " . SMTP_TO . "\r\n";
    $headers .= "Subject: =?UTF-8?B?" . base64_encode($subject) . "?=\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "Content-Transfer-Encoding: base64\r\n";
    $headers .= "\r\n";
    $headers .= chunk_split(base64_encode($htmlBody));
    $headers .= "\r\n.";

    smtpSend($socket, $headers);

    // Quitter
    smtpSend($socket, "QUIT");
    fclose($socket);

    // Enregistrer le rate limit
    file_put_contents($rateLimitFile, time());

    echo json_encode(['success' => true]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => "Erreur lors de l'envoi."]);
}

// ===== Fonctions SMTP =====
function smtpSend($socket, $command) {
    fwrite($socket, $command . "\r\n");
    return smtpRead($socket);
}

function smtpRead($socket) {
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }
    return $response;
}
