<div align="center">
  <a href="https://github.com/KirillTregubov/Centipede">
    <img src="images/screenshot.jpg" alt="Screenshot of the Centipede game" width="225" height="487.2">
  </a>
  <h3 align="center">Eventure</h3>

  <p align="center">
    A next-generation Event Platform. Submitted to <a href="https://hackthe6ix2022.devpost.com/">Hack the 6ix 2022</a>.
    <br />
    <a href="https://github.com/KirillTregubov/hackthe6ix/issues">Report a Bug</a>
  </p>
</div>

## Maintainers

Maintained by [Kirill Tregubov](https://www.github.com/KirillTregubov) and [Soumil Dharaskar](https://www.github.com/SoumilDharaskar).

Contributors: [@KaranpreetRaja](https://www.github.com/KaranpreetRaja), [@whyismynamerudy](https://www.github.com/whyismynamerudy).

## Required Software & Hardware
1. [Node.js](https://nodejs.org/en/) version 18.16.0
2. [Yarn Classic](https://classic.yarnpkg.com/lang/en/), which can be installed with `npm install --global yarn`.
3. Either a physical mobile device with the [Expo Go](https://expo.dev/client) app or an emulated instance of iOS (11+) or Android (5.0+).

## Setup

Inside of `backend/`:
1. Install dependencies with `yarn`.
1. Create a PostgreSQL instance if you do not have one already. You can use `pgsql` [available here](https://www.postgresql.org/).
1. Copy (`cp`) the `.env.example` file to `.env` and follow the comments to fill in all the values

Inside of `platform/`:
1. Install dependencies with `yarn`.
1. Copy (`cp`) the `.env.example` file to `.env` and follow the comments to fill in all the values

## Usage

First start the backend in development mode. **Inside `backend/`**:
1. Run `yarn dev`.

Next start the Expo app in development mode. **Inside `platform/`**:
1. Run `yarn start`.
1. Follow the instructions to open a specific platform.
