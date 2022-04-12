import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  courseWrapper: {
    padding: "30px 0px",
    overflow: "hidden",
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Montserrat-regular",
    backgroundColor: "#f7f7f7",
  },
  heading: {
    fontSize: "30px",
    color: "black",
    fontWeight: "900",
    textAlign: "center",
    margin: "20px auto",
    "@media (max-width: 720px)": {
      fontSize: "20px",
    },
  },
  headingText: {
    fontSize: "20px",
    "@media (max-width: 720px)": {
      fontSize: "10px",
    },
  },
  dataWrapper: {
    display: "flex",
    justifyContent: "space-around",
  },
  topImgHeadWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
  examLinks: {
    color: "black",
    cursor: "pointer",
    textAlign: "center",
    fontSize: "20px",
    margin: "10px 0px",
    "&:hover": {
      color: "royalblue",
      fontFamily: "Montserrat-bold",
    },
    "@media (max-width: 720px)": {
      fontSize: "10px",
    },
  },
  comenzarBtnWrapper: {
    width: "100%",
    textAlign: "center",
  },
  comenzarBtn: {
    width: "30%",
    "@media (max-width: 720px)": {
      width: "70%",
    },
  },
  quizWrapperInner: {
    padding: "20px",
    margin: "0px auto",
    minWidth: "800px",
    fontFamily: "Montserrat-regular",
    overflow: "hidden",
    "@media (max-width: 720px)": {
      padding: "0px",
      minWidth: "100%",
    },
  },
  quizQuestionHeading: {
    fontSize: "30px",
    margin: "20px ",
    textAlign: "start",
    fontFamily: "Montserrat-regular",
    "@media (max-width: 720px)": {
      fontSize: "20px",
      margin: "5px auto",
      textAlign: "start",
    },
  },
  Options: {
    display: "flex",
    flexDirection: "column",
    margin: "20px auto",
    alignItems: "start",
  },
  answerLinks: {
    display: "flex",
    width: "100%",
    margin: "15px 0px",
    textAlign: "start",
    minHeight: "2em",
    alignItems: "center",
  },
  answerLinksInnerImg: {
    height: "2em",
    width: "2em",
    "@media (max-width: 720px)": {
      height: "1em",
      width: "1em",
    },
  },
  answerLinksInner1: {
    width: "5%",
    margin: "0 auto",
    color: "royalblue",
    "@media (max-width: 720px)": {
      width: "10%",
    },
  },
  answerLinksInner2: {
    width: "95%",
    "@media (max-width: 720px)": {
      width: "90%",
    },
  },
  answerLinksInner3: {
    width: "5%",
    margin: "0 15px",
    color: "royalblue",
    height: "50px",
  },
  ImgTextHeading: {
    fontSize: "15px",
    fontWeight: "800",
    color: "white",
    position: "relative",
    bottom: "28px",
    textAlign: "center",
  },
  timerWrapper: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "5px",
    margin: "20px auto",
  },
  timerIcons: {
    margin: "0px 10px",
    cursor: "pointer",
    justifyContent: "start",
  },
  timerHeading: {
    margin: "0px 10px",
    cursor: "pointer",
    fontSize: "20px",
    "@media (max-width: 720px)": {
      fontSize: "14px",
      fontWeight: "700",
    },
  },
  // QUIZ SCREEN 3 STYLING

  wrapperMain: {
    margin: "0 auto",
    overflow: "hidden",
    display: "flex",
    fontFamily: "Montserrat-regular",
  },
  examenesHeading3: {
    fontSize: "30px",
    margin: "20px auto 10px",
    textAlign: "center",
    "@media (max-width: 720px)": {
      fontSize: "20px",
    },
  },
  ResultWrappers: {
    margin: "10px auto",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    fontFamily: "Montserrat-regular",
  },
  innerResultWrapper: {
    width: "100%",
  },
  resultBtnMain: {
    width: "100%",
    textAlign: "center",
  },
  revisarBtn: {
    margin: "20px",
    "@media (max-width: 720px)": {
      width: "80%",
      margin: "0px",
    },
  },
  salirBtn: {
    margin: "20px",
    "@media (max-width: 720px)": {
      width: "80%",
      margin: "0px",
    },
  },
  progressBarWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px auto",
    height: "100%",
    fontFamily: "Montserrat-regular",
  },
  resultData: {
    fontSize: "20px",
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Montserrat-regular",
    "@media (max-width: 720px)": {
      fontSize: "15px",
    },
  },
  resultDataBold: {
    fontSize: "20px",
    textAlign: "end",
    fontWeight: "700",
    "@media (max-width: 720px)": {
      fontSize: "15px",
    },
  },
  resultBtnWrapper: {
    margin: "10px auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    alignItems: "center",
    "@media (max-width: 720px)": {
      justifyContent: "space-evenly",
    },
  },
  resultBtn: {
    fontSize: "16px",
    fontWeight: "800",
    backgroundColor: "#aab7df;",
    borderRadius: "50%",
    padding: "10px",
    color: "white",
    height: "100%",
    width: "100%",
    backgroundSize: "contain",
  },
}));