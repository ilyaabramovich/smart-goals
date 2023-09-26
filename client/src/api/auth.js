export async function signIn(userData) {
  const res = await fetch("/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error(
        "Incorrect username or password. Please double-check your sign-in details and try again.",
      );
    }

    throw new Error(
      "An error occured while trying to sign you in. Try submitting the form again.",
    );
  }

  return await res.json();
}

export async function signUp(userData) {
  const res = await fetch("/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    if (res.status === 422) {
      const json = await res.json();

      if (json.status === "error") {
        return { user: null, errors: json.errors }
      }
    }

    throw new Error(
      "An error occured while trying to create your account. Try submitting the form again.",
    );
  }

  const user = await res.json();
  return { user, errors: null }
}

export async function logOut() {
  const res = await fetch("/auth/logout", { method: "DELETE" });

  if (!res.ok) {
    throw res;
  }

  return { ok: true };
}
