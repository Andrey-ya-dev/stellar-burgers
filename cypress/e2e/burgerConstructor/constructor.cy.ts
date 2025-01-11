import { accessToken, refreshToken } from '../../fixtures/token.json';
import { order } from '../../fixtures/order.json';

const CONSTRUCTOR_ELEMENT =
  '.constructor-element > .constructor-element__row > .constructor-element__text';
const BUN_ADD_BUTTON = `[data-cy=bun] .common_button`;
const INGREDIENT_ADD_BUTTON = `[data-cy=main] .common_button`;
const BUN_ELEMENT = `[data-cy=bun]`;
const MODAL_CONTENT = `#modals div:first-child`;
const MODAL_CLOSE_BUTTON = `div:first-child > button > svg`;

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
    cy.visit('/');
  });

  describe('Тесты загрузки ингредиентов и добавление их в конструктор', () => {
    it('Тесты добавление ингредиентов', () => {
      cy.request('/api/ingredients');

      cy.get(`${BUN_ADD_BUTTON}`).first().click();
      cy.get(`${INGREDIENT_ADD_BUTTON}`).first().click();

      const burgerConstructor = {
        bunTop: cy.get(`${CONSTRUCTOR_ELEMENT}`).first(),
        mainIngredient: cy.get(`${CONSTRUCTOR_ELEMENT}`).eq(1),
        bunBottom: cy.get(`${CONSTRUCTOR_ELEMENT}`).last()
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
      cy.get(`${BUN_ELEMENT}`).first().click();

      cy.get(`${MODAL_CONTENT}`).find('h3').as('modal-content-title');

      cy.get('@modal-content-title').contains('Краторная булка N-200i');
    });

    it('Тест закрытия модального окна по кнопке', () => {
      cy.get(`${BUN_ELEMENT}`).first().click();

      cy.get(`${MODAL_CONTENT}`).as('modal-window');
      cy.get('@modal-window').find(`${MODAL_CLOSE_BUTTON}`).click();

      cy.get('@modal-window').should('not.exist');
    });

    it('Тест закрытия модального окна по оверлею', () => {
      cy.get(`${BUN_ELEMENT}`).first().click();

      cy.get(`${MODAL_CONTENT}`).as('modal-window');
      cy.get('@modal-window').find('div:nth-child(2)').as('overlay');

      cy.get('@overlay').click({ force: true });

      cy.get('modal-window').should('not.exist');
    });
  });

  describe('Тест создания заказа и отправки', () => {
    it('Тест добавления и отправки ', () => {
      cy.get(`${BUN_ADD_BUTTON}`).first().click();
      cy.get(`${INGREDIENT_ADD_BUTTON}`).first().click();

      cy.get(
        '#root > div > main > div > section:nth-child(2) > div > .button'
      ).click();

      cy.get(`${MODAL_CONTENT}`).as('order-modal');
      cy.get('@order-modal')
        .find('div:nth-child(2) > h2')
        .as('order-title-number');

      cy.get('@order-title-number').contains(order.number);

      cy.get('@order-modal').find(`${MODAL_CLOSE_BUTTON}`).click();

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
