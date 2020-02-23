import React,{Component} from 'react';
import Scroll from './Scroll';
import SearchBox from './SearchBox';
import CardList from './CardList';
// import './App.css';
import ErrorBoundry from './ErrorBoundry';
export default class App extends Component{
    constructor(){
        super()
        this.state={
            robots:[],
    searchfield:''
        }
      
    }
    
    onSearchChange=(event)=>{
        this.setState({searchfield:event.target.value})
        
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users').then(response=>
         response.json()).then(users=>{this.setState({robots:users})})
        
    }
    render(){
        const filterRobots=this.state.robots.filter(robots=>{
            return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase())
        })
    return (
        <div className="tc">
            <h1 className="header">Robofriends</h1>
            <SearchBox searchChange={this.onSearchChange}/>
            <Scroll>
                <ErrorBoundry>
                <CardList robots={filterRobots}/>
                </ErrorBoundry>
            </Scroll>
        </div>
    );
    }
}
