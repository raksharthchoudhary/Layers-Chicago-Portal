import * as React from 'react';
import styles from './stockInfo.module.scss';

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Button,
    Typography,
    StyledEngineProvider
} from '@mui/material';

const rows = ['Today', '30+ Days', '60+ Days'];
const columns = ['All Items (#)', 'Floor Items (#)', 'Back Stock (#)'];

function StockTable() {
  return (
    <StyledEngineProvider injectFirst>
    <TableContainer className={styles.container} component={Paper}>
      <Table aria-label="simple table">
        <TableHead className={styles.head}>
          <TableRow className={styles.row}>
            <TableCell className={`${styles.cell} ${styles.firstCell}`}>
                <Button className={styles.info} disableRipple={true}>
                    <Typography className={styles.title}>
                        /inventory
                    </Typography>
                </Button>
            </TableCell>
            {columns.map((column, index) => (
              <TableCell className={styles.cell}key={index}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={styles.body}>
          {rows.map((row, index) => (
            <TableRow key={index} className={styles.row}>
              <TableCell component="th" scope="row" className={`${styles.cell} ${styles.firstCell}`}>
                {row}
              </TableCell>
              {columns.map((column, index) => (
                <TableCell key={index} className={styles.cell}>Data</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </StyledEngineProvider>
  );
}

export default StockTable;
