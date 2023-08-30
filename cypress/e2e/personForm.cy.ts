import { baseURL } from '../util/baseURL'

const personForm = () => {
  beforeEach(() => {
    cy.get('[data-cy="btn-new-person"]')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')
      .click()

    cy.url().should('eq', `${baseURL}/person/new`)
  })

  it('Verifies required form fields', () => {
    cy.get('[data-cy="btn-save"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click()

    const fields = [
      {
        selector: '[data-cy="personName"]',
        errorMessage: 'Nome: Precisa ser preenchido',
      },
      {
        selector: '[data-cy="email"]',
        errorMessage: 'Email: Precisa ser preenchido',
      },
      {
        selector: '[data-cy="birthDate"]',
        errorMessage: 'Data de nascimento: Precisa ser preenchido.',
      },
    ]

    fields.forEach((field) => {
      cy.get(field.selector).should('have.value', '')
      cy.findByText(field.errorMessage)
        .should('be.visible')
        .closest('p')
        .invoke('prop', 'tagName')
        .should('eq', 'P')
    })
  })

  it('Registers a new person', () => {
    const person = {
      name: 'John Doe',
      cpf: '97267668003',
      email: 'test_cy@cypress.com',
      phoneNumber: '11999999999',
      birthDate: '1990-01-01',
    }

    const { name, cpf, email, phoneNumber, birthDate } = person

    cy.get('[data-cy="personName"]').type(name).should('have.value', name)
    cy.get('[data-cy="registrationNumber"]')
      .type(cpf)
      .should('have.value', '972.676.680-03')
    cy.get('[data-cy="email"]').type(email).should('have.value', email)
    cy.get('[data-cy="phoneNumber"]')
      .type(phoneNumber)
      .should('have.value', '(11) 99999-9999')
    cy.get('[data-cy="birthDate"]')
      .type(birthDate)
      .should('have.value', birthDate)

    cy.get('[data-cy="btn-save"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click()
  })
}

export default personForm
