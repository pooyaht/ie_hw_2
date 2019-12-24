import React, { Component } from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import Forms from '../forms/forms'
import Form from '../form/form'
import Wrapper from '../../components/hoc/Wrapper'
import classes from './Blog.module.css';
class Blog extends Component {
    render () {
        return (
            <Wrapper>
                <div className={classes.Blog}>
                    <header>
                        <nav>
                            <ul>
                                <li><Link
                                    to="/"
                                >home</Link></li>
                            </ul>
                        </nav>
                    </header>
                    </div>
                    <Switch>
                        <Route path="/form:id"  component={Form} />
                        <Route path="/"  component={Forms} />
                    </Switch>
            </Wrapper>
        );
    }
}

export default Blog;