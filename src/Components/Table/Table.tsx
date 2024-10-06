import React, { memo, ReactElement, ReactNode } from "react";

interface ITableComponents extends React.FC<ITable> {
  Header: React.FC<{ children: ReactNode }>;
  HeaderValue: React.FC<{
    value?: string;
    customClass?: string;
    element?: ReactElement;
  }>;
  Body: React.FC<{ children: ReactNode }>;
  BodyValue: React.FC<{
    value?: string | number;
    element?: ReactElement;
    customClass?: string;
  }>;
  BodyRow: React.FC<{ children: ReactNode; rowID: number }>;
  Actions: React.FC<{ children: ReactNode }>;
}

interface ITable {
  children: ReactNode;
}

const TableHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <thead className="w-full bg-bme-bg font-thin text-white">
      <tr className="w-full">{children}</tr>
    </thead>
  );
};

const TableHeaderValue: React.FC<{
  value?: string;
  customClass?: string;
  element?: ReactElement;
}> = ({ value, customClass, element }) => {
  /* if (value === "Actions") {
    return (
      <th className="text-md w-1/6 border-l-2 border-gray-300/15 px-4 py-4 text-right font-semibold">
        {value}
      </th>
    );
  } */

  let className =
    "text-md w-1/6 border-r-2 border-gray-300/15  px-4 py-4 text-center font-semibold ";

  if (customClass) {
    className = customClass;
  }

  if (element) {
    return <th className={className}>{element}</th>;
  }

  return <th className={className}>{value}</th>;
};

const TableBodyRow: React.FC<{
  children: ReactNode;
  rowID: number;
}> = ({ children, rowID }) => {
  return (
    <tr className={`h-fit ${rowID % 2 === 0 ? "bg-gray-200" : "bg-white"}`}>
      {children}
    </tr>
  );
};

const TableBodyValue: React.FC<{
  value?: string | number;
  element?: ReactElement;
  customClass?: string;
}> = ({ value, element, customClass }) => {
  let className =
    "border-r-2 border-gray-300 px-4 py-2 text-center text-lg font-normal tracking-wider text-bme-800 first:text-left last:text-right";

  if (customClass) {
    className = customClass;
  }

  if (element) {
    return <td className={className}>{element}</td>;
  }

  return (
    <td className={className}>
      <span> {value}</span>
    </td>
  );
};

const TableBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody className="max-h-[20rem]">{children}</tbody>;
};

const Table: ITableComponents = ({ children }: ITable) => {
  return (
    <table className="max-h-[40rem] w-full overflow-hidden">{children}</table>
  );
};

const TableActions: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default Table;

Table.Header = memo(TableHeader);
Table.HeaderValue = memo(TableHeaderValue);
Table.Body = memo(TableBody);
Table.BodyValue = memo(TableBodyValue);
Table.BodyRow = memo(TableBodyRow);
Table.Actions = memo(TableActions);
