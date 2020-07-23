import posed from "react-pose";

export const LoginRegisterPose = posed.div({
  visible: {
    height: 300,
    width: "100%",
    marginBottom: 30,
    opacity: 1,
    transition: {
      duration: 10,
      ease: "easeIn"
    }
  },
  hidden: {
    width: 0,
    marginBottom: 0,
    height: 0,
    opacity: 0,
    transition: {
      duration: 100,
      ease: "easeOut"
    }
  }
});

export const VerticalDropDownPose = posed.div({
  visible: {
    width: 200,
    transition: {
      duration: 150,
      ease: "easeIn"
    }
  },
  hidden: {
    width: 0,
    transition: {
      duration: 200,
      ease: "easeOut"
    }
  }
});
