import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';



export const AlertsError = () => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">This is an error Alert.</Alert>
        </Stack>
      );
}


