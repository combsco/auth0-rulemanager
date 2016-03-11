<template>
  <button @click="userLogin()" class="button">Login</a>
</template>
<script>
export default {
  methods: {
    userLogin () {
      const lock = new Auth0Lock('fVBQTMGgFt2WN9MGSKGr0G8NNBW5xjGO', 'charlie-sample.auth0.com')
      lock.show((err, profile, token) => {
          if(err) {
            // Handle the error
            console.log(err)
          } else {
            // Set the token and user profile in local storage
            localStorage.clear()
            localStorage.setItem('access_token', token)
            this.$router.go('/')
          }
      })
    }
  }
}
</script>
