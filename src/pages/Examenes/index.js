import React, { Suspense } from "react";
const Examenes = React.lazy(() => import("../../components/Examenes/index"));

function ExamenesPage() {
  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        <Examenes />
      </Suspense>
    </>
  );
}

export default ExamenesPage;
