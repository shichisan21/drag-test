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
    [group: string]: string[];
  };
}

interface DragItem {
  value: string;
  date: string;
  group: string;
}

interface DnDTableCellProps {
  children: React.ReactNode;
  date: string;
  group: string;
  setTableData: React.Dispatch<React.SetStateAction<TableData>>;
  tableData: TableData;
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

  const groupHeaders = Array.from(new Set(data.map((item) => item.group)));
  const dateHeaders = Array.from(new Set(data.map((item) => item.date)));
  const [tableData, setTableData] = useState<TableData>({});

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

  const DnDTableCell: React.FC<{
    children: React.ReactNode;
    date: string;
    group: string;
    setTableData: React.Dispatch<React.SetStateAction<TableData>>;
    tableData: TableData;
  }> = ({ children, date, group, setTableData, tableData }) => {
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
        const oldData = [...tableData[item.date][item.group]];
        const oldDataIndex = oldData.indexOf(item.value);
        const newData = [...tableData[date][group]];
        const newDataIndex = newData.indexOf(children as string);

        if (oldDataIndex > -1 && newDataIndex > -1) {
          oldData[oldDataIndex] = newData[newDataIndex];
          newData[newDataIndex] = item.value;
        }

        setTableData((prevTableData) => {
          const newTableData: TableData = { ...prevTableData };
          newTableData[item.date][item.group] = oldData;
          newTableData[date][group] = newData;
          return newTableData;
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
                {groupHeaders.map((group, index) =>
                  tableData[date] && tableData[date][group] ? (
                    <DnDTableCell
                      key={`${date}-${group}`}
                      date={date}
                      group={group}
                      setTableData={setTableData}
                      tableData={tableData}
                    >
                      {tableData[date][group].map((city, index) => (
                        <div key={`${date}-${group}-${index}`}>{city}</div>
                      ))}
                    </DnDTableCell>
                  ) : (
                    <TableCell key={index}></TableCell>
                  )
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
