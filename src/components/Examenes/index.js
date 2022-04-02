import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import PauseCircleOutlinedIcon from "@mui/icons-material/PauseCircleOutlined";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import Revisar from "../../assets/img/images/revisar.png";
import Salir from "../../assets/img/images/salirExamenes.png";
import Progressbar from "../ExamenesHelpers/Progressbar";
import Comenzar from "../../assets/img/images/comenzar.png";
import Conocimientos from "../../assets/img/images/conocimientos.png";
import inglesImg from "../../assets/img/images/ingles.png";
import psicoImg from "../../assets/img/images/psicotecnicos.png";
import ortoImg from "../../assets/img/images/ortografia.png";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import { Markup } from "interweave";
import tick from "../../assets/img/images/tick.png";
import cross from "../../assets/img/images/cross.png";
import useStyles from "./styles";
import "./styles.css";

function Examenes1() {
  const Styles = useStyles();
  const [showScreen, setShowScreen] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [endExam, setEndExam] = useState([]);
  const [pauseExam, setPauseExam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [studentAnswered, setStudentAnswered] = useState(null);
  const [arry, setArry] = useState([]);

  const data = getLocalUserdata();
  const student_type = data.type; // STUDENT TYPE
  // const studentid = data.id; // STUDENT ID

  const getExamData = {
    studentId: 4785,
    studentType: student_type,
  };

  // GET ALL EXAM LISTING API /////////////////////////////////

  useEffect(() => {
    axios
      .post(`https://neoestudio.net/api/getAllExam`, getExamData)
      .then((response) => {
        setFolderData(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Exams List Not Available !");
      });
  }, []);

  // START EXAM API CALL

  const startExams = (e, Conocimientos, Inglés, Ortografía, Psicotécnicos) => {
    setLoading(true);
    const startData = {
      studentId: 4785,
      studentType: student_type,
      // studentAnswered: arry,   /// STUDENT ANSWERED QUESTIONS ARRAY
      studentAttemptId: null,
      tab: null,
      studentType: student_type,
      examId: Conocimientos
        ? Conocimientos.id
        : Inglés
        ? Inglés.id
        : Ortografía
        ? Ortografía.id
        : Psicotécnicos.id,
      studentExamRecordId: Conocimientos
        ? Conocimientos.studentExamRecordId
        : Inglés
        ? Inglés.studentExamRecordId
        : Ortografía
        ? Ortografía.studentExamRecordId
        : Psicotécnicos.studentExamRecordId,
    };

    setSecondsRemaining(
      Conocimientos
        ? Conocimientos.timeFrom
        : Inglés.timeFrom
        ? Ortografía.timeFrom
        : Psicotécnicos.timeFrom
    );

    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        setExamData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
        setStatus(true);
        if (showScreen === true) {
          return setShowScreen(false);
        } else {
          setShowScore(false);
          setCurrentQuestion(0);
          return setShowScreen(true);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert("Please Try Again");
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // END EXAM API CALL

  const ResultPage = () => {
    const endData = {
      studentExamRecordId: examData[currentQuestion].studentExamRecordId,
      time: secondsRemaining,
    };
    axios
      .post(`https://neoestudio.net/api/endExam`, endData)
      .then((response) => {
        setEndExam(response.data);
        console.log(response.data);
        setShowScore(true);
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // Pause EXAM API CALL

  const pauseAnswer = () => {
    const pauseData = {
      studentExamRecordId: examData[currentQuestion].studentExamRecordId,
      time: secondsRemaining,
    };
    axios
      .post(`https://neoestudio.net/api/pauseAnswer`, pauseData)
      .then((response) => {
        setPauseExam(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // REVISAR BTN

  const restartQuiz = () => {
    if (showScore == true) {
      setShowScore(false);
      return setCurrentQuestion(0);
    } else {
      return showScore(true);
    }
  };
  // SALIR BTN

  const SalirBtn = () => {
    if (showScreen === false) {
      setShowScore(false);
      setCurrentQuestion(0);
      setArry([]);
      return setShowScreen(true);
    } else {
      return setShowScreen(false);
    }
  };

  // NEXT QUESTION BUTTON

  const nextQuestion = (examData) => {
    if (studentAnswered == examData[currentQuestion].correct) {
      setArry((prevState) => [...arry, "correct"]);
    } else if (studentAnswered == null) {
      setArry((prevState) => [...arry, "notAttempted"]);
    } else {
      setArry((prevState) => [...arry, "wrong"]);
    }

    setCurrentQuestion(currentQuestion + 1);
    setStudentAnswered(null);
  };
  console.log(arry, "ans");

  // END QUIZ Icon

  const endQuiz = () => {
    setStatus(false);
    ResultPage();
    return endQuiz;
  };

  // TIMER
  function useInterval(callback, delay) {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const twoDigits = (num) => String(num).padStart(2, "0");

  const [status, setStatus] = useState(true);

  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    pauseAnswer();
    if (status == true) {
      return setStatus(false);
    } else {
      return setStatus(true);
    }
  };

  useInterval(
    () => {
      if (status == true) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        endQuiz();
      }
    },
    status == true ? 1000 : null
  );

  return (
    <>
      {showScreen ? (
        <div>
          <main className={Styles.courseWrapper}>
            <Container maxWidth="lg">
              <Grid container spacing={2}>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={Conocimientos} alt="" height={150} />
                  <div className={Styles.headingText}>Conocimientos</div>
                </Grid>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={inglesImg} alt="" height={150} />
                  <div className={Styles.headingText}>Ingles</div>
                </Grid>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={psicoImg} alt="" height={150} />
                  <div className={Styles.headingText}>Psicotecnicos</div>
                </Grid>
                <Grid item xs={3} md={3} className={Styles.topImgHeadWrapper}>
                  <img src={ortoImg} alt="" height={150} />
                  <div className={Styles.headingText}>Ortografia</div>
                </Grid>
              </Grid>
              {loading ? (
                <div className="w-100 text-center">
                  <CircularProgress
                    style={{
                      width: "60px",
                      height: "60px",
                      margin: "90px",
                    }}
                  />
                </div>
              ) : (
                <>
                  {folderData.map((data) => {
                    return (
                      <>
                        <div className={Styles.heading}>{data.folderName} </div>
                        <div className={Styles.dataWrapper}>
                          <div>
                            {data.Conocimientos.map((Conocimientos) => {
                              return (
                                <div className={Styles.examLinks}>
                                  {Conocimientos.studentExamStatus ===
                                  "notAttempted" ? (
                                    <button
                                      id={Conocimientos.id}
                                      onClick={(e) =>
                                        startExams(e, Conocimientos)
                                      }
                                      style={{
                                        color: "red",
                                      }}
                                    >
                                      {Conocimientos.name}
                                    </button>
                                  ) : Conocimientos.studentExamStatus ===
                                    "end" ? (
                                    <button
                                      style={{ fontWeight: 800 }}
                                      id={Conocimientos.id}
                                      onClick={(e) =>
                                        startExams(e, Conocimientos)
                                      }
                                    >
                                      {Conocimientos.name}
                                    </button>
                                  ) : (
                                    <button
                                      id={Conocimientos.id}
                                      onClick={(e) =>
                                        startExams(e, Conocimientos)
                                      }
                                    >
                                      {Conocimientos.name}
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            {data.Inglés.map((Inglés) => {
                              return (
                                <div className={Styles.examLinks}>
                                  {Inglés.studentExamStatus ===
                                  "notAttempted" ? (
                                    <button
                                      id={Inglés.id}
                                      onClick={(e) => startExams(e, Inglés)}
                                      style={{
                                        color: "red",
                                      }}
                                    >
                                      {Inglés.name}
                                    </button>
                                  ) : Inglés.studentExamStatus === "end" ? (
                                    <button
                                      id={Inglés.id}
                                      onClick={(e) => startExams(e, Inglés)}
                                      style={{ fontWeight: 800 }}
                                    >
                                      {Inglés.name}
                                    </button>
                                  ) : (
                                    <button
                                      id={Inglés.id}
                                      onClick={(e) => startExams(e, Inglés)}
                                    >
                                      {Inglés.name}
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            {data.Psicotécnicos.map((Psicotécnicos) => {
                              return (
                                <div className={Styles.examLinks}>
                                  {Psicotécnicos.studentExamStatus ===
                                  "notAttempted" ? (
                                    <button
                                      onClick={(e) =>
                                        startExams(e, Psicotécnicos)
                                      }
                                      id={Psicotécnicos.id}
                                      style={{
                                        color: "red",
                                      }}
                                    >
                                      {Psicotécnicos.name}
                                    </button>
                                  ) : Psicotécnicos.studentExamStatus ===
                                    "end" ? (
                                    <button
                                      onClick={(e) =>
                                        startExams(e, Psicotécnicos)
                                      }
                                      id={Psicotécnicos.id}
                                      style={{ fontWeight: 800 }}
                                    >
                                      {Psicotécnicos.name}
                                    </button>
                                  ) : (
                                    <button
                                      id={Psicotécnicos.id}
                                      onClick={(e) =>
                                        startExams(e, Psicotécnicos)
                                      }
                                    >
                                      {Psicotécnicos.name}
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          <div>
                            {data.Ortografía.map((Ortografía) => {
                              return (
                                <div className={Styles.examLinks}>
                                  {Ortografía.studentExamStatus ===
                                  "notAttempted" ? (
                                    <button
                                      id={Ortografía.id}
                                      onClick={(e) => startExams(e, Ortografía)}
                                      style={{
                                        color: "red",
                                      }}
                                    >
                                      {Ortografía.name}
                                    </button>
                                  ) : Ortografía.studentExamStatus === "end" ? (
                                    <button
                                      style={{ fontWeight: 800 }}
                                      onClick={(e) => startExams(e, Ortografía)}
                                      id={Ortografía.id}
                                    >
                                      {Ortografía.name}
                                    </button>
                                  ) : (
                                    <button
                                      id={Ortografía.id}
                                      onClick={(e) => startExams(e, Ortografía)}
                                    >
                                      {Ortografía.name}
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </>
              )}
              <div className={Styles.comenzarBtnWrapper}>
                <button className={Styles.comenzarBtn}>
                  <img src={Comenzar} alt="" />
                </button>
              </div>
            </Container>
          </main>
        </div>
      ) : (
        <div className={Styles.wrapperMain}>
          {showScore ? (
            <main className={Styles.wrapperMain}>
              <Container maxWidth="lg">
                <h1 className={Styles.examenesHeading3}>
                  Examenes 3 - Derecho penal
                </h1>
                <Grid container spacing={1} marginTop={10}>
                  <Grid item xs={12} md={4} className={Styles.ResultWrappers}>
                    <div className={Styles.innerResultWrapper}>
                      <p className={Styles.resultData}>
                        Time Elasped :
                        <span className={Styles.resultDataBold}>
                          {endExam.examDuration} / {endExam.totalTime}
                        </span>
                      </p>
                      <p className={Styles.resultData}>
                        Aciertos :
                        <span className={Styles.resultDataBold}>
                          {endExam.correctCount}
                        </span>
                      </p>
                      <p className={Styles.resultData}>
                        Fallos :
                        <span className={Styles.resultDataBold}>
                          {endExam.wrongCount}
                        </span>
                      </p>
                      <p className={Styles.resultData}>
                        Nulos :
                        <span className={Styles.resultDataBold}>
                          {endExam.nonAttemptedCount}
                        </span>
                      </p>
                      <p
                        className={Styles.resultData}
                        style={{ marginTop: "30px" }}
                      >
                        Puntos :
                        <span className={Styles.resultDataBold}>
                          {endExam.score}
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          fontWeight: 600,
                          fontSize: "25px",
                        }}
                      >
                        {endExam.result}
                      </p>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} className={Styles.ResultWrappers}>
                    <div className={Styles.progressBarWrapper}>
                      <Progressbar
                        bgcolor={`linear-gradient(to bottom, rgba(17,148,47,1), rgba(106,170,101,1))`}
                        progress={endExam.correctPercentage}
                      />
                      <img src={tick} style={{ width: "40px" }} />
                    </div>
                    <div className={Styles.progressBarWrapper}>
                      <Progressbar
                        bgcolor={`linear-gradient(to bottom, rgba(206,8,17,1), rgba(222,110,81,1))`}
                        progress={endExam.wrongPercentage}
                      />
                      <img src={cross} style={{ width: "40px" }} />
                    </div>
                    <div className={Styles.progressBarWrapper}>
                      <Progressbar
                        bgcolor={`linear-gradient(to top, rgba(47,49,47,1), rgba(119,118,119,1))`}
                        progress={endExam.nullPercentage}
                      />
                      <h3 style={{ fontSize: "25px" }}>Nulos</h3>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={4} className={Styles.ResultWrappers}>
                    <div className={Styles.resultBtnMain}>
                      <button
                        className={Styles.revisarBtn}
                        onClick={restartQuiz}
                      >
                        <img
                          src={Revisar}
                          alt="Revisar Button"
                          width={"350px"}
                        />
                      </button>
                      <button className={Styles.salirBtn} onClick={SalirBtn}>
                        <img src={Salir} alt="Salir Button" width={"350px"} />
                      </button>
                    </div>
                  </Grid>
                </Grid>

                <div className={Styles.resultBtnWrapper}>
                  {endExam.answersArray.map((data, index) => {
                    return (
                      <button
                        className={Styles.resultBtn}
                        style={{
                          backgroundColor:
                            data == "notAttempted"
                              ? "gray"
                              : data == "correct"
                              ? "green"
                              : "red",
                          color: "white",
                        }}
                      >
                        {index + 1}
                      </button>
                    );
                  })}
                </div>
              </Container>
            </main>
          ) : (
            <>
              <main className="flex">
                <Container maxWidth="lg">
                  <div className={Styles.quizWrapperInner}>
                    <div className={Styles.timerWrapper}>
                      {/* Timer STARTS HERE                      */}
                      <div className={Styles.timerWrapper}>
                        <div>
                          <PauseCircleOutlinedIcon
                            className={Styles.timerIcons}
                            onClick={handleStart}
                          />
                          <StopCircleOutlinedIcon
                            className={Styles.timerIcons}
                            onClick={endQuiz}
                          />
                        </div>
                        <div className={Styles.timerHeading}>
                          Tiempo : {twoDigits(hoursToDisplay)}:
                          {twoDigits(minutesToDisplay)}:
                          {twoDigits(secondsToDisplay)}
                        </div>
                      </div>
                      {/* Timer Ends Here                      */}
                    </div>
                    <div>
                      <Markup content={examData[currentQuestion].question} />
                      <div className={Styles.Options}>
                        <button
                          onClick={() => {
                            setStudentAnswered("a");
                            return studentAnswered;
                          }}
                          className={Styles.answerLinks}
                        >
                          <Markup content={examData[currentQuestion].answer1} />
                        </button>
                        <button
                          onClick={() => {
                            setStudentAnswered("b");
                            return studentAnswered;
                          }}
                          className={Styles.answerLinks}
                        >
                          <Markup content={examData[currentQuestion].answer2} />
                        </button>
                        <button
                          onClick={() => {
                            setStudentAnswered("c");
                            return studentAnswered;
                          }}
                          className={Styles.answerLinks}
                        >
                          <Markup content={examData[currentQuestion].answer3} />
                        </button>
                        <button
                          onClick={() => {
                            setStudentAnswered("d");
                            return studentAnswered;
                          }}
                          className={Styles.answerLinks}
                        >
                          <Markup content={examData[currentQuestion].answer4} />
                        </button>
                      </div>
                      {currentQuestion + 1 >= examData.length ? (
                        <Button variant="contained" onClick={endQuiz}>
                          End Question
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={(e, b) => nextQuestion(examData)}
                        >
                          Next Question
                        </Button>
                      )}
                    </div>
                    {/* Buttons at the bottom of the Quiz */}
                    <div>
                      {examData.map((data, index) => {
                        return (
                          <button
                            onClick={() => setCurrentQuestion(index)}
                            className={
                              currentQuestion >= index
                                ? "btnClass clicked"
                                : "btnClass"
                            }
                          >
                            {index + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Container>
              </main>
            </>
          )}
        </div>
      )}
    </>
  );
}
export default Examenes1;
