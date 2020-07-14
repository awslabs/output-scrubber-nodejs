# Output Scrubber

## Overview

A tool to obscure sensitive output in stdout and stderr. Provide it a list of regular
expressions and corresponding replacement strings, and when included in a program it will
automatically do the replacement in stdout and stderr. The intent of this module is to
make it easy to ensure certain types of sensitive info (such as SSNs or PINs) do not
end up in log files.


## Installation

```bash
npm i --save output-scrubber
```


## Usage

First include the module:

```javascript
const outputScrubber = require('output-scrubber');
```

Then create a list of filters, each of which is a list with 2 items, the
regular expression pattern to be matched, and string to use for replacement:

```javascript
const patterns = [
  [/\d{3}-\d{2}-\d{4}/g, 'XXX-XX-XXXX'],
  [/\$[0-9,.]+/g, '$XX.XX'],
  [/\d{4}/g, 'XXXX'],
];
```

Finally activate the filtering, passing the list of patterns:

```javascript
outputScrubber.activate(patterns);
```

Any standard out or standard error output after this point will be
filtered. To turn off filtering, use the following call:

```javascript
outputScrubber.deactivate();
```


## Testing

To execute a simple test script, run the following:

```bash
npm test
```


## Contributing

Pull requests are welcomed. Please lint all changes with `npm run lint` before submitting. Also review
the [Contributing Guidelines](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).


## Authors

*  Jud Neer (judneer@amazon.com)


## License

This project is licensed under the Apache 2.0 License. See the [LICENSE](LICENSE) file for details.
