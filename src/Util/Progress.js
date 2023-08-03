import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React, {useEffect,useContext} from 'react'

function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth:130 }}>
          <Typography variant="body2" color="text.secondary">{`Utilization: ${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };
  

export default function Progress({value}){
    const MIN = 0
    const MAX = 100
    const normalise = (value) => ((value - MIN) * 100) / (MAX - MIN);

   

    return (
            //<Progress  variant="determinate" value={(value*100)} />
            <LinearProgressWithLabel value={value*100} />
        );
    
}