"use client";

import { SearchIcon } from "lucide-react";
import { BackgroundBeams } from "./ui/background-beams";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";

const Search = () => {
  const loader = useTopLoader();
  const { push } = useRouter();
  const [search, setSearch] = useState("");

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (search === "" || search.trim() === "") {
      return;
    }

    if (e.key === "Enter") {
      push(`/search/${search}`);
      loader.start();
    }
  };

  const onButtonSearch = (e: FormEvent) => {
    e.preventDefault();
    if (search === "" || search.trim() === "") {
      return;
    } else {
      push(`/search/${search}`);
      loader.start();
    }
  };

  return (
    <div className="md:h-[20rem] h-[20rem] md:w-3/4 w-5/6 mx-auto md:mt-24 mt-8 rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <h2 className="md:text-3xl text-2xl mb-10 font-semibold bg-gradient-to-r from-blue-950 to-indigo-500 bg-clip-text text-transparent text-center">
        Search Article That You Want To Read Here
      </h2>
      <div className="relative flex items-center w-5/6 md:p-2 p-1 mx-auto border rounded-full">
        <SearchIcon className="text-gray-500 ml-2" />
        <Input
          onKeyDown={onPressEnter}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="z-10 relative shad-input !bg-transparent placeholder:text-sm placeholder:text-muted-foreground"
          placeholder="Search article here.."
        />
        <Button
          onClick={onButtonSearch}
          className="z-10 absolute right-0 rounded-r-full h-[calc(100%-2px)] cursor-pointer text-xs text-background"
        >
          Search
        </Button>
      </div>

      <p className="text-center text-xs mt-4 text-gray-400 ">
        Learn how to increase project profitability and grow your business with
        our guides and tips
      </p>
      <BackgroundBeams />
    </div>
  );
};

export default Search;
