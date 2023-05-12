import { FC, ReactElement, useState, useEffect } from "react";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DateGenerate } from "@/components/DateGenerate";

interface ObjectToList {
  date: string;
  group: string;
  city: { [key: string]: string }[];
}

interface TableData {
  [date: string]: {
    [group: string]: string;
  };
}

const ObjectToList: React.FC = () => {
  const data = [
    {
      date: "2022/02/01",
      group: "nagano",
      city: [
        {
          matsumoto: "soba",
          asahi: "yasai",
          shiojiri: "wine",
        },
        {
          suwa: "sake",
          okaya: "tokei",
        },
        {
          hakuba: "ski",
          otari: "mingei",
        },
      ],
    },
    {
      date: "2022/02/11",
      group: "toyama",
      city: [
        {
          toyama01: "soba",
          asahi: "yasai",
          shiojiri: "wine",
        },
        {
          toyama04: "sake",
          okaya: "tokei",
        },
        {
          toyama03: "ski",
          otari: "mingei",
        },
      ],
    },
    {
      date: "2022/02/13",
      group: "hyogo",
      city: [
        {
          hyogo01: "soba",
          asahi: "yasai",
          shiojiri: "wine",
        },
        {
          hyogo04: "sake",
          okaya: "tokei",
        },
        {
          hyogo03: "ski",
          otari: "mingei",
        },
      ],
    },
    {
      date: "2022/02/01",
      group: "gunma",
      city: [
        {
          hyogo01: "takasaki",
          asahi: "yasai",
          shiojiri: "wine",
        },
        {
          hyogo04: "gunma02",
          okaya: "tokei",
        },
        {
          hyogo03: "gunma04",
          otari: "mingei",
        },
      ],
    },
  ];
  // 列のヘッダを取得
  const groupHeaders = Array.from(new Set(data.map((item) => item.group)));

  // 行のヘッダを取得
  const dateHeaders = Array.from(new Set(data.map((item) => item.date)));

  // 行と列のヘッダを含めた表のデータを作成
  const tableData: TableData = {};
  dateHeaders.forEach((date) => {
    tableData[date] = {};
    groupHeaders.forEach((group) => {
      const item = data.find((d) => d.date === date && d.group === group);
      if (item) {
        tableData[date][group] = item.city
          .map((city) => Object.values(city)[0])
          .join(", ");
      }
    });
  });

  return (
    <>
      <DateGenerate groupHeaders={groupHeaders} />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              {groupHeaders.map((group) => (
                <TableCell key={group}>{group}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {dateHeaders.map((date) => (
              <TableRow key={date}>
                <TableCell>{date}</TableCell>
                {groupHeaders.map((group) => (
                  <TableCell key={`${date}-${group}`}>
                    {tableData[date][group]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ObjectToList;
