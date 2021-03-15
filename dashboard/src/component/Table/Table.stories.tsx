import type { FieldDefinition, Order, RawData } from './types'

import React from 'react'
import { makeStyles } from '@material-ui/core';
// import { DrawerLegals as DrawerLegalsComponent } from './DrawerLegal';
import { EnhancedTable } from '.'


const useStyles = makeStyles((theme) => ({
    container: {
    }
}))

interface Data extends RawData {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;

    id: string;
}

const headCells: FieldDefinition<Data>[] = [
    { id: 'id', numeric: false, label: 'Dessert (100g serving)' },
    { id: 'calories', numeric: true, label: 'Calories', sortable: false },
    { id: 'fat', numeric: true, label: 'Fat (g)' },
    { id: 'carbs', numeric: true, label: 'Carbs (g)' },
    { id: 'protein', numeric: true, label: 'Protein (g)' },
];

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): Data {
    return { name, calories, fat, carbs, protein, id: name, };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface StoryContainerProps {
    dense: boolean;
    isSelectable: boolean;
    isExpandable: boolean;
}

interface Sorter<Data extends RawData>{
    order: Order
    orderBy: keyof Data
}

function StoryContainer({
    isSelectable,
    dense,
    isExpandable,
}: StoryContainerProps) {
    const classes = useStyles()

    const [order, setOrder] = React.useState<Sorter<Data>>({
        order: 'asc',
        orderBy: 'calories'
    })

    const [page, setPage] = React.useState(0)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)

    const handleRequestSort = (property: keyof Data, sort: Order) => {
        setOrder({
            orderBy: property,
            order: sort,
        })
    }

    const handleSelectAll = () => {}

    const handleSelectRow = (name: string, selected: string[]) => {}

    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }
    
    const handleChangeRowPerPage = (value: number) => {
        setRowsPerPage(value)
    }

    return <div className={classes.container}>
        <EnhancedTable<Data>
            data={stableSort(rows, getComparator(order.order, order.orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            rowsPerPageOptions={[5, 10, 25]}
            fieldDefinition={headCells}
            dense={dense}  
            orderBy={order.orderBy}
            order={order.order}
            isSelectable={isSelectable}
            isExpandable={isExpandable}
            
            onRequestSort={handleRequestSort}
            onSelectAll={handleSelectAll}
            onSelectRow={handleSelectRow}
            onChangePage={handleChangePage}
            onChangeRowPerPage={handleChangeRowPerPage}
            renderExpanded={(x) => <div>{x}</div>}
        />
    </div>
}

export default {
    title: 'Components/Table',
    component: StoryContainer,
}

export const Table = (args: any) => <StoryContainer {...args} />;
export const TableSelectable = (args: any) => <StoryContainer isSelectable={true} {...args} />;
export const TableExpandable = (args: any) => <StoryContainer isExpandable={true} {...args} />;
export const TableSelectableExpandable = (args: any) => <StoryContainer isSelectable={true} isExpandable={true} {...args} />;