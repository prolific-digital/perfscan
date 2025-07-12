const AlertView = ({ width }) => {
  return (
    <div
      className="server_wrapper-alert scroll-container"
      style={{ width: width ? width : "" }}
    >
      <div className="server_parent server_parent_alert">
        <p style={{ textAlign: "center" }}>No alert data</p>
      </div>
    </div>
  );
};

export default AlertView;
