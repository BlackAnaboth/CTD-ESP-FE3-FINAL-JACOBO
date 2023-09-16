import { screen } from "@testing-library/react";
import { renderWithReactHookForm } from "dh-marvel/test/form-helper";
import StepperForm from "./stepper-form.component";
import { comicMock } from "dh-marvel/test/mocks/comic";

describe("StepperForm component", () => {
  describe("when rendering default", () => {
    it("should render all the data", () => {
      renderWithReactHookForm(<StepperForm comic={comicMock} />);

      const stepperDataP = screen.getByText("Datos Personales");
      const stepperDataDE = screen.getByText("Dirección de entrega");
      const stepperDataDP = screen.getByText("Datos del pago");

      expect(stepperDataP).toBeInTheDocument();
      expect(stepperDataDE).toBeInTheDocument();
      expect(stepperDataDP).toBeInTheDocument();
    });
  });
});
