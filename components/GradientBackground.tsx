"use client";

export const GradientBackground = () => (
  <div
    style={{
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: -1,
      filter: "blur(118px)",
      maxWidth: "48rem",
      height: "800px",
      marginLeft: "auto",
      marginRight: "auto",
      background:
        "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
    }}
  />
);
