import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
      name1: '',
      login1:'',
      followers1: '',
      following1:'',
      public_repos1: '',
      avatar_url1: '',
      message1:'',
      email1:'',
      location1:'',
      node_id1:'',
      url1:'',
      flag:false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setData = this.setData.bind(this);
  }
  handleChange(event) {
    this.setState({value: event.target.value});
    
  }


  handleSubmit(event) {
    fetch("https://api.github.com/users/"+this.state.value)
      .then(res => res.json())
      .then(data => {
          this.setData(data);
          console.log(data);
      });
      this.setState({flag:true});
    event.preventDefault();
  }

  setData ({name,login,following,location,node_id,html_url, followers,  public_repos, avatar_url, message }){
    this.setState({
      name1:name,
      login1:login,
      followers1:followers,
      public_repos1:public_repos,
      avatar_url1:avatar_url,
      message1:message,
      following1:following,
      location1:location,
      node_id1:node_id,
      url1:html_url
    });
  }
  
  render() {
    
    return (
      <div>
        
        <form onSubmit={this.handleSubmit}  >
          <div className="form-group">
          <label className="" htmlFor="username">Enter Github Username</label>
            <input type="text" id="username" className="form-control" placeholder="Github user" name="Github user" value={this.state.value} onChange={this.handleChange}></input>
            <small id="emailHelp" className="form-text text-muted">example: octocat</small>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Search</button>       
          </div>
         
          
        </form>
        {this.state.flag? 
            <div>
            {
              this.state.message1!=="Not Found" ? 
              
                <div className="card" >
                     <img src={this.state.avatar_url1} className="card-img-top" />
                      <div className="card-body">
                        <h5 className="card-title">{this.state.name1}</h5>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Login:  {this.state.login1}</li>
                        <li className="list-group-item">Node id:  {this.state.node_id1}</li>
                        <li className="list-group-item">Location: {this.state.location1}</li>
                        <li className="list-group-item">Followers: {this.state.followers1}</li>
                        <li className="list-group-item">Following: {this.state.following1}</li>
                        <li className="list-group-item">Public Repository: {this.state.public_repos1}</li>

                      </ul>
                      <div className="card-body">
                        <a href={this.state.url1} className="card-link">Github Profile Link</a>
                      </div>
                  </div>
              
              :
              <div>
                <p className="text-danger">
                  Not Found!
                </p>
              </div>
    
            }
            </div>
          :
          <div></div>
        }
        
      </div>
    );
  }
}

export default App;
