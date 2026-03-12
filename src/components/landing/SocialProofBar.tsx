export function SocialProofBar() {
  const companies = [
    "Kumar Logistics",
    "ShreeJi Transport",
    "FastFreight India",
    "Bharat Carriers",
    "NexGen Logistics",
  ];

  return (
    <section className="border-y border-border bg-neutral-50 py-10">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="mb-8 text-sm font-medium text-neutral-500">
          Trusted by transport operators across India
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {companies.map((name) => (
            <div
              key={name}
              className="flex h-10 items-center rounded-md bg-neutral-200/60 px-6"
            >
              <span className="text-sm font-semibold text-neutral-400">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
