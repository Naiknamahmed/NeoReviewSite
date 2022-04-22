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
  folderWrapper: {
    margin: "30px auto",
    display: "flex",
  },
  heading: {
    fontSize: "20px",
    width: "100%",
    color: "black",
    fontWeight: "600",
    fontFamily: "Rounded Elegance",
    display: "flex",
    cursor: "pointer",
    justifyContent: "start",
    alignItems: "center",
    margin: "5px",
    "@media (max-width: 720px)": {
      fontSize: "9px",
    },
  },
  folderHeading: {
    fontSize: "25px",
    color: "black",
    fontWeight: "600",
    fontFamily: "Rounded Elegance",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px auto",
    "@media (max-width: 720px)": {
      fontSize: "12px",
    },
  },
  BoxWrapper1212: {
    backgroundColor: "#f7f7f7 !important",
    boxShadow: "none !important",
  },
  headingImg: {
    width: "50px",
    margin: "0px 10px",
    "media (max-width:720px)": {
      width: "40px",
      margin: "0px 5px",
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
    margin: "0px auto",
    width: "70%",
    textAlign: "center",
  },
  comenzarBtn: {
    width: "30%",
    "@media (max-width: 720px)": {
      width: "50%",
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
  quizEndWrapperInner: {
    padding: "50px 20px 20px 20px",
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
      width: "15%",
    },
  },
  answerLinksInner2: {
    width: "95%",
    "@media (max-width: 720px)": {
      width: "85%",
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
    width: "40px",
    justifyContent: "start",
  },
  timerHeading: {
    margin: "0px 10px",
    cursor: "pointer",
    fontSize: "20px",
    color: "#0A52CB",
    fontFamily: "ProximaNovaSoft-regular",
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
    justifyContent: "start",
    alignItems: "center",
    width: "100%",
    overflowX: "scroll",
    "&::-webkit-scrollbar": {
      height: "10px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#bfbfbf",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "gray",
    },
    "@media (max-width: 920px)": {
      overflow: "hidden",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
  },
  resultBtn: {
    fontSize: "16px",
    fontWeight: "800",
    borderRadius: "50%",
    padding: "10px",
    color: "white",
    height: "auto",
    width: "45px",
    backgroundSize: "cover",
  },
  resultBtn1: {
    fontSize: "16px",
    fontWeight: "800",
    borderRadius: "50%",
    padding: "10px",
    color: "white",
    height: "auto",
    width: "45px",
  },
}));
