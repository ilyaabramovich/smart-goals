import Container from "react-bootstrap/Container";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function Layout() {
  return (
    <>
      <Header />
      <Container as="main" className="my-4">
        <Outlet />
      </Container>
    </>
  );
}
