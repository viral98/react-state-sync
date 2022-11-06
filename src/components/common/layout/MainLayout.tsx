import { TopNav } from './TopNav'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="layout">
      <TopNav />

      <main>
        <div className="main-content">{children}</div>
      </main>
    </div>
  )
}
