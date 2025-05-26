
interface props {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    category: string
}

export default function Select({setCategory,category}: props) {
    return (
        <select className="w-full border-[1px] border-black/10 rounded-lg p-2" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="web_development">Programowanie web</option>
            <option value="mobile_development">Aplikacje mobilne</option>
            <option value="ui_ux">Projektowanie UI/UX</option>
            <option value="graphic_design">Grafika</option>
            <option value="copywriting">Copywriting</option>
            <option value="marketing">Marketing</option>
            <option value="consultance">Consultance</option>
            <option value="web3">Web3</option>
        </select>
    )
}