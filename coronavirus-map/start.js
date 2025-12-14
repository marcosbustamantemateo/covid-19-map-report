#!/usr/bin/env node
process.env.NODE_OPTIONS = "--openssl-legacy-provider";
require("child_process").spawn("gatsby", ["develop"], {
  stdio: "inherit",
  shell: true,
});
