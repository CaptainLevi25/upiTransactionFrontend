import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import RegistrationForm from "./Register";
import LoginForm from "./Login";
import Header from "../components/Header";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            
            display: "flex",
            height: "91vh",
            justifyContent: "center",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box  sx={{ borderBottom: 1, borderColor: "divider", height: "7vh" , backgroundColor: "#374151"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
         
        >
          <Tab label="Register" {...a11yProps(0)}  sx={{color: "white"}}/>
          <Tab label="Login" {...a11yProps(1)} sx={{color: "white"}}/>
          <Tab label="About US" {...a11yProps(2)} sx={{color: "white"}}/>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <RegistrationForm setValue={setValue} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <LoginForm setValue={setValue} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Header/>
      </CustomTabPanel>
    </Box>
  );
}
