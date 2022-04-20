import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
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

  const data = getLocalUserdata();
  const student_type = data.type; // STUDENT TYPE
  // const studentid = data.id; // STUDENT ID

  const getExamData = {
    studentId: 4785, // Use The Student Id Above ^
    studentType: student_type,
  };

  // console.log(data.id);

  // GET ALL EXAM LISTING API /////////////////////////////////

  useEffect(() => {
    axios
      .post(`https://neoestudio.net/api/getAllExam`, getExamData)
      .then((response) => {
        setFolderData(response.data.data);
        setShowScreen(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        alert("Exams List Not Available, Please Refresh The Page");
      });
  }, []);

  // START EXAM API CALL

  const startExams = (e, Conocimientos, Inglés, Ortografía, Psicotécnicos) => {
    const ExamNO = Conocimientos
      ? Conocimientos.id
      : Inglés
      ? Inglés.id
      : Ortografía
      ? Ortografía.id
      : Psicotécnicos.id;

    localStorage.setItem("examID", ExamNO);
    setLoading(true);
    const startData = {
      studentId: 4785,
      studentType: student_type,
      studentAnswered: null,
      studentAttemptId: null,
      tab: null,
      Restart: "no",
      studentType: student_type,
      examId: localStorage.getItem("examID"),
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
        console.log(response.data.data.canPause);
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

  const reviewExam = (e, Conocimientos, Inglés, Ortografía, Psicotécnicos) => {
    setLoading(true);
    const reviewData = {
      studentExamRecordId: Conocimientos
        ? Conocimientos.studentExamRecordId
        : Inglés
        ? Inglés.studentExamRecordId
        : Ortografía
        ? Ortografía.studentExamRecordId
        : Psicotécnicos
        ? Psicotécnicos.studentExamRecordId
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

  // ACCORDIION

  const [expanded, setExpanded] = useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
      studentId: 4785,
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
      studentId: 4785,
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
                  <h2>Cargando Exámenes Por favor, espera.</h2>
                </div>
              ) : (
                <>
                  {folderData.map((data) => {
                    const panel = data.folderName;
                    return (
                      <div className={Styles.folderWrapper}>
                        <Accordion
                          expanded={expanded === data.folderName}
                          onChange={handleChange(panel)}
                          TransitionProps={{ unmountOnExit: true }}
                          className={Styles.BoxWrapper1212}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            className={Styles.BoxWrapper1212}
                          >
                            <div>
                              <img
                                src={directoryImg}
                                alt=""
                                className={Styles.headingImg}
                              />
                            </div>
                            <div className={Styles.heading}>
                              {data.folderName}
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
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
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
                                          }}
                                        >
                                          {Conocimientos.name}
                                        </button>
                                      ) : Conocimientos.studentExamStatus ===
                                        "end" ? (
                                        <button
                                          style={{
                                            fontFamily: "ProximaNovaSoft-bold",
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
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
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
                                {data.Inglés.map((Inglés) => {
                                  return (
                                    <div className={Styles.examLinks}>
                                      {Inglés.studentExamStatus ===
                                      "notAttempted" ? (
                                        <button
                                          id={Inglés.id}
                                          onClick={(e) => startExams(e, Inglés)}
                                          style={{
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
                                          }}
                                        >
                                          {Inglés.name}
                                        </button>
                                      ) : Inglés.studentExamStatus === "end" ? (
                                        <button
                                          style={{
                                            fontFamily: "ProximaNovaSoft-bold",
                                          }}
                                          onClick={(e) => {
                                            return reviewExam(e, Inglés);
                                          }}
                                        >
                                          {Inglés.name}
                                        </button>
                                      ) : (
                                        <button
                                          id={Inglés.id}
                                          onClick={(e) => startExams(e, Inglés)}
                                          style={{
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
                                          }}
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
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
                                          }}
                                        >
                                          {Psicotécnicos.name}
                                        </button>
                                      ) : Psicotécnicos.studentExamStatus ===
                                        "end" ? (
                                        <button
                                          style={{
                                            fontFamily: "ProximaNovaSoft-bold",
                                          }}
                                          onClick={(e) => {
                                            return reviewExam(e, Psicotécnicos);
                                          }}
                                        >
                                          {Psicotécnicos.name}
                                        </button>
                                      ) : (
                                        <button
                                          id={Psicotécnicos.id}
                                          onClick={(e) =>
                                            startExams(e, Psicotécnicos)
                                          }
                                          style={{
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
                                          }}
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
                                          onClick={(e) =>
                                            startExams(e, Ortografía)
                                          }
                                          style={{
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
                                          }}
                                        >
                                          {Ortografía.name}
                                        </button>
                                      ) : Ortografía.studentExamStatus ===
                                        "end" ? (
                                        <button
                                          style={{
                                            fontFamily: "ProximaNovaSoft-bold",
                                          }}
                                          onClick={(e) => {
                                            return reviewExam(e, Ortografía);
                                          }}
                                        >
                                          {Ortografía.name}
                                        </button>
                                      ) : (
                                        <button
                                          id={Ortografía.id}
                                          onClick={(e) =>
                                            startExams(e, Ortografía)
                                          }
                                          style={{
                                            fontFamily:
                                              "ProximaNovaSoft-regular",
                                          }}
                                        >
                                          {Ortografía.name}
                                        </button>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </AccordionDetails>
                          <div className={Styles.comenzarBtnWrapper}>
                            <button className={Styles.comenzarBtn}>
                              <img src={Comenzar} alt="" />
                            </button>
                          </div>
                        </Accordion>
                      </div>
                    );
                  })}
                </>
              )}
            </Container>
          </main>
        </div>
      ) : showResultScreen == true ? (
        <>
          <main className="flex">
            <Container maxWidth="lg">
              <div className={Styles.quizEndWrapperInner}>
                <div>
                  <Markup content={examReviewData[currentQuestion].question} />
                  <div className={Styles.Options}>
                    <button className={Styles.answerLinks}>
                      <div className={Styles.answerLinksInner3}>
                        {examReviewData[currentQuestion].status == "correct" &&
                        examReviewData[currentQuestion].correct == "a" ? (
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "a" ? (
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "a" ? (
                          <img src={cross} alt="" />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "a" ? (
                          <img src={tick} alt="" />
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
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "b" ? (
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "b" ? (
                          <img src={cross} alt="" />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "b" ? (
                          <img src={tick} alt="" />
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
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "c" ? (
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "c" ? (
                          <img src={cross} alt="" />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "c" ? (
                          <img src={tick} alt="" />
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
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "d" ? (
                          <img src={tick} alt="" />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "d" ? (
                          <img src={cross} alt="" />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "d" ? (
                          <img src={tick} alt="" />
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
                      Back To Examenes
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
            </Container>
          </main>
        </>
      ) : showScore == true ? (
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
          </Container>
        </main>
      ) : showExam == true ? (
        <>
          <div className={Styles.wrapperMain}>
            <main className="flex mx-auto">
              <Container maxWidth="lg">
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
                      <div className="flex text-xl">
                        Tiempo :
                        <h2 className={Styles.timerHeading}>
                          {twoDigits(minutesToDisplay)}:
                          {twoDigits(secondsToDisplay)}
                        </h2>
                      </div>
                    </div>
                    {/* Timer Ends Here                      */}
                  </div>
                  <div>
                    <Markup content={examData[currentQuestion].question} />
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
              </Container>
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
