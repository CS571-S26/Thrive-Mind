# Thrive Mind API

A small Express + Prisma + Postgres backend: real accounts, real sessions, real persistence — kept intentionally minimal.

## Local setup

1. Install and start Postgres (macOS/Homebrew):

   ```bash
   brew install postgresql@16
   brew services start postgresql@16
   ```

2. Create the dev and test databases:

   ```bash
   createdb thrivemind_dev
   createdb thrivemind_test
   ```

3. Copy the env file and fill in `DATABASE_URL` (point it at `thrivemind_dev`) and `SESSION_SECRET`:

   ```bash
   cp .env.example .env
   ```

4. Install dependencies and run the migration:

   ```bash
   npm install
   npm run prisma:migrate
   ```

5. Start the API:

   ```bash
   npm run dev
   ```

   Health check: `curl http://localhost:4000/api/health`

## Tests

Tests run against a separate `thrivemind_test` database (not `thrivemind_dev`), and clean up user rows between tests. Apply migrations to it once with:

```bash
DATABASE_URL="postgresql://$(whoami)@localhost:5432/thrivemind_test" npx prisma migrate deploy
```

Then:

```bash
npm test
```

## Auth model

Sessions, not JWTs — the session id lives in an httpOnly cookie, and session data is stored server-side in Postgres (via `connect-pg-simple`), not in anything the client can read or forge. Passwords are hashed with bcrypt. Login and signup return the identical error for a wrong password vs. an unregistered email, so the endpoint can't be used to check which emails are registered.
