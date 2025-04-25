
interface props {
    setCategory: React.Dispatch<React.SetStateAction<string>>;
    category: string
}

export default function Select({setCategory,category}: props) {
    return (
        <select className="w-full border-[1px] border-black/10 rounded-lg p-2" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="WEB_DEVELOPMENT">Programowanie web</option>
            <option value="MOBILE_DEVELOPMENT">Aplikacje mobilne</option>
            <option value="UI_UX">Projektowanie UI/UX</option>
            <option value="GRAPHIC_DESIGN">Grafika</option>
            <option value="COPYWRITING">Copywriting</option>
            <option value="MARKETING">Marketing</option>
            <option value="CONSULTANCE">Consultance</option>
            <option value="WEB3">Web3</option>
        </select>
    )
}