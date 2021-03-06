import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CircularProgress from "@mui/material/CircularProgress";
import ansSelectImg from "../../assets/img/images/Flecha.png";
import Revisar from "../../assets/img/images/revisar.png";
import Salir from "../../assets/img/images/salirExamenes.png";
import Progressbar from "../ExamenesHelpers/Progressbar";
import Comenzar from "../../assets/img/images/comenzar.png";
import Conocimientos from "../../assets/img/images/conocimientos.png";
import inglesImg from "../../assets/img/images/ingles.png";
import psicoImg from "../../assets/img/images/psicotecnicos.png";
import ortoImg from "../../assets/img/images/ortografia.png";
import correctImg from "../../assets/img/images/green.png";
import wrongImg from "../../assets/img/images/red.png";
import nullImg from "../../assets/img/images/grey.png";
import answerImg1 from "../../assets/img/images/blue.png";
import noSelect from "../../assets/img/images/transparent.png";
import golden from "../../assets/img/images/golden.png";
import pauseImg from "../../assets/img/images/pause.png";
import stopImg from "../../assets/img/images/stop.png";
import directoryImg from "../../assets/img/images/directory.png";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import { Markup } from "interweave";
import tick from "../../assets/img/images/tick.png";
import cross from "../../assets/img/images/cross.png";
import useStyles from "./styles";
import "./style.css";

function Examenes1() {
  const Styles = useStyles();
  const [showScreen, setShowScreen] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [endExam, setEndExam] = useState([]);
  const [pauseExam, setPauseExam] = useState([]);
  const [examReviewData, setExamReviewData] = useState([]);
  const [showResultScreen, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [studentAnswered, setStudentAnswered] = useState(null);
  const [ansCircles, setAnsCircles] = useState([]);
  const [ansCheck, setAnsCheck] = useState(0);
  const [ansArry, setAnsArry] = useState([]);
  const [examFolderName, setExamFolderName] = useState();
  const [selectedExam, setSelectedExam] = useState([]);

  const data = getLocalUserdata();
  const student_type = data.type;
  const studentid = data.id;

  const getExamData = {
    studentId: data.id,
    studentType: student_type,
  };

  // GET ALL EXAM LISTING API

  useEffect(() => {
    axios
      .post(`https://neoestudio.net/api/getAllExam`, getExamData)
      .then((response) => {
        setLoading(false);
        setShowScreen(true);
        setFolderData(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Exams List Not Available, Please Refresh The Page");
      });
  }, []);

  // START EXAM API CALL

  const startExams = (e, Conocimientos, Ingl??s, Ortograf??a, Psicot??cnicos) => {
    const ExamNO = Conocimientos
      ? Conocimientos.id
      : Ingl??s
      ? Ingl??s.id
      : Ortograf??a
      ? Ortograf??a.id
      : Psicot??cnicos.id;

    localStorage.setItem("examID", ExamNO);
    setLoading(true);
    const startData = {
      studentId: data.id,
      studentType: student_type,
      studentAnswered: null,
      studentAttemptId: null,
      tab: null,
      Restart: "no",
      studentType: student_type,
      examId: localStorage.getItem("examID"),
      studentExamRecordId: Conocimientos
        ? Conocimientos.studentExamRecordId
        : Ingl??s
        ? Ingl??s.studentExamRecordId
        : Ortograf??a
        ? Ortograf??a.studentExamRecordId
        : Psicot??cnicos.studentExamRecordId,
    };

    setSecondsRemaining(
      Conocimientos
        ? Conocimientos.timeFrom
        : Ingl??s.timeFrom
        ? Ortograf??a.timeFrom
        : Psicot??cnicos.timeFrom
    );

    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        setAnsCircles([]);
        setAnsArry([]);
        setExamData(response.data.data);
        setLoading(false);
        setStatus(true);
        setCurrentQuestion(0);
        for (let i = 0; i < response.data.data.length; i++) {
          setAnsCircles((prevState) => [
            ...prevState,
            {
              img: noSelect,
            },
          ]);
        }
        for (let i = 0; i < response.data.data.length; i++) {
          setAnsArry((prevState) => [
            ...prevState,
            {
              answer: null,
            },
          ]);
        }
        setShowScreen(false);
        setShowExam(true);
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
        setShowScore(true);
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // Pause EXAM API CALL

  const pauseAnswer = () => {
    let timeRemaining = secondsRemaining;
    const pauseData = {
      studentExamRecordId: examData[currentQuestion].studentExamRecordId,
      time: timeRemaining,
    };
    axios
      .post(`https://neoestudio.net/api/pauseAnswer`, pauseData)
      .then((response) => {
        setPauseExam(response.data);
        if (response.data.data.canPause == "no") {
          alert("You Cannot Pause This Exam");
        } else {
          setStatus(false);
          setShowScreen(true);
        }
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // REVIEW EXAM API

  const reviewExam = (e, Conocimientos, Ingl??s, Ortograf??a, Psicot??cnicos) => {
    setLoading(true);
    const reviewData = {
      studentExamRecordId: Conocimientos
        ? Conocimientos.studentExamRecordId
        : Ingl??s
        ? Ingl??s.studentExamRecordId
        : Ortograf??a
        ? Ortograf??a.studentExamRecordId
        : Psicot??cnicos
        ? Psicot??cnicos.studentExamRecordId
        : examData[currentQuestion].studentExamRecordId,
    };
    axios
      .post(`https://neoestudio.net/api/reviewExam`, reviewData)
      .then((response) => {
        setExamReviewData(response.data.data);
        setShowScreen(false);
        setShowExam(false);
        setShowScore(false);
        setShowResult(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "Not Loading Review Exam Data !");
      });
  };

  const handleExamsListing = (w) => {
    setExamFolderName(w);
    folderData.map((item) => {
      if (item.folderName == w) {
        setSelectedExam(item);
      }
    });
  };

  // SALIR BTN

  const SalirBtn = () => {
    if (showScreen === false) {
      setShowScore(false);
      setCurrentQuestion(0);
      return setShowScreen(true);
    } else {
      return setShowScreen(false);
    }
  };

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

  const handleStart = () => {
    return pauseAnswer();
  };

  const handleNextQ = () => {
    if (currentQuestion + 1 >= examData.length) {
      endQuiz();
    } else {
      setAnsCheck(currentQuestion + 1);
      setCurrentQuestion(currentQuestion + 1);
    }
  };
  const handlePreviousQ = () => {
    if (currentQuestion - 1 >= 0) {
      setAnsCheck(currentQuestion - 1);
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  useInterval(
    () => {
      if (status == true) {
        setSecondsRemaining(secondsRemaining - 1);
      } else if (secondsRemaining <= 0) {
        endQuiz();
      } else {
        endQuiz();
      }
    },
    status == true ? 1000 : null
  );

  let answerClicked = null;
  let triggerTime;

  const handelUnSelect = (id) => {
    setAnsCheck(currentQuestion);
    answerClicked = null;
    ansCircles.splice(ansCheck, 1, {
      img:
        answerClicked != null && ansCheck == currentQuestion
          ? answerImg1
          : noSelect,
    });
    ansArry.splice(ansCheck, 1, {
      answer: answerClicked,
    });
    const startData = {
      studentId: data.id,
      studentType: student_type,
      studentAnswered: answerClicked, // exams get
      studentAttemptId: examData[currentQuestion].id, // exams get
      tab: null,
      Restart: "no",
      studentType: student_type,
      examId: localStorage.getItem("examID"), // folderData
      studentExamRecordId: parseInt(
        examData[currentQuestion].studentExamRecordId
      ), // not done
    };
    setSecondsRemaining(secondsRemaining);

    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        if (currentQuestion + 1 >= examData.length) {
          setAnsArry([]);
          endQuiz();
        } else {
          setAnsCheck(currentQuestion);
          setCurrentQuestion(currentQuestion);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  // NEXT QUESTION BUTTON

  const handleSetAnswer = (id) => {
    setAnsCheck(currentQuestion);
    answerClicked = id;
    setStudentAnswered(answerClicked);
    ansCircles.splice(ansCheck, 1, {
      img:
        answerClicked != null && ansCheck == currentQuestion
          ? answerImg1
          : noSelect,
    });
    ansArry.splice(ansCheck, 1, {
      answer: answerClicked,
    });
    const startData = {
      studentId: data.id,
      studentType: student_type,
      studentAnswered: answerClicked, // exams get
      studentAttemptId: examData[currentQuestion].id, // exams get
      tab: null,
      Restart: "no",
      studentType: student_type,
      examId: localStorage.getItem("examID"), // folderData
      studentExamRecordId: parseInt(
        examData[currentQuestion].studentExamRecordId
      ), // not done
    };
    setSecondsRemaining(secondsRemaining);

    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        if (currentQuestion + 1 >= examData.length) {
          endQuiz();
        } else {
          setAnsCheck(currentQuestion + 1);
          setCurrentQuestion(currentQuestion + 1);
          setLoading(false);
          answerClicked = null;
        }
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };
  return (
    <>
      {showScreen ? (
        <div>
          <main className={Styles.courseWrapper}>
            <Container>
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
                  <h2>Cargando Ex??menes Por favor, espera.</h2>
                </div>
              ) : (
                <>
                  {examFolderName != null ? (
                    <>
                      <div className={Styles.folderHeading}>
                        <div className={Styles.folderHeadingImg}>
                          <ArrowBackIosNewIcon
                            className="cursor-pointer m-4 text-start"
                            onClick={() => {
                              setExamFolderName();
                            }}
                          />
                        </div>
                        <div className="w-100">{selectedExam.folderName}</div>
                      </div>
                      <div className={Styles.dataWrapper}>
                        <div>
                          {selectedExam.Conocimientos.map((Conocimientos) => {
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
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Conocimientos.name}
                                  </button>
                                ) : Conocimientos.studentExamStatus ===
                                  "end" ? (
                                  <button
                                    style={{
                                      fontFamily: "Proxima Soft",
                                      fontWeight: "bold",
                                    }}
                                    onClick={(e) => {
                                      return reviewExam(e, Conocimientos);
                                    }}
                                  >
                                    {Conocimientos.name}
                                  </button>
                                ) : (
                                  <button
                                    id={Conocimientos.id}
                                    onClick={(e) =>
                                      startExams(e, Conocimientos)
                                    }
                                    style={{
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Conocimientos.name}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          {selectedExam.Ingl??s.map((Ingl??s) => {
                            return (
                              <div className={Styles.examLinks}>
                                {Ingl??s.studentExamStatus === "notAttempted" ? (
                                  <button
                                    id={Ingl??s.id}
                                    onClick={(e) => startExams(e, Ingl??s)}
                                    style={{
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Ingl??s.name}
                                  </button>
                                ) : Ingl??s.studentExamStatus === "end" ? (
                                  <button
                                    style={{
                                      fontFamily: "Proxima Soft",
                                      fontWeight: "bold",
                                    }}
                                    onClick={(e) => {
                                      return reviewExam(e, Ingl??s);
                                    }}
                                  >
                                    {Ingl??s.name}
                                  </button>
                                ) : (
                                  <button
                                    id={Ingl??s.id}
                                    onClick={(e) => startExams(e, Ingl??s)}
                                    style={{
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Ingl??s.name}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          {selectedExam.Psicot??cnicos.map((Psicot??cnicos) => {
                            return (
                              <div className={Styles.examLinks}>
                                {Psicot??cnicos.studentExamStatus ===
                                "notAttempted" ? (
                                  <button
                                    onClick={(e) =>
                                      startExams(e, Psicot??cnicos)
                                    }
                                    id={Psicot??cnicos.id}
                                    style={{
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Psicot??cnicos.name}
                                  </button>
                                ) : Psicot??cnicos.studentExamStatus ===
                                  "end" ? (
                                  <button
                                    style={{
                                      fontFamily: "Proxima Soft",
                                      fontWeight: "bold",
                                    }}
                                    onClick={(e) => {
                                      return reviewExam(e, Psicot??cnicos);
                                    }}
                                  >
                                    {Psicot??cnicos.name}
                                  </button>
                                ) : (
                                  <button
                                    id={Psicot??cnicos.id}
                                    onClick={(e) =>
                                      startExams(e, Psicot??cnicos)
                                    }
                                    style={{
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Psicot??cnicos.name}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                        <div>
                          {selectedExam.Ortograf??a.map((Ortograf??a) => {
                            return (
                              <div className={Styles.examLinks}>
                                {Ortograf??a.studentExamStatus ===
                                "notAttempted" ? (
                                  <button
                                    id={Ortograf??a.id}
                                    onClick={(e) => startExams(e, Ortograf??a)}
                                    style={{
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Ortograf??a.name}
                                  </button>
                                ) : Ortograf??a.studentExamStatus === "end" ? (
                                  <button
                                    style={{
                                      fontFamily: "Proxima Soft",
                                      fontWeight: "bold",
                                    }}
                                    onClick={(e) => {
                                      return reviewExam(e, Ortograf??a);
                                    }}
                                  >
                                    {Ortograf??a.name}
                                  </button>
                                ) : (
                                  <button
                                    id={Ortograf??a.id}
                                    onClick={(e) => startExams(e, Ortograf??a)}
                                    style={{
                                      fontFamily: "Proxima Soft",
                                    }}
                                  >
                                    {Ortograf??a.name}
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className={Styles.comenzarBtnWrapper}>
                        <button className={Styles.comenzarBtn}>
                          <img src={Comenzar} alt="" />
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {folderData.map((data) => {
                        return (
                          <div className={Styles.folderWrapper}>
                            <div>
                              <img
                                src={directoryImg}
                                alt=""
                                className={Styles.headingImg}
                              />
                            </div>
                            <div
                              className={Styles.heading}
                              onClick={(e) =>
                                handleExamsListing(data.folderName)
                              }
                            >
                              {data.folderName}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </>
              )}
            </Container>
          </main>
        </div>
      ) : showResultScreen == true ? (
        <>
          <main className="flex">
            <div className={Styles.quizEndWrapperInner}>
              <div>
                <span
                  style={{
                    fontFamily: "Proxima Soft",
                    fontWeight: "bold",
                  }}
                >
                  <Markup
                    style={{
                      fontFamily: "Proxima Soft",
                      fontWeight: "bold",
                    }}
                    content={examReviewData[currentQuestion].question}
                  />
                </span>
                <div className={Styles.Options}>
                  <button className={Styles.answerLinks}>
                    <div className={Styles.answerLinksInner3}>
                      {examReviewData[currentQuestion].status == "correct" &&
                      examReviewData[currentQuestion].correct == "a" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].correct == "a" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].studentAnswered ==
                          "a" ? (
                        <img src={cross} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status ==
                          "notAttempted" &&
                        examReviewData[currentQuestion].correct == "a" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={Styles.answerLinksInner2}>
                      <Markup
                        content={examReviewData[currentQuestion].answer1}
                        width="90%"
                      />
                    </div>
                  </button>
                  <button className={Styles.answerLinks}>
                    <div className={Styles.answerLinksInner3}>
                      {examReviewData[currentQuestion].status == "correct" &&
                      examReviewData[currentQuestion].correct == "b" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].correct == "b" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].studentAnswered ==
                          "b" ? (
                        <img src={cross} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status ==
                          "notAttempted" &&
                        examReviewData[currentQuestion].correct == "b" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={Styles.answerLinksInner2}>
                      <Markup
                        content={examReviewData[currentQuestion].answer2}
                      />
                    </div>
                  </button>
                  <button className={Styles.answerLinks}>
                    <div className={Styles.answerLinksInner3}>
                      {examReviewData[currentQuestion].status == "correct" &&
                      examReviewData[currentQuestion].correct == "c" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].correct == "c" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].studentAnswered ==
                          "c" ? (
                        <img src={cross} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status ==
                          "notAttempted" &&
                        examReviewData[currentQuestion].correct == "c" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={Styles.answerLinksInner2}>
                      <Markup
                        content={examReviewData[currentQuestion].answer3}
                      />
                    </div>
                  </button>

                  <button className={Styles.answerLinks}>
                    <div className={Styles.answerLinksInner3}>
                      {examReviewData[currentQuestion].status == "correct" &&
                      examReviewData[currentQuestion].correct == "d" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].correct == "d" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status == "wrong" &&
                        examReviewData[currentQuestion].studentAnswered ==
                          "d" ? (
                        <img src={cross} alt="" width={"40px"} />
                      ) : examReviewData[currentQuestion].status ==
                          "notAttempted" &&
                        examReviewData[currentQuestion].correct == "d" ? (
                        <img src={tick} alt="" width={"40px"} />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={Styles.answerLinksInner2}>
                      <Markup
                        content={examReviewData[currentQuestion].answer4}
                      />
                    </div>
                  </button>
                </div>
                <div className="m-4 ">
                  <Markup
                    content={examReviewData[currentQuestion].description}
                  />
                </div>
                <div className="w-50 text-center m-auto">
                  <Button
                    variant="contained"
                    onClick={() => {
                      setShowScreen(true);
                      setShowResult(false);
                      setShowScore(false);
                    }}
                  >
                    Volver a la Lista de Ex??menes
                  </Button>
                </div>
              </div>
              <div className={Styles.resultBtnWrapper}>
                {examReviewData.map((data, index) => {
                  return (
                    <div
                      style={{
                        margin: "10px",
                      }}
                    >
                      <button
                        className={Styles.resultBtn}
                        onClick={() => {
                          setCurrentQuestion(index);
                        }}
                        style={{
                          backgroundImage:
                            currentQuestion == index
                              ? `url(${golden})`
                              : data.status == "notAttempted"
                              ? `url(${nullImg})`
                              : data.status == "correct"
                              ? `url(${correctImg})`
                              : `url(${wrongImg})`,
                        }}
                      >
                        {index + 1}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </>
      ) : showScore == true ? (
        <main className={Styles.wrapperExam3Main}>
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
                <p className={Styles.resultData} style={{ marginTop: "30px" }}>
                  Puntos :
                  <span className={Styles.resultDataBold}>{endExam.score}</span>
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
                <button className={Styles.revisarBtn} onClick={reviewExam}>
                  <img src={Revisar} alt="Revisar Button" width={"350px"} />
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
                <div
                  style={{
                    margin: "10px",
                  }}
                >
                  <button
                    className={Styles.resultBtn}
                    style={{
                      backgroundImage:
                        data == "notAttempted"
                          ? `url(${nullImg})`
                          : data == "correct"
                          ? `url(${correctImg})`
                          : `url(${wrongImg})`,
                    }}
                  >
                    {index + 1}
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      ) : showExam == true ? (
        <>
          <div className={Styles.wrapperMain}>
            <main className="flex m-5 w-100">
              <div className={Styles.quizWrapperInner}>
                <div className={Styles.timerWrapper}>
                  {/* Timer STARTS HERE                      */}
                  <div className={Styles.timerWrapper}>
                    <div className="flex">
                      <img
                        src={pauseImg}
                        className={Styles.timerIcons}
                        onClick={handleStart}
                      />
                      <img
                        src={stopImg}
                        className={Styles.timerIcons}
                        onClick={endQuiz}
                      />
                    </div>
                    <div className={`flex ${Styles.timerHeading}`}>
                      <span className="text-black">Tiempo : </span>
                      {twoDigits(minutesToDisplay)}:
                      {twoDigits(secondsToDisplay)}
                    </div>
                  </div>
                  {/* Timer Ends Here                      */}
                </div>
                <div>
                  <span
                    style={{
                      fontFamily: "Proxima Soft",
                      fontWeight: "bold",
                    }}
                  >
                    <Markup content={examData[currentQuestion].question} />
                  </span>
                  <div className={Styles.Options}>
                    <button
                      onClick={(e) => {
                        setLoading(true);
                        if (triggerTime < 4000) {
                          handleSetAnswer("a");
                        } else {
                          handelUnSelect("a");
                        }
                      }}
                      onMouseDown={(e) => {
                        triggerTime = new Date().getTime();
                      }}
                      onMouseUp={(e) => {
                        let thisMoment = new Date().getTime();
                        triggerTime = thisMoment - triggerTime;
                      }}
                      className={Styles.answerLinks}
                    >
                      <div className={Styles.answerLinksInner1}>
                        {ansArry[currentQuestion].answer == "a" &&
                        currentQuestion == ansCheck ? (
                          <img src={ansSelectImg} width={"80%"} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup
                          content={examData[currentQuestion].answer1}
                          width="90%"
                        />
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        setLoading(true);
                        if (triggerTime < 4000) {
                          handleSetAnswer("b");
                        } else {
                          handelUnSelect("b");
                        }
                      }}
                      onMouseDown={(e) => {
                        triggerTime = new Date().getTime();
                      }}
                      onMouseUp={(e) => {
                        let thisMoment = new Date().getTime();
                        triggerTime = thisMoment - triggerTime;
                      }}
                      className={Styles.answerLinks}
                    >
                      <div className={Styles.answerLinksInner1}>
                        {ansArry[currentQuestion].answer == "b" &&
                        currentQuestion == ansCheck ? (
                          <img src={ansSelectImg} width={"80%"} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup content={examData[currentQuestion].answer2} />
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        setLoading(true);
                        if (triggerTime < 4000) {
                          handleSetAnswer("c");
                        } else {
                          handelUnSelect("c");
                        }
                      }}
                      onMouseDown={(e) => {
                        triggerTime = new Date().getTime();
                      }}
                      onMouseUp={(e) => {
                        let thisMoment = new Date().getTime();
                        triggerTime = thisMoment - triggerTime;
                      }}
                      className={Styles.answerLinks}
                    >
                      <div className={Styles.answerLinksInner1}>
                        {ansArry[currentQuestion].answer == "c" &&
                        currentQuestion == ansCheck ? (
                          <img src={ansSelectImg} width={"80%"} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup content={examData[currentQuestion].answer3} />
                      </div>
                    </button>
                    <button
                      onClick={(e) => {
                        setLoading(true);
                        if (triggerTime < 4000) {
                          handleSetAnswer("d");
                        } else {
                          handelUnSelect("d");
                        }
                      }}
                      onMouseDown={(e) => {
                        triggerTime = new Date().getTime();
                      }}
                      onMouseUp={(e) => {
                        let thisMoment = new Date().getTime();
                        triggerTime = thisMoment - triggerTime;
                      }}
                      className={Styles.answerLinks}
                    >
                      <div className={Styles.answerLinksInner1}>
                        {ansArry[currentQuestion].answer == "d" &&
                        currentQuestion == ansCheck ? (
                          <img src={ansSelectImg} width={"80%"} />
                        ) : (
                          ""
                        )}
                      </div>
                      <div className={Styles.answerLinksInner2}>
                        <Markup content={examData[currentQuestion].answer4} />
                      </div>
                    </button>
                  </div>
                  <div className="flex justify-between w-100">
                    <Button variant="contained" onClick={handlePreviousQ}>
                      Anterior
                    </Button>
                    <Button variant="contained" onClick={handleNextQ}>
                      Siguiente
                    </Button>
                  </div>
                </div>
                {loading ? (
                  <div className="w-100 text-center">
                    <CircularProgress
                      style={{
                        width: "60px",
                        height: "60px",
                        margin: "10px",
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className={Styles.resultBtnWrapper}>
                  {ansCircles.map((data, index) => {
                    return (
                      <div
                        style={{
                          margin: "10px",
                        }}
                      >
                        <button
                          onClick={() => {
                            setCurrentQuestion(index);
                            setAnsCheck(index);
                            setStudentAnswered(null);
                          }}
                          className={`${Styles.resultBtn} noAnswer`}
                          style={{
                            backgroundImage:
                              currentQuestion == index
                                ? `url(${golden})`
                                : `url(${data.img})`,
                          }}
                        >
                          {index + 1}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
export default Examenes1;
