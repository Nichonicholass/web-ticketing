"use client";

import { FormProvider, useForm } from "react-hook-form";
import Input from "../form/Input";
import { CiSearch } from "react-icons/ci";

type SearchInputProps = {
  searchTerm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SearchInput() {
  const methods = useForm();

  return (
    <div className="flex justify-between">
      <FormProvider {...methods}>
        <form className="md:w-[450px] lg:w-[528px] w-full">
          <Input
            id="search"
            placeholder="Cari Kelas"
            autoComplete="off"
            rightIcon={CiSearch}
            className="border-slate-900 bg-transparent"
          />
        </form>
      </FormProvider>
    </div>
  );
}

export default SearchInput;
