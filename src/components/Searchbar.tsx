"use client"
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { AiOutlineSearch } from "react-icons/ai";

const Searchbar = () => {
  const router = useRouter()

  const [search, setSearch] = useState("")

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    router.push(`/search?q=${e.target.value}`);
  }

  return (
    <div className="relative overflow-hidden rounded-xl w-full h-fit">
      <Input type="text" className="no-focus outline-none border-none p-8 ps-14 rounded-xl bg-dark-3 font-medium text-light-2 placeholder:text-light-3 tracking-wider" placeholder="Search" value={search} onChange={e => searchOnChange(e)} />
      <div className="absolute left-0 top-0 rounded-full">
        <button type="button" className="text-light-2 text-2xl p-5">
          <AiOutlineSearch />
        </button>
      </div>
    </div>
  )
}

export default Searchbar