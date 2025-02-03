#!/bin/bash

# pre-setup
mkdir .vezham
node v/bin/ci/npm/scripts/check-publish.js # pnpm v:g:check-publish
