const printVersion = () => {
  const result = document.createElement("main");
  document.body.appendChild(result);

  import(/* webpackChunkName: "feature" */ "./feature.js").then(mod => {
    const version = mod.default;

    result.innerText = version;
  });
};

printVersion();
