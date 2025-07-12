import MetricsCardSysTest from "../../components/MetricCardSysTest";

const EnterPriseServerViewBadge = ({
  toggleGroups,
  index,
  dataItem,
  groupByType,
  renderAllbadge,
  renderbadge,
  activeGroup,
  handleNavigation,
  activeStatus,
  activeGroupType,
  badgeType,
}) => {
  const toggleType = (status, activeGrpType, idx, type) => {
    if (groupByType === "type") {
      if (status) return "";
      else return "d-none";
    } else {
      if (activeGrpType === idx) return "";
      else return "d-none";
    }
  };
  return (
    <>
      <div
        className={`group_title ${dataItem.key.toLowerCase()}`}
        onClick={() => toggleGroups(index)}
      >
        <div className="left-sec">
          {groupByType === "type" && renderbadge(dataItem)}
          <i
            className={
              "fa " +
              (activeGroupType === index || activeStatus ? "fa-angle-down" : "fa-angle-right")
            }
          ></i>
          {dataItem.key}
          {groupByType !== "type" && renderAllbadge(dataItem, index)}
        </div>
      </div>
      <div
        className={
          "metrics_card_wrapper " +
          toggleType(activeStatus, activeGroupType, index, groupByType)
        }
      >
        {dataItem &&
          dataItem?.dataSet?.length > 0 &&
          dataItem?.dataSet
            .filter((item) => {
              if (badgeType) {
                return item.type === badgeType;
              } else {
                return item;
              }
            })
            .map((item, index) => (
              <MetricsCardSysTest
                key={index}
                keyID={item.serial_number}
                cardClickHandler={() => {
                  // saveParametersIntoLocalStorage("selectedSysData", item)
                  handleNavigation(
                    item.id,
                    item.path,
                    // item?.systemType,
                    item?.system_type,
                    item?.serial_number,
                    item?.entity_name,
                    item?.entity_description,
                    item
                  );
                }}
                {...item}
                serverName={item?.entity_description}
              />
            ))}
        {!dataItem?.dataSet?.length && (
          <p style={{ textAlign: "center", marginLeft: "1rem" }}>No systems</p>
        )}
      </div>
    </>
  );
};

export default EnterPriseServerViewBadge;
