import EnterPriseServerViewBadge from "./EnterPriseServerViewBadge";

const EnterPriseServerViewAllBadges = ({
  data2,
  toggleGroups,
  index,
  dataItem,
  groupByType,
  renderAllbadge,
  renderbadge,
  activeGroup,
  handleNavigation,
  activeStatus,
}) => {
  return (
    <div className="server_wrapper-alert">
      {data2?.map((dataItem, index) => (
        <div className="server_parent" key={index}>
          <EnterPriseServerViewBadge
            toggleGroups={toggleGroups}
            index={index}
            dataItem={dataItem}
            groupByType={groupByType}
            renderAllbadge={renderAllbadge}
            renderbadge={renderbadge}
            activeGroup={activeGroup}
            handleNavigation={handleNavigation}
            activeStatus={activeGroup[dataItem.key]}
          />
        </div>
      ))}
    </div>
  );
};

export default EnterPriseServerViewAllBadges;
