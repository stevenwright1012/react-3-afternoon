import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios'
import Post from './Post/Post'
class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      baseUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.search = this.search.bind(this)
  }
  
  componentDidMount() {
    axios.get(`${this.state.baseUrl}/posts`).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  updatePost(id, text) {
    console.log(id, text);
    
    axios.put(`${this.state.baseUrl}/posts?id=${id}`, {text}).then(res => {
      this.setState({
        posts: res.data
      });
    });
  }

  deletePost(id) {
    axios.delete(`${this.state.baseUrl}/posts?id=${id}`).then(res =>
    this.setState({
      posts: res.data
    }))
  }

  createPost(text) {
    axios.post(`${this.state.baseUrl}/posts`, {text}).then(res => {
      this.setState({
        posts: res.data
      })
    })
  }

  search(str){
    var copy = this.state.posts.slice()
    var filter = copy.filter(val => {
      return val.text.includes(str)
    })
    this.setState({
      posts: filter
    })
  }
  render() {
    const { posts } = this.state;
    // // const postMap = posts.map((val) => {
    // //   return (<Post key={val.id} 
    // //   text={val.text} 
    // //   date={val.date}
    // //   updatePostFn={this.updatePost}
    // //   id={val.id}
    // //   deletePostFn={this.deletePost}/>)
      
    // })
    return (
      <div className="App__parent">
        <Header searchFn= {this.search}/>

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>

          {
            posts.map((val) => {
            return (<Post 
              text={val.text} 
              date={val.date}
              updatePostFn={this.updatePost}
              id={val.id}
              deletePostFn={this.deletePost}/>)
    })}
        </section>
      </div>
    );
  }
}

export default App;
