/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react-hooks";

import { useCartCount } from "./useCartCount";

// Aqui é aramazenado o retorno da chamada, onde é recebido um retorno e define esse valor de retorno de chamada: 
let callback = () => {};

jest.mock("cart/cart", () => ({
  cart: {
    cartItems: [],
    subscribe: (cb) => {
      callback = cb;
    },
  },
}));

describe("useCartCount", () => {
  // Teste para descrever a contagem de itens no carrinho (cart). Aqui ele deve retornar uma contagem de itens de cart e obter apenas o resultado da contagem de itens usados.
  // O resultado esperado é zero já que não há itens no cart no momento.
  it("should return cart count", () => {
    const { result } = renderHook(() => useCartCount());
    expect(result.current).toBe(0);
  });

  // Aqui aumenta a contagem de itens do carrinho. Usa o callback para enviar um retorno da chamada ao server
  // Assim é esperado ter um novo conjunto de itens do carrinho.
  it("should return cart count", () => {
    const { result } = renderHook(() => useCartCount());
    act(() => {
      callback({ cartItems: [{ id: 1 }] });
    });
    expect(result.current).toBe(1);
  });
});
