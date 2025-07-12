import { useNavigate } from "react-router-dom";
import "../../stylesheets/printHeader.scss";
import moment from "moment";

const PrintPageHeader = ({
  pageTitle,
  sDate,
  eDate,
  mainmenu,
  printPdf,
  pdfUrl,
  query,
}) => {
  const generateNewReport = (url, pdfQuery) => {
    const searchParams = new URLSearchParams(pdfQuery);
    return(url + searchParams.toString());
  };
  const navigate = useNavigate();
  const startDate = moment(sDate).utc().format("MM-DD-YYYY, HH:mm:ss");
  const endDate = moment(eDate).utc().format("MM-DD-YYYY, HH:mm:ss");
  return (
    <div className="pagewrapper">
      <main className="logo-section">
        <img
          src={require("../../assets/perfscan_logo.png").default}
          alt=""
          width="225"
          border="0"
        />
      </main>

      <aside className="title-section">
        <h1>PerfScan Performance Reporting</h1>
        <span>Report Created: {new Date().toLocaleString() + ""}</span>
      </aside>

      <aside className="date-section">
        <h3>{pageTitle}</h3>
        <h3>
          <span style={{ paddingLeft: "11px" }}>{startDate} - </span> <br />{" "}
          {endDate}
        </h3>
        {!printPdf && (
        <button
          type="btn"
          className="btn btn-primary"
          onClick={() => window.print()}
        >
          Print
        </button>
        )}
        {printPdf && (
          <a
            href={generateNewReport(pdfUrl, query)}
            target="_blank"
            rel="noreferrer"
          >
            <button type="btn" className="btn btn-primary">
              <i className="fa fa-print"></i> Print
            </button>
          </a>
        )}
        {mainmenu && (
          <button
            type="btn"
            className="btn btn-primary"
            style={{ marginLeft: "1rem" }}
            onClick={() => {
              navigate(-1);
            }}
          >
            Main Menu
          </button>
        )}
      </aside>

      <div className="clearfix"></div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default PrintPageHeader;
