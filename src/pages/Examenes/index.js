import React from "react";
import LazyLoad from "react-lazyload";
import Examenes from "../../components/Examenes/index";

function ExamenesPage() {
  return (
    <>
      <LazyLoad>
        <Examenes />
      </LazyLoad>
    </>
  );
}

export default ExamenesPage;
