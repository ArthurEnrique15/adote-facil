import StyledComponentsRegistry from '@/lib/registry'
import { GlobalStyles } from '@/styles/global'
import { ThemeClient } from '@/providers/ThemeClientProvider'

import { Nunito } from 'next/font/google'

const nunitoFont = Nunito({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={nunitoFont.className}>
      <body>
        <StyledComponentsRegistry>
          <ThemeClient>
            <GlobalStyles />
            {children}
          </ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
