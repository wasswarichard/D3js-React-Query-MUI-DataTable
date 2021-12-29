import { makeStyles, Typography, Grid } from '@material-ui/core';
import { Cancel as ErrorIcon } from '@material-ui/icons';

import { themeVariables } from '../../theme';

const useStyles = makeStyles(() => ({
   container: {
      width: '400px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      border: `1px solid ${themeVariables.colors.red}`,
      padding: '0 20px',
      marginTop: '50px',
   },
   errorIconContainer: {
      paddingRight: '10px',

      '& svg': {
         color: themeVariables.colors.red,
      },
   },
}));

interface Props {
   message?: string;
}

const ErrorMessage = ({ message }: Props) => {
   const classes = useStyles();

   return (
      <Grid container className={classes.container}>
         <Grid item className={classes.errorIconContainer}>
            <ErrorIcon />
         </Grid>
         <Grid item>
            <Typography variant="body1">
               {message || 'Something went wrong. Please try again.'}
            </Typography>
         </Grid>
      </Grid>
   );
};

export default ErrorMessage;
