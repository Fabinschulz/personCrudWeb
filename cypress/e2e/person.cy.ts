import { baseURL } from '../util/baseURL'
import personForm from './personForm.cy'

describe('Validate funtionality', () => {
  beforeEach(() => {
    cy.visit(baseURL)

    // check if the page is being loaded correctly
    cy.url().should('eq', `${baseURL}/`)
  })

  it('Validate the person list', () => {
    cy.findByRole('heading', { name: /Pessoas/i })
      .should('exist')
      .and('be.visible')

    cy.get('[data-cy="btn-new-person"]')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')

    cy.get('[data-cy="btn-refresh"]')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')

    // check if the table is being loaded correctly
    cy.findByRole('table')
      .should('exist')
      .and('be.visible')
      .within(() => {
        const headings = [
          'Nome',
          'CPF',
          'Email',
          'Telefone',
          'Data de nascimento',
          'Ações',
        ]

        function checkHeading(text: string) {
          cy.findByRole('columnheader', { name: text })
            .should('exist')
            .and('be.visible')
        }

        headings.forEach((header) => {
          checkHeading(header)
        })
      })
  })

  context('Check the functionality of the personal form', () => personForm())
})
