// Take a list of filter patterns, which simply end up being
// the parameters passed to the standard string replace function
module.exports.activate = (filterPatterns) => {
  // Capture the orignal streams so they can be restored later if desired
  const originalStdoutWrite = process.stdout.write;
  const originalStderrWrite = process.stderr.write;

  // Set up the deactivation function which restores the streams
  module.exports.deactivate = () => {
    process.stdout.write = originalStdoutWrite;
    process.stderr.write = originalStderrWrite;
  };

  // Build a filtering function that executes each string replacement in sequence
  const filterFunction = (text) => {
    let filteredText = text;
    filterPatterns.forEach((pattern) => {
      filteredText = filteredText.replace(...pattern);
    });
    return filteredText;
  };

  // Replace the standard output write function with a replacement that filters the output first
  process.stdout.write = ((write) => (string, encoding, fd) => {
    write.apply(process.stdout, [filterFunction(string), encoding, fd]);
  })(process.stdout.write);

  // Do the same with standard error
  process.stderr.write = ((write) => (string, encoding, fd) => {
    write.apply(process.stderr, [filterFunction(string), encoding, fd]);
  })(process.stderr.write);
};
