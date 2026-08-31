import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import IndexProvider from "./providers/IndexProvider";

export default function App() {
  const basename =
    window.location.pathname.startsWith("/admin") ? "/admin" : "/";

  return (
    <BrowserRouter basename={basename}>
      <IndexProvider>
        <AppRoutes />
      </IndexProvider>
    </BrowserRouter>
  );
}
