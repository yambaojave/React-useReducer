import React, { useState } from "react";
import { Table } from "react-bootstrap";

export const Domain = ({ company, setSelectedCompany }) => {
  const [sRow, setSRow] = useState(0);

  return (
    <Table bordered hover>
      <thead>
        <tr>
          <th>Domain Code</th>
          <th>Domain Name</th>
        </tr>
      </thead>
      <tbody>
        {company.map((c) => (
          <tr
            key={c.domain_id}
            onClick={() => {
                setSRow(c.domain_id);
                setSelectedCompany(c.domain_id);
            }}
            className={sRow === c.domain_id ? "table-primary" : ""}
          >
            <td>{c.domain_code}</td>
            <td>{c.domain_name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
