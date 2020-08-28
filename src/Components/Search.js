import React from 'react';
import '../CSS/Search.css'
import { setSearchField } from '../Actions/SearchAction.js';
import { search } from '../Actions/SearchAction.js';
import { connect } from 'react-redux';



// redux syntax that is used to access props from the store object
const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

// redux syntax that is used trigger action
const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
        onSubmit: () => dispatch(search(document.getElementById('searchText').value))
    }
}


/*
* This class uses the List of Product container and the Search component to create a dynamic search
 *  <button class="SearchButton" onClick={onSubmit}>Search</button>
*/
class Search extends React.Component {
    render() {
        const { onSubmit, onSearchChange } = this.props;
        return (
            <div class="SearchCompInput">
                <input id='searchText' class="SearchBar" type="text" onChange={onSearchChange} autoFocus />
                <button class="SearchButton" onClick={onSubmit}>Search</button>
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Search);