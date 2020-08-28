import React from 'react';
import '../CSS/GenInfo.css'
import { connect } from 'react-redux';



// redux syntax that is used to access props from the store object
const mapStateToProps = state => {
    return {
        geninfo: state.updateSidebar.info.data
    }
}


class GenInfo extends React.Component {

    renderTableHeader() {
        var items = this.props.geninfo[0];
        const title = Object.keys(items).map((key) =>
            <p key={key}>
                <span class="item">{key}: </span>
                <span class="desc">{items[key]}</span>
            </p>            
        );
        return (
            title
        );
    }

    renderTableData() {
        var items = this.props.geninfo[1];
        const listItems = Object.keys(items).map((key) =>

            <li class="li" key={key}>
                <span class="item">{key}: </span>
                <span class="value">{items[key]}</span>
            </li>

              
        );
        return (
            listItems
        );
    }

    render() {
        return (
            <div class='GenInfoComp'>
                {this.renderTableHeader()}
                <ul class="ul" >
                    {this.renderTableData()}
                </ul>
            </div>
        );
    }
}


export default connect(mapStateToProps)(GenInfo);