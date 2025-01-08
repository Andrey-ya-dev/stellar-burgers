import { accessToken, refreshToken } from '../../fixtures/token.json';
import { order } from '../../fixtures/order.json';

beforeEach(() => {
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
  cy.setCookie('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  cy.intercept('GET', 'api/auth/token', {
    fixture: 'token.json'
  });
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
});

afterEach(() => {
  cy.clearAllCookies();
  localStorage.removeItem('refreshToken');
});

describe('Тесты страницы конструктора (ConstructorPage)', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.visit('http://localhost:4000');
  });

  describe('Тесты загрузки ингредиентов и добавление их в конструктор', () => {
    it('Тесты добавление ингредиентов', () => {
      cy.request('/api/ingredients');

      cy.get(`[data-cy=bun] .common_button`).first().click();
      cy.get(`[data-cy=main] .common_button`).first().click();

      const burgerConstructor = {
        bunTop: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .first(),
        mainIngredient: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .eq(1),
        bunBottom: cy
          .get(
            '.constructor-element > .constructor-element__row > .constructor-element__text'
          )
          .last()
      };

      burgerConstructor.bunTop.contains('Краторная булка N-200i (верх)');
      burgerConstructor.mainIngredient.contains(
        'Биокотлета из марсианской Магнолии'
      );
      burgerConstructor.bunBottom.contains('Краторная булка N-200i (низ)');
    });
  });

  describe('Тесты модального окна игредиента', () => {
    it('Тест открытия модального окна', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals div:first-child');
      const h3 = modal.get('div:last-child h3');

      h3.contains('Краторная булка N-200i');
    });

    it('Тест закрытия модального окна по кнопке', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals div:first-child').as('modal-window');
      modal.get('div:first-child > button > svg').click();

      cy.get('modal-window').should('not.exist');
    });

    it('Тест закрытия модального окна по оверлею', () => {
      cy.get(`[data-cy=bun]`).first().click();

      const modal = cy.get('#modals > div:first-child').as('modal-window');
      const overlay = modal.get('#modals > div:nth-child(2)');

      overlay.click({ force: true });

      cy.get('modal-window').should('not.exist');
    });
  });

  describe('Тест создания заказа и отправки', () => {
    it('Тест добавления и отправки ', () => {
      cy.get(`[data-cy=bun] .common_button`).first().click();
      cy.get(`[data-cy=main] .common_button`).first().click();

      cy.get(
        '#root > div > main > div > section:nth-child(2) > div > button'
      ).click();

      const orderModal = cy.get('#modals > div:first-child');
      const orderNumber = orderModal.get('div:nth-child(2) > h2');

      orderNumber.contains(order.number);

      orderModal
        .get('div:first-child > div:first-child > button > svg')
        .click();

      cy.get('modal').should('not.exist');

      const burgerConstructor = {
        bunTop: cy.get('main section:last-child div:first-child'),
        mainIngredient: cy.get('main section:last-child div:last-child'),
        bunBottom: cy.get('main section:last-child div:nth-child(3)')
      };

      burgerConstructor.bunTop.contains('Выберите булки');
      burgerConstructor.mainIngredient.contains('Выберите начинку');
      burgerConstructor.bunBottom.contains('Выберите булки');
    });
  });
});
