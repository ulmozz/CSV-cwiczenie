const { defineConfig } = require("cypress");

const fs = require('fs')
const path = require('path')
const neatCSV = require('neat-csv') // NOTE This require net-csv version older than 7.0.0.

// NOTE This function is called when a project is opened or re-opened (e.g. due to the project's config changing).
module.exports = defineConfig({
  fixturesFolder: false,
  e2e: {
    supportFile: false,

    // NOTE `on` is used to hook into various events Cypress emits. `config` is the resolved Cypress config.
    async setupNodeEvents (on, config) {
      const filename = path.join(__dirname, 'cypress/fixtures/users.csv')
      console.log('loading file', filename)

      const text = fs.readFileSync(filename, 'utf8')

      const csv = await neatCSV(text)

      console.log(csv)

      // NOTE The data are available via Cypress.env("usersList") before the start of the tests.
      config.env.usersList = csv

      return config
    },
  },
});
