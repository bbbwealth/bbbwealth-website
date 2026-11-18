// Netlify event function for the PUBLIC website (bbbwealth/bbbwealth-website), not this dashboard.
// Copy to: netlify/functions/submission-created.js in the website repo.
//
// Netlify runs it automatically after each verified (non-spam) Netlify Forms submission.
// It forwards HLB card enquiries to the dashboard's Supabase database through the
// insert-only function public.ingest_website_enquiry. Netlify Forms keeps its own copy.
//
// Netlify environment variable needed on the WEBSITE site (Functions scope):
//   HLB_INTAKE_TOKEN   shared secret; Supabase stores only its SHA-256 hash.
// The Supabase URL and publishable key below are public by design.

const SUPABASE_URL = 'https://iifurrivuwfnwvrlmshl.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_egruRPCS8x3abkThfMSxNA_5JFsTxN8';
const FORM_NAME = 'hlb-card-enquiry';

exports.handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body).payload;
  } catch {
    return { statusCode: 400, body: 'bad payload' };
  }
  if (!payload || payload.form_name !== FORM_NAME) return { statusCode: 200, body: 'ignored' };

  const d = payload.data || {};
  if (d.website) return { statusCode: 200, body: 'ignored' }; // honeypot filled

  const token = process.env.HLB_INTAKE_TOKEN;
  if (!token) {
    console.error('HLB_INTAKE_TOKEN is not set; enquiry kept in Netlify Forms only', payload.id);
    return { statusCode: 500, body: 'not configured' };
  }

  const cards = Array.isArray(d.cards) ? d.cards : String(d.cards || '').split(/[,\s]+/).filter(Boolean);
  const consent = ['on', 'true', 'yes', '1'].includes(String(d.acknowledgement || '').toLowerCase());

  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/ingest_website_enquiry`, {
    method: 'POST',
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      p_token: token,
      p_submission_id: String(payload.id),
      p_name: d.fullName || d.name || '',
      p_phone: d.phone || '',
      p_email: d.email || null,
      p_cards: cards,
      p_consent: consent
    })
  });

  if (!res.ok) {
    // Never log the applicant's details; the submission id is enough to find it in Netlify Forms.
    console.error('Dashboard intake failed', res.status, payload.id);
    return { statusCode: 502, body: 'intake failed' };
  }
  console.log('Dashboard intake ok', payload.id, await res.text());
  return { statusCode: 200, body: 'ok' };
};
