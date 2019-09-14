import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import TemplateCreate from "./template/TemplateCreate";
import TemplateMain from "./template/TemplateMain";
import TemplateUse from "./template/TemplateUse";
import TemplateEdit from "./template/TemplateEdit";
import TemplateMail from "./template/TemplateMail";
class App extends React.Component {
  render() {
    // whatever in swich tag will be replaced (render) due to the route changes
    // we keep header tag outside so it will be always on screen
    return (
      <div className="ui container ">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={TemplateMain} />
              <Route path="/templates/use" exact component={TemplateMail} />
              <Route path="/templates/new" component={TemplateCreate} />
              <Route
                path="/templates/edit/:id"
                exact
                component={TemplateEdit}
              />
              <Route path="/templates/use/:id" exact component={TemplateUse} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
