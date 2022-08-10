export const Display = ({text}: {text: string}) => {
    return (
        <div className='w-full border bg-slate-900 border-slate-400 rounded-xl py-3 px-6 text-slate-400'>
            <span className={`${text === 'Game Over' && 'text-red-700 text-center'}`}>{text.toUpperCase()}</span>
        </div>
    )
}