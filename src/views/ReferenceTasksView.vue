<script setup>
import Transformer from "../Transformer.js";
import TaskArguments from "../components/ReferenceTaskItem.vue";
import ReferenceTaskItem from "../components/ReferenceTaskItem.vue";


</script>
<template>

  <ReferenceTaskItem task-name="noop" />

  <ReferenceTaskItem task-name="wrap">
    <p>Wraps the output of the previous task in the given string, encodes the previous output by default.
      <br>
      Example 1: <a href="https://mtillmann.github.io/urltk/#/url/https:%2F%2Fwww.google.com%2F?actions=W1tudWxsLDEsIkxvb2sgdXAgRG9tYWluIEROUyIsIioiLFtbImV4dHJhY3RfaG9zdCIsWyIiXV0sWyJ3cmFwIixbImh0dHBzOi8vZG5zLmdvb2dsZS9xdWVyeT9uYW1lPSQxIix0cnVlXV1dXV0=">Lookup up Domain DNS</a>
      <br>
      Example 2: <a href="https://mtillmann.github.io/urltk/#/url/https:%2F%2Fwww.google.com%2F?actions=W1tudWxsLDEsIldheWJhY2sgTWFjaGluZSIsIioiLFtbIndyYXAiLFsiaHR0cHM6Ly93ZWIuYXJjaGl2ZS5vcmcvd2ViLyovJDEiLGZhbHNlXV1dXV0=">Wayback Machine</a>
    </p>
  </ReferenceTaskItem>

  <ReferenceTaskItem task-name="detrack">
    <p>
      Removes tracking and identifying parameters from the given URL.
    </p>
  </ReferenceTaskItem>


  <ReferenceTaskItem task-name="deref">
    <p>
      Generates a new link that opens the given URL without sending a referrer header.
    </p>
  </ReferenceTaskItem>

  <ReferenceTaskItem task-name="to_url"><p>
    Converts the given input to an instance of URL.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="decode"><p>
    Passes the given input through <code>decodeURIComponent</code>.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="encode"><p>
    Passes the given input through <code>encodeURIComponent</code>.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="regexp"><p>
    Returns the result of the given regular expression replace operation applied to the input.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="set_get"><p>
    Sets the given key-value pair in the URL's search parameters.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="replace_in_hash"><p>
    Replaces the given string in the URL's hash.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="replace_in_host"><p>
    Replaces the given string in the URL's host.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="replace_in_path"><p>
    Replaces the given string in the URL's path.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="remove_get"><p>
    Removes the given key from the URL's search parameters.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="remove_hash"><p>
    Removes the hash from the URL.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_get"><p>
    Extracts the value of the given key from the URL's search parameters.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_hash"><p>
    Extracts the hash from the URL.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_host"><p>
    Extracts the host from the URL.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_path"><p>
    Extracts the path from the URL.
  </p></ReferenceTaskItem>


  <!--
          tool: {
            noop,
            wrap,
            detrack,
            deref
        },
        convert: {
            to_url,
            decode,
            encode
        },
        modify: {
            regexp,
            set_get,
            replace_in_hash,
            replace_in_host,
            replace_in_path,
            remove_get,
            remove_hash
        },
        extract: {
            extract_get,
            extract_hash,
            extract_host,
            extract_path
        }
        -->


</template>