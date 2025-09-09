# EmailJS Setup Guide

## Quick Setup Steps

### 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month free)

### 2. Add Email Service
1. Go to "Email Services" in your dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. For Gmail:
   - Click "Connect Account" and authorize Gmail
   - **Important**: Uncheck "Use Default Email Address"
   - Enter your actual email address
5. Click "Create Service"
6. Note down your **Service ID** (e.g., "service_abc123")
7. service_y6pf3yo

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Configure template:
   - **Template Name**: Wedding RSVP
   - **To Email**: Your email address
   - **From Name**: {{from_name}}
   - **Subject**: Wedding RSVP from {{from_name}}
   
4. **Email Content** (use this template):
```
New RSVP Received!

Guest Details:
- Name: {{from_name}}
- Email: {{from_email}}
- Phone: {{phone}}
- Number of Guests: {{guests_count}}
- Attending: {{attending}}

Dietary Restrictions: {{dietary_restrictions}}

Message from Guest:
{{message}}

Submitted: {{submitted_at}}
```

5. Save template and note down your **Template ID** (e.g., "template_xyz789")

### 4. Get Your Public Key
1. Go to "Account" > "API Keys"
2. Copy your **Public Key** (e.g., "abcd1234efgh5678")

### 5. Update index.html
Replace these placeholders in index.html:
- `YOUR_PUBLIC_KEY` → Your actual public key
- `YOUR_SERVICE_ID` → Your service ID
- `YOUR_TEMPLATE_ID` → Your template ID

Example:
```javascript
// Before
emailjs.init('YOUR_PUBLIC_KEY');
await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {...});

// After
emailjs.init('abcd1234efgh5678');
await emailjs.send('service_abc123', 'template_xyz789', {...});
```

## Testing
1. Open index.html in browser
2. Click "Confirm Attendance"
3. Fill out the form
4. Submit and check your email

## Troubleshooting
- **Email not received**: Check spam folder
- **Error on submit**: Verify all IDs are correct
- **403 Error**: Check your public key
- **Daily limit**: Free tier allows 200 emails/month

## Security Note
The public key will be visible in your code. This is normal for EmailJS.
To prevent abuse:
- Set up domain restrictions in EmailJS dashboard
- Use reCAPTCHA (optional, in EmailJS settings)
- Monitor usage in your EmailJS dashboard