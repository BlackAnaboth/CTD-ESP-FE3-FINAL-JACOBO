import { render, screen } from "@testing-library/react";
import { checkoutMocked } from "dh-marvel/test/mocks/checkout";
import { ICheckout } from "types/ICheckout.type";
import CardSuccessCheckout from "./card-succes-checkout.component";

describe("CardSuccessCheckout component", () => {
  describe("when rendering default component", () => {
    it("should render the card message", () => {
      render(<CardSuccessCheckout data={checkoutMocked as ICheckout} />);
      const message = screen.getByText("¡Que disfrutes tu compra!");
      expect(message).toBeInTheDocument();
    });
    it("should render the comic title", () => {
      render(<CardSuccessCheckout data={checkoutMocked as ICheckout} />);
      const title = screen.getByText("Ant-Man (2003) #4");
      expect(title).toBeInTheDocument();
    });
    it("should render the card image", () => {
      render(<CardSuccessCheckout data={checkoutMocked as ICheckout} />);
      const image = screen.getByAltText("Ant-Man (2003) #4");
      expect(image).toBeInTheDocument();
    });
    it("should render the customer name", () => {
      render(<CardSuccessCheckout data={checkoutMocked as ICheckout} />);
      const customerName = screen.getByText(/Julian/i);
      expect(customerName).toBeInTheDocument();
    });
    it("should render the address", () => {
      render(<CardSuccessCheckout data={checkoutMocked as ICheckout} />);
      const address = screen.getByText(/26 123/i);
      expect(address).toBeInTheDocument();
    });
    it("should render the address", () => {
      render(<CardSuccessCheckout data={checkoutMocked as ICheckout} />);
      const address = screen.getByText(/35 12345/i);
      expect(address).toBeInTheDocument();
    });
  });
});
