import React, {Component} from 'react'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar'
import Button from '@material-ui/core/Button'
import EventCard from '../LandingPage/EventCard/EventCard';
import './SearchList.css';

class SearchList extends Component{

handleClick = () =>{
    this.props.history.push('/home')
}
    render(){

        return(
            <div>
                <Button className="back-button" onClick={this.handleClick} >Back</Button>
                <SearchBar />
                <div className="event-container">
                    <h3 className="query-display">Search results for: {this.props.match.params.id}</h3>
                    {this.props.reduxStore.searchList.map(event =>{
                        return <EventCard key={event.id} event={event} />
                    })}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (reduxStore) =>{
    return {
        reduxStore
    }
}

export default connect(mapStateToProps)(withRouter(SearchList))