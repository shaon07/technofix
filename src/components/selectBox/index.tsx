import { styles } from "../../styles/tailwind/selectBox/index.css"

type SelectBoxProps = {
    onSort?: (value: string) => void
}

export default function SelectBox({ onSort = () => { } }: SelectBoxProps) {
    return (
        <div className='py-2'>
            <select onChange={(e) => onSort(e.target.value)} id="countries" className={`${styles.wrapper}`}>
                <option selected>Clear</option>
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="company">Company</option>
            </select>
        </div>
    )
}
