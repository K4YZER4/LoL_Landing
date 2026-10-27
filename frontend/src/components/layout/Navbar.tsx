interface NavbarProps {
  displayName: string;
}

export default function Navbar({ displayName }: NavbarProps) {
  return (
    <nav className="navbarRoot">
      <div className="navbarLeft">
        <span
          id="navbar-title"
          className="navbarTitle heroTitleOutline"
          style={{ display: "inline-block" }}
        >
          {displayName}
        </span>
      </div>
    </nav>
  );
}
