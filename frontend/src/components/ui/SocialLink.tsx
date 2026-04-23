import socialIconMap from "./socialIconMap";

interface SocialLinkProps {
  label: keyof typeof socialIconMap;
}

export default function SocialLink({ label }: SocialLinkProps) {
  return (
    <a href="#" className="group glassPanel socialLinkButton">
      <span className="material-symbols-outlined socialLinkIcon">
        {socialIconMap[label]}
      </span>
      <span className="socialLinkLabel">{label}</span>
    </a>
  );
}
