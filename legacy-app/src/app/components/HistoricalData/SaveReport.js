export const SaveReport = () => {
    return (
        <div>
            <div
                className="form-group checkbox-wrapper"
                style={{
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    whiteSpace: "nowrap",
                }}
            >
                <input
                    className="checkbox-item"
                    type="checkbox"
                    id="now"
                    name="timerange"
                    checked={isSaveReport}
                    onChange={saveReportCheckHandler}
                />
                <label className="label" htmlFor="now">
                    Do you want to save this report?
                </label>
                {isSaveReport && (
                    <div className="show-field">
                        <input
                            className="form-control"
                            placeholder="Enter Report name"
                        />
                    </div>
                )}
            </div>
            <button
                className="btn btn-primary"
                onClick={runReportClickHandler}
            >
                {loadingReport && <i className="pi pi-spin pi-spinner"></i>}
                Run Report
            </button>
        </div>
    )
}

export default SaveReport;