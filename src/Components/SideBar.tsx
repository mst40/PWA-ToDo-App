type Props = {
    onSort: (filter: Filter) => void
}

export const SideBar = (props: Props) => (
    <select
        defaultValue={'all'}
        onChange={e => props.onSort(e.target.value as Filter)}
    >
        <option value="all">All</option>
        <option value="checked">Done</option>
        <option value="current">Current</option>
        <option value="removed">Trash Can</option>
    </select>
)