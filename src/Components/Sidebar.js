import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sidebar_Action } from '../Actions/SidebarAction.js';
import '../CSS/Sidebar.css';


const mapStateToProps = state => {
    console.log("SIDEBAR STATE");
    console.log(state);
    return {
        sidebar: state.updateSidebar,
        stock: state.searchStock["submitField"]
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onGraph: (stock) => dispatch(sidebar_Action('GRAPH', stock)),
        onInfo: (stock) => dispatch(sidebar_Action('INFO', stock)),
        onIncome: (stock) => dispatch(sidebar_Action('INCOME', stock)),
        onBalance: (stock) => dispatch(sidebar_Action('BALANCE', stock)),
        onCashFlow: (stock) => dispatch(sidebar_Action('CASHFLOW', stock))
    }
}


class Sidebar extends Component {
    render() {
        const { onGraph, onInfo, onIncome, onBalance, onCashFlow, stock } = this.props;
        return (
            <div class="icon-bar">
                <a class="graph" onClick={(() => onGraph(stock))}></a>
                <a class="info" onClick={(() => onInfo(stock))}></a>
                <a class="income" onClick={(() => onIncome(stock))}></a>
                <a class="balance" onClick={(() => onBalance(stock))}></a>
                <a class="cashflow" onClick={(() => onCashFlow(stock))}></a>
            </div>
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);