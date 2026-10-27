interface LoadingScreenProps {
  visible?: boolean;
  title?: string;
}

export default function LoadingScreen({
  visible = true,
  title = "LOADING...",
}: LoadingScreenProps) {
  return (
    <div
      className={`loadingScreen${visible ? "" : " loadingScreenHidden"}`}
      aria-hidden={!visible}
    >
      <div className="text-center">
        {title ? <h1 className="loadingTitle">{title}</h1> : null}
      </div>
    </div>
  );
}
