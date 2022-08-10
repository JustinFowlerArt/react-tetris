interface Props {
    text: string
    value?: number
}

export const Stat = ({text, value}: Props) => {
    return (
        <div className='flex w-full justify-between border bg-slate-900 border-slate-400 rounded-xl py-3 px-6 text-slate-400'>
            <span className={`${text === 'Game Over' && 'text-red-700'}`}>{text}</span>
            <span className=''>{value}</span>
        </div>
    )
}