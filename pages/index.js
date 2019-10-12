import { useState } from "react";
import Head from "next/head";

export default () => {
  const [value, setValue] = useState(`{"echo": "something"}`);
  const [response, setResponse] = useState(null);

  const submitHandler = async evt => {
    evt.preventDefault();
    const res = await fetch("/api/echo", {
      method: "POST",
      body: value,
      headers: { "Content-Type": "application/json" }
    });

    setResponse(await res.json());
  };

  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootswatch@4.3.1/dist/superhero/bootstrap.min.css"
        />
        <style>{`
          body {
            padding: 40px;
          }
        `}</style>
      </Head>
      <h1>JSON schema as input validation</h1>

      <p>
        The api can be set up using `now dev` (https://github.com/zeit/now).
      </p>

      <p>
        Then calling the api echo endpoint with valid json should result in a
        reply of passed value. Calling without valid json (too many props, not
        enough props, wrong prop names, wrong value type) should all result in
        422 unprocessable entity.
      </p>
      <pre>
        <code>{`
fetch("/api/echo", {
  method: "POST",
  body: JSON.stringify({ echo: "something" }),
  headers: { "Content-Type": "application/json" }
});
        `}</code>
      </pre>

      <form action="" onSubmit={submitHandler} className="form">
        <textarea
          className="form-control"
          value={value}
          onChange={evt => setValue(evt.target.value)}
        />
        <input type="submit" className="btn btn-primary" value="submit" />
      </form>
      {response && (
        <pre style={{ marginTop: 20 }}>
          <code>{JSON.stringify(response)}</code>
        </pre>
      )}
    </div>
  );
};
