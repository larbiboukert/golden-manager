import React from "react";
import { InputGroupAddon, InputGroupText, Input, InputGroup } from "reactstrap";

const SearchBar = ({ data, setFilteredList }) => {
  return (
    <>
      <InputGroup className="input-group-alternative w-50">
        <InputGroupAddon addonType="prepend">
          <InputGroupText>
            <i className="fas fa-search" />
          </InputGroupText>
        </InputGroupAddon>
        <Input
          placeholder="Search"
          type="text"
          onChange={(e) =>
            setFilteredList(
              data.filter((item) =>
                Object.values(item).some(
                  (v) =>
                    v &&
                    typeof v !== "number" &&
                    v.includes(e.target.value.toUpperCase())
                )
              )
            )
          }
        />
      </InputGroup>
    </>
  );
};

export default SearchBar;
