import React, { useState, useCallback } from "react";
import Auth from "@aws-amplify/auth";
import "./App.css";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib-esm/types";

const UserProfile = ({ user }: any) => {
  return user ? <div>{JSON.stringify(user)}</div> : null;
};

const Error = ({ error }: any) => {
  return error ? <div>{JSON.stringify(error)}</div> : null;
};

const App = () => {
  const [data, setData] = useState<any>({ username: "", password: "" });
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleChange = useCallback(
    (event: any) => {
      setData({ ...data, [event.target.name]: event.target.value });
    },
    [setData, data]
  );

  const handleSubmit = useCallback(
    async e => {
      e.preventDefault();

      try {
        const user = await Auth.signIn(data.username, data.password);
        setUser(user);
        setError(null);
      } catch (e) {
        console.error(e);
        setUser(null);
        setError(e);
      }
    },
    [data]
  );

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            name="username"
            type="text"
            value={data.username}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
          />
        </label>

        <input type="submit" value="Submit" />
      </form>

      <button
        type="button"
        onClick={() =>
          Auth.federatedSignIn({
            provider: CognitoHostedUIIdentityProvider.Cognito
          })
        }
      >
        Federated sign in
      </button>

      <button
        type="button"
        onClick={async () => {
          const user = await Auth.currentAuthenticatedUser();
          setUser(user);
          setError(null);
        }}
      >
        Print user info
      </button>

      <Error error={error} />
      <UserProfile user={user} />
    </div>
  );
};

export default App;
