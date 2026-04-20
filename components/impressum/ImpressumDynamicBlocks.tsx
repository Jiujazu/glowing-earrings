"use client";

import dynamic from "next/dynamic";

const ImpressumAddress = dynamic(
  () =>
    import("@/components/impressum/ImpressumSensitiveData").then(
      (m) => m.ImpressumAddress
    ),
  { ssr: false, loading: () => <span>…</span> }
);

const ImpressumEmail = dynamic(
  () =>
    import("@/components/impressum/ImpressumSensitiveData").then(
      (m) => m.ImpressumEmail
    ),
  { ssr: false, loading: () => <span>…</span> }
);

export function ImpressumAddressBlock() {
  return <ImpressumAddress />;
}

export function ImpressumEmailBlock() {
  return <ImpressumEmail />;
}
