import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';
import TsunamiIcon from '@mui/icons-material/Tsunami';

const Navbar = () => {
  const { palette } = useTheme();
  const [selected, setSelected] = useState('dashboard');

  return (
    <FlexBetween mb='0.25rem' p='0.5rem 0rem' color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexBetween gap='0.75rem'>
        <TsunamiIcon sx={{ fontSize: '28px' }} />
        <Typography variant='h4' fontSize='16px'>
          Tsunami Analytics
        </Typography>
      </FlexBetween>

      {/* RIGHT SIDE */}
      <FlexBetween gap='2rem'>
        {/* Dashboard */}
        <Box sx={{ fontSize: '14px', '&:hover': { color: palette.primary[100], fontSize: '16px' } }}>
          <Link
            to='/'
            onClick={() => setSelected('dashboard')}
            style={{
              color: selected === 'dashboard' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            Dashboard
          </Link>
        </Box>
        {/* Predictions */}
        <Box sx={{ fontSize: '14px', '&:hover': { color: palette.primary[100], fontSize: '16px' } }}>
          <Link
            to='/predictions'
            onClick={() => setSelected('predictions')}
            style={{
              color: selected === 'predictions' ? 'inherit' : palette.grey[700],
              textDecoration: 'inherit',
            }}
          >
            Predictions
          </Link>
        </Box>
      </FlexBetween>
    </FlexBetween>
  );
};

export default Navbar;

/* Notes

*/
