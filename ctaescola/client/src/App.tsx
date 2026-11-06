import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Inscricao from "./pages/Inscricao";
import {
  CursoEletrotecnica,
  CursoEnfermagem,
  CursoInformatica,
  NossosCursos,
  SobreOCTA,
} from "./pages/Cursos";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/index.html"} component={Home} />
      <Route path={"/sobre-o-cta"} component={SobreOCTA} />
      <Route path={"/sobre-o-cta.html"} component={SobreOCTA} />
      <Route path={"/inscricao"} component={Inscricao} />
      <Route path={"/inscricao.html"} component={Inscricao} />
      <Route path={"/nossos-cursos"} component={NossosCursos} />
      <Route path={"/nossos-cursos.html"} component={NossosCursos} />
      <Route path={"/tecnico-em-eletrotecnica"} component={CursoEletrotecnica} />
      <Route path={"/tecnico-em-eletrotecnica.html"} component={CursoEletrotecnica} />
      <Route path={"/tecnico-em-enfermagem"} component={CursoEnfermagem} />
      <Route path={"/tecnico-em-enfermagem.html"} component={CursoEnfermagem} />
      <Route path={"/tecnico-em-informatica"} component={CursoInformatica} />
      <Route path={"/tecnico-em-informatica.html"} component={CursoInformatica} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
