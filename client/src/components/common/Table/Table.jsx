import "./Table.scss";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
const Table = ({ colsHeadr, rows, handleDelete, isAdmin }) => {
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
              {isAdmin && (
                <>
                  <td className="delete_btn_wrap">
                    <DeleteForeverIcon
                      onClick={() =>
                        handleDelete(
                          `${row[0]}`,
                          `${colsHeadr[0].includes("Lb") ? "true" : "false"}`
                        )
                      }
                    />
                  </td>
                  <td className="edit_btn_wrap">
                    <NavLink
                      to={`edit/${row[0]}?${
                        colsHeadr[0].includes("Lb") ? "lb=true" : "lb=false"
                      }`}
                    >
                      <EditIcon />
                    </NavLink>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>{" "}
    </section>
  );
};

export default Table;
