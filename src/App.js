import React,{Component} from 'react';
import Scroll from './Scroll';
import {connect} from 'react-redux';
import SearchBox from './SearchBox';
import CardList from './CardList';
// import './App.css';
import {setSearchField,requestRobots} from './actions';
import ErrorBoundry from './ErrorBoundry';
class App extends Component{
    
    // onSearchChange=(event)=>{
    //     this.setState({searchfield:event.target.value})
        
    // }
    componentDidMount(){
        this.props.onRequestRobot()
        
    }
    render(){
        const {robots,searchfield,onSearchChange,isPending}=this.props;
        const filterRobots=robots.filter(robot=>{
            return robot.name.toLowerCase().includes(searchfield.toLowerCase())
        })
    return isPending?<h1>Loading</h1>:(
        <div className="tc">
            <h1 className="header">Robofriends</h1>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                <CardList robots={filterRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    );
    }
}
const mapStateToProps=state=>{
    return {searchfield:state.searchRobots.searchfield,
    robots:state.requestRobots.robots,
    isPending:state.requestRobots.isPending,
    error:state.requestRobots.error
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onSearchChange:event=>dispatch(setSearchField(event.target.value)),
        onRequestRobot:()=>dispatch(requestRobots())
    
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App)