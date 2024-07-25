<script setup>

</script>
<template>
  <p class="lead">
    URLtk is a simple tool that allows you to transform URLs with a set of predefined tasks.
    Use it to extract information, convert URLs, or automate repetitive tasks.
  </p>

  <p>
    Read more on <router-link :to="{name: 'referenceTasks'}">tasks</router-link>
    and <router-link :to="{name: 'referenceActions'}">actions</router-link>.
    <br>
    Also check out how to make most of URLtk by connecting services using <router-link :to="{name: 'referenceDDG'}">DuckDuckGo and the <code>wrap</code>-Task</router-link>.
  </p>

  <h4 class="display-8">
    Android Share Target
  </h4>

  <p>On Android (using chrome) you can install the pwa, either through the install-notification or by opening
  the browser menu, then clicking "add to homescreen" and select "install".</p>

  <p>"URLtk" is now part of your share dialog. When you share an URL to URLtk, the regular URL landing page is shown</p>

  <h4 class="display-8">
    iOS Shortcut
  </h4>

  <p>tdb...</p>




  <h4 class="display-8">
    Privacy
  </h4>
  <p class="lead">
    URLtk does not store or share any data.
  </p>
  <p>
    All actions are stored and run locally in your browser.
    If you share an action, the action is embedded in the URL and the recipient can import the action to their own instance of URLtk.
  </p>
  <p>
    Since URLtk uses vue-router's hash mode, neither actions or URLs are sent to the server.
    Even github.io's frontend server won't see the action or the URL you are working with.
  </p>
  <p>
    Also, since the hash is not sent to the server, it is not part of the referrer header that your browser sends to the destination web-server.
  </p>
  <p>
    Likewise, no URL or action data is sent to or visible by any third-party service.
  </p>
  <p>
    Since no backend exists, there is also no way to limit or censor actions or URLs - anything you share
    or click only exists in your browser address bar.
  </p>

  <h4 class="display-8">
    Disclaimer
  </h4>
  <p>
    The URLs processed by this web application are submitted by users. The creators and operators of this web application do not endorse, verify, or take responsibility for the content of these URLs. By using this web application, users acknowledge that they are solely responsible for the URLs they submit and the content they access.
  </p>
  <p>
    We strongly advise users to ensure that their submissions comply with all relevant laws, regulations, and guidelines. The creators and operators of this web application disclaim any liability for any harm or damages resulting from the use of this web application or the content accessed through it.
  </p>
  <p>
    Users are encouraged to exercise caution and use this service responsibly. If you have any concerns about the content or the use of this service, please discontinue use immediately.

  </p>



</template>