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

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";

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

interface DragItem {
  value: string;
  date: string;
  group: string;
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
          headers: "test",
        },
        {
          suwa: "sake",
          okaya: "tokei",
          headers: "test2",
        },
        {
          hakuba: "ski",
          otari: "mingei",
          headers: "test3",
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

  const objectList = {
    hyogo: "kobe",
    oosaka: "umeda",
    tokyo: [
      {
        chiyoda: "kanda",
        tama: "nagayama",
      },
      {
        USA: "texas",
        France: "paris",
      },
    ],
  };

  const [clickedText, setClickedText] = useState("");

  const handleClick = (text: string) => {
    setClickedText(text);
  };

  // 列のヘッダを取得
  const groupHeaders = Array.from(new Set(data.map((item) => item.group)));

  // 行のヘッダを取得
  const dateHeaders = Array.from(new Set(data.map((item) => item.date)));
  const [tableData, setTableData] = useState<TableData>({});

  // 表のデータの作成は useEffect 内で行うべきです
  useEffect(() => {
    const newTableData: TableData = {};

    dateHeaders.forEach((date) => {
      newTableData[date] = {};
      groupHeaders.forEach((group) => {
        const item = data.find((d) => d.date === date && d.group === group);
        if (item) {
          newTableData[date][group] = item.city.map(
            (city) => Object.values(city)[0]
          );
        }
      });
    });
    setTableData(newTableData);
  }, [data, dateHeaders, groupHeaders]);

  const DnDTableCell = ({ children, date, group, setTableData, tableData }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "cell",
      item: { value: children, date, group } as DragItem,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    const [{ isOver }, drop] = useDrop(() => ({
      accept: "cell",
      drop: (item: DragItem) => {
        // 型を追加しました
        const oldData =
          tableData[item.date] && tableData[item.date][item.group]
            ? tableData[item.date][item.group]
            : "";
        const newData =
          tableData[date] && tableData[date][group]
            ? tableData[date][group]
            : "";
        setTableData({
          ...tableData,
          [item.date]: {
            ...(tableData[item.date] || {}),
            [item.group]: newData,
          },
          [date]: { ...(tableData[date] || {}), [group]: oldData },
        });
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }));

    return (
      <TableCell
        key={`${date}-${group}`}
        ref={(node) => drag(drop(node as any))}
        style={{ cursor: "move", opacity: isDragging ? 0.5 : 1 }}
      >
        {children}
      </TableCell>
    );
  };

  const headers = data.flatMap((item) =>
    item.city
      .map((city) => ("headers" in city ? city.headers : undefined))
      .filter((header): header is string => header !== undefined)
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <p>{clickedText}</p>
      <ul>
        {objectList.tokyo.map((item, index) => (
          <li key={index}>
            {Object.entries(item)
              .map(([key, value]) => `${key}: ${value}`)
              .join(", ")}
          </li>
        ))}
      </ul>
      <DateGenerate data={data} />
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
                {groupHeaders.map((group) =>
                  tableData[date] && tableData[date][group]
                    ? tableData[date][group].map((city, index) => (
                        <DnDTableCell
                          key={`${date}-${group}-${index}`}
                          date={date}
                          group={group}
                          setTableData={setTableData}
                          tableData={tableData}
                        >
                          {city}
                        </DnDTableCell>
                      ))
                    : null
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};

export default ObjectToList;
