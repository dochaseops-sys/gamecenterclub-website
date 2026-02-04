interface Props {
    className?: string
}

const Ad = ({ className }: Props) => {
    return (
        <div className={`p-8 place-items-center mb-7 bg-border rounded-md ${className}`}>
            <p className="text-gray"></p>
        </div>
    )
}

export default Ad
