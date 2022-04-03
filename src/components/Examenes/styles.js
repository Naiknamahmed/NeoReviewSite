import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  courseWrapper: {
    padding: "30px 0px",
    overflow: "hidden",
    display: "flex",
    fontFamily: "Montserrat-regular",
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
    alignItems: "start",
  },
  answerLinks: {
    fontSize: "22px",
    padding: "10px",
    width: "100%",
    margin: "10px 0px",
    textAlign: "start",
    fontFamily: "Montserrat-regular",
    "&:focus": {
      color: "royalblue",
      fontFamily: "Montserrat-bold",
    },
    "@media (max-width: 720px)": {
      fontSize: "15px",
      padding: "0px",
      textAlign: "start",
    },
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
  },
  resultBtn: {
    padding: "10px",
    margin: "40px 10px",
    borderRadius: "50%",
    height: "40px",
    width: "40px",
    textAlign: "center",
    "@media (max-width: 720px)": {
      margin: "5px",
      width: "35px",
      height: "35px",
      fontSize: "13px",
      padding: "0px",
    },
  },
}));
