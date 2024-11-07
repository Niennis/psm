export async function getCaptchaToken() {

  return new Promise(resolve => {
    grecaptcha.ready(async () => {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

      if (!siteKey) {
        resolve(null)
        return
      }
      const token = await grecaptcha.execute(siteKey, {
        action: 'login'
      })
      resolve(token)
    })
  })
}

export async function verifyCaptchaToken(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    throw new Error("No se enocntró la key")
  }

  const url = new URL("https://www.google.com/recaptcha/api/siteverify")

  url.searchParams.append('secret', secretKey)

  url.searchParams.append('response', token)

  const res = await fetch(url, { method: 'POST' })
  const captchaData = await res.json()

  if (!res.ok) return null;

  return captchaData;
}