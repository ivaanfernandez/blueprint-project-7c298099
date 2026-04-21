import { useNavigate } from "react-router-dom";

const BackToHomeButton = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        background: "#000000",
        padding: "48px 6% 72px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => navigate("/")}
        style={{
          width: "100%",
          maxWidth: 640,
          minHeight: 72,
          padding: "20px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          borderRadius: 12,
          color: "rgba(255, 255, 255, 0.85)",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 14,
          fontWeight: 500,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.24)";
          e.currentTarget.style.color = "rgba(255, 255, 255, 1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
          e.currentTarget.style.border = "1px solid rgba(255, 255, 255, 0.12)";
          e.currentTarget.style.color = "rgba(255, 255, 255, 0.85)";
        }}
      >
        <span>←</span>
        <span>HOME</span>
      </button>
    </div>
  );
};

export default BackToHomeButton;
