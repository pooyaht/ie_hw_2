import React, { Component } from 'react';
import classes from'./forms.module.css';
import {Link} from 'react-router-dom'
import WithClassWrapper from '../../components/hoc/withClassWrapper'
import axios from 'axios'
import Spinner from '../../components/UI/Spinner/Spinner';
class forms extends Component{
    state ={
        isLoading:true
    }
    componentDidMount(){
        let cache = JSON.parse(localStorage.getItem('forms'))
        //console.log(cache)
        if(!cache){
            axios.get('//localhost:4000/api/forms/')
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('forms',JSON.stringify(response.data.forms))
                this.setState({forms:response.data.forms,isLoading:false})
            });
        }
        else{
            console.log(cache)
            this.setState({forms:cache,isLoading:false})
        }
        setInterval(()=>localStorage.clear(),180000)
    }
    render(){
        let view = undefined;
        if(this.state.isLoading)
        {
           view = <Spinner />
        }
        else{
            let linkArray = {...this.state};
            console.log(linkArray)
            let newArray = linkArray.forms.map((key)=>{
                return <li key = {key.id}><Link to={{pathname :"/form"+key.id , state:key}} >{key.title}</Link></li>
        })
            view =(
                <WithClassWrapper classes = {classes.forms}>
                    <div >
                        <h2 >Forms</h2>
                        <nav>
                            <ul >
                            {newArray}
                            </ul>
                        </nav>
                    </div> 
                </WithClassWrapper>
                )
        }
        //console.log(this.state)
        return(
            <div>
                {view}
            </div>
        );
    }
}
export default forms;