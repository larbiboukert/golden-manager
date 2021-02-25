import React, { useEffect, useState } from "react";
import {
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Button,
} from "reactstrap";

const SearchBar = ({ data, setFilteredList, dateFilter }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  useEffect(() => {
    if (dateFilter && data) {
      let filteredData = data;
      if (startDate !== "")
        filteredData = filteredData.filter(
          (item) => new Date(item.date) >= new Date(startDate)
        );
      if (endDate !== "")
        filteredData = filteredData.filter(
          (item) => new Date(item.date) <= new Date(endDate)
        );
      setFilteredList(filteredData);
    }
  }, [data, startDate, endDate]);

  return (
    <>
      {!dateFilter ? (
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
      ) : (
        <div className="d-flex align-items-end">
          <Button
            style={{ padding: "0.75rem" }}
            onClick={() => {
              setStartDate("");
              setEndDate("");
            }}
          >
            <i className="fas fa-retweet" />
          </Button>
          <div className="pr-4">
            <label className="form-control-label pr-2 uppercase">
              {"date debut:"}
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            ></Input>
          </div>
          <div className="pr-4">
            <label className="form-control-label pr-2 uppercase">
              {"date fin:"}
            </label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            ></Input>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
