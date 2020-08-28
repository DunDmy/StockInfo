import React from 'react';
import '../CSS/Tables.css'
import { connect } from 'react-redux';



// redux syntax that is used to access props from the store object
const mapStateToProps = state => {
    return {
        geninfo: state.updateSidebar.cashflow.data
    }
}

//TODO: NEED TO IMPLEMENT REDUCER TO UPDATE THE STATE OF THIS PAGE
class Income extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: this.renderTableData("2019", "Annual Report") }
        this.loadYears = this.loadYears.bind(this);
        this.loadQrt = this.loadQrt.bind(this);
    }

    getYears() {
        var years = [];
        var i;
        var items = this.props.geninfo;
        for (i = items["Annual Report"].length - 1; i >= 0; i--) {
            years.push(items["Annual Report"][i]["Fiscal Date Ending"].substring(0, 4))
        }
        return years;
    }

    getQuarterly() {
        var quarts = [];
        var i;
        var items = this.props.geninfo;
        for (i = items["Quarterly Report"].length - 1; i >= 0; i--) {
            quarts.push(items["Quarterly Report"][i]["Fiscal Date Ending"].substring(0, 7))
        }
        return quarts;
    }

    loadYears(date) {
        this.setState({
            data: this.renderTableData(date, "Annual Report")
        })
    }

    loadQrt(date) {
        this.setState({
            data: this.renderTableData(date, "Quarterly Report")
        })
    }

    tableData(items, period, date) {
        const period_len = items[period].length;
        for (var i = 0; i < period_len; i++) {
            if (items[period][i]["Fiscal Date Ending"].includes(date)) {
                const listItems = Object.keys(items[period][i]).map((key) =>
                    <tr key={key}>
                        <td class="desc_table">{key}</td>
                        <td class="desc_table">{items[period][i][key]}</td>
                    </tr>
                );
                return (
                    listItems
                );
            }
        }

    }

    renderTableData(date, period) {
        var items = this.props.geninfo;
        if (period === "Annual Report") {
            return this.tableData(items, period, date);
        } else {
            return this.tableData(items, period, date);
        }
    }


    render() {
        const years = this.getYears();
        const qtrs = this.getQuarterly();
        return (
            <div class='GenInfoComp'>
                <h1>CASH FLOW</h1>
                <div class='years'>
                    <div class='an'>
                        <p>Annual:</p>
                    </div>
                    <div class='an_years'>
                        <ul >
                            {years.map((value, index) => {
                                return <li key={index} class='li_year'><a id={value} key={index} value={value} onClick={(() => this.loadYears(value))}>{value}</a></li>
                            })}
                        </ul>
                    </div>
                </div>
                <div class='years'>
                    <div class='an'>
                        <p>Quarters:</p>
                    </div>
                    <div class='an_years'>
                        <ul >
                            {qtrs.map((value, index) => {
                                return <li key={index} class='li_qrt'><a id={value} key={index} value={value} onClick={(() => this.loadYears(value))}>{value}</a></li>
                            })}
                        </ul>
                    </div>
                </div>
                <div >
                    <table >
                        <thead>
                            <tr>
                            
                            </tr>
                        </thead>
                    </table>
                </div>
                <div>
                    <table class='table'>
                        <tbody>
                            {this.state.data}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(Income);
