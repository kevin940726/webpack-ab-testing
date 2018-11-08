let version;

if (process.env.AB_VARIANT === "a") {
  version = "A";
} else if (process.env.AB_VARIANT === "b") {
  version = "B";
}

module.exports = version;
