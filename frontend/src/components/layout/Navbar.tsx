interface NavbarProps {
  gameName: string;
  tagLine: string;
}

export default function Navbar({ gameName, tagLine }: NavbarProps) {
  return (
    <nav className="navbarRoot">
      <div className="navbarLeft">
        <span
          id="navbar-title"
          className="navbarTitle heroTitleOutline"
          style={{ display: "inline-block" }}
        >
          {gameName}#{tagLine}
        </span>
      </div>
    </nav>
  );
}
