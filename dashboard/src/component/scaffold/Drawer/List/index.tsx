import { List as MUIList, Collapse, ListItem, ListItemIcon, ListItemText, Divider, Typography, Icon, ListSubheader } from '@material-ui/core'
import React from 'react'

export interface DrawerMenuListSection {
    sectionTitle: string;
    items: (DrawerMenuListItem | DrawerMenuListItemLink)[];
}

interface DrawerMenuListItem {
    name: string;
    items: DrawerMenuListItemLink[];
    icon?: string;
}

interface DrawerMenuListItemLink {
    name: string;
    badge?: React.ReactNode | string;
    icon?: string;
}

export interface DrawerMenuProps {
    sections: DrawerMenuListSection[]
    selected: string | null;
    onClick: (string: string) => void
}

interface CollapseableListItemProp extends DrawerMenuListItem {
    isOpen: boolean;
    selected: string | null;
    onClick: (string: string) => void
    onToggle: (string: string) => void
}

interface DrawerListItemProps extends DrawerMenuListItemLink {
    onClick: (string: string) => void
    selected: boolean
}

function DrawerListItem({ icon, name, badge = null, onClick , selected}: DrawerListItemProps) {
    return (<ListItem button onClick={() => onClick(name)} selected={selected} >
        {icon && (<ListItemIcon>
            <Icon>{icon}</Icon>
        </ListItemIcon>)}
        <ListItemText>
            {name}
        </ListItemText>
        {badge && <Typography variant="caption">{badge}</Typography>}
    </ListItem>)
}

function CollapseableListItem({ items, icon, name, isOpen = false, onClick, onToggle, selected }: CollapseableListItemProp) {
    return (<>
        <ListItem button onClick={() => onToggle(name)} selected={isOpen}>
            {icon && (<ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>)}
            <ListItemText>
                {name}
            </ListItemText>
            {isOpen ? <Icon>expand_less</Icon> :
                <Icon>expand_more</Icon>}
        </ListItem>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <MUIList style={{
                paddingLeft: 10
            }}>
                {items.map((y) => <DrawerListItem key={y.name} selected={selected === y.name} icon={y.icon} name={y.name} badge={y.badge} onClick={onClick} />)}
            </MUIList>
        </Collapse>
    </>);
}

export function List({ sections, onClick, selected }: DrawerMenuProps) {
    const [openList, setOpen] = React.useState("")

    const onToggleCollapse = (name: string) => {
        if (openList !== name) setOpen(name)
        else setOpen("")
    }

    const onClickListItem = (name: string) => onClick(name)

    return <MUIList>
        {sections.map((x, i) => (<div key={i}>
            <ListSubheader disableSticky={true}>
                {x.sectionTitle}
            </ListSubheader>
            {x.items.map((y, j) => y.hasOwnProperty("items") ?
                (<CollapseableListItem key={y.name} selected={selected} onClick={onClickListItem} onToggle={onToggleCollapse} icon={y.icon} name={y.name} items={(y as DrawerMenuListItem).items} isOpen={openList === y.name} />):
                (<DrawerListItem key={y.name} onClick={onClickListItem} selected={selected === y.name} icon={y.icon} name={y.name} badge={(y as DrawerMenuListItemLink).badge || undefined} />)
            )}
            <Divider />
        </div>))}
    </MUIList>
}