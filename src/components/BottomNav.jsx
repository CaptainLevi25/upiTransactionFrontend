import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Transaction from './Transaction';

export default function SimpleBottomNavigation({cats}) {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100vw" ,display: "flex" , justifyContent: 'center', alignItems:"center", gap: "60px", position: "sticky", bottom: 0 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{display: "flex" , justifyContent: "center" , alignItems : "center" , gap: "80px"}}
      >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon fontSize='large'/>} />
        {/* <BottomNavigationAction label="Payments" icon={<Transaction fontSize='large' />} /> */}
        <Transaction label="Payments" cats={cats} />
        <BottomNavigationAction label="Nearby" icon={<LocationOnIcon fontSize='large'/>} />
      </BottomNavigation>
    </Box>
  );
}
