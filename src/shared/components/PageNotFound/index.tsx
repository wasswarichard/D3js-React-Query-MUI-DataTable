import { Grid, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
   container: {
      width: '100%',
      minHeight: '700px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },

   dashboardLink: {
      marginTop: '30px',
   },
}));

const PageNotFound = () => {
   const classes = useStyles();

   return (
      <Grid container className={classes.container}>
         <Typography variant="h5">Page not found</Typography>
         <Typography variant="body1" className={classes.dashboardLink}>
            <Link to="/">Go to dashboard</Link>
         </Typography>
      </Grid>
   );
};

export default PageNotFound;
