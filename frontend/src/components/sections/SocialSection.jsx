import SocialLink from "../ui/SocialLink";

export default function SocialSection() {
  return (
    <section className="relative z-20 py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="font-headline text-4xl font-light uppercase tracking-[0.2em] mb-2 text-on-background">
            Connect
          </h2>
          <p className="font-label text-[10px] text-on-background/60 tracking-[0.4em] uppercase">
            STAY UPDATED WITH MY JOURNEY
          </p>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          <SocialLink label="Twitter" />
          <SocialLink label="Instagram" />
          <SocialLink label="Discord" />
          <SocialLink label="YouTube" />
          <SocialLink label="LinkedIn" />
        </div>
      </div>
    </section>
  );
}
