import type React from "react";

export interface RawData{
    id: string
}

// order type
export type Order = 'asc' | 'desc';

// header cell definition
export interface FieldDefinition<Data extends RawData> {
    id: keyof Data
    label: string
    numeric: boolean
    
    sortable?: boolean
}

// table props
export interface TableProps<Data extends RawData> {
    data: Data[]
    count: number
    rowsPerPage: number
    page: number
    rowsPerPageOptions: number[]
    fieldDefinition: FieldDefinition<Data>[]
    orderBy: keyof Data
    order: Order

    isExpandable?: boolean
    isSelectable?: boolean
    dense?: boolean
    title?: string
    activeActions?: React.ReactNode[]
    actions?: React.ReactNode[]

    onRequestSort: (property: keyof Data, sort: Order) => void
    onSelectAll: () => void
    onSelectRow: (id: string, selected: string[]) => void
    onChangePage: (newPage: number) => void
    onChangeRowPerPage: (value: number) => void
    renderExpanded?: (id: string) => React.ReactNode
}

// toolbar
export interface TableToolbarProps {
    numSelected: number;

    title?: string;
    actions?: React.ReactNode[];
    activeActions?: React.ReactNode[];
}

// table head
export interface TableHeadProps<Data extends RawData> {
    numSelected: number;
    fieldDefinition: FieldDefinition<Data>[]
    order: Order;
    orderBy: keyof Data;
    rowCount: number;

    isSelectable?: boolean
    isExpandable?: boolean

    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
}