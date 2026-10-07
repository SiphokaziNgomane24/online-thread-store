onAuthStateChanged(auth, (user) => {
  nav.innerHTML = `... ${user ? "name + Log out" : "Log in link"} ...`;
  if (onUser) onUser(user);   // lets each page react to the user
});
