import { Providers } from '../../providers'

export default function CafeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Providers>{children}</Providers>
}
