import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import * as smartHomeActions from "../redux/actionCreators/homeAssistant";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
    amber: Palette["primary"];
    lightgreen: Palette["primary"];
    teal: Palette["primary"];
    cyan: Palette["primary"];
    indigo: Palette["primary"];
    purple: Palette["primary"];
    gray: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
    amber?: PaletteOptions["primary"];
    lightgreen?: PaletteOptions["primary"];
    teal?: PaletteOptions["primary"];
    cyan?: PaletteOptions["primary"];
    indigo?: PaletteOptions["primary"];
    purple?: PaletteOptions["primary"];
    gray?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
    amber: true;
    lightgreen: true;
    teal: true;
    cyan: true;
    indigo: true;
    purple: true;
    gray: true;
  }
}

const theme = createTheme({
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // fontSize: "2rem",
          // justifyContent: "space-between",
          "&.large": {
            fontSize: "2rem",
            justifyContent: "space-between",
          },
        },
      },
    },
  },
  palette: {
    mode: "dark",
    neutral: {
      main: "#607d8b",
      contrastText: "#fff",
    },
    amber: {
      main: "#f57c00",
      contrastText: "#fff",
    },
    lightgreen: {
      main: "#558b2f",
      contrastText: "#fff",
    },
    teal: {
      main: "#00796b",
      contrastText: "#fff",
    },
    cyan: {
      main: "#006064",
      contrastText: "#fff",
    },
    indigo: {
      main: "#3f51b5",
      contrastText: "#fff",
    },
    purple: {
      main: "#6a1b9a",
      contrastText: "#fff",
    },
    gray: {
      main: "#616161",
      contrastText: "#fff",
    },
  },
});

interface Props {
  actions: any;
}
export class SmartHome extends React.Component<Props> {
  componentDidMount() {
    this.props.actions.smartHomeConnect();
  }

  componentWillUnmount() {
    this.props.actions.smartHomeDisconnect();
  }
  render() {
    const { smarthome } = this.props;
    if (!smarthome || !smarthome.connected) {
      return (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <CircularProgress color="warning" size={120} />
          </Grid>
        </Grid>
      );
    }
    const { children } = this.props;
    return <ThemeProvider theme={theme}>{children || null}</ThemeProvider>;
  }
}
const actions: any = Object.assign({}, smartHomeActions);
function mapStateToProps(state) {
  return {
    smarthome: state.smarthome,
  };
}
function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SmartHome);
