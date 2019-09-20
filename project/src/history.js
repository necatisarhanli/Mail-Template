import { createBrowserHistory } from "history";

// after some action call we need to change our route
// we creating brand new  history to change browser's route
// whenever we push new route to history it will trigger the browser
// example -> histroy.push("/") "go to main route"

export default createBrowserHistory();
