import { CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import classnames from 'classnames';

const useStyles = makeStyles(() => ({
   wrapper: {
      width: '100%',
      minHeight: ({ wrapperMinHeight }: Props) => wrapperMinHeight || '700px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
   },
   overlay: {
      backgroundColor: 'rgba(255, 255, 255, 0.88)',
      zIndex: 2,
      position: 'absolute',
   },
}));

interface Props {
   wrapperMinHeight?: string;
   overlay?: boolean;
}

const Loader = (props: Props) => {
   const classes = useStyles(props);

   const { overlay } = props;

   return (
      <Grid
         className={classnames({
            [classes.wrapper]: true,
            [classes.overlay]: !!overlay,
         })}
      >
         <Grid item xs={12}>
            <CircularProgress data-testid="loader" />
         </Grid>
         <Grid item xs={12}>
            <Typography>Loading...</Typography>
         </Grid>
      </Grid>
   );
};

export default Loader;
