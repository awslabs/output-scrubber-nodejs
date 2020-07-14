#!/usr/bin/env bash
set -e


test/test.js 1> /tmp/actual-stdout.txt 2> /tmp/actual-stderr.txt


if ! cmp /tmp/actual-stdout.txt test/expected-stdout.txt; then
  echo "Standard out filtering failed"
  exit -1
fi

if ! cmp /tmp/actual-stderr.txt test/expected-stderr.txt; then
  echo "Standard error filtering failed"
  exit -1
fi


echo "Tests completed successfully"
