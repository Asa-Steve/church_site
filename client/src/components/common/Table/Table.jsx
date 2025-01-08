import "./Table.scss";

const Table = ({ colsHeadr, rows }) => {
  return (
    <section className="table">
      <table border="1">
        <thead>
          <tr>
            {colsHeadr.map((headr, headerIdx) => (
              <th key={headerIdx}>{headr}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>{" "}
    </section>
  );
};

export default Table;
