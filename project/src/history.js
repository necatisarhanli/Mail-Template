import { createBrowserHistory } from "history";

// after some actions call we need to change our route
// we creating out history to change browser's route
// whenever we push new route to history it will trigger the browser
// example -> histroy.push("/") "go to main route"

export default createBrowserHistory();
