import {
   Grid,
   makeStyles,
   Table,
   TableHead,
   TableRow,
   TableCell,
   TableBody,
} from '@material-ui/core';
import classnames from 'classnames';
import { themeVariables } from '../../theme';
import { ColumnConfig } from '../../types';

const useStyles = makeStyles(() => ({
   dataTableTitle: {
      padding: '20px 0',
   },
   dataTableContainer: {
      minWidth: '1270px',
      maxHeight: 'calc(100vh - 300px)',
      overflow: 'auto',
      position: 'relative',
   },
   dataTableCell: {
      padding: '16px 20px',
      fontSize: '1rem',
      backgroundColor: themeVariables.colors.white,

      '& a': {
         textDecoration: 'none',
         color: themeVariables.colors.textBlue,

         '&:hover': {
            color: themeVariables.colors.lightBlue,
         },
      },
   },
   dataTableHeadCell: {
      top: 0,
      zIndex: 2,
      position: 'sticky',
      backgroundColor: themeVariables.colors.white,
      borderBottom: `1px solid ${themeVariables.colors.black}`,
   },
}));

interface Props {
   columns: any;
   keyColumn: string;
   title: JSX.Element | string;
   data: any[];
}

const DataTable = ({ columns, keyColumn, title, data }: Props) => {
   const classes = useStyles();

   return (
      <>
         <Grid item xs={12} className={classes.dataTableTitle}>
            {title}
         </Grid>
         <Grid item xs={12} className={classes.dataTableContainer}>
            <Table stickyHeader>
               <TableHead>
                  <TableRow>
                     {columns.map(({ name, label }: ColumnConfig) => (
                        <TableCell
                           key={name}
                           className={classnames(classes.dataTableCell, classes.dataTableHeadCell)}
                        >
                           <strong>{label}</strong>
                        </TableCell>
                     ))}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {data.map((rowData: any) => {
                     return (
                        <TableRow key={rowData[keyColumn]}>
                           {columns.map(({ name }: ColumnConfig) => (
                              <TableCell className={classes.dataTableCell} key={name}>
                                 {rowData[name]}
                              </TableCell>
                           ))}
                        </TableRow>
                     );
                  })}
               </TableBody>
            </Table>
         </Grid>
      </>
   );
};

export default DataTable;
