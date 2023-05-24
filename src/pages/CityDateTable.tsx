import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

type Data = {
  date: string;
  cities: string[];
};

const data: Data[] = [
  {
    date: "2023-05-24",
    cities: ["Tokyo", "New York", "Paris"],
  },
  {
    date: "2023-05-25",
    cities: ["Tokyo", "London"],
  },
  // more data...
];

const CityDateTable: React.FC = () => {
  // Generate a list of all unique cities for the table headers.
  const allCities: string[] = Array.from(
    new Set(data.flatMap((d) => d.cities))
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Date / City</TableCell>
            {allCities.map((city) => (
              <TableCell key={city}>{city}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.date}>
              <TableCell component='th' scope='row'>
                {row.date}
              </TableCell>
              {allCities.map((city) => (
                <TableCell key={city}>
                  {row.cities.includes(city) ? "〇" : ""}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CityDateTable;
