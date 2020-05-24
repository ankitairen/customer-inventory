import React from 'react'

const styles = {
    containerStyles: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "1%"
    },
    tableStyle: {
        fontFamily: "arial, sans-serif",
        borderCollapse: "collapse",
        position: "relative",
        width: "75%"
    },
    captionStyle: {
        fontSize: "16px",
        fontWeight: "600"
    }
};

export const Table = ({ tableData, tableHeadings, tableCaption, primaryKey, clickHandler, containerStyle, tableStyle }) => {
    const containerStyles = Object.assign({}, styles.containerStyles, containerStyle);
    const tableStyles = Object.assign({}, styles.tableStyle, tableStyle);

    const displayTableHeading = tableData => {
        return (
            <tr className="sticky">
                {Object.keys(tableHeadings).map(heading => (
                    <th key={heading}>{tableHeadings[heading]}</th>
                ))}
            </tr>
        );
    };

    const processTableDataItem = (tableDataItem, tableHeadingItem) => {
        const dataItem = tableDataItem[tableHeadingItem]
        if(dataItem.toString()) {
            if(Array.isArray(dataItem)) {
                let dataArrItem = [];
                dataArrItem.push(
                    <ul key={tableHeadingItem}>
                        {dataItem.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )
                return dataArrItem;
            }
            return dataItem
        } else {
            return 'N/A';
        }
    }

    const displayTableData = tableData => {
        let mappedTableData = [];
        for (let tableDataItem of tableData) {
            mappedTableData.push(
                <tr key={tableDataItem[primaryKey]} data-id={tableDataItem[primaryKey]}>
                    {Object.keys(tableHeadings).map(tableHeadingItem => (
                        <td key={tableHeadingItem}>
                            {processTableDataItem(tableDataItem, tableHeadingItem)}
                        </td>
                    ))}
                </tr>
            );
        }
        return mappedTableData;
    };

    return (
        <div style={containerStyles}>
            <table
                style={tableStyles}
                onClick={e => {
                    e.stopPropagation();
                    if (clickHandler && e.target.tagName !== "TH") {
                        // event delegation handling for row items
                        let Id = e.target.parentNode.dataset.id;
                        clickHandler(Id);
                    }
                }}
            >
                <caption style={styles.captionStyle}>{tableCaption}</caption>
                <thead>{displayTableHeading(tableData)}</thead>
                <tbody>{displayTableData(tableData)}</tbody>
            </table>
        </div>
    )
}
