
interface props {
    setTechnologySelected: React.Dispatch<React.SetStateAction<string>>;
    technologySelected: string;
    technology: {id:number; name:string}[] | undefined;
}

export default function SelectTechnology({technologySelected,setTechnologySelected,technology}: props) {
    return (
        <select value={technologySelected} onChange={(e) => setTechnologySelected(e.target.value)} className="w-full border-[1px] border-black/10 rounded-lg p-2">
        {technology?.map(t => (
          <option key={t.id} value={t.name}>{t.name}</option>
        ))}
      </select>
    )
}