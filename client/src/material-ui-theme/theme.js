import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

export const theme = createMuiTheme({
  palette: {
    primary: { main: "#7fffd4" },
    secondary: { main: "#fafad2" }
  },
  status: {
    danger: red
  }
});
