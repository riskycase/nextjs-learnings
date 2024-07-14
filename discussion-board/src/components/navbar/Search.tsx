"use client";

import { paths } from "@/util/pathHelpers";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdSearch } from "react-icons/md";

export default function Search() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  return (
    <Box marginX={2}>
      <form
        action={(data) =>
          redirect(paths.searchPath(data.get("search")!!.toString()))
        }
      >
        <InputGroup>
          <Input
            name="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputRightElement>
            <IconButton
              icon={<MdSearch />}
              aria-label={"Search button"}
              variant="text"
              type="submit"
            />
          </InputRightElement>
        </InputGroup>
      </form>
    </Box>
  );
}
