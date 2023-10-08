import { Box } from '@mui/material';
import { styled } from '@mui/system';

const FlexBetween = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export default FlexBetween;

/* Notes
- a styled component that we create that we want to re-use
and possibly shared across components. Share styling.
- flexbox space between content, and align items center is
very common/standard and we may want to reuse across comps.

- now we can reuse this theme everywhere and have the 
same functionality as regular Box.
*/