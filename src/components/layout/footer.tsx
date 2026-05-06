export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/50">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. Built with Next.js & Notion.
          </p>
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>

          </div>
        </div>
      </div>
    </footer>
  )
}
