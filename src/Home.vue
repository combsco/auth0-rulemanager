<template>
    <table class="table is-bordered is-striped is-narrow">
    <thead>
      <tr>
        <th>App Name</th>
        <th>Rule</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="item in appRules | orderBy 'app'">
        <tr>
          <td>{{ item.app }}</td>
          <td>{{ item.rule }}</td>
          <td><span class="tag is-success" v-if="item.ruleEnabled">Rule Enabled</span> <span class="tag is-danger" v-else>Rule Disabled</span></td>
        </tr>
      </template>
    </tbody>
  </table>
  <button @click="userLogout()" class="button">Logout</a>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {
      appRules: []
    }
  },
  methods: {
    userLogout () {
      localStorage.clear()
      this.$router.go('login')
    }
  },
  ready () {
    // Reach out grab all Clients
    this.$http({url: 'https://charlie-sample.auth0.com/api/v2/clients?fields=name&include_fields=true',
                method: 'GET',
                headers: {
                  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkcDlud2dTa3hWUVBhenVrR0wxTVVPcE9Ub1MzSms3eSIsInNjb3BlcyI6eyJjbGllbnRzIjp7ImFjdGlvbnMiOlsicmVhZCJdfSwicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIl19fSwiaWF0IjoxNDU3NTc2NTQ5LCJqdGkiOiIwYzMzYzRmMTMwYmIzZmJmYzg2NWNhODAwMjU1NDA0ZSJ9.hBTZSopaytdwlE8d3kdAU-UU1GhLXQWRme2axx1YTzo'
                }
              })
              .then((response) => {
                let clients = response.data // All the clients returned from Auth0 Mgmt API
                let apps = [] // Store all apps in an array for now.
                for (let i = 0; i < clients.length; i++) {
                  apps.push(clients[i].name)
                }
                // Reach out grab all Rules
                this.$http({url: 'https://charlie-sample.auth0.com/api/v2/rules',
                            method: 'GET',
                            headers: {
                              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJkcDlud2dTa3hWUVBhenVrR0wxTVVPcE9Ub1MzSms3eSIsInNjb3BlcyI6eyJjbGllbnRzIjp7ImFjdGlvbnMiOlsicmVhZCJdfSwicnVsZXMiOnsiYWN0aW9ucyI6WyJyZWFkIl19fSwiaWF0IjoxNDU3NTc2NTQ5LCJqdGkiOiIwYzMzYzRmMTMwYmIzZmJmYzg2NWNhODAwMjU1NDA0ZSJ9.hBTZSopaytdwlE8d3kdAU-UU1GhLXQWRme2axx1YTzo'
                            }
                          })
                          .then((response) => {
                            let rules = response.data // All the rules returned from Auth0 Mgmt API
                            let allRuleMatch = new RegExp('(context\.clientName)') // Check if a rule has context.clientName

                            for (let x = 0; x < apps.length; x++) {
                              let app = apps[x]
                              let appMatch = new RegExp('^(?!\/\/)(.*' + app + ')', 'gm') // Check if the App Name is in the Rule script except for comments.
                              for (let i = 0; i < rules.length; i++) {
                                let rule = rules[i]
                                if (appMatch.test(rule.script) || !allRuleMatch.test(rule.script)) { // Check if the app is in the rule and if the rule DOES NOT have context.clientName (meaning all rules)
                                  // All done lets put this App and it's rule in our dataset
                                  this.appRules.push({
                                    app: app,
                                    rule: rule.name,
                                    ruleEnabled: rule.enabled
                                  })
                                }
                              }
                            }
                          }, (err) => {
                            console.log(err)
                          })
              }, (err) => {
                console.log(err)
              })
  }
}
</script>
