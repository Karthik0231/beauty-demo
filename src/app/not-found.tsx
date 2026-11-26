import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-obsidian px-6 text-center text-porcelain">
      <h1 className="type-display text-porcelain">404</h1>
      <p className="type-section-nav mt-3 text-ash">
        The requested atelier page could not be found.
      </p>
      <Link
        href="/"
        className="type-utility-nav mt-6 rounded-[170px] bg-primary px-5 py-2.5 font-semibold text-on-primary transition-colors hover:bg-tertiary"
      >
        Return to Maison Aurélia
      </Link>
    </main>
  );
}
