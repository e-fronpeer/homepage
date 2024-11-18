import { Switch, Route } from "wouter";
import Home from "@/pages/home/index";

export default function AppWithWouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/home" component={Home} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}