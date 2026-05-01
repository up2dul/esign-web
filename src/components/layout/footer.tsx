export const Footer = () => {
  return (
    <footer className="border-[#eadbe0] border-t px-4 py-6 text-[#8e7b84] text-[0.68rem] uppercase tracking-[0.2em] lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
        <span>© {new Date().getFullYear()} ESign Precision Curator</span>
        <div className="flex items-center gap-7">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span>Contact</span>
        </div>
      </div>
    </footer>
  );
};
