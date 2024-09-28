import React, { memo, ReactElement, ReactNode } from "react";

interface ITableComponents extends React.FC<ITable> {
  Header: React.FC<{ children: ReactNode }>;
  HeaderValue: React.FC<{ value: string; customClass?: string }>;
  Body: React.FC<{ children: ReactNode }>;
  BodyValue: React.FC<{
    value?: string | number;
    actions?: ReactElement;
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
    <thead className="w-full bg-black text-bme-600">
      <tr className="w-full">{children}</tr>
    </thead>
  );
};

const TableHeaderValue: React.FC<{ value: string; customClass?: string }> = ({
  value,
  customClass,
}) => {
  if (value === "Actions") {
    return (
      <th className="w-1/6 border-l-2 border-gray-300/15 px-4 py-4 text-right text-xl">
        {value}
      </th>
    );
  }
  if (value === "Piece") {
    return (
      <th className="w-1/6 border-r-2 border-gray-300/15 px-4 py-4 text-left text-xl">
        {value}
      </th>
    );
  }

  if (customClass) {
    return <th className={customClass}>{value}</th>;
  }

  return (
    <th className="w-1/6 border-r-2 border-gray-300/15 py-2 text-center text-xl">
      {value}
    </th>
  );
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
  actions?: ReactElement;
  customClass?: string;
}> = ({ value, actions, customClass }) => {
  if (actions) {
    return (
      <td className="px-4 py-2 text-center text-lg font-semibold tracking-wider first:text-left last:text-right">
        {actions}
      </td>
    );
  }

  if (customClass) {
    return (
      <td className={customClass}>
        <span> {value}</span>
      </td>
    );
  }

  return (
    <td className="border-r-2 border-gray-300 px-4 py-2 text-center text-lg font-semibold tracking-wider first:text-left last:text-right">
      <span> {value}</span>
    </td>
  );
};

const TableBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody className="">{children}</tbody>;
};

const Table: ITableComponents = ({ children }: ITable) => {
  return <table className="w-full overflow-hidden">{children}</table>;
};

const TableActions: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};

export default Table;

Table.Header = TableHeader;
Table.HeaderValue = memo(TableHeaderValue);
Table.Body = TableBody;
Table.BodyValue = TableBodyValue;
Table.BodyRow = TableBodyRow;
Table.Actions = TableActions;
