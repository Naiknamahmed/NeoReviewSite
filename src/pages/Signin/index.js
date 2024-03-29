import React, { useState } from 'react';
import LoginTypeTrue from './Component/LoginTypeTrue';
import LoginTypeFalse from './Component/LoginTypeFalse';
import LoginNavbar from '../../components/Navbars/LoginNavbar';

export default function Signin() {
  const [isToogleOn, setisToogleOn] = useState(false);

  return (
    <>
      <LoginNavbar />
      <main>
        <section className="relative w-full h-full py-10 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-white-800 bg-no-repeat bg-full bg-fixed"
            style={{
              backgroundImage:
                "url(" + require("assets/img/bottom.webp").default + ")",
            }}
          ></div>
          <div className="mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="4xl:w-2/12 3xl:w-3/12 2xl:w-4/12 xl:w-2/6 lg:w-2/5 md:w-6/12 sm:w-6/12  px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                  <div className="rounded-t mb-0 px-2 py-2">
                    <div className="flex grid content-center items-center justify-center ">
                      <img
                        alt="..."
                        className="w-full h-full mr-1"
                        src={require("assets/img/Newbg.webp").default}
                      />
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-2 pt-0">
                    <div
                      className="flex text-black mb-3 font-bold"
                      style={{ justifyContent: "center" }}
                    >
                      <div className="font-styl">Versión: &nbsp;</div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          id="togBtn"
                          onChange={(e) => setisToogleOn(e.target.checked)}
                        />
                        <div className="slider round">
                          <span className="on">Alumnos</span>
                          <span className="off">Prueba</span>
                        </div>
                      </label>
                    </div>
                    {isToogleOn === true ? (
                      <LoginTypeTrue />
                    ) : (
                      <LoginTypeFalse />
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap mt-6 relative">
                  <div className="w-1/2"></div>

                  <div className="w-1/2 text-right"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
