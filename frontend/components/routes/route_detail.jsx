import React from 'react';
import { Link } from 'react-router';
import CommentShow from './comment_show';
import CommentButton from './comment_button';
import CommentsList from './comments_list';
import CommentFormContainer from './comment_form_container';

const commentList = (comments=[]) => (
  comments.map(comment => (
    <CommentShow  author_name={comment.author_name} body={comment.body} key={comment.id}/>
  ))
);

class RouteDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleComplete = this.handleComplete.bind(this);
    this.returnToDashboard = this.returnToDashboard.bind(this);
    this.state = this.props.completion || {
      user_id: "",
      route_id: ""
    };
  }

  componentWillMount() {
    this.props.routes[this.props.params.routeId];
  }

  componentDidMount(){

  }

  returnToDashboard(e){
    e.preventDefault();
    this.props.router.push('/dashboard');
  }

  handleComplete(e){
    e.preventDefault();
    this.props.createCompletion({user_id: this.props.currentUser.id, route_id: this.props.routes[this.props.params.routeId].id});
    this.props.router.push('/dashboard');
  }

  componentWillReceiveProps(newProps) {
    this.setState(newProps.completion || {
      user_id:"",
      route_id:""
    });
  }

  render() {
    if (Object.keys(this.props.routes).length === 0) {
      return(<div>Loading</div>);
    }
    const route = this.props.routes[this.props.params.routeId];

    return (
      <div className="container">
        <div className="route-detail">
          <img className="static-map"src={route.map_url}/>
          <div className="route-info-container">
            <h3>Name: {route.name}</h3>
            <h4>Distance: {route.distance.toFixed(2)} miles</h4>
            <h4>Created By: {route.author_name}</h4>
            <span>Description: {route.description}</span>
            <br/>
            <h4>Comments:
            </h4>
            {commentList(route.comments)}
            <br/>

            {this.props.children || <CommentButton/>}
            <div className="route-button-container">
              <button onClick={this.handleComplete}>Complete Run!</button>
              <button onClick={this.returnToDashboard}>Back to Dashboard</button>
            </div>
        </div>
        </div>
      </div>

    );
  }
}

export default RouteDetail;

// <CommentsList comments={this.props.route.comments}/>
// <CommentFormContainer route={this.props.route}/>
// <div className="map-container">
//   <DetailMap route={route}/>
// </div>
//
// <CommentsList route={route}/>
