export const Footer = () => {
  return (
    <footer className="border-baixada-gray-red-50 flex h-[54px] border-t bg-white px-2 pb-[4px] pt-[9px] sm:px-4 md:px-6 lg:px-10">
      <ul className="ml-auto flex items-center justify-center gap-1 sm:gap-3 md:gap-4 lg:gap-6">
        <li>
          <img src="/images/logos/logo-mrs.svg" alt="Logo MRS" />
        </li>
        <li>
          <img src="/images/logos/logo-fips.svg" alt="Logo FIPS" />
        </li>
        <li>
          <img src="/images/logos/logo-rumo.svg" alt="Logo RUMO" />
        </li>
        <li>
          <img src="/images/logos/logo-vli.svg" alt="Logo VLI" />
        </li>
      </ul>
    </footer>
  );
};
