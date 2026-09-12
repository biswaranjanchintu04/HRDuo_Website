import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'

function getLiveEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  const envObj = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim();
          envObj[key] = val;
        }
      }
    }
  }
  return { ...process.env, ...envObj };
}

const SOLUTION_LABELS = {
  'all-in-one': 'Complete HRDuo Suite (Face Attendance + Payroll Engine)',
  'face-attendance': 'AI Biometric Face Attendance & Edge Kiosks',
  'payroll': 'Automated Dynamic Payroll & Payslip Processing',
  'shift-roster': 'Shift Rosters & Leave Management Automation',
  'enterprise-custom': 'Enterprise Custom Infrastructure Integration'
};

function getFormattedISTDate() {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'full',
      timeStyle: 'medium',
      timeZone: 'Asia/Kolkata'
    }).format(new Date());
  } catch (e) {
    return new Date().toLocaleString();
  }
}

// 1. Formal Corporate Email to Admin / HRDuo Team (New Lead Dossier)
function buildAdminCorporateEmail({ name, businessName, email, solutionInterested, message, refId, dateStr }) {
  const solutionLabel = SOLUTION_LABELS[solutionInterested] || solutionInterested || 'Complete HRDuo Suite';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>New Business Lead Dossier</title>
    </head>
    <body style="margin: 0; padding: 30px 16px; background-color: #f1f5f9; font-family: 'Segoe UI', Arial, Helvetica, sans-serif; color: #1e293b;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            
            <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; width: 100%; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              
              <!-- Letterhead Header -->
              <tr>
                <td style="background-color: #0f172a; padding: 24px 32px; border-bottom: 3px solid #008C75;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                          HRDUO TECHNOLOGIES &bull; INTERNAL LEAD DISPATCH
                        </div>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px;">
                          New Business Lead Dossier
                        </h1>
                      </td>
                      <td align="right" valign="top">
                        <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #0f172a; background-color: #fcd34d; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                          Ref #${refId}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Executive Notice -->
              <tr>
                <td style="padding: 24px 32px 16px 32px;">
                  <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 1.6; color: #334155;">
                    A prospective enterprise client has submitted a formal business inquiry via the HRDuo contact gateway. Please initiate the standard client qualification and follow-up protocol within the <strong>2-hour SLA window</strong>.
                  </p>
                </td>
              </tr>

              <!-- Lead Dossier Table -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                    <div style="background-color: #f1f5f9; padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.8px;">
                      Lead Profile & Specifications
                    </div>
                    
                    <table width="100%" cellpadding="10" cellspacing="0" border="0" style="font-size: 13px;">
                      <tr>
                        <td width="32%" style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Contact Person:</td>
                        <td width="68%" style="font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${name}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Organization:</td>
                        <td style="font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${businessName || 'Private / Enterprise Client'}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Work Email:</td>
                        <td style="border-bottom: 1px solid #e2e8f0;">
                          <a href="mailto:${email}" style="color: #008C75; font-weight: 700; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Requested Architecture:</td>
                        <td style="font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${solutionLabel}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Timestamp (IST):</td>
                        <td style="color: #475569; border-bottom: 1px solid #e2e8f0;">${dateStr}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; padding-left: 16px;">Operational SLA:</td>
                        <td style="font-weight: 700; color: #059669;">Target Response &lt; 2 Business Hours</td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>

              <!-- Inquiry Transcript -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 8px;">
                    Official Inquiry Transcript / Scope Statement:
                  </div>
                  <div style="background-color: #ffffff; border: 1px solid #cbd5e1; border-left: 4px solid #008C75; padding: 14px 18px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${message || 'No additional statement provided.'}</div>
                </td>
              </tr>

              <!-- Action Protocol CTA -->
              <tr>
                <td align="center" style="padding: 0 32px 32px 32px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td align="center" style="background-color: #008C75; border-radius: 4px;">
                        <a href="mailto:${email}?subject=RE:%20HRDuo%20Workforce%20Solutions%20Inquiry%20(Ref%20#${refId})" style="display: inline-block; padding: 12px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 4px; letter-spacing: 0.3px;">
                          Initiate Client Response &rarr;
                        </a>
                      </td>
                    </tr>
                  </table>
                  <span style="display: block; font-size: 11px; color: #64748b; margin-top: 10px;">
                    Clicking initiates an email response directly addressed to ${email}.
                  </span>
                </td>
              </tr>

              <!-- Corporate Footer -->
              <tr>
                <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px; font-size: 11px; color: #64748b; line-height: 1.6;">
                  <strong>HRDuo Technologies Pvt. Ltd.</strong> &bull; Enterprise Deployment Hub, Bhubaneswar, Odisha, India<br />
                  Confidential &bull; Generated automatically via HRDuo Core Production Relay &bull; contact.hrduo@gmail.com
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

// 2. Formal Corporate Email to Client / Sender (Inquiry Acknowledgment & Letter)
function buildClientCorporateEmail({ name, businessName, email, solutionInterested, message, refId, dateStr }) {
  const solutionLabel = SOLUTION_LABELS[solutionInterested] || solutionInterested || 'Complete HRDuo Suite';

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>Inquiry Acknowledgment — HRDuo Technologies</title>
    </head>
    <body style="margin: 0; padding: 30px 16px; background-color: #f1f5f9; font-family: 'Segoe UI', Arial, Helvetica, sans-serif; color: #1e293b;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td align="center">
            
            <table width="640" cellpadding="0" cellspacing="0" border="0" style="max-width: 640px; width: 100%; background-color: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); overflow: hidden;">
              
              <!-- Letterhead Header -->
              <tr>
                <td style="background-color: #0f172a; padding: 24px 32px; border-bottom: 3px solid #008C75;">
                  <table width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td>
                        <div style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px;">
                          HRDUO TECHNOLOGIES
                        </div>
                        <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.2px;">
                          Official Inquiry Acknowledgment
                        </h1>
                      </td>
                      <td align="right" valign="top">
                        <span style="display: inline-block; font-size: 11px; font-weight: 700; color: #0f172a; background-color: #ffffff; padding: 4px 10px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">
                          Ref #${refId}
                        </span>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Business Letter Body -->
              <tr>
                <td style="padding: 28px 32px 16px 32px; font-size: 14px; line-height: 1.7; color: #334155;">
                  <p style="margin: 0 0 14px 0; font-weight: 700; color: #0f172a; font-size: 15px;">
                    Dear ${name},
                  </p>
                  <p style="margin: 0 0 14px 0;">
                    Thank you for contacting <strong>HRDuo Technologies</strong> regarding our workforce automation infrastructure. We formally acknowledge receipt of your inquiry on behalf of <strong>${businessName || 'your organization'}</strong>.
                  </p>
                  <p style="margin: 0 0 20px 0;">
                    Your request has been logged in our deployment registry under Reference ID <strong>#${refId}</strong>. A designated Enterprise Solutions Specialist from our Bhubaneswar Hub has been assigned to your case and will connect with you within <strong>two (2) business hours</strong> to discuss your operational requirements, hardware sizing, or live software demonstration.
                  </p>
                </td>
              </tr>

              <!-- Inquiry Summary Table -->
              <tr>
                <td style="padding: 0 32px 20px 32px;">
                  <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; overflow: hidden;">
                    <div style="background-color: #f1f5f9; padding: 10px 16px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.8px;">
                      Record of Submitted Particulars
                    </div>
                    
                    <table width="100%" cellpadding="9" cellspacing="0" border="0" style="font-size: 13px;">
                      <tr>
                        <td width="35%" style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Registered Organization:</td>
                        <td width="65%" style="font-weight: 700; color: #0f172a; border-bottom: 1px solid #e2e8f0;">${businessName || 'Enterprise Inquirer'}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Solution Category:</td>
                        <td style="font-weight: 700; color: #008C75; border-bottom: 1px solid #e2e8f0;">${solutionLabel}</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-left: 16px;">Official Transcript:</td>
                        <td style="color: #334155; border-bottom: 1px solid #e2e8f0; font-style: italic;">"${message || 'General enterprise consultation request'}"</td>
                      </tr>
                      <tr>
                        <td style="font-weight: 600; color: #64748b; padding-left: 16px;">Timestamp (IST):</td>
                        <td style="color: #475569;">${dateStr}</td>
                      </tr>
                    </table>
                  </div>
                </td>
              </tr>

              <!-- Priority Support Notice -->
              <tr>
                <td style="padding: 0 32px 24px 32px;">
                  <div style="background-color: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #2563eb; padding: 14px 18px; border-radius: 4px; font-size: 13px; line-height: 1.6; color: #1e3a8a;">
                    <strong>Immediate Technical Assistance:</strong> If your deployment requires expedited scheduling or urgent hardware provisioning, please reach out directly to our enterprise desk at <strong>+91 82609 35532</strong> or via reply to this transmission.
                  </div>
                </td>
              </tr>

              <!-- Official Sign-off -->
              <tr>
                <td style="padding: 0 32px 32px 32px; font-size: 14px; line-height: 1.6; color: #334155;">
                  <p style="margin: 0 0 12px 0;">Sincerely,</p>
                  
                  <div style="border-left: 3px solid #008C75; padding-left: 12px;">
                    <strong style="font-size: 15px; color: #0f172a; display: block;">Enterprise Solutions & Deployment Desk</strong>
                    <span style="font-size: 13px; color: #64748b; display: block;">HRDuo Technologies Pvt. Ltd.</span>
                    <span style="font-size: 13px; color: #475569; display: block; margin-top: 4px;">
                      Bhubaneswar Hub, Odisha, India &bull; Hotline: +91 82609 35532
                    </span>
                    <span style="font-size: 12px; color: #008C75; font-weight: 600; display: block; margin-top: 2px;">
                      contact.hrduo@gmail.com &bull; <a href="https://hrduo.in" style="color: #008C75; text-decoration: none;">www.hrduo.in</a>
                    </span>
                  </div>
                </td>
              </tr>

              <!-- Corporate Regulatory Footer -->
              <tr>
                <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 18px 32px; font-size: 11px; color: #64748b; line-height: 1.6;">
                  <strong>HRDuo Technologies Pvt. Ltd.</strong> &bull; Bhubaneswar Enterprise Center, Odisha, India<br />
                  CONFIDENTIALITY NOTICE: This transmission is intended solely for the recipient named above. If you received this transmission in error, please notify the sender and delete immediately.
                </td>
              </tr>

            </table>

          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

function brevoContactPlugin() {
  return {
    name: 'brevo-contact-plugin',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          const liveEnv = getLiveEnv();
          try {
            const data = JSON.parse(body || '{}');
            const { name, businessName, email, solutionInterested, message } = data;

            if (!name || !email) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Name and email are required' }));
              return;
            }

            const smtpKey = liveEnv.BREVO_API_KEY || liveEnv.BREVO_SMTP_KEY || '';
            const smtpUser = liveEnv.BREVO_SMTP_USER || 'b8dc8a001@smtp-brevo.com';
            const smtpHost = liveEnv.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
            const smtpPort = parseInt(liveEnv.BREVO_SMTP_PORT || '587', 10);
            const toEmail = liveEnv.BREVO_TO_EMAIL || 'contact.hrduo@gmail.com';
            const fromEmail = liveEnv.BREVO_FROM_EMAIL || 'contact.hrduo@gmail.com';

            if (!smtpKey) {
              console.warn('[Brevo SMTP Warning] BREVO_SMTP_KEY is not set in .env.');
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ 
                success: true, 
                warning: 'BREVO_SMTP_KEY not set in .env. Form submission simulated successfully.',
                needsKey: true
              }));
              return;
            }

            const refId = `HRD-${Date.now().toString().slice(-6)}`;
            const dateStr = getFormattedISTDate();

            // 1. If an API Key (starts with xkeysib-) is provided, use Brevo's HTTP REST API
            if (smtpKey.startsWith('xkeysib-')) {
              try {
                // Email 1: Send Admin Notification (New Lead Dossier)
                const adminHtml = buildAdminCorporateEmail({ name, businessName, email, solutionInterested, message, refId, dateStr });
                const apiRes = await fetch('https://api.brevo.com/v3/smtp/email', {
                  method: 'POST',
                  headers: {
                    'accept': 'application/json',
                    'api-key': smtpKey,
                    'content-type': 'application/json'
                  },
                  body: JSON.stringify({
                    sender: { name: 'HRDuo Lead Gateway', email: fromEmail },
                    to: [{ email: toEmail, name: 'HRDuo Enterprise Desk' }],
                    replyTo: { email: email, name: name },
                    subject: `[New Lead Dossier #${refId}] ${name} — ${businessName || 'Enterprise'}`,
                    htmlContent: adminHtml
                  })
                });

                const apiData = await apiRes.json().catch(() => ({}));
                if (!apiRes.ok) {
                  throw new Error(apiData.message || `Brevo API returned HTTP ${apiRes.status}`);
                }

                // Email 2: Send Client Confirmation (Formal Letter)
                try {
                  const clientHtml = buildClientCorporateEmail({ name, businessName, email, solutionInterested, message, refId, dateStr });
                  await fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: {
                      'accept': 'application/json',
                      'api-key': smtpKey,
                      'content-type': 'application/json'
                    },
                    body: JSON.stringify({
                      sender: { name: 'HRDuo Technologies', email: fromEmail },
                      to: [{ email: email, name: name }],
                      replyTo: { email: fromEmail, name: 'HRDuo Enterprise Desk' },
                      subject: `Inquiry Acknowledgment & Dossier Ref #${refId} — HRDuo Technologies`,
                      htmlContent: clientHtml
                    })
                  });
                } catch (clientErr) {
                  console.warn('[Brevo API Warning] Client confirmation email skipped:', clientErr.message);
                }

                console.log(`[Brevo API Success] Formal corporate emails dispatched for lead ${name} (${email}) [Ref #${refId}]`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, message: 'Corporate emails dispatched successfully via Brevo API!' }));
                return;
              } catch (apiErr) {
                console.error('[Brevo API Error]:', apiErr);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: `Brevo API Error: ${apiErr.message}` }));
                return;
              }
            }

            // 2. Otherwise, use Nodemailer SMTP Relay
            const isSecure = smtpPort === 465;
            const transporter = nodemailer.createTransport({
              host: smtpHost,
              port: smtpPort,
              secure: isSecure,
              connectionTimeout: 30000,
              greetingTimeout: 30000,
              socketTimeout: 30000,
              auth: {
                user: smtpUser,
                pass: smtpKey
              }
            });

            // Email 1: Send Admin Notification (New Lead Dossier to You)
            const adminHtml = buildAdminCorporateEmail({ name, businessName, email, solutionInterested, message, refId, dateStr });
            await transporter.sendMail({
              from: `"HRDuo Lead Gateway" <${fromEmail}>`,
              to: toEmail,
              replyTo: email,
              subject: `[New Lead Dossier #${refId}] ${name} — ${businessName || 'Enterprise'}`,
              html: adminHtml
            });

            // Email 2: Send Client Confirmation (Formal Letter to Customer)
            try {
              const clientHtml = buildClientCorporateEmail({ name, businessName, email, solutionInterested, message, refId, dateStr });
              await transporter.sendMail({
                from: `"HRDuo Technologies" <${fromEmail}>`,
                to: email,
                replyTo: fromEmail,
                subject: `Inquiry Acknowledgment & Dossier Ref #${refId} — HRDuo Technologies`,
                html: clientHtml
              });
            } catch (clientErr) {
              console.warn('[Brevo SMTP Warning] Client confirmation email skipped:', clientErr.message);
            }

            console.log(`[Brevo SMTP Success] Formal corporate emails dispatched for lead ${name} (${email}) [Ref #${refId}]`);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Corporate emails dispatched successfully via Brevo SMTP' }));
          } catch (err) {
            console.error('[Brevo SMTP Error]:', err);
            let userFriendlyMsg = err.message || 'Failed to send email via Brevo SMTP';
            const currentHost = liveEnv?.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
            if (userFriendlyMsg.includes('525') || userFriendlyMsg.includes('Unauthorized IP')) {
              userFriendlyMsg = 'Brevo rejected the connection (525 Unauthorized IP address). In Brevo, go to Settings / SMTP & API > "Authorized IPs" and disable the IP restriction. Or use a Brevo API Key (xkeysib-...).';
            } else if (userFriendlyMsg.includes('ETIMEDOUT')) {
              userFriendlyMsg = `Connection to ${currentHost} timed out. Check network or use a Brevo API Key (xkeysib-...).`;
            }
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: userFriendlyMsg }));
          }
        });
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), brevoContactPlugin()],
  server: {
    proxy: {
      '/api/face': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  }
});
