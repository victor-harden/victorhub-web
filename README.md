# victorhub-web

A static dashboard for VictorHub state. It loads a `status.json` file, renders
summary cards and a recent-events table, and works without a build step or
framework.

## Features

- `renderStatus(data)` is a pure function, unit-tested with `node:test`.
- Graceful empty state and error message when the JSON cannot be loaded.
- Small CSS file with responsive layout.
- `status.example.json` shows the expected shape.
- No dependencies.

## Installation

```bash
git clone https://github.com/victor-harden/victorhub-web.git
cd victorhub-web
npm test
```

## Usage

Serve the directory with any static server and open it:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

Export the state from the core CLI into `status.json` (or edit
`status.example.json` and copy it).

## Tests

```bash
npm test
```

## License

MIT — see [LICENSE](LICENSE).
