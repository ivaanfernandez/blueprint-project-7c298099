import { Helmet } from "react-helmet-async";

const HuellaAzul = () => (
  <>
    <Helmet>
      <title>Blueprint Lab — Elite Training System | Blueprint Project</title>
      <meta
        name="description"
        content="Blueprint Lab: data-driven elite training system. Strength, physique, mobility and real progression through structured coaching at our premium gym in Santurce, Puerto Rico."
      />
      <meta property="og:title" content="Blueprint Lab — Elite Training System" />
      <meta
        property="og:description"
        content="Data-driven elite training system. Strength, physique, mobility and real progression."
      />
      <link rel="canonical" href="https://blueprintproject.com/huella-azul" />
    </Helmet>
    <div className="flex min-h-screen items-center justify-center" style={{ backgroundColor: "#000", fontFamily: "'Space Grotesk', sans-serif" }}>
      <p style={{ color: "#fff", fontSize: "18px", letterSpacing: "0.2em" }}>HUELLA AZUL</p>
    </div>
  </>
);
export default HuellaAzul;
