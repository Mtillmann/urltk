<script setup>
import ReferenceTaskItem from "../components/ReferenceTaskItem.vue";
</script>
<template>

  <p>Tasks are the building blocks of
    <router-link :to="{name: 'referenceActions'}">actions</router-link>.
    Each task receives an input, processes it and returns its output to the next task in the
    action's sequence.
  </p>

  <ReferenceTaskItem task-name="noop">
    <p>It really does nothing - it's the default task when creating a new action.</p>
  </ReferenceTaskItem>

  <ReferenceTaskItem task-name="wrap">
    <p>Wraps the output of the previous task in the given string, encodes the previous output by default.
      Useful if you want to pass the current URL or its parts to another tool.
      <br>
      Examples: <a
          href="https://mtillmann.github.io/urltk/#/url/https:%2F%2Fwww.google.com%2F?actions=W1tudWxsLDEsIkxvb2sgdXAgRG9tYWluIEROUyIsIioiLFtbImV4dHJhY3RfaG9zdCIsWyIiXV0sWyJ3cmFwIixbImh0dHBzOi8vZG5zLmdvb2dsZS9xdWVyeT9uYW1lPSQxIix0cnVlXV1dXV0=">Lookup
        up Domain DNS</a>,
      <a href="https://mtillmann.github.io/urltk/#/url/https:%2F%2Fwww.google.com%2F?actions=W1tudWxsLDEsIldheWJhY2sgTWFjaGluZSIsIioiLFtbIndyYXAiLFsiaHR0cHM6Ly93ZWIuYXJjaGl2ZS5vcmcvd2ViLyovJDEiLGZhbHNlXV1dXV0=">Wayback
        Machine</a>
    </p>
  </ReferenceTaskItem>

  <ReferenceTaskItem task-name="detrack">
    <p>
      Removes tracking and identifying parameters from the given URL. This makes it
      impossible for the target website to track the source of the visit or the user
      who shared the link.
    </p>
  </ReferenceTaskItem>


  <ReferenceTaskItem task-name="deref">
    <p>
      Generates a new link that opens the given URL without sending a referrer header.
      This makes it impossible for the target website to track the source of the visit.
    </p>
  </ReferenceTaskItem>

  <ReferenceTaskItem task-name="to_url"><p>
    Converts the given input to an instance of <code>URL</code>. Useful if
    you've extracted the URL from a string and want to pass it to another task
    that expects a URL object.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="decode"><p>
    Passes the given input through <code>decodeURIComponent</code>.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="encode"><p>
    Passes the given input through <code>encodeURIComponent</code>.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="regexp"><p>
    Returns the result of the given regular expression replace operation applied to the input.
    Very useful for extracting or replacing multiple parts of the URL. Omit delimiters and flags,
    escape shorthand character classes where necessary.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="set_get"><p>
    Sets or replaces the given key-value pair/s in the URL's search(query) parameters.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="replace_in_hash"><p>
    Replaces the given string in the URL's hash.
  </p>
    <p>
      Simple replacement syntax:
    </p>
    <table class="table table-sm table-responsive small">
      <thead>
      <tr>
        <th>Input</th>
        <th>Search</th>
        <th>Replace</th>
        <th>Output</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>https://example.com/#foobar</td>
        <td>foo</td>
        <td>baz</td>
        <td>https://example.com/#bazbar</td>
      </tr>
      <tr>
        <td>https://example.com/#foobar</td>
        <td>^</td>
        <td>baz</td>
        <td>https://example.com/#bazfoobar</td>
      </tr>
      <tr>
        <td>https://example.com/#foobar</td>
        <td>$</td>
        <td>baz</td>
        <td>https://example.com/#foobarbaz</td>
      </tr>
      <tr>
        <td>https://example.com/#foobar</td>
        <td></td>
        <td>quxbaz</td>
        <td>https://example.com/#quxbaz</td>
      </tr>
      </tbody>
    </table>
  </ReferenceTaskItem>

  <ReferenceTaskItem task-name="replace_in_host"><p>
    Replaces the given string in the URL's host. See <code>replace_in_hash</code> for search
    and replace syntax.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="replace_in_path"><p>
    Replaces the given string in the URL's path. See <code>replace_in_hash</code> for search
    and replace syntax.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="remove_get"><p>
    Removes the given key/s from the URL's search parameters. Supports multiple keys
    separated by commas and wildcard asterisks. For example, <code>utm_*</code> will remove
    all keys starting with <code>utm_</code>.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="remove_hash"><p>
    Removes the whole hash from the URL.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_get"><p>
    Extracts the value of the given key from the URL's search parameters.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_hash"><p>
    Extracts the whole hash from the URL.
  </p></ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_host">
    <p>
      Extracts the host or parts of the host from the URL.
    </p>
    <p>
      Examples:
    </p>
    <table class="table-sm table-responsive table small">
      <thead>
      <tr>
        <th>
          Input
        </th>
        <th>
          Segment
        </th>
        <th>
          Output
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>https://www.example.com</td>
        <td></td>
        <td>www.example.com</td>
      </tr>
      <tr>
        <td>https://www.example.com</td>
        <td>0</td>
        <td>www</td>
      </tr>
      <tr>
        <td>https://www.example.com</td>
        <td>1</td>
        <td>example</td>
      </tr>
      <tr>
        <td>https://www.example.com</td>
        <td>1,2</td>
        <td>google.com</td>
      </tr>
      </tbody>
    </table>

  </ReferenceTaskItem>

  <ReferenceTaskItem task-name="extract_path">
    <p>
      Extracts the path or parts of the path from the URL.
    </p>
    <p>
      Examples:
    </p>

    <table class="table-sm table-responsive table small">
      <thead>
      <tr>
        <th>
          Input
        </th>
        <th>
          Segment
        </th>
        <th>
          Output
        </th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>https://www.example.com/users/martin/test</td>
        <td></td>
        <td>users/martin/test</td>
      </tr>
      <tr>
        <td>https://www.example.com/users/martin/test</td>
        <td>0</td>
        <td>users</td>
      </tr>
      <tr>
        <td>https://www.example.com/users/martin/test</td>
        <td>1</td>
        <td>martin</td>
      </tr>
      <tr>
        <td>https://www.example.com/users/martin/test</td>
        <td>1,2</td>
        <td>martin/test</td>
      </tr>
      </tbody>
    </table>

  </ReferenceTaskItem>


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