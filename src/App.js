import Search from './Components/Search.js';
import Graph from './Components/Graph.js';
import Sidebar from './Components/Sidebar.js';
import GenInfo from './Components/GenInfo.js';
import Income from './Components/Income.js';
import Balance from './Components/Balance.js';
import Cashflow from './Components/Cashflow';
import './CSS/App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';


const mapStateToProps = state => {
    return {
        sidebar: state.updateSidebar
    }
}



class App extends Component {

   
    componentDidMount() {
        document.body.style.backgroundColor = '#FFFDE4';
     }



    render() {
        return (
            <div>
                <Search />
                <Sidebar />
                {this.renderMain()}
            </div>
           
        );
    }

    renderMain() {
        console.log('RENDER GRAPH');
        console.log(this.props)
        if (this.props.sidebar.graph.status === true) {
            return (
                <Graph />
            )
        } else if (this.props.sidebar.info.status === true) {
            return (
                <GenInfo />)
        } else if (this.props.sidebar.income.status === true) {
            return (
                <Income />)
        } else if (this.props.sidebar.balance.status === true) {
            return (
                <Balance />)
        } else if (this.props.sidebar.cashflow.status === true) {
            return (
                <Cashflow />)
        }
        
    }
}

export default connect(mapStateToProps)(App);


