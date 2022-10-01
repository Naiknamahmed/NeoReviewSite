import React, { useState, useEffect, useRef, useReducer } from "react";
import axios from "axios";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import LinearProgress from "@mui/material/LinearProgress";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ansSelectImg from "../../assets/img/images/Flecha.webp";
import Revisar from "../../assets/img/images/revisar.webp";
import Salir from "../../assets/img/images/salirExamenes.webp";
import Progressbar from "../ExamenesHelpers/Progressbar";
import Conocimientos from "../../assets/img/images/conocimientos.webp";
import inglesImg from "../../assets/img/images/ingles.webp";
import noBtnImg from "../../assets/img/images/noBtn.webp";
import siBtnImg from "../../assets/img/images/SiBtn.webp";
import psicoImg from "../../assets/img/images/psicotecnicos.webp";
import ortoImg from "../../assets/img/images/ortografia.webp";
import correctImg from "../../assets/img/images/green.webp";
import wrongImg from "../../assets/img/images/red.webp";
import nullImg from "../../assets/img/images/grey.webp";
import answerImg1 from "../../assets/img/images/blue.webp";
import noSelect from "../../assets/img/images/transparent.webp";
import golden from "../../assets/img/images/golden.webp";
import pauseImg from "../../assets/img/images/pause.webp";
import correctAnswerImg from "../../assets/img/images/correctAnswer.webp";
import stopImg from "../../assets/img/images/stop.webp";
import Modal from "@mui/material/Modal";
import directoryImg from "../../assets/img/images/directory.webp";
import { getLocalUserdata } from "../../services/auth/localStorageData";
import { Markup } from "interweave";
import tick from "../../assets/img/images/tick.webp";
import cross from "../../assets/img/images/cross.webp";
import useStyles from "./styles";
import "./style.css";

function Examenes1(props) {
  let triggerTime;

  const Styles = useStyles();
  const [showScreen, setShowScreen] = useState(true);
  const [showScreen2, setShowScreen2] = useState(false);
  const [resetExam, setResetExam] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [examStatusCheck, setExamStatusCheck] = useState(false);
  const [showExam, setShowExam] = useState(false);
  const [folderData, setFolderData] = useState([]);
  const [folderData2, setFolderData2] = useState([]);
  const [filesData, setFilesData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [endExam, setEndExam] = useState([]);
  const [pauseExam, setPauseExam] = useState([]);
  const [examReviewData, setExamReviewData] = useState([]);
  const [showResultScreen, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);
  const [listLoading, setListLoading] = useState(true);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [ansCheck, setAnsCheck] = useState(0);
  const [studentExamRecId, setStudentExamRecId] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ansArry, setAnsArry] = useState([]);
  const [totalLoading, setTotalLoading] = useState(0);
  const [stateRend, setStateRend] = useState(0);
  const [folderId, setFolderId] = useState(0);

  const handleModalClose = () => setResetExam(false);

  const data = getLocalUserdata();
  const student_type = data.type;
  const student_id = data.id;

  const getExamData = {
    studentId: student_id,
    studentType: student_type,
  };

  // GET ALL EXAM FOLDERS API

  useEffect(() => {
    if (props.showExam === "true") {
      if (props.item.type === "english") {
        const Inglés = {
          id: props.item.examId,
          studentExamRecordId: props.item.examRecordId,
          examDuration: props.item.examDuration,
          timeFrom: props.item.timeFrom,
        };
        if (props.item.examStatus === "end") {
          reviewExam("", Inglés);
        } else {
          startExams("", Inglés);
        }
      } else if (
        props.item.type === "orto" ||
        props.item.type === "gramatica"
      ) {
        const Ortografía = {
          id: props.item.examId,
          studentExamRecordId: props.item.examRecordId,
          examDuration: props.item.examDuration,
          timeFrom: props.item.timeFrom,
        };
        if (props.item.examStatus === "end") {
          reviewExam("", Ortografía);
        } else {
          startExams("", Ortografía);
        }
      } else if (props.item.type === "psico") {
        const Psicotécnicos = {
          id: props.item.examId,
          studentExamRecordId: props.item.examRecordId,
          examDuration: props.item.examDuration,
          timeFrom: props.item.timeFrom,
        };
        if (props.item.examStatus === "end") {
          reviewExam("", Psicotécnicos);
        } else {
          startExams("", Psicotécnicos);
        }
      } else if (props.item.type === "conocimiento") {
        const Conocimientos = {
          id: props.item.examId,
          studentExamRecordId: props.item.examRecordId,
          examDuration: props.item.examDuration,
          timeFrom: props.item.timeFrom,
        };
        if (props.item.examStatus === "end") {
          reviewExam("", Conocimientos);
        } else {
          startExams("", Conocimientos);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (props.showScreen === "true") {
      axios
        .post(`https://neoestudio.net/api/getAllExamFolders`, getExamData)
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
    }
  }, [stateRend]);

  // GET ALL EXAMS API

  useEffect(() => {
    if (props.showScreen === "true") {
      axios
        .post(`https://neoestudio.net/api/getAllExam`, getExamData)
        .then((response) => {
          setFolderData2(response.data.data);
          setShowScreen2(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [stateRend]);

  // GET ALL EXAM FILES API
  const handleExamId = (id) => {
    setListLoading(true);
    const getExamFiles = {
      studentId: student_id,
      studentType: student_type,
      folderId: id,
      examId: studentExamRecId,
      isRestart: false,
    };
    axios
      .post(`https://neoestudio.net/api/getAllExamsOfFolder`, getExamFiles)
      .then((response) => {
        setFilesData(response.data.data);
        setListLoading(false);
      })
      .catch((error) => {
        console.log(error, "Error Loading, Please Try Again !");
      });
  };

  const resetExamFile = () => {
    setListLoading(true);
    const resetExamData = {
      studentId: student_id,
      studentType: student_type,
      folderId: folderId,
      examId: studentExamRecId,
      isRestart: true,
    };
    setAnsCheck(0);
    setCurrentQuestion(0);
    axios
      .post(`https://neoestudio.net/api/getAllExamsOfFolder`, resetExamData)
      .then((response) => {
        setFilesData(response.data.data);
        setStateRend((prev) => prev + 1);
        setExamStatusCheck(true);
        setExpanded(false);
        setListLoading(false);
        setResetExam(false);
      })
      .catch((error) => {
        setListLoading(false);
        console.log(error, "Error Loading Reset APi, Please Try Again !");
      });
  };

  const [expanded, setExpanded] = useState();
  const handleModalChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
      studentId: data.id,
      studentType: student_type,
      studentAnswered: null,
      studentAttemptId: resetExam ? studentExamRecId : null,
      tab: null,
      isRestart: examStatusCheck ? "yes" : "no",
      examId: localStorage.getItem("examID"),
      studentExamRecordId: Conocimientos
        ? Conocimientos.studentExamRecordId
        : Inglés
        ? Inglés.studentExamRecordId
        : Ortografía
        ? Ortografía.studentExamRecordId
        : Psicotécnicos.studentExamRecordId,
    };
    if (examStatusCheck === true) {
      setSecondsRemaining(
        Conocimientos
          ? Conocimientos.timeFrom
          : Inglés.timeFrom
          ? Ortografía.timeFrom
          : Psicotécnicos.timeFrom
      );
    } else {
      setSecondsRemaining(
        Conocimientos
          ? Conocimientos.examDuration
          : Inglés.examDuration
          ? Ortografía.examDuration
          : Psicotécnicos.examDuration
      );
    }
    setTotalLoading(
      Conocimientos
        ? Number(Conocimientos.timeFrom)
        : Number(Inglés.timeFrom)
        ? Number(Ortografía.timeFrom)
        : Number(Psicotécnicos.timeFrom)
    );
    setCurrentQuestion(0);
    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        setAnsArry([]);
        for (let i = 0; i < response.data.data.length; i++) {
          setAnsArry((prevState) => [
            ...prevState,
            {
              answer: response.data.data[i].studentAnswered,
            },
          ]);
        }
        setExamData(response.data.data);
        setLoading(false);
        setStatus(true);
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
    const pauseData = {
      studentExamRecordId: examData[currentQuestion].studentExamRecordId,
      time: secondsRemaining,
    };
    setExamStatusCheck(false);
    axios
      .post(`https://neoestudio.net/api/pauseAnswer`, pauseData)
      .then((response) => {
        setPauseExam(response.data);
        if (response.data.data.canPause == "yes") {
          setStatus(false);
          if (props.showScreen === "false") {
            props.updateView();
          } else {
            setShowScreen(true);
          }
        } else {
          alert("You Cannot Pause This Exam");
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
    setShowScore(false);
    setCurrentQuestion(0);
    setExpanded(false);
    setExamStatusCheck(false);
    setStateRend((prev) => prev + 1);
    if (props.showExam === "true") {
      props.updateView();
    } else {
      setShowScreen(true);
    }
    return SalirBtn;
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
  const [status, setStatus] = useState(false);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;

  const handleStart = () => {
    return pauseAnswer();
  };
  useInterval(
    () => {
      if (status == true && secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        endQuiz();
      }
    },
    status == true ? 1000 : null
  );

  useInterval(
    () => {
      if (status == true) {
        setProgress((secondsRemaining / totalLoading) * -100 + 100);
      } else {
        setProgress(0);
      }
    },
    status == true ? 1000 : null
  );

  let answerClicked;

  // NEXT QUESTION BUTTON

  const handleSetAnswer = (id) => {
    const startData = {
      studentId: data.id,
      studentType: student_type,
      studentAnswered: answerClicked,
      studentAttemptId: examData[currentQuestion].id,
      tab: null,
      Restart: "no",
      examId: localStorage.getItem("examID"),
    };
    console.log(ansArry, "answerRRy");
    setSecondsRemaining(secondsRemaining);
    axios
      .post(`https://neoestudio.net/api/startExam`, startData)
      .then((response) => {
        if (currentQuestion + 1 >= examData.length) {
          endQuiz();
        } else {
          setExamData(response.data.data);
          setLoading(false);
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
              <Modal
                open={resetExam}
                onClose={handleModalClose}
                aria-labelledby="reset-exam-modal"
                aria-describedby="reset-modal-description"
              >
                <Box className={Styles.modalStyle}>
                  <Typography
                    id="reset-exam-modal"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center" }}
                  >
                    ¿Quieres resetear este examen?
                  </Typography>
                  <div className="flex justify-between w-full">
                    <Button
                      size="medium"
                      onClick={() => {
                        resetExamFile();
                      }}
                    >
                      <img src={siBtnImg} alt="" height={50} />
                    </Button>
                    <Button
                      size="medium"
                      onClick={() => {
                        setResetExam(false);
                      }}
                    >
                      <img src={noBtnImg} alt="" height={50} />
                    </Button>
                  </div>
                </Box>
              </Modal>
              {loading ? (
                <div className="w-100 text-center">
                  <CircularProgress
                    style={{
                      width: "50px",
                      height: "50px",
                      margin: "90px",
                    }}
                  />
                  <h2>Cargando Exámenes Por favor, espera.</h2>
                </div>
              ) : showScreen2 ? (
                <>
                  <div>
                    {folderData2.map((data) => {
                      return (
                        <div className={Styles.folderWrapper}>
                          <Accordion
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
                                              fontFamily: "ProximaSoft-regular",
                                            }}
                                          >
                                            {Conocimientos.name}
                                          </button>
                                        ) : Conocimientos.studentExamStatus ===
                                          "end" ? (
                                          <button
                                            style={{
                                              fontFamily: "ProximaSoft-bold",
                                            }}
                                            onClick={(e) => {
                                              if (triggerTime > 300) {
                                                setStudentExamRecId(
                                                  Conocimientos.studentExamRecordId
                                                );
                                                setFolderId(
                                                  Conocimientos.folderId
                                                );
                                                setResetExam(true);
                                              } else {
                                                return reviewExam(
                                                  e,
                                                  Conocimientos
                                                );
                                              }
                                            }}
                                            onMouseDown={() => {
                                              triggerTime =
                                                new Date().getTime();
                                            }}
                                            onMouseUp={() => {
                                              let thisMoment =
                                                new Date().getTime();
                                              triggerTime =
                                                thisMoment - triggerTime;
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
                                              fontFamily: "ProximaSoft-regular",
                                              color: "#0A52CB",
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
                                            onClick={(e) =>
                                              startExams(e, Inglés)
                                            }
                                            style={{
                                              fontFamily: "ProximaSoft-regular",
                                            }}
                                          >
                                            {Inglés.name}
                                          </button>
                                        ) : Inglés.studentExamStatus ===
                                          "end" ? (
                                          <button
                                            style={{
                                              fontFamily: "ProximaSoft-bold",
                                            }}
                                            onClick={(e) => {
                                              if (triggerTime >= 300) {
                                                setStudentExamRecId(
                                                  Inglés.studentExamRecordId
                                                );
                                                setFolderId(Inglés.folderId);
                                                setResetExam(true);
                                              } else {
                                                return reviewExam(e, Inglés);
                                              }
                                            }}
                                            onMouseDown={() => {
                                              triggerTime =
                                                new Date().getTime();
                                            }}
                                            onMouseUp={() => {
                                              let thisMoment =
                                                new Date().getTime();
                                              triggerTime =
                                                thisMoment - triggerTime;
                                            }}
                                          >
                                            {Inglés.name}
                                          </button>
                                        ) : (
                                          <button
                                            id={Inglés.id}
                                            onClick={(e) =>
                                              startExams(e, Inglés)
                                            }
                                            style={{
                                              fontFamily: "ProximaSoft-regular",
                                              color: "#0A52CB",
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
                                              fontFamily: "ProximaSoft-regular",
                                            }}
                                          >
                                            {Psicotécnicos.name}
                                          </button>
                                        ) : Psicotécnicos.studentExamStatus ===
                                          "end" ? (
                                          <button
                                            style={{
                                              fontFamily: "ProximaSoft-bold",
                                            }}
                                            onClick={(e) => {
                                              if (triggerTime >= 300) {
                                                setStudentExamRecId(
                                                  Psicotécnicos.studentExamRecordId
                                                );
                                                setFolderId(
                                                  Psicotécnicos.folderId
                                                );
                                                setResetExam(true);
                                              } else {
                                                return reviewExam(
                                                  e,
                                                  Psicotécnicos
                                                );
                                              }
                                            }}
                                            onMouseDown={() => {
                                              triggerTime =
                                                new Date().getTime();
                                            }}
                                            onMouseUp={() => {
                                              let thisMoment =
                                                new Date().getTime();
                                              triggerTime =
                                                thisMoment - triggerTime;
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
                                              fontFamily: "ProximaSoft-regular",
                                              color: "#0A52CB",
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
                                              fontFamily: "ProximaSoft-regular",
                                            }}
                                          >
                                            {Ortografía.name}
                                          </button>
                                        ) : Ortografía.studentExamStatus ===
                                          "end" ? (
                                          <button
                                            style={{
                                              fontFamily: "ProximaSoft-bold",
                                            }}
                                            onClick={(e) => {
                                              if (triggerTime >= 300) {
                                                setStudentExamRecId(
                                                  Ortografía.studentExamRecordId
                                                );
                                                setFolderId(
                                                  Ortografía.folderId
                                                );
                                                setResetExam(true);
                                              } else {
                                                return reviewExam(
                                                  e,
                                                  Ortografía
                                                );
                                              }
                                            }}
                                            onMouseDown={() => {
                                              triggerTime =
                                                new Date().getTime();
                                            }}
                                            onMouseUp={() => {
                                              let thisMoment =
                                                new Date().getTime();
                                              triggerTime =
                                                thisMoment - triggerTime;
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
                                              fontFamily: "ProximaSoft-regular",
                                              color: "#0A52CB",
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
                          </Accordion>
                        </div>
                      );
                    })}
                  </div>
                </>
              ) : (
                <>
                  {folderData.map((data, index) => {
                    const panel = data.name;
                    return (
                      <div className={Styles.folderWrapper}>
                        <Accordion
                          TransitionProps={{ unmountOnExit: true }}
                          expanded={expanded === data.name}
                          onChange={handleModalChange(panel)}
                          className={Styles.BoxWrapper1212}
                          id={data.id}
                          onClick={() => handleExamId(data.id, index)}
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
                            <div className={Styles.heading}>{data.name}</div>
                          </AccordionSummary>
                          <AccordionDetails>
                            {listLoading ? (
                              <div className="w-100 text-center">
                                <CircularProgress
                                  style={{
                                    width: "20px",
                                    height: "20px",
                                    margin: "10px",
                                  }}
                                />
                              </div>
                            ) : (
                              <>
                                {filesData.map((files) => {
                                  return (
                                    <div className={Styles.dataWrapper}>
                                      <div>
                                        {files.Conocimientos.map(
                                          (Conocimientos) => {
                                            return (
                                              <div className={Styles.examLinks}>
                                                {Conocimientos.studentExamStatus ===
                                                "notAttempted" ? (
                                                  <button
                                                    id={Conocimientos.id}
                                                    onClick={(e) =>
                                                      startExams(
                                                        e,
                                                        Conocimientos
                                                      )
                                                    }
                                                    style={{
                                                      fontFamily:
                                                        "ProximaSoft-regular",
                                                    }}
                                                  >
                                                    {Conocimientos.name}
                                                  </button>
                                                ) : Conocimientos.studentExamStatus ===
                                                  "end" ? (
                                                  <button
                                                    style={{
                                                      fontFamily:
                                                        "ProximaSoft-bold",
                                                    }}
                                                    id={
                                                      Conocimientos.studentExamRecordId
                                                    }
                                                    onClick={(e) => {
                                                      if (triggerTime >= 300) {
                                                        setStudentExamRecId(
                                                          Conocimientos.studentExamRecordId
                                                        );
                                                        setFolderId(
                                                          Conocimientos.folderId
                                                        );
                                                        setResetExam(true);
                                                      } else {
                                                        return reviewExam(
                                                          e,
                                                          Conocimientos
                                                        );
                                                      }
                                                    }}
                                                    onMouseDown={() => {
                                                      triggerTime =
                                                        new Date().getTime();
                                                    }}
                                                    onMouseUp={() => {
                                                      let thisMoment =
                                                        new Date().getTime();
                                                      triggerTime =
                                                        thisMoment -
                                                        triggerTime;
                                                    }}
                                                  >
                                                    {Conocimientos.name}
                                                  </button>
                                                ) : (
                                                  <button
                                                    id={Conocimientos.id}
                                                    onClick={(e) =>
                                                      startExams(
                                                        e,
                                                        Conocimientos
                                                      )
                                                    }
                                                    style={{
                                                      fontFamily:
                                                        "ProximaSoft-regular",
                                                      color: "#0A52CB",
                                                    }}
                                                  >
                                                    {Conocimientos.name}
                                                  </button>
                                                )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                      <div>
                                        {files.Inglés.map((Inglés) => {
                                          return (
                                            <div className={Styles.examLinks}>
                                              {Inglés.studentExamStatus ===
                                              "notAttempted" ? (
                                                <button
                                                  id={Inglés.id}
                                                  onClick={(e) =>
                                                    startExams(e, Inglés)
                                                  }
                                                  style={{
                                                    fontFamily:
                                                      "ProximaSoft-regular",
                                                  }}
                                                >
                                                  {Inglés.name}
                                                </button>
                                              ) : Inglés.studentExamStatus ===
                                                "end" ? (
                                                <button
                                                  style={{
                                                    fontFamily:
                                                      "ProximaSoft-bold",
                                                  }}
                                                  onClick={(e) => {
                                                    if (triggerTime >= 300) {
                                                      setStudentExamRecId(
                                                        Inglés.studentExamRecordId
                                                      );
                                                      setFolderId(
                                                        Inglés.folderId
                                                      );
                                                      setResetExam(true);
                                                    } else {
                                                      return reviewExam(
                                                        e,
                                                        Inglés
                                                      );
                                                    }
                                                  }}
                                                  onMouseDown={() => {
                                                    triggerTime =
                                                      new Date().getTime();
                                                  }}
                                                  onMouseUp={() => {
                                                    let thisMoment =
                                                      new Date().getTime();
                                                    triggerTime =
                                                      thisMoment - triggerTime;
                                                  }}
                                                >
                                                  {Inglés.name}
                                                </button>
                                              ) : (
                                                <button
                                                  id={Inglés.id}
                                                  onClick={(e) =>
                                                    startExams(e, Inglés)
                                                  }
                                                  style={{
                                                    fontFamily:
                                                      "ProximaSoft-regular",
                                                    color: "#0A52CB",
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
                                        {files.Psicotécnicos.map(
                                          (Psicotécnicos) => {
                                            return (
                                              <div className={Styles.examLinks}>
                                                {Psicotécnicos.studentExamStatus ===
                                                "notAttempted" ? (
                                                  <button
                                                    onClick={(e) =>
                                                      startExams(
                                                        e,
                                                        Psicotécnicos
                                                      )
                                                    }
                                                    id={Psicotécnicos.id}
                                                    style={{
                                                      fontFamily:
                                                        "ProximaSoft-regular",
                                                    }}
                                                  >
                                                    {Psicotécnicos.name}
                                                  </button>
                                                ) : Psicotécnicos.studentExamStatus ===
                                                  "end" ? (
                                                  <button
                                                    style={{
                                                      fontFamily:
                                                        "ProximaSoft-bold",
                                                    }}
                                                    onClick={(e) => {
                                                      if (triggerTime >= 300) {
                                                        setStudentExamRecId(
                                                          Psicotécnicos.studentExamRecordId
                                                        );
                                                        setFolderId(
                                                          Psicotécnicos.folderId
                                                        );
                                                        setResetExam(true);
                                                      } else {
                                                        return reviewExam(
                                                          e,
                                                          Psicotécnicos
                                                        );
                                                      }
                                                    }}
                                                    onMouseDown={() => {
                                                      triggerTime =
                                                        new Date().getTime();
                                                    }}
                                                    onMouseUp={() => {
                                                      let thisMoment =
                                                        new Date().getTime();
                                                      triggerTime =
                                                        thisMoment -
                                                        triggerTime;
                                                    }}
                                                  >
                                                    {Psicotécnicos.name}
                                                  </button>
                                                ) : (
                                                  <button
                                                    id={Psicotécnicos.id}
                                                    onClick={(e) =>
                                                      startExams(
                                                        e,
                                                        Psicotécnicos
                                                      )
                                                    }
                                                    style={{
                                                      fontFamily:
                                                        "ProximaSoft-regular",
                                                      color: "#0A52CB",
                                                    }}
                                                  >
                                                    {Psicotécnicos.name}
                                                  </button>
                                                )}
                                              </div>
                                            );
                                          }
                                        )}
                                      </div>
                                      <div>
                                        {files.Ortografía.map((Ortografía) => {
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
                                                      "ProximaSoft-regular",
                                                  }}
                                                >
                                                  {Ortografía.name}
                                                </button>
                                              ) : Ortografía.studentExamStatus ===
                                                "end" ? (
                                                <button
                                                  style={{
                                                    fontFamily:
                                                      "ProximaSoft-bold",
                                                  }}
                                                  onClick={(e) => {
                                                    if (triggerTime >= 300) {
                                                      setStudentExamRecId(
                                                        Ortografía.studentExamRecordId
                                                      );
                                                      setFolderId(
                                                        Ortografía.folderId
                                                      );
                                                      setResetExam(true);
                                                    } else {
                                                      return reviewExam(
                                                        e,
                                                        Ortografía
                                                      );
                                                    }
                                                  }}
                                                  onMouseDown={() => {
                                                    triggerTime =
                                                      new Date().getTime();
                                                  }}
                                                  onMouseUp={() => {
                                                    let thisMoment =
                                                      new Date().getTime();
                                                    triggerTime =
                                                      thisMoment - triggerTime;
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
                                                      "ProximaSoft-regular",
                                                    color: "#0A52CB",
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
                                  );
                                })}
                              </>
                            )}
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}
                </>
              )}
            </Container>
          </main>
        </div>
      ) : showResultScreen === true ? (
        <>
          <main className="flex">
            <Container maxWidth="xlg">
              <div className={Styles.quizEndWrapperInner}>
                <div>
                  <div style={{ fontFamily: "ProximaSoft-bold" }}>
                    <Markup
                      content={examReviewData[currentQuestion].question}
                    />
                  </div>
                  <div>
                    <img
                      src={examReviewData[currentQuestion].image}
                      alt=""
                      width="50%"
                    />
                  </div>
                  <div className={Styles.Options}>
                    <button className={Styles.answerLinks}>
                      <div className={Styles.answerLinksInner3}>
                        {examReviewData[currentQuestion].status == "correct" &&
                        examReviewData[currentQuestion].correct == "a" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "a" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "a" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "a" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer1" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
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
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "b" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "b" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "b" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer2" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
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
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "c" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "c" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "c" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer3" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
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
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].correct == "d" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "d" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status ==
                            "notAttempted" &&
                          examReviewData[currentQuestion].correct == "d" ? (
                          <img src={tick} alt="" style={{ width: "40px" }} />
                        ) : examReviewData[currentQuestion].status == "wrong" &&
                          examReviewData[currentQuestion].studentAnswered ==
                            "answer4" ? (
                          <img src={cross} alt="" style={{ width: "40px" }} />
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
                  <div
                    className="m-4"
                    style={{
                      fontFamily: "ProximaSoft-regular",
                    }}
                  >
                    <Markup
                      content={examReviewData[currentQuestion].description}
                    />
                  </div>
                  <div className="w-50 text-center m-auto">
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (props.showExam === "true") {
                          props.updateView();
                        } else {
                          setShowScreen(true);
                          setExamStatusCheck(false);
                        }
                        setShowResult(false);
                        setShowScore(false);
                      }}
                    >
                      Volver a Exámenes
                    </Button>
                  </div>
                </div>
                <div className={Styles.resultBtnWrapper}>
                  {examReviewData.map((data, index) => {
                    return (
                      <div
                        style={{
                          margin: "3px",
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
                                : data.status == "wrong"
                                ? `url(${wrongImg})`
                                : `url(${correctImg})`,
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
      ) : showScore === true ? (
        <main className={Styles.wrapperMain}>
          <Container maxWidth="xlg">
            <h1 className={Styles.examenesHeading3}>{endExam.examName}</h1>
            <Grid container spacing={1} marginTop={10}>
              <Grid item xs={12} md={4} className={Styles.ResultWrappers}>
                <div className={Styles.innerResultWrapper}>
                  <p className={Styles.resultData}>
                    Tiempo:
                    <span className={Styles.resultDataBold}>
                      {endExam.examDuration} / {endExam.totalTime}
                    </span>
                  </p>
                  <p className={Styles.resultData}>
                    Aciertos:
                    <span className={Styles.resultDataBold}>
                      {endExam.correctCount}
                    </span>
                  </p>
                  <p className={Styles.resultData}>
                    Fallos:
                    <span className={Styles.resultDataBold}>
                      {endExam.wrongCount}
                    </span>
                  </p>
                  <p className={Styles.resultData}>
                    Nulos:
                    <span className={Styles.resultDataBold}>
                      {endExam.nonAttemptedCount}
                    </span>
                  </p>
                  <p
                    className={Styles.resultData}
                    style={{ marginTop: "30px" }}
                  >
                    Puntos:
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
                    progress={endExam.correctPercentage.toFixed(1)}
                  />
                  <img src={tick} style={{ width: "40px" }} />
                </div>
                <div className={Styles.progressBarWrapper}>
                  <Progressbar
                    bgcolor={`linear-gradient(to bottom, rgba(206,8,17,1), rgba(222,110,81,1))`}
                    progress={endExam.wrongPercentage.toFixed(1)}
                  />
                  <img src={cross} style={{ width: "40px" }} />
                </div>
                <div className={Styles.progressBarWrapper}>
                  <Progressbar
                    bgcolor={`linear-gradient(to top, rgba(47,49,47,1), rgba(119,118,119,1))`}
                    progress={endExam.nullPercentage.toFixed(1)}
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
                      margin: "3px",
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
      ) : showExam === true ? (
        <>
          <div>
            <main className={Styles.wrapperMain1}>
              <Container maxWidth="xlg">
                <div className={Styles.quizWrapperInner}>
                  <div className={Styles.timerWrapper}>
                    {/* Timer STARTS HERE                      */}
                    <div className={Styles.timerWrapper}>
                      <div className="flex mx-5">
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
                        <img
                          src={correctAnswerImg}
                          className={Styles.timerIcons}
                          onClick={() => {
                            ansArry.splice(ansCheck, 1, {
                              answer:
                                examData[currentQuestion].correct === "a"
                                  ? "answer1"
                                  : examData[currentQuestion].correct === "b"
                                  ? "answer2"
                                  : examData[currentQuestion].correct === "c"
                                  ? "answer3"
                                  : examData[currentQuestion].correct === "d"
                                  ? "answer4"
                                  : answerClicked,
                              showDescript: true,
                            });
                            return handleSetAnswer();
                          }}
                        />
                      </div>
                      <div className="flex text-xl">
                        Tiempo:
                        <h2
                          className={Styles.timerHeading}
                          style={{ fontFamily: "ProximaSoft-bold" }}
                        >
                          {twoDigits(minutesToDisplay)}:
                          {twoDigits(secondsToDisplay)}
                        </h2>
                        min
                      </div>
                    </div>
                    {/* Timer Ends Here                      */}
                  </div>
                  <div>
                    <div style={{ fontFamily: "ProximaSoft-bold" }}>
                      <Markup content={examData[currentQuestion].question} />
                    </div>
                    <div>
                      <img
                        src={
                          currentQuestion == ansCheck
                            ? examData[currentQuestion].image
                            : ""
                        }
                        alt=""
                        width="50%"
                      />
                    </div>
                    <div className={Styles.Options}>
                      <button
                        id="a"
                        value="a"
                        onClick={(e) => {
                          setLoading(true);
                          if (
                            (currentQuestion == ansCheck &&
                              ansArry[currentQuestion].answer == "answer1") ||
                            examData[currentQuestion].studentAnswered ==
                              "answer1"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer1";
                            handleSetAnswer("answer1");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer1" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct == "a" ? (
                            <img src={tick} alt="" style={{ width: "40px" }} />
                          ) : examData[currentQuestion].studentAnswered ==
                              "answer1" &&
                            examData[currentQuestion].correct != "a" ? (
                            <img src={cross} alt="" style={{ width: "40px" }} />
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
                          if (
                            (ansArry[currentQuestion].answer == "answer2" &&
                              currentQuestion == ansCheck) ||
                            examData[currentQuestion].studentAnswered ==
                              "answer2"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer2";
                            handleSetAnswer("answer2");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer2" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct == "b" ? (
                            <img src={tick} alt="" style={{ width: "40px" }} />
                          ) : examData[currentQuestion].studentAnswered ==
                              "answer2" &&
                            examData[currentQuestion].correct != "b" ? (
                            <img src={cross} alt="" style={{ width: "40px" }} />
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
                          if (
                            (ansArry[currentQuestion].answer == "answer3" &&
                              currentQuestion == ansCheck) ||
                            examData[currentQuestion].studentAnswered ==
                              "answer3"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer3";
                            handleSetAnswer("answer3");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer3" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct == "c" ? (
                            <img src={tick} alt="" style={{ width: "40px" }} />
                          ) : examData[currentQuestion].studentAnswered ==
                              "answer3" &&
                            examData[currentQuestion].correct != "c" ? (
                            <img src={cross} alt="" style={{ width: "40px" }} />
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
                          if (
                            (ansArry[currentQuestion].answer == "answer4" &&
                              currentQuestion == ansCheck) ||
                            examData[currentQuestion].studentAnswered ==
                              "answer4"
                          ) {
                            answerClicked = null;
                            handleSetAnswer("null");
                          } else {
                            answerClicked = "answer4";
                            handleSetAnswer("answer4");
                          }
                          ansArry.splice(ansCheck, 1, {
                            answer: answerClicked,
                            showDescript: false,
                          });
                        }}
                        className={Styles.answerLinks}
                      >
                        <div className={Styles.answerLinksInner1}>
                          {ansArry[currentQuestion].answer == "answer4" &&
                          currentQuestion == ansCheck &&
                          ansArry[currentQuestion].showDescript != true ? (
                            <img src={ansSelectImg} width={"80%"} />
                          ) : ansArry[currentQuestion].showDescript === true &&
                            examData[currentQuestion].correct == "d" ? (
                            <img src={tick} alt="" style={{ width: "40px" }} />
                          ) : examData[currentQuestion].studentAnswered ==
                              "answer4" &&
                            examData[currentQuestion].correct != "d" ? (
                            <img src={cross} alt="" style={{ width: "40px" }} />
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
                  {ansArry[currentQuestion].showDescript === true ? (
                    <div
                      className="m-8"
                      style={{
                        fontFamily: "ProximaSoft-regular",
                      }}
                    >
                      <Markup content={examData[currentQuestion].description} />
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={Styles.resultBtnWrapper}>
                    {ansArry.map((data, index) => {
                      return (
                        <div
                          style={{
                            margin: "3px",
                          }}
                        >
                          <button
                            onClick={() => {
                              setCurrentQuestion(index);
                              setAnsCheck(index);
                            }}
                            className={`${Styles.resultBtn} noAnswer`}
                            style={{
                              backgroundImage:
                                currentQuestion == index
                                  ? `url(${golden})`
                                  : data.answer == null || data.answer == "null"
                                  ? `url(${noSelect})`
                                  : `url(${answerImg1})`,
                            }}
                          >
                            {index + 1}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <LinearProgress
                      variant="determinate"
                      value={progress}
                      style={{
                        transition: "transform .04s ease",
                      }}
                    />
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
              </Container>
            </main>
          </div>
        </>
      ) : (
        <>
          <h2>Internet Connection Error - Please Reload The Page !</h2>
        </>
      )}
    </>
  );
}
export default Examenes1;
