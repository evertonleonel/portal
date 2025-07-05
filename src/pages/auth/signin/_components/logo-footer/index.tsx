import { cn } from '@/lib/utils';

export const LogoFooter = ({ classname }: { classname?: string }) => {
  return (
    <div className={cn('flex items-center justify-center gap-6', classname)}>
      <picture>
        <img src="/images/logos/logo-mrs.svg" alt="Logo MRS" />
      </picture>
      <picture>
        <img src="/images/logos/logo-fips.svg" alt="Logo FIPS" />
      </picture>
      <picture>
        <img src="/images/logos/logo-rumo.svg" alt="Logo RUMO" />
      </picture>
      <picture>
        <img src="/images/logos/logo-vli.svg" alt="Logo VLI" />
      </picture>
    </div>
  );
};
