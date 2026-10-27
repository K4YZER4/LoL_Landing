interface LoadingScreenProps {
  visible?: boolean;
}

export default function LoadingScreen({
  visible = true,
}: LoadingScreenProps) {
  return (
    <div
      className={`loadingScreen${visible ? "" : " loadingScreenHidden"}`}
      aria-hidden={!visible}
    >
      <div className="text-center">
        <h1 className="loadingTitle">ØRBIT#0B1T</h1>
      </div>
    </div>
  );
}
