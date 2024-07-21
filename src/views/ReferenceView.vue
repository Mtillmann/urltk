<script setup>

</script>
<template>
  <p>
    URLtk is a simple tool that allows you to transform URLs with a set of predefined tasks.
    Use it to extract information, convert URLs, or automate repetitive tasks.
  </p>

  <p>
    Read more on <router-link :to="{name: 'referenceTasks'}">tasks</router-link>
    and <router-link :to="{name: 'referenceActions'}">actions</router-link>.
  </p>

  <h4 class="display-8">
    Privacy
  </h4>
  <p>
    URLtk does not store any data.
  </p>
  <p>
    All actions are stored and run locally in your browser.
    If you share an action, the action is embedded in the URL and the recipient can import the action to their own instance of URLtk.
  </p>
  <p>
    Since URLtk uses vue-router's hash mode, neither the action nor the URL is sent to the server.
    This means that not even github.io's frontend server will see the action or the URL you are working with.
  </p>
  <p>
    Likewise, no URL or action data is sent to or visible by any third-party service.
  </p>
  <p>
    Since no backend exists, there is also no way to limit or censor actions or URLs - anything you share
    or click only exists in your browser address bar.
  </p>


</template>