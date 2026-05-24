import type { ReactNode } from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { ensureStartsWith } from '@/utilities/ensureStartsWith'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import React from 'react'
import './globals.css'
// import Script from 'next/script'

import { defaultTheme, themeLocalStorageKey } from '@/providers/Theme/shared'

/* const { SITE_NAME, TWITTER_CREATOR, TWITTER_SITE } = process.env
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'
const twitterCreator = TWITTER_CREATOR ? ensureStartsWith(TWITTER_CREATOR, '@') : undefined
const twitterSite = TWITTER_SITE ? ensureStartsWith(TWITTER_SITE, 'https://') : undefined
 */
/* export const metadata = {
  metadataBase: new URL(baseUrl),
  robots: {
    follow: true,
    index: true,
  },
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  ...(twitterCreator &&
    twitterSite && {
      twitter: {
        card: 'summary_large_image',
        creator: twitterCreator,
        site: twitterSite,
      },
    }),
} */

export default async function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={[GeistSans.variable, GeistMono.variable].filter(Boolean).join(' ')}
      lang="en"
      suppressHydrationWarning
    >
      <head>
  <script
    id="theme-script"
    suppressHydrationWarning
    dangerouslySetInnerHTML={{
      __html: `
(function () {
  function getImplicitPreference() {
    var mediaQuery = '(prefers-color-scheme: dark)'
    var mql = window.matchMedia(mediaQuery)
    var hasImplicitPreference = typeof mql.matches === 'boolean'
    if (hasImplicitPreference) {
      return mql.matches ? 'dark' : 'light'
    }
    return null
  }

  function themeIsValid(theme) {
    return theme === 'light' || theme === 'dark'
  }

  var themeToSet = '${defaultTheme}'
  var preference = window.localStorage.getItem('${themeLocalStorageKey}')

  if (themeIsValid(preference)) {
    themeToSet = preference
  } else {
    var implicitPreference = getImplicitPreference()
    if (implicitPreference) {
      themeToSet = implicitPreference
    }
  }

  document.documentElement.setAttribute('data-theme', themeToSet)
})();
      `,
    }}
  />
  <link href="/favicon.ico" rel="icon" sizes="32x32" />
  <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
</head>
      <body>
        <Providers>
          <AdminBar />
          <LivePreviewListener />

          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
