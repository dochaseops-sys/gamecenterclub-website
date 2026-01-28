interface Props {
    title: string;
    selected?: boolean;
    onClick?: () => void;
}

const Category = ({ title, selected = false, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 text-sm font-semibold whitespace-nowrap ${!selected ? "bg-border hover:bg-gray text-white" : "bg-secondary text-black"} rounded-3xl border border-[var(--gray-border)] cursor-pointer transition-all duration-500`}
        >
            <p>{title}</p>
        </div>
    )
}

export default Category
