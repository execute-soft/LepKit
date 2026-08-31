import React from "react";

interface LoaderProps {
  isLoading?: boolean;
  label?: string;
  helperText?: string;
}

const Loader: React.FC<LoaderProps> = ({
  isLoading = true,
  label,
  helperText,
}) => {
  if (!isLoading) return null;
  const showCopy = Boolean(label || helperText);

  return (
    <>
      <style>
        {`
          @keyframes loading-bar {
            0% {
              width: 0%;
            }
            50% {
              width: 70%;
            }
            100% {
              width: 100%;
            }
          }
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      {showCopy ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
            background: "rgba(250, 250, 250, 0.92)",
            color: "#111827",
            textAlign: "center",
            padding: "24px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "9999px",
              border: "4px solid rgba(91, 61, 245, 0.2)",
              borderTopColor: "#5b3df5",
              animation: "spin 0.9s linear infinite",
            }}
          />
          {label ? (
            <div style={{ fontSize: "16px", fontWeight: 600 }}>{label}</div>
          ) : null}
          {helperText ? (
            <div style={{ fontSize: "13px", color: "#6b7280" }}>
              {helperText}
            </div>
          ) : null}
        </div>
      ) : null}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 51,
        }}
      >
        <div
          style={{
            height: "4px",
            background: "linear-gradient(90deg, #5b3df5 0%, #f35c9b 100%)",
            boxShadow: "0 2px 8px 0 rgba(80, 0, 80, 0.08)",
            animation: "loading-bar 1.5s ease-in-out infinite",
          }}
        />
      </div>
    </>
  );
};

export default Loader;
