import socialIconMap from "./socialIconMap";

interface SocialLinkProps {
  label: keyof typeof socialIconMap;
  href: string;
}

export default function SocialLink({ label, href }: SocialLinkProps) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group glassPanel socialLinkButton">
      <span className="material-symbols-outlined socialLinkIcon">
        {socialIconMap[label]}
      </span>
      <span className="socialLinkLabel">{label}</span>
    </a>
  );
}
