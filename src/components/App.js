import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Header from "./Head/Header";
import StreamList from "./Streams/StreamList";
import StreamShow from "./Streams/StreamShow";
import StreamCreate from "./Streams/StreamCreate";
import MyStream from "./Streams/MyStream";
import MyStreamV2 from "./Streams/MyStreamV2";
import StreamDelete from "./Streams/StreamDelete";
import StreamEdit from "./Streams/StreamEdit";
import NotFoundPage from "./NotfoundPage";
import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div className='ui container' style={{ marginTop: "10px" }}>
        <Router history={history}>
          <Header />
          <Switch>
            <Route path='/' exact component={StreamList} />
            <Route path='/streams/show/:id' exact component={StreamShow} />
            <Route path='/streams/new' exact component={StreamCreate} />
            <Route path='/streams/mystream' exact component={MyStream} />
            <Route path='/streams/mystreamV2' exact component={MyStreamV2} />
            <Route path='/streams/delete/:id' exact component={StreamDelete} />
            <Route path='/streams/edit/:id' exact component={StreamEdit} />
            <Route path='*' component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default App;
