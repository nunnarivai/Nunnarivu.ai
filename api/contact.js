/* eslint-env node */
import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_LEN = {
  firstName: 80,
  lastName: 80,
  companyName: 120,
  jobTitle: 100,
  businessEmail: 160,
  phone: 40,
  website: 240,
  interest: 120,
  message: 4000,
  pageUrl: 300,
}

const ALLOWED_SERVICES = new Set([
  'AI Video Generation',
  'AI Image Generation',
  'AI Voice Generation',
  'AI Movie Creation',
  'AI Automation',
  'Custom Software Development',
  'Enterprise AI Solutions',
  'Training / Academy',
  'Other',
])

// Sliding-window in-memory rate limiter per IP (5 requests per 15 minutes)
const RATE_WINDOW_MS = 15 * 60 * 1000
const RATE_MAX = 5
const rateBuckets = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const history = (rateBuckets.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS)
  if (history.length >= RATE_MAX) {
    rateBuckets.set(ip, history)
    return true
  }
  history.push(now)
  rateBuckets.set(ip, history)
  return false
}

function cleanStr(val, maxLen) {
  if (typeof val !== 'string') return ''
  return val.trim().slice(0, maxLen)
}

function stripHeaderBreaks(val) {
  return val.replace(/[\r\n]+/g, ' ').trim()
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normalizeUrl(raw) {
  if (!raw) return ''
  const candidate = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`
  try {
    const parsed = new URL(candidate)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString()
    }
    return null
  } catch {
    return null
  }
}

export function validateContactPayload(body) {
  const errors = {}
  const data = {
    firstName: cleanStr(body?.firstName, MAX_LEN.firstName),
    lastName: cleanStr(body?.lastName, MAX_LEN.lastName),
    companyName: cleanStr(body?.companyName, MAX_LEN.companyName),
    jobTitle: cleanStr(body?.jobTitle, MAX_LEN.jobTitle),
    businessEmail: cleanStr(body?.businessEmail, MAX_LEN.businessEmail),
    phone: cleanStr(body?.phone, MAX_LEN.phone),
    website: cleanStr(body?.website, MAX_LEN.website),
    interest: cleanStr(body?.interest, MAX_LEN.interest),
    message: cleanStr(body?.message, MAX_LEN.message),
    pageUrl: cleanStr(body?.pageUrl, MAX_LEN.pageUrl),
    honeypot: cleanStr(body?.companyFax, 120),
    consentGiven: Boolean(body?.consentGiven),
  }

  if (!data.firstName) errors.firstName = 'First name is required'
  if (!data.lastName) errors.lastName = 'Last name is required'
  if (!data.companyName) errors.companyName = 'Company name is required'
  if (!data.businessEmail) {
    errors.businessEmail = 'Business email is required'
  } else if (!EMAIL_RE.test(data.businessEmail)) {
    errors.businessEmail = 'Enter a valid business email address'
  }
  if (!data.interest || !ALLOWED_SERVICES.has(data.interest)) {
    errors.interest = 'Please select an interested service'
  }
  if (!data.message || data.message.length < 10) {
    errors.message = 'Please describe your project requirements (at least 10 characters)'
  }
  if (data.website) {
    const normalized = normalizeUrl(data.website)
    if (!normalized) {
      errors.website = 'Enter a valid company website URL'
    } else {
      data.website = normalized
    }
  }

  return { data, errors, isValid: Object.keys(errors).length === 0 }
}

function buildEmailTemplates(data, submittedAt) {
  const safeCompany = stripHeaderBreaks(data.companyName)
  const subject = `New Nunnarivu.ai Enterprise Enquiry — ${safeCompany}`

  const rows = [
    ['Submitted At', submittedAt],
    ['First Name', data.firstName],
    ['Last Name', data.lastName],
    ['Company', data.companyName],
    ['Job Title', data.jobTitle || 'Not provided'],
    ['Business Email', data.businessEmail],
    ['Phone Number', data.phone || 'Not provided'],
    ['Company Website', data.website || 'Not provided'],
    ['Interested Service', data.interest],
    ['Source Page', data.pageUrl || '/new-site'],
    ['Consent Metadata', data.consentGiven ? `Confirmed at ${submittedAt}` : 'Submitted via enquiry form'],
  ]

  const text = [
    subject,
    '='.repeat(subject.length),
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Project Requirements / Message:',
    '--------------------------------',
    data.message,
  ].join('\n')

  const htmlRows = rows
    .map(
      ([label, val]) => `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;font-weight:600;color:#374151;width:190px;vertical-align:top;">${escapeHtml(label)}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e5e7eb;color:#111827;">${escapeHtml(val)}</td>
        </tr>`
    )
    .join('')

  const html = `
    <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;">
      <div style="background:#0b0b0b;color:#ffffff;padding:24px 28px;">
        <div style="font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#d1fe17;font-weight:700;">Nunnarivu.ai Enterprise</div>
        <h1 style="margin:8px 0 0;font-size:20px;line-height:1.3;color:#ffffff;">New Enterprise Enquiry — ${escapeHtml(data.companyName)}</h1>
      </div>
      <div style="padding:20px 24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.5;">
          <tbody>${htmlRows}</tbody>
        </table>
        <div style="margin-top:20px;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#4b5563;margin-bottom:8px;">Project Requirements / Message</div>
          <p style="margin:0;white-space:pre-wrap;font-size:14px;line-height:1.6;color:#111827;">${escapeHtml(data.message)}</p>
        </div>
      </div>
    </div>`

  return { subject, text, html }
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') return req.body
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body)
    } catch {
      return null
    }
  }
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  if (chunks.length === 0) return {}
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'))
  } catch {
    return null
  }
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')

  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Allow', 'POST')
    res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }))
    return
  }

  const forwarded = req.headers['x-forwarded-for']
  const ip = (typeof forwarded === 'string' ? forwarded.split(',')[0] : req.socket?.remoteAddress || 'unknown').trim()

  if (isRateLimited(ip)) {
    res.statusCode = 429
    res.end(
      JSON.stringify({
        ok: false,
        error: 'Too many submissions from your connection. Please wait a few minutes and try again.',
      })
    )
    return
  }

  const body = await readJsonBody(req)
  if (!body || typeof body !== 'object') {
    res.statusCode = 400
    res.end(JSON.stringify({ ok: false, error: 'Invalid JSON request payload.' }))
    return
  }

  const { data, errors, isValid } = validateContactPayload(body)

  // Bot honeypot check — reject quietly without invoking mail provider
  if (data.honeypot) {
    res.statusCode = 400
    res.end(JSON.stringify({ ok: false, error: 'Unable to process submission.' }))
    return
  }

  if (!isValid) {
    res.statusCode = 422
    res.end(
      JSON.stringify({
        ok: false,
        error: 'Please check the highlighted form fields and try again.',
        fieldErrors: errors,
      })
    )
    return
  }

  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10)
  const smtpSecure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : smtpPort === 465
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpFrom = process.env.SMTP_FROM || smtpUser
  const toEmail = process.env.CONTACT_TO_EMAIL || 'nunanrivu@gmail.com'

  if (!smtpHost || !smtpUser || !smtpPass) {
    res.statusCode = 503
    res.end(
      JSON.stringify({
        ok: false,
        code: 'MAIL_NOT_CONFIGURED',
        error:
          'Email delivery is not yet configured on this server (missing SMTP environment variables). Please contact us directly via WhatsApp or email while mail settings are finalized.',
      })
    )
    return
  }

  const submittedAt = new Date().toISOString()
  const { subject, text, html } = buildEmailTemplates(data, submittedAt)

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    const info = await transporter.sendMail({
      from: smtpFrom,
      to: toEmail,
      replyTo: stripHeaderBreaks(data.businessEmail),
      subject,
      text,
      html,
    })

    if (!info || !info.messageId) {
      throw new Error('Mail provider did not return a message acceptance ID.')
    }

    res.statusCode = 200
    res.end(
      JSON.stringify({
        ok: true,
        messageId: info.messageId,
        message:
          'Thank you for contacting Nunnarivu.ai. Our team has received your enquiry and will get back to you.',
      })
    )
  } catch (err) {
    console.error('[api/contact] Email send failed:', err?.message || err)
    res.statusCode = 502
    res.end(
      JSON.stringify({
        ok: false,
        code: 'MAIL_DELIVERY_FAILED',
        error:
          'We could not deliver your enquiry right now due to a mail server issue. Please try again shortly or reach out directly via WhatsApp or email.',
      })
    )
  }
}
