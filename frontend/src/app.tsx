import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "@/middleware/context";
import Main from "@/layout/main/main";
import Header from "@/layout/header/header";
import Footer from "@/layout/footer/footer";
import "./app.css";

const App = () => {
  const queryClient = new QueryClient();
  
  return (
    <>
      <AppContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Header />
            <Main />
            <Footer />
          </BrowserRouter>
        </QueryClientProvider>
      </AppContextProvider>
    </>
  );
};

export default App;
