import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { BiHelpCircle } from "react-icons/bi";
import { useState } from "react";
import { Dialog } from "primereact/dialog";

import Help from "./Help";

function SectionHeader(props) {
  const {
    title,
    btnClickHandler,
    subTitle,
    breadCrumbsList,
    sDate,
    eDate,
    name,
    help = false,
    type,
    serialNo,
  } = props;

  const [visible, setVisible] = useState(false);

  const showHelp = (e) => {
    setVisible(e);
  };
  return (
    <>
      <div className="header">
        <div className="header_body">
          <div className="col">
            {subTitle && (
              <div
                className="subtitle_report"
                //dangerouslySetInnerHTML={{ __html: subTitle }}
              >
                {subTitle}
              </div>
            )}
            {breadCrumbsList && breadCrumbsList.length && (
              <ul className="custom-breadcrumbs">
                <li>
                  {breadCrumbsList.map((list, index) => {
                    return (
                      <Fragment key={list.id}>
                        {list.url ? (
                          <>
                            <Link to={list.url}>{list.name} </Link>
                          </>
                        ) : (
                          <span>{list.name}</span>
                        )}

                        {breadCrumbsList.length - 1 !== index ? (
                          <span className="slash">/</span>
                        ) : null}
                      </Fragment>
                    );
                  })}
                  {serialNo && <span className="slash">/ {serialNo}</span>}
                </li>
              </ul>
            )}

            {title && (
              <div
                className="title_report"
                //dangerouslySetInnerHTML={{ __html: title }}
              >
                {title}
              </div>
            )}
            {help && (
              <div className="help">
                <BiHelpCircle
                  size="2em"
                  onClick={() => showHelp(true)}
                  style={{ cursor: "hand" }}
                />
              </div>
            )}
            {name && <div className="subtitle_report">{name}</div>}

            {sDate && (
              <div
                className="subtitle_report"
                //dangerouslySetInnerHTML={{ __html: sDate + '-' + eDate }}
              >
                {sDate + "-" + eDate}
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        header="Help!"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <Help type={type} />
      </Dialog>
    </>
  );
}

export default React.memo(SectionHeader);
