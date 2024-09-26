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
  BodyRow: React.FC<{ children: ReactNode; pieceID: string }>;
  Actions: React.FC<{ children: ReactNode }>;
}

interface ITable {
  children: ReactNode;
}

const TableHeaderValue: React.FC<{ value: string; customClass?: string }> = ({
  value,
  customClass,
}) => {
  if (value === "Actions") {
    return (
      <th className="w-1/6 border-2 border-[#282B30] py-2 text-right text-xl text-black">
        {value}
      </th>
    );
  }
  if (value === "Piece") {
    return (
      <th className="w-1/6 border-2 border-[#282B30] py-2 text-left text-xl text-black">
        {value}
      </th>
    );
  }

  if (customClass) {
    return <th className={customClass}>{value}</th>;
  }

  return (
    <th className="w-1/6 border-2 border-[#282B30] py-2 text-center text-xl text-black">
      {value}
    </th>
  );
};

const TableBodyRow: React.FC<{ children: ReactNode; pieceID: string }> = ({
  children,
  pieceID,
}) => {
  return <tr className="h-fit border-2 border-black">{children}</tr>;
};

const TableBodyValue: React.FC<{
  value?: string | number;
  actions?: ReactElement;
  customClass?: string;
}> = ({ value, actions, customClass }) => {
  if (actions) {
    return (
      <td className="border-b-2 border-black py-2 text-center text-lg font-semibold tracking-wider first:text-left last:text-right">
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
    <td className="border-b-2 border-black py-2 text-center text-lg font-semibold tracking-wider first:text-left last:text-right">
      <span> {value}</span>
    </td>
  );
};

const TableHeader: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <thead className="w-full">
      <tr>{children}</tr>
    </thead>
  );
};

const TableBody: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <tbody className="">{children}</tbody>;
};

const Table: ITableComponents = ({ children }: ITable) => {
  return <table className="h-fit w-full">{children}</table>;
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
