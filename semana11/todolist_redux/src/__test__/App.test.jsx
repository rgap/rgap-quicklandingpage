import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import App from "../App";

const mockUserResponse = {
  id: 1,
  name: "Pepe",
  lastname: "Perez",
  email: "pepe@gmail.com",
  password: "pepe12345",
  createdAt: "today",
  avatar: "?",
};

describe("Render App component", () => {
  it("Test App flow", () => {
    // llamando y ejecutando al componente
    render(<App />);
    // screen es igual a la pantalla actual
    const title = screen.getByText("Crear Cuenta");
    const button = screen.getByLabelText("Crear cuenta");
    // esperar que title exista en el documento
    expect(title).toBeInTheDocument();
    // click al boton
    fireEvent.click(button);
    // verificar 4 errores
    const errors = screen.getAllByText("Este campo es requerido");
    expect(errors).toHaveLength(4);
  });

  it("Test SignUp", () => {
    const response = {
      // json will be a function that returns mockUserResponse
      // response.json retorna a mockUserResponse
      json: vi.fn().mockResolvedValue(mockUserResponse),
    };

    // cuando se use el fetch, que retorne mockUserResponse
    // global (se usa en servidor), window (se usa en cliente)
    global.fetch = vi.fn().mockResolvedValue(response);

    render(<App />);

    const inputName = screen.getByLabelText("name");
    const inputLastname = screen.getByLabelText("lastname");
    const inputEmail = screen.getByLabelText("email");
    const inputPassword = screen.getByLabelText("password");

    // escribir en inputs
    fireEvent.change(inputName, { target: { value: "Pepe" } });
    fireEvent.change(inputLastname, { target: { value: "Pepez" } });
    fireEvent.change(inputEmail, { target: { value: "pepe@gmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "pepe12345" } });

    const button = screen.getByLabelText("Crear cuenta");
    fireEvent.click(button);
  });
});
