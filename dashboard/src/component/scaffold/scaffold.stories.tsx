import { Scaffold as ScaffoldComponent } from './Scaffold'

const item = (name: string, badge?: string, icon?: string) => ({
    name,
    badge,
    icon,
})

const expandableItem = (name: string, icon?: string, items: any[] = []) => ({
    name,
    items,
    icon,
})

const section = (sectionTitle: string, items: any[]) => ({
    sectionTitle,
    items,
})

const SampleMenuItems = [
    section('User', [
        item('item 1', '10', 'dashboard'),
        item('item 2', undefined, 'mail'),
        item('item 3', undefined, 'settings'),
        expandableItem('item 12', 'dashboard', [
            item('item 13', '10', 'dashboard'),
            item('item 24', undefined, 'mail'),
            item('item 35', undefined, 'settings'),
        ]),
    ]),
    section('Account', [
        item('item 16', '10', 'dashboard'),
        item('item 27', undefined, 'mail'),
        item('item 38', undefined, 'settings'),
        expandableItem('item 11', 'dashboard', [
            item('item 12', '10', 'dashboard'),
            item('item 23', undefined, 'mail'),
            item('item 34', undefined, 'settings'),
        ]),
    ]),
]


function StoryContainer() {
    return <div>
        <ScaffoldComponent 
            sections={SampleMenuItems}
        />
    </div>
}

export default {
    title: 'Components/Scaffold',
    component: StoryContainer,
}

export const Scaffold = (args: any) => <StoryContainer {...args} />;