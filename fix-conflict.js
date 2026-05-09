const fs = require('fs')
const content = fs.readFileSync('src/lib/rate-limit.ts', 'utf8')
const fixed = content
  .replace('<<<<<<< HEAD\n  \n=======\n\n>>>>>>> origin/fix-ip-spoofing-vulnerability-17908598467203127367', '  ')
  .replace('<<<<<<< HEAD\n  \n=======\n\n>>>>>>> origin/fix-ip-spoofing-vulnerability-17908598467203127367', '  ')
  .replace('<<<<<<< HEAD\n  // In Vercel, x-real-ip is the safest, and x-forwarded-for is also sanitized by Vercel \n=======\n  // In Vercel, x-real-ip is the safest, and x-forwarded-for is also sanitized by Vercel\n>>>>>>> origin/fix-ip-spoofing-vulnerability-17908598467203127367', '  // In Vercel, x-real-ip is the safest, and x-forwarded-for is also sanitized by Vercel')

fs.writeFileSync('src/lib/rate-limit.ts', fixed)
