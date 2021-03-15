import type { TableHeadProps, RawData } from './types'

import TableCell from '@material-ui/core/TableCell';
import MUITableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useStyles } from '.';

export function TableHead<Data extends RawData>(props: TableHeadProps<Data>) {
  const classes = useStyles()
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, fieldDefinition, onRequestSort, isSelectable, isExpandable } = props;
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <MUITableHead>
      <TableRow>
        {isSelectable && (<TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>)}
        {isExpandable && (<TableCell padding="checkbox"/>)}
        {fieldDefinition.map((headCell, i) => (
          <TableCell
            key={i}
            align={headCell.numeric ? 'right' : 'left'}
            padding={isSelectable && i === 0 ? "none" : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            { (headCell.sortable === undefined || headCell.sortable) ? (<TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>) : headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  );
}