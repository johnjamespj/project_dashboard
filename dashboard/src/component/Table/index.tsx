import type { TableProps, RawData } from './types'

import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

import { TableHead } from './TableHead'
import { TableToolbar } from './TableToolbar'

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        rowRoot: {
            '& > *': {
                borderBottom: 'unset',
            },
        },
    }),
);

export function EnhancedTable<Data extends RawData>({
    data,
    count,
    rowsPerPage,
    page,
    rowsPerPageOptions,
    fieldDefinition,
    orderBy,
    order,

    dense,
    title,
    activeActions,
    actions,
    isSelectable,

    onRequestSort,
    onSelectAll,
    onSelectRow,
    onChangePage,
    onChangeRowPerPage,
    renderExpanded,

    isExpandable = false,
}: TableProps<Data>) {
    const classes = useStyles()

    const [selected, setSelected] = React.useState<string[]>([])
    const [openRow, setOpenRow] = React.useState<number>(-1)

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Data) => {
        const isAsc = orderBy === property && order === 'asc'
        onRequestSort(property, isAsc ? 'desc' : 'asc')
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (isSelectable) {
            if (event.target.checked) {
                const newSelecteds = data.map((n) => n.id)
                setSelected(newSelecteds)
                return
            }
            setSelected([])
            onSelectAll()
        }
    }

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        if (isSelectable) {
            const selectedIndex = selected.indexOf(name)
            let newSelected: string[] = []

            if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name)
            } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1))
            } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1))
            } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(
                    selected.slice(0, selectedIndex),
                    selected.slice(selectedIndex + 1),
                )
            }

            setSelected(newSelected)
            onSelectRow(name, newSelected)
        }
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        onChangePage(newPage)
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeRowPerPage(parseInt(event.target.value, 10))
        onChangePage(0)
    }

    const isSelected = (id: string) => selected.indexOf(id) !== -1

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length)

    return (
        <Paper className={classes.paper}>
            <TableToolbar
                numSelected={selected.length}
                title={title}
                activeActions={activeActions}
                actions={actions}
            />
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                >
                    <TableHead<Data>
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={data.length}
                        fieldDefinition={fieldDefinition}
                        isSelectable={isSelectable}
                        isExpandable={isExpandable}
                    />
                    <TableBody>
                        {data.map((row: Data, index: number) => {
                            const isItemSelected = isSelected(row.id);
                            const labelId = `enhanced-table-checkbox-${index}`;

                            return (
                                <React.Fragment>
                                    <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.id)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        className={classes.rowRoot}
                                    >
                                        {isSelectable && (<TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{ 'aria-labelledby': labelId }}
                                            />
                                        </TableCell>)}
                                        {isExpandable && (<TableCell padding="checkbox">
                                            <IconButton onClick={() => setOpenRow(x => index === x ? -1 : index)}>
                                                <Icon>
                                                    {index !== openRow ? 'keyboard_arrow_down' : 'keyboard_arrow_up'}
                                                </Icon>
                                            </IconButton>
                                        </TableCell>)}
                                        {fieldDefinition.map((x, i) => {
                                            if (i === 0)
                                                return (<TableCell component="th" id={labelId} scope="row" padding={isSelectable ? "none" : 'default'}>
                                                    {row[x.id]}
                                                </TableCell>)

                                            return <TableCell align="right">{row[x.id]}</TableCell>
                                        })}
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={Object.keys(row).length + (isSelectable ? 1 : 0) + 1}>
                                            {isExpandable && (<Collapse in={index === openRow} timeout="auto" unmountOnExit>
                                                {renderExpanded && renderExpanded(row.id)}
                                            </Collapse>)}
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            );
                        })}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}