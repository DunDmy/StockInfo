import React from 'react';
//import action for search
import { connect } from 'react-redux';
import { initial_load } from '../Actions/SearchAction.js';
import '../CSS/Graph.css'
import Plotly from "plotly.js"
import createPlotlyComponent from 'react-plotly.js/factory';
const Plot = createPlotlyComponent(Plotly);

//const API = '5T2N7TJPD9U1D26M'

// redux syntax that is used to access props from the store object
const mapStateToProps = state => {
    return {
        data: state.searchStock.data,
        layout: state.searchStock.layout,
        graphload: state.updateSidebar.graph.data
    }
}

// redux syntax that is used trigger action
const mapDispatchToProps = (dispatch) => {
    return {
        loadInitGraph: () => dispatch(initial_load())
    }
}

/*
* This class uses the List of Product container and the Search component to create a dynamic search
*/
class Graph extends React.Component {

    componentDidMount() {
        const { loadInitGraph } = this.props;
        loadInitGraph();
    }

    render() {
        var data_load = [];
        if (this.props.data[0]["close"].length !== 0) {
            data_load.push(this.props.data);
        } else {
            data_load.push(this.props.graphload);
        }
        return (
            <div className="Graph">
                <div class="GraphComp">
                    <Plot
                        data={data_load[0]}
                        layout={this.props.layout}
                    />
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);