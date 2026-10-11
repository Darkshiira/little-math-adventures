
export default function Footer() {
  return (
    <footer className="border-t border-[#E9E4DA] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <a
          href="#hem"
          className="flex items-center gap-2 self-start rounded-lg text-sm font-extrabold text-forest"
        >
          <span aria-hidden="true">🦊</span>
          Matteäventyret
        </a>

        <p className="text-xs leading-5 text-muted">
          Matematik blir roligare när vi upptäcker tillsammans!
        </p>

        <a
          href="/om-mig"
          className="self-start rounded-lg py-1 text-xs font-bold text-forest underline-offset-4 hover:underline sm:self-auto"
        >
          Om mig
        </a>
      </div>
    </footer>
  );
}
