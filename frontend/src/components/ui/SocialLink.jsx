import socialIconMap from "./socialIconMap";

export default function SocialLink({ label }) {
  return (
    <a href="#" className="group glassPanel socialLinkButton">
      <span className="material-symbols-outlined socialLinkIcon">
        {socialIconMap[label]}
      </span>
      <span className="socialLinkLabel">{label}</span>
    </a>
  );
}
